const express = require('express');
const { body, validationResult } = require('express-validator');
const Post = require('../models/Post');

const router = express.Router();

/**
 * Utility: Handle validation errors
 */
const handleValidationErrors = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
};

/**
 * GET / - Get all posts
 */
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * POST / - Create a new post
 */
router.post(
  '/',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('message').notEmpty().withMessage('Message is required'),
  ],
  async (req, res) => {
    const errorResponse = handleValidationErrors(req, res);
    if (errorResponse) return;

    try {
      const { title, message } = req.body;

      const newPost = new Post({ title, message });
      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
    } catch (error) {
      res.status(500).json({ message: 'Could not create post' });
    }
  }
);

/**
 * POST /:id/replies - Add a reply to a post
 */
router.post(
  '/:id/replies',
  [body('message').notEmpty().withMessage('Reply message is required')],
  async (req, res) => {
    const errorResponse = handleValidationErrors(req, res);
    if (errorResponse) return;

    try {
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ message: 'Post not found' });

      const reply = { message: req.body.message };
      post.replies.push(reply);
      const updatedPost = await post.save();

      res.status(201).json(updatedPost);
    } catch (error) {
      res.status(500).json({ message: 'Could not add reply' });
    }
  }
);

/**
 * PATCH /:id/like - Like a post
 */
router.patch('/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.likes += 1;
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Could not like post' });
  }
});

/**
 * PATCH /:postId/replies/:replyId/like - Like a reply
 */
router.patch('/:postId/replies/:replyId/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const reply = post.replies.id(req.params.replyId);
    if (!reply) return res.status(404).json({ message: 'Reply not found' });

    reply.likes += 1;
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Could not like reply' });
  }
});

module.exports = router;

