import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../utils/logo.png";
import { AuthContext } from "../context/authContext";
import defaultAvatar from "../utils/defaultAvatar.jpg";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSlash } from "@fortawesome/free-solid-svg-icons";

export default function Navbar({ userData }) {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, logout, setTheme, navUserData, isAuthenticated } =
    useContext(AuthContext);
  const [ showDeleteAccount, setShowDeleteAccount ] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const getActiveClass = (path) => {
    return location.pathname === path
      ? "text-blue-700 dark:md:text-blue-500"
      : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent";
  };

  return (
    
    <nav className="bg-white border-gray-200 dark:bg-black shadow-xl border-b-[1px] dark:border-[#565656] sticky top-0 z-50">
      <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} className="h-8" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Adopt a Love
          </span>
        </Link>

        {/* Profile and menu button */}
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-blue-600 dark:focus:ring-blue-600"
            aria-expanded={isProfileMenuOpen}
            onClick={toggleProfileMenu}
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-8 h-8 rounded-full object-cover"
              src={navUserData?.profile_img || defaultAvatar}
              alt="user photo"
            />
          </button>

          {/* Dropdown menu */}
          {isProfileMenuOpen && (
            <div className="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute right-4 mt-80">
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">
                  {navUserData?.name || "Guest"}
                </span>
                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                  {navUserData?.email || "guest@example.com"}
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <Link
                    to={`/${userData?.user?.email || navUserData?.email}`}
                    onClick={toggleProfileMenu}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Dashboard
                  </Link>
                </li>

                {isAuthenticated && (
                  <li>
                    <Link
                      onClick={toggleProfileMenu}
                      to="/usertype"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Account Settings
                    </Link>
                  </li>
                )}

                <li>
                  {/* Toggle Theme Button */}
                  <button
                    onClick={toggleTheme}
                    className="px-4 py-2 text-white rounded-md flex items-center gap-2"
                  >
                    <span className="text-sm text-gray-700 dark:text-gray-200">
                      Set Theme
                    </span>
                    <div
                      className={`w-10 h-6 rounded-full p-1 bg-gray-300 relative transition-all duration-300 ease-in-out ${
                        theme === "dark" ? "bg-gray-800" : "bg-yellow-400"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full shadow-md absolute top-1 transition-transform duration-300 ease-in-out ${
                          theme === "dark" ? "transform translate-x-4" : ""
                        }`}
                      ></div>
                    </div>
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => {
                      logout();
                      toggleProfileMenu();
                    }}
                    className="block px-4 py-2 text-sm font-bold text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-red-400 w-full text-left"
                  >
                    <span>
                      <FontAwesomeIcon icon={faSignOutAlt} /> Sign Out
                    </span>
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => {
                      setShowDeleteAccount(!showDeleteAccount);
                      toggleProfileMenu();
                    }}
                    className="block px-4 py-2 text-sm font-bold text-red-500 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-red-500 w-full text-left"
                  >
                    <span>
                      <FontAwesomeIcon icon={faUserSlash} /> Delete Account
                    </span>
                  </button>

                </li>
                {showDeleteAccount && <DeleteAccount />}
              </ul>
            </div>
          )}

          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
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
        </div>

        {/* Navigation Links */}
        <div
          className={`items-center justify-between ${
            isMenuOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-black md:dark:bg-black dark:border-gray-700">
            <li>
              <Link
                to="/"
                className={`block py-2 px-3 rounded ${getActiveClass("/")}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to={`/${userData?.user?.email}`}
                className={`block py-2 px-3 rounded ${getActiveClass(
                  `/${userData?.user?.email}`
                )}`}
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to={`/search`}
                className={`block py-2 px-3 rounded ${getActiveClass(
                  `/search`
                )}`}
              >
                Search
              </Link>
            </li>
            <li>
              <Link
                to="/feed"
                className={`block py-2 px-3 rounded ${getActiveClass("/feed")}`}
              >
                Feed
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`block py-2 px-3 rounded ${getActiveClass(
                  "/about"
                )}`}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/adopt"
                className={`block py-2 px-3 rounded ${getActiveClass(
                  "/adopt"
                )}`}
              >
                Adopt
              </Link>
            </li>
            <li>
              <Link
                to="/contactus"
                className={`block py-2 px-3 rounded ${getActiveClass(
                  "/contactus"
                )}`}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

const DeleteAccount = () => {
  return (
    <div className="h-screen w-screen bg-blue-300 absolute top-0 left-0 z-50 m-0 p-0 flex justify-center items-center">
      <div className="text-5xl text-white">Are you sure you want to delete your account?</div>
    </div>
  );
};
