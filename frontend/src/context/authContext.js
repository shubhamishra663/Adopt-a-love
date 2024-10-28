import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [value, setValue] = useState(1);

  const [userData,setUserData]=useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    alert(`getting token ${token}`);
    if (token) {
      setIsAuthenticated(true);
      // navigate('/profile');
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, [navigate]);

  const login = (token) => {
    Cookies.set('token', token, { expires: 3 });
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading, value ,userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
