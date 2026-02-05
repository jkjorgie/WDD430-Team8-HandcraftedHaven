import Link from "next/link";
import { redirect } from "next/navigation";
import styles from "../seller.module.css";
import { SellerProfileForm } from "@/components";
import { auth } from "@/lib/auth";
import { getSellerById } from "@/lib/sellers";
import { updateSellerProfile } from "./actions";

export default async function EditSeller() {
  const session = await auth();

  if (!session?.user?.sellerId) {
    redirect("/login");
  }

  const seller = await getSellerById(session.user.sellerId);

  if (!seller) {
    return (
      <div className={styles.sellerLayout}>
        <div className={styles.card}>
          <h1 className={styles.title}>Seller Profile Not Found</h1>
          <p>Unable to load your seller profile.</p>
        </div>
      </div>
    );
  }

  const initialData = {
    name: seller.name,
    bio: seller.bio ?? "",
    location: seller.location ?? "",
  };

  return (
    <div className={styles.sellerLayout}>
      <div className={styles.card}>
        <h1 className={styles.title}>Edit Seller Profile</h1>

        <SellerProfileForm
          initialData={initialData}
          submitLabel="Save Changes"
          action={updateSellerProfile}
        />

        {/* Back link */}
        <div className={styles.backLink}>
          <Link href="/seller/listings">← Back to My Listings</Link>
        </div>
      </div>
    </div>
  );
}
