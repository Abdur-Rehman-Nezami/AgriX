import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const fixAdminPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');
    
    // Find admin user
    const admin = await User.findOne({ email: 'admin@agrosmart.com' });
    
    if (!admin) {
      console.log('❌ Admin user not found!');
      await mongoose.connection.close();
      process.exit(1);
    }
    
    console.log('Updating admin password...');
    
    // Update password directly without triggering pre-save hook
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await User.updateOne(
      { email: 'admin@agrosmart.com' },
      { $set: { password: hashedPassword } }
    );
    
    console.log('✅ Password updated successfully!\n');
    
    // Test password
    const updatedAdmin = await User.findOne({ email: 'admin@agrosmart.com' });
    const isMatch = await bcrypt.compare('admin123', updatedAdmin.password);
    
    console.log('Testing password verification...');
    console.log(`Password match test: ${isMatch ? '✅ SUCCESS' : '❌ FAILED'}\n`);
    
    if (isMatch) {
      console.log('-----------------------------------');
      console.log('✅ Admin credentials are ready!');
      console.log('Email: admin@agrosmart.com');
      console.log('Password: admin123');
      console.log('-----------------------------------');
    }
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

fixAdminPassword();
