const User = require('../models/User');

const seedAdmin = async () => {
  try {
    const adminEmail = (process.env.ADMIN_EMAIL || 'rah.e.hidayat1265@gmail.com').toLowerCase().trim();
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_NAME || 'Admin';

    // Check if the specific admin email exists
    let admin = await User.findOne({ email: adminEmail });

    // If not found, check if legacy admin account exists to migrate (preserving user password)
    if (!admin) {
      const legacyAdmin = await User.findOne({ email: 'rah-e-hidayat@gmail.com' });
      if (legacyAdmin) {
        console.log(`🔄 Migrating legacy admin (${legacyAdmin.email}) to ${adminEmail}...`);
        legacyAdmin.email = adminEmail;
        legacyAdmin.role = 'admin';
        await legacyAdmin.save();
        admin = legacyAdmin;
        console.log(`✅ Successfully updated admin email to: ${admin.email}`);
      }
    }

    if (!admin) {
      if (!adminPassword) {
        console.warn('⚠️ Notice: ADMIN_PASSWORD environment variable is not set. Skipping initial admin seed.');
        return;
      }
      console.log(`🌱 Seeding initial admin account for ${adminEmail}...`);
      admin = await User.create({
        name: adminName,
        email: adminEmail,
        phone: '',
        password: adminPassword,
        role: 'admin',
      });
      console.log(`✅ Admin account created successfully for: ${admin.email}`);
    } else {
      // Ensure existing account has the 'admin' role
      if (admin.role !== 'admin') {
        admin.role = 'admin';
        await admin.save();
        console.log(`✅ User ${admin.email} promoted to admin role.`);
      } else {
        console.log(`✅ Verified admin account ready: ${admin.email}`);
      }
    }
  } catch (error) {
    console.warn('⚠️ Notice on admin seed check:', error.message);
  }
};

module.exports = seedAdmin;
