import React, { useState, useContext } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import AuthContext from "../context/authContext";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);

  const toggleOptionsMenu = () => {
    setMenuOpen(!menuOpen);
    if (userMenuOpen) {
      setUserMenuOpen(false);
    }
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
    if (menuOpen) {
      setMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
  };

  return (
    <header className="bg-[#B3D8A8] flex justify-between items-center px-4 py-4">
      <div className="text-2xl font-bold ml-5">BetterBites</div>
      <div
        className="relative flex items-center space-x-4 mr-5"
        style={{ width: "6rem" }}>
        <PersonIcon
          fontSize="large"
          className="cursor-pointer hover:text-gray-500"
          onClick={toggleUserMenu}
        />
        <MenuIcon
          fontSize="large"
          onClick={toggleOptionsMenu}
          className="cursor-pointer hover:text-gray-500 transition-all duration-300"
        />

        {isAuthenticated && userMenuOpen && (
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
                className="px-8 py-4 hover:bg-[#a9dace] bg-[#A3D1C6] opacity-80 border-1 text-center border-[#777777] border-t-[#A3D1C6] cursor-pointer transition-all duration-300">
                Logout
              </li>
            </ul>
          </div>
        )}

        {!isAuthenticated && userMenuOpen && (
          <div className="absolute top-12 right-0 bg-white shadow-lg rounded-md w-40">
            <ul className="flex flex-col transition">
              <li className="px-8 py-4 hover:bg-[#a9dace] bg-[#A3D1C6] opacity-80 border-1 text-center border-[#777777] cursor-pointer transition-all duration-300">
                <a href="/login">Log In</a>
              </li>
              <li className="px-8 py-4 hover:bg-[#a9dace] bg-[#A3D1C6] opacity-80 border-1 text-center border-[#777777] border-t-[#A3D1C6] cursor-pointer transition-all duration-300">
                <a href="/signup">Sign Up</a>
              </li>
            </ul>
          </div>
        )}

        {menuOpen && (
          <div className="absolute top-12 right-0 bg-white shadow-lg rounded-md w-40">
            <ul className="flex flex-col transition">
              <li className="px-8 py-4 hover:bg-[#a9dace] bg-[#A3D1C6] opacity-80 border-1 text-center border-[#777777] cursor-pointer transition-all duration-300">
                Products
              </li>
              <li className="px-8 py-4 hover:bg-[#a9dace] bg-[#A3D1C6] opacity-80 border-1 text-center border-[#777777] border-t-[#A3D1C6] cursor-pointer transition-all duration-300">
                Recipes
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;