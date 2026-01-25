import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const createAdmin = async () => {
  try {
    // Connect directly to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Check if admin exists
    const existingAdmin = await User.findOne({ email: 'admin@agrosmart.com' });
    
    if (existingAdmin) {
      console.log('✅ Admin user already exists!');
      console.log('Email: admin@agrosmart.com');
      console.log('You can login now.');
      await mongoose.connection.close();
      process.exit(0);
    }
    
    // Create admin user
    console.log('Creating admin user...');
    
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const admin = new User({
      name: 'Admin User',
      email: 'admin@agrosmart.com',
      password: hashedPassword,
      role: 'admin',
      region: 'Pakistan'
    });
    
    await admin.save();
    
    console.log('✅ Admin user created successfully!');
    console.log('-----------------------------------');
    console.log('Email: admin@agrosmart.com');
    console.log('Password: admin123');
    console.log('-----------------------------------');
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

createAdmin();
