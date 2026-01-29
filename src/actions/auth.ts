'use server';

import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { UserRole } from '@/generated/prisma/client';

export type RegisterResult = 
  | { success: true; userId: string }
  | { success: false; error: string };

interface RegisterData {
  email: string;
  password: string;
  name: string;
  shopName: string;
  bio?: string;
  location?: string;
}

/**
 * Register a new seller account
 */
export async function registerSeller(data: RegisterData): Promise<RegisterResult> {
  try {
    // Check if email already exists
    const existingUser = await db.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return { success: false, error: 'An account with this email already exists' };
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(data.password, 10);

    // Create user and seller profile in a transaction
    const user = await db.user.create({
      data: {
        email: data.email,
        passwordHash,
        name: data.name,
        role: UserRole.SELLER,
        seller: {
          create: {
            name: data.shopName,
            bio: data.bio || null,
            location: data.location || null,
          },
        },
      },
    });

    return { success: true, userId: user.id };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: 'Failed to create account. Please try again.' };
  }
}
