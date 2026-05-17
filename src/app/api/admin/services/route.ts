import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/utils/slugify";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import fs from "fs";

export async function GET() {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "ADMIN") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const services = await prisma.service.findMany({
            orderBy: { createdAt: 'asc' }
        });
        return NextResponse.json(services);
    } catch (error: any) {
        console.error("GET SERVICES ERROR:", error);
        fs.writeFileSync("get-services-error.txt", JSON.stringify({
            message: error.message,
            stack: error.stack,
            name: error.name
        }, null, 2));
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
            title, title_en, title_de, 
            content, content_en, content_de, 
            image, imageSettings, icon, 
            allowsTargeting, active, 
            seoTitle, seoTitle_en, seoTitle_de, 
            seoDescription, seoDescription_en, seoDescription_de 
        } = body;

        const slug = body.slug || slugify(title);

        const service = await prisma.service.create({
            data: {
                title,
                title_en,
                title_de,
                slug,
                content,
                content_en,
                content_de,
                image,
                imageSettings,
                icon,
                allowsTargeting,
                active,
                seoTitle,
                seoTitle_en,
                seoTitle_de,
                seoDescription,
                seoDescription_en,
                seoDescription_de
            }
        });

        revalidatePath('/dashboard/admin/services');
        revalidatePath('/'); // Navigation

        return NextResponse.json(service);
    } catch (error) {
        console.error("[SERVICE_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
