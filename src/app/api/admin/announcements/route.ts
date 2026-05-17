import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "CEO")) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const announcements = await prisma.announcement.findMany({
            orderBy: { createdAt: "desc" }
        });
        return NextResponse.json(announcements);
    } catch (error) {
        console.error("[ANNOUNCEMENT_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "CEO")) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { title, content, target, active, targetPages, styleSettings, link, startDate, endDate } = body;

        const announcement = await prisma.announcement.create({
            data: {
                title,
                content,
                target: target || null,
                active: active !== undefined ? active : true,
                targetPages: targetPages ? JSON.stringify(targetPages) : JSON.stringify(["ALL"]),
                styleSettings: styleSettings ? JSON.stringify(styleSettings) : null,
                link,
                startDate: startDate ? new Date(startDate) : null,
                endDate: endDate ? new Date(endDate) : null
            }
        });

        return NextResponse.json(announcement);
    } catch (error) {
        console.error("[ANNOUNCEMENT_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
