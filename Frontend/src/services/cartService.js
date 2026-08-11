import axiosInstance from '../config/api';

const cartService = {
  // 1. Get Cart Content
  getCart: async () => {
    try {
      const response = await axiosInstance.get('/cart');
      const payload = response.data;
      // context me direct res.data ya res.cart access karne par standard wrapper response milega
      return { 
        ...payload, 
        data: payload.data || { items: [], total: 0, itemCount: 0 },
        cart: payload.data || { items: [], total: 0, itemCount: 0 } // Dono components ke liye backup safety
      };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to fetch cart' 
      };
    }
  },

  // 2. Add Item to Cart
  addToCart: async (bookId, rentalDuration = 7) => {
    try {
      const response = await axiosInstance.post('/cart/add', {
        bookId,
        rentalDuration,
      });
      const payload = response.data;
      return { 
        ...payload, 
        data: payload.data || { items: [], total: 0, itemCount: 0 },
        cart: payload.data || { items: [], total: 0, itemCount: 0 }
      };
    } catch (error) {
      return error.response?.data || { success: false, message: 'Failed to add to cart' };
    }
  },

  // 3. Remove Item from Cart
  removeFromCart: async (bookId) => {
    try {
      const response = await axiosInstance.delete(`/cart/${bookId}`);
      const payload = response.data;
      return { 
        ...payload, 
        data: payload.data || { items: [], total: 0, itemCount: 0 },
        cart: payload.data || { items: [], total: 0, itemCount: 0 }
      };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to remove from cart' 
      };
    }
  },

  // 4. Update Quantity (Rental Days/Books Count)
  updateQuantity: async (bookId, quantity) => {
    try {
      const response = await axiosInstance.put(`/cart/${bookId}`, { quantity });
      const payload = response.data;
      return { 
        ...payload, 
        data: payload.data || { items: [], total: 0, itemCount: 0 },
        cart: payload.data || { items: [], total: 0, itemCount: 0 }
      };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to update quantity' 
      };
    }
  },

  // 5. Clear Cart (Fix: Changed from .delete to .post to match backend API)
  clearCart: async () => {
    try {
      const response = await axiosInstance.post('/cart/clear');
      const payload = response.data;
      return { 
        ...payload, 
        data: payload.data || { items: [], total: 0, itemCount: 0 },
        cart: payload.data || { items: [], total: 0, itemCount: 0 }
      };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to clear cart' 
      };
    }
  },

  // 6. Checkout Cart
  checkout: async (deliveryAddress) => {
    try {
      const response = await axiosInstance.post('/cart/checkout', { deliveryAddress });
      return response.data;
    } catch (error) {
      return error.response?.data || { success: false, message: 'Checkout failed' };
    }
  },
};

export default cartService;