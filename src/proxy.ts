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

  // Get the JWT token
  // NextAuth v5 uses 'authjs.session-token' as the cookie name by default
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: process.env.NODE_ENV === 'production',
    cookieName: process.env.NODE_ENV === 'production' 
      ? '__Secure-authjs.session-token'
      : 'authjs.session-token',
  });

  const isLoggedIn = !!token;

  // Debug logging (will appear in Vercel function logs)
  console.log('Proxy check:', { pathname, isLoggedIn, hasToken: !!token });

  // Protected routes that require authentication
  const protectedRoutes = ['/seller'];

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Redirect to login if accessing protected route without auth
  if (isProtectedRoute && !isLoggedIn) {
    console.log('Redirecting to login - not authenticated');
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect logged-in users away from login page
  if (pathname === '/login' && isLoggedIn) {
    console.log('Redirecting to seller/listings - already authenticated');
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
