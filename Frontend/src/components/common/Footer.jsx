import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './Footer.module.css';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success('Subscribed! Welcome to the ROR newsletter.');
    setEmail('');
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brandCol}>
          <div className={styles.brandRow}>
            <span className={styles.logoIcon}>R</span>
            <h3>ROR</h3>
          </div>
          <p>Open a world of global books. Your premier destination for renting the best literature.</p>
        </div>

        <div className={styles.column}>
          <h4>Company</h4>
          <a href="#about">About</a>
          <a href="#company">Company</a>
          <Link to="/books">Explore</Link>
        </div>

        <div className={styles.column}>
          <h4>Help</h4>
          <a href="#support">Support</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
        </div>

        <div className={styles.column}>
          <h4>Stay Updated</h4>
          <form className={styles.subscribeForm} onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>&copy; 2026 Read on Rent (ROR). All rights reserved.</p>
      </div>
    </footer>
  );
}