import React, { useState, useContext } from "react";
import AuthContext from "../context/authContext";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentQuery, setCurrentQuery] = useState(""); // Add currentQuery state
  const { user } = useContext(AuthContext);

  const extractRecipes = (responseText) => {
    const recipeBlocks = responseText.split("\n\n");
    return recipeBlocks
      .map((block) => {
        const lines = block.split("\n");
        if (lines.length < 3) return null;
        return {
          name: lines[0].trim(),
          ingredients: lines[1]
            .replace("2: ", "")
            .split(", ")
            .map((item) => item.trim()),
          instructions: lines[2].replace("3: ", "").trim(),
        };
      })
      .filter((recipe) => recipe !== null);
  };

  const handleAiRequest = async (food, append = false) => { // Add append parameter
    try {
      setLoading(true);
      if (!append) {
        setCurrentQuery(food);
        setRecipes([]); // Reset recipes when starting a new search
      }
      const res = await fetch("http://localhost:3000/api/recipes/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ food }),
      });
      if (!res.ok) {
        throw new Error("Failed to fetch AI response");
      }

      const data = await res.json();
      const extractedRecipes = extractRecipes(data.answer);
      setRecipes((prev) => (append ? [...prev, ...extractedRecipes] : extractedRecipes)); // Append recipes if needed
      setLoading(false);
    } catch (error) {
      console.error("Error in AI request:", error);
      setLoading(false);
    }
  };

  const handleSave = async (recipe) => {
    try {
      const userId = user._id;
      const res = await fetch("http://localhost:3000/api/recipes-save/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: recipe.name,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          userId: userId,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save recipe");
      }

      const data = await res.json();
      console.log("Recipe saved successfully:", data.recipe);
      alert("Recipe saved successfully!");
    } catch (error) {
      console.error("Error saving recipe:", error);
      alert("Error saving recipe.");
    }
  };

  return (
    <div className="min-h-screen pt-10 flex flex-col bg-[#FBFFE4] px-4 md:px-20">
      <div className="flex flex-col md:flex-row gap-6 items-center py-10">
        <h2 className="text-3xl md:text-4xl font-bold text-[#3D8D7A] text-center md:text-left">
          Recipes
        </h2>
        <input
          type="text"
          placeholder="Search recipes..."
          className="py-2 w-full md:w-96 px-4 rounded-full border shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3D8D7A]"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button
          className="bg-[#3D8D7A] cursor-pointer text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-[#317865] transition-all shadow-md w-full md:w-auto"
          onClick={() => handleAiRequest(searchInput)}
        >
          Search
        </button>
      </div>

      {loading && (
        <div className="text-center text-lg md:text-xl py-6 text-[#3D8D7A]">
          Loading...
        </div>
      )}

      <div className="py-7">
        {recipes.length === 0 ? (
          <p className="text-center text-lg md:text-xl">No recipes found.</p>
        ) : (
          <div className="space-y-6">
            {recipes.map((recipe) => (
              <div
                key={recipe.name}
                className="bg-[#B3D8A8] shadow-md rounded-md cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between p-6"
              >
                <div className="flex-1">
                  <p className="text-lg md:text-xl font-semibold text-black">
                    {recipe.name}
                  </p>
                  <p className="text-gray-600 text-sm md:text-base">
                    Ingredients: {recipe.ingredients.join(", ")}
                  </p>
                  <p className="text-gray-600 text-sm md:text-base mt-3">
                    Instructions: {recipe.instructions}
                  </p>
                </div>
                <button
                  onClick={() => handleSave(recipe)}
                  className="text-[#3D8D7A] mt-4 md:mt-0 flex items-center space-x-2"
                >
                  <BookmarkBorderIcon />
                  <span>Save Recipe</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {recipes && recipes.length > 0 && (
        <div className="flex justify-center mt-4">
          <button
            className="px-6 py-2 bg-[#3D8D7A] text-white rounded-full font-semibold hover:bg-[#317865] transition-all shadow-md"
            onClick={() => handleAiRequest(currentQuery, true)}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default RecipesPage;
