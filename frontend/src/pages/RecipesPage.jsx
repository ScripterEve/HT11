import React, { useContext, useEffect, useState } from "react";
import { BookmarkBorder, Bookmark } from "@mui/icons-material";
import AuthContext from "../context/authContext";

function RecipesPage() {
  const { user } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz390oyAEG_1pOSe9NIJXD6yIwFIFHNmZW9g&s",
      title: "Product 1",
    },
    {
      url: "https://t3.ftcdn.net/jpg/01/09/75/90/360_F_109759077_SVp62TBuHkSn3UsGW4dBOm9R0ALVetYw.jpg",
      title: "Product 2",
    },
    {
      url: "https://www.twopeasandtheirpod.com/wp-content/uploads/2023/05/Spaghetti-2224.jpg",
      title: "Product 3",
    },
    {
      url: "https://www.inspiredtaste.net/wp-content/uploads/2019/03/Spaghetti-with-Meat-Sauce-Recipe-1-1200.jpg",
      title: "Product 4",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDuF0lroJvBw557A6WtMrvJvSttZDCILqjow&s",
      title: "Product 5",
    },
  ]);
  const [savedRecipes, setSavedRecipes] = useState(new Set());
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchSavedRecipes = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/recipes/${user._id}/saved`
        );
        if (!res.ok) throw new Error("Failed to fetch saved recipes");

        const data = await res.json();
        setSavedRecipes(new Set(data.map((recipe) => recipe._id)));
      } catch (error) {
        console.error("Error fetching saved recipes:", error);
      }
    };

    fetchSavedRecipes();
  }, [user]);

  const handleSaveRecipe = async (recipeId) => {
    if (!user) {
      console.error("User not logged in");
      return;
    }

    const isAlreadySaved = savedRecipes.has(recipeId);
    const method = isAlreadySaved ? "DELETE" : "POST";
    const endpoint = isAlreadySaved
      ? `http://localhost:3000/api/recipes/${user._id}/unsave`
      : `http://localhost:3000/api/recipes/${user._id}/save`;

    try {
      setLoading(true);

      const res = await fetch(endpoint, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipeId }),
      });

      if (!res.ok) {
        throw new Error(
          `Failed to ${isAlreadySaved ? "unsave" : "save"} recipe`
        );
      }

      setSavedRecipes((prev) => {
        const updated = new Set(prev);
        isAlreadySaved ? updated.delete(recipeId) : updated.add(recipeId);
        return updated;
      });

      setLoading(false);
    } catch (error) {
      console.error("Error saving recipe:", error);
      setLoading(false);
    }
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div className="py-10 px-20 flex flex-col bg-[#FBFFE4] min-h-screen">
      <div className="flex gap-20">
        <h2 className="text-4xl font-bold">Recipes</h2>
        <input
          type="text"
          placeholder="Search recipes..."
          className="py-2 w-96 px-4 rounded-full border shadow-sm"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,_minmax(290px,_1fr))] gap-6 mt-10">
        {filteredRecipes.map((recipe, index) => (
          <div
            key={index}
            className="relative bg-white shadow-md rounded-md overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <img
              src={recipe.url}
              alt={recipe.title}
              className="object-cover w-full h-56 cursor-pointer"
              onClick={() =>
                window.open(`http://localhost:5173/recipes/${recipe.id}`)
              }
            />

            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-3">
              <p className="text-white font-semibold text-2xl">
                {recipe.title}
              </p>
            </div>

            <button
              onClick={() => handleSaveRecipe(recipe.id)}
              className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md transition-opacity duration-300"
            >
              {savedRecipes.has(recipe.id) ? (
                <Bookmark className="text-green-600" fontSize="large" />
              ) : (
                <BookmarkBorder className="text-gray-600" fontSize="large" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipesPage;
