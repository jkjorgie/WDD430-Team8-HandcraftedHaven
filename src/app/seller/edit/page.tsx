"use client";

import { useEffect, useState } from "react";
import styles from "../seller.module.css";
import { SellerProfileForm } from "@/components";

export default function EditSeller() {
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    async function fetchSeller() {
      const res = await fetch("/api/seller/me");
      const data = await res.json();
      setInitialData(data);
    }

    fetchSeller();
  }, []);

  async function handleEdit(data) {
    await fetch("/api/seller/me", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    alert("Profile updated!");
  }

  if (!initialData) return <p>Loading...</p>;

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
