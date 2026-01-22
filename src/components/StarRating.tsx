"use client";

import { useId } from "react";
import styles from "./StarRating.module.css";

interface StarRatingProps {
  /** The rating value (0-5) */
  rating: number;
  /** Maximum number of stars (default: 5) */
  maxStars?: number;
  /** Size variant */
  size?: "small" | "medium" | "large";
  /** Whether to show the numeric rating */
  showValue?: boolean;
  /** Number of reviews (optional) */
  reviewCount?: number;
}

/**
 * StarRating Component
 * 
 * Displays a star rating with accessibility support.
 * Supports full, half, and empty stars.
 * 
 * @example
 * <StarRating rating={4.5} reviewCount={124} />
 */
export function StarRating({
  rating,
  maxStars = 5,
  size = "medium",
  showValue = false,
  reviewCount,
}: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

  // Use React's useId hook for consistent IDs between server and client
  const id = useId();
  const gradientId = `halfGrad${id}`;

  return (
    <div 
      className={`${styles.starRating} ${styles[size]}`}
      role="img"
      aria-label={`Rating: ${rating} out of ${maxStars} stars${reviewCount ? `, based on ${reviewCount} reviews` : ""}`}
    >
      <div className={styles.stars} aria-hidden="true">
        {/* Full stars */}
        {[...Array(fullStars)].map((_, i) => (
          <svg 
            key={`full-${i}`} 
            className={styles.starFull} 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        
        {/* Half star */}
        {hasHalfStar && (
          <svg className={styles.starHalf} viewBox="0 0 20 20">
            <defs>
              <linearGradient id={gradientId}>
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#E2E8F0" />
              </linearGradient>
            </defs>
            <path 
              fill={`url(#${gradientId})`} 
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" 
            />
          </svg>
        )}
        
        {/* Empty stars */}
        {[...Array(emptyStars)].map((_, i) => (
          <svg 
            key={`empty-${i}`} 
            className={styles.starEmpty} 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      
      {(showValue || reviewCount !== undefined) && (
        <span className={styles.ratingText}>
          {showValue && <span className={styles.ratingValue}>{rating}</span>}
          {reviewCount !== undefined && (
            <span className={styles.reviewCount}>({reviewCount})</span>
          )}
        </span>
      )}
    </div>
  );
}

export default StarRating;
