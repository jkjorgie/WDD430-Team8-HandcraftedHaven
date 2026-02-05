"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { createProductSchema } from "@/lib/validators/product";
import { revalidatePath } from "next/cache";

export type CreateProductState = {
  success?: boolean;
  errors?: Record<string, string[]>;
};

export async function createProduct(
  _: CreateProductState,
  formData: FormData
): Promise<CreateProductState> {
  const session = await auth();

  if (!session?.user?.sellerId) {
    return {
      errors: { _form: ["Unauthorized"] },
    };
  }

  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    category: formData.get("category"),
    status: formData.get("status"),
    imageUrl: formData.get("imageUrl"),
  };

  const parsed = createProductSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  await db.product.create({
    data: {
      ...parsed.data,
      sellerId: session.user.sellerId,
    },
  });

  // Revalidate both seller listings and home page
  revalidatePath("/seller/listings");
  revalidatePath("/");

  return { success: true };
}
