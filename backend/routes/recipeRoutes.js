import express from "express";
import Recipe from "../models/recipeModel.js";
import User from "../models/userModel.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, ingredients, instructions, userId } = req.body;
    const newRecipe = new Recipe({ name, ingredients, instructions });
    await newRecipe.save();

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.savedRecipes.push(newRecipe._id);
    await user.save();

    res
      .status(201)
      .json({ message: "Recipe saved successfully", recipe: newRecipe });
  } catch (error) {
    console.error("Error saving recipe:", error);
    res.status(500).json({ error: "Failed to save recipe" });
  }
});

router.get("/:userId/recipes/saved", async (req, res) => {
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

router.get("/details/recipe/:recipeId", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

router.delete("/unsave/:userId/:recipeId", async (req, res) => {
  try {
    const { userId, recipeId } = req.params;
    console.log("UserID:", userId, "RecipeID:", recipeId);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.savedRecipes.includes(recipeId)) {
      return res.status(400).json({ message: "Recipe not found in saved list" });
    }

    user.savedRecipes = user.savedRecipes.filter(
      (savedRecipeId) => savedRecipeId.toString() !== recipeId
    );

    Recipe.findByIdAndDelete(recipeId);

    await user.save();
    res.status(200).json({ message: "Recipe removed from saved list successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

export default router;