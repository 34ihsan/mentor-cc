import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Skip all API routes entirely
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // 2. If a locale-prefixed request somehow contains /api/, rewrite to clean path
  if (pathname.includes('/api/')) {
    const apiIndex = pathname.indexOf('/api/');
    const cleanApiPath = pathname.substring(apiIndex);
    return NextResponse.rewrite(new URL(cleanApiPath, request.url));
  }

  // 3. Auth Protection for Dashboard and Admin
  const isOnDashboard = pathname.includes('/dashboard');
  const isOnAdmin = pathname.includes('/admin');

  if (isOnDashboard || isOnAdmin) {
    // Manually check token to avoid NextAuth wrapper bugs
    const token = await getToken({ 
      req: request, 
      secret: process.env.AUTH_SECRET,
      secureCookie: false // Align with hardcoded 'next-auth.session-token' in auth.config.ts
    });
    
    if (!token) {
      // Redirect to login
      const loginUrl = new URL('/auth/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 4. Bypass i18n routing for POST requests / Server Actions to prevent redirect/fetch failures
  if (request.method === 'POST' || request.headers.has('next-action')) {
    return NextResponse.next();
  }

  // 5. Run i18n routing
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)', '/', '/(en|tr|de)/:path*']
};
