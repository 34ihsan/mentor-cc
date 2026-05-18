import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id } = await params;
        const body = await req.json();
        const template = await prisma.emailTemplate.update({
            where: { id },
            data: {
                name: body.name,
                subject: body.subject,
                body: body.body,
                isActive: body.isActive,
            },
        });
        return NextResponse.json(template);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update template" }, { status: 500 });
    }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id } = await params;
        const tpl = await prisma.emailTemplate.findUnique({ where: { id } });
        if (!tpl) {
            return NextResponse.json({ error: "Template not found" }, { status: 404 });
        }

        if (["WELCOME", "LOGIN_OTP", "CONTACT_REPLY"].includes(tpl.type)) {
            return NextResponse.json({ error: "Sistem şablonları silinemez." }, { status: 400 });
        }

        await prisma.emailTemplate.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete template" }, { status: 500 });
    }
}
