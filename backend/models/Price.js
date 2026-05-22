import mongoose from 'mongoose';

const priceSchema = new mongoose.Schema({
  crop: { type: String, required: true },
  price: { type: Number, required: true },
  unit: { type: String, default: 'kg' },
  region: { type: String, required: true },
  date: { type: Date, default: Date.now },
  source: { type: String, enum: ['farmer', 'admin', 'gov'], required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  verified: { type: Boolean, default: false },
  verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  verifiedAt: { type: Date },
  // Government approval fields
  govApprovalStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  approvedAt: { type: Date },
  adminNotes: { type: String }
}, { timestamps: true });

export default mongoose.model('Price', priceSchema);
