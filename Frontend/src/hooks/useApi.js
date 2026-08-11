import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';

export const useApi = (apiFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiFunction(...args);
        
        if (response.success) {
          setData(response.data);
          return response;
        } else {
          setError(response.message);
          toast.error(response.message || 'An error occurred');
          return response;
        }
      } catch (err) {
        const message = err.response?.data?.message || 'An error occurred';
        setError(message);
        toast.error(message);
        return { success: false, message };
      } finally {
        setLoading(false);
      }
    },
    [apiFunction]
  );

  return { data, loading, error, execute };
};