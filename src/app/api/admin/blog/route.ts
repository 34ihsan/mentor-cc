
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
    } catch (error: any) {
        console.error("[BLOG_GET] Full error:", error?.message, error?.code);
        return new NextResponse(JSON.stringify({ error: error?.message ?? "Internal Error" }), { 
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "ADMIN") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const userId = session.user.id;
        // If admin is impersonating another user, use the original admin's ID as author
        const authorId = (session.user as any).originalId || userId;
        
        if (!authorId) {
            console.error("[BLOG_POST] No user ID in session:", session.user);
            return new NextResponse("Session user ID missing", { status: 401 });
        }

        const body = await req.json();
        const { 
            title, title_en, title_de, 
            slug, 
            content, content_en, content_de, 
            image, published, category, imageSettings 
        } = body;
        
        console.log("[BLOG_POST] Body:", { title, slug, published, category, userId });

        if (!title || !slug || !content) {
            console.warn("[BLOG_POST] Missing fields:", { title: !!title, slug: !!slug, content: !!content });
            return new NextResponse("Missing required fields: title, slug, content", { status: 400 });
        }

        // Verify author exists in DB (use authorId which resolves impersonation)
        const userExists = await prisma.user.findUnique({ where: { id: authorId } });
        if (!userExists) {
            console.error("[BLOG_POST] Author not found in DB. authorId:", authorId, "userId:", userId);
            return new NextResponse(JSON.stringify({ error: `Author user not found in database. Please re-login.` }), { 
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        // Check if slug exists
        const existingPost = await prisma.post.findUnique({ where: { slug } });
        if (existingPost) {
            console.warn("[BLOG_POST] Slug conflict:", slug);
            return new NextResponse("Slug already exists", { status: 400 });
        }

        // Serialize imageSettings to string if it's an object
        let imageSettingsStr: string | null = null;
        if (imageSettings) {
            imageSettingsStr = typeof imageSettings === 'string' 
                ? imageSettings 
                : JSON.stringify(imageSettings);
        }

        const post = await prisma.post.create({
            data: {
                title,
                title_en: title_en || null,
                title_de: title_de || null,
                slug,
                content,
                content_en: content_en || null,
                content_de: content_de || null,
                image: image || null,
                imageSettings: imageSettingsStr,
                published: published ?? false,
                category: category || "Genel",
                authorId: authorId
            }
        });

        console.log("[BLOG_POST] Created post:", post.id);
        return NextResponse.json(post);
    } catch (error: any) {
        console.error("[BLOG_POST] Full error:", error?.message, error?.code, error?.meta);
        return new NextResponse(JSON.stringify({ 
            error: error?.message ?? "Internal Error",
            code: error?.code,
            meta: error?.meta
        }), { 
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}

export async function PATCH(req: Request) {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "ADMIN") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { id, imageSettings, ...rest } = body;

        if (!id) {
            return new NextResponse("Post ID required", { status: 400 });
        }

        // Serialize imageSettings to string if it's an object
        let imageSettingsStr: string | null | undefined = undefined;
        if (imageSettings !== undefined) {
            imageSettingsStr = imageSettings === null ? null :
                typeof imageSettings === 'string' ? imageSettings : JSON.stringify(imageSettings);
        }

        const updateData: any = { ...rest };
        if (imageSettingsStr !== undefined) {
            updateData.imageSettings = imageSettingsStr;
        }

        const post = await prisma.post.update({
            where: { id },
            data: updateData
        });

        console.log("[BLOG_PATCH] Updated post:", post.id);
        return NextResponse.json(post);
    } catch (error: any) {
        console.error("[BLOG_PATCH] Full error:", error?.message, error?.code, error?.meta);
        return new NextResponse(JSON.stringify({ 
            error: error?.message ?? "Internal Error",
            code: error?.code,
            meta: error?.meta
        }), { 
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "ADMIN") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return new NextResponse("Post ID required", { status: 400 });
        }

        await prisma.post.delete({ where: { id } });
        console.log("[BLOG_DELETE] Deleted post:", id);
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("[BLOG_DELETE] Full error:", error?.message);
        return new NextResponse(JSON.stringify({ error: error?.message ?? "Internal Error" }), { 
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
