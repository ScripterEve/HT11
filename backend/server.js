import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import recipeRoute from "./routes/recipeRoute.js";
import productRoute from "./routes/productRoute.js";

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB()
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  });

// API Routes
app.use("/api/auth/", authRoutes);
app.use("/api/users/", userRoutes);
app.use("/api/recipes/", recipeRoute);
app.use("/api/products/", productRoute);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
