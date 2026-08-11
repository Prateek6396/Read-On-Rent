import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import Loading from '../common/Loading';
import styles from './Admin.module.css';

const AdminRentals = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRentals = async () => {
    setLoading(true);
    try {
      const res = await adminService.getAllRentals();
      if (res.success) setRentals(res.rentals || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRentals();
  }, []);

  const handleStatusChange = async (rentalId, newStatus) => {
    try {
      const res = await adminService.updateRentalStatus(rentalId, newStatus);
      if (res.success) fetchRentals();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  if (loading) return <Loading message="Loading rental orders..." />;

  return (
    <div className={styles.adminTableCard}>
      <h3>Manage Rental Orders</h3>
      <table className={styles.adminTable}>
        <thead>
          <tr>
            <th>Rental ID</th>
            <th>User</th>
            <th>Book</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rentals.map((r) => (
            <tr key={r._id || r.id}>
              <td>#{r._id?.slice(-6)}</td>
              <td>{r.user?.name || 'N/A'}</td>
              <td>{r.book?.title || 'N/A'}</td>
              <td>{new Date(r.dueDate).toLocaleDateString('en-IN')}</td>
              <td>
                <span className={`${styles.statusPill} ${styles[r.status?.toLowerCase()]}`}>
                  {r.status}
                </span>
              </td>
              <td>
                <select
                  value={r.status}
                  onChange={(e) => handleStatusChange(r._id || r.id, e.target.value)}
                  className={styles.statusSelect}
                >
                  <option value="Active">Active</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Return Requested">Return Requested</option>
                  <option value="Returned">Returned</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminRentals;