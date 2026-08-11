import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import styles from './BookCard.module.css';

export default function BookCard({
  book,
  isWishlisted = false,
  onWishlistToggle = () => {},
}) {
  const handleWishlistClick = (e) => {
    e.preventDefault();
    onWishlistToggle(book._id);
  };

  return (
    <Link to={`/books/${book._id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={book.coverImage}
          alt={book.title}
          className={styles.image}
        />
        <button
          className={`${styles.wishlistBtn} ${isWishlisted ? styles.active : ''}`}
          onClick={handleWishlistClick}
          aria-label="Toggle wishlist"
        >
          {isWishlisted ? (
            <FaHeart size={18} />
          ) : (
            <FaRegHeart size={18} />
          )}
        </button>
        <div className={styles.rentalBadge}>
          ₹{book.rentalPrice7Days}
          <br />
          <small>7 days</small>
        </div>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{book.title}</h3>
        <p className={styles.author}>{book.author}</p>

        <div className={styles.rating}>
          <FaStar className={styles.star} />
          <span>{book.rating}</span>
          <span className={styles.reviews}>({book.numReviews})</span>
        </div>

        <div className={styles.prices}>
          <div className={styles.priceItem}>
            <small>7 days</small>
            <span>₹{book.rentalPrice7Days}</span>
          </div>
          <div className={styles.priceItem}>
            <small>14 days</small>
            <span>₹{book.rentalPrice14Days}</span>
          </div>
          <div className={styles.priceItem}>
            <small>30 days</small>
            <span>₹{book.rentalPrice30Days}</span>
          </div>
        </div>

        <button className={styles.addBtn}>
          Add to Cart
        </button>
      </div>
    </Link>
  );
}