import { Header, ProductBrowser } from "@/components";
import { getPublishedProducts } from "@/actions/products";
import styles from "./page.module.css";

// Force dynamic rendering to always fetch fresh product data
export const dynamic = "force-dynamic";

export default async function Home() {
  // Fetch products from database
  const products = await getPublishedProducts();

  return (
    <div className={styles.page}>
      <Header />

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
