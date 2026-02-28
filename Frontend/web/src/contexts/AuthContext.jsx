import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

const decodeJwtPayload = (token) => {
  const payload = token.split('.')[1];
  return JSON.parse(atob(payload));
};

const isTokenValid = (token) => {
  try {
    const payload = decodeJwtPayload(token);
    // exp is in seconds, Date.now() is in milliseconds
    return payload.exp && payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      if (isTokenValid(token)) {
        try {
          setUser(decodeJwtPayload(token));
        } catch (e) {
          localStorage.removeItem('token');
        }
      } else {
        // Token expired — clear it
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setUser(decodeJwtPayload(token));
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
