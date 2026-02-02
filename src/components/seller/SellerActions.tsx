"use client";

import { useRouter } from "next/navigation";
import styles from "./SellerProductCard.module.css";

type SellerActionsProps = {
  id: string;
  status: "published" | "draft" | "disabled";
  stock: number;
};

export function SellerActions({ id, status }: SellerActionsProps) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/seller/listings/${id}/edit`);
  };

  const handleToggle = () => {
    console.log("Toggle status for", id);
    alert(status === "published" ? "Disable product " + id : "Publish product " + id);
  };

  const handleDelete = () => {
    if (confirm("Delete this product?")) {
      console.log("Delete", id);
      alert("Deleted " + id);
    }
  };

  return (
    <div className={styles.actions}>
      <button type="button" className={styles.edit} onClick={handleEdit}>
        Edit
      </button>
      <button type="button" className={styles.toggle} onClick={handleToggle}>
        {status === "published" ? "Disable" : "Publish"}
      </button>
      <button type="button" className={styles.delete} onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default SellerActions;
