import React, { useState, useContext, useEffect, useRef } from "react";
import AuthContext from "../context/authContext";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { FiUpload, FiEdit2 } from "react-icons/fi";
import { toast } from "react-toastify";

const UserPage = () => {
  const { user } = useContext(AuthContext);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!user || !user._id) return;

    const fetchData = async () => {
      try {
        const userRes = await fetch(
          `http://localhost:3000/api/users/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const userData = await userRes.json();
        if (userData.profileImageUrl) {
          setPreviewImage(`http://localhost:3000${userData.profileImageUrl}`);
        }

        const recipesRes = await fetch(
          `http://localhost:3000/api/users/${user._id}/saved-recipes`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const recipesData = await recipesRes.json();
        setSavedRecipes(recipesData.savedRecipes || []);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [user]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !user || !user._id) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(
        `http://localhost:3000/api/users/${user._id}/upload-profile-image`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();
      if (data.profileImageUrl) {
        setPreviewImage(`http://localhost:3000${data.profileImageUrl}`);
        toast.success("Profile image updated!");
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Failed to upload image");
    }
  };

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

      setSavedRecipes((prev) =>
        prev.filter((recipe) => recipe._id !== recipeId)
      );
      toast.success("Recipe removed!");
    } catch (error) {
      console.error("Unsave error:", error);
      toast.error("Error removing recipe.");
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  return (
    <div className="bg-[#FBFFE4] min-h-screen p-6 md:px-20 flex flex-col">
      <input
        type="file"
        ref={fileInputRef}
        hidden
        accept="image/*"
        onChange={handleImageChange}
      />

      <div className="flex flex-col md:flex-row gap-10 items-center justify-between mt-10">
        <div
          className="relative group cursor-pointer"
          onClick={triggerFileInput}
        >
          {previewImage ? (
            <>
              <img
                src={previewImage}
                alt="Profile"
                className="w-56 h-56 rounded-full object-cover border-2 border-[#3D8D7A] shadow-lg"
              />
              <div className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition">
                <FiEdit2 size={20} className="text-[#3D8D7A]" />
              </div>
            </>
          ) : (
            <div className="w-56 h-56 rounded-full bg-white border-2 border-[#3D8D7A] flex flex-col items-center justify-center text-center px-4 text-[#3D8D7A] hover:shadow-md transition">
              <FiUpload size={35} />
              <span className="text-base font-medium text-black">Upload</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full md:w-auto">
          <div>
            <h2 className="text-2xl font-bold text-[#3D8D7A] mb-2">Diseases</h2>
            <ul className="list-disc pl-5 text-gray-700">
              {user?.diseases?.length ? (
                user.diseases.map((disease, i) => <li key={i}>{disease}</li>)
              ) : (
                <li className="text-gray-500">No diseases listed</li>
              )}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#3D8D7A] mb-2">
              Allergies
            </h2>
            <ul className="list-disc pl-5 text-gray-700">
              {user?.allergies?.length ? (
                user.allergies.map((allergy, i) => <li key={i}>{allergy}</li>)
              ) : (
                <li className="text-gray-500">No allergies listed</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-4xl font-bold mb-8 text-[#3D8D7A]">
          Saved Recipes
        </h2>
        {savedRecipes.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fill,_minmax(290px,_1fr))] gap-8">
            {savedRecipes.map((recipe) => (
              <div
                key={recipe._id}
                className="bg-white border border-[#3D8D7A] p-6 rounded-2xl shadow-md relative hover:shadow-xl transition"
              >
                <button
                  onClick={() => handleUnsave(user._id, recipe._id)}
                  className="absolute top-4 right-4 bg-[#3D8D7A] text-white p-2 rounded-full hover:bg-[#317865]"
                >
                  <BookmarkIcon />
                </button>
                <h3 className="text-xl font-bold text-[#3D8D7A] mb-2">
                  {recipe.name.slice(3)}
                </h3>
                <p className="font-semibold text-[#317865]">Ingredients:</p>
                <ul className="list-disc pl-5 text-gray-800">
                  {recipe.ingredients.map((ing, i) => (
                    <li key={i}>{ing}</li>
                  ))}
                </ul>
                <p className="font-semibold text-[#317865] mt-3">
                  Instructions:
                </p>
                <p className="text-gray-700">{recipe.instructions}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No saved recipes yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserPage;
