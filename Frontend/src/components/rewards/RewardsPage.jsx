import React, { useState, useEffect } from 'react';
import { FaCoins, FaTrophy, FaGift } from 'react-icons/fa';
import rewardService from '../../services/rewardService';
import RewardCard from './RewardCard';
import Loading from '../common/Loading';
import styles from './Rewards.module.css';

const RewardsPage = () => {
  const [points, setPoints] = useState(0);
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRewardData = async () => {
    setLoading(true);
    try {
      const res = await rewardService.getRewardsInfo();
      if (res.success) {
        setPoints(res.points || 0);
        setRewards(res.rewards || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRewardData();
  }, []);

  const handleRedeem = async (reward) => {
    try {
      const res = await rewardService.redeemReward(reward._id || reward.id);
      if (res.success) {
        alert(`Redeemed successfully! Voucher Code: ${res.voucherCode}`);
        fetchRewardData();
      } else {
        alert(res.message || 'Redemption failed');
      }
    } catch (err) {
      alert('Error redeeming reward');
    }
  };

  if (loading) return <Loading message="Loading rewards pool..." />;

  return (
    <div className={styles.rewardsContainer}>
      <div className={styles.heroBanner}>
        <div className={styles.pointsDisplay}>
          <FaCoins className={styles.goldCoin} />
          <div>
            <span className={styles.pointVal}>{points}</span>
            <span className={styles.pointLbl}>Available Reader Points</span>
          </div>
        </div>
        <div className={styles.tierInfo}>
          <FaTrophy /> <span>Gold Tier Reader</span>
        </div>
      </div>

      <h2 className={styles.sectionHeader}>Redeem Your Rewards</h2>
      <div className={styles.rewardsGrid}>
        {rewards.map((reward) => (
          <RewardCard
            key={reward._id || reward.id}
            reward={reward}
            userPoints={points}
            onRedeem={handleRedeem}
          />
        ))}
      </div>
    </div>
  );
};

export default RewardsPage;