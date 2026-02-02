import styles from "./page.module.css";
import Link from "next/link";
import { SellerProductCard } from "@/components";
import { auth } from "@/lib/auth";
import { getSellerProducts } from "@/lib/products";

export default async function SellerListingsPage() {
  const session = await auth();

  if (!session?.user || !session.user.sellerId) {
    throw new Error("Unauthorized: Seller access required");
  }

  const products = await getSellerProducts(session.user.sellerId);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>My Product Listings</h1>
          <p className={styles.heroSubtitle}>
            Manage your handcrafted items and availability.
          </p>
          <Link href="/seller/listings/add" className={styles.addButton}>
            + Add New Product
          </Link>
        </div>
      </section>

      <div className={styles.main}>
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
      </div>
    </div>
  );
}
