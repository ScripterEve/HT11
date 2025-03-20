import React, { useState } from 'react';

const Settings = () => {
  const [diseases, setDiseases] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [newDisease, setNewDisease] = useState('');
  const [newAllergy, setNewAllergy] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleAddDisease = () => {
    if (newDisease && !diseases.includes(newDisease)) {
      setDiseases([...diseases, newDisease]);
      setNewDisease('');
    }
  };

  const handleRemoveDisease = (disease) => {
    setDiseases(diseases.filter((d) => d !== disease));
  };

  const handleAddAllergy = () => {
    if (newAllergy && !allergies.includes(newAllergy)) {
      setAllergies([...allergies, newAllergy]);
      setNewAllergy('');
    }
  };

  const handleRemoveAllergy = (allergy) => {
    setAllergies(allergies.filter((a) => a !== allergy));
  };

  const handleUsernameChange = () => {
    if (newUsername) {
      setUsername(newUsername);
      setNewUsername('');
    }
  };

  const handlePasswordChange = () => {
    if (newPassword) {
      setPassword(newPassword);
      setNewPassword('');
    }
  };

  return (
    <div className="bg-[#FBFFE4] min-h-screen px-10 py-8">
      <h1 className="text-5xl font-semibold text-center text-[#3D8D7A] mb-12">Profile Settings</h1>

      <div className="mb-10">
        <h2 className="text-3xl font-semibold text-[#3D8D7A] mb-6">Username</h2>
        <div className="flex items-center mb-6">
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className="border p-4 rounded-md w-80 text-lg text-[#3D8D7A] placeholder-[#B1B1B1] focus:outline-none focus:ring-2 focus:ring-[#3D8D7A] mb-2"
            placeholder="New Username"
          />
          <button
            onClick={handleUsernameChange}
            className="bg-[#3D8D7A] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#317865] transition duration-300 ml-6"
          >
            Change Username
          </button>
        </div>
        <p className="text-lg text-gray-600">Current Username: {username}</p>
      </div>

      <div className="mb-10">
        <h2 className="text-3xl font-semibold text-[#3D8D7A] mb-6">Password</h2>
        <div className="flex items-center mb-6">
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border p-4 rounded-md w-80 text-lg text-[#3D8D7A] placeholder-[#B1B1B1] focus:outline-none focus:ring-2 focus:ring-[#3D8D7A] mb-2"
            placeholder="New Password"
          />
          <button
            onClick={handlePasswordChange}
            className="bg-[#3D8D7A] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#317865] transition duration-300 ml-6"
          >
            Change Password
          </button>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-semibold text-[#3D8D7A] mb-6">Diseases</h2>
        <div className="flex items-center mb-6">
          <input
            type="text"
            value={newDisease}
            onChange={(e) => setNewDisease(e.target.value)}
            className="border p-4 rounded-md w-80 text-lg text-[#3D8D7A] placeholder-[#B1B1B1] focus:outline-none focus:ring-2 focus:ring-[#3D8D7A] mb-2"
            placeholder="Add a new disease"
          />
          <button
            onClick={handleAddDisease}
            className="bg-[#3D8D7A] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#317865] transition duration-300 ml-6"
          >
            Add Disease
          </button>
        </div>
        <ul>
          {diseases.map((disease, index) => (
            <li key={index} className="flex justify-between items-center mb-4 text-lg text-[#3D8D7A]">
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
        <h3 className="text-2xl font-semibold text-[#3D8D7A] mt-8 mb-6">Current Diseases</h3>
        <ul className="list-disc ml-6 text-lg">
          {diseases.length === 0 ? (
            <p>No diseases added yet.</p>
          ) : (
            diseases.map((disease, index) => <li key={index}>{disease}</li>)
          )}
        </ul>
      </div>

      <div>
        <h2 className="text-3xl font-semibold text-[#3D8D7A] mb-6">Allergies</h2>
        <div className="flex items-center mb-6">
          <input
            type="text"
            value={newAllergy}
            onChange={(e) => setNewAllergy(e.target.value)}
            className="border p-4 rounded-md w-80 text-lg text-[#3D8D7A] placeholder-[#B1B1B1] focus:outline-none focus:ring-2 focus:ring-[#3D8D7A] mb-2"
            placeholder="Add a new allergy"
          />
          <button
            onClick={handleAddAllergy}
            className="bg-[#3D8D7A] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#317865] transition duration-300 ml-6"
          >
            Add Allergy
          </button>
        </div>
        <ul>
          {allergies.map((allergy, index) => (
            <li key={index} className="flex justify-between items-center mb-4 text-lg text-[#3D8D7A]">
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
        <h3 className="text-2xl font-semibold text-[#3D8D7A] mt-8 mb-6">Current Allergies</h3>
        <ul className="list-disc ml-6 text-lg">
          {allergies.length === 0 ? (
            <p>No allergies added yet.</p>
          ) : (
            allergies.map((allergy, index) => <li key={index}>{allergy}</li>)
          )}
        </ul>
      </div>
    </div>
  );
};

export default Settings;
