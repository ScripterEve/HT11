import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  food: String,
  ingredients: [String],
  steps: String,
  liked: { type: Boolean, default: false }, // favourited state
  createdAt: { type: Date, default: Date.now }
});

const Recipe = mongoose.model("Recipe", recipeSchema);
export default Recipe;
