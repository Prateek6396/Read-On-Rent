import React from 'react';
import { FaCheckCircle, FaBox, FaShippingFast, FaHome, FaUndo } from 'react-icons/fa';
import styles from './Rental.module.css';

const OrderTracking = ({ rental, onClose }) => {
  const steps = [
    { title: 'Order Placed', icon: <FaBox /> },
    { title: 'Dispatched', icon: <FaShippingFast /> },
    { title: 'Delivered', icon: <FaHome /> },
    { title: 'Return Pickup', icon: <FaUndo /> },
    { title: 'Returned & Refunded', icon: <FaCheckCircle /> },
  ];

  const getActiveStep = () => {
    switch (rental?.status?.toLowerCase()) {
      case 'dispatched': return 1;
      case 'delivered':
      case 'active': return 2;
      case 'return requested': return 3;
      case 'returned': return 4;
      default: return 0;
    }
  };

  const currentStep = getActiveStep();

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>Rental Tracking - #{rental?._id?.slice(-8)}</h3>
          <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        </div>

        <div className={styles.trackingTimeline}>
          {steps.map((step, idx) => (
            <div
              key={step.title}
              className={`${styles.timelineItem} ${idx <= currentStep ? styles.completedStep : ''} ${
                idx === currentStep ? styles.currentStep : ''
              }`}
            >
              <div className={styles.iconCircle}>{step.icon}</div>
              <div className={styles.stepTitle}>{step.title}</div>
            </div>
          ))}
        </div>

        <div className={styles.deliveryDetails}>
          <h4>Delivery Address:</h4>
          <p>{rental?.deliveryAddress?.fullName}</p>
          <p>{rental?.deliveryAddress?.street}, {rental?.deliveryAddress?.city} - {rental?.deliveryAddress?.pincode}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;