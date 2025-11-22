import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./src/models/User.js"; // relative path, add .js
import dotenv from "dotenv";

dotenv.config();

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  const hash = await bcrypt.hash("admin123", 10);
  await User.create({ username: "admin", password: hash });
  console.log("✅ Admin user created");
  process.exit();
})();
