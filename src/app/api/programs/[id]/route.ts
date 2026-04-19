import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const program = await prisma.program.findUnique({
            where: { id },
            include: { institution: true },
        });

        if (!program) {
            return NextResponse.json({ error: "Program not found" }, { status: 404 });
        }

        return NextResponse.json(program);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch program" }, { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const session = await auth();
    if (!session || (session.user.role !== "SUPER_ADMIN" && session.user.role !== "AGENCY")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const program = await prisma.program.update({
            where: { id },
            data: {
                name: body.name,
                category: body.category,
                description: body.description,
                duration: body.duration,
                price: body.price ? parseFloat(body.price) : null,
                currency: body.currency,
                institutionId: body.institutionId,
                templateData: body.templateData || {}
            },
            include: { institution: true },
        });

        return NextResponse.json(program);
    } catch (error) {
        console.error("Failed to update program:", error);
        return NextResponse.json({ error: "Failed to update program" }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const session = await auth();
    if (!session || (session.user.role !== "SUPER_ADMIN" && session.user.role !== "AGENCY")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await prisma.program.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to delete program:", error);
        return NextResponse.json({ error: "Failed to delete program" }, { status: 500 });
    }
}
