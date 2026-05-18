import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. FIRST: Bypass ALL POST requests and Server Actions immediately
  // This prevents Cloudflare challenges and middleware interference with Next.js Server Actions
  if (request.method === 'POST' || request.headers.has('next-action')) {
    return NextResponse.next();
  }

  // 2. Skip all API routes entirely
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // 3. If a locale-prefixed request somehow contains /api/, rewrite to clean path
  if (pathname.includes('/api/')) {
    const apiIndex = pathname.indexOf('/api/');
    const cleanApiPath = pathname.substring(apiIndex);
    return NextResponse.rewrite(new URL(cleanApiPath, request.url));
  }

  // 4. Auth Protection for Dashboard and Admin (GET requests only)
  const isOnDashboard = pathname.includes('/dashboard');
  const isOnAdmin = pathname.includes('/admin');

  if (isOnDashboard || isOnAdmin) {
    // Determine if we are using HTTPS to correctly look up the secure cookie
    const isHttps = request.nextUrl.protocol === 'https:' || request.headers.get('x-forwarded-proto') === 'https';
    
    // Manually check token to avoid NextAuth wrapper bugs
    const token = await getToken({ 
      req: request, 
      secret: process.env.AUTH_SECRET || "bba4a6ff-71ab-4dfc-a51f-e52586209036883bff8c-2488-478a-a7bc-ab818b84ed74",
      secureCookie: isHttps 
    });
    
    if (!token) {
      // Redirect to login
      const loginUrl = new URL('/auth/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 5. Run i18n routing for GET requests
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)', '/', '/(en|tr|de)/:path*']
};
