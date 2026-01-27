"use client";

import styles from "../seller.module.css";
import Link from "next/link";

export default function SellerProfile() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Seller Profile</h1>

        <p>
          From here you can create or edit your seller profile and manage
          your listings.
        </p>

        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          <Link href="/seller/create" className="btn btn-primary">
            Create Profile
          </Link>

          <Link href="/seller/edit" className="btn btn-secondary">
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
