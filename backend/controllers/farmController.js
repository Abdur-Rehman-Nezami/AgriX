import FarmRegion from '../models/FarmRegion.js';
import FarmActivity from '../models/FarmActivity.js';

// Get all farm regions for a user
export const getFarmRegions = async (req, res) => {
  try {
    const regions = await FarmRegion.find({ userId: req.user.id, active: true })
      .sort({ createdAt: -1 });
    res.json(regions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single farm region
export const getFarmRegion = async (req, res) => {
  try {
    const region = await FarmRegion.findOne({ 
      _id: req.params.id, 
      userId: req.user.id 
    });
    
    if (!region) {
      return res.status(404).json({ message: 'Region not found' });
    }
    
    res.json(region);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new farm region
export const createFarmRegion = async (req, res) => {
  try {
    const regionData = {
      ...req.body,
      userId: req.user.id
    };
    
    const region = await FarmRegion.create(regionData);
    res.status(201).json(region);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update farm region
export const updateFarmRegion = async (req, res) => {
  try {
    const region = await FarmRegion.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    
    if (!region) {
      return res.status(404).json({ message: 'Region not found' });
    }
    
    res.json(region);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete farm region (soft delete)
export const deleteFarmRegion = async (req, res) => {
  try {
    const region = await FarmRegion.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { active: false },
      { new: true }
    );
    
    if (!region) {
      return res.status(404).json({ message: 'Region not found' });
    }
    
    res.json({ message: 'Region deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add issue to region
export const addIssue = async (req, res) => {
  try {
    const region = await FarmRegion.findOne({ 
      _id: req.params.id, 
      userId: req.user.id 
    });
    
    if (!region) {
      return res.status(404).json({ message: 'Region not found' });
    }
    
    region.currentIssues.push({
      ...req.body,
      detectedDate: new Date()
    });
    
    await region.save();
    res.json(region);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add deficiency to region
export const addDeficiency = async (req, res) => {
  try {
    const region = await FarmRegion.findOne({ 
      _id: req.params.id, 
      userId: req.user.id 
    });
    
    if (!region) {
      return res.status(404).json({ message: 'Region not found' });
    }
    
    region.deficiencies.push({
      ...req.body,
      detectedDate: new Date()
    });
    
    await region.save();
    res.json(region);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get activities for a region
export const getRegionActivities = async (req, res) => {
  try {
    const activities = await FarmActivity.find({ 
      regionId: req.params.id,
      userId: req.user.id 
    }).sort({ date: -1 });
    
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add activity
export const addActivity = async (req, res) => {
  try {
    const activityData = {
      ...req.body,
      userId: req.user.id
    };
    
    const activity = await FarmActivity.create(activityData);
    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get dashboard stats
export const getFarmStats = async (req, res) => {
  try {
    const totalRegions = await FarmRegion.countDocuments({ 
      userId: req.user.id, 
      active: true 
    });
    
    const totalArea = await FarmRegion.aggregate([
      { $match: { userId: req.user.id, active: true } },
      { $group: { _id: null, total: { $sum: '$area' } } }
    ]);
    
    const activeIssues = await FarmRegion.aggregate([
      { $match: { userId: req.user.id, active: true } },
      { $unwind: '$currentIssues' },
      { $match: { 'currentIssues.resolved': false } },
      { $count: 'total' }
    ]);
    
    const recentActivities = await FarmActivity.countDocuments({
      userId: req.user.id,
      date: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    });
    
    res.json({
      totalRegions,
      totalArea: totalArea[0]?.total || 0,
      activeIssues: activeIssues[0]?.total || 0,
      recentActivities
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
