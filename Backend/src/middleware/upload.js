// src/middleware/upload.js
const multer = require('multer');
const path = require('path');
const { MAX_FILE_SIZE } = require('../config/env');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../../uploads')),
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp|gif/;
  const isValidExt = allowed.test(path.extname(file.originalname).toLowerCase());
  const isValidMime = allowed.test(file.mimetype);

  if (isValidExt && isValidMime) return cb(null, true);
  cb(new Error('Only image files (jpeg, jpg, png, webp, gif) are allowed'));
};

module.exports = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
});
