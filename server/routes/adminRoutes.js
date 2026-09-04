const express = require('express');
const router = express.Router();
const { getStats, getUsers, updateUserRole, deleteUser } = require('../controllers/adminController');
const { getAllFeedback, updateFeedbackStatus, deleteFeedback } = require('../controllers/feedbackController');
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/role');

// All admin routes require authentication AND admin role
router.use(protect);
router.use(adminOnly);

router.get('/stats', getStats);
router.get('/users', getUsers);
router.put('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);

// Feedback management
router.get('/feedback', getAllFeedback);
router.put('/feedback/:id/status', updateFeedbackStatus);
router.delete('/feedback/:id', deleteFeedback);

module.exports = router;

