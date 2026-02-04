"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { createProductSchema } from "@/lib/validators/product";
import { revalidatePath } from "next/cache";

export type UpdateProductState = {
  success?: boolean;
  errors?: Record<string, string[]>;
};

export async function updateProduct(
  productId: string,
  _: UpdateProductState,
  formData: FormData
): Promise<UpdateProductState> {
  const session = await auth();

  if (!session?.user?.sellerId) {
    return { errors: { _form: ["Unauthorized"] } };
  }

  // Verify ownership
  const product = await db.product.findUnique({
    where: { id: productId },
    select: { sellerId: true },
  });

  if (!product || product.sellerId !== session.user.sellerId) {
    return { errors: { _form: ["Not authorized to edit this product"] } };
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
    return { errors: parsed.error.flatten().fieldErrors };
  }

  await db.product.update({
    where: { id: productId },
    data: parsed.data,
  });

  revalidatePath("/seller/listings");

  return { success: true };
}
