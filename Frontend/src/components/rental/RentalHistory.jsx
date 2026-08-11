import React, { useState, useEffect } from 'react';
import rentalService from '../../services/rentalService';
import RentalCard from './RentalCard';
import OrderTracking from './OrderTracking';
import ReturnRequest from './ReturnRequest';
import Loading from '../common/Loading';
import Error from '../common/Error';
import styles from './Rental.module.css';

const RentalHistory = () => {
  const [rentals, setRentals] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedTracking, setSelectedTracking] = useState(null);
  const [selectedReturn, setSelectedReturn] = useState(null);

  const fetchRentals = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await rentalService.getUserRentals();
      if (res.success && res.rentals) {
        setRentals(res.rentals);
      } else {
        setError(res.message || 'Failed to fetch rental history');
      }
    } catch (err) {
      setError('Error loading rentals');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRentals();
  }, []);

  const filteredRentals = rentals.filter((rental) => {
    if (filter === 'active') return rental.status?.toLowerCase() === 'active';
    if (filter === 'returned') return rental.status?.toLowerCase() === 'returned';
    return true;
  });

  if (loading) return <Loading message="Loading your rentals..." />;
  if (error) return <Error message={error} onRetry={fetchRentals} />;

  return (
    <div className={styles.historyContainer}>
      <div className={styles.headerRow}>
        <h2>My Rentals</h2>
        <div className={styles.filterTabs}>
          <button className={filter === 'all' ? styles.activeTab : ''} onClick={() => setFilter('all')}>All</button>
          <button className={filter === 'active' ? styles.activeTab : ''} onClick={() => setFilter('active')}>Active</button>
          <button className={filter === 'returned' ? styles.activeTab : ''} onClick={() => setFilter('returned')}>Returned</button>
        </div>
      </div>

      {filteredRentals.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No rentals found under this category.</p>
        </div>
      ) : (
        <div className={styles.rentalsList}>
          {filteredRentals.map((rental) => (
            <RentalCard
              key={rental._id || rental.id}
              rental={rental}
              onTrack={setSelectedTracking}
              onRequestReturn={setSelectedReturn}
            />
          ))}
        </div>
      )}

      {selectedTracking && (
        <OrderTracking rental={selectedTracking} onClose={() => setSelectedTracking(null)} />
      )}

      {selectedReturn && (
        <ReturnRequest
          rental={selectedReturn}
          onClose={() => setSelectedReturn(null)}
          onSuccess={() => fetchRentals()}
        />
      )}
    </div>
  );
};

export default RentalHistory;