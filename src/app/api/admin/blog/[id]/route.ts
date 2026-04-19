
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        const post = await prisma.post.findUnique({
            where: { id: params.id },
            include: {
                author: {
                    select: { name: true }
                }
            }
        });

        if (!post) {
            return new NextResponse("Post not found", { status: 404 });
        }

        return NextResponse.json(post);
    } catch (error) {
        console.error("[BLOG_GET_ID]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "ADMIN") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { title, slug, content, image, published, category, imageSettings } = body;

        const post = await prisma.post.update({
            where: { id: params.id },
            data: {
                title,
                slug,
                content,
                image,
                imageSettings,
                published,
                category
            }
        });

        return NextResponse.json(post);
    } catch (error) {
        console.error("[BLOG_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "ADMIN") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await prisma.post.delete({
            where: { id: params.id }
        });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error("[BLOG_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
