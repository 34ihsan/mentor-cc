"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function sendMessageAction(formData: {
    content: string;
    receiverId: string;
    applicationId?: string;
    fileUrl?: string;
    fileName?: string;
}) {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    try {
        const message = await prisma.message.create({
            data: {
                content: formData.content,
                senderId: session.user.id,
                receiverId: formData.receiverId,
                applicationId: formData.applicationId,
                fileUrl: formData.fileUrl,
                fileName: formData.fileName,
            }
        });

        revalidatePath(`/dashboard/applications/${formData.applicationId}`);
        revalidatePath("/dashboard/messages");
        
        return { success: true, message };
    } catch (error) {
        console.error("Send message error:", error);
        return { success: false, error: "Mesaj gönderilemedi." };
    }
}

export async function getMessagesAction(otherUserId: string, applicationId?: string) {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    try {
        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    { senderId: session.user.id, receiverId: otherUserId },
                    { senderId: otherUserId, receiverId: session.user.id }
                ],
                applicationId: applicationId || undefined
            },
            orderBy: { createdAt: 'asc' },
            include: {
                sender: { select: { name: true, role: true } },
                receiver: { select: { name: true, role: true } }
            }
        });

        return { success: true, data: messages };
    } catch (error) {
        console.error("Get messages error:", error);
        return { success: false, error: "Mesajlar alınamadı." };
    }
}

export async function markAsReadAction(messageId: string) {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    try {
        await prisma.message.update({
            where: { id: messageId, receiverId: session.user.id },
            data: { isRead: true }
        });
        return { success: true };
    } catch (error) {
        return { success: false };
    }
}

export async function getConversationsAction() {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    try {
        // This is a simplified version to get unique conversation partners
        const sentTo = await prisma.message.findMany({
            where: { senderId: session.user.id },
            select: { receiverId: true },
            distinct: ['receiverId']
        });

        const receivedFrom = await prisma.message.findMany({
            where: { receiverId: session.user.id },
            select: { senderId: true },
            distinct: ['senderId']
        });

        const userIds = Array.from(new Set([
            ...sentTo.map(m => m.receiverId),
            ...receivedFrom.map(m => m.senderId)
        ]));

        const partners = await prisma.user.findMany({
            where: { id: { in: userIds } },
            select: { id: true, name: true, role: true }
        });

        return { success: true, data: partners };
    } catch (error) {
        return { success: false, error: "Konuşmalar alınamadı." };
    }
}

export async function getUnreadMessagesCountAction() {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    try {
        const count = await prisma.message.count({
            where: {
                receiverId: session.user.id,
                isRead: false
            }
        });
        return { success: true, count };
    } catch (error) {
        return { success: false, count: 0 };
    }
}

export async function getRecentMessagesAction(limit = 5) {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    try {
        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    { senderId: session.user.id },
                    { receiverId: session.user.id }
                ]
            },
            orderBy: { createdAt: 'desc' },
            take: limit,
            include: {
                sender: { select: { name: true } },
                application: { 
                    include: { 
                        program: { select: { name: true } },
                        student: { select: { name: true } }
                    } 
                }
            }
        });
        return { success: true, data: messages };
    } catch (error) {
        return { success: false, error: "Mesajlar alınamadı." };
    }
}
