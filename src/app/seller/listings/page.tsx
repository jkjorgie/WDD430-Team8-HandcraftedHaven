"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { SellerProductCard } from "@/components";
import type { SellerProduct } from "@/lib/mockProducts";
import { getProducts } from "@/lib/mockProducts";

export default function SellerListingsPage() {
  const [products, setProducts] = useState<SellerProduct[]>(() => getProducts());

  return (
    <div className={styles.page}>
      {/* Hero / Page Intro (header is provided by seller layout) */}
      <section className={styles.hero} aria-labelledby="seller-hero-title">
        <div className={styles.heroContent}>
          <h1 id="seller-hero-title" className={styles.heroTitle}>
            My Product Listings
          </h1>
          <p className={styles.heroSubtitle}>
            Manage your handcrafted items, update availability, and showcase your best work to customers.
          </p>
          <div className={styles.heroCta}>
            <Link href="/seller/listings/add" className={styles.addButton}>
              + Add New Product
            </Link>
          </div>
        </div>
        <div className={styles.heroDecoration} aria-hidden="true">
          <div className={styles.heroShape1}></div>
          <div className={styles.heroShape2}></div>
        </div>
      </section>

      {/* Listings Section */}
      <div className={styles.main}>
        <section className={styles.listings}>
        {products.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🧺</div>
            <h2>No products yet</h2>
            <p>Start selling your handcrafted items.</p>
            <Link href="/seller/listings/add" className={styles.addButton}>
              + Create Your First Product
            </Link>
          </div>
        ) : (
          <div className={styles.grid}>
            {products.map((product) => (
                <SellerProductCard
                  key={product.id}
                  product={product}
                  status={product.status}
                  stock={product.stock}
                />
            ))}
          </div>
        )}
      </section>
      </div>
    </div>
  );
}
