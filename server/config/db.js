const mongoose = require('mongoose');

let isConnecting = null;

const connectDB = async () => {
  // If already connected, return existing connection
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  // If a connection attempt is currently in progress, await it
  if (isConnecting) {
    return await isConnecting;
  }

  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/rah-e-hidayat';

  // In production / Vercel, fail early if using localhost fallback
  if (!process.env.MONGODB_URI && (process.env.VERCEL || process.env.NODE_ENV === 'production')) {
    console.error('❌ MONGODB_URI environment variable is missing! Vercel serverless functions cannot connect to localhost:27017.');
    return null;
  }

  try {
    isConnecting = mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    const conn = await isConnecting;
    isConnecting = null;
    console.log(`🍃 MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    isConnecting = null;
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    return null;
  }
};

module.exports = connectDB;
