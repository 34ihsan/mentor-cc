import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { unlink } from "fs/promises";
import { join } from "path";

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const document = await prisma.document.findUnique({
            where: { id },
            include: { application: true }
        });

        if (!document) {
            return NextResponse.json({ error: "Document not found" }, { status: 404 });
        }

        const role = session.user.role;
        const userId = session.user.id;

        // Authorization check
        const isOwner = document.application?.studentId === userId || document.userId === userId;
        const isAdmin = role === "ADMIN" || role === "CEO";
        const isConsultant = document.application?.consultantId === userId;
        const isAgency = document.application?.agencyId === userId;

        if (!isAdmin && !isOwner && !isConsultant && !isAgency) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        // Only allow deleting PENDING or REJECTED documents for students
        if (role === "STUDENT" && document.status === "APPROVED") {
            return NextResponse.json({ error: "Cannot delete approved documents" }, { status: 403 });
        }

        // Delete from filesystem
        if (document.url.startsWith("/")) {
            const filePath = join(process.cwd(), "public", document.url);
            try {
                await unlink(filePath);
            } catch (e) {
                console.error("Failed to delete file from disk:", e);
            }
        }

        // Delete from database
        await prisma.document.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Document deletion failed:", error);
        return NextResponse.json({ error: "Failed to delete document" }, { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();
        const { status, rejectionReason } = body;

        const role = session.user.role;
        const userId = session.user.id;

        const document = await prisma.document.findUnique({
            where: { id },
            include: { application: true }
        });

        if (!document) {
            return NextResponse.json({ error: "Document not found" }, { status: 404 });
        }

        // Authorization check: Staff can approve/reject
        const isAdmin = role === "ADMIN" || role === "CEO";
        const isConsultant = document.application?.consultantId === userId;
        const isAgency = role === "AGENCY_MANAGER" && document.application?.agencyId === userId;

        if (!isAdmin && !isConsultant && !isAgency) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const updatedDoc = await prisma.document.update({
            where: { id },
            data: {
                status,
                rejectionReason: status === "REJECTED" ? rejectionReason : null,
            }
        });

        // Log activity
        if (document.applicationId) {
            await prisma.activityLog.create({
                data: {
                    applicationId: document.applicationId,
                    userId,
                    action: "DOCUMENT_UPDATE",
                    details: `Belge durumu güncellendi: ${document.name} -> ${status}`,
                }
            });
        }

        return NextResponse.json(updatedDoc);
    } catch (error) {
        console.error("Document update failed:", error);
        return NextResponse.json({ error: "Failed to update document" }, { status: 500 });
    }
}
