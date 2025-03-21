import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/authContext"; // Importing context for user data

const Settings = () => {
  const { user, updateUser } = useContext(AuthContext); // Assuming the updateUser function exists in context
  const [username, setUsername] = useState(user?.username || ""); // Default to empty string if user.username is undefined
  const [email, setEmail] = useState(user?.email || ""); // Default to empty string if user.email is undefined
  const [newDisease, setNewDisease] = useState("");
  const [newAllergy, setNewAllergy] = useState("");
  const [diseases, setDiseases] = useState(user?.diseases || []); // Default to empty array if user.diseases is undefined
  const [allergies, setAllergies] = useState(user?.allergies || []); // Default to empty array if user.allergies is undefined
  const [message, setMessage] = useState(""); // To display success or error messages

  useEffect(() => {
    console.log(user);
    setUsername(user?.username || "");
    setEmail(user?.email || "");
    setDiseases(user?.diseases || []);
    setAllergies(user?.allergies || []);
  }, [user]); // Run this effect when `user` changes

  // Handle adding disease
  const handleAddDisease = () => {
    if (newDisease && !diseases.includes(newDisease)) {
      setDiseases([...diseases, newDisease]);
      setNewDisease(""); // Clear input after adding
    }
  };

  // Handle adding allergy
  const handleAddAllergy = () => {
    if (newAllergy && !allergies.includes(newAllergy)) {
      setAllergies([...allergies, newAllergy]);
      setNewAllergy(""); // Clear input after adding
    }
  };

  // Handle disease removal
  const handleRemoveDisease = (disease) => {
    setDiseases(diseases.filter((d) => d !== disease)); // Remove disease from list
  };

  // Handle allergy removal
  const handleRemoveAllergy = (allergy) => {
    setAllergies(allergies.filter((a) => a !== allergy)); // Remove allergy from list
  };

  // Handle updating the user profile
  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          username,
          email,
          diseases,
          allergies,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to update user profile");
      }
      setMessage("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Please try again.");
    }
  };

  // Display loading or a fallback UI if user is not yet loaded
  if (!user) {
    return <div>Loading...</div>; // Show loading message if user is not yet available
  }

  return (
    <div className="bg-[#FBFFE4] min-h-screen px-10 py-8">
      <h1 className="text-5xl font-semibold text-center text-[#3D8D7A] mb-12">
        Profile Settings
      </h1>

      {message && (
        <div
          className={`${
            message.includes("Successfully") ? "text-green-600" : "text-red-600"
          } text-center mb-6`}
        >
          {message}
        </div>
      )}

      <div className="flex justify-center gap-30">
        <div className="flex flex-col w-[30%]">
          {/* Username Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-10">
            <h2 className="text-3xl font-semibold text-[#3D8D7A] mb-6">
              Username
            </h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border p-4 rounded-lg text-lg text-[#3D8D7A] placeholder-[#B1B1B1] focus:outline-none focus:ring-2 focus:ring-[#3D8D7A] transition duration-300 mb-4"
                placeholder="New Username"
              />
            </div>
          </div>

          {/* Email Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-10">
            <h2 className="text-3xl font-semibold text-[#3D8D7A] mb-6">
              Email
            </h2>
            <div className="flex flex-col gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-4 rounded-lg text-lg text-[#3D8D7A] placeholder-[#B1B1B1] focus:outline-none focus:ring-2 focus:ring-[#3D8D7A] transition duration-300 mb-4"
                placeholder="New Email"
              />
            </div>
          </div>
          <button
            onClick={handleUpdate}
            className="bg-[#3D8D7A] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#317865] transition duration-300"
          >
            Update Profile
          </button>
        </div>

        <div className="flex flex-col w-[30%]">
          {/* Diseases Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-12">
            <h2 className="text-3xl font-semibold text-[#3D8D7A] mb-6">
              Diseases
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  value={newDisease}
                  onChange={(e) => setNewDisease(e.target.value)}
                  className="border p-4 rounded-lg w-full text-lg text-[#3D8D7A] placeholder-[#B1B1B1] focus:outline-none focus:ring-2 focus:ring-[#3D8D7A] transition duration-300 mb-2"
                  placeholder="Add a new disease"
                />
                <button
                  onClick={handleAddDisease}
                  className="bg-[#3D8D7A] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#317865] transition duration-300"
                >
                  Add Disease
                </button>
              </div>
              <ul className="space-y-4">
                {diseases.map((disease, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center text-lg text-[#3D8D7A]"
                  >
                    <span>{disease}</span>
                    <button
                      onClick={() => handleRemoveDisease(disease)}
                      className="text-red-500 text-sm hover:text-red-700 transition duration-200"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Allergies Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-12">
            <h2 className="text-3xl font-semibold text-[#3D8D7A] mb-6">
              Allergies
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  value={newAllergy}
                  onChange={(e) => setNewAllergy(e.target.value)}
                  className="border p-4 rounded-lg w-full text-lg text-[#3D8D7A] placeholder-[#B1B1B1] focus:outline-none focus:ring-2 focus:ring-[#3D8D7A] transition duration-300 mb-2"
                  placeholder="Add a new allergy"
                />
                <button
                  onClick={handleAddAllergy}
                  className="bg-[#3D8D7A] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#317865] transition duration-300"
                >
                  Add Allergy
                </button>
              </div>
              <ul className="space-y-4">
                {allergies.map((allergy, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center text-lg text-[#3D8D7A]"
                  >
                    <span>{allergy}</span>
                    <button
                      onClick={() => handleRemoveAllergy(allergy)}
                      className="text-red-500 text-sm hover:text-red-700 transition duration-200"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
