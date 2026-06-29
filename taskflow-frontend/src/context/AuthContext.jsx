import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const login = async (email, password) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const { data } = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || "Login failed" 
      };
    }
  };

  const register = async (name, email, password) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const { data } = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
      });
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || "Registration failed" 
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userInfo");
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("userInfo", JSON.stringify(userData));
  };

  const updateProfile = async (name, onboarded, profilePhoto) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const { data } = await axios.put(`${API_URL}/auth/profile`, {
        name,
        onboarded,
        profilePhoto
      }, config);
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || "Profile update failed" 
      };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, updateUser, loading, theme, toggleTheme }}>
      {children}
    </AuthContext.Provider>
  );
};
