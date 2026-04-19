
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const regions = await prisma.region.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(regions);
    } catch (error) {
        console.error("[REGIONS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, office, mapsUrl, isActive } = body;

        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        const region = await prisma.region.create({
            data: {
                name,
                office,
                mapsUrl,
                isActive: isActive !== undefined ? isActive : true
            }
        });

        return NextResponse.json(region);
    } catch (error) {
        console.error("[REGIONS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
