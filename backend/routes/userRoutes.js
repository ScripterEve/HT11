import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
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
