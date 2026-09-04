const express = require('express');
const router = express.Router();
const { getBookmarks, addBookmark, deleteBookmark } = require('../controllers/bookmarkController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .get(getBookmarks)
  .post(addBookmark);

router.delete('/:id', deleteBookmark);

module.exports = router;
