// src/seeders/seedUsers.js
// Run with: npm run seed:users
const connectDB = require('../config/database');
const User = require('../models/User');
const { ADMIN_EMAIL, ADMIN_PASSWORD } = require('../config/env');

(async () => {
  try {
    await connectDB();

    // Admin user
    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });
    if (!existingAdmin) {
      await User.create({
        name: 'Admin',
        email: ADMIN_EMAIL,
        phone: '9999999999',
        password: ADMIN_PASSWORD,
        role: 'admin',
        isVerified: true,
      });
      console.log(`✅ Admin user created: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`);
    } else {
      console.log('ℹ️  Admin user already exists, skipping');
    }

    // Demo test user (matches the frontend's demo-mode credentials)
    const testEmail = 'test@example.com';
    const existingTest = await User.findOne({ email: testEmail });
    if (!existingTest) {
      await User.create({
        name: 'Test User',
        email: testEmail,
        phone: '9876543210',
        password: 'password',
        role: 'user',
        isVerified: true,
        address: {
          street: '123 MG Road',
          city: 'Bengaluru',
          state: 'Karnataka',
          pincode: '560001',
          country: 'India',
        },
      });
      console.log(`✅ Demo test user created: ${testEmail} / password`);
    } else {
      console.log('ℹ️  Demo test user already exists, skipping');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    process.exit(1);
  }
})();
