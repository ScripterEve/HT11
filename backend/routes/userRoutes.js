import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import User from "../models/userModel.js";
const router = express.Router();

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id/saved-recipes", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("savedRecipes");
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

router.post(
  "/:id/upload-profile-image",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      const userId = req.params.id;
      const imagePath = `/uploads/profile-images/${req.file.filename}`;

      const user = await User.findByIdAndUpdate(
        userId,
        { profileImageUrl: imagePath },
        { new: true }
      );

      if (!user) return res.status(404).json({ message: "User not found" });

      res.json({ message: "Image uploaded", profileImageUrl: imagePath });
    } catch (err) {
      console.error("Upload error:", err);
      res.status(500).json({ message: "Image upload failed" });
    }
  }
);

export default router;
