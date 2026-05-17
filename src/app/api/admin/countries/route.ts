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
        const { 
            name, name_en, name_de,
            content, content_en, content_de,
            image, imageSettings, 
            population, 
            language, language_en, language_de,
            currency, 
            capital, capital_en, capital_de,
            timezone, mapsUrl, active, serviceContents, isFeatured, videoUrl,
            visaInfo, visaInfo_en, visaInfo_de,
            workPermit, workPermit_en, workPermit_de,
            costRange, costRange_en, costRange_de,
            overview, overview_en, overview_de,
            shortDesc, shortDesc_en, shortDesc_de
        } = body;

        const slug = slugify(name);

        const country = await prisma.country.create({
            data: {
                name, name_en, name_de,
                slug,
                content, content_en, content_de,
                image,
                imageSettings,
                population,
                language, language_en, language_de,
                currency,
                capital, capital_en, capital_de,
                timezone,
                mapsUrl,
                active,
                isFeatured: isFeatured || false,
                videoUrl: videoUrl || null,
                visaInfo, visaInfo_en, visaInfo_de,
                workPermit, workPermit_en, workPermit_de,
                costRange, costRange_en, costRange_de,
                overview, overview_en, overview_de,
                shortDesc, shortDesc_en, shortDesc_de,
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

