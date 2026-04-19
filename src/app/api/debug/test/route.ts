import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        console.log("DEBUG: Testing Services GET...");
        const services = await prisma.service.findMany({
            orderBy: { createdAt: 'desc' }
        });

        console.log("DEBUG: Testing Institutions GET...");
        const institutions = await prisma.institution.findMany({
            include: { service: true }
        });

        return NextResponse.json({
            success: true,
            serviceCount: services.length,
            institutionCount: institutions.length
        });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message,
            stack: error.stack,
            code: error.code
        }, { status: 500 });
    }
}
