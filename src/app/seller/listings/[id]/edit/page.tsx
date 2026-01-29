"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../../add/page.module.css";
import Link from "next/link";
import type { SellerProduct } from "@/lib/mockProducts";
import { getProductById, updateProduct } from "@/lib/mockProducts";
import { useParams } from "next/navigation";

export default function EditListingPage() {
  const router = useRouter();
  const params = useParams();
  const id = String(params?.id ?? '');

  const [product, setProduct] = useState<SellerProduct | undefined>(undefined);
  const [formData, setFormData] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const p = getProductById(id);
    if (p) {
      setProduct(p);
      setFormData({
        title: p.title,
        description: (p as any).description ?? "",
        price: p.price,
        image: p.image,
        stock: p.stock,
        category: (p as any).category ?? "",
        status: p.status,
      });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? parseFloat(value) || 0 : value,
    }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (!formData.title?.trim()) throw new Error("Title required");
      if (!formData.price || formData.price <= 0) throw new Error("Price must be > 0");

      const success = updateProduct(id, {
        title: formData.title,
        price: formData.price,
        image: formData.image,
        stock: formData.stock,
        status: formData.status,
        // keep other fields unchanged
      } as Partial<SellerProduct>);

      if (!success) throw new Error("Failed to update product");

      router.push("/seller/listings");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!product) {
    return (
      <div className={styles.page}>
        <header className={styles.header} role="banner">
          <div className={styles.headerContent}>
            <Link href="/" className={styles.logo} aria-label="Handcrafted Haven - Home">
              <svg className={styles.logoIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3C7.5 3 4 6.5 4 10c0 2 1 3.5 2 4.5V20h12v-5.5c1-1 2-2.5 2-4.5 0-3.5-3.5-7-8-7z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20v-3M15 20v-3M12 3v4M8 10h8" />
              </svg>
              <span className={styles.logoText}>Handcrafted Haven</span>
            </Link>
            <nav className={styles.nav} aria-label="Main navigation">
              <Link href="/seller/profile" className={`btn btn-primary ${styles.sellerBtn}`}>
                <svg className={styles.btnIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Seller Profile</span>
              </Link>
            </nav>
          </div>
        </header>
        <main className={styles.main}>
          <div className={styles.formContainer}>
            <div className={styles.form}>Product not found.</div>
          </div>
        </main>
        <footer className={styles.footer} role="contentinfo">
          <div className={styles.footerContent}>
            <p>© 2026 Handcrafted Haven. Supporting artisans worldwide.</p>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header} role="banner">
        <div className={styles.headerContent}>
          <Link href="/" className={styles.logo} aria-label="Handcrafted Haven - Home">
            <svg className={styles.logoIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3C7.5 3 4 6.5 4 10c0 2 1 3.5 2 4.5V20h12v-5.5c1-1 2-2.5 2-4.5 0-3.5-3.5-7-8-7z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 20v-3M15 20v-3M12 3v4M8 10h8" />
            </svg>
            <span className={styles.logoText}>Handcrafted Haven</span>
          </Link>
          <nav className={styles.nav} aria-label="Main navigation">
            <Link href="/seller/profile" className={`btn btn-primary ${styles.sellerBtn}`}>
              <svg className={styles.btnIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Seller Profile</span>
            </Link>
          </nav>
        </div>
      </header>

      <section className={styles.hero} aria-labelledby="edit-listing-title">
        <div className={styles.heroContent}>
          <h1 id="edit-listing-title" className={styles.heroTitle}>
            Edit Product
          </h1>
          <p className={styles.heroSubtitle}>Update details for this product.</p>
        </div>
      </section>

      <main className={styles.main}>
        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={handleSubmit}>
            {error && (
              <div className={styles.errorAlert} role="alert">
                <span className={styles.errorIcon}>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="title" className={styles.label}>Product Title</label>
                <input id="title" name="title" value={formData.title ?? ""} onChange={handleChange} className={styles.input} required />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="category" className={styles.label}>Category</label>
                <input id="category" name="category" value={formData.category ?? ""} onChange={handleChange} className={styles.input} />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="price" className={styles.label}>Price (USD)</label>
                <input id="price" name="price" type="number" step="0.01" value={formData.price ?? 0} onChange={handleChange} className={styles.input} required />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="stock" className={styles.label}>Stock Quantity</label>
                <input id="stock" name="stock" type="number" value={formData.stock ?? 0} onChange={handleChange} className={styles.input} />
              </div>

              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label htmlFor="image" className={styles.label}>Product Image URL</label>
                <input id="image" name="image" value={formData.image ?? ""} onChange={handleChange} className={styles.input} />
              </div>

              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label htmlFor="description" className={styles.label}>Product Description</label>
                <textarea id="description" name="description" value={formData.description ?? ""} onChange={handleChange} className={`${styles.input} ${styles.textarea}`} rows={5} />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="status" className={styles.label}>Status</label>
                <select id="status" name="status" value={formData.status ?? "published"} onChange={handleChange} className={styles.input}>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="disabled">Disabled</option>
                </select>
              </div>
            </div>

            <div className={styles.formActions}>
              <Link href="/seller/listings" className={styles.cancelButton}>Cancel</Link>
              <button type="submit" className={styles.submitButton} disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save Changes"}</button>
            </div>
          </form>
        </div>
      </main>
      <footer className={styles.footer} role="contentinfo">
        <div className={styles.footerContent}>
          <p>© 2026 Handcrafted Haven. Supporting artisans worldwide.</p>
        </div>
      </footer>
    </div>
  );
}
