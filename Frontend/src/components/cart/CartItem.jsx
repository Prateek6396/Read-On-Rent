import React from 'react';
import { FaTrash, FaClock, FaShieldAlt } from 'react-icons/fa';
import { useCart } from '../../hooks';
import styles from './Cart.module.css';

const CartItem = ({ item }) => {
  const { addToCart, removeFromCart } = useCart();
  const book = item.book || item;
  const duration = item.rentalDuration || 7;

  const handleDurationChange = (e) => {
    const newDuration = parseInt(e.target.value, 10);
    addToCart(book._id || book.id, newDuration);
  };

  const calculateRentalPrice = () => {
    if (duration === 14) return book.rentalPrice14Days || (book.rentalPrice7Days * 1.8);
    if (duration === 30) return book.rentalPrice30Days || (book.rentalPrice7Days * 3.2);
    return book.rentalPrice7Days || book.price || 49;
  };

  const rentalPrice = calculateRentalPrice();
  const deposit = book.securityDeposit || 200;

  return (
    <div className={styles.cartItem}>
      <img src={book.coverImage || '/placeholder-book.jpg'} alt={book.title} className={styles.itemImage} />
      
      <div className={styles.itemDetails}>
        <h4 className={styles.itemTitle}>{book.title}</h4>
        <p className={styles.itemAuthor}>by {book.author}</p>
        
        <div className={styles.itemMeta}>
          <span className={styles.durationSelect}>
            <FaClock className={styles.metaIcon} />
            <select value={duration} onChange={handleDurationChange}>
              <option value={7}>7 Days</option>
              <option value={14}>14 Days</option>
              <option value={30}>30 Days</option>
            </select>
          </span>

          <span className={styles.depositBadge}>
            <FaShieldAlt className={styles.metaIcon} /> Deposit: ₹{deposit}
          </span>
        </div>
      </div>

      <div className={styles.itemPricing}>
        <div className={styles.priceTag}>
          <span className={styles.priceLabel}>Rent</span>
          <span className={styles.priceValue}>₹{rentalPrice.toFixed(0)}</span>
        </div>
        
        <button 
          onClick={() => removeFromCart(book._id || book.id)} 
          className={styles.removeBtn}
          title="Remove item"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default CartItem;