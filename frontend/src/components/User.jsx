// import React, { useState, useContext, useEffect } from "react";
// import PersonIcon from "@mui/icons-material/Person";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AuthContext from "../context/authContext";

// const UserPage = () => {
//   const { user } = useContext(AuthContext);
//   console.log(user);
//   const [savedRecipes, setSavedRecipes] = useState([]);
//   useEffect(() => {
//     if (!user) return;

//     const fetchSavedRecipes = async (userId) => {
//       try {
//         const response = await fetch(
//           `http://localhost:3000/api/users/${userId}/saved-recipes`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );
//         if (!response.ok) throw new Error("Failed to fetch saved recipes");

//         const data = await response.json();
//         console.log(data);
//         // setSavedRecipes(data.data);
//       } catch (error) {
//         console.error("Error fetching saved recipes:", error);
//       }
//     };

//     fetchSavedRecipes(user._id);
//   }, [user]);

//   const handleUnsave = async (recipeId) => {
//     try {
//       const res = await fetch(
//         `http://localhost:3000/api/recipes/unsave/${recipeId}`
//       );
//       if (!res.ok) throw new Error("Failed to unsave recipe");
//       const data = await res.json();
//       console.log(`Recipe ${data.recipe._id} unsaved`);
//       const updatedSavedRecipes = data.recipes;
//       setSavedRecipes(updatedSavedRecipes);
//     } catch (error) {
//       console.error("Error in unsave request:", error);
//     }
//   };

//   return (
//     <div className="bg-[#FBFFE4] min-h-screen flex flex-col">
//       <div className="flex flex-col items-center justify-between px-6 py-6">
//         <div className="flex flex-col items-center justify-center mt-20">
//           <div className="bg-gray-300 rounded-full h-30 w-30 flex items-center justify-center">
//             <PersonIcon sx={{ fontSize: 70, color: "#ffffff" }} />
//           </div>
//           <div className="mt-4 text-5xl font-semibold text-center">
//             {user ? user.username : "Guest"}
//           </div>
//         </div>
//       </div>
//       <div className="px-6 mt-10 flex-grow  pb-20">
//         <h2 className="text-4xl font-bold mb-10">Saved Recipes:</h2>
//         {savedRecipes.length > 0 ? (
//           <div className="grid grid-cols-[repeat(auto-fill,_minmax(290px,_1fr))] gap-6">
//             {savedRecipes.map((recipe) => (
//               <div
//                 key={recipe._id}
//                 className="bg-white shadow-md rounded-md cursor-pointer flex items-center justify-center overflow-hidden relative transition-transform transform hover:scale-105 duration-300"
//               >
//                 <img
//                   src={recipe.image}
//                   alt={recipe.title}
//                   className="object-cover w-full h-56"
//                   onClick={() =>
//                     window.open(`http://localhost:5173/recipes/${recipe._id}`)
//                   }
//                 />
//                 <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-3">
//                   <p className="text-white font-semibold text-2xl">
//                     {recipe.title}
//                   </p>
//                 </div>
//                 <button
//                   className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all"
//                   onClick={() => handleUnsave(recipe._id)}
//                 >
//                   <DeleteIcon sx={{ fontSize: 24 }} />
//                 </button>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500 text-lg">No saved recipes yet.</p>
//         )}
//       </div>
//       <div className="bg-[#3D8D7A] text-white text-center py-4 mt-auto">
//         <p className="text-sm">&copy; 2025 BetterBites. All rights reserved.</p>
//       </div>
//     </div>
//   );
// };

// export default UserPage;
import React, { useState, useContext, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import AuthContext from "../context/authContext";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

const UserPage = () => {
  const { user } = useContext(AuthContext);
  const [savedRecipes, setSavedRecipes] = useState([]);

  // Check if user is loaded before making the request
  useEffect(() => {
    if (!user || !user._id) {
      console.log("User data is not available or incomplete.");
      return;
    }

    const fetchSavedRecipes = async (userId) => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/users/${userId}/saved-recipes`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch saved recipes");

        const data = await response.json();
        console.log(data);
        setSavedRecipes(data.savedRecipes || []); 
      } catch (error) {
        console.error("Error fetching saved recipes:", error);
      }
    };

    fetchSavedRecipes(user._id);
  }, [user]); // Only re-run when user object changes

  const handleUnsave = async (userId, recipeId) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/recipes-save/unsave/${userId}/${recipeId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to unsave recipe");
      const data = await res.json();
      console.log(`Recipe ${data.recipe._id} unsaved`);
      const updatedSavedRecipes = data.savedRecipes;
      setSavedRecipes(updatedSavedRecipes);
    } catch (error) {
      console.error("Error in unsave request:", error);
    }
  };

  return (
    <>
      <div className="bg-[#FBFFE4] min-h-screen flex flex-col">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between px-6 md:px-20 py-6 mt-10">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="bg-gray-300 rounded-full h-24 w-24 flex items-center justify-center">
              <PersonIcon sx={{ fontSize: 70, color: "#ffffff" }} />
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold">{user ? user.username : "Guest"}</h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 md:mt-0">
            <div>
              <h2 className="text-2xl font-bold">Diseases</h2>
              <ul className="list-disc pl-6">
                {user?.diseases?.length > 0 ? (
                  user.diseases.map((disease, index) => <li key={index}>{disease}</li>)
                ) : (
                  <li className="text-gray-500">No diseases listed</li>
                )}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Allergies</h2>
              <ul className="list-disc pl-6">
                {user?.allergies?.length > 0 ? (
                  user.allergies.map((allergy, index) => <li key={index}>{allergy}</li>)
                ) : (
                  <li className="text-gray-500">No allergies listed</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 mt-10 flex-grow  pb-20">
        <h2 className="text-4xl font-bold mb-10">Saved Recipes:</h2>
        {savedRecipes.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fill,_minmax(290px,_1fr))] gap-6">
            {savedRecipes.map((recipe, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-2xl p-6 hover:scale-105 transition-transform duration-300 border border-[#3D8D7A] relative"
              >
                <button
                  className="absolute top-4 right-4 p-2 cursor-pointer bg-[#3D8D7A] text-white rounded-full hover:bg-[#317865] transition-colors duration-300"
                  onClick={() => handleUnsave(user._id, recipe._id)}
                >
                  <BookmarkBorderIcon />
                </button>

                <h3 className="text-2xl font-bold text-[#3D8D7A] overflow-hidden mb-2">
                  {recipe.name}
                </h3>
                <p className="font-semibold text-[#317865]">Ingredients:</p>
                <ul className="list-disc pl-5 text-gray-700">
                  {recipe.ingredients.map((ingredient, i) => (
                    <li key={i}>{ingredient}</li>
                  ))}
                </ul>
                <p className="font-semibold text-[#317865] mt-3">
                  Instructions:
                </p>
                <p className="text-gray-800">{recipe.instructions}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-lg">No saved recipes yet.</p>
        )}
      </div>
    </>
  );
};

export default UserPage;
