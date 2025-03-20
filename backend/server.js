import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());

app.use("/api/auth/", authRoutes);
app.use("/api/users/", userRoutes);
app.use("/api/recipes/", recipeRoutes);
app.use("/api/products/", productRoutes);

app.listen(process.env.PORT, () => {
  connectDB()
    .then(() => {
      console.log("Server started at http://localhost:" + process.env.PORT);
    })
    .catch((error) => {
      console.error("Error connecting to database:", error.message);
    });
});
