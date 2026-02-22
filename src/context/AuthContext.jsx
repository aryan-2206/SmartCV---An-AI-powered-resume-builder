// src/context/AuthContext.jsx
// ─────────────────────────────────────────────────────────────
// Single source of truth for auth. Wrap your <App /> with this.
// ─────────────────────────────────────────────────────────────
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

const AuthContext = createContext(null);

const rawUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
const BASE_URL = rawUrl.endsWith("/") ? rawUrl.slice(0, -1) : rawUrl;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // true while we verify the stored token on first load
  const [loading, setLoading] = useState(true);

  // On mount: if there's a token, verify it and hydrate user state
  useEffect(() => {
    const verify = async () => {
      const token = localStorage.getItem("token");
      if (!token) { setLoading(false); return; }

      try {
        const res = await axios.get(`${BASE_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch {
        // Token stale / invalid — clear it
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, []);

  // Call this from your Login / Register page after a successful API response
  const login = useCallback((userData, token) => {
    localStorage.setItem("token", token);
    setUser(userData);
  }, []);

  // Call this on logout
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}