import { ProductCard } from "@/components/product";
import styles from "./SellerProductCard.module.css";
import type { Product } from "@/types/product";
import { SellerActions } from "./SellerActions";

type SellerProductCardProps = {
  product: Product;
  status: "published" | "draft" | "disabled";
  stock: number;
  priority?: boolean;
};

export function SellerProductCard({
  product,
  status,
  stock,
  priority = false,
}: SellerProductCardProps) {
  return (
    <div className={styles.wrapper}>
      {/* Base buyer-facing card (reused) */}
      <ProductCard product={product} priority={priority} />

      {/* Seller-only overlay */}
      <div className={styles.meta}>
        <span className={`${styles.status} ${styles[status]}`}>
          ● {status}
        </span>

        <span className={styles.stock}>
          {stock > 0 ? `${stock} in stock` : "Out of stock"}
        </span>
      </div>

      {/* Seller actions (client-only) */}
      <SellerActions id={product.id} status={status} stock={stock} />
    </div>
  );
}

export default SellerProductCard;
