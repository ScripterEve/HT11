import React from "react";
import { Link } from "react-router-dom";
function RegisterForm() {
  return (
    <div className="w-80 h-[60%] px-4 py-5 flex flex-col gap-4">
      <h2 className="text-3xl font-bold text-center mb-5">Sign up</h2>
      <form className="flex flex-col gap-6">
        <div>
          <label className="ml-2 font-semibold">Username</label>
          <input
            className="py-1.5 pl-3 w-full mt-1 rounded-full bg-transparent border-2 focus:outline-none"
            type="text"
            name="username"
          />
        </div>
        <div>
          <label className="ml-2 font-semibold">Email</label>
          <input
            className="py-1.5 pl-3 w-full bg-transparent mt-1 rounded-full border-2 focus:outline-none"
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
          className="py-2 mt-4 border-2 transition duration-300 ease-in-out cursor-pointer text-center  text-lg font-semibold w-full rounded-full "
          type="submit"
        >
          Sign Up
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
