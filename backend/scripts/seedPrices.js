import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Price from '../models/Price.js';
import connectDB from '../config/db.js';

dotenv.config();

const mockPricesData = [
  // Farmer Data
  { crop: 'Wheat', price: 3800, unit: 'per 40kg', region: 'Punjab', date: new Date('2024-11-01'), source: 'farmer', verified: false },
  { crop: 'Rice', price: 4600, unit: 'per 40kg', region: 'Sindh', date: new Date('2024-11-01'), source: 'farmer', verified: false },
  { crop: 'Cotton', price: 6250, unit: 'per 40kg', region: 'Punjab', date: new Date('2024-11-02'), source: 'farmer', verified: false },
  { crop: 'Sugarcane', price: 3200, unit: 'per 40kg', region: 'KPK', date: new Date('2024-11-02'), source: 'farmer', verified: false },
  { crop: 'Maize', price: 2800, unit: 'per 40kg', region: 'Punjab', date: new Date('2024-11-03'), source: 'farmer', verified: false },
  { crop: 'Wheat', price: 3850, unit: 'per 40kg', region: 'Sindh', date: new Date('2024-11-03'), source: 'farmer', verified: false },
  { crop: 'Rice', price: 4550, unit: 'per 40kg', region: 'Punjab', date: new Date('2024-11-03'), source: 'farmer', verified: false },
  { crop: 'Potato', price: 1500, unit: 'per 40kg', region: 'Balochistan', date: new Date('2024-11-04'), source: 'farmer', verified: false },
  { crop: 'Onion', price: 2200, unit: 'per 40kg', region: 'Sindh', date: new Date('2024-11-04'), source: 'farmer', verified: false },
  { crop: 'Tomato', price: 1800, unit: 'per 40kg', region: 'Punjab', date: new Date('2024-11-04'), source: 'farmer', verified: false },
  { crop: 'Cotton', price: 6300, unit: 'per 40kg', region: 'Sindh', date: new Date('2024-10-30'), source: 'farmer', verified: false },
  { crop: 'Wheat', price: 3750, unit: 'per 40kg', region: 'KPK', date: new Date('2024-10-28'), source: 'farmer', verified: false },
  { crop: 'Rice', price: 4500, unit: 'per 40kg', region: 'Balochistan', date: new Date('2024-10-27'), source: 'farmer', verified: false },
  { crop: 'Maize', price: 2750, unit: 'per 40kg', region: 'Sindh', date: new Date('2024-10-26'), source: 'farmer', verified: false },
  { crop: 'Sugarcane', price: 3150, unit: 'per 40kg', region: 'Punjab', date: new Date('2024-10-25'), source: 'farmer', verified: false },

  // Admin Data
  { crop: 'Wheat', price: 3750, unit: 'per 40kg', region: 'Punjab', date: new Date('2024-11-01'), source: 'admin', verified: true },
  { crop: 'Rice', price: 4500, unit: 'per 40kg', region: 'Sindh', date: new Date('2024-11-01'), source: 'admin', verified: true },
  { crop: 'Cotton', price: 6200, unit: 'per 40kg', region: 'Punjab', date: new Date('2024-11-02'), source: 'admin', verified: true },
  { crop: 'Sugarcane', price: 3150, unit: 'per 40kg', region: 'KPK', date: new Date('2024-11-02'), source: 'admin', verified: true },
  { crop: 'Maize', price: 2750, unit: 'per 40kg', region: 'Punjab', date: new Date('2024-11-03'), source: 'admin', verified: true },
  { crop: 'Wheat', price: 3800, unit: 'per 40kg', region: 'Sindh', date: new Date('2024-11-03'), source: 'admin', verified: true },
  { crop: 'Rice', price: 4450, unit: 'per 40kg', region: 'Punjab', date: new Date('2024-11-03'), source: 'admin', verified: true },
  { crop: 'Potato', price: 1450, unit: 'per 40kg', region: 'Balochistan', date: new Date('2024-11-04'), source: 'admin', verified: true },
  { crop: 'Onion', price: 2150, unit: 'per 40kg', region: 'Sindh', date: new Date('2024-11-04'), source: 'admin', verified: true },
  { crop: 'Tomato', price: 1750, unit: 'per 40kg', region: 'Punjab', date: new Date('2024-11-04'), source: 'admin', verified: true },
  { crop: 'Cotton', price: 6250, unit: 'per 40kg', region: 'Sindh', date: new Date('2024-10-30'), source: 'admin', verified: true },
  { crop: 'Wheat', price: 3700, unit: 'per 40kg', region: 'KPK', date: new Date('2024-10-28'), source: 'admin', verified: true },
  { crop: 'Rice', price: 4400, unit: 'per 40kg', region: 'Balochistan', date: new Date('2024-10-27'), source: 'admin', verified: true },
  { crop: 'Maize', price: 2700, unit: 'per 40kg', region: 'Sindh', date: new Date('2024-10-26'), source: 'admin', verified: true },
  { crop: 'Sugarcane', price: 3100, unit: 'per 40kg', region: 'Punjab', date: new Date('2024-10-25'), source: 'admin', verified: true },

  // Government Data
  { crop: 'Wheat', price: 3700, unit: 'per 40kg', region: 'Punjab', date: new Date('2024-11-01'), source: 'gov', verified: true },
  { crop: 'Rice', price: 4400, unit: 'per 40kg', region: 'Sindh', date: new Date('2024-11-01'), source: 'gov', verified: true },
  { crop: 'Cotton', price: 6100, unit: 'per 40kg', region: 'Punjab', date: new Date('2024-11-02'), source: 'gov', verified: true },
  { crop: 'Sugarcane', price: 3100, unit: 'per 40kg', region: 'KPK', date: new Date('2024-11-02'), source: 'gov', verified: true },
  { crop: 'Maize', price: 2700, unit: 'per 40kg', region: 'Punjab', date: new Date('2024-11-03'), source: 'gov', verified: true },
  { crop: 'Wheat', price: 3750, unit: 'per 40kg', region: 'Sindh', date: new Date('2024-11-03'), source: 'gov', verified: true },
  { crop: 'Rice', price: 4350, unit: 'per 40kg', region: 'Punjab', date: new Date('2024-11-03'), source: 'gov', verified: true },
  { crop: 'Potato', price: 1400, unit: 'per 40kg', region: 'Balochistan', date: new Date('2024-11-04'), source: 'gov', verified: true },
  { crop: 'Onion', price: 2100, unit: 'per 40kg', region: 'Sindh', date: new Date('2024-11-04'), source: 'gov', verified: true },
  { crop: 'Tomato', price: 1700, unit: 'per 40kg', region: 'Punjab', date: new Date('2024-11-04'), source: 'gov', verified: true },
  { crop: 'Cotton', price: 6150, unit: 'per 40kg', region: 'Sindh', date: new Date('2024-10-30'), source: 'gov', verified: true },
  { crop: 'Wheat', price: 3650, unit: 'per 40kg', region: 'KPK', date: new Date('2024-10-28'), source: 'gov', verified: true },
  { crop: 'Rice', price: 4300, unit: 'per 40kg', region: 'Balochistan', date: new Date('2024-10-27'), source: 'gov', verified: true },
  { crop: 'Maize', price: 2650, unit: 'per 40kg', region: 'Sindh', date: new Date('2024-10-26'), source: 'gov', verified: true },
  { crop: 'Sugarcane', price: 3050, unit: 'per 40kg', region: 'Punjab', date: new Date('2024-10-25'), source: 'gov', verified: true },

  // Additional historical data for comparison charts
  { crop: 'Wheat', price: 3500, unit: 'per 40kg', region: 'Punjab', date: new Date('2024-10-01'), source: 'admin', verified: true },
  { crop: 'Rice', price: 4200, unit: 'per 40kg', region: 'Sindh', date: new Date('2024-10-01'), source: 'admin', verified: true },
  { crop: 'Cotton', price: 5800, unit: 'per 40kg', region: 'Punjab', date: new Date('2024-10-01'), source: 'admin', verified: true },
  { crop: 'Wheat', price: 3600, unit: 'per 40kg', region: 'Punjab', date: new Date('2024-10-05'), source: 'admin', verified: true },
  { crop: 'Rice', price: 4300, unit: 'per 40kg', region: 'Sindh', date: new Date('2024-10-05'), source: 'admin', verified: true },
  { crop: 'Cotton', price: 5900, unit: 'per 40kg', region: 'Punjab', date: new Date('2024-10-05'), source: 'admin', verified: true },
  { crop: 'Wheat', price: 3550, unit: 'per 40kg', region: 'Punjab', date: new Date('2024-10-10'), source: 'admin', verified: true },
  { crop: 'Rice', price: 4250, unit: 'per 40kg', region: 'Sindh', date: new Date('2024-10-10'), source: 'admin', verified: true },
  { crop: 'Cotton', price: 6000, unit: 'per 40kg', region: 'Punjab', date: new Date('2024-10-10'), source: 'admin', verified: true },
  { crop: 'Wheat', price: 3700, unit: 'per 40kg', region: 'Punjab', date: new Date('2024-10-15'), source: 'admin', verified: true },
  { crop: 'Rice', price: 4400, unit: 'per 40kg', region: 'Sindh', date: new Date('2024-10-15'), source: 'admin', verified: true },
  { crop: 'Cotton', price: 6100, unit: 'per 40kg', region: 'Punjab', date: new Date('2024-10-15'), source: 'admin', verified: true },
  { crop: 'Wheat', price: 3650, unit: 'per 40kg', region: 'Punjab', date: new Date('2024-10-20'), source: 'admin', verified: true },
  { crop: 'Rice', price: 4350, unit: 'per 40kg', region: 'Sindh', date: new Date('2024-10-20'), source: 'admin', verified: true },
  { crop: 'Cotton', price: 5950, unit: 'per 40kg', region: 'Punjab', date: new Date('2024-10-20'), source: 'admin', verified: true },
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    console.log('Clearing existing price data...');
    await Price.deleteMany({});
    
    console.log('Seeding database with mock price data...');
    await Price.insertMany(mockPricesData);
    
    console.log(`✅ Successfully seeded ${mockPricesData.length} price entries!`);
    console.log('Database populated with:');
    console.log('- Farmer data (unverified)');
    console.log('- Admin data (verified)');
    console.log('- Government data (verified)');
    console.log('- Historical data for comparison charts');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
