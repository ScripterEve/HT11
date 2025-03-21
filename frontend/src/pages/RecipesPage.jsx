import React, { useContext, useState } from "react";
import AuthContext from "../context/authContext";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState({});
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

  const handleAiRequest = async (food, append = false) => {
    try {
      setLoading(true);
      if (!append) {
        setCurrentQuery(food);
        setRecipes([]);
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
      setRecipes((prev) => (append ? [...prev, ...extractedRecipes] : extractedRecipes));
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

      const updatedRecipes = recipes.map((r) =>
        r.name === recipe.name
          ? { ...r, _id: data.recipe._id }
          : r
      );

      setRecipes(updatedRecipes);

      alert("Recipe saved successfully!");
    } catch (error) {
      console.error("Error saving recipe:", error);
      alert("Error saving recipe.");
    }
  };

  const handleUnsave = async (userId, recipe) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/recipes-save/unsave/${userId}/${recipe._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to unsave recipe");
      }

      const data = await res.json();
      alert("Recipe removed from saved list successfully!");

      const updatedSavedRecipes = recipes.filter((r) => r._id !== recipe._id);
    } catch (error) {
      console.error("Error in unsave request:", error);
      alert("Error removing recipe from saved list.");
    }
  };

  const handleButtonClick = (index) => {
    setBookmarkedRecipes((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div className="pt-10 flex flex-col bg-[#FBFFE4] min-h-screen">
      <div className="flex gap-6 items-center py-10 px-20">
        <h2 className="text-4xl font-bold text-[#3D8D7A]">Recipes</h2>
        <input
          type="text"
          placeholder="Search recipes..."
          className="py-2 w-96 px-4 rounded-full border shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3D8D7A]"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button
          className="bg-[#3D8D7A] cursor-pointer text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-[#317865] transition-all shadow-md"
          onClick={() => handleAiRequest(searchInput)}>
          Search
        </button>
      </div>

      {loading && (
        <div className="mt-5 text-lg text-[#3D8D7A] font-semibold px-30">
          Loading...
        </div>
      )}

      <div className="grid grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] gap-6 mt-10 px-20 py-20">
        {recipes.map((recipe, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl p-6 hover:scale-105 transition-transform duration-300 border border-[#3D8D7A] relative">
            <button
              className="absolute top-4 right-4 p-2 cursor-pointer bg-[#3D8D7A] text-white rounded-full hover:bg-[#317865] transition-colors duration-300"
              onClick={() => {
                handleButtonClick(index);
              }}>
              {bookmarkedRecipes[index] ? (
                <BookmarkIcon onClick={() => handleUnsave(user._id, recipe)} />
              ) : (
                <BookmarkBorderIcon onClick={() => handleSave(recipe)} />
              )}
            </button>

            <h3 className="text-2xl font-bold text-[#3D8D7A] overflow-hidden mb-2">
              {recipe.name}
            </h3>
            <p className="font-semibold text-[#317865]">Ingredients:</p>
            <ul className="list-disc pl-5 text-gray-700">
              {recipe.ingredients.map((ingredient, i) => (
                <li key={i}>{ingredient}</li>
              ))}
            </ul>
            <p className="font-semibold text-[#317865] mt-3">Instructions:</p>
            <p className="text-gray-800">{recipe.instructions}</p>
          </div>
        ))}
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