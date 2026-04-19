import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const applicationId = searchParams.get("applicationId");
    const userId = session.user.id;

    try {
        const where: any = {
            OR: [{ senderId: userId }, { receiverId: userId }],
        };

        if (applicationId) {
            where.applicationId = applicationId;
        }

        const messages = await prisma.message.findMany({
            where,
            include: {
                sender: { select: { id: true, name: true, email: true, role: true } },
                receiver: { select: { id: true, name: true, email: true, role: true } },
                application: { include: { program: { select: { name: true } } } },
            },
            orderBy: { createdAt: "desc" },
            take: 100,
        });
        return NextResponse.json(messages);
    } catch (error: any) {
        console.error("Failed to fetch messages:", error);
        return NextResponse.json({ error: "Failed to fetch messages", details: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();
        const data: any = {
            content: body.content,
            sender: { connect: { id: session.user.id } },
            receiver: { connect: { id: body.receiverId } },
            fileUrl: body.fileUrl,
            fileName: body.fileName,
        };

        if (body.applicationId) {
            data.application = { connect: { id: body.applicationId } };
        }

        const message = await prisma.message.create({ data });
        return NextResponse.json(message);
    } catch (error: any) {
        console.error("Failed to send message:", error);
        return NextResponse.json({
            error: "Failed to send message",
            details: error.message,
            code: error.code // Prisma error code (e.g., P2025 for connect failure)
        }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();
        const { messageId, applicationId, markAllAsRead } = body;

        if (markAllAsRead && applicationId) {
            // Mark all messages in an application as read for the current user
            await prisma.message.updateMany({
                where: {
                    applicationId,
                    receiverId: session.user.id,
                    isRead: false
                },
                data: { isRead: true }
            });
            return NextResponse.json({ success: true });
        }

        if (!messageId) return NextResponse.json({ error: "Missing messageId" }, { status: 400 });

        const message = await prisma.message.update({
            where: { id: messageId },
            data: { isRead: true }
        });

        return NextResponse.json(message);
    } catch (error: any) {
        console.error("Failed to update message:", error);
        return NextResponse.json({ error: "Failed to update message" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { searchParams } = new URL(req.url);
        const messageId = searchParams.get("id");

        if (!messageId) return NextResponse.json({ error: "Missing message ID" }, { status: 400 });

        // Verify ownership
        const msg = await prisma.message.findUnique({ where: { id: messageId } });
        if (!msg) return NextResponse.json({ error: "Message not found" }, { status: 404 });
        if (msg.senderId !== session.user.id && session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        await prisma.message.delete({ where: { id: messageId } });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: "Failed to delete message", details: error.message }, { status: 500 });
    }
}
