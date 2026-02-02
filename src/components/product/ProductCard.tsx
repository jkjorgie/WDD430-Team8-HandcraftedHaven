import Link from "next/link";
import Image from "next/image";
import { StarRating } from "./StarRating";
import styles from "./ProductCard.module.css";
import type { Product } from "@/types/product";

interface ProductCardProps {
  /** Product data to display */
  product: Product;
  /** Priority loading for above-the-fold images */
  priority?: boolean;
}

/**
 * ProductCard Component
 * 
 * A reusable card component for displaying product information.
 * Includes image, title, seller, rating, price, and action links.
 * 
 * Accessibility features:
 * - Semantic HTML with article element
 * - Proper heading hierarchy
 * - Descriptive alt text for images
 * - Keyboard navigable links
 * - Focus indicators
 * - Screen reader friendly
 * 
 * @example
 * <ProductCard product={productData} priority={false} />
 */
export function ProductCard({ product, priority = false }: ProductCardProps) {
  const {
    id,
    title,
    price,
    image,
    seller,
    rating,
    reviewCount,
  } = product;

  const productUrl = `/product/${id}`;
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

  return (
    <article 
      className={styles.card}
      aria-labelledby={`product-title-${id}`}
    >
      {/* Product Image */}
      <div className={styles.imageWrapper}>
        {image && image !== "" ? (
          <Image
            src={image}
            alt={`${title} - handcrafted by ${seller}`}
            fill
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={styles.image}
            loading={priority ? "eager" : "lazy"}
            priority={priority}
          />
        ) : null}
        <div className={styles.overlay} aria-hidden="true">
          <Link 
            href={productUrl} 
            className={styles.viewDetailsBtn}
            tabIndex={-1}
          >
            View Details
          </Link>
        </div>
      </div>

      {/* Product Information */}
      <div className={styles.info}>
        <h3 id={`product-title-${id}`} className={styles.title}>
          <Link href={productUrl} className={styles.titleLink}>
            {title}
          </Link>
        </h3>
        
        <p className={styles.seller}>
          <span className={styles.sellerLabel}>by </span>
          <span className={styles.sellerName}>{seller}</span>
        </p>
        
        <div className={styles.ratingWrapper}>
          <StarRating 
            rating={rating} 
            reviewCount={reviewCount}
            showValue
            size="medium"
          />
        </div>
        
        <div className={styles.footer}>
          <span className={styles.price} aria-label={`Price: ${formattedPrice}`}>
            {formattedPrice}
          </span>
          <Link 
            href={productUrl} 
            className={styles.viewLink}
            aria-label={`View details for ${title}`}
          >
            View Item
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              aria-hidden="true"
              className={styles.linkIcon}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
