import type { ReactNode } from "react";
import Link from "next/link";
import { AuthButton } from "@/components";
import styles from "./seller.module.css";

export default function SellerLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className={styles.layout}>
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
            <AuthButton />
          </nav>
        </div>
      </header>

      {/* Page content */}
      <main className={styles.main}>{children}</main>

 
        {/* Footer */}
        <footer className={styles.footer} role="contentinfo">
              <div className={styles.footerContent}>
                <p>© {new Date().getFullYear()}  Handcrafted Haven. Supporting artisans worldwide.</p>
              </div>
        </footer>
    </div>
  );
}
