import React, { createContext, useContext, useState } from "react";

const API_URL =
  import.meta.env.VITE_API_URL;

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Login
  const signIn = async (email, password) => {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");
    setCurrentUser({ id: data.id, name: data.name, email: data.email });
    setToken(data.token);
    localStorage.setItem("user", JSON.stringify({ id: data.id, name: data.name, email: data.email }));
    localStorage.setItem("token", data.token);
    return data;
  };

  // Signup
  const signUp = async (name, email, password) => {
    const res = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Signup failed");
    setCurrentUser({ id: data.id, name: data.name, email: data.email });
    setToken(data.token);
    localStorage.setItem("user", JSON.stringify({ id: data.id, name: data.name, email: data.email }));
    localStorage.setItem("token", data.token);
    return data;
  };

  // Logout
  const signOut = () => {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ currentUser, token, signIn, signUp, signOut, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
