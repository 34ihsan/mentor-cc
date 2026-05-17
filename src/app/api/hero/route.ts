export const dynamic = 'force-dynamic';

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const context = searchParams.get("context");
        const locale = searchParams.get("locale");

        const slides = await prisma.heroSlide.findMany({
            where: {
                active: true,
                ...(context ? { pageContext: context } : {})
            },
            orderBy: { order: "asc" }
        });

        // Localize results if locale is provided
        const localizedSlides = slides.map(slide => ({
            ...slide,
            title: locale === 'en' ? slide.title_en || slide.title : locale === 'de' ? slide.title_de || slide.title : slide.title,
            subtitle: locale === 'en' ? slide.subtitle_en || slide.subtitle : locale === 'de' ? slide.subtitle_de || slide.subtitle : slide.subtitle
        }));

        return NextResponse.json(localizedSlides);
    } catch (error) {
        console.error("[PUBLIC_HERO_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
