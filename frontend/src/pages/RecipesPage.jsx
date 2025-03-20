import React, { useState } from "react";

function ProductsPage() {
  const [products, setProducts] = useState([
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

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFFE4]">
      {/* Header Section */}
      <div className="py-16 px-10 flex justify-between items-center">
        <div className="text-left">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-black tracking-wide mb-4">
            Recipes
          </h1>
        </div>

        {/* Search Bar on the right */}
        <input
          type="text"
          placeholder="Search products..."
          className="py-1.5 px-4 rounded-full border w-[40%]"
        />
      </div>

      {/* Product List Section with Navbar Color */}
      <div className="py-10 px-10">
        <div className="space-y-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-[#B3D8A8] shadow-md rounded-md cursor-pointer flex items-center justify-between p-6"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={product.url}
                  alt={`Product ${index + 1}`}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="flex-1">
                  <p className="text-xl font-semibold text-black">{product.title}</p>
                </div>
              </div>
              {/* Add Button for each product */}
              <button className="bg-[#3d8d7a] text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-[#317865] transition">
                Add
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#3D8D7A] text-white text-center py-4 mt-auto">
        <p className="text-sm">&copy; 2025 BetterBites. All rights reserved.</p>
      </div>
    </div>
  );
}

export default ProductsPage;
