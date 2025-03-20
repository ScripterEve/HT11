import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRouter from './routes/productRoute.js'

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());

app.use('/api/products', productRouter)
app.use("/api/auth/", authRoutes);
app.use("/api/users/", userRoutes);

app.listen(process.env.PORT, () => {
  connectDB()
    .then(() => {
      console.log("Server started at http://localhost:" + process.env.PORT);
    })
    .catch((error) => {
      console.error("Error connecting to database:", error.message);
    });
});
