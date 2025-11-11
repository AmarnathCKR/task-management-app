import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User";

const MONGO = process.env.MONGO_URI || "mongodb://localhost:27017/task-manager";

const run = async () => {
  await mongoose.connect(MONGO);
  const email = "admin@example.com";
  const existing = await User.findOne({ email });
  if (existing) {
    console.log("Admin already exists");
    process.exit(0);
  }
  const hashed = await bcrypt.hash("AdminPass123", 10);
  const admin = new User({ name: "Admin", email, password: hashed, role: "admin" });
  await admin.save();
  console.log("Admin created:", email);
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
