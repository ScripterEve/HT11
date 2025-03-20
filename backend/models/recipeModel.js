import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  products: { type: [String] },
  imageUrl: { type: String },
});

export default mongoose.model("Recipe", recipeSchema);
