import express from "express";
import Recipe from "../models/recipeModel.js";
import User from "../models/userModel.js";
const router = express.Router();

router.post("/:userId/save", async (req, res) => {
  try {
    const { userId } = req.params;
    const { recipeId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.savedRecipes.includes(recipeId)) {
      return res.status(400).json({ message: "This recipe is already saved!" });
    }

    user.savedRecipes.push(recipeId);
    await user.save();

    res.status(201).json({ message: "Recipe saved successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

router.get("/:userId/saved", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate("savedRecipes");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.savedRecipes);
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

router.delete("/unsave/:recipeId", async (req, res) => {
  try {
    const { userId, recipeId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.savedRecipes = user.savedRecipes.filter(
      (savedRecipeId) => savedRecipeId.toString() !== recipeId
    );
    await user.save();
    res.status(200).json({ message: "Recipe removed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

export default router;
