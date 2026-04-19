import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');

    // Only allow specific public keys to be fetched
    const allowedKeys = ['site_config', 'home_page_config', 'workflow_steps'];

    if (key && !allowedKeys.includes(key)) {
        return new NextResponse('Forbidden', { status: 403 });
    }

    try {
        if (key) {
            const setting = await prisma.settings.findUnique({
                where: { key }
            });
            return NextResponse.json(setting);
        }

        // If no key, return all public keys
        const settings = await prisma.settings.findMany({
            where: {
                key: { in: allowedKeys }
            }
        });
        return NextResponse.json(settings);
    } catch (error) {
        console.error('Public Settings GET error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
