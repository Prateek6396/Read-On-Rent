// src/utils/jwt.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRE } = require('../config/env');

exports.generateToken = (payload) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE });

exports.verifyToken = (token) => jwt.verify(token, JWT_SECRET);
