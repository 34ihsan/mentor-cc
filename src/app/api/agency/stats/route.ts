import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET() {
    const session = await auth();
    const userId = session?.user?.id;
    const role = session?.user?.role;

    if (!session || role !== "AGENCY_MANAGER") {
        return NextResponse.json({ error: "Unauthorized or not an agency manager" }, { status: 401 });
    }

    try {
        const [
            myLeadsCount,
            myApplicationsCount,
            pendingAppsCount,
            myCommissionData,
            recentApplications
        ] = await Promise.all([
            prisma.lead.count({ where: { agencyId: userId } }),
            prisma.application.count({ where: { agencyId: userId } }),
            prisma.application.count({ where: { agencyId: userId, status: "DOCS_PENDING" } }),
            prisma.commission.findMany({
                where: { agencyId: userId },
                select: { amount: true, currency: true }
            }),
            prisma.application.findMany({
                where: { agencyId: userId },
                take: 5,
                orderBy: { createdAt: 'desc' },
                include: {
                    student: { select: { name: true, email: true } },
                    program: { select: { name: true } }
                }
            })
        ]);

        const totalCommissionUSD = myCommissionData.reduce((acc, curr) => {
             const amt = curr.amount;
             if (curr.currency === "EUR") return acc + (amt * 1.1);
             return acc + amt;
        }, 0);

        return NextResponse.json({
            summary: {
                totalLeads: myLeadsCount,
                totalApplications: myApplicationsCount,
                pendingActions: pendingAppsCount,
                totalCommissionEstimated: Math.round(totalCommissionUSD)
            },
            recentApplications
        });
    } catch (error) {
        console.error("Agency stats API error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
