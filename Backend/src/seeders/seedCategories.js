// src/seeders/seedCategories.js
// Categories currently live only as strings on the Book model (matching the
// frontend's mockData.js approach), so there's no separate collection to
// seed. This script just prints the canonical list for reference and is
// safe to run as a no-op step in `npm run seed:all`.
const { CATEGORIES } = require('../config/constants');

console.log('ℹ️  Categories are derived from the Book model, not a separate collection.');
console.log('Canonical categories:', CATEGORIES.join(', '));
process.exit(0);
