import React from "react";
import { Link } from "react-router-dom";

function LoginForm() {
  return (
    <div className="w-80 h-[60%] px-4 py-5 flex flex-col gap-4">
      <h2 className="text-3xl font-bold text-center mb-5">Login</h2>
      <form className="flex flex-col gap-6">
        <div>
          <label className="ml-2 font-semibold">Email</label>
          <input
            className="py-1.5 pl-3 w-full mt-1 bg-transparent rounded-full border-2 focus:outline-none"
            type="email"
            name="email"
          />
        </div>
        <div>
          <label className="ml-2 font-semibold">Password</label>
          <input
            className="py-1.5 pl-3 w-full mt-1 bg-transparent rounded-full border-2 focus:outline-none"
            type="password"
            name="password"
          />
        </div>

        <button
          className="py-2 bg-purple mt-4 transition duration-300 ease-in-out cursor-pointer text-center text-white text-lg font-semibold w-full rounded-full "
          type="submit"
        >
          Login
        </button>
      </form>
      <div className="mt-4">
        <p className="font-light ml-2 mb-1">No account?</p>
        <button className="py-1.5 bg-transparent pl-3 w-full rounded-full border-purple border-2 focus:outline-none cursor-pointer hover:border-vibrant-purple">
          <Link to={"/api/auth/register"}>Sign up</Link>
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
