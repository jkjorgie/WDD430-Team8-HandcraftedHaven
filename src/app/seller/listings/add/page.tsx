"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

type ProductFormData = {
  title: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  category: string;
  status: "published" | "draft" | "disabled";
};

export default function AddListingPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<ProductFormData>({
    title: "",
    description: "",
    price: 0,
    image: "",
    stock: 0,
    category: "",
    status: "published",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [imageError, setImageError] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "stock" ? parseFloat(value) || 0 : value,
    }));
    if (name === "image") setImageError(false);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validation
      if (!formData.title.trim()) {
        throw new Error("Product title is required");
      }
      if (!formData.description.trim()) {
        throw new Error("Product description is required");
      }
      if (formData.price <= 0) {
        throw new Error("Price must be greater than 0");
      }
      if (!formData.image.trim()) {
        throw new Error("Product image URL is required");
      }
      if (formData.stock < 0) {
        throw new Error("Stock cannot be negative");
      }
      if (!formData.category) {
        throw new Error("Please select a category");
      }

      // TODO: Replace with actual API call
      // const response = await fetch("/api/products", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });
      // if (!response.ok) throw new Error("Failed to create product");

      // Temporary success message - redirect to listings
      console.log("Product created:", formData);
      router.push("/seller/listings");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header} role="banner">
        <div className={styles.headerContent}>
          <Link
            href="/"
            className={styles.logo}
            aria-label="Handcrafted Haven - Home"
          >
            <svg
              className={styles.logoIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3C7.5 3 4 6.5 4 10c0 2 1 3.5 2 4.5V20h12v-5.5c1-1 2-2.5 2-4.5 0-3.5-3.5-7-8-7z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 20v-3M15 20v-3M12 3v4M8 10h8"
              />
            </svg>
            <span className={styles.logoText}>Handcrafted Haven</span>
          </Link>
          <nav className={styles.nav} aria-label="Main navigation">
            <Link
              href="/seller/profile"
              className={`btn btn-primary ${styles.sellerBtn}`}
            >
              <svg
                className={styles.btnIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>Seller Profile</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero / Page Intro */}
      <section className={styles.hero} aria-labelledby="add-listing-title">
        <div className={styles.heroContent}>
          <h1 id="add-listing-title" className={styles.heroTitle}>
            Add New Product
          </h1>
          <p className={styles.heroSubtitle}>
            Create and list a new handcrafted item. Fill out the details below
            to get started.
          </p>
        </div>
        <div className={styles.heroDecoration} aria-hidden="true">
          <div className={styles.heroShape1}></div>
          <div className={styles.heroShape2}></div>
        </div>
      </section>

      {/* Form Section */}
      <main className={styles.main}>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
            {error && (
              <div className={styles.errorAlert} role="alert">
                <span className={styles.errorIcon}>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* Form Grid */}
            <div className={styles.formGrid}>
              {/* Product Title */}
              <div className={styles.formGroup}>
                <label htmlFor="title" className={styles.label}>
                  Product Title <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Handwoven Basket"
                  className={styles.input}
                  required
                />
              </div>

              {/* Category */}
              <div className={styles.formGroup}>
                <label htmlFor="category" className={styles.label}>
                  Category <span className={styles.required}>*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={styles.input}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="textiles">Textiles & Weavings</option>
                  <option value="ceramics">Ceramics & Pottery</option>
                  <option value="woodcraft">Woodcraft</option>
                  <option value="jewelry">Jewelry</option>
                  <option value="accessories">Accessories</option>
                  <option value="home">Home Décor</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Price */}
              <div className={styles.formGroup}>
                <label htmlFor="price" className={styles.label}>
                  Price (USD) <span className={styles.required}>*</span>
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className={styles.input}
                  required
                />
              </div>

              {/* Stock */}
              <div className={styles.formGroup}>
                <label htmlFor="stock" className={styles.label}>
                  Stock Quantity <span className={styles.required}>*</span>
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="status" className={styles.label}>
                  Status <span className={styles.required}>*</span>
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className={styles.input}
                  required
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="disabled">Disabled</option>
                </select>
              </div>

              {/* Image URL - Full Width */}
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label htmlFor="image" className={styles.label}>
                  Product Image URL <span className={styles.required}>*</span>
                </label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://picsum.photos/seed/product/400/400"
                  className={styles.input}
                  required
                />
                {formData.image && (
                  <div className={styles.imagePreview}>
                    {!imageError ? (
                      <Image
                        src={formData.image}
                        alt="Product preview"
                        fill
                        style={{ objectFit: "cover" }}
                        onError={() => setImageError(true)}
                        unoptimized
                      />
                    ) : (
                      <div className={styles.previewFallback}>Image unavailable</div>
                    )}
                  </div>
                )}
              </div>

              {/* Description - Full Width */}
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label htmlFor="description" className={styles.label}>
                  Product Description{" "}
                  <span className={styles.required}>*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your product, materials, care instructions, and any special details..."
                  className={`${styles.input} ${styles.textarea}`}
                  rows={5}
                  required
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className={styles.formActions}>
              <Link href="/seller/listings" className={styles.cancelButton}>
                Cancel
              </Link>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create Product"}
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer} role="contentinfo">
        <div className={styles.footerContent}>
          <p>© 2026 Handcrafted Haven. Supporting artisans worldwide.</p>
        </div>
      </footer>
    </div>
  );
}
