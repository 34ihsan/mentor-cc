
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

        const body = await req.json();
        const { id } = await params;

        const existingLead = await prisma.lead.findUnique({
            where: { id }
        });

        if (!existingLead) {
            return new NextResponse("Not Found", { status: 404 });
        }

        // Check if user has permission to update this lead
        if (session.user.role !== "ADMIN" && session.user.role !== "CEO" && existingLead.agencyId !== session.user.id) {
            return new NextResponse("Forbidden", { status: 403 });
        }

        const lead = await prisma.lead.update({
            where: { id },
            data: body
        });

        return NextResponse.json(lead);
    } catch (error) {
        console.error("[LEAD_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

        const { id } = await params;

        const existingLead = await prisma.lead.findUnique({
            where: { id }
        });

        if (!existingLead) {
            return new NextResponse("Not Found", { status: 404 });
        }

        // Check if user has permission to delete this lead
        if (session.user.role !== "ADMIN" && session.user.role !== "CEO" && existingLead.agencyId !== session.user.id) {
            return new NextResponse("Forbidden", { status: 403 });
        }

        await prisma.lead.delete({
            where: { id }
        });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error("[LEAD_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
