
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/utils/slugify";


export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> } // Fix params type for Next.js 15+ if needed, but keeping consistent with existing
) {
    try {
        const { id } = await params;
        const body = await req.json();
        const { 
            name, name_en, name_de,
            content, content_en, content_de,
            image, imageSettings, 
            population, 
            language, language_en, language_de,
            currency, 
            capital, capital_en, capital_de,
            timezone, mapsUrl, active, serviceContents,
            visaInfo, visaInfo_en, visaInfo_de,
            workPermit, workPermit_en, workPermit_de,
            costRange, costRange_en, costRange_de,
            overview, overview_en, overview_de,
            shortDesc, shortDesc_en, shortDesc_de
        } = body;

        const updateData: any = {
            name, name_en, name_de,
            content, content_en, content_de,
            image, imageSettings, population, 
            language, language_en, language_de,
            currency, 
            capital, capital_en, capital_de,
            timezone, mapsUrl, active,
            visaInfo, visaInfo_en, visaInfo_de,
            workPermit, workPermit_en, workPermit_de,
            costRange, costRange_en, costRange_de,
            overview, overview_en, overview_de,
            shortDesc, shortDesc_en, shortDesc_de
        };

        if (name) {
            updateData.slug = slugify(name);
        }

        // Transaction to handle both country update and service contents
        const country = await prisma.$transaction(async (tx) => {
            const updatedCountry = await tx.country.update({
                where: { id },
                data: updateData,
                include: { serviceContents: { include: { service: true } } }
            });

            if (serviceContents && Array.isArray(serviceContents)) {
                // Upsert each service content
                for (const sc of serviceContents) {
                    if (!sc.serviceId) continue;

                    await tx.countryServiceContent.upsert({
                        where: {
                            countryId_serviceId: {
                                countryId: id,
                                serviceId: sc.serviceId
                            }
                        },
                        update: {
                            content: sc.content,
                            image: sc.image,
                            imageSettings: sc.imageSettings, // Check if this needs stringify? The client usually sends it as string or object depending on implementation. Assuming consistency.
                            seoTitle: sc.seoTitle,
                            seoDesc: sc.seoDesc
                        },
                        create: {
                            countryId: id,
                            serviceId: sc.serviceId,
                            content: sc.content,
                            image: sc.image,
                            imageSettings: sc.imageSettings,
                            seoTitle: sc.seoTitle,
                            seoDesc: sc.seoDesc
                        }
                    });
                }
            }

            // Return updated data
            return tx.country.findUnique({
                where: { id },
                include: { serviceContents: { include: { service: true } } }
            });
        });

        return NextResponse.json(country);
    } catch (error) {
        console.error("[COUNTRY_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}


export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.country.delete({
            where: { id }
        });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error("[COUNTRY_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
