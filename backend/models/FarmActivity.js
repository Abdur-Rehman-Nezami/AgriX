import mongoose from 'mongoose';

const farmActivitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  regionId: { type: mongoose.Schema.Types.ObjectId, ref: 'FarmRegion', required: true },
  
  activityType: {
    type: String,
    enum: ['watering', 'fertilizer', 'pesticide', 'weeding', 'inspection', 'harvesting', 'other'],
    required: true
  },
  
  date: { type: Date, default: Date.now },
  
  // Watering Details
  waterAmount: { type: Number }, // in liters or gallons
  waterDuration: { type: Number }, // in minutes
  
  // Fertilizer Details
  fertilizerName: { type: String },
  fertilizerType: { type: String }, // NPK, Organic, etc.
  fertilizerAmount: { type: Number },
  fertilizerUnit: { type: String }, // kg, lbs, bags
  
  // Pesticide Details
  pesticideName: { type: String },
  pesticideType: { type: String }, // Insecticide, Herbicide, Fungicide
  pesticideAmount: { type: Number },
  pesticideUnit: { type: String },
  targetPest: { type: String },
  
  // General
  description: { type: String },
  cost: { type: Number },
  notes: { type: String },
  
  // Weather conditions during activity
  temperature: { type: Number },
  humidity: { type: Number },
  weatherCondition: { type: String }
}, { timestamps: true });

export default mongoose.model('FarmActivity', farmActivitySchema);
