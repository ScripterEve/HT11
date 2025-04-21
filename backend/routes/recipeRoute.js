import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import User from '../models/userModel.js';
import { promptRecipe, promptRecipeWithoutDisease, promptRecipeWithoutAllergies, promptRecipeWithoutDiseaseAndAllergies } from "../common/constants.js";
import format from "../common/utils.js";

dotenv.config();

const recipeRouter = express.Router();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

recipeRouter.post('/ask', async (req, res) => {
    const { food } = req.body;

    try {
        let prompt;
        if (User.disease && User.allergies && User.disease?.length > 0 && User.allergies?.length > 0) {
            prompt = format(promptRecipe, User.disease, User.allergies, food);
        } else if (!User.disease || User.disease?.length === 0) {
            prompt = format(promptRecipeWithoutDisease, User.allergies, food);
        } else if (!User.allergies || User.allergies?.length === 0) {
            prompt = format(promptRecipeWithoutAllergies, User.disease, food);
        } else {
            prompt = format(promptRecipeWithoutDiseaseAndAllergies, food);
        }

        console.log("Generated Prompt:", prompt); 

        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-4-turbo",
                messages: [{ role: "user", content: prompt }],
                max_tokens: 2000,
                temperature: 0.7
            },
            { headers: { "Authorization": `Bearer ${OPENAI_API_KEY}`, "Content-Type": "application/json" } }
        );

        console.log("OpenAI Response:", response.data);

        const botResponse = response.data.choices[0].message.content;
        res.json({ answer: botResponse });
    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        res.status(500).json({ error: error.message });
    }
});

export default recipeRouter;
