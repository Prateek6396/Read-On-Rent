/**
 * Capitalize first letter
 */
export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Format currency
 */
export const formatCurrency = (amount) => {
  return `₹${parseFloat(amount).toFixed(2)}`;
};

/**
 * Format book title
 */
export const formatBookTitle = (title) => {
  return title.split(' ').map(capitalize).join(' ');
};

/**
 * Get display name from email
 */
export const getDisplayNameFromEmail = (email) => {
  return email.split('@')[0];
};

/**
 * Truncate text
 */
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Format book description
 */
export const formatDescription = (description, maxLength = 200) => {
  return truncateText(description, maxLength);
};

/**
 * Get star rating display
 */
export const getStarRating = (rating) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(rating)) {
      stars.push('★');
    } else if (i === Math.floor(rating) && rating % 1 !== 0) {
      stars.push('☆');
    } else {
      stars.push('☆');
    }
  }
  return stars.join('');
};