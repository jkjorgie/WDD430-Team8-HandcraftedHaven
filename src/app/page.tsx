"use client";

import { useState, useMemo, useId } from "react";
import Link from "next/link";
import { ProductCard } from "@/components";
import type { Product, SortOption } from "@/types/product";
import styles from "./page.module.css";

// Mock product data - in a real app, this would come from a database
const mockProducts: Product[] = [
  {
    id: 1,
    title: "Hand-Thrown Ceramic Vase",
    price: 89.00,
    image: "https://picsum.photos/seed/vase/400/400",
    seller: "Emma Pottery",
    rating: 4.8,
    reviewCount: 124,
    createdAt: new Date("2026-01-15"),
  },
  {
    id: 2,
    title: "Woven Macramé Wall Hanging",
    price: 65.00,
    image: "https://picsum.photos/seed/macrame/400/400",
    seller: "Fiber Arts Co",
    rating: 4.9,
    reviewCount: 89,
    createdAt: new Date("2026-01-18"),
  },
  {
    id: 3,
    title: "Handmade Leather Journal",
    price: 45.00,
    image: "https://picsum.photos/seed/journal/400/400",
    seller: "Bound & Crafted",
    rating: 4.7,
    reviewCount: 256,
    createdAt: new Date("2026-01-10"),
  },
  {
    id: 4,
    title: "Artisan Beeswax Candle Set",
    price: 32.00,
    image: "https://picsum.photos/seed/candles/400/400",
    seller: "Honey Glow Studio",
    rating: 5.0,
    reviewCount: 67,
    createdAt: new Date("2026-01-20"),
  },
  {
    id: 5,
    title: "Hand-Carved Wooden Bowl",
    price: 125.00,
    image: "https://picsum.photos/seed/bowl/400/400",
    seller: "Woodcraft Masters",
    rating: 4.6,
    reviewCount: 43,
    createdAt: new Date("2026-01-08"),
  },
  {
    id: 6,
    title: "Sterling Silver Leaf Earrings",
    price: 78.00,
    image: "https://picsum.photos/seed/earrings/400/400",
    seller: "Silver Moon Jewelry",
    rating: 4.9,
    reviewCount: 198,
    createdAt: new Date("2026-01-19"),
  },
  {
    id: 7,
    title: "Hand-Dyed Silk Scarf",
    price: 95.00,
    image: "https://picsum.photos/seed/scarf/400/400",
    seller: "Silk Dreams",
    rating: 4.8,
    reviewCount: 76,
    createdAt: new Date("2026-01-12"),
  },
  {
    id: 8,
    title: "Handwoven Rattan Basket",
    price: 55.00,
    image: "https://picsum.photos/seed/basket/400/400",
    seller: "Woven Traditions",
    rating: 4.5,
    reviewCount: 112,
    createdAt: new Date("2026-01-05"),
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  
  // Generate unique IDs for form elements (WCAG requirement)
  const searchId = useId();
  const sortId = useId();

  const filteredAndSortedProducts = useMemo(() => {
    let products = [...mockProducts];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      products = products.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.seller.toLowerCase().includes(query)
      );
    }

    // Sort products
    switch (sortBy) {
      case "price-asc":
        products.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        products.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        products.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      case "oldest":
        products.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
        break;
    }

    return products;
  }, [searchQuery, sortBy]);

  // Announce search results to screen readers
  const resultsText = `${filteredAndSortedProducts.length} ${filteredAndSortedProducts.length === 1 ? "product" : "products"} found`;

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header} role="banner">
        <div className={styles.headerContent}>
          <Link href="/" className={styles.logo} aria-label="Handcrafted Haven - Home">
            <svg 
              className={styles.logoIcon} 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3C7.5 3 4 6.5 4 10c0 2 1 3.5 2 4.5V20h12v-5.5c1-1 2-2.5 2-4.5 0-3.5-3.5-7-8-7z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 20v-3M15 20v-3M12 3v4M8 10h8" />
            </svg>
            <span className={styles.logoText}>Handcrafted Haven</span>
          </Link>
          <nav className={styles.nav} aria-label="Main navigation">
            <Link href="/seller/profile" className={`btn btn-primary ${styles.sellerBtn}`}>
              <svg 
                className={styles.btnIcon} 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Seller Profile</span>
            </Link>
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
            Support local artisans and find one-of-a-kind pieces made with passion and care
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
        <section className={styles.searchSection} aria-labelledby="browse-title">
          <div className={styles.searchHeader}>
            <h2 id="browse-title" className={styles.sectionTitle}>Browse Products</h2>
            <p className={styles.sectionSubtitle}>
              Find the perfect handcrafted item from our talented artisans
            </p>
          </div>

          {/* Search and Filter Controls */}
          <form 
            className={styles.searchControls} 
            role="search" 
            aria-label="Search and filter products"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className={styles.searchInputWrapper}>
              <label htmlFor={searchId} className="visually-hidden">
                Search products or sellers
              </label>
              <svg 
                className={styles.searchIcon} 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                id={searchId}
                type="search"
                placeholder="Search products or sellers..."
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-describedby="search-help"
              />
              <span id="search-help" className="visually-hidden">
                Type to filter products by name or seller
              </span>
              {searchQuery && (
                <button
                  type="button"
                  className={styles.clearBtn}
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                >
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            <div className={styles.sortWrapper}>
              <label htmlFor={sortId} className={styles.sortLabel}>
                Sort by:
              </label>
              <select
                id={sortId}
                className={styles.sortSelect}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
              >
                <option value="newest">Newest Listing</option>
                <option value="oldest">Oldest Listing</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <svg 
                className={styles.selectArrow} 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </form>

          {/* Results Count - Live region for screen readers */}
          <div className={styles.resultsInfo}>
            <p 
              className={styles.resultsCount}
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              {resultsText}
            </p>
          </div>

          {/* Product Grid */}
          <div 
            className={styles.productGrid}
            role="region"
            aria-label="Product listings"
          >
            {filteredAndSortedProducts.length > 0 ? (
              filteredAndSortedProducts.map((product, index) => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  priority={index < 4} // Prioritize first 4 images for LCP
                />
              ))
            ) : (
              <div className={styles.noResults} role="alert">
                <svg 
                  className={styles.noResultsIcon} 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3>No products found</h3>
                <p>Try adjusting your search terms or browse all products</p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setSearchQuery("")}
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
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
