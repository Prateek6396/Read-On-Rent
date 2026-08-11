import axiosInstance from '../config/api';

const userService = {
  getProfile: async () => {
    try {
      const response = await axiosInstance.get('/users/profile');
      const payload = response.data;
      return { ...payload, user: payload.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to fetch profile' };
    }
  },

  updateProfile: async (data) => {
    try {
      const response = await axiosInstance.put('/users/profile', data);
      const payload = response.data;
      return { ...payload, user: payload.data };
    } catch (error) {
      return error.response?.data || { success: false, message: 'Failed to update profile' };
    }
  },

  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await axiosInstance.put('/users/password', {
        currentPassword,
        newPassword,
      });
      return response.data;
    } catch (error) {
      return error.response?.data || { success: false, message: 'Failed to change password' };
    }
  },
};

export default userService;