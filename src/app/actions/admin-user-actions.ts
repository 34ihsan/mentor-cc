
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

    await prisma.user.delete({
        where: { id: userId }
    });

    revalidatePath("/dashboard/admin/users");
    return { success: true };
}
