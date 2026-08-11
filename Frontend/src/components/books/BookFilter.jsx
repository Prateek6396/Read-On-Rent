import React from 'react';
import { FaFilter } from 'react-icons/fa';
import styles from './BookFilter.module.css';

export default function BookFilter({
  categories = [],
  activeCategory = 'all',
  onCategoryChange,
  activeSort = 'newest',
  onSortChange,
}) {
  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterHeader}>
        <FaFilter size={18} />
        <h3>Filters</h3>
      </div>

      {/* Category Filter */}
      <div className={styles.filterSection}>
        <h4>Category</h4>
        <div className={styles.categoryList}>
          <label className={styles.filterOption}>
            <input
              type="radio"
              name="category"
              value="all"
              checked={activeCategory === 'all'}
              onChange={() => onCategoryChange('all')}
            />
            <span>All Categories</span>
          </label>

          {categories.map((cat) => (
            <label key={cat._id} className={styles.filterOption}>
              <input
                type="radio"
                name="category"
                value={cat._id}
                checked={activeCategory === cat._id}
                onChange={() => onCategoryChange(cat._id)}
              />
              <span>{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sort Filter */}
      <div className={styles.filterSection}>
        <h4>Sort By</h4>
        <select
          value={activeSort}
          onChange={(e) => onSortChange(e.target.value)}
          className={styles.sortSelect}
        >
          <option value="newest">Newest</option>
          <option value="rating">Highest Rated</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}