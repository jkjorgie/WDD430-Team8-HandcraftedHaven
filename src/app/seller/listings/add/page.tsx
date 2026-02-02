"use client";
import React from "react";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
// Removed duplicate import of useEffect and useState
import { useFormStatus } from "react-dom";

import { createProduct, CreateProductState } from "./actions";
import {
  PRODUCT_CATEGORIES,
  PRODUCT_STATUSES,
} from "@/lib/constants/productEnums";


const initialState: CreateProductState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={styles.submitButton} disabled={pending}>
      {pending ? "Creating..." : "Create Product"}
    </button>
  );
}

function formatCategory(cat: string) {
  return cat
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}


export default function AddListingPage() {
  const router = useRouter();
  const [state, formAction] = React.useActionState(createProduct, initialState);

  const [imagePreview, setImagePreview] = useState("");
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (state.success) {
      router.push("/seller/listings");
    }
  }, [state.success, router]);

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Add New Product</h1>
          <p className={styles.heroSubtitle}>
            Create and list a new handcrafted item.
          </p>
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
                <label className={styles.label}>Product Title *</label>
                <input name="title" className={styles.input} />
                {state.errors?.title && (
                  <p className={styles.errorText}>{state.errors.title[0]}</p>
                )}
              </div>

              {/* Category */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Category *</label>
                <select name="category" className={styles.input}>
                  <option value="">Select a category</option>
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {formatCategory(cat)}
                    </option>
                  ))}
                </select>

                {state.errors?.category && (
                  <p className={styles.errorText}>
                    {state.errors.category[0]}
                  </p>
                )}
              </div>

              {/* Price */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Price *</label>
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  className={styles.input}
                />
                {state.errors?.price && (
                  <p className={styles.errorText}>{state.errors.price[0]}</p>
                )}
              </div>

              {/* Stock */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Stock *</label>
                <input
                  name="stock"
                  type="number"
                  min="0"
                  className={styles.input}
                />
                {state.errors?.stock && (
                  <p className={styles.errorText}>{state.errors.stock[0]}</p>
                )}
              </div>

              {/* Status */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Status *</label>
                <select name="status" className={styles.input}>
                  {PRODUCT_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>

              </div>

              {/* Image */}
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Image URL</label>
                <input
                  name="imageUrl"
                  type="url"
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
                <label className={styles.label}>Description *</label>
                <textarea
                  name="description"
                  rows={5}
                  className={`${styles.input} ${styles.textarea}`}
                />
                {state.errors?.description && (
                  <p className={styles.errorText}>
                    {state.errors.description[0]}
                  </p>
                )}
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
