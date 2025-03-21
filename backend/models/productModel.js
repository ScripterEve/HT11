import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: String,
  description: String,
  liked: { type: Boolean, default: false }, //favourited state
});

const Product = mongoose.model("Product", productSchema);
export default Product;

