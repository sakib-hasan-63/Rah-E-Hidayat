const User = require('../models/User');
const Bookmark = require('../models/Bookmark');
const jwt = require('jsonwebtoken');

// Helper to generate JWT Token
const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || 'rah-e-hidayat-secure-production-jwt-key-2026';
  return jwt.sign({ id }, secret, {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

// Helper to calculate & update consecutive day streak
const processUserStreak = (user) => {
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);

  // If user has no streak recorded or no lastStreakDate/lastLogin
  const prevDate = user.lastStreakDate || user.lastLogin;

  if (!prevDate) {
    user.lastStreakDate = now;
    return false;
  }

  const lastDateStr = new Date(prevDate).toISOString().slice(0, 10);

  if (todayStr === lastDateStr) {
    // Already visited/updated today
    return false;
  }

  const todayMs = new Date(todayStr).getTime();
  const lastMs = new Date(lastDateStr).getTime();
  const diffDays = Math.round((todayMs - lastMs) / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    // Consecutive day visit/login: increment streak
    user.streakDays = (user.streakDays || 0) + 1;
    user.lastStreakDate = now;
    return true;
  } else if (diffDays > 1) {
    // Missed at least one day: reset streak according to consecutive day logic
    user.streakDays = 1;
    user.lastStreakDate = now;
    return true;
  }

  return false;
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide full name, email, and password',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long',
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email address already exists',
      });
    }

    // Create user in MongoDB with default role: 'user' and 0 streak/saved stats
    const now = new Date();
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      phone: phone || '',
      password,
      role: 'user',
      streakDays: 0,
      lastStreakDate: now,
      quranProgress: 0,
      hadithRead: 0,
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
        streakDays: 0,
        tasbeehCount: 0,
        quranProgress: 0,
        hadithRead: 0,
        bookmarkCount: 0,
        savedCount: 0,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error during registration',
    });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email/phone and password',
      });
    }

    // Check for user by email or phone (include password for verification)
    const user = await User.findOne({
      $or: [
        { email: email.toLowerCase().trim() },
        { phone: email.trim() },
      ],
    }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email/phone or password',
      });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email/phone or password',
      });
    }

    // Calculate streak and update last login
    processUserStreak(user);
    user.lastLogin = Date.now();
    await user.save({ validateBeforeSave: false });

    const bookmarkCount = await Bookmark.countDocuments({ userId: user._id });
    const token = generateToken(user._id);

    return res.json({
      success: true,
      message: 'Logged in successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
        streakDays: user.streakDays || 0,
        tasbeehCount: user.tasbeehCount || 0,
        quranProgress: user.quranProgress || 0,
        hadithRead: user.hadithRead || 0,
        bookmarkCount: bookmarkCount || 0,
        savedCount: bookmarkCount || 0,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error during login',
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Process streak update on daily visit
    processUserStreak(user);
    user.lastLogin = Date.now();
    await user.save({ validateBeforeSave: false });

    const bookmarkCount = await Bookmark.countDocuments({ userId: user._id });

    return res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
        streakDays: user.streakDays || 0,
        tasbeehCount: user.tasbeehCount || 0,
        quranProgress: user.quranProgress || 0,
        hadithRead: user.hadithRead || 0,
        bookmarkCount: bookmarkCount || 0,
        savedCount: bookmarkCount || 0,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.name = req.body.name || user.name;
    user.phone = req.body.phone !== undefined ? req.body.phone : user.phone;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    const bookmarkCount = await Bookmark.countDocuments({ userId: updatedUser._id });

    return res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role,
        avatar: updatedUser.avatar,
        streakDays: updatedUser.streakDays || 0,
        tasbeehCount: updatedUser.tasbeehCount || 0,
        quranProgress: updatedUser.quranProgress || 0,
        hadithRead: updatedUser.hadithRead || 0,
        bookmarkCount: bookmarkCount || 0,
        savedCount: bookmarkCount || 0,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

// @desc    Forgot password — generate reset token & send email
// @route   POST /api/auth/forgot-password
// @access  Public
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide your registered email address',
      });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No registered account found with that email address',
      });
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // Create reset URL
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    const resetUrl = `${clientUrl}/reset-password/${resetToken}`;

    const message = `Assalamu Alaykum ${user.name},\n\nYou are receiving this email because you (or someone else) requested a password reset for your Rah-e-Hidayat account.\n\nPlease click the link below or copy and paste it into your browser to set a new password:\n\n${resetUrl}\n\nThis link is valid for 15 minutes.\n\nIf you did not request this password reset, please ignore this email and your password will remain unchanged.\n\nWarm regards,\nRah-e-Hidayat Team`;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; background-color: #FAF8F2; border-radius: 16px; border: 1px solid #E2DED0;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="color: #0F5132; margin: 0; font-size: 24px;">Rah-e-Hidayat</h2>
          <p style="color: #536555; margin: 4px 0 0 0; font-size: 13px;">The Path of Guidance</p>
        </div>
        <div style="background-color: #ffffff; padding: 24px; border-radius: 12px; border: 1px solid rgba(15, 81, 50, 0.1);">
          <h3 style="color: #142015; margin-top: 0;">Password Reset Request</h3>
          <p style="color: #536555; font-size: 14px; line-height: 1.6;">
            Assalamu Alaykum <strong>${user.name}</strong>,
          </p>
          <p style="color: #536555; font-size: 14px; line-height: 1.6;">
            We received a request to reset the password for your Rah-e-Hidayat account. Click the button below to choose a new password:
          </p>
          <div style="text-align: center; margin: 28px 0;">
            <a href="${resetUrl}" style="background-color: #0F5132; color: #ffffff; padding: 12px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p style="color: #7A8D7C; font-size: 12px; line-height: 1.5;">
            Or copy and paste this link in your browser:<br/>
            <a href="${resetUrl}" style="color: #0F5132; word-break: break-all;">${resetUrl}</a>
          </p>
          <hr style="border: none; border-top: 1px solid #E2DED0; margin: 20px 0;" />
          <p style="color: #7A8D7C; font-size: 11px; margin: 0;">
            ⚠️ This link will expire in <strong>15 minutes</strong>. If you did not request this, please ignore this email.
          </p>
        </div>
      </div>
    `;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Rah-e-Hidayat — Password Reset Request',
        message,
        html,
      });

      return res.json({
        success: true,
        message: 'Password reset email sent! Please check your inbox.',
      });
    } catch (err) {
      console.error('Email send failed:', err);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });

      return res.status(500).json({
        success: false,
        message: 'Email could not be sent. Please contact the administrator.',
      });
    }
  } catch (error) {
    console.error('Forgot password error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during password reset request',
    });
  }
};

// @desc    Reset password using token
// @route   PUT /api/auth/reset-password/:token
// @access  Public
exports.resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const { token } = req.params;

    if (!password || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long',
      });
    }

    // Get hashed token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired password reset link. Please request a new one.',
      });
    }

    // Set new password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    const jwtToken = generateToken(user._id);

    return res.json({
      success: true,
      message: 'Password reset successful! You are now logged in.',
      token: jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
        streakDays: user.streakDays || 0,
        tasbeehCount: user.tasbeehCount || 0,
        quranProgress: user.quranProgress || 0,
        hadithRead: user.hadithRead || 0,
        bookmarkCount: 0,
        savedCount: 0,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Reset password error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error while resetting password',
    });
  }
};

