import express from "express";
import Recipe from "../models/recipeModel.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, description, ingredients, instructions } = req.body;
    const newRecipe = new Recipe({
      name,
      description,
      ingredients,
      instructions,
    });
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const recipes = await Recipe.find({ userId: req.params.userId });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

router.get("/details/:recipeId", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

router.delete("/:recipeId", async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.recipeId);
    res.status(200).json({ message: "Recipe removed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

export default router;
