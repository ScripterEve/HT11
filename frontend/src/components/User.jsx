import React, { useState, useContext, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import AuthContext from "../context/authContext";

const UserPage = () => {
  const { user } = useContext(AuthContext);

  const [savedRecipes, setSavedRecipes] = useState([
    {
      _id: "1",
      title: "Classic Spaghetti",
      image:
        "https://www.twopeasandtheirpod.com/wp-content/uploads/2023/05/Spaghetti-2224.jpg",
    },
    {
      _id: "2",
      title: "Meat Sauce Pasta",
      image:
        "https://www.inspiredtaste.net/wp-content/uploads/2019/03/Spaghetti-with-Meat-Sauce-Recipe-1-1200.jpg",
    },
    {
      _id: "3",
      title: "Gourmet Pizza",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz390oyAEG_1pOSe9NIJXD6yIwFIFHNmZW9g&s",
    },
    {
      _id: "4",
      title: "Healthy Salad",
      image:
        "https://t3.ftcdn.net/jpg/01/09/75/90/360_F_109759077_SVp62TBuHkSn3UsGW4dBOm9R0ALVetYw.jpg",
    },
  ]);

  useEffect(() => {
    if (!user) return;

    const fetchSavedRecipes = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/recipes/${user._id}/saved`
        );
        if (!response.ok) throw new Error("Failed to fetch saved recipes");

        const data = await response.json();
        setSavedRecipes(data.data);
      } catch (error) {
        console.error("Error fetching saved recipes:", error);
      }
    };

    fetchSavedRecipes();
  }, [user]);

  const handleUnsave = async (recipeId) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/recipes/unsave/${recipeId}`
      );
      if (!res.ok) throw new Error("Failed to unsave recipe");
      const data = await res.json();
      console.log(`Recipe ${data.recipe._id} unsaved`);
      const updatedSavedRecipes = data.recipes;
      setSavedRecipes(updatedSavedRecipes);
    } catch (error) {
      console.error("Error in unsave request:", error);
    }
  };

  return (
    <div className="bg-[#FBFFE4] min-h-screen flex flex-col">
      <div className="flex flex-col items-center justify-between px-6 py-6">
        <div className="flex flex-col items-center justify-center mt-20">
          <div className="bg-gray-300 rounded-full h-30 w-30 flex items-center justify-center">
            <PersonIcon sx={{ fontSize: 70, color: "#ffffff" }} />
          </div>
          <div className="mt-4 text-5xl font-semibold text-center">
            {user ? user.username : "Guest"}
          </div>
        </div>
      </div>
      <div className="px-6 mt-10 flex-grow">
        <h2 className="text-4xl font-bold mb-10">Saved Recipes:</h2>
        {savedRecipes.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fill,_minmax(290px,_1fr))] gap-6">
            {savedRecipes.map((recipe) => (
              <div
                key={recipe._id}
                className="bg-white shadow-md rounded-md cursor-pointer flex items-center justify-center overflow-hidden relative transition-transform transform hover:scale-105 duration-300"
              >
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="object-cover w-full h-56"
                  onClick={() =>
                    window.open(`http://localhost:5173/recipes/${recipe._id}`)
                  }
                />
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-3">
                  <p className="text-white font-semibold text-2xl">
                    {recipe.title}
                  </p>
                </div>
                <button
                  className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all"
                  onClick={() => handleUnsave(recipe._id)}
                >
                  <DeleteIcon sx={{ fontSize: 24 }} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-lg">No saved recipes yet.</p>
        )}
      </div>
      <div className="bg-[#3D8D7A] text-white text-center py-4 mt-auto">
        <p className="text-sm">&copy; 2025 BetterBites. All rights reserved.</p>
      </div>
    </div>
  );
};

export default UserPage;
