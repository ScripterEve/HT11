import express from "express";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;

    const newProduct = new Product({ name,description });
    await newProduct.save();

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.savedProducts.push(newProduct._id);
    await user.save();

    res
      .status(201)
      .json({ message: "Product saved successfully", product: newProduct });
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).json({ error: "Failed to save product" });
  }
});

router.get("/:userId/saved/product", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate("savedProducts");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.savedProducts);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

router.get("/details/product/:productId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

router.delete("/unsave/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.savedProducts = user.savedProducts.filter(
      (savedProductId) => savedProductId.toString() !== ProductId
    );
    await user.save();
    res.status(200).json({ message: "Product removed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

export default router;