import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await auth();
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { title, slug, content, excerpt, image, imageSettings, category, published, seoTitle, seoDescription, keywords } = body;

        const page = await prisma.page.update({
            where: { id },
            data: {
                title,
                slug,
                content,
                excerpt,
                image,
                imageSettings,
                category,
                published: published !== undefined ? published : undefined,
                seoTitle,
                seoDescription,
                keywords
            }
        });

        return NextResponse.json(page);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update page" }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await auth();
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await prisma.page.delete({
            where: { id }
        });

        return NextResponse.json({ message: "Page deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete page" }, { status: 500 });
    }
}
