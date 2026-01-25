import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import User from "../models/User.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from backend folder
dotenv.config({ path: join(__dirname, "..", ".env") });

const createTestGovOfficial = async () => {
  try {
    console.log("Connecting to MongoDB...");
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI not found in environment variables");
    }
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("✅ Connected to MongoDB\n");

    // Check if gov official already exists
    let govOfficial = await User.findOne({ email: "gov@test.com" });

    if (govOfficial) {
      console.log(
        "Government official already exists. Deleting and recreating..."
      );
      await User.deleteOne({ email: "gov@test.com" });
    }

    // Create government official
    govOfficial = await User.create({
      name: "Test Government Official",
      email: "gov@test.com",
      password: "password123",
      role: "gov",
      region: "Punjab",
    });

    // Test password
    const testGov = await User.findOne({ email: "gov@test.com" });
    const isMatch = await bcrypt.compare("password123", testGov.password);

    console.log(
      `Password match test: ${isMatch ? "✅ SUCCESS" : "❌ FAILED"}\n`
    );

    if (isMatch) {
      console.log("-----------------------------------");
      console.log("✅ Government official credentials are ready!");
      console.log("Email: gov@test.com");
      console.log("Password: password123");
      console.log("Role: gov");
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

createTestGovOfficial();
