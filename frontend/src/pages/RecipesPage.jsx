import React, { useContext, useEffect, useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import AuthContext from "../context/authContext";
function RecipesPage() {
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      name: "Classic Spaghetti",
      image:
        "https://www.twopeasandtheirpod.com/wp-content/uploads/2023/05/Spaghetti-2224.jpg",
    },
    {
      id: 2,
      name: "Meat Sauce Pasta",
      image:
        "https://www.inspiredtaste.net/wp-content/uploads/2019/03/Spaghetti-with-Meat-Sauce-Recipe-1-1200.jpg",
    },
    {
      id: 3,
      name: "Gourmet Pizza",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz390oyAEG_1pOSe9NIJXD6yIwFIFHNmZW9g&s",
    },
    {
      id: 4,
      name: "Healthy Salad",
      image:
        "https://t3.ftcdn.net/jpg/01/09/75/90/360_F_109759077_SVp62TBuHkSn3UsGW4dBOm9R0ALVetYw.jpg",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { user } = useContext(AuthContext);

  const handleSaveRecipe = async (userId, recipeId) => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:3000/api/recipes/${userId}/save`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ recipeId }),
        }
      );
      if (!res.ok) {
        throw new Error("Failed to save recipe");
      }
      const data = await res.json();
      setIsSaved(true);
      setLoading(false);
      console.log(data);
    } catch (error) {
      setIsSaved(false);
      console.error(error);
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="py-10 px-20 flex flex-col">
      <div className="flex gap-20">
        <h2 className="text-green text-3xl">Recipes</h2>
        <input
          type="text"
          placeholder="Search recipes..."
          className="py-1.5 w-90 px-4 rounded-full border"
        />
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-6 mt-15">
        {recipes.map((recipe) => {
          return (
            <div
              key={recipe.id}
              className="relative group bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <img
                src={recipe.image}
                alt={recipe.name}
                className="object-cover w-full h-56"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold">{recipe.name}</h3>
              </div>
              <button
                onClick={() => handleSaveRecipe(recipe._id, user._id)}
                className="absolute top-3 right-3 bg-white p-3 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                {isSaved ? (
                  <BookmarkCheck className="text-green-600 w-8 h-8" />
                ) : (
                  <Bookmark className="text-gray-600 w-8 h-8" />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecipesPage;
