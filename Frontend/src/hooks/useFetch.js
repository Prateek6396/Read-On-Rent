import { useEffect, useState } from 'react';

export const useFetch = (apiFunction, immediate = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!immediate) return;

    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiFunction();
        
        if (isMounted) {
          if (response.success) {
            setData(response.data);
          } else {
            setError(response.message);
          }
        }
      } catch (err) {
        if (isMounted) {
          const message = err.response?.data?.message || 'An error occurred';
          setError(message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [apiFunction, immediate]);

  return { data, loading, error };
};