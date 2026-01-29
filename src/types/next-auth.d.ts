/**
 * NextAuth.js Type Extensions
 * 
 * Extends the default NextAuth types to include custom user properties.
 */

import 'next-auth';

// Define UserRole type here to avoid Edge Runtime issues
type UserRole = 'USER' | 'SELLER' | 'ADMIN';

declare module 'next-auth' {
  interface User {
    id: string;
    role: UserRole;
    sellerId: string | null;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      role: UserRole;
      sellerId: string | null;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: UserRole;
    sellerId: string | null;
  }
}
