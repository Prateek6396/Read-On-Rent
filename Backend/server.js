// server.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');

const connectDB = require('./src/config/database');
const { PORT, NODE_ENV, FRONTEND_URL } = require('./src/config/env');
const { notFound, errorHandler } = require('./src/middleware/errorHandler');
const { apiLimiter } = require('./src/middleware/rateLimiter');

const app = express();

// --- Database ---
connectDB();

// --- Core middleware ---
app.use(helmet());
app.use(compression());
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));

if (NODE_ENV !== 'test') {
  app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'));
}

app.use('/api', apiLimiter);

// Serve uploaded images (book covers etc.)
app.use('/uploads', express.static('uploads'));

// --- Health check ---
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running', env: NODE_ENV, timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
  res.json({ message: '📚 Read on Rent API', docs: '/health' });
});

// --- Routes ---
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/books', require('./src/routes/books'));
app.use('/api/categories', require('./src/routes/categories'));
app.use('/api/cart', require('./src/routes/cart'));
app.use('/api/orders', require('./src/routes/orders'));
app.use('/api/users', require('./src/routes/users'));
app.use('/api/rentals', require('./src/routes/rentals'));
app.use('/api/rewards', require('./src/routes/rewards'));
app.use('/api/reviews', require('./src/routes/reviews'));
app.use('/api/wishlist', require('./src/routes/wishlist'));
app.use('/api/admin', require('./src/routes/admin'));

// --- 404 + error handling (must be last) ---
app.use(notFound);
app.use(errorHandler);

// --- Start server ---
if (NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT} [${NODE_ENV}]`);
  });
}

module.exports = app; // exported for supertest in tests
