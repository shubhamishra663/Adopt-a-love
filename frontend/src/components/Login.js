import React, { useContext, useState } from 'react';
import Profile from './Profile';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { ReactNotifications} from 'react-notifications-component';


export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated ,value ,showNotification} = useContext(AuthContext); 
  const location = useLocation();
  const loct = location.state?.from?.pathname ;

  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [loading,setLoading]=useState(false)

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));
  };



  const loginHandle = async () => {
    try {
      setLoading(true)
      const res = await fetch('https://adopt-a-love-backend.vercel.app/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: user.email,
          password: user.password,
        }),
      });
  
      if (!res.ok) {
        const errorMessage = await res.text(); // Extract error from response
        throw new Error(errorMessage || `Request failed with status: ${res.status}`);
      }
  
      const responseData = await res.json(); // Parse JSON response
      console.log(responseData);
  
      // Simulating a login action in context
      login(responseData?.user?.token);
      localStorage.setItem('user', responseData?.user?.email);
  
      // Success notification
      showNotification("Success", "Login successful", "success");
  
      // Redirecting to the appropriate page
      const email = localStorage.getItem('user');
      navigate(loct || `/${email || responseData.user.email}`, { replace: true });
    } catch (error) {
      console.error('Error during fetch:', error.message);
      showNotification("Error", error.message || "Login failed. Please try again later.", "danger");
    }finally{
      setLoading(false)
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user)
    loginHandle()
  }

  
  
  return (
    (isAuthenticated?<Profile/>:(
    <div className="min-h-screen relative flex justify-center items-center bg-[#f5f0ff] dark:bg-black">
      <ReactNotifications />

      <div className="w-full max-w-lg bg-white dark:bg-[#1e1e1e] dark:border-2 dark:border-[#333] shadow-lg py-10 px-14 rounded-lg mx-4 md:mx-0">
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-[#f5f5f5] mb-10">Login</h2>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>

          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={handleChange}
              className="block px-3 pb-2.5 pt-5 w-full text-sm text-gray-900 dark:text-[#e0e0e0] bg-transparent rounded-md border dark:border-[#444] border-gray-300 appearance-none focus:outline-none focus:ring-0 dark:focus:border-blue-600 focus:border-blue-600 peer"
              placeholder=" " 
              required
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-gray-500 dark:text-[#bbb] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-transparent px-3 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-5 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Email
            </label>
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type="password"
              id="password"
              value={user.password}
              onChange={handleChange}
              className="block px-3 pb-2.5 pt-5 w-full text-sm text-gray-900 dark:text-[#e0e0e0] bg-transparent rounded-md border dark:border-[#444] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 dark:focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
              className="absolute text-sm text-gray-500 dark:text-[#bbb] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-transparent px-3 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-5 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Password
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out  ${
              loading
                ? "cursor-no-drop opacity-50 pointer-events-none"
                : "cursor-pointer"
            }`}
          >
            {loading?"Submitting...":"Submit"}
          </button>
          <p className='text-black dark:text-[#f5f5f5]'>Don't have an account? <Link className='text-blue-600 hover:underline' to='/signup'>Create an account</Link></p>

        </form>
      </div>
    </div>)
    ))
}