import React, { useState } from "react";

function ProductsPage() {
  const [products, setProducts] = useState([
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz390oyAEG_1pOSe9NIJXD6yIwFIFHNmZW9g&s",
    "https://t3.ftcdn.net/jpg/01/09/75/90/360_F_109759077_SVp62TBuHkSn3UsGW4dBOm9R0ALVetYw.jpg",
    "https://www.twopeasandtheirpod.com/wp-content/uploads/2023/05/Spaghetti-2224.jpg",
    "https://www.inspiredtaste.net/wp-content/uploads/2019/03/Spaghetti-with-Meat-Sauce-Recipe-1-1200.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDuF0lroJvBw557A6WtMrvJvSttZDCILqjow&s",
  ]);

  return (
    <div className="py-10 px-20 flex flex-col">
      <div className="flex gap-20">
        <h2 className="text-green text-3xl">Products</h2>
        <input
          type="text"
          placeholder="Search products..."
          className="py-1.5 w-90 px-4 rounded-full border"
        />
      </div>
      {/* recipes */}
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-md cursor-pointer flex items-center justify-center overflow-hidden relative"
          >
            <img
              src={product.url}
              alt={`Recipe ${index + 1}`}
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black to-transparent p-5">
              <p className="text-white font-semibold text-2xl">
                {product.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
