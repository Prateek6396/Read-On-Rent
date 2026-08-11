import React, { useState, useEffect } from 'react';
import userService from '../../services/userService';
import BookCard from '../books/BookCard';
import Loading from '../common/Loading';
import styles from '../books/Books.module.css';

const Wishlist = () => {
  const [wishlistBooks, setWishlistBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const res = await userService.getWishlist();
      if (res.success) {
        setWishlistBooks(res.books || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleToggleWishlist = async (bookId) => {
    try {
      await userService.removeFromWishlist(bookId);
      setWishlistBooks((prev) => prev.filter((b) => (b._id || b.id) !== bookId));
    } catch (err) {
      alert('Failed to remove from wishlist');
    }
  };

  if (loading) return <Loading message="Fetching your wishlist..." />;

  return (
    <div style={{ maxWidth: '1100px', margin: '2rem auto', padding: '0 1rem' }}>
      <h2 style={{ marginBottom: '1.5rem', color: '#2c3e50' }}>My Saved Books</h2>
      {wishlistBooks.length === 0 ? (
        <p>Your wishlist is currently empty.</p>
      ) : (
        <div className={styles.grid}>
          {wishlistBooks.map((book) => (
            <BookCard
              key={book._id || book.id}
              book={book}
              isWishlisted={true}
              onWishlistToggle={handleToggleWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;