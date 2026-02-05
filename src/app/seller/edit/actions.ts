"use server";

import { auth } from "@/lib/auth";
import { updateSeller } from "@/lib/sellers";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const sellerProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  bio: z.string().min(1, "Bio is required"),
  location: z.string().min(1, "Location is required"),
});

export type UpdateSellerState = {
  success?: boolean;
  errors?: Record<string, string[]>;
};

export async function updateSellerProfile(
  _: UpdateSellerState,
  formData: FormData
): Promise<UpdateSellerState> {
  const session = await auth();

  if (!session?.user?.sellerId) {
    return { errors: { _form: ["Unauthorized"] } };
  }

  const rawData = {
    name: formData.get("name"),
    bio: formData.get("bio"),
    location: formData.get("location"),
  };

  const parsed = sellerProfileSchema.safeParse(rawData);

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  try {
    await updateSeller(session.user.sellerId, parsed.data);

    // Revalidate seller listings page where seller name appears
    revalidatePath("/seller/listings");
    revalidatePath("/seller/edit");

    return { success: true };
  } catch (error) {
    console.error("Failed to update seller profile:", error);
    return { errors: { _form: ["Failed to update profile"] } };
  }
}
