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
        const { 
            title, title_en, title_de,
            slug, 
            content, content_en, content_de,
            excerpt, excerpt_en, excerpt_de,
            image, imageSettings, category, published, 
            seoTitle, seoTitle_en, seoTitle_de,
            seoDescription, seoDescription_en, seoDescription_de,
            keywords, keywords_en, keywords_de
        } = body;

        const page = await prisma.page.create({
            data: {
                title,
                title_en,
                title_de,
                slug,
                content,
                content_en,
                content_de,
                excerpt: excerpt || null,
                excerpt_en: excerpt_en || null,
                excerpt_de: excerpt_de || null,
                image: image || null,
                imageSettings: imageSettings || null,
                category: category || "Genel",
                published: published || false,
                seoTitle: seoTitle || null,
                seoTitle_en: seoTitle_en || null,
                seoTitle_de: seoTitle_de || null,
                seoDescription: seoDescription || null,
                seoDescription_en: seoDescription_en || null,
                seoDescription_de: seoDescription_de || null,
                keywords: keywords || null,
                keywords_en: keywords_en || null,
                keywords_de: keywords_de || null,
                authorId: session.user.id!
            }
        });

        return NextResponse.json(page);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create page" }, { status: 500 });
    }
}
