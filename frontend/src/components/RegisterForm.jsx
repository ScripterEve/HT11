import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      if (!res.ok) {
        console.log("Couldn't register user!");
        setLoading(false);
      }
      setUsername("");
      setEmail("");
      setPassword("");
      setLoading(false);
      alert("Registration successful!");
      navigate("/api/auth/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-80 h-[60%] px-4 py-5 flex flex-col gap-4">
      <h2 className="text-3xl font-bold text-center mb-5">Sign up</h2>
      <form onSubmit={handleRegister} className="flex flex-col gap-6">
        <div>
          <label className="ml-2 font-semibold">Username</label>
          <input
            className="py-1.5 pl-3 w-full mt-1 rounded-full bg-transparent border-2 focus:outline-none"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className="ml-2 font-semibold">Email</label>
          <input
            className="py-1.5 pl-3 w-full bg-transparent mt-1 rounded-full border-2 focus:outline-none"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="ml-2 font-semibold">Password</label>
          <input
            className="py-1.5 pl-3 w-full mt-1 bg-transparent rounded-full border-2 focus:outline-none"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="py-2 bg-light-blue mt-4 border-2 transition duration-300 ease-in-out cursor-pointer text-center  text-lg font-semibold w-full rounded-full "
          type="submit"
        >
          {loading ? "Submitting" : "Sign Up"}
        </button>
      </form>
      <p className="text-center font-light">
        Already have an account?{" "}
        <Link
          className="font-semibold transition duration-300 ease-in-out"
          to={"/login"}
        >
          Login
        </Link>
      </p>
      <Link
        className=" font-semibold transition duration-300 ease-in-out text-center"
        to={"/"}
      >
        Go back Home
      </Link>
    </div>
  );
}

export default RegisterForm;
