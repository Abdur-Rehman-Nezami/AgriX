import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const createTestFarmer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB\n");

    // Check if test farmer exists
    let farmer = await User.findOne({ email: "farmer@test.com" });

    if (farmer) {
      console.log("Test farmer already exists. Deleting and recreating...");
      await User.deleteOne({ email: "farmer@test.com" });
      farmer = await User.create({
        name: "Test Farmer",
        email: "farmer@test.com",
        password: "farmer123", // Let the pre-save hook hash it
        role: "farmer",
        region: "Punjab",
      });
    } else {
      console.log("Creating test farmer...");
      farmer = await User.create({
        name: "Test Farmer",
        email: "farmer@test.com",
        password: "farmer123", // Let the pre-save hook hash it
        role: "farmer",
        region: "Punjab",
      });
    }

    // Test password
    const testFarmer = await User.findOne({ email: "farmer@test.com" });
    const isMatch = await bcrypt.compare("farmer123", testFarmer.password);

    console.log(
      `Password match test: ${isMatch ? "✅ SUCCESS" : "❌ FAILED"}\n`
    );

    if (isMatch) {
      console.log("-----------------------------------");
      console.log("✅ Farmer credentials are ready!");
      console.log("Email: farmer@test.com");
      console.log("Password: farmer123");
      console.log("Role: farmer");
      console.log("Region: Punjab");
      console.log("-----------------------------------");
    }

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

createTestFarmer();
