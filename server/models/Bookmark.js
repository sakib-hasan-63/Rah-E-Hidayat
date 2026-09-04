const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['Quran', 'Hadith', 'Dua', 'Azkar', 'Article'],
      default: 'Quran',
    },
    surahNumber: {
      type: Number,
    },
    ayahNumber: {
      type: Number,
    },
    ref: {
      type: String,
      default: '',
    },
    arabic: {
      type: String,
      default: '',
    },
    translation: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Bookmark', bookmarkSchema);
