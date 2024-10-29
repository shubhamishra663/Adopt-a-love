import React, { useContext, useEffect, useRef, useState } from 'react';
import { ReactNotifications, Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import Profile from './Profile';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated ,value ,userData} = useContext(AuthContext); // Get login function and auth state


  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));
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

  const loginHandle = async () => {
    try {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: user.email,
          password: user.password
        }),
      });
  
      if (res.ok) {
        const responseData = await res.json();
        console.log(responseData);
  
        // Call login with token and user data
        login(responseData.user.token, responseData.user); // Make sure to get user data from response
  
        showNotification("Success", "Login successful", "success");
        navigate(`/profile/${responseData.user.email}`); // Redirect to profile with email
      } else {
        // Handle error
        const errorMessage = await res.text();
        showNotification("Error", errorMessage || "Login failed", "danger");
        console.log(`Request failed with status: ${res.status}`);
      }
    } catch (error) {
      console.log('Error during fetch:', error);
      showNotification("Error", "Login failed. Please try again later.", "danger");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user)
    loginHandle()
  }

  
  
  return (
    (isAuthenticated?<Profile/>:(
    <div className="min-h-screen relative flex justify-center items-center bg-gray-100">
      {/* <p>Authenticated : {isAuthenticated ? 'True' : 'false'},{value}</p> */}
      {/* Include React Notifications */}
      <ReactNotifications />

      <div className="w-full max-w-lg bg-white shadow-lg py-10 px-14 rounded-lg mx-4 md:mx-0 relative z-10">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-10">Login</h2>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>

          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={handleChange}
              className="block px-3 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-transparent rounded-md border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-transparent px-3 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-5 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
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
              className="block px-3 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-transparent rounded-md border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-transparent px-3 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-5 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Password
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            Submit
          </button>
        </form>
      </div>
    </div>)
    ))
}
