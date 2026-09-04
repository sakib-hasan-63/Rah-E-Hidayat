const Bookmark = require('../models/Bookmark');

// @desc    Get all bookmarks for logged in user
// @route   GET /api/bookmarks
// @access  Private
exports.getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ userId: req.user.id }).sort({ createdAt: -1 });
    return res.json({ success: true, count: bookmarks.length, bookmarks });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new bookmark
// @route   POST /api/bookmarks
// @access  Private
exports.addBookmark = async (req, res) => {
  try {
    const { title, type, surahNumber, ayahNumber, ref, arabic, translation, link } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: 'Bookmark title is required' });
    }

    const bookmark = await Bookmark.create({
      userId: req.user.id,
      title,
      type: type || 'Quran',
      surahNumber,
      ayahNumber,
      ref,
      arabic,
      translation,
      link: link || (surahNumber ? `/quran/${surahNumber}` : '/'),
    });

    return res.status(201).json({ success: true, bookmark });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Remove a bookmark
// @route   DELETE /api/bookmarks/:id
// @access  Private
exports.deleteBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findOne({ _id: req.params.id, userId: req.user.id });

    if (!bookmark) {
      return res.status(404).json({ success: false, message: 'Bookmark not found or not authorized' });
    }

    await bookmark.deleteOne();
    return res.json({ success: true, message: 'Bookmark removed successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
