import React, { useState } from "react";
import { ReactNotifications, Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function Signup() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [emailExists, setEmailExists] = useState(null);

  const navigate = useNavigate();

  const handleChange = ({ target: { id, value } }) => {
    setUser((prev) => ({ ...prev, [id]: value }));
    if (id === "email") checkEmailExists(value);
  };

  const showNotification = (title, message, type) => {
    Store.addNotification({
      title,
      message,
      type,
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: { duration: 5000, onScreen: true },
    });
  };

  const checkEmailExists = async (email) => {
    if (!email.trim()) {
      setEmailExists(null); // Set to null when the email is empty
      return;
    }
    try {
      const { data, status } = await axios.post(
        "https://adopt-a-love-backend.vercel.app/check-email",
        { email }
      );
      if (status === 200) setEmailExists(data.exists);
    } catch (error) {
      console.error("Email check error:", error.message);
    }
  };

  const signup = async () => {
    setLoading(true);
    try {
      const { data, status } = await axios.post(
        "https://adopt-a-love-backend.vercel.app/signup",
        user,
        { withCredentials: true }
      );
      if (status === 200) {
        showNotification("Success", "Signup successful", "success");
        navigate("/login");
      } else {
        showNotification("Error", data.message || "Signup failed", "danger");
      }
    } catch (error) {
      showNotification(
        "Error",
        "Signup failed. Please try again later.",
        "danger"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailExists) {
      showNotification("Error", "Email is already taken", "danger");
      return;
    }
    signup();
  };

  const inputFields = ["name", "email", "password"];

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#f5f0ff] dark:bg-black transition-colors duration-300">
      <ReactNotifications />
      <div className="w-full max-w-lg bg-white dark:bg-[#1e1e1e] dark:border-2 dark:border-[#333] shadow-lg py-10 px-14 rounded-lg mx-4 md:mx-0">
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-[#f5f5f5] mb-10">
          Sign Up
        </h2>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {inputFields.map((field) => (
            <div className="relative" key={field}>
              <input
                type={field === "password" ? "password" : "text"}
                id={field}
                value={user[field]}
                onChange={handleChange}
                className="block px-3 pb-2.5 pt-5 w-full text-sm text-gray-900 dark:text-[#e0e0e0] bg-transparent rounded-md border border-gray-300 dark:border-[#444] appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 peer transition-colors duration-300"
                placeholder=" "
                required
              />
              <label
                htmlFor={field}
                className="absolute text-sm text-gray-500 dark:text-[#bbb] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-transparent px-3 peer-focus:px-2 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-5 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              {field === "email" && emailExists !== null && (
                <FontAwesomeIcon
                  icon={emailExists === false ? faCheckCircle : faCircleXmark}
                  className={`absolute top-1/2 right-4 transform -translate-y-1/2 ${
                    emailExists === false ? "text-green-500" : "text-red-500"
                  }`}
                  title={
                    emailExists === false
                      ? "Email is available"
                      : "Email is taken"
                  }
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            className={`w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ${
              loading ? "cursor-no-drop opacity-50" : "cursor-pointer"
            }`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
          <p className="text-gray-800 dark:text-[#f5f5f5] text-center">
            Already have an account?{" "}
            <Link
              className="text-blue-500 hover:text-blue-400 transition hover:underline"
              to="/login"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
