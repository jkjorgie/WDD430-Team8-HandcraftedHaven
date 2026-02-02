import { db } from "@/lib/db";
import { ProductStatus } from "@/generated/prisma/client";

/**
 * Fetch products owned by a specific seller
 */
export async function getSellerProducts(sellerId: string) {
  const products = await db.product.findMany({
    where: { sellerId },
    orderBy: { createdAt: "desc" },
    include: {
      seller: true,
      reviews: true,
    },
  });

  return products.map((p) => ({
    id: p.id,
    title: p.title,
    price: Number(p.price),
    image: p.imageUrl ?? "/placeholder.png",
    seller: p.seller.name,
    rating:
      p.reviews.length === 0
        ? 0
        : p.reviews.reduce((s, r) => s + r.rating, 0) / p.reviews.length,
    reviewCount: p.reviews.length,
    createdAt: p.createdAt,
    status: p.status.toLowerCase() as "published" | "draft" | "disabled",
    stock: p.stock,
  }));
}
