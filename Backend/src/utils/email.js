// src/utils/email.js
const nodemailer = require('nodemailer');
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, NODE_ENV } = require('../config/env');

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  return transporter;
}

/**
 * Sends an email. In development, or if SMTP isn't configured,
 * it just logs the email instead of failing the request.
 */
exports.sendEmail = async ({ to, subject, html, text }) => {
  const t = getTransporter();

  if (!t) {
    if (NODE_ENV !== 'production') {
      console.log(`✉️  [DEV EMAIL] to=${to} subject="${subject}"`);
    }
    return { skipped: true };
  }

  try {
    return await t.sendMail({
      from: `"Read on Rent" <${SMTP_USER}>`,
      to,
      subject,
      html,
      text,
    });
  } catch (error) {
    console.error('Email send failed:', error.message);
    // Do not throw - email failures should not break the main request flow.
    return { error: error.message };
  }
};
