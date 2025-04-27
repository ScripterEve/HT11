import React from "react";
// import Products from "./components/Products.jsx";
// import Recipes from "./components/Recipess.jsx";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-[79vh] flex items-center justify-center bg-[#FBFFE4] p-16">
        <div className="text-center max-w-2xl">
          <h1 className="text-6xl font-extrabold text-black tracking-wide mb-6">
            BetterBites
          </h1>
          <p className="text-2xl text-gray-800 mb-6">
            Where we make the process of searching for healthy food easier and
            more pleasing.
          </p>
          <div className="flex justify-center space-x-6">
            <button
              onClick={() => navigate("/products")}
              className="bg-[#3D8D7A] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#317865] transition"
            >
              Go to Products
            </button>
            <button
              onClick={() => navigate("/recipes")}
              className="bg-[#3D8D7A] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#317865] transition"
            >
              Go to Recipes
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#A3D1C6] p-6 sm:p-16 pt-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-left mb-12">
          How to get the most out of our site
        </h1>
        <div className="flex flex-wrap gap-4 justify-between sm:text-3xl text-center">
          <div className="p-8 w-full sm:w-64 flex flex-col">
            <span className="text-2xl sm:text-3xl font-bold mb-4">
              1. Enter Your Health Condition
            </span>
            <p className="text-lg sm:text-xl leading-relaxed">
              Start by entering your specific health condition. This helps the
              system tailor recommendations to your dietary needs.
            </p>
          </div>
          <div className="p-8 w-full sm:w-64 flex flex-col">
            <span className="text-2xl sm:text-3xl font-bold mb-4">
              2. Select Your Cravings
            </span>
            <p className="text-lg sm:text-xl leading-relaxed">
              Choose what you feel like eating. You can select specific
              ingredients, meal types, or general food preferences.
            </p>
          </div>
          <div className="p-8 w-full sm:w-64 flex flex-col">
            <span className="text-2xl sm:text-3xl font-bold mb-4">
              3. Get Suggestions
            </span>
            <p className="text-lg sm:text-xl leading-relaxed">
              Based on your condition and cravings, the website will generate
              product and recipe suggestions.
            </p>
          </div>
          <div className="p-8 w-full sm:w-64 flex flex-col">
            <span className="text-2xl sm:text-3xl font-bold mb-4">
              4. Save Your Favorites
            </span>
            <p className="text-lg sm:text-xl leading-relaxed">
              If you find something you like, save it for later access with one
              click.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
