import express from 'express'
import mongoose from 'mongoose'
import axios from 'axios'
import dotenv from 'dotenv'
import { User } from '../models/Users.js'
import { prompProduct} from "../common/constants";

dotenv.config()

const productRouter = express.Router()
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

productRouter.post('/ask', async (req, res) => {
    const { food } = req.body;

    try {
        const prompt = format(promptProduct, [User.])
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [{ parts: [{ text:  }] }]
            },
            { headers: { "Content-Type": "application/json" } }
        );

        const botResponse = response.data.candidates[0].content.parts[0].text;
        res.json({ answer: botResponse });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

export default productRouter;

