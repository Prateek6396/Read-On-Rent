import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight, FaBookOpen, FaBoxOpen, FaBookReader, FaStar } from 'react-icons/fa';
import styles from './FeaturedServices.module.css';

const SERVICES = [
  { title: 'Browse Rent Books', icon: <FaBookOpen />, color: 'peach' },
  { title: 'Warehouse Dispatch', icon: <FaBoxOpen />, color: 'blue' },
  { title: 'Read Anywhere', icon: <FaBookReader />, color: 'yellow' },
  { title: 'Earn Rewards', icon: <FaStar />, color: 'green' },
];

export default function FeaturedServices() {
  return (
    <section className={styles.services} id="services">
      <div className={styles.sectionHead}>
        <h2>Everything You Need to Read More</h2>
        <Link to="/books" className={styles.seeAll}>
          See All <FaChevronRight size={12} />
        </Link>
      </div>
      <div className={styles.serviceGrid}>
        {SERVICES.map((s) => (
          <div key={s.title} className={`${styles.serviceCard} ${styles[s.color]}`}>
            <h3>{s.title}</h3>
            <div className={styles.serviceIconBox}>{s.icon}</div>
          </div>
        ))}
      </div>
    </section>
  );
}