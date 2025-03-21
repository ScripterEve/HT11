import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedUser.exp < currentTime) {
          console.error("Token has expired");
          setIsAuthenticated(false);
          localStorage.removeItem("token");
        } else {
          setUser(decodedUser);
          fetchUserData(decodedUser.id);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Invalid token", error);
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }

    setLoading(false);
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const res = await fetch(`http://localhost:3000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (!res.ok) throw new Error("Failed to fetch user data");

      const data = await res.json();
      setUser(data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setIsAuthenticated(false);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await res.json();
      if (!data.token) {
        throw new Error("No token received");
      }

      localStorage.setItem("token", data.token);
      const decodedUser = jwtDecode(data.token);
      setUser(decodedUser);
      fetchUserData(decodedUser.id);
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      console.error("Login failed", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setUser(null); // Clear user state
    setIsAuthenticated(false); // Set authenticated state to false
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
