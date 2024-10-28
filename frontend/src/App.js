import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Home from './components/Home';
import Pets from './components/Pets';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider, { AuthContext } from './context/authContext';
import { useContext } from 'react';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

// Separate App content for handling background based on theme
const AppContent = () => {
  const { isAuthenticated, theme } = useContext(AuthContext);

  // Set the background color based on the theme
  const backgroundColor = theme === 'dark' ? '#333' : '#fff';

  return (
    <div style={{ backgroundColor, minHeight: '100vh' }}>
      <Navbar />
      <AppRoutes isAuthenticated={isAuthenticated} />
    </div>
  );
};

const AppRoutes = ({ isAuthenticated }) => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={isAuthenticated ? <Navigate to="/profile" /> : <Login />} />
      <Route path="profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
      <Route path="pets" element={isAuthenticated ? <Pets /> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
