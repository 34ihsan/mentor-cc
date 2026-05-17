
"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { hash } from "bcryptjs";


export async function adminCreateUserAction(data: any) {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") throw new Error("Unauthorized");

    const { password, ...userData } = data;
    const hashedPassword = await hash(password, 12);

    const user = await prisma.user.create({
        data: {
            ...userData,
            password: hashedPassword
        }
    });

    revalidatePath("/dashboard/admin/users");
    return { success: true, user };
}

export async function adminGetUsersAction() {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") throw new Error("Unauthorized");

    return await prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            managedBy: true,
            _count: {
                select: {
                    asStudent: true,
                    managedUsers: true
                }
            }
        }
    });
}

export async function adminUpdateUserAction(userId: string, data: any) {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") throw new Error("Unauthorized");

    const { password, ...updateData } = data;
    
    if (password) {
        updateData.password = await hash(password, 12);
    }

    const user = await prisma.user.update({
        where: { id: userId },
        data: updateData
    });

    revalidatePath("/dashboard/admin/users");
    return { success: true, user };
}

export async function adminDeleteUserAction(userId: string) {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") throw new Error("Unauthorized");

    try {
        await prisma.$transaction(async (tx) => {
            // 1. Unlink managed users
            await tx.user.updateMany({
                where: { managedById: userId },
                data: { managedById: null }
            });

            // 2. Delete related records that might block deletion
            await tx.profile.deleteMany({ where: { userId } });
            await tx.userTask.deleteMany({ where: { userId } });
            await tx.activityLog.deleteMany({ where: { userId } });
            await tx.document.deleteMany({ where: { userId } });
            await tx.appointment.deleteMany({ 
                where: { 
                    OR: [{ advisorId: userId }, { studentId: userId }] 
                } 
            });
            await tx.message.deleteMany({ 
                where: { 
                    OR: [{ senderId: userId }, { receiverId: userId }] 
                } 
            });
            await tx.commission.deleteMany({ where: { agencyId: userId } });
            await tx.lead.deleteMany({ where: { agencyId: userId } });
            await tx.contract.deleteMany({ where: { studentId: userId } });
            
            // 3. Handle Applications (Cascading delete manually)
            // First find applications where the user is involved
            const apps = await tx.application.findMany({
                where: {
                    OR: [
                        { studentId: userId },
                        { consultantId: userId },
                        { agencyId: userId }
                    ]
                },
                select: { id: true }
            });
            
            const appIds = apps.map(a => a.id);
            if (appIds.length > 0) {
                // Delete application-specific records
                await tx.activityLog.deleteMany({ where: { applicationId: { in: appIds } } });
                await tx.message.deleteMany({ where: { applicationId: { in: appIds } } });
                await tx.offer.deleteMany({ where: { applicationId: { in: appIds } } });
                await tx.document.deleteMany({ where: { applicationId: { in: appIds } } });
                await tx.commission.deleteMany({ where: { applicationId: { in: appIds } } });
                await tx.application.deleteMany({ where: { id: { in: appIds } } });
            }

            // 4. Handle Content Authored by the User (optional: set to null or delete)
            // For now, we'll delete them to ensure the user is fully removed
            await tx.page.deleteMany({ where: { authorId: userId } });
            await tx.post.deleteMany({ where: { authorId: userId } });

            // 5. Finally delete the user
            await tx.user.delete({
                where: { id: userId }
            });
        });

        revalidatePath("/dashboard/admin/users");
        return { success: true };
    } catch (error: any) {
        console.error("Admin User Delete Error:", error);
        throw new Error(error.message || "Failed to delete user due to existing relations.");
    }
}

export async function getAdminLogsAction() {
    try {
        const session = await auth();
        if (!session || (session.user.role !== "ADMIN" && session.user.role !== "CEO")) {
            throw new Error("Unauthorized");
        }

        const logs = await prisma.activityLog.findMany({
            take: 50,
            orderBy: { createdAt: "desc" },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        });

        return {
            success: true,
            logs: logs.map(log => {
                let parsedDetails = null;
                try {
                    parsedDetails = log.details ? JSON.parse(log.details) : null;
                } catch (e) {
                    parsedDetails = log.details;
                }
                
                return {
                    id: log.id,
                    action: log.action,
                    details: parsedDetails,
                    user: log.user?.name || "Sistem",
                    email: log.user?.email || "system@mentor-cc.com",
                    time: log.createdAt.toISOString(),
                    type: log.action.includes("DELETE") ? "ERROR" : 
                          log.action.includes("UPDATE") ? "WARNING" : 
                          log.action.includes("LOGIN") ? "SUCCESS" : "INFO"
                };
            })
        };
    } catch (error) {
        console.error("Failed to fetch admin logs:", error);
        return { success: false, error: "Loglar getirilemedi" };
    }
}
