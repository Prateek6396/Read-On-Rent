import React, { useState } from 'react';
import { FaUser, FaLock, FaGift, FaBookReader } from 'react-icons/fa';
import { useAuth } from '../../hooks';
import ProfileEdit from './ProfileEdit';
import ChangePassword from './ChangePassword';
import styles from './Profile.module.css';

const UserProfile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileSidebar}>
        <div className={styles.avatarCard}>
          <div className={styles.avatarCircle}>
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <h3>{user?.name || 'User Name'}</h3>
          <p>{user?.email}</p>
          <span className={styles.memberBadge}>Member</span>
        </div>

        <nav className={styles.profileNav}>
          <button 
            className={activeTab === 'profile' ? styles.activeTab : ''} 
            onClick={() => setActiveTab('profile')}
          >
            <FaUser /> Profile Details
          </button>
          <button 
            className={activeTab === 'password' ? styles.activeTab : ''} 
            onClick={() => setActiveTab('password')}
          >
            <FaLock /> Security & Password
          </button>
        </nav>
      </div>

      <div className={styles.profileContent}>
        {activeTab === 'profile' && <ProfileEdit user={user} />}
        {activeTab === 'password' && <ChangePassword />}
      </div>
    </div>
  );
};

export default UserProfile;