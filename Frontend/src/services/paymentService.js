import axiosInstance from '../config/api';

const paymentService = {
  processPayment: async (rentalId, amount, method, cardDetails = null) => {
    try {
      const response = await axiosInstance.post('/payments', {
        rentalId,
        amount,
        method,
        cardDetails,
      });
      return response.data;
    } catch (error) {
      return error.response?.data || { success: false, message: 'Payment failed' };
    }
  },

  getPaymentStatus: async (rentalId) => {
    try {
      const response = await axiosInstance.get(`/payments/${rentalId}`);
      return response.data;
    } catch (error) {
      return { success: false, message: 'Failed to fetch payment status' };
    }
  },

  refundPayment: async (paymentId) => {
    try {
      const response = await axiosInstance.post(`/payments/${paymentId}/refund`);
      return response.data;
    } catch (error) {
      return { success: false, message: 'Failed to process refund' };
    }
  },
};

export default paymentService;