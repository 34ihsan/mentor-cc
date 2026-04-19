"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createCommissionAction(data: {
    amount: number;
    currency?: string;
    applicationId: string;
    agencyId: string;
}) {
    const session = await auth();
    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "CEO")) {
        throw new Error("Unauthorized");
    }

    try {
        const commission = await prisma.commission.create({
            data: {
                amount: data.amount,
                currency: data.currency || "USD",
                applicationId: data.applicationId,
                agencyId: data.agencyId,
                status: "PENDING"
            }
        });

        revalidatePath("/dashboard/agency/commissions");
        revalidatePath("/dashboard/ceo/finance");
        
        return { success: true, data: commission };
    } catch (error) {
        console.error("Create commission error:", error);
        return { success: false, error: "Komisyon oluşturulamadı." };
    }
}

export async function getAgencyCommissionsAction() {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    try {
        const commissions = await prisma.commission.findMany({
            where: { agencyId: session.user.id },
            include: {
                application: {
                    include: {
                        student: { select: { name: true } },
                        program: { select: { name: true } }
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return { success: true, data: commissions };
    } catch (error) {
        return { success: false, error: "Komisyonlar alınamadı." };
    }
}

export async function updateCommissionStatusAction(id: string, status: string) {
    const session = await auth();
    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "CEO")) {
        throw new Error("Unauthorized");
    }

    try {
        await prisma.commission.update({
            where: { id },
            data: { status }
        });
        
        revalidatePath("/dashboard/agency/commissions");
        revalidatePath("/dashboard/ceo/finance");
        
        return { success: true };
    } catch (error) {
        return { success: false, error: "Durum güncellenemedi." };
    }
}

export async function getFinancialOverviewAction() {
    const session = await auth();
    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "CEO")) {
        throw new Error("Unauthorized");
    }

    try {
        const [commissions, recentApps] = await Promise.all([
            prisma.commission.findMany({
                include: { agency: { select: { name: true } } }
            }),
            prisma.application.findMany({
                where: { status: "COMPLETED" },
                include: { program: true },
                take: 10,
                orderBy: { updatedAt: 'desc' }
            })
        ]);

        const totalEarned = commissions
            .filter(c => c.status === "PAID")
            .reduce((acc, c) => acc + c.amount, 0);

        const pendingPayouts = commissions
            .filter(c => c.status === "PENDING")
            .reduce((acc, c) => acc + c.amount, 0);

        return { 
            success: true, 
            data: {
                totalEarned,
                pendingPayouts,
                commissions,
                recentCompleted: recentApps
            }
        };
    } catch (error) {
        return { success: false, error: "Finansal veriler alınamadı." };
    }
}
