import React from 'react';
import styles from '../cart/Cart.module.css';

const DeliveryInfo = ({ addressData, onChange }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...addressData, [name]: value });
  };

  return (
    <div className={styles.sectionBlock}>
      <h3 className={styles.sectionTitle}>1. Delivery Address</h3>
      <form className={styles.formGrid}>
        <div className={styles.inputGroup}>
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            placeholder="John Doe"
            value={addressData.fullName || ''}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="+91 98765 43210"
            value={addressData.phone || ''}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
          <label>Street Address / House No.</label>
          <input
            type="text"
            name="street"
            placeholder="Flat 402, Building A, Main Road"
            value={addressData.street || ''}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>City</label>
          <input
            type="text"
            name="city"
            placeholder="Mumbai"
            value={addressData.city || ''}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Pincode</label>
          <input
            type="text"
            name="pincode"
            placeholder="400001"
            value={addressData.pincode || ''}
            onChange={handleInputChange}
            required
          />
        </div>
      </form>
    </div>
  );
};

export default DeliveryInfo;