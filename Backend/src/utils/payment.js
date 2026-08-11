// src/utils/payment.js
const crypto = require('crypto');
const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = require('../config/env');

let razorpayInstance = null;

function getRazorpay() {
  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) return null;
  if (razorpayInstance) return razorpayInstance;

  const Razorpay = require('razorpay');
  razorpayInstance = new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET,
  });
  return razorpayInstance;
}

/**
 * Creates a Razorpay order. Falls back to a mock order (useful for local
 * dev / demo mode when no Razorpay keys are configured).
 */
exports.createPaymentOrder = async ({ amount, currency = 'INR', receipt }) => {
  const instance = getRazorpay();

  if (!instance) {
    return {
      id: `mock_order_${Date.now()}`,
      amount: amount * 100,
      currency,
      receipt,
      mock: true,
    };
  }

  return instance.orders.create({
    amount: Math.round(amount * 100), // in paise
    currency,
    receipt,
  });
};

/**
 * Verifies a Razorpay payment signature.
 * https://razorpay.com/docs/payments/payment-gateway/webhooks/
 */
exports.verifyPaymentSignature = ({ orderId, paymentId, signature }) => {
  if (!RAZORPAY_KEY_SECRET) return true; // mock mode - accept everything

  const expected = crypto
    .createHmac('sha256', RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  return expected === signature;
};
