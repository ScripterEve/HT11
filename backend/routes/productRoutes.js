import express from "express";
import User from "../models/userModel.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/save-product/:productId", authMiddleware, async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.savedProducts.includes(productId)) {
      return res.status(400).json({ message: "Product is already saved" });
    }

    user.savedProducts.push(productId);
    await user.save();

    return res
      .status(200)
      .json({ message: "Product saved successfully", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.delete(
  "/unsave-product/:productId",
  authMiddleware,
  async (req, res) => {
    try {
      const { productId } = req.params;
      const userId = req.user.id;

      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (!user.savedProducts.includes(productId)) {
        return res.status(400).json({ message: "Product is not saved" });
      }

      user.savedProducts.pull(productId);
      await user.save();

      return res
        .status(200)
        .json({ message: "Product unsaved successfully", user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;
