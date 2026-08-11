import React from 'react';
import { FaCreditCard, FaMobileAlt, FaMoneyBillWave } from 'react-icons/fa';
import styles from '../cart/Cart.module.css';

const PaymentMethod = ({ selectedMethod, onSelectMethod }) => {
  const methods = [
    { id: 'upi', name: 'UPI / GPay / PhonePe', icon: <FaMobileAlt /> },
    { id: 'card', name: 'Credit / Debit Card', icon: <FaCreditCard /> },
    { id: 'cod', name: 'Cash on Delivery', icon: <FaMoneyBillWave /> },
  ];

  return (
    <div className={styles.sectionBlock}>
      <h3 className={styles.sectionTitle}>2. Payment Method</h3>
      <div className={styles.paymentList}>
        {methods.map((method) => (
          <label
            key={method.id}
            className={`${styles.paymentOption} ${selectedMethod === method.id ? styles.activePayment : ''}`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={method.id}
              checked={selectedMethod === method.id}
              onChange={() => onSelectMethod(method.id)}
            />
            <span className={styles.paymentIcon}>{method.icon}</span>
            <span className={styles.paymentName}>{method.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethod;