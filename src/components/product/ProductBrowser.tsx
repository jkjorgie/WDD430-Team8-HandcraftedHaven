"use client";

import { useState, useMemo, useId } from "react";
import { ProductCard } from "./ProductCard";
import type { Product, SortOption } from "@/types/product";
import styles from "@/app/page.module.css";

interface ProductBrowserProps {
  products: Product[];
}

type PriceRange = "all" | "0-100" | "100-200" | "200-500" | "500+";

export function ProductBrowser({ products }: ProductBrowserProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<
    Set<PriceRange>
  >(new Set(["all"]));

  // Generate unique IDs for form elements (WCAG requirement)
  const searchId = useId();
  const sortId = useId();
  const categoryId = useId();

  // Handle price range checkbox changes
  const handlePriceRangeChange = (range: PriceRange) => {
    const newRanges = new Set(selectedPriceRanges);

    if (range === "all") {
      setSelectedPriceRanges(new Set(["all"]));
      return;
    }

    // Remove 'all' if selecting specific ranges
    newRanges.delete("all");

    if (newRanges.has(range)) {
      newRanges.delete(range);
    } else {
      newRanges.add(range);
    }

    // If no ranges selected, default back to 'all'
    if (newRanges.size === 0) {
      newRanges.add("all");
    }

    setSelectedPriceRanges(newRanges);
  };

  // Check if a product matches the selected price ranges
  const matchesPriceRange = (price: number): boolean => {
    if (selectedPriceRanges.has("all")) return true;

    if (selectedPriceRanges.has("0-100") && price <= 100) return true;
    if (selectedPriceRanges.has("100-200") && price > 100 && price <= 200)
      return true;
    if (selectedPriceRanges.has("200-500") && price > 200 && price <= 500)
      return true;
    if (selectedPriceRanges.has("500+") && price > 500) return true;

    return false;
  };

  // Get unique categories from products
  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category).filter(Boolean));
    return Array.from(cats).sort();
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.seller.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by price range
    filtered = filtered.filter((product) => matchesPriceRange(product.price));

    // Sort products
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "oldest":
        filtered.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
    }

    return filtered;
  }, [products, searchQuery, sortBy, selectedCategory, selectedPriceRanges]);

  // Announce search results to screen readers
  const resultsText = `${filteredAndSortedProducts.length} ${
    filteredAndSortedProducts.length === 1 ? "product" : "products"
  } found`;

  return (
    <section className={styles.searchSection} aria-labelledby="browse-title">
      <div className={styles.searchHeader}>
        <h2 id="browse-title" className={styles.sectionTitle}>
          Browse Products
        </h2>
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            id={searchId}
            type="text"
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        <div className={styles.selectWrapper}>
          <label htmlFor={categoryId} className={styles.selectLabel}>
            Category:
          </label>
          <select
            id={categoryId}
            className={styles.selectInput}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <svg
            className={styles.selectArrow}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </form>

      {/* Price Range Filters */}
      <div className={styles.priceFilterSection}>
        <fieldset className={styles.priceFilterFieldset}>
          <legend className={styles.priceFilterLegend}>Price Range:</legend>
          <div className={styles.priceFilterOptions}>
            <label className={styles.priceFilterLabel}>
              <input
                type="checkbox"
                checked={selectedPriceRanges.has("all")}
                onChange={() => handlePriceRangeChange("all")}
                className={styles.priceFilterCheckbox}
              />
              <span>All Prices</span>
            </label>
            <label className={styles.priceFilterLabel}>
              <input
                type="checkbox"
                checked={selectedPriceRanges.has("0-100")}
                onChange={() => handlePriceRangeChange("0-100")}
                className={styles.priceFilterCheckbox}
              />
              <span>$0 - $100</span>
            </label>
            <label className={styles.priceFilterLabel}>
              <input
                type="checkbox"
                checked={selectedPriceRanges.has("100-200")}
                onChange={() => handlePriceRangeChange("100-200")}
                className={styles.priceFilterCheckbox}
              />
              <span>$100 - $200</span>
            </label>
            <label className={styles.priceFilterLabel}>
              <input
                type="checkbox"
                checked={selectedPriceRanges.has("200-500")}
                onChange={() => handlePriceRangeChange("200-500")}
                className={styles.priceFilterCheckbox}
              />
              <span>$200 - $500</span>
            </label>
            <label className={styles.priceFilterLabel}>
              <input
                type="checkbox"
                checked={selectedPriceRanges.has("500+")}
                onChange={() => handlePriceRangeChange("500+")}
                className={styles.priceFilterCheckbox}
              />
              <span>Over $500</span>
            </label>
          </div>
        </fieldset>
      </div>

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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
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
  );
}
