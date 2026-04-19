
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();
        const { name, office, mapsUrl, isActive } = body;

        const region = await prisma.region.update({
            where: { id },
            data: {
                name,
                office,
                mapsUrl,
                isActive
            }
        });

        return NextResponse.json(region);
    } catch (error) {
        console.error("[REGION_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.region.delete({
            where: { id }
        });
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error("[REGION_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
