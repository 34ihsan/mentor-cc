import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const { auth } = NextAuth(authConfig);

export default auth((request) => {
  const { pathname } = request.nextUrl;

  // 1. Skip all API routes entirely — let Next.js handle them directly
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // 2. If a locale-prefixed request somehow contains /api/, rewrite to clean path
  if (pathname.includes('/api/')) {
    const apiIndex = pathname.indexOf('/api/');
    const cleanApiPath = pathname.substring(apiIndex);
    return NextResponse.rewrite(new URL(cleanApiPath, request.url));
  }

  // 3. Auth Protection & i18n for all other routes
  return intlMiddleware(request);
});


export const config = {
  // Matcher: exclude api, _next, static files, favicon from middleware
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)', '/', '/(en|tr|de)/:path*']
};
