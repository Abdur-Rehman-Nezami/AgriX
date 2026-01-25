import mongoose from 'mongoose';

const forumPostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ['pest-disease', 'soil-health', 'irrigation', 'fertilizer', 'weather', 'equipment', 'market', 'general'],
    required: true
  },
  crop: { type: String },
  region: { type: String },
  images: [{ type: String }],
  
  status: {
    type: String,
    enum: ['open', 'solved', 'closed'],
    default: 'open'
  },
  
  views: { type: Number, default: 0 },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  
  tags: [{ type: String }],
  
  solved: { type: Boolean, default: false },
  solvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bestAnswer: { type: mongoose.Schema.Types.ObjectId, ref: 'ForumReply' }
}, { timestamps: true });

// Index for search
forumPostSchema.index({ title: 'text', description: 'text', tags: 'text' });

export default mongoose.model('ForumPost', forumPostSchema);
