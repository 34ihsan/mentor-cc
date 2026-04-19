import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    // Public read access is fine for institutions usually, or restrict if needed.
    // Dashboard middleware handles page protection, but good to be safe.

    try {
        let institution = await prisma.institution.findUnique({
            where: { id },
            include: {
                programs: true,
            },
        });

        if (!institution) {
            institution = await prisma.institution.findUnique({
                where: { slug: id },
                include: {
                    programs: true,
                },
            });
        }

        if (!institution) {
            console.log(`[API] Institution not found for id/slug: ${id}`);
            return NextResponse.json({ error: "Institution not found" }, { status: 404 });
        }

        console.log(`[API] Found institution: ${institution.name} (Slug: ${institution.slug})`);
        return NextResponse.json(institution);
    } catch (error) {
        console.error(`[API] Failed to fetch institution: ${error}`);
        return NextResponse.json({ error: "Failed to fetch institution" }, { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const session = await auth();
    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "CEO")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const institution = await prisma.institution.update({
            where: { id },
            data: {
                name: body.name,
                slug: body.slug,
                city: body.city,
                countryId: body.countryId,
                description: body.description,
                website: body.website,
                image: body.image,
                logo: body.logo
            },
        });

        return NextResponse.json(institution);
    } catch (error) {
        console.error("Failed to update institution:", error);
        return NextResponse.json({ error: "Failed to update institution" }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const session = await auth();
    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "CEO")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await prisma.institution.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to delete institution:", error);
        return NextResponse.json({ error: "Failed to delete institution" }, { status: 500 });
    }
}
