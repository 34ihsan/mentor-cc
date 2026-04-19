
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/utils/slugify";
import { revalidatePath } from "next/cache";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();
        const { name, countryId, city, description, content, image, imageSettings, logo, website, rank, rating, serviceId, metadata, isFeatured, videoUrl } = body;

        const updateData: any = {
            name,
            countryId: countryId || null,
            city,
            description,
            content,
            image,
            imageSettings,
            logo,
            website,
            rank,
            rating: rating ? parseFloat(rating) : null,
            serviceId: serviceId || null,
            metadata: metadata || null,
            isFeatured,
            videoUrl
        };

        if (name) {
            updateData.slug = slugify(name);
        }

        const institution = await prisma.institution.update({
            where: { id },
            data: updateData,
            include: {
                country: true,
                service: true
            }
        });

        revalidatePath(`/kurumsal/kurumlar/${institution.slug}`);
        revalidatePath('/dashboard/admin/institutions');

        return NextResponse.json(institution);
    } catch (error) {
        console.error("[INSTITUTION_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.institution.delete({
            where: { id }
        });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error("[INSTITUTION_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
