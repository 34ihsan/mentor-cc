import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET() {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const logs = await prisma.emailLog.findMany({
            orderBy: { createdAt: "desc" },
            take: 100, // Limit to 100 most recent logs
        });
        return NextResponse.json(logs);
    } catch (error) {
        console.error("Email logs fetch error:", error);
        return NextResponse.json({ error: "Failed to fetch email logs" }, { status: 500 });
    }
}
