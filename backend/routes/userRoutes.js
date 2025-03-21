import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/userModel.js";
const router = express.Router();

router.get("/:userId/saved-recipes", authMiddleware, async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate("savedRecipes");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ savedRecipes: user.savedRecipes });
  } catch (error) {
    console.error("Error fetching saved recipes:", error);
    res.status(500).json({ error: "Failed to fetch saved recipes" });
  }
});
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email, password, diseases, allergies } = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, {
      username,
      email,
      password,
      diseases,
      allergies,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
