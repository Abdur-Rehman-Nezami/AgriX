import Price from '../models/Price.js';

// Get government official dashboard stats
export const getGovStats = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const totalSubmissions = await Price.countDocuments({ 
      userId, 
      source: 'gov' 
    });
    
    const approvedSubmissions = await Price.countDocuments({ 
      userId, 
      source: 'gov',
      govApprovalStatus: 'approved'
    });
    
    const pendingSubmissions = await Price.countDocuments({ 
      userId, 
      source: 'gov',
      govApprovalStatus: 'pending'
    });
    
    const rejectedSubmissions = await Price.countDocuments({ 
      userId, 
      source: 'gov',
      govApprovalStatus: 'rejected'
    });

    res.json({
      totalSubmissions,
      approvedSubmissions,
      pendingSubmissions,
      rejectedSubmissions
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Submit government price (requires admin approval)
export const submitGovPrice = async (req, res) => {
  try {
    const { crop, price, unit, region, date } = req.body;
    
    const newPrice = await Price.create({
      crop,
      price,
      unit: unit || 'per 40kg',
      region,
      date: date || new Date(),
      source: 'gov',
      userId: req.user.id,
      verified: false, // Not verified until admin approves
      govApprovalStatus: 'pending', // Pending admin approval
      submittedBy: req.user.id
    });

    res.status(201).json(newPrice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get my submissions
export const getMySubmissions = async (req, res) => {
  try {
    const submissions = await Price.find({ 
      userId: req.user.id,
      source: 'gov'
    })
    .sort({ date: -1 })
    .limit(100);
    
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
