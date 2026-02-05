import Link from "next/link";
import { AuthButton, ProductBrowser } from "@/components";
import { getPublishedProducts } from "@/actions/products";
import styles from "./page.module.css";

// Force dynamic rendering to always fetch fresh product data
export const dynamic = "force-dynamic";

export default async function Home() {
  // Fetch products from database
  const products = await getPublishedProducts();

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
            <AuthButton />
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroContent}>
          <h1 id="hero-title" className={styles.heroTitle}>
            Discover Unique
            <span className={styles.heroAccent}> Handcrafted </span>
            Treasures
          </h1>
          <p className={styles.heroSubtitle}>
            Support local artisans and find one-of-a-kind pieces made with
            passion and care
          </p>
        </div>
        <div className={styles.heroDecoration} aria-hidden="true">
          <div className={styles.heroShape1}></div>
          <div className={styles.heroShape2}></div>
          <div className={styles.heroShape3}></div>
        </div>
      </section>

      {/* Main Content */}
      <main id="main-content" className={styles.main} role="main">
        <ProductBrowser products={products} />
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
