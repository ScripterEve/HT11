import React from 'react';
// import Products from "./components/Products.jsx";
// import Recipes from "./components/Recipess.jsx";
import { useNavigate } from "react-router-dom";

const HomePage = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* First section taking 90% of the screen height */}
      <div className="h-[79vh] flex items-center justify-center bg-[#FBFFE4] p-16">
        <div className="text-center max-w-2xl">
          <h1 className="text-6xl font-extrabold text-black tracking-wide mb-6">
            BetterBites
          </h1>
          <p className="text-2xl text-gray-800 mb-6">
            Where we make the process of searching for healthy food easier and more pleasing.
          </p>
          <div className="flex justify-center space-x-6">
            <button
              onClick={() => navigate('/products')}
              className="bg-[#3D8D7A] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#317865] transition"
            >
              Go to Products
            </button>
            <button
              onClick={() => navigate('/recipes')}
              className="bg-[#3D8D7A] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#317865] transition"
            >
              Go to Recipes
            </button>
          </div>
        </div>
      </div>

      {/* Blue Background Section with Left-Aligned Text */}
      <div className="bg-[#A3D1C6] p-16 pt-8">
        <h1 className="text-3xl font-bold text-left mb-6">How to get the most out of our site</h1>
        <p className="text-lg text-left">
          1. <strong>Enter Your Health Condition:</strong> Start by entering your specific health condition (e.g., diabetes, high blood pressure, gluten intolerance). This helps the system tailor recommendations to your dietary needs.
          <br /><br />
          2. <strong>Select Your Cravings:</strong> Choose what you feel like eating. You can select specific ingredients, meal types (e.g., breakfast, lunch, dinner), or general food preferences.
          <br /><br />
          3. <strong>Get Product & Recipe Suggestions:</strong> Based on your health condition and cravings, the website will generate a list of recommended products and recipes that fit your dietary requirements.
          <br /><br />
          4. <strong>Save Your Favorites:</strong> If you find products or recipes you like, you can save them for easy access later.
          <br /><br />
          5. <strong>Create Recipe Lists & Calculate Costs:</strong> You can group multiple recipes into lists (e.g., weekly meal plans) and get an estimated total cost based on current product prices.
        </p>
      </div>

      {/* Mini Footer Section */}
      <div className="bg-[#3D8D7A] text-white text-center py-4 mt-auto">
        <p className="text-sm">&copy; 2025 BetterBites. All rights reserved.</p>
      </div>
    </div>
  );
};

export default HomePage;
