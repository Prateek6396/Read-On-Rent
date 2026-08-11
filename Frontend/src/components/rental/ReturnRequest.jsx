import React, { useState } from 'react';
import rentalService from '../../services/rentalService';
import styles from './Rental.module.css';

const ReturnRequest = ({ rental, onClose, onSuccess }) => {
  const [pickupDate, setPickupDate] = useState('');
  const [condition, setCondition] = useState('good');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await rentalService.requestReturn(rental._id || rental.id, {
        pickupDate,
        bookCondition: condition,
        notes,
      });

      if (res.success) {
        onSuccess(res.message || 'Return request initiated!');
        onClose();
      } else {
        alert(res.message || 'Failed to request return');
      }
    } catch (error) {
      alert('Error submitting return request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>Request Return & Deposit Refund</h3>
          <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.returnForm}>
          <div className={styles.formGroup}>
            <label>Book Title</label>
            <input type="text" value={rental?.book?.title || 'Book'} disabled />
          </div>

          <div className={styles.formGroup}>
            <label>Preferred Pickup Date</label>
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Book Condition</label>
            <select value={condition} onChange={(e) => setCondition(e.target.value)}>
              <option value="excellent">Like New / Unmarked</option>
              <option value="good">Good (Normal wear)</option>
              <option value="fair">Fair (Minor creases/notes)</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Additional Notes (Optional)</label>
            <textarea
              rows="3"
              value={notes}
              placeholder="Any comments regarding pickup location or book state..."
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className={styles.depositAlert}>
            Deposit of <strong>₹{rental?.securityDeposit || 200}</strong> will be refunded to original payment method upon verification during pickup.
          </div>

          <div className={styles.modalActions}>
            <button type="button" className={styles.secondaryBtn} onClick={onClose}>Cancel</button>
            <button type="submit" className={styles.primaryBtn} disabled={loading}>
              {loading ? 'Submitting...' : 'Confirm Return Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReturnRequest;