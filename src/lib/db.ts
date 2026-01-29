/**
 * Database utility module
 * 
 * This module provides a singleton PrismaClient instance that can be imported
 * throughout the application. It prevents multiple instances of PrismaClient
 * in development mode due to hot reloading.
 * 
 * Usage:
 *   import { db } from '@/lib/db';
 *   
 *   // Read operations
 *   const users = await db.user.findMany();
 *   const product = await db.product.findUnique({ where: { id: '...' } });
 *   
 *   // Write operations
 *   const newUser = await db.user.create({ data: { ... } });
 *   const updatedProduct = await db.product.update({ where: { id: '...' }, data: { ... } });
 *   
 *   // Delete operations
 *   await db.review.delete({ where: { id: '...' } });
 */

import { PrismaClient } from '@/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

// Declare global variable type for PrismaClient singleton in development
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Create the PostgreSQL adapter
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

// Create PrismaClient singleton
// In production: create a new instance
// In development: reuse existing instance to prevent hot reload issues
const db = globalThis.prisma ?? new PrismaClient({
  adapter,
  log: process.env.NODE_ENV === 'development' 
    ? ['query', 'error', 'warn'] 
    : ['error'],
});

// Store the instance globally in development to prevent multiple instances
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = db;
}

export { db };

// Export types for convenience
export type { 
  User, 
  Seller, 
  Product, 
  Review,
  ProductCategory,
  ProductStatus,
  UserRole,
} from '@/generated/prisma/client';
