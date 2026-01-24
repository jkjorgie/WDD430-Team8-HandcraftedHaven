'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import styles from '@/app/page.module.css';
import { mockProducts } from '@/app/page';

export default function ProductDetailPage() {
  const params = useParams();
  const { id } = params;
  const product = mockProducts.find((p) => p.id === Number(id));

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header} role='banner'>
        <div className={styles.headerContent}>
          <Link
            href='/'
            className={styles.logo}
            aria-label='Handcrafted Haven - Home'
          >
            <svg
              className={styles.logoIcon}
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.5'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 3C7.5 3 4 6.5 4 10c0 2 1 3.5 2 4.5V20h12v-5.5c1-1 2-2.5 2-4.5 0-3.5-3.5-7-8-7z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9 20v-3M15 20v-3M12 3v4M8 10h8'
              />
            </svg>
            <span className={styles.logoText}>Handcrafted Haven</span>
          </Link>
          <nav className={styles.nav} aria-label='Main navigation'>
            <Link
              href='/seller/profile'
              className={`btn btn-primary ${styles.sellerBtn}`}
            >
              <svg
                className={styles.btnIcon}
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                />
              </svg>
              <span>Seller Profile</span>
            </Link>
          </nav>
        </div>
      </header>
      <h1 className={styles.detailTitle}>Product Detail Page</h1>
      <div className={styles.detailCard}>
        <h1 className={styles.detailSubtitle}>{product?.title}</h1>
        <img
          src={product?.image}
          alt={product?.title}
          width={300}
          height={300}
          className={styles.detailImg}
        />
        {/* <div className={styles.detailDesc}> */}
        <div className={styles.detailInfo}>
          <h2>Details</h2>
          <p>
            <strong>Seller:</strong> {product?.seller}
          </p>
          <p>
            <strong>Price:</strong> ${product?.price}
          </p>
          <p>
            <strong>Rating:</strong> {product?.rating} ({product?.reviewCount}{' '}
            reviews)
          </p>
        </div>
        <div className={styles.detailDescription}>
          <h2>Description</h2>
          {/* <p>{product?.description}</p> */}
          <p>
            This beautifully handcrafted item is made with care and attention to
            detail. Perfect for adding a touch of elegance to your home or as a
            thoughtful gift for a loved one. Each piece is unique, showcasing
            the artisan's skill and dedication to their craft.
          </p>
        </div>
        <div className={styles.commentSection}>
          <h3>Leave a Comment!</h3>
          <textarea
            placeholder='Add a comment'
            className={styles.commentInput}
          />
        </div>
      </div>
      {/* Additional product details would be fetched and displayed here */}
      {/* </div> */}
      <Link className={styles.backLink} href='/'>
        Back to Home
      </Link>
    </div>
  );
}
