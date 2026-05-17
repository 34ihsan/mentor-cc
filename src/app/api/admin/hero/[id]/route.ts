
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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

        const slide = await prisma.heroSlide.update({
            where: { id: params.id },
            data: {
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
            }
        });

        return NextResponse.json(slide);
    } catch (error) {
        console.error("[HERO_PATCH]", error);
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

        await prisma.heroSlide.delete({
            where: { id: params.id }
        });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error("[HERO_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
