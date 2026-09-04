const Feedback = require('../models/Feedback');

// @desc    Submit new user feedback
// @route   POST /api/feedback
// @access  Public (Optionally authenticated)
exports.submitFeedback = async (req, res) => {
  try {
    const { name, email, subject, message, type } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Please provide your name' });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
    }

    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Please provide your message/feedback' });
    }

    const validTypes = [
      'General Feedback',
      'Suggestion',
      'Content Correction',
      'Inquiry',
      'Bug Report',
      'Other',
    ];

    const feedbackType = validTypes.includes(type) ? type : 'General Feedback';

    const feedback = await Feedback.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject ? subject.trim() : '',
      message: message.trim(),
      type: feedbackType,
      userId: req.user ? req.user._id : null,
      status: 'unread',
    });

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your feedback has been received and saved.',
      data: feedback,
    });
  } catch (error) {
    console.error('Submit feedback error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error while submitting feedback',
    });
  }
};

// @desc    Get all feedback submissions (with search & filter)
// @route   GET /api/admin/feedback
// @access  Private (Admin Only)
exports.getAllFeedback = async (req, res) => {
  try {
    const { search, type, status } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } },
      ];
    }

    if (type && type !== 'all') {
      query.type = type;
    }

    if (status && status !== 'all') {
      query.status = status;
    }

    const feedbacks = await Feedback.find(query)
      .populate('userId', 'name email avatar role')
      .sort({ createdAt: -1 });

    const totalCount = await Feedback.countDocuments({});
    const unreadCount = await Feedback.countDocuments({ status: 'unread' });

    return res.json({
      success: true,
      count: feedbacks.length,
      totalCount,
      unreadCount,
      feedbacks,
    });
  } catch (error) {
    console.error('Get feedback error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error while fetching feedback',
    });
  }
};

// @desc    Update feedback status (read / unread)
// @route   PUT /api/admin/feedback/:id/status
// @access  Private (Admin Only)
exports.updateFeedbackStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['read', 'unread'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ success: false, message: 'Feedback entry not found' });
    }

    feedback.status = status;
    await feedback.save();

    return res.json({
      success: true,
      message: `Feedback marked as ${status}`,
      feedback,
    });
  } catch (error) {
    console.error('Update feedback status error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error while updating feedback',
    });
  }
};

// @desc    Delete feedback entry
// @route   DELETE /api/admin/feedback/:id
// @access  Private (Admin Only)
exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ success: false, message: 'Feedback entry not found' });
    }

    await Feedback.findByIdAndDelete(req.params.id);

    return res.json({
      success: true,
      message: 'Feedback entry deleted successfully',
    });
  } catch (error) {
    console.error('Delete feedback error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error while deleting feedback',
    });
  }
};
