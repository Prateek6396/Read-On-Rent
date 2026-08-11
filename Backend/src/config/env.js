// src/config/env.js
// Centralized, validated access to environment variables.
require('dotenv').config();

const required = ['MONGODB_URI', 'JWT_SECRET'];

function validateEnv() {
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length && process.env.NODE_ENV !== 'test') {
    console.warn(
      `⚠️  Missing environment variables: ${missing.join(', ')}. ` +
      `Copy .env.example to .env and fill in the values.`
    );
  }
}

validateEnv();

module.exports = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',

  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/read-on-rent',

  JWT_SECRET: process.env.JWT_SECRET || 'dev_secret_change_me',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',

  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,

  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,

  MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE || '5242880', 10),

  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'admin@readonrent.com',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'Admin@12345',

  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
  RATE_LIMIT_MAX: parseInt(process.env.RATE_LIMIT_MAX || '200', 10),
};
