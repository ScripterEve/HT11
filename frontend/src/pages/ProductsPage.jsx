import React, { useState } from "react";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isLoadMoreVisible, setIsLoadMoreVisible] = useState(false);
  const [currentQuery, setCurrentQuery] = useState("");

  const extractProducts = (responseText) => {
    const productBlocks = responseText.split("\n\n");

    return productBlocks
      .map((block) => {
        const lines = block.split("\n").map((line) => line.trim());
        if (lines.length < 2) return null;

        const name = lines[0].replace(/^1:\s*/, "").trim();
        const description = lines[1].replace(/^2:\s*/, "").trim();

        if (name && description) {
          return {
            name,
            description,
          };
        }

        return null;
      })
      .filter((product) => product !== null);
  };

  const handleAiRequest = async (food, append = false) => {
    try {
      if (!append) {
        setCurrentQuery(food);
        setProducts([]);
        setIsLoadMoreVisible(false);
      }
      
      const res = await fetch("http://localhost:3000/api/products/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ food }),
      });
      
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      
      const data = await res.json();
      const extractedProducts = extractProducts(data.answer);
      
      setProducts((prev) => (append ? [...prev, ...extractedProducts] : extractedProducts));
      setIsLoadMoreVisible(extractedProducts.length > 0);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="min-h-screen pt-10 flex flex-col bg-[#FBFFE4] px-4 md:px-20">
      <div className="flex flex-col md:flex-row gap-6 items-center py-10">
        <h2 className="text-3xl md:text-4xl font-bold text-[#3D8D7A] text-center md:text-left">
          Products
        </h2>
        <input
          type="text"
          placeholder="Search products..."
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

      <div className="py-7">
        {products.length === 0 ? (
          <p className="text-center text-lg md:text-xl">No products found.</p>
        ) : (
          <div className="space-y-6">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-[#B3D8A8] shadow-md rounded-md cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between p-6">

                <div className="flex-1">
                  <p className="text-lg md:text-xl font-semibold text-black">
                    {product.name}
                  </p>
                  <p className="text-gray-600 text-sm md:text-base">
                    {product.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      { products && products?.length > 0 &&
      <div className="flex justify-center mt-4 bg-red">
              <button
                className="px-6 py-2 bg-[#3D8D7A] text-white rounded-full font-semibold hover:bg-[#317865] transition-all shadow-md"
                onClick={() => handleAiRequest(currentQuery, true)}
              >
                Load More
              </button>
            </div>
    }
      <div className="bg-[#3D8D7A] text-white text-center py-4 mt-auto w-full">
        <p className="text-sm">&copy; 2025 BetterBites. All rights reserved.</p>
      </div>
    </div>
  );
}

export default ProductsPage;

