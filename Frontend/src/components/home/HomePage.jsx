import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from './HeroSection';
import FeaturedServices from './FeaturedServices';
import BookCard from '../books/BookCard';
import { BOOKS } from '../../utils/mockData';
import wishlistService from '../../services/wishlistService';
import styles from './HomePage.module.css';
import booksStyles from '../books/Books.module.css';

export default function HomePage() {
  const [popular, setPopular] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);

  useEffect(() => {
    // Get top 8 books sorted by rating
    const topBooks = [...BOOKS]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 8);
    setPopular(topBooks);

    // Load wishlist
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      const res = await wishlistService.getWishlist();
      if (res.success) {
        setWishlistIds(res.books.map((b) => b._id));
      }
    } catch (err) {
      console.error('Failed to load wishlist:', err);
    }
  };

  const handleWishlistToggle = async (bookId) => {
    if (wishlistIds.includes(bookId)) {
      await wishlistService.removeFromWishlist(bookId);
      setWishlistIds((prev) => prev.filter((id) => id !== bookId));
    } else {
      await wishlistService.addToWishlist(bookId);
      setWishlistIds((prev) => [...prev, bookId]);
    }
  };

  return (
    <div>
      <HeroSection />
      <FeaturedServices />

      {/* Popular Books Section */}
      <section className={styles.popular}>
        <div className={styles.popularHead}>
          <h2>Popular Right Now</h2>
          <Link to="/books">Browse all books &rarr;</Link>
        </div>
        <div className={booksStyles.grid}>
          {popular.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              isWishlisted={wishlistIds.includes(book._id)}
              onWishlistToggle={handleWishlistToggle}
            />
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className={styles.howItWorks}>
        <h2>How Read on Rent Works</h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepNum}>1</div>
            <h4>Browse & Select</h4>
            <p>Explore 50,000+ titles across every genre and pick what you love.</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNum}>2</div>
            <h4>Rent for 7/14/30 Days</h4>
            <p>Choose a rental duration that fits your reading pace.</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNum}>3</div>
            <h4>Fast Doorstep Delivery</h4>
            <p>We deliver, sanitize, and quality-check every book.</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNum}>4</div>
            <h4>Read, Return, Repeat</h4>
            <p>Return on the due date and get your deposit back instantly.</p>
          </div>
        </div>
      </section>
    </div>
  );
}