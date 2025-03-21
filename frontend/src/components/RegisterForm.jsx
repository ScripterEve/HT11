import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [diseases, setDiseases] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const toastOptions = {
      position: "bottom-right",
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "dark",
    };

    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          diseases,
          allergies,
        }),
      });
      if (!res.ok) {
        toast.error("Couldn't sign up.", {
          ...toastOptions,
          style: { backgroundColor: "#f44336", color: "#fff" }
        });
        setLoading(false);
      }
      setUsername("");
      setEmail("");
      setPassword("");
      setLoading(false);
      toast.success("Successfully signed up!", {
        ...toastOptions,
        style: { backgroundColor: "#4caf50", color: "#fff" }
      });
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addDiseaseField = () => setDiseases([...diseases, ""]);
  const addAllergyField = () => setAllergies([...allergies, ""]);

  return (
    <div className="min-h-screen flex flex-col w-full">
      <div className="w-80 px-4 py-5 flex flex-col gap-4 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-3">Sign up</h2>
        <form onSubmit={handleRegister} className="flex flex-col gap-3.5">
          <div>
            <label className="ml-2 font-semibold">Username</label>
            <input
              className="py-1.5 pl-3 w-full mt-1 rounded-lg bg-transparent border-2 focus:outline-none"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="ml-2 font-semibold">Email</label>
            <input
              className="py-1.5 pl-3 w-full bg-transparent mt-1 rounded-lg border-2 focus:outline-none"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="ml-2 font-semibold">Password</label>
            <input
              className="py-1.5 pl-3 w-full mt-1 bg-transparent rounded-lg border-2 focus:outline-none"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="ml-2 font-semibold">Diseases</label>
            {diseases.map((disease, index) => (
              <input
                key={index}
                className="py-1.5 pl-3 w-full mt-1 rounded-lg border-2 focus:outline-none"
                type="text"
                value={disease}
                onChange={(e) => {
                  const newDiseases = [...diseases];
                  newDiseases[index] = e.target.value;
                  setDiseases(newDiseases);
                }}
              />
            ))}
            <button
              type="button"
              className="bg-light-green mt-1 border transition duration-300 ease-in-out cursor-pointer text-center rounded-lg px-1.5 py-0.2"
              onClick={addDiseaseField}
            >
              + Add Disease
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <label className="ml-2 font-semibold">Allergies</label>
            {allergies.map((allergy, index) => (
              <input
                key={index}
                className="py-1.5 pl-3 w-full mt-1 rounded-lg border-2 focus:outline-none"
                type="text"
                value={allergy}
                onChange={(e) => {
                  const newAllergies = [...allergies];
                  newAllergies[index] = e.target.value;
                  setAllergies(newAllergies);
                }}
              />
            ))}
            <button
              type="button"
              className="bg-light-green mt-1 border transition duration-300 ease-in-out cursor-pointer text-center rounded-lg px-1.5 py-0.2"
              onClick={addAllergyField}
            >
              + Add Allergy
            </button>
          </div>

          <button
            className="py-2 bg-light-blue mt-4 border-2 transition duration-300 ease-in-out cursor-pointer text-center text-lg font-semibold w-full rounded-lg"
            type="submit"
          >
            {loading ? "Submitting" : "Sign Up"}
          </button>
        </form>
        <p className="text-center font-light">
          Already have an account?{" "}
          <Link
            className="font-semibold transition duration-300 ease-in-out"
            to={"/login"}>
            Login
          </Link>
        </p>
        <Link
          className="font-semibold transition duration-300 ease-in-out text-center"
          to={"/"}>
          Go back Home
        </Link>
      </div>
      <div className="bg-[#3D8D7A] text-white text-center py-4 mt-auto w-full">
        <p className="text-sm">&copy; 2025 BetterBites. All rights reserved.</p>
      </div>
    </div>
  );
}

export default RegisterForm;