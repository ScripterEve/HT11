import React, { useState } from "react";

function ProductsPage() {
  const [products, setProducts] = useState([
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
  const [savedProducts, setSavedProducts] = useState(new Set());
  const [searchInput, setSearchInput] = useState("");

  const handleSaveProduct = (productId) => {
    const method = savedProducts.has(productId) ? "DELETE" : "POST";
    const updatedSavedProducts = new Set(savedProducts);
    if (savedProducts.has(productId)) {
      updatedSavedProducts.delete(productId);
    } else {
      updatedSavedProducts.add(productId);
    }

    setSavedProducts(updatedSavedProducts);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFFE4]">
      <div className="py-16 px-10 flex justify-between items-center">
        <div className="text-left">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-black tracking-wide mb-4">
            Products
          </h1>
        </div>

        <input
          type="text"
          placeholder="Search products..."
          className="py-1.5 px-4 rounded-full border w-[40%]"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      <div className="py-10 px-10">
        <div className="space-y-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-[#B3D8A8] shadow-md rounded-md cursor-pointer flex items-center justify-between p-6"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="flex-1">
                  <p className="text-xl font-semibold text-black">
                    {product.name}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleSaveProduct(product.id)}
                className={`${
                  savedProducts.has(product.id)
                    ? "bg-[#B33D3D] hover:bg-[#9A2B2B]"
                    : "bg-[#3d8d7a] hover:bg-[#317865]"
                } text-white px-6 py-3 rounded-md text-lg font-semibold transition`}
              >
                {savedProducts.has(product.id) ? "Remove" : "Add"}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#3D8D7A] text-white text-center py-4 mt-auto">
        <p className="text-sm">&copy; 2025 BetterBites. All rights reserved.</p>
      </div>
    </div>
  );
}

export default ProductsPage;