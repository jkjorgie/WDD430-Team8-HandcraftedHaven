/**
 * Product type definition
 * Used across components for type safety
 */
export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  seller: string;
  rating: number;
  reviewCount: number;
  createdAt: Date;
}

/**
 * Sort options for product listings
 */
export type SortOption = "price-asc" | "price-desc" | "newest" | "oldest";
