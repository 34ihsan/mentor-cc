
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "ADMIN") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const slides = await prisma.heroSlide.findMany({
            orderBy: { order: "asc" }
        });
        return NextResponse.json(slides);
    } catch (error) {
        console.error("[HERO_GET]", error);
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
        const { 
            title, 
            title_en, 
            title_de, 
            subtitle, 
            subtitle_en, 
            subtitle_de, 
            imageUrl, 
            link, 
            pageContext, 
            order, 
            active, 
            imageSettings 
        } = body;

        if (!imageUrl) {
            return new NextResponse("Image URL is required", { status: 400 });
        }

        const slide = await prisma.heroSlide.create({
            data: {
                title,
                title_en,
                title_de,
                subtitle,
                subtitle_en,
                subtitle_de,
                imageUrl,
                link,
                pageContext: pageContext || "home",
                order: order || 0,
                active: active !== undefined ? active : true,
                imageSettings: imageSettings || null,
            }
        });

        return NextResponse.json(slide);
    } catch (error) {
        console.error("[HERO_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
