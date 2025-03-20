import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-[#B3D8A8] flex justify-between items-center px-4 py-4">
      <div className="text-2xl font-bold ml-5">BetterBites</div>
      <div className="relative flex items-center space-x-4 mr-5" style={{ width: "6rem" }}>
        <PersonIcon fontSize="large" className="hover:text-gray-500"/>
        <MenuIcon 
          fontSize="large" 
          onClick={toggleMenu} 
          className="cursor-pointer hover:text-gray-500 transition-all duration-300" 
        />
        {menuOpen && (
          <div className="absolute top-12 right-0 bg-white shadow-lg rounded-md w-40">
            <ul className="flex flex-col">
              <li className="px-4 py-2 hover:bg-[#a9dace] bg-[#A3D1C6] opacity-80 border-1 border-[#777777] cursor-pointer transition-all duration-300">
                Products
              </li>
              <li className="px-4 py-2 hover:bg-[#a9dace] bg-[#A3D1C6] opacity-80 border-1 border-[#777777] border-t-[#A3D1C6] cursor-pointer transition-all duration-300">
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