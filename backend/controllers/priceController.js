import Price from '../models/Price.js';

export const addPrice = async (req, res) => {
  try {
    const { crop, price, unit, region, date } = req.body;
    const newPrice = await Price.create({
      crop, price, unit, region, date,
      source: req.user.role,
      userId: req.user.id,
      verified: req.user.role === 'admin' || req.user.role === 'gov'
    });
    res.status(201).json(newPrice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPrices = async (req, res) => {
  try {
    const { source, crop, region, startDate, endDate } = req.query;
    const filter = {};
    if (source) filter.source = source;
    if (crop) filter.crop = new RegExp(crop, 'i');
    if (region) filter.region = new RegExp(region, 'i');
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const prices = await Price.find(filter).sort({ date: -1 }).limit(100);
    res.json(prices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getComparison = async (req, res) => {
  try {
    const { crops } = req.query;
    const cropList = crops.split(',');
    const data = await Price.aggregate([
      { $match: { crop: { $in: cropList } } },
      { $group: { _id: { crop: '$crop', date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } } }, avgPrice: { $avg: '$price' } } },
      { $sort: { '_id.date': 1 } }
    ]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
