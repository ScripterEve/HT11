import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/authContext";

const Settings = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [newDisease, setNewDisease] = useState("");
  const [newAllergy, setNewAllergy] = useState("");
  const [diseases, setDiseases] = useState(user?.diseases || []);
  const [allergies, setAllergies] = useState(user?.allergies || []);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setUsername(user?.username || "");
    setEmail(user?.email || "");
    setDiseases(user?.diseases || []);
    setAllergies(user?.allergies || []);
  }, [user]);

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ username, email, diseases, allergies }),
      });
      if (!res.ok) throw new Error("Failed to update profile");
      setMessage("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Please try again.");
    }
  };

  if (!user) return <div className="text-center text-lg">Loading...</div>;

  return (
    <div className="bg-[#FBFFE4] min-h-screen flex flex-col items-center px-4 pt-10">
      <h1 className="text-5xl font-semibold text-[#3D8D7A] mb-12 text-center">Profile Settings</h1>
      {message && <p className={`text-center ${message.includes("successfully") ? "text-green-600" : "text-red-600"}`}>{message}</p>}
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl flex-grow">
        <div className="w-full md:w-1/2 p-6 md:p-8">
          <h2 className="text-3xl font-semibold text-[#3D8D7A] mb-6">Profile Information</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-4 border rounded-lg text-lg mb-4"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 border rounded-lg text-lg mb-4"
          />
          <button
            onClick={handleUpdate}
            className="w-full bg-[#3D8D7A] text-white py-3 rounded-lg text-lg font-semibold hover:bg-[#317865] transition duration-300"
          >
            Update Profile
          </button>
        </div>
        <div className="w-full md:w-1/2 p-6 md:p-8">
          <h2 className="text-3xl font-semibold text-[#3D8D7A] mb-6">Health Information</h2>
          <div className="mb-6">
            <input
              type="text"
              placeholder="Add Disease"
              value={newDisease}
              onChange={(e) => setNewDisease(e.target.value)}
              className="w-full p-4 border rounded-lg text-lg mb-2"
            />
            <button
              onClick={() => setDiseases([...diseases, newDisease])}
              className="w-full bg-[#3D8D7A] text-white py-3 rounded-lg text-lg font-semibold hover:bg-[#317865] transition duration-300"
            >
              Add Disease
            </button>
            <ul className="mt-4">
              {diseases.map((disease, index) => (
                <li key={index} className="flex justify-between items-center border-b py-2">
                  {disease}
                  <button
                    onClick={() => setDiseases(diseases.filter(d => d !== disease))}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <input
              type="text"
              placeholder="Add Allergy"
              value={newAllergy}
              onChange={(e) => setNewAllergy(e.target.value)}
              className="w-full p-4 border rounded-lg text-lg mb-2"
            />
            <button
              onClick={() => setAllergies([...allergies, newAllergy])}
              className="w-full bg-[#3D8D7A] text-white py-3 rounded-lg text-lg font-semibold hover:bg-[#317865] transition duration-300"
            >
              Add Allergy
            </button>
            <ul className="mt-4">
              {allergies.map((allergy, index) => (
                <li key={index} className="flex justify-between items-center border-b py-2">
                  {allergy}
                  <button
                    onClick={() => setAllergies(allergies.filter(a => a !== allergy))}
                    className="text-red-500 hover:text-red-700"
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
  );
};

export default Settings;
