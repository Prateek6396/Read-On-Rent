export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
export const APP_NAME = 'Read on Rent';
export const APP_TAGLINE = 'Rent. Read. Return.';

export const RENTAL_DURATIONS = [
  { value: 7, label: '7 Days' },
  { value: 14, label: '14 Days' },
  { value: 30, label: '30 Days' },
];

export const PAYMENT_METHODS = [
  { value: 'credit_card', label: 'Credit Card' },
  { value: 'debit_card', label: 'Debit Card' },
  { value: 'upi', label: 'UPI' },
  { value: 'wallet', label: 'Wallet' },
];

export const RENTAL_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  ACTIVE: 'active',
  RETURN_REQUESTED: 'return_requested',
  COMPLETED: 'completed',
};

export const DELIVERY_STATUS = {
  PENDING: 'pending',
  DISPATCHED: 'dispatched',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  RETURN_IN_TRANSIT: 'return_in_transit',
  RETURNED: 'returned',
};

export const CATEGORIES = [
  'Fiction',
  'Romance',
  'Mystery',
  'Business',
  'Self Development',
  'Technology',
  'Science',
  'History',
  'Academic',
  'Competitive Exams',
  'Indian Literature',
  'Children\'s Books',
];

export const SORT_OPTIONS = [
  { value: 'new', label: 'Newest First' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

export const REWARD_TYPES = {
  RENTAL_COMPLETED: 'rental_completed',
  RETURN_ON_TIME: 'return_on_time',
  REVIEW: 'review',
  REFERRAL: 'referral',
  PAYMENT: 'payment',
};

export const REWARD_POINTS = {
  RENTAL: 20,
  RETURN_ON_TIME: 10,
  REVIEW: 5,
  REFERRAL: 50,
  PAYMENT_PERCENT: 0.1, // 10% of payment amount
};

export const FEES = {
  DELIVERY: 50,
  SECURITY_DEPOSIT: 200,
  LATE_FEE_PER_DAY: 10,
};