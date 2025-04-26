import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import recipeRoute from "./routes/recipeRoute.js";
import productRoute from "./routes/productRoute.js";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

connectDB()
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/auth/", authRoutes);
app.use("/api/users/", userRoutes);
app.use("/api/recipes-save/", recipeRoutes);
app.use("/api/products/", productRoute);
app.use("/api/recipes/", recipeRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
