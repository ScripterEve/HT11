import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NavBar from "./components/NavBar";
import ProductsPage from "./pages/ProductsPage";
import RecipesPage from "./pages/RecipesPage";
import HomePage from "./components/HomePage";
import UserPage from "./pages/UserPage";

import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/profile" element={<UserPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;