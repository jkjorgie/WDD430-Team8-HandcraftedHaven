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
      {/* Shared Header / Nav */}
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

      {/* Hero / Page Intro */}
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
      <main className={styles.main}>
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
