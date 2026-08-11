import React from 'react';
import { FaCoins, FaTag } from 'react-icons/fa';
import styles from './Rewards.module.css';

const RewardCard = ({ reward, userPoints, onRedeem }) => {
  const canRedeem = userPoints >= reward.pointsRequired;

  return (
    <div className={`${styles.rewardCard} ${!canRedeem ? styles.disabledCard : ''}`}>
      <div className={styles.badgeIcon}>
        <FaTag />
      </div>
      <h3 className={styles.rewardTitle}>{reward.title}</h3>
      <p className={styles.rewardDesc}>{reward.description}</p>

      <div className={styles.pointsCost}>
        <FaCoins className={styles.coinIcon} />
        <span>{reward.pointsRequired} Points</span>
      </div>

      <button
        className={styles.redeemBtn}
        disabled={!canRedeem}
        onClick={() => onRedeem(reward)}
      >
        {canRedeem ? 'Redeem Voucher' : 'Not Enough Points'}
      </button>
    </div>
  );
};

export default RewardCard;