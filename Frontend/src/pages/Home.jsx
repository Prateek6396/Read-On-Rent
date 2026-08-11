import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCheckCircle, FaTruck, FaChevronRight, FaBookOpen, FaBoxOpen, FaBookReader, FaStar } from 'react-icons/fa';
import styles from './Home.module.css';

const SERVICES = [
  { title: 'Browse Rent Books', icon: <FaBookOpen />, color: 'peach' },
  { title: 'Warehouse Dispatch', icon: <FaBoxOpen />, color: 'blue' },
  { title: 'Read Anywhere', icon: <FaBookReader />, color: 'yellow' },
  { title: 'Earn Rewards', icon: <FaStar />, color: 'green' },
];

const STEPS = [
  { title: 'Discover', desc: 'Browse 50+ books from various categories' },
  { title: 'Rent', desc: 'Choose rental duration and add to cart' },
  { title: 'Deliver', desc: 'We deliver to your doorstep' },
  { title: 'Read', desc: 'Enjoy your book for the rental period' },
  { title: 'Return', desc: 'Schedule pickup and return the book' },
  { title: 'Rewards', desc: 'Earn points on every rental' },
];

export default function HomePage() {
  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>
            Open a World of <span className={styles.highlight}>Global Books</span>
          </h1>
          <p>
            Read a large range of the latest titles with your target the best online
            bookstore! Rent, read, and return effortlessly.
          </p>
          <div className={styles.heroCTA}>
            <Link to="/books" className={styles.primaryBtn}>
              Browse Books <FaArrowRight />
            </Link>
            <a href="#how-it-works" className={styles.outlineBtn}>
              How it Works
            </a>
          </div>
          <div className={styles.heroFeatures}>
            <span><FaCheckCircle /> 50k+ Books</span>
            <span><FaTruck /> Free Delivery</span>
          </div>
        </div>

        <div className={styles.heroMedia}>
          <img
            src="https://images.unsplash.com/photo-1521123845560-14093637aa7d?w=700&q=80"
            alt="Read on Rent preview"
          />
        </div>
      </section>

      {/* Featured Services */}
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

      {/* How It Works */}
      <section className={styles.howItWorks} id="how-it-works">
        <h2>How It Works</h2>
        <div className={styles.steps}>
          {STEPS.map((step, idx) => (
            <div key={step.title} className={styles.step}>
              <div className={styles.stepNumber}>{idx + 1}</div>
              <h4>{step.title}</h4>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}