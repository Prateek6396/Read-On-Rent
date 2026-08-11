// Lightweight localStorage "database" so the whole app is fully clickable
// and functional out of the box, without a real backend server.
// Every *Service.js file tries this first. Once you build a real backend,
// point VITE_API_URL (see .env.example) at it and swap these calls for the
// commented axiosInstance calls that are already left in each service file.

const read = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const write = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const uid = (prefix = 'id') => `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

// ---------- Users ----------
export const getUsers = () => read('ror_users', []);
export const saveUsers = (users) => write('ror_users', users);

// ---------- Wishlist (per user email) ----------
export const getWishlist = (email) => read(`ror_wishlist_${email}`, []);
export const saveWishlist = (email, ids) => write(`ror_wishlist_${email}`, ids);

// ---------- Cart (per user email, falls back to 'guest') ----------
export const getCartItems = (email) => read(`ror_cart_${email || 'guest'}`, []);
export const saveCartItems = (email, items) => write(`ror_cart_${email || 'guest'}`, items);

// ---------- Rentals / Orders (per user email) ----------
export const getRentals = (email) => read(`ror_rentals_${email}`, []);
export const saveRentals = (email, rentals) => write(`ror_rentals_${email}`, rentals);
export const getAllRentalsAcrossUsers = () => {
  const all = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('ror_rentals_')) {
      all.push(...read(key, []));
    }
  }
  return all;
};

// ---------- Rewards (per user email) ----------
export const getRewardPoints = (email) => read(`ror_points_${email}`, 0);
export const saveRewardPoints = (email, points) => write(`ror_points_${email}`, points);

export { uid };