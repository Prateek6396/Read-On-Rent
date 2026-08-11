import axiosInstance from '../config/api';

const rewardService = {
  getRewardPoints: async () => {
    try {
      const response = await axiosInstance.get('/rewards');
      const payload = response.data;
      return { ...payload, points: payload.data?.rewardPoints || 0 };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to fetch rewards' };
    }
  },

  getRewardHistory: async () => {
    try {
      const response = await axiosInstance.get('/rewards/history');
      const payload = response.data;
      return { ...payload, history: payload.data || [] };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to fetch reward history' };
    }
  },

  redeemPoints: async (points, rewardType) => {
    try {
      const response = await axiosInstance.post('/rewards/redeem', {
        points,
        rewardType,
      });
      return response.data;
    } catch (error) {
      return error.response?.data || { success: false, message: 'Failed to redeem points' };
    }
  },
};

export default rewardService;