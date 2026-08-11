import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaSearch, FaHeart, FaShoppingBag, FaUser, FaSignOutAlt,
  FaMapMarkerAlt, FaHeadset, FaTruck, FaGlobe,
} from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import styles from './Header.module.css';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/books${search.trim() ? `?search=${encodeURIComponent(search.trim())}` : ''}`);
  };

  return (
    <header className={styles.headerWrap}>
      {/* Top utility bar */}
      <div className={styles.topBar}>
        <div className={styles.topBarInner}>
          <span className={styles.topBarItem}>
            <FaMapMarkerAlt /> Deliver to India | Select Location
          </span>
          <div className={styles.topBarRight}>
            <span className={styles.topBarItem}><FaHeadset /> Help Center</span>
            <span className={styles.topBarItem}><FaTruck /> Track Order</span>
            <span className={styles.topBarItem}><FaGlobe /> English</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className={styles.mainNav}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>R</span>
          <span className={styles.logoText}>
            ROR
            <small>READ ON RENT</small>
          </span>
        </Link>

        <nav className={styles.navLinks}>
          <Link to="/">Home</Link>
          <Link to="/books">Categories</Link>
          <Link to="/books">Books</Link>
          <Link to="/orders">Rentals</Link>
          <a href="#how-it-works">How It Works</a>
        </nav>

        <div className={styles.rightIcons}>
          <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
            <button type="submit" aria-label="Search"><FaSearch /></button>
            <input
              type="text"
              placeholder="Search books..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>

          <Link to="/wishlist" className={styles.iconBtn} title="Wishlist">
            <FaHeart />
          </Link>

          <Link to="/cart" className={styles.iconBtn} title="Cart">
            <FaShoppingBag />
            {itemCount > 0 && <span className={styles.badge}>{itemCount}</span>}
          </Link>

          {isAuthenticated ? (
            <div className={styles.profileDropdown}>
              <button className={styles.profileBtn}>
                <FaUser /> {user?.name?.split(' ')[0] || 'Account'}
              </button>
              <div className={styles.dropdown}>
                <Link to="/profile">My Profile</Link>
                <Link to="/orders">My Orders</Link>
                <Link to="/rewards">Rewards</Link>
                {user?.role === 'admin' && <Link to="/admin">Admin Panel</Link>}
                <button onClick={handleLogout} className={styles.logoutBtn}>
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.authButtons}>
              <Link to="/login" className={styles.loginBtn}>Login</Link>
              <Link to="/register" className={styles.signupBtn}>Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}