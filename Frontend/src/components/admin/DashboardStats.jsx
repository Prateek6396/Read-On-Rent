import React from 'react';
import { FaBook, FaUsers, FaReceipt, FaRupeeSign } from 'react-icons/fa';
import styles from './Admin.module.css';

const DashboardStats = ({ stats }) => {
  const cards = [
    { label: 'Total Books', value: stats?.totalBooks || 0, icon: <FaBook />, color: '#3498db' },
    { label: 'Registered Users', value: stats?.totalUsers || 0, icon: <FaUsers />, color: '#2ecc71' },
    { label: 'Active Rentals', value: stats?.activeRentals || 0, icon: <FaReceipt />, color: '#f1c40f' },
    { label: 'Total Revenue', value: `₹${stats?.revenue || 0}`, icon: <FaRupeeSign />, color: '#e74c3c' },
  ];

  return (
    <div className={styles.statsGrid}>
      {cards.map((card) => (
        <div key={card.label} className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: card.color }}>
            {card.icon}
          </div>
          <div className={styles.statDetails}>
            <h4>{card.label}</h4>
            <p>{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;