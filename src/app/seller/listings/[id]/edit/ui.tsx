"use client";

import React, { useEffect, useState } from "react";
import styles from "../../add/page.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

import { updateProduct, UpdateProductState } from "./actions";
import {
  PRODUCT_CATEGORIES,
  PRODUCT_STATUSES,
} from "@/lib/constants/productEnums";

const initialState: UpdateProductState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button className={styles.submitButton} disabled={pending}>
      {pending ? "Saving..." : "Save Changes"}
    </button>
  );
}

export default function EditListingForm({ product }: { product: any }) {
  const router = useRouter();
  const [state, formAction] = React.useActionState(
    updateProduct.bind(null, product.id),
    initialState
  );

  const [imagePreview, setImagePreview] = useState(product.imageUrl || "");
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (state.success) {
      router.push("/seller/listings");
    }
  }, [state.success, router]);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Edit Product</h1>
          <p className={styles.heroSubtitle}>Update your listing details.</p>
        </div>
      </section>

      <main className={styles.main}>
        <div className={styles.formContainer}>
          <form action={formAction} className={styles.form}>
            {state.errors?._form && (
              <div className={styles.errorAlert}>
                ⚠️ {state.errors._form[0]}
              </div>
            )}

            <div className={styles.formGrid}>
              {/* Title */}
              <div className={styles.formGroup}>
                <label htmlFor="edit-title" className={styles.label}>
                  Product Title *
                </label>
                <input
                  id="edit-title"
                  name="title"
                  defaultValue={product.title}
                  className={styles.input}
                />
              </div>

              {/* Category */}
              <div className={styles.formGroup}>
                <label htmlFor="edit-category" className={styles.label}>
                  Category *
                </label>
                <select
                  id="edit-category"
                  name="category"
                  defaultValue={product.category}
                  className={styles.input}
                >
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.replace(/_/g, " ")}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div className={styles.formGroup}>
                <label htmlFor="edit-price" className={styles.label}>
                  Price *
                </label>
                <input
                  id="edit-price"
                  name="price"
                  type="number"
                  step="0.01"
                  defaultValue={product.price}
                  className={styles.input}
                />
              </div>

              {/* Stock */}
              <div className={styles.formGroup}>
                <label htmlFor="edit-stock" className={styles.label}>
                  Stock *
                </label>
                <input
                  id="edit-stock"
                  name="stock"
                  type="number"
                  defaultValue={product.stock}
                  className={styles.input}
                />
              </div>

              {/* Status */}
              <div className={styles.formGroup}>
                <label htmlFor="edit-status" className={styles.label}>
                  Status *
                </label>
                <select
                  id="edit-status"
                  name="status"
                  defaultValue={product.status}
                  className={styles.input}
                >
                  {PRODUCT_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Image URL */}
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label htmlFor="edit-imageUrl" className={styles.label}>
                  Image URL
                </label>
                <input
                  id="edit-imageUrl"
                  name="imageUrl"
                  defaultValue={product.imageUrl || ""}
                  className={styles.input}
                  onChange={(e) => {
                    setImagePreview(e.target.value);
                    setImageError(false);
                  }}
                />
                {imagePreview && (
                  <div className={styles.imagePreview}>
                    {!imageError ? (
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        unoptimized
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <div className={styles.previewFallback}>
                        Image unavailable
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Description */}
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label htmlFor="edit-description" className={styles.label}>
                  Description *
                </label>
                <textarea
                  id="edit-description"
                  name="description"
                  defaultValue={product.description || ""}
                  rows={5}
                  className={`${styles.input} ${styles.textarea}`}
                />
              </div>
            </div>

            <div className={styles.formActions}>
              <Link href="/seller/listings" className={styles.cancelButton}>
                Cancel
              </Link>
              <SubmitButton />
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
