import type { ReactNode } from "react";
import { Header } from "@/components";
import styles from "./seller.module.css";

export default function SellerLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.layout}>
      <Header />

      {/* Page content */}
      <main className={styles.main}>{children}</main>

      {/* Footer */}
      <footer className={styles.footer} role="contentinfo">
        <div className={styles.footerContent}>
          <p>
            © {new Date().getFullYear()} Handcrafted Haven. Supporting artisans
            worldwide.
          </p>
        </div>
      </footer>
    </div>
  );
}
