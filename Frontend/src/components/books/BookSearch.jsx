import React, { useState, useCallback } from 'react';
import { FaSearch } from 'react-icons/fa';
import styles from './BookSearch.module.css';

export default function BookSearch({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleChange = useCallback((e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  }, [onSearch]);

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className={styles.searchBox}>
      <div className={styles.inputWrapper}>
        <FaSearch className={styles.icon} />
        <input
          type="text"
          placeholder="Search by title or author..."
          value={query}
          onChange={handleChange}
          className={styles.input}
        />
        {query && (
          <button
            onClick={handleClear}
            className={styles.clearBtn}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}