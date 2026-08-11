import axiosInstance from '../config/api';

const rentalService = {
  createRental: async (bookId, rentalDuration, deliveryAddress) => {
    try {
      const response = await axiosInstance.post('/rentals', {
        bookId,
        rentalDuration,
        deliveryAddress,
      });
      return response.data;
    } catch (error) {
      return error.response?.data || { success: false, message: 'Failed to create rental' };
    }
  },

  getUserRentals: async (status = null) => {
    try {
      let url = '/rentals';
      if (status) url += `?status=${status}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      return { success: false, message: 'Failed to fetch rentals' };
    }
  },

  getRentalById: async (id) => {
    try {
      const response = await axiosInstance.get(`/rentals/${id}`);
      return response.data;
    } catch (error) {
      return { success: false, message: 'Failed to fetch rental' };
    }
  },

  requestReturn: async (rentalId) => {
    try {
      const response = await axiosInstance.post(`/rentals/${rentalId}/return`);
      return response.data;
    } catch (error) {
      return { success: false, message: 'Failed to request return' };
    }
  },

  getInvoice: async (rentalId) => {
    try {
      const response = await axiosInstance.get(`/rentals/${rentalId}/invoice`);
      return response.data;
    } catch (error) {
      return { success: false, message: 'Failed to fetch invoice' };
    }
  },
};

export default rentalService;