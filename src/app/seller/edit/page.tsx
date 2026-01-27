"use client";

import styles from "../seller.module.css";
import { SellerProfileForm } from "../components/SellerProfileForm";

export default function EditSeller() {
  const initialData = {
    name: "Sample Seller",
    bio: "This is a sample biography.",
    location: "Sample City",
  };

  function handleEdit(data: {
    name: string;
    bio: string;
    location: string;
  }) {
    console.log("Editing seller:", data);
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
      </div>
    </div>
  );
}
