import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
    try {
        const services = await prisma.service.findMany({
            where: { active: true },
            include: {
                countryContents: {
                    include: {
                        country: true
                    },
                    where: {
                        country: { active: true }
                    }
                }
            },
            orderBy: { order: 'asc' }
        });
        return NextResponse.json(services);
    } catch (error) {
        console.error('Public Services GET error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
