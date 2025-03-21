import React, { useState, useContext } from "react";
import AuthContext from "../context/authContext";

function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
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

  const handleAiRequest = async (food) => {
    try {
      setLoading(true);
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
      setRecipes(extractedRecipes);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching recipes:", error);
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipesPage;
