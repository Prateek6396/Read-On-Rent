import axiosInstance from '../config/api';

const adminService = {
  getDashboard: async () => {
    try {
      const response = await axiosInstance.get('/admin/dashboard');
      return response.data;
    } catch (error) {
      return { success: false, message: 'Failed to fetch dashboard' };
    }
  },

  getUsers: async () => {
    try {
      const response = await axiosInstance.get('/admin/users');
      return response.data;
    } catch (error) {
      return { success: false, message: 'Failed to fetch users' };
    }
  },

  getRentals: async () => {
    try {
      const response = await axiosInstance.get('/admin/rentals');
      return response.data;
    } catch (error) {
      return { success: false, message: 'Failed to fetch rentals' };
    }
  },

  getReports: async () => {
    try {
      const response = await axiosInstance.get('/admin/reports');
      return response.data;
    } catch (error) {
      return { success: false, message: 'Failed to fetch reports' };
    }
  },
};

export default adminService;