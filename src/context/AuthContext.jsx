import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('leviathan_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email, password) => {
    const userData = await loginUser(email, password);
    if (userData && !userData.error) {
      setUser(userData);
      localStorage.setItem('leviathan_user', JSON.stringify(userData));
      return { success: true, user: userData };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('leviathan_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
