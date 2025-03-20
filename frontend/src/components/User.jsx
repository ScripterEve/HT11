import React, { useState, useContext } from "react";
import PersonIcon from "@mui/icons-material/Person";
import AuthContext from "../context/authContext";

const UserPage = () => {
  const [recipes, setRecipes] = useState([
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz390oyAEG_1pOSe9NIJXD6yIwFIFHNmZW9g&s",
      title: "Spaghetti",
    },
    {
      url: "https://t3.ftcdn.net/jpg/01/09/75/90/360_F_109759077_SVp62TBuHkSn3UsGW4dBOm9R0ALVetYw.jpg",
      title: "Pasta",
    },
    {
      url: "https://www.twopeasandtheirpod.com/wp-content/uploads/2023/05/Spaghetti-2224.jpg",
      title: "Fetucchini",
    },
    {
      url: "https://www.inspiredtaste.net/wp-content/uploads/2019/03/Spaghetti-with-Meat-Sauce-Recipe-1-1200.jpg",
      title: "Italy",
    },
    {
      url: "https://www.inspiredtaste.net/wp-content/uploads/2019/03/Spaghetti-with-Meat-Sauce-Recipe-1-1200.jpg",
      title: "Italy",
    },
  ]);

  const { user } = useContext(AuthContext);

  return (
    <div className="bg-[#F5F8F3] min-h-screen">
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
      <div className="px-6 mt-25">
        <h2 className="text-4xl font-bold mb-10">Saved recipes:</h2>
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(290px,_1fr))] gap-6">
          {recipes.map((recipe, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-md cursor-pointer flex items-center justify-center overflow-hidden relative transition-transform transform hover:scale-110 duration-350">
              <img
                src={recipe.url}
                alt={`Recipe ${index + 1}`}
                className="object-cover w-full h-full"
                onClick={() =>
                  window.open(`http://localhost:5173/recipes/${recipe.id}`)
                }
              />
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-5">
                <p className="text-white font-semibold text-2xl">
                  {recipe.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPage;