import React, { useState } from 'react';
import userService from '../../services/userService';
import styles from './Profile.module.css';

const ProfileEdit = ({ user }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    pincode: user?.address?.pincode || '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await userService.updateProfile({
        name: formData.name,
        phone: formData.phone,
        address: {
          street: formData.street,
          city: formData.city,
          pincode: formData.pincode,
        },
      });

      if (res.success) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
      } else {
        setMessage({ type: 'error', text: res.message || 'Failed to update profile' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'An error occurred while updating profile' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formCard}>
      <h2>Edit Profile Information</h2>
      {message.text && (
        <div className={message.type === 'success' ? styles.successAlert : styles.errorAlert}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.gridForm}>
        <div className={styles.formGroup}>
          <label>Full Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className={styles.formGroup}>
          <label>Phone Number</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>

        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label>Street Address</label>
          <input type="text" name="street" value={formData.street} onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label>City</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label>Pincode</label>
          <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} />
        </div>

        <div className={styles.fullWidth}>
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;