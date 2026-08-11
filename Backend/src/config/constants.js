// src/config/constants.js
module.exports = {
  RENTAL_DURATIONS: [7, 14, 30],
  ORDER_STATUSES: ['pending', 'confirmed', 'shipped', 'delivered', 'returned', 'cancelled'],
  PAYMENT_STATUSES: ['pending', 'completed', 'failed', 'refunded'],
  USER_ROLES: ['user', 'admin'],
  CATEGORIES: [
    'Fiction',
    'Non-Fiction',
    'Romance',
    'Mystery',
    'Business',
    'Sci-Fi',
    'Fantasy',
    'Self-Help',
  ],
  REWARD_POINTS_PER_RENTAL: 10,
  REWARD_POINTS_PER_RUPEE_REDEEM: 1, // 1 point = ₹1 off
  PAGINATION_DEFAULT_LIMIT: 12,
  TAX_RATE: 0.05, // 5% tax on subtotal
};
