/**
 * NextAuth.js API Route Handler
 * 
 * Handles all authentication API routes (/api/auth/*)
 */

import { handlers } from '@/lib/auth';

export const { GET, POST } = handlers;
