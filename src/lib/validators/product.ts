import { z } from "zod";
import {
  ProductCategory,
  ProductStatus,
} from "@/generated/prisma/client";

export const createProductSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description too short"),
  price: z.coerce.number().positive("Price must be positive"),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
  category: z.nativeEnum(ProductCategory, {
    error: () => "Please select a valid category",
  }),

  status: z.nativeEnum(ProductStatus, {
    error: () => "Please select a valid category",
  }),
  imageUrl: z.string().url().optional().or(z.literal("")),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;

export const updateProductSchema = createProductSchema.extend({
  id: z.string().min(1, "Product ID is required"),
});

export type UpdateProductInput = z.infer<typeof updateProductSchema>;
