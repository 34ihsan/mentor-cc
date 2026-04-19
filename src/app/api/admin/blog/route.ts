
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "ADMIN") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const posts = await prisma.post.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                author: {
                    select: { name: true }
                }
            }
        });

        return NextResponse.json(posts);
    } catch (error) {
        console.error("[BLOG_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "ADMIN") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { title, slug, content, image, published, category, imageSettings } = body;

        if (!title || !slug || !content) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        // Check if slug exists
        const existingPost = await prisma.post.findUnique({
            where: { slug }
        });

        if (existingPost) {
            return new NextResponse("Slug already exists", { status: 400 });
        }

        const post = await prisma.post.create({
            data: {
                title,
                slug,
                content,
                image,
                imageSettings: imageSettings || null,
                published,
                category: category || "Genel",
                authorId: session.user.id
            }
        });

        return NextResponse.json(post);
    } catch (error) {
        console.error("[BLOG_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
