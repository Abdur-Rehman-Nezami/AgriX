import mongoose from 'mongoose';

const farmRegionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  regionName: { type: String, required: true },
  area: { type: Number, required: true }, // in acres or hectares
  areaUnit: { type: String, enum: ['acres', 'hectares'], default: 'acres' },
  crop: { type: String, required: true },
  plantingDate: { type: Date },
  expectedHarvestDate: { type: Date },
  
  // Soil Information
  soilType: { type: String },
  soilPH: { type: Number },
  soilNitrogen: { type: Number }, // N content
  soilPhosphorus: { type: Number }, // P content
  soilPotassium: { type: Number }, // K content
  soilOrganic: { type: Number }, // Organic matter %
  lastSoilTest: { type: Date },
  
  // Current Status
  currentStage: { 
    type: String, 
    enum: ['preparation', 'planting', 'growing', 'flowering', 'harvesting', 'fallow'],
    default: 'preparation'
  },
  healthStatus: {
    type: String,
    enum: ['excellent', 'good', 'fair', 'poor', 'critical'],
    default: 'good'
  },
  
  // Issues and Deficiencies
  currentIssues: [{ 
    issue: String,
    severity: { type: String, enum: ['low', 'medium', 'high', 'critical'] },
    detectedDate: Date,
    resolved: { type: Boolean, default: false }
  }],
  
  deficiencies: [{
    nutrient: String, // e.g., Nitrogen, Phosphorus, Iron
    severity: { type: String, enum: ['mild', 'moderate', 'severe'] },
    detectedDate: Date,
    resolved: { type: Boolean, default: false }
  }],
  
  // Notes
  notes: { type: String },
  
  active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('FarmRegion', farmRegionSchema);
