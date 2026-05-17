"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function sendInternalNoteAction(applicationId: string, content: string, label?: string) {
    try {
        const session = await auth();
        if (!session || !["ADMIN", "ADVISOR", "CEO"].includes(session.user.role)) {
            throw new Error("Unauthorized");
        }

        const note = await prisma.message.create({
            data: {
                content,
                senderId: session.user.id,
                receiverId: session.user.id, // Internal notes are technically sent to self/system
                applicationId,
                isInternal: true,
                label: label || "INTERNAL_NOTE"
            }
        });

        revalidatePath(`/dashboard/applications/${applicationId}`);
        return { success: true, data: note };
    } catch (error) {
        console.error("Failed to send internal note:", error);
        return { success: false, error: "Failed to send note" };
    }
}

export async function getInternalNotesAction(applicationId: string) {
    try {
        const session = await auth();
        if (!session || !["ADMIN", "ADVISOR", "CEO"].includes(session.user.role)) {
            throw new Error("Unauthorized");
        }

        const notes = await prisma.message.findMany({
            where: {
                applicationId,
                isInternal: true
            },
            orderBy: {
                createdAt: "desc"
            },
            include: {
                sender: {
                    select: {
                        name: true,
                        role: true
                    }
                }
            }
        });

        return { success: true, data: notes };
    } catch (error) {
        console.error("Failed to fetch internal notes:", error);
        return { success: false, error: "Failed to fetch notes" };
    }
}
