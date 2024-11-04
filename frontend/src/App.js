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
import PetForm from './components/PetForm';
import Adopt from './components/Adopt';
import PetProfile from './components/PetProfile';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

// Separate App content for handling background and text color based on theme
const AppContent = () => {
  const { isAuthenticated, theme, userData } = useContext(AuthContext);

  // Apply Tailwind classes based on the theme
  const themeClasses = theme === 'dark'
    ? 'bg-[#0d0d0d] text-white'
    : 'bg-[#D9D9D9] text-black';

  return (
    <div className={`min-h-screen ${themeClasses}`}>
      <Navbar userData={userData} />
      <AppRoutes isAuthenticated={isAuthenticated} userData={userData} theme={theme} />
    </div>
  );
};

const AppRoutes = ({ isAuthenticated, userData, theme }) => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={isAuthenticated ? <Navigate to={`/profile/${userData?.user?.email}`} /> : <Login />} />
      <Route path="profile/:email" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
      <Route path="pets" element={isAuthenticated ? <Pets /> : <Navigate to="/login" />} />
      <Route path="petform" element={isAuthenticated ? <PetForm /> : <Navigate to="/login" />} />
      <Route path="adopt" element={<Adopt />} />
      <Route path="petprofile/:petid" element={<PetProfile />} />
    </Routes>
  );
};

export default App;
