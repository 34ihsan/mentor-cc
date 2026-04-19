import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // e.g., GLOBAL_HEADER

    try {
        let where: any = { active: true };

        if (type === 'GLOBAL_HEADER') {
            where.targetPages = { contains: 'GLOBAL_HEADER' };
        }

        const announcements = await prisma.announcement.findMany({
            where,
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(announcements);
    } catch (error) {
        console.error('Public Announcements GET error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
