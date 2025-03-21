import React, { useState, useContext } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import AuthContext from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { isAuthenticated, logout, user } = useContext(AuthContext);

  const navigate = useNavigate();

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

    console.log(user);
  };

  const buttonStyle =
    "bg-[#3D8D7A] text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-[#317865] opacity-80 transition m-1";

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);

    const toastOptions = {
      position: "bottom-right",
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "dark",
    };

    toast.success("Successfully logged out.", {
      ...toastOptions,
      style: { backgroundColor: "#4caf50", color: "#fff" }
    });
    navigate("/login");
  };

  const authButtons = [
    {
      text: "Profile",
      onClick: () => navigate("/profile"),
      style: buttonStyle,
    },
    {
      text: "Settings",
      onClick: () => navigate("/settings"),
      style: buttonStyle,
    },
    {
      text: "Logout",
      onClick: handleLogout,
      style: buttonStyle,
    },
  ];

  const guestButtons = [
    {
      text: "Log In",
      onClick: () => navigate("/login"),
      style: buttonStyle,
    },
    {
      text: "Sign Up",
      onClick: () => navigate("/signup"),
      style: buttonStyle,
    },
  ];

  const menuButtons = [
    {
      text: "Products",
      onClick: () => navigate("/products"),
      style: buttonStyle,
    },
    {
      text: "Recipes",
      onClick: () => navigate("/recipes"),
      style: buttonStyle,
    },
  ];

  const renderButtons = (buttons) => {
    return buttons.map((button, index) => (
      <button key={index} className={button.style} onClick={button.onClick}>
        {button.text}
      </button>
    ));
  };

  return (
    <header className="bg-[#B3D8A8] flex justify-between items-center px-4 py-4">
      <div className="text-2xl font-bold ml-5">
        <button
          onClick={() => navigate("/")}
          className="hover:text-gray-400 transition duration-200">
          BetterBites
        </button>
      </div>
      <div className=" flex items-center mr-5">
        <div className="flex w-min mr-2">
          {isAuthenticated && (
            <>
              <span className="font-bold text-black text-2xl mr-2">
                {user.username}
              </span>
              <PersonIcon
                fontSize="large"
                className="cursor-pointer hover:text-gray-500"
                onClick={toggleUserMenu}
              />
            </>
          )}
          {!isAuthenticated && (
            <PersonIcon
              fontSize="large"
              className="cursor-pointer hover:text-gray-500"
              onClick={toggleUserMenu}
            />
          )}
        </div>

        <MenuIcon
          fontSize="large"
          onClick={toggleOptionsMenu}
          className="cursor-pointer hover:text-gray-500 transition-all duration-300"
        />

        {isAuthenticated && userMenuOpen && (
          <div className="absolute top-16 right-0 bg-transparent rounded-md w-40">
            <div className="flex flex-col transition">
              {renderButtons(authButtons)}
            </div>
          </div>
        )}

        {!isAuthenticated && userMenuOpen && (
          <div className="absolute top-16 right-0 bg-transparent rounded-md w-40">
            <div className="flex flex-col transition">
              {renderButtons(guestButtons)}
            </div>
          </div>
        )}

        {menuOpen && (
          <div className="absolute top-16 right-0 bg-transparent rounded-md w-40">
            <div className="flex flex-col transition">
              {renderButtons(menuButtons)}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
