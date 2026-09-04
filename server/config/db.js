const mongoose = require('mongoose');
const dns = require('dns');

// Ensure DNS SRV resolution for MongoDB Atlas works across all environments and ISPs
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development and serverless cold starts in production (e.g. Vercel).
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  // If already connected, return existing connection
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (cached.conn) {
    return cached.conn;
  }

  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/rah-e-hidayat';

  // In production / Vercel, fail early if using localhost fallback
  if (!process.env.MONGODB_URI && (process.env.VERCEL || process.env.NODE_ENV === 'production')) {
    console.error('❌ MONGODB_URI environment variable is missing in Vercel! Add MONGODB_URI in Vercel Project Settings.');
    return null;
  }

  if (!cached.promise) {
    const opts = {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
    };

    cached.promise = mongoose.connect(mongoUri, opts).then((mongooseInstance) => {
      console.log(`🍃 MongoDB Connected: ${mongooseInstance.connection.host}`);
      return mongooseInstance.connection;
    }).catch((err) => {
      cached.promise = null;
      console.error(`❌ MongoDB Connection Error: ${err.message}`);
      return null;
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    return null;
  }
};

module.exports = connectDB;
