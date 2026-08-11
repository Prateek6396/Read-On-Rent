import React from 'react';
import { FaCalendarAlt, FaShieldAlt, FaTruck, FaUndo, FaFileInvoice } from 'react-icons/fa';
import styles from './Rental.module.css';

const RentalCard = ({ rental, onRequestReturn, onTrack }) => {
  const book = rental.book || rental.bookId || {};
  const status = rental.status || 'Active';

  const getStatusBadgeClass = () => {
    switch (status.toLowerCase()) {
      case 'active': return styles.statusActive;
      case 'overdue': return styles.statusOverdue;
      case 'returned': return styles.statusReturned;
      case 'return requested': return styles.statusPending;
      default: return styles.statusActive;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className={styles.rentalCard}>
      <div className={styles.cardHeader}>
        <span className={styles.rentalId}>Rental ID: #{rental._id?.slice(-8) || rental.id}</span>
        <span className={`${styles.statusBadge} ${getStatusBadgeClass()}`}>{status}</span>
      </div>

      <div className={styles.cardBody}>
        <img src={book.coverImage || '/placeholder-book.jpg'} alt={book.title} className={styles.bookImage} />

        <div className={styles.rentalDetails}>
          <h3 className={styles.bookTitle}>{book.title || 'Book Title'}</h3>
          <p className={styles.bookAuthor}>by {book.author || 'Author'}</p>

          <div className={styles.metaGrid}>
            <div>
              <FaCalendarAlt className={styles.icon} />
              <span>Rented: <strong>{formatDate(rental.startDate)}</strong></span>
            </div>
            <div>
              <FaCalendarAlt className={styles.icon} />
              <span>Due Date: <strong>{formatDate(rental.dueDate)}</strong></span>
            </div>
            <div>
              <FaShieldAlt className={styles.icon} />
              <span>Deposit: <strong>₹{rental.securityDeposit || book.securityDeposit || 200}</strong></span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.cardFooter}>
        <button className={styles.secondaryBtn} onClick={() => onTrack(rental)}>
          <FaTruck /> Track Order
        </button>

        {status.toLowerCase() === 'active' && (
          <button className={styles.primaryBtn} onClick={() => onRequestReturn(rental)}>
            <FaUndo /> Request Return
          </button>
        )}

        {status.toLowerCase() === 'returned' && (
          <span className={styles.refundNotice}>Deposit Refunded ✓</span>
        )}
      </div>
    </div>
  );
};

export default RentalCard;