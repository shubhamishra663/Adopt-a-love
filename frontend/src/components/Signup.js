import React, { useEffect, useRef, useState } from 'react';
import { ReactNotifications, Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { Link, useNavigate } from 'react-router-dom';



export default function Signup() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

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



  const signup = async () => {
    try {
      const res = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          password: user.password,
        }),
      });
  
      if (res.ok) {
        const responseData = await res.json();
        console.log(responseData);
  
        showNotification("Success", "Signup successful", "success");
        navigate('/login')
      } else {
        const errorMessage = await res.text();
        showNotification("Error", errorMessage || "Signup failed", "danger");
        console.log(`Request failed with status: ${res.status}`);
      }
    } catch (error) {
      console.log('Error during fetch:', error);
  
      // Add error notification
      showNotification("Error", "Signup failed. Please try again later.", "danger");
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    signup();
  };

  return (
    <div className="min-h-screen relative flex justify-center items-center bg-gray-100">
      <ReactNotifications />

      <div className="w-full max-w-lg bg-white shadow-lg py-10 px-14 rounded-lg mx-4 md:mx-0 relative z-10">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-10">Sign Up</h2>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>

          <div className="relative">
            <input
              type="text"
              id="name"
              value={user.name}
              onChange={handleChange}
              className="block px-3 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-transparent rounded-md border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="name"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-transparent px-3 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-5 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Name
            </label>
          </div>

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

          <button
            type="submit"
            className="w-full py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            Submit
          </button>

          <p className='text-black'>Already have an account? <Link className='text-blue-600' to='/login'>Login</Link></p>

        </form>

      </div>
    </div>
  );
}
