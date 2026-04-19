import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET() {
    const session = await auth();
    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "CEO")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // Basic Counts
        const [
            totalUsers,
            students,
            advisors,
            agencies,
            totalApplications,
            totalPrograms,
            totalInstitutions,
            totalOffers,
            acceptedOffers,
        ] = await Promise.all([
            prisma.user.count(),
            prisma.user.count({ where: { role: "STUDENT" } }),
            prisma.user.count({ where: { role: "ADVISOR" } }),
            prisma.user.count({ where: { role: "AGENCY_MANAGER" } }),
            prisma.application.count(),
            prisma.program.count(),
            prisma.institution.count(),
            prisma.offer.count(),
            prisma.offer.count({ where: { status: "ACCEPTED" } }),
        ]);

        // Status Distribution
        const applicationsByStatus = await prisma.application.groupBy({
            by: ['status'],
            _count: true
        });

        const statusDistribution = applicationsByStatus.reduce((acc: any, curr) => {
            acc[curr.status] = curr._count;
            return acc;
        }, {});

        // Monthly Growth (Last 6 months)
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
        sixMonthsAgo.setDate(1);

        const monthlyApps = await prisma.application.findMany({
            where: { createdAt: { gte: sixMonthsAgo } },
            select: { createdAt: true }
        });

        // Group by month
        const monthlyGrowth = Array.from({ length: 6 }).map((_, i) => {
            const d = new Date();
            d.setMonth(d.getMonth() - (5 - i));
            const monthName = d.toLocaleString('tr-TR', { month: 'short' });
            const count = monthlyApps.filter(a =>
                a.createdAt.getMonth() === d.getMonth() &&
                a.createdAt.getFullYear() === d.getFullYear()
            ).length;
            return { name: monthName, count };
        });

        // Country Distribution
        const appsWithCountry = await prisma.application.findMany({
            include: { program: { include: { institution: { include: { country: true } } } } }
        });

        const countryDist: Record<string, number> = {};
        appsWithCountry.forEach(app => {
            const country = app.program.institution.country?.name || "Unknown";
            countryDist[country] = (countryDist[country] || 0) + 1;
        });

        const topCountries = Object.entries(countryDist)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);

        // Revenue estimation
        const acceptedOffersData = await prisma.offer.findMany({
            where: { status: "ACCEPTED" },
            select: { amount: true, currency: true }
        });

        const totalRevenue = acceptedOffersData.reduce((acc, curr) => {
            // Very simple conversion logic for demo (USD 1, EUR 1.1, GBP 1.3)
            const amt = parseFloat(String(curr.amount || "0"));
            if (curr.currency === "EUR") return acc + (amt * 1.1);
            if (curr.currency === "GBP") return acc + (amt * 1.3);
            return acc + amt;
        }, 0);

        const stats = {
            users: { total: totalUsers, students, advisors, agencies },
            applications: {
                total: totalApplications,
                distribution: statusDistribution,
                monthlyGrowth,
                topCountries
            },
            programs: { total: totalPrograms },
            institutions: { total: totalInstitutions },
            offers: { total: totalOffers, accepted: acceptedOffers },
            revenue: { totalEstimatedUSD: Math.round(totalRevenue) }
        };

        return NextResponse.json(stats);
    } catch (error) {
        console.error("Failed to fetch admin stats:", error);
        return NextResponse.json({ error: "Failed to fetch statistics" }, { status: 500 });
    }
}
