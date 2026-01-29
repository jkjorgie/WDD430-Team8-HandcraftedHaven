"use client";

import styles from "../seller.module.css";
import { SellerProfileForm } from "@/components";

export default function CreateSeller() {
  function handleCreate(data: {
    name: string;
    bio: string;
    location: string;
  }) {
    console.log("Creating seller:", data);
  }

  return (
    <div className={styles.sellerLayout}>
      <div className={styles.card}>
        <h1 className={styles.title}>Create Seller Profile</h1>

        <SellerProfileForm
          submitLabel="Create Profile"
          onSubmit={handleCreate}
        />
      </div>
    </div>
  );
}
