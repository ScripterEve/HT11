import React, { useEffect, useState } from "react";

function RecipesPage() {
  const [recipes, setRecipes] = useState([
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz390oyAEG_1pOSe9NIJXD6yIwFIFHNmZW9g&s",
    "https://t3.ftcdn.net/jpg/01/09/75/90/360_F_109759077_SVp62TBuHkSn3UsGW4dBOm9R0ALVetYw.jpg",
    "https://www.twopeasandtheirpod.com/wp-content/uploads/2023/05/Spaghetti-2224.jpg",
    "https://www.inspiredtaste.net/wp-content/uploads/2019/03/Spaghetti-with-Meat-Sauce-Recipe-1-1200.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDuF0lroJvBw557A6WtMrvJvSttZDCILqjow&s",
  ]);
  const [loading, setLoading] = useState(false);

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
      {/* recipes */}
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] pt-10 gap-6">
        {recipes.map((recipe, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-md cursor-pointer flex items-center justify-center overflow-hidden"
          >
            <img
              src={recipe}
              alt={`Recipe ${index + 1}`}
              className="object-cover w-full h-full"
            />
            <h3>{recipe.product_name}</h3>
            <p>{recipe.brands}</p>
            <img src={recipe.image_url} alt={recipe.product_name} width="100" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipesPage;
