import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../utils/logo.png';
import { AuthContext } from '../context/authContext';

export default function Navbar({ userData }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { theme } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to get active class for the current path
  const getActiveClass = (path) => {
    return location.pathname === path
      ? 'text-white font-semibold' // Active link styles
      : 'text-gray-900 dark:text-gray-300'; // Inactive link styles
  };

  return (
    <nav className={`shadow-lg ${'bg-gray-900' } transition-colors`}>
      <div className="max-w-screen-xl flex items-center justify-between p-4">
        <a href="#" className="flex items-center space-x-2">
          <img src={logo} className="h-10" alt="Pet a Love Logo" />
          <span className={`text-2xl font-semibold  text-white `}>
            Adopt a Love
          </span>
        </a>
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:flex md:flex-1 md:justify-center`} id="navbar-default">
          <ul className="font-medium flex flex-col md:flex-row p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-white bg-opacity-20 md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:items-center md:dark:bg-transparent dark:border-gray-700 backdrop-filter backdrop-blur-lg">
            <li>
              <Link
                to="/"
                className={`block py-2 px-3 rounded ${getActiveClass('/')}`}
                aria-current={location.pathname === '/' ? 'page' : undefined}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to={`/profile/${userData?.user?.email}`}
                className={`block py-2 px-3 rounded ${getActiveClass('/profile')}`}
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className={`block py-2 px-3 rounded ${getActiveClass('#')}`}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/adopt"
                className={`block py-2 px-3 rounded ${getActiveClass('/adopt')}`}
              >
                Adopt
              </Link>
            </li>
            <li>
              <a
                href="#"
                className={`block py-2 px-3 rounded ${getActiveClass('#contact')}`}
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
