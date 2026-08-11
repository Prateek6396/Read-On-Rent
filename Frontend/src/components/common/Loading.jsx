import React from 'react';
import styles from './Loading.module.css';

export default function Loading({ message = 'Loading...' }) {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
      <p>{message}</p>
    </div>
  );
}