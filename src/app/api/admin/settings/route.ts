import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function GET(request: Request) {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');

    try {
        if (key) {
            const setting = await prisma.settings.findUnique({
                where: { key }
            });
            return NextResponse.json(setting);
        }

        const settings = await prisma.settings.findMany();
        return NextResponse.json(settings);
    } catch (error) {
        console.error('Settings GET error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}

export async function PATCH(request: Request) {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const { key, value } = await request.json();

        if (!key || value === undefined) {
            return new NextResponse('Missing key or value', { status: 400 });
        }

        // value should be a string (usually stringified JSON)
        const valString = typeof value === 'string' ? value : JSON.stringify(value);

        const setting = await prisma.settings.upsert({
            where: { key },
            update: { value: valString },
            create: { key, value: valString }
        });

        return NextResponse.json(setting);
    } catch (error) {
        console.error('Settings PATCH error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
