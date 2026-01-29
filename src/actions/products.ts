'use server';

import { db } from '@/lib/db';
import { ProductStatus } from '@/generated/prisma/client';

export interface ProductWithDetails {
  id: string;
  title: string;
  description: string | null;
  price: number;
  image: string;
  seller: string;
  rating: number;
  reviewCount: number;
  createdAt: Date;
}

export interface ReviewData {
  id: string;
  rating: number;
  content: string | null;
  createdAt: Date;
  userName: string | null;
}

export interface ProductDetailData extends ProductWithDetails {
  reviews: ReviewData[];
}

/**
 * Fetch all published products with seller info and calculated ratings
 */
export async function getPublishedProducts(): Promise<ProductWithDetails[]> {
  const products = await db.product.findMany({
    where: {
      status: ProductStatus.PUBLISHED,
    },
    include: {
      seller: true,
      reviews: {
        select: {
          rating: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return products.map((product) => {
    // Calculate average rating from reviews
    const reviewCount = product.reviews.length;
    const rating = reviewCount > 0
      ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount
      : 0;

    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: Number(product.price),
      image: product.imageUrl || 'https://picsum.photos/seed/default/400/400',
      seller: product.seller.name,
      rating: Math.round(rating * 10) / 10, // Round to 1 decimal
      reviewCount,
      createdAt: product.createdAt,
    };
  });
}

/**
 * Fetch a single product by ID with full details
 */
export async function getProductById(id: string): Promise<ProductDetailData | null> {
  const product = await db.product.findUnique({
    where: { id },
    include: {
      seller: true,
      reviews: {
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  if (!product) {
    return null;
  }

  // Calculate average rating from reviews
  const reviewCount = product.reviews.length;
  const rating = reviewCount > 0
    ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount
    : 0;

  return {
    id: product.id,
    title: product.title,
    description: product.description,
    price: Number(product.price),
    image: product.imageUrl || 'https://picsum.photos/seed/default/400/400',
    seller: product.seller.name,
    rating: Math.round(rating * 10) / 10,
    reviewCount,
    createdAt: product.createdAt,
    reviews: product.reviews.map((review) => ({
      id: review.id,
      rating: review.rating,
      content: review.content,
      createdAt: review.createdAt,
      userName: review.user?.name || 'Anonymous',
    })),
  };
}
