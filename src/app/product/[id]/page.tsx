"use client";

import { useState, useEffect, useId } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components";
import styles from "@/app/page.module.css";
import {
  getProductById,
  ProductDetailData,
  addRatingToProduct,
  addReviewToProduct,
} from "@/actions";

// Genera o recupera un sessionId único para la sesión
function getSessionId() {
  let sessionId = sessionStorage.getItem("sessionId");
  if (!sessionId) {
    sessionId =
      Math.random().toString(36).substring(2) + Date.now().toString(36);
    sessionStorage.setItem("sessionId", sessionId);
  }
  return sessionId;
}

export default function ProductDetailPage() {
  const params = useParams();
  const id = String(params?.id ?? "");
  const { data: session } = useSession();

  // Check if user is a signed-in seller
  const isSeller = !!session?.user?.sellerId;

  const [product, setProduct] = useState<ProductDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Star rating state for interactive rating
  const [hovered, setHovered] = useState(product?.rating ?? 0);
  const [selected, setSelected] = useState(product?.rating ?? 0);
  const [showPopup, setShowPopup] = useState(false);

  // Generate unique IDs for form labels (WCAG accessibility)
  const nameInputId = useId();
  const commentInputId = useId();

  useEffect(() => {
    setLoading(true);
    getProductById(id)
      .then((prod) => {
        setProduct(prod);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load product.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className={styles.page}>Loading...</div>;
  if (error) return <div className={styles.page}>{error}</div>;
  if (!product) return <div className={styles.page}>Product not found.</div>;

  const handleStarClick = async (star: number) => {
    // Let user rate only once per session for this product
    const ratedProducts = JSON.parse(
      sessionStorage.getItem("ratedProducts") || "{}"
    );

    setSelected(star);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1200);

    await addRatingToProduct(id, star);
    // Save the new rating for this product
    ratedProducts[id] = star;
    sessionStorage.setItem("ratedProducts", JSON.stringify(ratedProducts));

    // Refresh the product to show the new rating
    const updatedProduct = await getProductById(id);
    if (updatedProduct) setProduct(updatedProduct);
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => {
      const starValue = i + 1;
      const isActive = (hovered || selected) >= starValue;
      return (
        <span
          key={starValue}
          className={styles.interactiveStar}
          style={{
            color: isActive ? "var(--color-star)" : "var(--color-star-empty)",
            filter:
              hovered === starValue
                ? "drop-shadow(0 0 6px var(--color-star))"
                : "none",
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
  }).format(product?.price ?? 0);

  return (
    <div className={styles.page}>
      <Header />

      <main id="main-content" className={styles.main}>
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

          {/* Interactive Star Rating - only shown to non-sellers */}
          {!isSeller && (
            <div className={styles.starRating}>
              <p className={styles.ratingPrompt}>Rate this product!</p>
              <div className={styles.starRow}>
                {renderStars()}
                {showPopup && (
                  <span className={styles.ratingPopup} role="status">
                    Rated {selected} {selected === 1 ? "star" : "stars"}!
                  </span>
                )}
              </div>
            </div>
          )}

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

          {/* Comments Section - only shown to non-sellers */}
          {!isSeller && (
            <div className={styles.commentSection}>
              <h3>Leave a Comment!</h3>
              <form
                className={styles.commentForm}
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const formData = new FormData(form);
                  const userId = formData.get("userId")?.toString().trim();
                  const content = formData.get("content")?.toString().trim();
                  if (!userId || !content) return;
                  await addReviewToProduct(id, content, userId);
                  const updatedProduct = await getProductById(id);
                  if (updatedProduct) setProduct(updatedProduct);
                  form.reset();
                }}
              >
                <div className={styles.commentFormGroup}>
                  <label htmlFor={nameInputId} className={styles.commentLabel}>
                    Your Name
                  </label>
                  <input
                    id={nameInputId}
                    name="userId"
                    type="text"
                    placeholder="Enter your name"
                    className={styles.usernameCommentInput}
                    required
                  />
                </div>
                <div className={styles.commentFormGroup}>
                  <label
                    htmlFor={commentInputId}
                    className={styles.commentLabel}
                  >
                    Comment
                  </label>
                  <textarea
                    id={commentInputId}
                    name="content"
                    placeholder="Add a comment"
                    className={styles.commentInput}
                    rows={2}
                    required
                  />
                </div>
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
          )}

          {/* Recent Reviews - TODO: Fetch from database */}
          <div className={styles.lastCommentSection}>
            <h3>Recent Reviews</h3>
            {(() => {
              const comments = product.reviews
                ? product.reviews.filter((review) => !!review.content)
                : [];
              return comments.length > 0 ? (
                comments.map((review) => (
                  <div className={styles.comment} key={review.id}>
                    <p>
                      <strong>{review.userName}:</strong> {review.content}
                    </p>
                  </div>
                ))
              ) : (
                <div className={styles.comment}>
                  <p>No comments yet.</p>
                </div>
              );
            })()}
          </div>
        </div>

        <Link className={styles.backLink} href="/">
          ← Back to Home
        </Link>
      </main>
    </div>
  );
}
