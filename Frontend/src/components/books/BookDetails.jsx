import React, { useState } from 'react';
import { FaStar, FaShieldAlt, FaTruck, FaUndo, FaBookmark } from 'react-icons/fa';
import { useCart } from '../../hooks';
import styles from './Books.module.css';

const BookDetails = ({ book, onWishlistToggle, isWishlisted }) => {
  const [selectedDuration, setSelectedDuration] = useState(7);
  const { addToCart } = useCart();

  const getPriceForDuration = (days) => {
    switch (days) {
      case 14: return book.rentalPrice14Days || (book.rentalPrice7Days * 1.8);
      case 30: return book.rentalPrice30Days || (book.rentalPrice7Days * 3.2);
      default: return book.rentalPrice7Days || 49;
    }
  };

  const handleRent = () => {
    addToCart(book._id || book.id, selectedDuration);
  };

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.detailsMedia}>
        <img src={book.coverImage || '/placeholder-book.jpg'} alt={book.title} className={styles.detailsImage} />
      </div>

      <div className={styles.detailsInfo}>
        <span className={styles.categoryBadge}>{book.category}</span>
        <h1 className={styles.detailsTitle}>{book.title}</h1>
        <p className={styles.detailsAuthor}>By <strong>{book.author}</strong></p>

        <div className={styles.ratingRow}>
          <FaStar className={styles.starIcon} />
          <span>{book.rating ? book.rating.toFixed(1) : '4.5'}</span>
          <span className={styles.divider}>•</span>
          <span>{book.numReviews || 0} customer reviews</span>
        </div>

        <p className={styles.description}>{book.description}</p>

        <div className={styles.rentalOptions}>
          <h3>Select Rental Duration:</h3>
          <div className={styles.durationSelector}>
            {[7, 14, 30].map((days) => (
              <button
                key={days}
                type="button"
                className={`${styles.durationChip} ${selectedDuration === days ? styles.activeDuration : ''}`}
                onClick={() => setSelectedDuration(days)}
              >
                <strong>{days} Days</strong>
                <span>₹{getPriceForDuration(days).toFixed(0)}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.depositInfo}>
          <p><FaShieldAlt /> Security Deposit: <strong>₹{book.securityDeposit || 200}</strong> (Refundable upon return)</p>
        </div>

        <div className={styles.actionRow}>
          <button onClick={handleRent} className={styles.primaryRentBtn}>
            Rent for {selectedDuration} Days (₹{getPriceForDuration(selectedDuration).toFixed(0)})
          </button>
          <button 
            onClick={() => onWishlistToggle(book._id || book.id)} 
            className={`${styles.secondaryBtn} ${isWishlisted ? styles.activeWishlist : ''}`}
          >
            <FaBookmark /> {isWishlisted ? 'Wishlisted' : 'Wishlist'}
          </button>
        </div>

        <div className={styles.guarantees}>
          <div><FaTruck /> Fast Doorstep Delivery</div>
          <div><FaUndo /> Easy Pickup on Due Date</div>
          <div><FaShieldAlt /> Sanitized & Quality Checked</div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;