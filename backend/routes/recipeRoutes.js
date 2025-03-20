import express from "express";
import jwt from "jsonwebtoken";
const router = express.Router();
import User from "../models/userModel";
import Recipe from "../models/recipeModel";
import authMiddleware from "../middleware/authMiddleware";

router.post("save-recipe", authMiddleware, async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const recipe = await Recipe.findById(req.body.recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (user.savedRecipes.includes(recipe._id)) {
      return res.status(400).json({ message: "Recipe already saved" });
    }

    user.savedRecipes.push(recipe._id);
    await user.save();

    res.status(200).json({
      message: "Recipe saved successfully",
      savedRecipes: user.savedRecipes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/saved-recipes", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate("savedRecipes");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ savedRecipes: user.savedRecipes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/unsave-recipe/:recipeId", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.savedRecipes = user.savedRecipes.filter(
      (id) => id.toString() !== req.params.recipeId
    );

    await user.save();

    res.status(200).json({ message: "Recipe unsaved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
