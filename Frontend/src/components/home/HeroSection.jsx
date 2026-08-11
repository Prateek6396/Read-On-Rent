import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCheckCircle, FaTruck } from 'react-icons/fa';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
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
  );
}