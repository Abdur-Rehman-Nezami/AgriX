import Price from '../models/Price.js';
import User from '../models/User.js';

// Get admin dashboard stats
export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPrices = await Price.countDocuments();
    const pendingVerifications = await Price.countDocuments({ verified: false, source: 'farmer' });
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const verifiedToday = await Price.countDocuments({ 
      verified: true, 
      updatedAt: { $gte: today } 
    });

    res.json({
      totalUsers,
      totalPrices,
      pendingVerifications,
      verifiedToday
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get pending price verifications
export const getPendingPrices = async (req, res) => {
  try {
    const pendingPrices = await Price.find({ verified: false, source: 'farmer' })
      .sort({ date: -1 })
      .limit(50)
      .populate('userId', 'name email');
    
    res.json(pendingPrices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verify or reject a price entry
export const verifyPrice = async (req, res) => {
  try {
    const { id } = req.params;
    const { verified } = req.body;

    const price = await Price.findByIdAndUpdate(
      id,
      { verified, verifiedBy: req.user.id, verifiedAt: new Date() },
      { new: true }
    );

    if (!price) {
      return res.status(404).json({ message: 'Price not found' });
    }

    res.json(price);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get price analytics (distribution by source)
export const getPriceAnalytics = async (req, res) => {
  try {
    const analytics = await Price.aggregate([
      {
        $group: {
          _id: '$source',
          count: { $sum: 1 }
        }
      }
    ]);

    const formattedData = analytics.map(item => ({
      name: item._id.charAt(0).toUpperCase() + item._id.slice(1),
      value: item.count
    }));

    res.json(formattedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get monthly statistics
export const getMonthlyStats = async (req, res) => {
  try {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const stats = await Price.aggregate([
      {
        $match: {
          date: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            month: { $month: '$date' },
            year: { $year: '$date' },
            source: '$source'
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    // Format data for chart
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formattedData = {};

    stats.forEach(item => {
      const monthKey = `${monthNames[item._id.month - 1]} ${item._id.year}`;
      if (!formattedData[monthKey]) {
        formattedData[monthKey] = { month: monthKey, farmer: 0, admin: 0, gov: 0 };
      }
      formattedData[monthKey][item._id.source] = item.count;
    });

    res.json(Object.values(formattedData));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Prevent deleting yourself
    if (id === req.user.id) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    const user = await User.findByIdAndDelete(id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Also delete all prices by this user
    await Price.deleteMany({ userId: id });

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add official admin price
export const addAdminPrice = async (req, res) => {
  try {
    const { crop, price, unit, region, date } = req.body;
    
    const newPrice = await Price.create({
      crop,
      price,
      unit: unit || 'per 40kg',
      region,
      date: date || new Date(),
      source: 'admin',
      userId: req.user.id,
      verified: true
    });

    res.status(201).json(newPrice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get pending government submissions
export const getGovSubmissions = async (req, res) => {
  try {
    const submissions = await Price.find({ 
      source: 'gov',
      govApprovalStatus: 'pending'
    })
    .populate('userId', 'name email')
    .sort({ date: -1 });
    
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve or reject government price
export const approveGovPrice = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    const updateData = {
      govApprovalStatus: status,
      approvedBy: req.user.id,
      approvedAt: new Date()
    };

    if (status === 'approved') {
      updateData.verified = true;
    }

    if (adminNotes) {
      updateData.adminNotes = adminNotes;
    }

    const price = await Price.findByIdAndUpdate(id, updateData, { new: true });

    if (!price) {
      return res.status(404).json({ message: 'Price not found' });
    }

    res.json(price);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
