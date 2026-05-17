"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

/**
 * Starts impersonating a user.
 * Only accessible by ADMIN role.
 */
export async function impersonateUserAction(userId: string) {
    const session = await auth();
    
    // 1. Safety Check: Only ADMINs can impersonate
    if (!session || session.user.role !== "ADMIN") {
        throw new Error("Unauthorized: Only Admins can impersonate users.");
    }

    // 2. Fetch target user to ensure they exist and are not an admin
    const targetUser = await prisma.user.findUnique({ 
        where: { id: userId },
        select: { id: true, role: true, name: true }
    });

    if (!targetUser) {
        throw new Error("User not found.");
    }

    if (targetUser.role === "ADMIN") {
        throw new Error("Security: Admins cannot impersonate other admins.");
    }

    // 3. Set cookies for impersonation
    const cookieStore = await cookies();
    
    // Set the impersonated user ID
    cookieStore.set("impersonated_user_id", userId, { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60, // 1 hour
        path: "/"
    });

    // Set the impersonated user role
    cookieStore.set("impersonated_user_role", targetUser.role, { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60,
        path: "/"
    });

    // Set the original admin ID to allow reverting
    cookieStore.set("original_admin_id", session.user.id, { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60,
        path: "/"
    });

    revalidatePath("/");
    redirect("/dashboard");
}

/**
 * Stops the current impersonation session.
 */
export async function stopImpersonationAction() {
    const cookieStore = await cookies();
    
    cookieStore.delete("impersonated_user_id");
    cookieStore.delete("impersonated_user_role");
    cookieStore.delete("original_admin_id");

    revalidatePath("/");
    redirect("/dashboard/admin/users");
}
