const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const connectDB = require('./config/db');
const seedAdmin = require('./utils/seedAdmin');

// Routes
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const bookmarkRoutes = require('./routes/bookmarkRoutes');
const tasbeehRoutes = require('./routes/tasbeehRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Standard Middleware
app.use(helmet({
  crossOriginResourcePolicy: false,
}));

// CORS Configuration supporting development and production (Vercel)
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  ...(process.env.CLIENT_URL ? [process.env.CLIENT_URL] : []),
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, same-origin, curl)
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.includes(origin) ||
      origin.endsWith('.vercel.app') ||
      process.env.NODE_ENV !== 'production'
    ) {
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(morgan('dev'));

// Ensure DB connection for every request (critical for serverless / cold starts)
let adminSeeded = false;
app.use(async (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    await connectDB();
  }
  if (!adminSeeded && mongoose.connection.readyState === 1) {
    adminSeeded = true;
    seedAdmin().catch((err) => console.warn('Admin seed notice:', err.message));
  }

  // If request hits database-dependent API endpoints and DB is disconnected, fail fast with clear guidance
  if (
    req.path.startsWith('/api') &&
    req.path !== '/api/health' &&
    req.path !== '/api/daily-reminder' &&
    mongoose.connection.readyState !== 1
  ) {
    return res.status(503).json({
      success: false,
      message: 'Database connection failed. Please ensure MONGODB_URI is set in Vercel Environment Variables and that MongoDB Atlas Network Access allows 0.0.0.0/0.',
    });
  }

  next();
});

// Initial local connection trigger
connectDB().then(() => {
  if (!adminSeeded) {
    adminSeeded = true;
    seedAdmin().catch((err) => console.warn('Admin seed notice:', err.message));
  }
});

// Health check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    platform: 'Rah-e-Hidayat API',
    tagline: 'Walk the Path of Guidance',
    dbState: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/api/tasbeeh', tasbeehRoutes);
app.use('/api/feedback', feedbackRoutes);

// Daily Quote / Reminders endpoint
app.get('/api/daily-reminder', (req, res) => {
  res.json({
    success: true,
    data: {
      type: 'Ayah',
      arabic: 'فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ',
      translation: 'So remember Me; I will remember you. And be grateful to Me and do not deny Me.',
      reference: 'Surah Al-Baqarah (2:152)',
      category: 'Remembrance & Gratitude',
    },
  });
});

// 404 Handler for API
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'API Route Not Found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Only listen directly when running locally outside of Vercel serverless functions
if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`✨ Rah-e-Hidayat Server running at http://localhost:${PORT}`);
  });
}

module.exports = app;
