import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import styles from './Error.module.css';

export default function Error({ message = 'An error occurred', onRetry = () => {} }) {
  return (
    <div className={styles.container}>
      <FaExclamationTriangle className={styles.icon} />
      <h3>Oops! Something went wrong</h3>
      <p>{message}</p>
      <button onClick={onRetry} className={styles.retryBtn}>
        Try Again
      </button>
    </div>
  );
}