import axiosInstance from '../config/api';

const wishlistService = {
  getWishlist: async () => {
    try {
      const response = await axiosInstance.get('/wishlist');
      const payload = response.data;
      return { ...payload, books: payload.data || [] };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to fetch wishlist' };
    }
  },

  addToWishlist: async (bookId) => {
    try {
      const response = await axiosInstance.post('/wishlist/add', { bookId });
      const payload = response.data;
      return { ...payload, books: payload.data || [] };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to add to wishlist' };
    }
  },

  removeFromWishlist: async (bookId) => {
    try {
      const response = await axiosInstance.delete(`/wishlist/${bookId}`);
      const payload = response.data;
      return { ...payload, books: payload.data || [] };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to remove from wishlist' };
    }
  },

  isInWishlist: async (bookId) => {
    try {
      const response = await axiosInstance.get(`/wishlist/${bookId}`);
      const payload = response.data;
      return { ...payload, inWishlist: payload.data?.inWishlist || false };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to check wishlist' };
    }
  },
};

export default wishlistService;