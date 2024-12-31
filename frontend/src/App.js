import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Home from './components/Home';
import Pets from './components/Pets';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider, { AuthContext } from './context/authContext';
import { useContext, useEffect } from 'react';
import PetForm from './components/PetForm';
import Adopt from './components/Adopt';
import PetProfile from './components/PetProfile';
import NotFound from './components/NotFound';
import About from './components/About';
import ContactUs from './components/ContactUs';
import UserType from './components/UserType';
import CLocation from './components/CLocation'
import PetUpdate from './components/PetUpdate';

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

  useEffect(() => {
    // Apply the dark mode class to the HTML element
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

 

  return (
    <div className={`min-h-screen bg-[#f5f0ff]`}>
      <Navbar userData={userData} />
      <AppRoutes isAuthenticated={isAuthenticated} userData={userData} theme={theme} />
    </div>
  );
};

const AppRoutes = ({ isAuthenticated, userData, theme }) => {
  const email=localStorage.getItem('user');

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={isAuthenticated ? <Navigate to={`/${email || userData?.user?.email}`} /> : <Login />} />
      <Route path="/:email" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
      <Route path="pets" element={isAuthenticated ? <Pets /> : <Navigate to="/login" />} />
      <Route path="/:email/petform" element={isAuthenticated ? <PetForm /> : <Navigate to="/login" />} />
      <Route path="adopt" element={<Adopt />} />
      <Route path="usertype" element={<UserType />} />
      <Route path="contactus" element={<ContactUs/>} />
      <Route path="update-pet/:petid" element={<PetUpdate/>} />
      <Route path="clocation" element={<CLocation/>} />
      <Route path="about" element={<About />} />
      {/* <Route path="/:email/edit" element={<ProfileEdit />} /> */}
      <Route path="petprofile/:petid" element={<PetProfile />} />
      <Route path="lostpetprofile/:petid" element={<PetProfile />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;