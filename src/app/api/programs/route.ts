import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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
        const body = await req.json();
        const program = await prisma.program.create({
            data: {
                name: body.name,
                slug: body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                category: body.category,
                description: body.description,
                duration: body.duration,
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
