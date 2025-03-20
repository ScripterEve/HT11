import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/authContext";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      setLoading(false);
      const token = localStorage.getItem("token");
      if (token) {
        alert("Login successful!");
        navigate("/");
      } else {
        alert("Login failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="w-80 h-[60%] px-4 py-5 flex flex-col gap-4">
      <h2 className="text-3xl font-bold text-center mb-5">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-6">
        <div>
          <label className="ml-2 font-semibold">Email</label>
          <input
            className="py-1.5 pl-3 w-full mt-1 bg-transparent rounded-full border-2 focus:outline-none"
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
          className="py-2 mt-4 transition duration-300 ease-in-out cursor-pointer text-center border-2 text-lg font-semibold w-full rounded-full "
          type="submit"
        >
          {loading ? "Submitting" : "Login"}
        </button>
      </form>
      <div className="mt-4">
        <p className="font-light ml-2 mb-1">No account?</p>
        <button className="py-1.5 bg-transparent pl-3 w-full rounded-full border-2 focus:outline-none cursor-pointer hover:border-vibrant-purple">
          <Link to={"/signup"}>Sign up</Link>
        </button>
      </div>

      <Link
        className="font-semibold transition duration-300 ease-in-out text-center"
        to={"/"}
      >
        Go back Home
      </Link>
    </div>
  );
}

export default LoginForm;
