import axiosInstance from '../config/api';

const authService = {
  // 1. Register User (With detailed logging and error fallback parsing)
  register: async ({ name, email, password, phone }) => {
    try {
      const response = await axiosInstance.post('/auth/register', {
        name,
        email,
        password,
        phone,
      });

      console.log('REGISTER SUCCESS:', response.data);
      return response.data;
    } catch (error) {
      console.error('REGISTER ERROR:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });

      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.response?.data?.errors?.[0]?.msg || // Express-validator syntax safety
          error.message ||
          'Registration failed',
      };
    }
  },

  // 2. Login User
  login: async (email, password) => {
    try {
      const response = await axiosInstance.post('/auth/login', {
        email,
        password,
      });
      
      console.log('LOGIN SUCCESS:', response.data);
      return response.data;
    } catch (error) {
      console.error('LOGIN ERROR:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });

      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.response?.data?.errors?.[0]?.msg ||
          error.message ||
          'Login failed',
      };
    }
  },

  // 3. Logout User
  logout: async () => {
    try {
      const response = await axiosInstance.post('/auth/logout');
      console.log('LOGOUT SUCCESS:', response.data);
      return response.data;
    } catch (error) {
      console.error('LOGOUT ERROR (Frontend gracefully handled):', error);
      return { success: true }; // Logout always succeeds on frontend to clean states
    }
  },

  // 4. Verify User Token Session
  verifyToken: async () => {
    try {
      const response = await axiosInstance.get('/auth/verify');
      return response.data;
    } catch (error) {
      // Session verification fails frequently on fresh visits, normal logging
      console.warn('Session verification note:', error.response?.data?.message || 'No active session');
      
      return { 
        success: false, 
        message: 
          error.response?.data?.message || 
          error.message || 
          'No session found' 
      };
    }
  },
};

export default authService;