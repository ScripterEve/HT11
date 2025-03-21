import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NavBar from "./components/NavBar.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import RecipesPage from "./pages/RecipesPage.jsx";
import HomePage from "./components/HomePage.jsx";
import UserPage from "./pages/UserPage.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Settings from "./pages/Settings.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <>
      <NavBar />
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />

        {/* <Route element={<ProtectedRoutes />}> */}
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/profile" element={<UserPage />} />
        <Route path="/settings" element={<Settings />} />
        {/* </Route> */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
