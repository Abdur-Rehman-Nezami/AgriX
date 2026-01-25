import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';
import connectDB from '../config/db.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();
    
    console.log('Checking for existing admin user...');
    
    const existingAdmin = await User.findOne({ email: 'admin@agrosmart.com' });
    
    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log('Email: admin@agrosmart.com');
      process.exit(0);
    }
    
    console.log('Creating admin user...');
    
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@agrosmart.com',
      password: hashedPassword,
      role: 'admin',
      region: 'Pakistan'
    });
    
    console.log('✅ Admin user created successfully!');
    console.log('-----------------------------------');
    console.log('Email: admin@agrosmart.com');
    console.log('Password: admin123');
    console.log('-----------------------------------');
    console.log('Please change the password after first login!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    process.exit(1);
  }
};

seedAdmin();
