import React, { createContext, useState, useEffect, useContext } from 'react';
import userService from '../services/userService';
import rewardService from '../services/rewardService';
import { AuthContext } from './AuthContext';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [rewardPoints, setRewardPoints] = useState(0);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);

  const fetchUserProfile = async () => {
    if (!isAuthenticated) {
      setProfile(null);
      setRewardPoints(0);
      return;
    }
    setLoading(true);
    try {
      const [profileRes, rewardRes] = await Promise.all([
        userService.getProfile(),
        rewardService.getRewardPoints(),
      ]);

      if (profileRes.success) setProfile(profileRes.user);
      if (rewardRes.success) setRewardPoints(rewardRes.points || 0);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [isAuthenticated]);

  const updateProfile = async (data) => {
    setLoading(true);
    const res = await userService.updateProfile(data);
    if (res.success && res.user) {
      setProfile(res.user);
    }
    setLoading(false);
    return res;
  };

  const value = {
    profile,
    rewardPoints,
    loading,
    fetchUserProfile,
    updateProfile,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};