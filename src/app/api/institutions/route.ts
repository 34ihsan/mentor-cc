import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET() {
    try {
        const institutions = await prisma.institution.findMany({
            include: {
                _count: {
                    select: { programs: true }
                }
            },
            orderBy: { name: 'asc' }
        });
        return NextResponse.json(institutions);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch institutions" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await auth();
    // Allow ADMIN and AGENCY (for their own maybe? keeping it broad for now as per dashboard)
    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "CEO")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();

        // Basic validation
        if (!body.name || !body.slug || !body.countryId || !body.city) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const institution = await prisma.institution.create({
            data: {
                name: body.name,
                slug: body.slug,
                countryId: body.countryId,
                city: body.city,
                description: body.description,
                website: body.website,
                image: body.image,
                logo: body.logo
            }
        });
        return NextResponse.json(institution);
    } catch (error) {
        console.error("Create institution error:", error);
        return NextResponse.json({ error: "Failed to create institution" }, { status: 500 });
    }
}
