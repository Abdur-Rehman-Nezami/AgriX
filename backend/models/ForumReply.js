import mongoose from 'mongoose';

const forumReplySchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'ForumPost', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  images: [{ type: String }],
  
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  
  isBestAnswer: { type: Boolean, default: false },
  
  // For nested replies
  parentReplyId: { type: mongoose.Schema.Types.ObjectId, ref: 'ForumReply' }
}, { timestamps: true });

export default mongoose.model('ForumReply', forumReplySchema);
