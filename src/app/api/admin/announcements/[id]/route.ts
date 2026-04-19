
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "ADMIN") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { title, content, target, active, targetPages, styleSettings, link, startDate, endDate } = body;

        const announcement = await prisma.announcement.update({
            where: { id: params.id },
            data: {
                title,
                content,
                target,
                active,
                targetPages: targetPages ? JSON.stringify(targetPages) : undefined,
                styleSettings: styleSettings ? JSON.stringify(styleSettings) : undefined,
                link,
                startDate: startDate ? new Date(startDate) : undefined,
                endDate: endDate ? new Date(endDate) : undefined
            }
        });

        return NextResponse.json(announcement);
    } catch (error) {
        console.error("[ANNOUNCEMENT_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "ADMIN") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await prisma.announcement.delete({
            where: { id: params.id }
        });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error("[ANNOUNCEMENT_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
