/**
 * Database Seed Script
 * 
 * This script populates the database with initial dummy data for development
 * and testing purposes. Run with: npx prisma db seed
 */

import 'dotenv/config';
import { PrismaClient, ProductCategory, ProductStatus, UserRole } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting database seed...\n');

  // Clear existing data (in reverse order of dependencies)
  console.log('🧹 Clearing existing data...');
  await prisma.review.deleteMany();
  await prisma.product.deleteMany();
  await prisma.seller.deleteMany();
  await prisma.user.deleteMany();
  console.log('✅ Existing data cleared\n');

  // ============================================
  // SEED USERS
  // ============================================
  console.log('👤 Creating users...');
  
  const passwordHash = await bcrypt.hash('password123', 10);
  
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'admin@handcraftedhaven.com',
        passwordHash,
        name: 'Admin User',
        role: UserRole.ADMIN,
      },
    }),
    prisma.user.create({
      data: {
        email: 'sarah.weaver@email.com',
        passwordHash,
        name: 'Sarah Weaver',
        role: UserRole.SELLER,
      },
    }),
    prisma.user.create({
      data: {
        email: 'mike.potter@email.com',
        passwordHash,
        name: 'Mike Potter',
        role: UserRole.SELLER,
      },
    }),
    prisma.user.create({
      data: {
        email: 'emma.woodcraft@email.com',
        passwordHash,
        name: 'Emma Woodcraft',
        role: UserRole.SELLER,
      },
    }),
    prisma.user.create({
      data: {
        email: 'customer1@email.com',
        passwordHash,
        name: 'John Customer',
        role: UserRole.USER,
      },
    }),
    prisma.user.create({
      data: {
        email: 'customer2@email.com',
        passwordHash,
        name: 'Jane Shopper',
        role: UserRole.USER,
      },
    }),
  ]);

  console.log(`✅ Created ${users.length} users\n`);

  // ============================================
  // SEED SELLERS
  // ============================================
  console.log('🏪 Creating sellers...');

  const sellers = await Promise.all([
    prisma.seller.create({
      data: {
        userId: users[1].id, // Sarah
        name: "Sarah's Textile Studio",
        bio: 'Handwoven textiles using traditional techniques passed down through generations. Each piece tells a story of craftsmanship and dedication.',
        location: 'Portland, Oregon',
      },
    }),
    prisma.seller.create({
      data: {
        userId: users[2].id, // Mike
        name: "Mike's Pottery Workshop",
        bio: 'Creating functional and decorative pottery with a modern twist. All pieces are wheel-thrown and kiln-fired in our home studio.',
        location: 'Austin, Texas',
      },
    }),
    prisma.seller.create({
      data: {
        userId: users[3].id, // Emma
        name: "Emma's Woodworking",
        bio: 'Sustainable woodcraft from locally sourced materials. Specializing in kitchen items and home decor that bring warmth to any space.',
        location: 'Burlington, Vermont',
      },
    }),
  ]);

  console.log(`✅ Created ${sellers.length} sellers\n`);

  // ============================================
  // SEED PRODUCTS
  // ============================================
  console.log('📦 Creating products...');

  const products = await Promise.all([
    // Sarah's Textile Products
    prisma.product.create({
      data: {
        sellerId: sellers[0].id,
        title: 'Handwoven Wool Blanket',
        description: 'A luxurious handwoven blanket made from 100% merino wool. Perfect for cozy evenings by the fireplace. Each blanket takes approximately 40 hours to complete.',
        category: ProductCategory.TEXTILES_WEAVINGS,
        price: 249.99,
        stock: 5,
        status: ProductStatus.PUBLISHED,
        imageUrl: 'https://picsum.photos/seed/blanket/400/400',
      },
    }),
    prisma.product.create({
      data: {
        sellerId: sellers[0].id,
        title: 'Cotton Table Runner',
        description: 'Hand-loomed cotton table runner with geometric patterns. Available in natural and indigo dyed options.',
        category: ProductCategory.TEXTILES_WEAVINGS,
        price: 45.00,
        stock: 15,
        status: ProductStatus.PUBLISHED,
        imageUrl: 'https://picsum.photos/seed/runner/400/400',
      },
    }),
    prisma.product.create({
      data: {
        sellerId: sellers[0].id,
        title: 'Woven Wall Hanging',
        description: 'Modern macramé-inspired wall hanging. A beautiful accent piece for any room.',
        category: ProductCategory.HOME_DECOR,
        price: 89.00,
        stock: 8,
        status: ProductStatus.PUBLISHED,
        imageUrl: 'https://picsum.photos/seed/wallhanging/400/400',
      },
    }),
    prisma.product.create({
      data: {
        sellerId: sellers[0].id,
        title: 'Handwoven Scarf (Draft)',
        description: 'Silk and wool blend scarf - work in progress.',
        category: ProductCategory.ACCESSORIES,
        price: 75.00,
        stock: 0,
        status: ProductStatus.DRAFT,
        imageUrl: 'https://picsum.photos/seed/scarf/400/400',
      },
    }),

    // Mike's Pottery Products
    prisma.product.create({
      data: {
        sellerId: sellers[1].id,
        title: 'Ceramic Dinner Plate Set',
        description: 'Set of 4 hand-thrown ceramic dinner plates with a beautiful reactive glaze. Microwave and dishwasher safe.',
        category: ProductCategory.CERAMICS_POTTERY,
        price: 120.00,
        stock: 12,
        status: ProductStatus.PUBLISHED,
        imageUrl: 'https://picsum.photos/seed/plates/400/400',
      },
    }),
    prisma.product.create({
      data: {
        sellerId: sellers[1].id,
        title: 'Rustic Ceramic Vase',
        description: 'A stunning centerpiece vase with a unique earth-toned glaze. Each piece is one-of-a-kind.',
        category: ProductCategory.CERAMICS_POTTERY,
        price: 85.00,
        stock: 6,
        status: ProductStatus.PUBLISHED,
        imageUrl: 'https://picsum.photos/seed/vase/400/400',
      },
    }),
    prisma.product.create({
      data: {
        sellerId: sellers[1].id,
        title: 'Espresso Cup Set',
        description: 'Handcrafted espresso cups with matching saucers. Set of 2.',
        category: ProductCategory.CERAMICS_POTTERY,
        price: 55.00,
        stock: 20,
        status: ProductStatus.PUBLISHED,
        imageUrl: 'https://picsum.photos/seed/espresso/400/400',
      },
    }),
    prisma.product.create({
      data: {
        sellerId: sellers[1].id,
        title: 'Decorative Bowl (Discontinued)',
        description: 'This design has been retired.',
        category: ProductCategory.CERAMICS_POTTERY,
        price: 40.00,
        stock: 2,
        status: ProductStatus.DISABLED,
        imageUrl: 'https://picsum.photos/seed/bowl/400/400',
      },
    }),

    // Emma's Woodcraft Products
    prisma.product.create({
      data: {
        sellerId: sellers[2].id,
        title: 'Walnut Cutting Board',
        description: 'End-grain walnut cutting board, gentle on knives and built to last generations. Finished with food-safe mineral oil.',
        category: ProductCategory.WOODCRAFT,
        price: 95.00,
        stock: 10,
        status: ProductStatus.PUBLISHED,
        imageUrl: 'https://picsum.photos/seed/cuttingboard/400/400',
      },
    }),
    prisma.product.create({
      data: {
        sellerId: sellers[2].id,
        title: 'Maple Salad Bowl',
        description: 'Large turned maple salad bowl. A statement piece for your kitchen.',
        category: ProductCategory.WOODCRAFT,
        price: 145.00,
        stock: 4,
        status: ProductStatus.PUBLISHED,
        imageUrl: 'https://picsum.photos/seed/saladbowl/400/400',
      },
    }),
    prisma.product.create({
      data: {
        sellerId: sellers[2].id,
        title: 'Wooden Jewelry Box',
        description: 'Handcrafted cherry wood jewelry box with velvet-lined compartments.',
        category: ProductCategory.JEWELRY,
        price: 125.00,
        stock: 7,
        status: ProductStatus.PUBLISHED,
        imageUrl: 'https://picsum.photos/seed/jewelrybox/400/400',
      },
    }),
    prisma.product.create({
      data: {
        sellerId: sellers[2].id,
        title: 'Floating Shelf Set',
        description: 'Set of 3 floating shelves made from reclaimed barn wood.',
        category: ProductCategory.HOME_DECOR,
        price: 89.00,
        stock: 15,
        status: ProductStatus.PUBLISHED,
        imageUrl: 'https://picsum.photos/seed/shelves/400/400',
      },
    }),
  ]);

  console.log(`✅ Created ${products.length} products\n`);

  // ============================================
  // SEED REVIEWS
  // ============================================
  console.log('⭐ Creating reviews...');

  const reviews = await Promise.all([
    // Reviews for Handwoven Wool Blanket
    prisma.review.create({
      data: {
        productId: products[0].id,
        userId: users[4].id,
        rating: 5,
        content: 'Absolutely stunning! The quality is incredible and it keeps me so warm. Worth every penny.',
      },
    }),
    prisma.review.create({
      data: {
        productId: products[0].id,
        userId: users[5].id,
        rating: 5,
        content: 'Bought this as a gift and my mom loved it. Beautiful craftsmanship.',
      },
    }),

    // Reviews for Cotton Table Runner
    prisma.review.create({
      data: {
        productId: products[1].id,
        userId: users[4].id,
        rating: 4,
        content: 'Beautiful pattern and great quality. Slightly smaller than expected but still love it.',
      },
    }),

    // Reviews for Ceramic Dinner Plate Set
    prisma.review.create({
      data: {
        productId: products[4].id,
        userId: users[5].id,
        rating: 5,
        content: 'These plates are gorgeous! The glaze is even more beautiful in person.',
      },
    }),
    prisma.review.create({
      data: {
        productId: products[4].id,
        userId: users[4].id,
        rating: 4,
        content: 'Love the handmade feel. Each plate is slightly unique which adds character.',
      },
    }),
    prisma.review.create({
      data: {
        productId: products[4].id,
        rating: 5,
        content: 'Guest reviewer - Amazing quality, will definitely order more!',
      },
    }),

    // Reviews for Rustic Ceramic Vase
    prisma.review.create({
      data: {
        productId: products[5].id,
        userId: users[5].id,
        rating: 5,
        content: 'This vase is the perfect centerpiece for my dining table. Truly one of a kind!',
      },
    }),

    // Reviews for Walnut Cutting Board
    prisma.review.create({
      data: {
        productId: products[8].id,
        userId: users[4].id,
        rating: 5,
        content: 'Heavy, solid, and beautiful. This cutting board will last a lifetime.',
      },
    }),
    prisma.review.create({
      data: {
        productId: products[8].id,
        userId: users[5].id,
        rating: 5,
        content: 'Professional quality! I use it every day and it still looks brand new.',
      },
    }),

    // Reviews for Maple Salad Bowl
    prisma.review.create({
      data: {
        productId: products[9].id,
        userId: users[4].id,
        rating: 4,
        content: 'Beautiful grain pattern. Perfect size for family salads.',
      },
    }),

    // Reviews for Wooden Jewelry Box
    prisma.review.create({
      data: {
        productId: products[10].id,
        userId: users[5].id,
        rating: 5,
        content: 'The craftsmanship is impeccable. My wife absolutely loves it.',
      },
    }),

    // Reviews for Floating Shelf Set
    prisma.review.create({
      data: {
        productId: products[11].id,
        rating: 4,
        content: 'Great shelves with lots of character from the reclaimed wood. Easy to install.',
      },
    }),
  ]);

  console.log(`✅ Created ${reviews.length} reviews\n`);

  // ============================================
  // SUMMARY
  // ============================================
  console.log('═══════════════════════════════════════');
  console.log('🎉 Database seeding completed!');
  console.log('═══════════════════════════════════════');
  console.log(`   Users:    ${users.length}`);
  console.log(`   Sellers:  ${sellers.length}`);
  console.log(`   Products: ${products.length}`);
  console.log(`   Reviews:  ${reviews.length}`);
  console.log('═══════════════════════════════════════\n');

  console.log('📝 Test Credentials:');
  console.log('   Admin:    admin@handcraftedhaven.com / password123');
  console.log('   Seller:   sarah.weaver@email.com / password123');
  console.log('   Customer: customer1@email.com / password123\n');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
