import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getRequiredDocuments } from "@/lib/application";


export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const application = await prisma.application.findUnique({
            where: { id },
            include: {
                student: { include: { profile: true } },
                consultant: true,
                agency: true,
                program: { include: { institution: true } },
                documents: { orderBy: { uploadedAt: 'desc' } },
                messages: {
                    orderBy: { createdAt: 'desc' },
                    take: 10,
                    include: { sender: true, receiver: true }
                },
                offers: { orderBy: { createdAt: 'desc' } },
                activityLogs: { orderBy: { createdAt: 'desc' } },
            },
        });

        if (!application) {
            return NextResponse.json({ error: "Application not found" }, { status: 404 });
        }

        // Check permissions
        const role = session.user.role;
        const userId = session.user.id;

        if (role !== "ADMIN" && role !== "CEO") {
            if (role === "STUDENT" && application.studentId !== userId) {
                return NextResponse.json({ error: "Forbidden" }, { status: 403 });
            }
            if (role === "ADVISOR" && application.consultantId !== userId) {
                return NextResponse.json({ error: "Forbidden" }, { status: 403 });
            }
            if (role === "AGENCY_MANAGER" && application.agencyId !== userId) {
                return NextResponse.json({ error: "Forbidden" }, { status: 403 });
            }
        }

        // Get required documents for this application
        const requiredDocuments = await getRequiredDocuments(id);

        return NextResponse.json({
            ...application,
            requiredDocuments,
        });
    } catch (error) {
        console.error("Failed to fetch application:", error);
        return NextResponse.json({ error: "Failed to fetch application" }, { status: 500 });
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
        const role = session.user.role;
        const userId = session.user.id;

        // Get existing application to check permissions
        const existing = await prisma.application.findUnique({
            where: { id },
        });

        if (!existing) {
            return NextResponse.json({ error: "Application not found" }, { status: 404 });
        }

        // Permission checks
        if (role === "STUDENT" && existing.studentId !== userId) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        // Build update data based on role
        const updateData: any = {};

        if (body.status && (role === "ADVISOR" || role === "AGENCY_MANAGER" || role === "ADMIN" || role === "CEO")) {
            updateData.status = body.status;
        }

        if (body.consultantId && (role === "AGENCY_MANAGER" || role === "ADMIN" || role === "CEO")) {
            updateData.consultantId = body.consultantId;
        }

        if (body.agencyId && (role === "ADMIN" || role === "CEO")) {
            updateData.agencyId = body.agencyId;
        }

        const application = await prisma.application.update({
            where: { id },
            data: updateData,
            include: {
                student: true,
                consultant: true,
                agency: true,
                program: { include: { institution: true } },
            },
        });

        return NextResponse.json(application);
    } catch (error) {
        console.error("Failed to update application:", error);
        return NextResponse.json({ error: "Failed to update application" }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const session = await auth();
    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "CEO")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await prisma.application.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to delete application:", error);
        return NextResponse.json({ error: "Failed to delete application" }, { status: 500 });
    }
}
