import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NavBar from "./components/NavBar.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import RecipesPage from "./pages/RecipesPage.jsx";
import HomePage from "./components/HomePage.jsx";
import UserPage from "./pages/UserPage.jsx";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </>
  );
}

export default App;
