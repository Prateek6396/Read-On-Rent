import React, { useState, useEffect } from 'react';
import bookService from '../services/bookService';
import wishlistService from '../services/wishlistService';
import { useAuth } from '../hooks/useAuth';
import BookList from '../components/books/BookList';
import BookFilter from '../components/books/BookFilter';
import BookSearch from '../components/books/BookSearch';
import { CATEGORIES } from '../utils/mockData';
import styles from './pages.module.css';

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('newest');
  const [search, setSearch] = useState('');
  const [wishlistIds, setWishlistIds] = useState([]);
  const [page, setPage] = useState(1);
  const { isAuthenticated } = useAuth();

  // Fetch books
  useEffect(() => {
    loadBooks();
  }, [category, sort, search, page]);

  // Fetch wishlist
  useEffect(() => {
    if (isAuthenticated) {
      loadWishlist();
    } else {
      setWishlistIds([]);
    }
  }, [isAuthenticated]);

  const loadBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await bookService.getAllBooks(category, sort, page, 12);
      if (res.success) {
        setBooks(res.books);
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError('Failed to load books');
    } finally {
      setLoading(false);
    }
  };

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
    <div className={styles.booksPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Browse Our Collection</h1>
          <p>Discover thousands of books available for rent</p>
        </div>

        <div className={styles.content}>
          <aside className={styles.sidebar}>
            <BookFilter
              categories={CATEGORIES}
              activeCategory={category}
              onCategoryChange={setCategory}
              activeSort={sort}
              onSortChange={setSort}
            />
          </aside>

          <main className={styles.main}>
            <BookSearch onSearch={setSearch} />
            <BookList
              books={books}
              loading={loading}
              error={error}
              wishlistIds={wishlistIds}
              onWishlistToggle={handleWishlistToggle}
              onRetry={loadBooks}
            />
          </main>
        </div>
      </div>
    </div>
  );
}