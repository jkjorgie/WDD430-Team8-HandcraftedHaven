"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components";
import styles from "@/app/page.module.css";

// TODO: Replace this mock data with database fetch using getProductById from @/actions/products
// Example: const product = await getProductById(id);
const mockProducts = [
  {
    id: "1",
    title: "Hand-Thrown Ceramic Vase",
    price: 89.0,
    image: "https://picsum.photos/seed/vase/400/400",
    seller: "Emma Pottery",
    rating: 4.8,
    reviewCount: 124,
    description:
      "A beautiful hand-thrown ceramic vase, perfect for displaying fresh or dried flowers.",
  },
  {
    id: "2",
    title: "Woven Macramé Wall Hanging",
    price: 65.0,
    image: "https://picsum.photos/seed/macrame/400/400",
    seller: "Fiber Arts Co",
    rating: 4.9,
    reviewCount: 89,
    description:
      "Handcrafted macramé wall hanging made with natural cotton rope.",
  },
];

export default function ProductDetailPage() {
  const params = useParams();
  const id = String(params?.id ?? "");

  // TODO: Replace with database fetch - use getProductById(id) from @/actions/products
  const product = mockProducts.find((p) => p.id === id) || mockProducts[0];

  // Star rating state for interactive rating
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const handleStarClick = (star: number) => {
    setSelected(star);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1200);
    // TODO: Submit rating to database
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => {
      const starValue = i + 1;
      return (
        <span
          key={starValue}
          style={{
            cursor: "pointer",
            color: (hovered || selected) >= starValue ? "#FFD700" : "#ccc",
            fontSize: "2rem",
            transition: "color 0.2s",
            filter:
              hovered === starValue ? "drop-shadow(0 0 6px #FFD700)" : "none",
          }}
          onMouseEnter={() => setHovered(starValue)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => handleStarClick(starValue)}
          aria-label={`Rate ${starValue} star${starValue > 1 ? "s" : ""}`}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleStarClick(starValue);
          }}
        >
          ★
        </span>
      );
    });
  };

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price);

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <h1 className={styles.detailTitle}>Product Details</h1>
        <div className={styles.detailCard}>
          <h2 className={styles.detailSubtitle}>{product.title}</h2>
          <div className={styles.detailImageWrapper}>
            <Image
              src={product.image}
              alt={product.title}
              width={400}
              height={400}
              className={styles.detailImg}
              priority
            />
          </div>

          {/* Interactive Star Rating */}
          <div className={styles.starRating} style={{ position: "relative" }}>
            <p style={{ marginBottom: "0.5rem", fontWeight: 500 }}>
              Rate this product!
            </p>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
            >
              {renderStars()}
              {showPopup && (
                <span
                  style={{
                    marginLeft: "1rem",
                    color: "#388e3c",
                    fontWeight: "bold",
                    background: "#e8f5e9",
                    borderRadius: "6px",
                    padding: "0.2rem 0.7rem",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    fontSize: "1rem",
                  }}
                  role="status"
                >
                  Rated {selected} {selected === 1 ? "star" : "stars"}!
                </span>
              )}
            </div>
          </div>

          <div className={styles.detailInfo}>
            <h3>Details</h3>
            <p>
              <strong>Seller:</strong> {product.seller}
            </p>
            <p>
              <strong>Price:</strong> {formattedPrice}
            </p>
            <p>
              <strong>Rating:</strong> {product.rating} ({product.reviewCount}{" "}
              reviews)
            </p>
          </div>

          <div className={styles.detailDescription}>
            <h3>Description</h3>
            <p>
              {product.description ||
                "This beautifully handcrafted item is made with care and attention to detail. Perfect for adding a touch of elegance to your home or as a thoughtful gift for a loved one. Each piece is unique, showcasing the artisan's skill and dedication to their craft."}
            </p>
          </div>

          {/* Comments Section */}
          <div className={styles.commentSection}>
            <h3>Leave a Comment!</h3>
            <form className={styles.commentForm}>
              <textarea
                placeholder="Add a comment"
                className={styles.commentInput}
                rows={2}
              />
              <button
                type="submit"
                className={styles.commentSubmitBtn}
                aria-label="Submit comment"
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path
                    d="M5 10h10M13 6l4 4-4 4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>
          </div>

          {/* Recent Reviews - TODO: Fetch from database */}
          <div className={styles.lastCommentSection}>
            <h3>Recent Reviews</h3>
            <div className={styles.comment}>
              <p>
                <strong>Alice:</strong> Absolutely love this piece! The
                craftsmanship is top-notch.
              </p>
            </div>
            <button
              style={{
                textAlign: "center",
                display: "block",
                cursor: "pointer",
                marginTop: "1.5rem",
                background: "none",
                border: "none",
                color: "var(--color-terracotta)",
                fontWeight: 500,
              }}
            >
              Show More
            </button>
          </div>
        </div>

        <Link className={styles.backLink} href="/">
          ← Back to Home
        </Link>
      </main>
    </div>
  );
}
