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

    // Content Security Policy (Hardened)
    // Removed 'unsafe-eval' for production security. 
    // Added specific connect-src for crypto-miner prevention and leak protection.
    const cspHeader = `
        default-src 'self';
        script-src 'self' 'unsafe-inline' ${process.env.NODE_ENV === 'development' ? "'unsafe-eval'" : ""} https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/ https://static.cloudflareinsights.com;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        img-src 'self' blob: data: https://images.unsplash.com https://media.istockphoto.com https://wikitravel.org https://img.pikbest.com https://grainy-gradients.vercel.app;
        font-src 'self' https://fonts.gstatic.com;
        frame-src 'self' https://www.google.com/recaptcha/;
        connect-src 'self' https://www.google.com/recaptcha/ https://cloudflareinsights.com https://*.sentry.io;
        worker-src 'self' blob:;
        object-src 'none';
        base-uri 'self';
        form-action 'self';
        frame-ancestors 'none';
        upgrade-insecure-requests;
    `.replace(/\s{2,}/g, ' ').trim();

    // Unified Security Headers
    response.headers.set('Content-Security-Policy', cspHeader);
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('X-Permitted-Cross-Domain-Policies', 'none');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=()');
    response.headers.set('X-DNS-Prefetch-Control', 'on');
    response.headers.set('X-Robots-Tag', 'index, follow');

    // Advanced Protection Headers
    response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
    response.headers.set('Cross-Origin-Resource-Policy', 'same-site');
    response.headers.set('X-Download-Options', 'noopen');

    // Cache Control for static assets (Handling what was in next.config.ts)
    if (pathname.includes('/images/') || pathname.includes('/fonts/')) {
        response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
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
