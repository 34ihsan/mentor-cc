
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const posts = await prisma.post.findMany({
            where: {
                published: true
            },
            orderBy: {
                createdAt: "desc"
            },
            take: 3,
            include: {
                author: {
                    select: { name: true }
                }
            }
        });
        return NextResponse.json(posts);
    } catch (error) {
        console.error("Failed to fetch latest blog posts:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
