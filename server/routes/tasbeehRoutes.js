const express = require('express');
const router = express.Router();
const { saveCount, getHistory } = require('../controllers/tasbeehController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .post(saveCount)
  .get(getHistory);

module.exports = router;
