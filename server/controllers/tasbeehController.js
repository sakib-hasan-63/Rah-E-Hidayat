const Tasbeeh = require('../models/Tasbeeh');
const User = require('../models/User');

// @desc    Log a tasbeeh count session
// @route   POST /api/tasbeeh
// @access  Private
exports.saveCount = async (req, res) => {
  try {
    const { dhikr, count, target, completed } = req.body;

    if (!dhikr || count === undefined) {
      return res.status(400).json({ success: false, message: 'Dhikr and count are required' });
    }

    const log = await Tasbeeh.create({
      userId: req.user.id,
      dhikr,
      count,
      target: target || 33,
      completed: !!completed,
    });

    // Update user's total tasbeeh counter
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { tasbeehCount: count },
    });

    return res.status(201).json({ success: true, log });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get user's tasbeeh history
// @route   GET /api/tasbeeh
// @access  Private
exports.getHistory = async (req, res) => {
  try {
    const history = await Tasbeeh.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(20);
    return res.json({ success: true, history });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
