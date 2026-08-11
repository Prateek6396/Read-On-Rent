import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';
import styles from './Cart.module.css';

const CartSummary = ({ cart, onCheckout }) => {
  const navigate = useNavigate();
  const items = cart?.items || [];

  const rentalTotal = items.reduce((sum, item) => {
    const book = item.book || item;
    const duration = item.rentalDuration || 7;
    let price = book.rentalPrice7Days || 49;
    if (duration === 14) price = book.rentalPrice14Days || (price * 1.8);
    if (duration === 30) price = book.rentalPrice30Days || (price * 3.2);
    return sum + price;
  }, 0);

  const depositTotal = items.reduce((sum, item) => {
    const book = item.book || item;
    return sum + (book.securityDeposit || 200);
  }, 0);

  const deliveryCharge = items.length > 0 ? 40 : 0;
  const grandTotal = rentalTotal + depositTotal + deliveryCharge;

  return (
    <div className={styles.summaryCard}>
      <h3 className={styles.summaryTitle}>Rental Summary</h3>
      
      <div className={styles.summaryRow}>
        <span>Rental Fee ({items.length} items)</span>
        <span>₹{rentalTotal.toFixed(0)}</span>
      </div>

      <div className={styles.summaryRow}>
        <span>Refundable Deposit</span>
        <span>₹{depositTotal.toFixed(0)}</span>
      </div>

      <div className={styles.summaryRow}>
        <span>Delivery & Return Pickup</span>
        <span>{deliveryCharge > 0 ? `₹${deliveryCharge}` : 'FREE'}</span>
      </div>

      <div className={`${styles.summaryRow} ${styles.totalRow}`}>
        <strong>Total Payable</strong>
        <strong>₹{grandTotal.toFixed(0)}</strong>
      </div>

      <div className={styles.depositNote}>
        <small>* Security deposit is 100% refundable upon book return.</small>
      </div>

      {onCheckout ? (
        <button 
          onClick={onCheckout} 
          disabled={items.length === 0}
          className={styles.checkoutBtn}
        >
          Proceed to Checkout
        </button>
      ) : (
        <button 
          onClick={() => navigate('/checkout')} 
          disabled={items.length === 0}
          className={styles.checkoutBtn}
        >
          <FaLock /> Secure Checkout
        </button>
      )}
    </div>
  );
};

export default CartSummary;