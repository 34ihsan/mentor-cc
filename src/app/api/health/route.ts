import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    const start = Date.now();

    try {
        // DB bağlantı testi
        await prisma.$queryRaw`SELECT 1`;

        const responseTime = Date.now() - start;
        const mem = process.memoryUsage();

        return NextResponse.json({
            status: 'healthy',
            timestamp: new Date().toISOString(),
            uptime: Math.floor(process.uptime()),
            responseTime: `${responseTime}ms`,
            database: 'connected',
            memory: {
                used: Math.round(mem.heapUsed / 1024 / 1024) + 'MB',
                total: Math.round(mem.heapTotal / 1024 / 1024) + 'MB',
            },
            version: process.env.npm_package_version || '0.1.0',
        });
    } catch (error) {
        return NextResponse.json(
            {
                status: 'unhealthy',
                timestamp: new Date().toISOString(),
                database: 'disconnected',
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 503 }
        );
    }
}
