import ForumPost from '../models/ForumPost.js';
import ForumReply from '../models/ForumReply.js';

// Get all forum posts with filters
export const getForumPosts = async (req, res) => {
  try {
    const { category, status, search, crop, region, sortBy = 'recent' } = req.query;
    const filter = {};
    
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (crop) filter.crop = new RegExp(crop, 'i');
    if (region) filter.region = new RegExp(region, 'i');
    if (search) {
      filter.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { tags: new RegExp(search, 'i') }
      ];
    }
    
    let sort = {};
    if (sortBy === 'recent') sort = { createdAt: -1 };
    else if (sortBy === 'popular') sort = { views: -1 };
    else if (sortBy === 'likes') sort = { 'likes.length': -1 };
    
    const posts = await ForumPost.find(filter)
      .populate('userId', 'name email region')
      .sort(sort)
      .limit(50);
    
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single forum post
export const getForumPost = async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id)
      .populate('userId', 'name email region role');
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Increment views
    post.views += 1;
    await post.save();
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create forum post
export const createForumPost = async (req, res) => {
  try {
    const postData = {
      ...req.body,
      userId: req.user.id
    };
    
    const post = await ForumPost.create(postData);
    const populatedPost = await ForumPost.findById(post._id)
      .populate('userId', 'name email region');
    
    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update forum post
export const updateForumPost = async (req, res) => {
  try {
    const post = await ForumPost.findOne({ 
      _id: req.params.id, 
      userId: req.user.id 
    });
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found or unauthorized' });
    }
    
    Object.assign(post, req.body);
    await post.save();
    
    const updatedPost = await ForumPost.findById(post._id)
      .populate('userId', 'name email region');
    
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete forum post
export const deleteForumPost = async (req, res) => {
  try {
    const post = await ForumPost.findOne({ 
      _id: req.params.id, 
      userId: req.user.id 
    });
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found or unauthorized' });
    }
    
    // Delete all replies
    await ForumReply.deleteMany({ postId: req.params.id });
    
    await post.deleteOne();
    
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Like/Unlike post
export const toggleLikePost = async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    const likeIndex = post.likes.indexOf(req.user.id);
    
    if (likeIndex > -1) {
      post.likes.splice(likeIndex, 1);
    } else {
      post.likes.push(req.user.id);
    }
    
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark post as solved
export const markAsSolved = async (req, res) => {
  try {
    const { replyId } = req.body;
    
    const post = await ForumPost.findOne({ 
      _id: req.params.id, 
      userId: req.user.id 
    });
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found or unauthorized' });
    }
    
    post.solved = true;
    post.status = 'solved';
    post.bestAnswer = replyId;
    post.solvedBy = req.user.id;
    
    await post.save();
    
    // Mark reply as best answer
    if (replyId) {
      await ForumReply.findByIdAndUpdate(replyId, { isBestAnswer: true });
    }
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get replies for a post
export const getPostReplies = async (req, res) => {
  try {
    const replies = await ForumReply.find({ 
      postId: req.params.id,
      parentReplyId: null 
    })
      .populate('userId', 'name email region role')
      .sort({ isBestAnswer: -1, createdAt: 1 });
    
    res.json(replies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create reply
export const createReply = async (req, res) => {
  try {
    const replyData = {
      ...req.body,
      postId: req.params.id,
      userId: req.user.id
    };
    
    const reply = await ForumReply.create(replyData);
    const populatedReply = await ForumReply.findById(reply._id)
      .populate('userId', 'name email region role');
    
    res.status(201).json(populatedReply);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Like/Unlike reply
export const toggleLikeReply = async (req, res) => {
  try {
    const reply = await ForumReply.findById(req.params.replyId);
    
    if (!reply) {
      return res.status(404).json({ message: 'Reply not found' });
    }
    
    const likeIndex = reply.likes.indexOf(req.user.id);
    
    if (likeIndex > -1) {
      reply.likes.splice(likeIndex, 1);
    } else {
      reply.likes.push(req.user.id);
    }
    
    await reply.save();
    res.json(reply);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get forum stats
export const getForumStats = async (req, res) => {
  try {
    const totalPosts = await ForumPost.countDocuments();
    const solvedPosts = await ForumPost.countDocuments({ solved: true });
    const myPosts = await ForumPost.countDocuments({ userId: req.user.id });
    const myReplies = await ForumReply.countDocuments({ userId: req.user.id });
    
    res.json({
      totalPosts,
      solvedPosts,
      myPosts,
      myReplies
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
