import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  'https://read-on-rent-backend.onrender.com/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // IMPORTANT:
    // Don't automatically redirect every 401.
    // Login/register/cart etc. can legitimately return 401.
    return Promise.reject(error);
  }
);

export default axiosInstance;