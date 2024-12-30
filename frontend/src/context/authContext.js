import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("dark"); // Theme state
  const [userData, setUserData] = useState(null);
  const [navUserData, setNavUserData] = useState({
    profile_img: "",
    name: "",
    email: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize theme from localStorage if present
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);

    // Check for token in localStorage to set authentication status
    const token = localStorage.getItem("token");
    const localhostUser = localStorage.getItem("user");

    if (token && localhostUser) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, []);


  useEffect(() => {
    navFetchProfile()

  }, [isAuthenticated])
  

  const login = (token) => {
    localStorage.setItem("token", token); // Store token in localStorage
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    localStorage.removeItem("user"); // Remove token from localStorage
    setIsAuthenticated(false);
    setNavUserData({ profile_img: "", name: "", email: "" });
    navigate("/login");
  };

  const showNotification = (title, message, type) => {
    Store.addNotification({
      title: title,
      message: message,
      type: type,
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });
  };

  const navFetchProfile = async () => {
    console.log("navbar fetching");

    const token = localStorage.getItem("token");
    if (!token) {
      logout();
      return;
    }

    try {
      const localhostUser = localStorage.getItem("user");
      const response = await fetch(
        `https://adopt-a-love-backend.vercel.app/profile/${localhostUser}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (response.status === 401) {
        logout();
        return;
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch profile data: ${response.statusText}`);
      }

      const data = await response.json();
      setNavUserData({
        profile_img: data?.user?.profile_img,
        name: data?.user?.name,
        email: data?.user?.email,
      });
    } catch (error) {
      console.error("Error fetching profile data:", error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        loading,
        userData,
        setUserData,
        setTheme,
        theme,
        showNotification,
        navUserData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;