import express from 'express'
import axios from 'axios'
import dotenv from 'dotenv'
import User from '../models/userModel.js'
import { promptProduct, promptWithoutDisease, promptWithoutAllergies, promptWithoutDiseaseAndAllergies } from "../common/constants.js";
import  format  from "../common/utils.js";

dotenv.config()

const productRouter = express.Router()
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;



productRouter.post('/ask', async (req, res) => {
    const { food } = req.body;

    try {
        let prompt;
        if (User.disease && User.allergies && User.disease?.length > 0 && User.allergies?.length > 0) {
            prompt = format(promptProduct, User.disease, User.allergies, food);
        } else if (!User.disease && User.disease?.length <= 0) {
            prompt = format(promptWithoutDisease.disease, User.allergies, food);
        }
        else if (!User.allergies && User.allergies?.length <= 0) {
            prompt = format(promptWithoutAllergies, User.disease, food);
        }
        else {
            prompt = format(promptWithoutDiseaseAndAllergies, food);
        }

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [{ parts: [{ text: prompt }] }]
            },
            { headers: { "Content-Type": "application/json" } }
        );

        const botResponse = response.data.candidates[0].content.parts[0].text;
        res.json({ answer: botResponse });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

export default productRouter;

