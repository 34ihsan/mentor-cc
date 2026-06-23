import { NextResponse } from 'next/server';
import { join } from 'path';
import { readFileSync, existsSync } from 'fs';


const mimeMap: Record<string, string> = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
};

export async function GET(
    request: Request,
    { params }: { params: Promise<{ path: string[] }> }
) {
    try {
        const { path } = await params;
        const filePath = join(process.cwd(), 'public', 'uploads', ...path);

        if (!existsSync(filePath)) {
            return new NextResponse('File not found', { status: 404 });
        }

        const fileBuffer = readFileSync(filePath);
        
        // Get extension from the last part of the path
        const filename = path[path.length - 1];
        const ext = '.' + filename.split('.').pop()?.toLowerCase();
        const contentType = mimeMap[ext] || 'application/octet-stream';

        return new NextResponse(fileBuffer, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });
    } catch (error) {
        console.error('Error serving file:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
