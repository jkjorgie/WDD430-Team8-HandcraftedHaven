/**
 * NextAuth.js Configuration
 * 
 * This module configures authentication using NextAuth.js v5 with credentials provider.
 * It authenticates against the users table in the database.
 */

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Required for Vercel deployment
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log('Missing credentials');
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        try {
          // Find user by email
          const user = await db.user.findUnique({
            where: { email },
            include: { seller: true },
          });

          if (!user) {
            console.log('User not found:', email);
            return null;
          }

          // Verify password
          const isValidPassword = await bcrypt.compare(password, user.passwordHash);

          if (!isValidPassword) {
            console.log('Invalid password for:', email);
            return null;
          }

          // Return user object (excluding password hash)
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            sellerId: user.seller?.id || null,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add custom user data to JWT token
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.sellerId = user.sellerId;
      }
      return token;
    },
    async session({ session, token }) {
      // Add custom data to session
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as 'USER' | 'SELLER' | 'ADMIN';
        session.user.sellerId = token.sellerId as string | null;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  // Enable debug logging in development
  debug: process.env.NODE_ENV === 'development',
});
