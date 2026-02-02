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

  const handleToggle = async () => {
    const newStatus = status === "published" ? "disabled" : "published";
    try {
      const res = await fetch(`/api/products?id=${id}&status=${newStatus}`, {
        method: "PATCH",
      });
      if (res.ok) {
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to update status.");
      }
    } catch (err) {
      alert("Error updating status.");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this product?")) return;
    try {
      const res = await fetch(`/api/products?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete product.");
      }
    } catch (err) {
      alert("Error deleting product.");
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
