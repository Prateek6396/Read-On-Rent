import React from 'react';
import BookCard from './BookCard';
import Loading from '../common/Loading';
import Error from '../common/Error';
import styles from './BookList.module.css';

export default function BookList({
  books = [],
  loading = false,
  error = null,
  wishlistIds = [],
  onWishlistToggle = () => {},
  onRetry = () => {},
}) {
  if (loading) return <Loading message="Fetching available books..." />;

  if (error) {
    return <Error message={error} onRetry={onRetry} />;
  }

  if (!books || books.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h3>No Books Found</h3>
        <p>Try adjusting your search or filter options to find what you are looking for.</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {books.map((book) => (
        <BookCard
          key={book._id}
          book={book}
          isWishlisted={wishlistIds.includes(book._id)}
          onWishlistToggle={onWishlistToggle}
        />
      ))}
    </div>
  );
}