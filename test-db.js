import mongoose from "mongoose";

async function testConnection() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error("❌ MONGODB_URI is missing!");
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB successfully!");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
  }
}

testConnection();
