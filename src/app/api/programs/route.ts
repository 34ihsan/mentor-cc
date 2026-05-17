import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const institutionId = searchParams.get("institutionId");
    const category = searchParams.get("category");

    try {
        const programs = await prisma.program.findMany({
            where: {
                ...(institutionId ? { institutionId } : {}),
                ...(category ? { category: category as any } : {}),
            },
            include: {
                institution: true
            }
        });
        return NextResponse.json(programs);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch programs" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const isAdmin = session.user.role === "ADMIN" || session.user.role === "CEO";
        const isAgency = session.user.role === "AGENCY_MANAGER";
        
        if (!isAdmin && !isAgency) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const program = await prisma.program.create({
            data: {
                name: body.name,
                name_en: body.name_en,
                name_de: body.name_de,
                slug: body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                category: body.category,
                description: body.description,
                description_en: body.description_en,
                description_de: body.description_de,
                content: body.content,
                content_en: body.content_en,
                content_de: body.content_de,
                duration: body.duration,
                duration_en: body.duration_en,
                duration_de: body.duration_de,
                price: body.price ? parseFloat(body.price) : null,
                currency: body.currency,
                institutionId: body.institutionId,
                templateData: body.templateData || {}
            }
        });
        return NextResponse.json(program);
    } catch (error) {
        console.error("Program creation error:", error);
        return NextResponse.json({ error: "Failed to create program" }, { status: 500 });
    }
}
