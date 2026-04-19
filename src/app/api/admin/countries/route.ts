import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/utils/slugify";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "ADMIN") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const countries = await prisma.country.findMany({
            orderBy: { name: 'asc' },
            include: {
                serviceContents: {
                    include: { service: true }
                }
            }
        });

        return NextResponse.json(countries);
    } catch (error) {
        console.error("[COUNTRIES_GET]", error);
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
        const { name, content, image, imageSettings, population, language, currency, capital, timezone, mapsUrl, active, serviceContents, isFeatured, videoUrl } = body;

        const slug = slugify(name);

        const country = await prisma.country.create({
            data: {
                name,
                slug,
                content,
                image,
                imageSettings,
                population,
                language,
                currency,
                capital,
                timezone,
                mapsUrl,
                active,
                isFeatured: isFeatured || false,
                videoUrl: videoUrl || null,
                serviceContents: {
                    create: serviceContents?.map((sc: any) => ({
                        serviceId: sc.serviceId,
                        content: sc.content,
                        image: sc.image,
                        imageSettings: sc.imageSettings,
                        seoTitle: sc.seoTitle,
                        seoDesc: sc.seoDesc
                    }))
                }
            },
            include: {
                serviceContents: {
                    include: { service: true }
                }
            }
        });

        return NextResponse.json(country);
    } catch (error) {
        console.error("[COUNTRY_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

