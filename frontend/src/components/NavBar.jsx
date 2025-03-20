import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleOptionsMenu = () => {
    setMenuOpen(!menuOpen);
    if (userMenuOpen) {
      setUserMenuOpen(!userMenuOpen);
    }
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
    if (menuOpen) {
      setMenuOpen(!menuOpen);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <header className="bg-[#B3D8A8] flex justify-between items-center px-4 py-4">
      <div className="text-2xl font-bold ml-5">BetterBites</div>
      <div
        className="relative flex items-center space-x-4 mr-5"
        style={{ width: "6rem" }}
      >
        <PersonIcon fontSize="large" className="hover:text-gray-500" />
        <MenuIcon
          fontSize="large"
          onClick={toggleUserMenu}
          className="cursor-pointer hover:text-gray-500 transition-all duration-300"
        />
        <MenuIcon
          fontSize="large"
          onClick={toggleOptionsMenu}
          className="cursor-pointer hover:text-gray-500 transition-all duration-300"
        />

        {isLoggedIn && userMenuOpen && (
          <div className="absolute top-12 right-0 bg-white shadow-lg rounded-md w-40">
            <ul className="flex flex-col transition">
              <li className="px-8 py-4 hover:bg-[#a9dace] bg-[#A3D1C6] opacity-80 border-1 text-center border-[#777777] cursor-pointer transition-all duration-300">
                Profile
              </li>
              <li className="px-8 py-4 hover:bg-[#a9dace] bg-[#A3D1C6] opacity-80 border-1 text-center border-[#777777] border-t-[#A3D1C6] cursor-pointer transition-all duration-300">
                Settings
              </li>
              <li
                onClick={handleLogout}
                className="px-8 py-4 hover:bg-[#a9dace] bg-[#A3D1C6] opacity-80 border-1 text-center border-[#777777] border-t-[#A3D1C6] cursor-pointer transition-all duration-300"
              >
                Logout
              </li>
            </ul>
          </div>
        )}

        {!isLoggedIn && userMenuOpen && (
          <div className="absolute top-12 right-0 bg-white shadow-lg rounded-md w-40">
            <ul className="flex flex-col transition">
              <li
                onClick={handleLogin}
                className="px-8 py-4 hover:bg-[#a9dace] bg-[#A3D1C6] opacity-80 border-1 text-center border-[#777777] cursor-pointer transition-all duration-300"
              >
                Log In
              </li>
              <li className="px-8 py-4 hover:bg-[#a9dace] bg-[#A3D1C6] opacity-80 border-1 text-center border-[#777777] border-t-[#A3D1C6] cursor-pointer transition-all duration-300">
                Sign Up
              </li>
            </ul>
          </div>
        )}

        {menuOpen && (
          <div className="absolute top-12 right-0 bg-white shadow-lg rounded-md w-40">
            <ul className="flex flex-col">
              <Link
                to={"/products"}
                className="px-4 py-2 hover:bg-[#a9dace] bg-[#A3D1C6] opacity-80 border-1 border-[#777777] cursor-pointer transition-all duration-300"
              >
                Products
              </Link>
              <Link
                to={"/recipes"}
                className="px-4 py-2 hover:bg-[#a9dace] bg-[#A3D1C6] opacity-80 border-1 border-[#777777] border-t-[#A3D1C6] cursor-pointer transition-all duration-300"
              >
                Recipes
              </Link>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
