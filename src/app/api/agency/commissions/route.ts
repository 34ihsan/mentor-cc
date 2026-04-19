import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const commissions = await prisma.commission.findMany({
            where: { agencyId: session.user.id },
            orderBy: { date: "desc" }
        });

        // Mock data if empty for demo purposes, but normally we just return real data
        if (commissions.length === 0) {
            // We can return empty or seeded data here if needed, but for "Super Tester" we want real logic.
        }

        return NextResponse.json(commissions);
    } catch (error) {
        return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
    }
}
