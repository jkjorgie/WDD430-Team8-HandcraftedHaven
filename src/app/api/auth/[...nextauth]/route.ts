/**
 * NextAuth.js API Route Handler
 * 
 * Handles all authentication API routes (/api/auth/*)
 */

import { handlers } from '@/lib/auth';

export const { GET, POST } = handlers;

// Force Node.js runtime (not Edge) for database access
export const runtime = 'nodejs';
