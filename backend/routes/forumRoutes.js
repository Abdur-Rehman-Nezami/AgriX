import express from 'express';
import {
  getForumPosts,
  getForumPost,
  createForumPost,
  updateForumPost,
  deleteForumPost,
  toggleLikePost,
  markAsSolved,
  getPostReplies,
  createReply,
  toggleLikeReply,
  getForumStats
} from '../controllers/forumController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Stats
router.get('/stats', getForumStats);

// Posts
router.get('/posts', getForumPosts);
router.get('/posts/:id', getForumPost);
router.post('/posts', createForumPost);
router.put('/posts/:id', updateForumPost);
router.delete('/posts/:id', deleteForumPost);

// Post actions
router.post('/posts/:id/like', toggleLikePost);
router.post('/posts/:id/solve', markAsSolved);

// Replies
router.get('/posts/:id/replies', getPostReplies);
router.post('/posts/:id/replies', createReply);
router.post('/replies/:replyId/like', toggleLikeReply);

export default router;
