import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const ALLOWED_PUBLIC_KEYS = ['site_config', 'home_page_config', 'workflow_steps', 'blog_page_config'];

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');

    try {
        if (key) {
            if (!ALLOWED_PUBLIC_KEYS.includes(key)) {
                return new NextResponse('Forbidden', { status: 403 });
            }

            const setting = await prisma.settings.findUnique({
                where: { key }
            });
            return NextResponse.json(setting);
        }

        const settings = await prisma.settings.findMany({
            where: {
                key: { in: ALLOWED_PUBLIC_KEYS }
            }
        });
        return NextResponse.json(settings);
    } catch (error) {
        console.error('Public Settings GET error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
