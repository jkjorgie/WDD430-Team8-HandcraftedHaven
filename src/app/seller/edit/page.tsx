"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../seller.module.css";
import { SellerProfileForm, SellerProfileData } from "@/components";

export default function EditSeller() {
  const router = useRouter();

  // Temporary mock data (until DB/API is connected)
  const initialData: SellerProfileData = {
    name: "Sample Seller",
    bio: "This is a sample biography.",
    location: "Sample City",
  };

  // Simulated WRITE logic
  function handleEdit(data: SellerProfileData) {
    console.log("Updated seller profile:", data);

    // Later this will call API / Prisma
    router.push("/seller/listings");
  }

  return (
    <div className={styles.sellerLayout}>
      <div className={styles.card}>
        <h1 className={styles.title}>Edit Seller Profile</h1>

        <SellerProfileForm
          initialData={initialData}
          submitLabel="Save Changes"
          onSubmit={handleEdit}
        />

        {/* Back link */}
        <div className={styles.backLink}>
          <Link href="/seller/listings">← Back to My Listings</Link>
        </div>
      </div>
    </div>
  );
}
