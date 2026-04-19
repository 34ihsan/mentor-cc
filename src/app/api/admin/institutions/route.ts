import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/utils/slugify";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET() {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "ADMIN") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const institutions = await prisma.institution.findMany({
            orderBy: { name: 'asc' },
            include: {
                _count: { select: { programs: true } },
                service: true,
                country: true
            }
        });
        return NextResponse.json(institutions);
    } catch (error) {
        console.error("[INSTITUTIONS_GET]", error);
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
        const { name, countryId, city, description, content, image, imageSettings, logo, website, rank, rating, serviceId, metadata, isFeatured, videoUrl } = body;

        const slug = slugify(name);

        const institution = await prisma.institution.create({
            data: {
                name,
                slug,
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
                isFeatured: isFeatured || false,
                videoUrl: videoUrl || null
            },
            include: {
                country: true,
                service: true
            }
        });

        revalidatePath(`/kurumsal/kurumlar/${institution.slug}`);
        revalidatePath('/dashboard/admin/institutions');

        // Automatic Harvester Trigger (Phase 7)
        if (institution.website) {
            const { triggerHarvesterAction } = await import("@/app/actions/harvester-actions");
            triggerHarvesterAction(institution.id, institution.website).catch(console.error);
        }

        return NextResponse.json(institution);
    } catch (error) {
        console.error("[INSTITUTION_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
