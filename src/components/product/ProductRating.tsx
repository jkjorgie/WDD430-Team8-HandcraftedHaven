'use client';

import { useState } from 'react';
import styles from './ProductRating.module.css';

interface ProductRatingProps {
  productId: string;
  currentRating: number;
}

export function ProductRating({ productId, currentRating }: ProductRatingProps) {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const handleStarClick = (star: number) => {
    setSelected(star);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1200);
    // TODO: Submit rating to database
    console.log(`Product ${productId} rated ${star} stars`);
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => {
      const starValue = i + 1;
      const isFilled = (hovered || selected) >= starValue;
      
      return (
        <span
          key={starValue}
          className={`${styles.star} ${isFilled ? styles.filled : ''} ${hovered === starValue ? styles.hovered : ''}`}
          onMouseEnter={() => setHovered(starValue)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => handleStarClick(starValue)}
          aria-label={`Rate ${starValue} star${starValue > 1 ? 's' : ''}`}
          role='button'
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleStarClick(starValue);
          }}
        >
          ★
        </span>
      );
    });
  };

  return (
    <div className={styles.ratingContainer}>
      <p className={styles.label}>Rate this product!</p>
      <div className={styles.starsRow}>
        {renderStars()}
        {showPopup && (
          <span className={styles.popup} role='status'>
            Rated {selected} {selected === 1 ? 'star' : 'stars'}!
          </span>
        )}
      </div>
      {currentRating > 0 && (
        <p className={styles.currentRating}>
          Current average: {currentRating.toFixed(1)} stars
        </p>
      )}
    </div>
  );
}
