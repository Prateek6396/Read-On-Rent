import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import DashboardStats from './DashboardStats';
import AdminRentals from './AdminRentals';
import styles from './Admin.module.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState('stats');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await adminService.getDashboardStats();
        if (res.success) setStats(res.stats);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className={styles.adminContainer}>
      <header className={styles.adminHeader}>
        <h2>Admin Management Dashboard</h2>
        <nav className={styles.adminTabs}>
          <button 
            className={activeTab === 'stats' ? styles.activeTab : ''} 
            onClick={() => setActiveTab('stats')}
          >
            Overview
          </button>
          <button 
            className={activeTab === 'rentals' ? styles.activeTab : ''} 
            onClick={() => setActiveTab('rentals')}
          >
            Rentals
          </button>
        </nav>
      </header>

      {activeTab === 'stats' && <DashboardStats stats={stats} />}
      {activeTab === 'rentals' && <AdminRentals />}
    </div>
  );
};

export default AdminDashboard;