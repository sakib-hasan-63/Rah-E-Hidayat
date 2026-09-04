const express = require('express');
const router = express.Router();
const { submitFeedback } = require('../controllers/feedbackController');
const { optionalAuth } = require('../middleware/auth');

// Public route to submit feedback (authenticates user if token provided)
router.post('/', optionalAuth, submitFeedback);

module.exports = router;
