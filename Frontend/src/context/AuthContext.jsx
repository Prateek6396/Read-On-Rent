import React, { createContext, useState, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import authService from '../services/authService';

export const AuthContext = createContext();

const getSavedUser = () => {
  try {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  } catch {
    localStorage.removeItem('user');
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getSavedUser);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(() => !!localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem('token')
  );

  const clearSession = useCallback(() => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }, []);

  const logout = useCallback(async () => {
    try {
      if (token) await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearSession();
      toast.success('Logged out successfully');
    }
  }, [token, clearSession]);

  const verifyToken = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return false;
    }

    try {
      setLoading(true);
      const response = await authService.verifyToken();

      if (response.success && response.data?.user) {
        const verifiedUser = response.data.user;
        setUser(verifiedUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(verifiedUser));
        return true;
      }

      clearSession();
      return false;
    } catch (error) {
      console.error('Token verification failed:', error);
      clearSession();
      return false;
    } finally {
      setLoading(false);
    }
  }, [token, clearSession]);

  useEffect(() => {
    if (token) {
      verifyToken();
    } else {
      setLoading(false);
    }
  }, [token, verifyToken]);

  const register = useCallback(async (name, email, password, phone) => {
    try {
      setLoading(true);
      const response = await authService.register({ name, email, password, phone });

      if (!response.success || !response.data?.token) {
        toast.error(response.message || 'Registration failed');
        return false;
      }

      const nextToken = response.data.token;
      const nextUser = response.data.user;

      // Persist the session before changing auth state so the first protected
      // request after signup already has the JWT available.
      localStorage.setItem('token', nextToken);
      localStorage.setItem('user', JSON.stringify(nextUser));
      setToken(nextToken);
      setUser(nextUser);
      setIsAuthenticated(true);
      toast.success('Registration successful!');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration error');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      setLoading(true);
      const response = await authService.login(email, password);

      if (!response.success || !response.data?.token) {
        toast.error(response.message || 'Login failed');
        return false;
      }

      const nextToken = response.data.token;
      const nextUser = response.data.user;

      localStorage.setItem('token', nextToken);
      localStorage.setItem('user', JSON.stringify(nextUser));
      setToken(nextToken);
      setUser(nextUser);
      setIsAuthenticated(true);
      toast.success('Login successful!');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login error');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUser = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  }, []);

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    register,
    login,
    logout,
    updateUser,
    verifyToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
