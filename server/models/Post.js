
const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
    trim: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Number,
    default: 0
  }
});

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  replies: [replySchema],
  likes: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Post', postSchema);
