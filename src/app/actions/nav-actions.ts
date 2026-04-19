"use server";

import { prisma } from "@/lib/prisma";

export async function getNavServices() {
    try {
        const services = await prisma.service.findMany({
            where: { active: true },
            include: {
                countryContents: {
                    include: {
                        country: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        return services;
    } catch (error: any) {
        console.error("CRITICAL: Error fetching services for nav:", {
            message: error.message,
            stack: error.stack
        });
        return [];
    }
}
