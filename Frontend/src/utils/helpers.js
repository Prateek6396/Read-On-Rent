import { formatDistanceToNow, format } from 'date-fns';

/**
 * Format price in Indian currency
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(price);
};

/**
 * Format date to readable format
 */
export const formatDate = (date) => {
  return format(new Date(date), 'dd MMM yyyy');
};

/**
 * Format date to time ago format
 */
export const formatDateAgo = (date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

/**
 * Get rental status label
 */
export const getRentalStatusLabel = (status) => {
  const labels = {
    pending: 'Pending',
    confirmed: 'Confirmed',
    active: 'Active',
    return_requested: 'Return Requested',
    completed: 'Completed',
  };
  return labels[status] || status;
};

/**
 * Get rental status color
 */
export const getRentalStatusColor = (status) => {
  const colors = {
    pending: '#ffa500',
    confirmed: '#4a5f81',
    active: '#00b36b',
    return_requested: '#1e90ff',
    completed: '#808080',
  };
  return colors[status] || '#000000';
};

/**
 * Get delivery status label
 */
export const getDeliveryStatusLabel = (status) => {
  const labels = {
    pending: 'Pending',
    dispatched: 'Dispatched',
    out_for_delivery: 'Out for Delivery',
    delivered: 'Delivered',
    return_in_transit: 'Return in Transit',
    returned: 'Returned',
  };
  return labels[status] || status;
};

/**
 * Get delivery status color
 */
export const getDeliveryStatusColor = (status) => {
  const colors = {
    pending: '#ffa500',
    dispatched: '#4a5f81',
    out_for_delivery: '#1e90ff',
    delivered: '#00b36b',
    return_in_transit: '#9370db',
    returned: '#808080',
  };
  return colors[status] || '#000000';
};

/**
 * Calculate rental price based on duration and base price
 */
export const calculateRentalPrice = (book, duration) => {
  if (duration === 7) return book.rental_price_7d;
  if (duration === 14) return book.rental_price_14d;
  if (duration === 30) return book.rental_price_30d;
  return 0;
};

/**
 * Calculate total rental cost including fees
 */
export const calculateTotalCost = (rentalPrice, deliveryFee = 50, deposit = 200) => {
  return rentalPrice + deliveryFee + deposit;
};

/**
 * Calculate expected return date
 */
export const calculateReturnDate = (rentalDuration) => {
  const date = new Date();
  date.setDate(date.getDate() + rentalDuration);
  return date;
};

/**
 * Check if item is in array
 */
export const isInWishlist = (bookId, wishlist) => {
  return wishlist?.some(item => item.id === bookId);
};

/**
 * Check if item is in cart
 */
export const isInCart = (bookId, cart) => {
  return cart?.some(item => item.book_id === bookId || item.id === bookId);
};

/**
 * Calculate average rating
 */
export const calculateAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return (sum / reviews.length).toFixed(1);
};

/**
 * Get initials from name
 */
export const getInitials = (name) => {
  return name
    ?.split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase() || '?';
};