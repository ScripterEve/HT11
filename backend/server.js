
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './config/db.js'

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());
app.use("/api/auth/", authRoutes);
app.listen(process.env.PORT, () => {
    connectDB().then(() => {
        console.log('Server started at http://localhost:' + process.env.PORT);
    }).catch((error) => {
        console.error('Error connecting to database:', error.message);
    });
});

