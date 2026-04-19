import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET() {
    const session = await auth();
    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "CEO")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // 1. Total Offered Volume (Sum of all active/pending offers)
        const totalOffered = await prisma.offer.aggregate({
            _sum: {
                amount: true
            }
        });

        // 2. Active Contracts (Signed or Sent)
        const activeContracts = await prisma.contract.count({
            where: {
                status: { in: ["SENT", "SIGNED"] }
            }
        });

        // 3. Pending Signatures (Sent but not yet Signed)
        const pendingSignatures = await prisma.contract.count({
            where: {
                status: "SENT",
                signedAt: null
            }
        });

        // 4. Conversion Rate (Signed Contracts / Total Applications)
        const totalApps = await prisma.application.count();
        const signedContracts = await prisma.contract.count({
            where: { status: "SIGNED" }
        });
        const conversionRate = totalApps > 0 ? Math.round((signedContracts / totalApps) * 100) : 0;

        // 5. Recent Activity (Latest 5 actions)
        const recentActivity = await prisma.activityLog.findMany({
            take: 5,
            orderBy: { createdAt: "desc" },
            include: {
                user: { select: { name: true } }
            }
        });

        return NextResponse.json({
            totalOffered: totalOffered._sum.amount || 0,
            activeContracts,
            pendingSignatures,
            conversionRate,
            recentActivity: recentActivity.map(log => ({
                user: log.user?.name || "Sistem",
                action: log.details || log.action,
                time: log.createdAt,
                type: log.action.includes("UPLOAD") || log.action.includes("SIGN") ? "success" : "warning"
            }))
        });
    } catch (error: any) {
        console.error("Dashboard stats error:", error);
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }
}
