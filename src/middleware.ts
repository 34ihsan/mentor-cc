import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Basic rate limiting map (IP -> timestamp)
// In production, use Redis or a similar external store for shared state
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 60; // 60 requests per minute

import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
const { auth } = NextAuth(authConfig);


const intlMiddleware = createMiddleware({
    ...routing,
    localeDetection: false
});

export async function middleware(request: NextRequest) {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               '127.0.0.1';
    const now = Date.now();
    
    // Path-based Rate Limiting
    const pathname = request.nextUrl.pathname;
    const isSensitivePath = 
        pathname.startsWith('/api/auth') || 
        pathname.startsWith('/api/register');
    
    // Auth routes are more strictly limited (15 req/min) vs public ones (60 req/min)
    const limit = isSensitivePath ? 15 : MAX_REQUESTS;

    if (isSensitivePath || pathname.startsWith('/api/public')) {
        const rateData = rateLimitMap.get(ip) ?? { count: 0, lastReset: now };

        if (now - rateData.lastReset > RATE_LIMIT_WINDOW) {
            rateData.count = 0;
            rateData.lastReset = now;
        }

        rateData.count++;
        rateLimitMap.set(ip, rateData);

        if (rateData.count > limit) {
            return new NextResponse('Too Many Requests', { 
                status: 429,
                headers: {
                    'Retry-After': '60',
                    'Content-Type': 'text/plain',
                    'X-RateLimit-Limit': limit.toString(),
                    'X-RateLimit-Remaining': '0',
                }
            });
        }
    }

    // Execute next-intl middleware
    const response = intlMiddleware(request);

    // Centralized Dashboard Protection
    const isDashboardPath = /^\/(tr|en)\/dashboard/.test(pathname);

    if (isDashboardPath) {
        const session = await auth();
        if (!session) {
            const loginUrl = new URL(`/${pathname.split('/')[1]}/auth/login`, request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    return response;
}

export const config = {
    matcher: [
        // Enable a redirect to a matching locale at the root
        '/',

        // Set a cookie to remember the previous locale for
        // all requests that have a locale prefix
        '/(tr|en)/:path*',

        // Enable redirects that add missing locales
        // (e.g. `/pathnames` -> `/en/pathnames`)
        '/((?!api|_next/static|_next/image|images|favicon.ico|.*\\..*).*)',
    ],
};
