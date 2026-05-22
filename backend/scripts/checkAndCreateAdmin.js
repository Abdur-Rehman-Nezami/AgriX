import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const checkAndCreateAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');
    
    // Check all existing users
    const allUsers = await User.find().select('-password');
    console.log(`Found ${allUsers.length} existing users:`);
    allUsers.forEach(user => {
      console.log(`- ${user.email} (${user.role})`);
    });
    console.log('');
    
    // Check if admin exists
    let admin = await User.findOne({ email: 'admin@agrosmart.com' });
    
    if (admin) {
      console.log('✅ Admin user already exists!');
      console.log('-----------------------------------');
      console.log('Email: admin@agrosmart.com');
      console.log('Password: admin123');
      console.log('-----------------------------------');
    } else {
      console.log('Creating new admin user...');
      
      // Hash password manually (not using pre-save hook)
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      admin = await User.create({
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
    }
    
    // Test password comparison
    console.log('\nTesting password verification...');
    const testUser = await User.findOne({ email: 'admin@agrosmart.com' });
    const isMatch = await bcrypt.compare('admin123', testUser.password);
    console.log(`Password match test: ${isMatch ? '✅ SUCCESS' : '❌ FAILED'}`);
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

checkAndCreateAdmin();
