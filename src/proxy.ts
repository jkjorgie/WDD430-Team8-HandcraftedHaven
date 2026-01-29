/**
 * Authentication Proxy (Next.js 16+)
 * 
 * Protects seller routes by requiring authentication.
 * Unauthenticated users are redirected to the login page.
 * 
 * Note: This proxy uses JWT verification without Prisma
 * to be compatible with Edge Runtime.
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the JWT token (doesn't require Prisma)
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  const isLoggedIn = !!token;

  // Protected routes that require authentication
  const protectedRoutes = ['/seller'];

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Redirect to login if accessing protected route without auth
  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect logged-in users away from login page
  if (pathname === '/login' && isLoggedIn) {
    return NextResponse.redirect(new URL('/seller/listings', request.url));
  }

  return NextResponse.next();
}

// Configure which routes the middleware runs on
export const config = {
  matcher: [
    // Match all seller routes
    '/seller/:path*',
    // Match login page
    '/login',
  ],
};
