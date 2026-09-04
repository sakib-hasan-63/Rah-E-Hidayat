const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

const User = require('../models/User');
const Bookmark = require('../models/Bookmark');
const Tasbeeh = require('../models/Tasbeeh');

const resetDatabaseAndSeedAdmin = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/rah-e-hidayat';
    console.log('Connecting to MongoDB at:', mongoUri);
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB.');

    // 1. Delete all existing users
    const deleteUsersResult = await User.deleteMany({});
    console.log(`🗑️ Removed ${deleteUsersResult.deletedCount} existing user accounts from database.`);

    // 2. Delete all existing bookmarks and tasbeeh logs associated with past users
    await Bookmark.deleteMany({});
    await Tasbeeh.deleteMany({});
    console.log('🧹 Cleaned up old bookmarks and tasbeeh logs.');

    // 3. Create fresh admin account
    const adminEmail = (process.env.ADMIN_EMAIL || 'rah.e.hidayat1265@gmail.com').toLowerCase().trim();
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_NAME || 'Admin';

    if (!adminPassword) {
      throw new Error('ADMIN_PASSWORD environment variable is required to reset database and seed admin');
    }

    const freshAdmin = await User.create({
      name: adminName,
      email: adminEmail,
      phone: '',
      password: adminPassword,
      role: 'admin',
    });

    console.log('======================================================================');
    console.log('✨ FRESH ADMIN ACCOUNT CREATED:');
    console.log(`👤 Name: ${freshAdmin.name}`);
    console.log(`📧 Email: ${freshAdmin.email}`);
    console.log(`🔑 Role: ${freshAdmin.role}`);
    console.log('======================================================================');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error resetting database:', error);
    process.exit(1);
  }
};

resetDatabaseAndSeedAdmin();
