const User = require('../models/User');
const Bookmark = require('../models/Bookmark');
const Tasbeeh = require('../models/Tasbeeh');
const Feedback = require('../models/Feedback');

// @desc    Get dashboard metrics from MongoDB
// @route   GET /api/admin/stats
// @access  Private (Admin Only)
exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({});
    const totalAdmins = await User.countDocuments({ role: 'admin' });
    const totalRegularUsers = await User.countDocuments({ role: 'user' });
    const totalBookmarks = await Bookmark.countDocuments({});
    const totalTasbeehLogs = await Tasbeeh.countDocuments({});
    const totalFeedback = await Feedback.countDocuments({});
    const unreadFeedback = await Feedback.countDocuments({ status: 'unread' });

    // Users registered in the last 24 hours
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const newUsersToday = await User.countDocuments({ createdAt: { $gte: oneDayAgo } });

    // Recent 5 users
    const recentUsers = await User.find({})
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(5);

    return res.json({
      success: true,
      data: {
        totalUsers,
        totalAdmins,
        totalRegularUsers,
        totalBookmarks,
        totalTasbeehLogs,
        totalFeedback,
        unreadFeedback,
        newUsersToday,
        totalSurahs: 114,
        recentUsers,
      },
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all users with search & filters
// @route   GET /api/admin/users
// @access  Private (Admin Only)
exports.getUsers = async (req, res) => {
  try {
    const { search, role, sort } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    if (role && role !== 'all') {
      query.role = role;
    }

    let sortOption = { createdAt: -1 };
    if (sort === 'oldest') sortOption = { createdAt: 1 };
    if (sort === 'name') sortOption = { name: 1 };

    const users = await User.find(query)
      .select('-password')
      .sort(sortOption);

    return res.json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error('Admin getUsers error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update user role (promote/demote)
// @route   PUT /api/admin/users/:id/role
// @access  Private (Admin Only)
exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role specified' });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Prevent admin from removing their own admin role
    if (user._id.toString() === req.user.id && role !== 'admin') {
      return res.status(400).json({
        success: false,
        message: 'You cannot remove your own admin privileges',
      });
    }

    user.role = role;
    await user.save();

    return res.json({
      success: true,
      message: `User role updated to ${role}`,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin Only)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Prevent deleting oneself
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete your own admin account',
      });
    }

    // Delete user's bookmarks
    await Bookmark.deleteMany({ userId: user._id });
    await Tasbeeh.deleteMany({ userId: user._id });
    await User.findByIdAndDelete(req.params.id);

    return res.json({
      success: true,
      message: 'User and all associated data deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
