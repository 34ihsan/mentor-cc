import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET() {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const pages = await prisma.page.findMany({
            include: {
                author: {
                    select: { name: true }
                }
            },
            orderBy: { createdAt: "desc" }
        });
        return NextResponse.json(pages);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch pages" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { title, slug, content, excerpt, image, imageSettings, category, published, seoTitle, seoDescription, keywords } = body;

        const page = await prisma.page.create({
            data: {
                title,
                slug,
                content,
                excerpt: excerpt || null,
                image: image || null,
                imageSettings: imageSettings || null,
                category: category || "Genel",
                published: published || false,
                seoTitle: seoTitle || null,
                seoDescription: seoDescription || null,
                keywords: keywords || null,
                authorId: session.user.id!
            }
        });

        return NextResponse.json(page);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create page" }, { status: 500 });
    }
}
