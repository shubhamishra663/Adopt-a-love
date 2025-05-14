import React, { useState } from "react";
import { ReactNotifications, Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

export default function Signup() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [emailExists, setEmailExists] = useState(null);
  const [nameError, setNameError] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);

  const navigate = useNavigate();

  const handleChange = ({ target: { id, value } }) => {
    setUser((prev) => ({ ...prev, [id]: value }));
    if (id === "email") checkEmailExists(value);
    if (id === "name") validateName(value);
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

  const validateName = (name) => {
    if (name === "") setNameError("");
    else if (!/^[A-Za-z]/.test(name)) {
      setNameError("Name must start with a letter");
    } else {
      setNameError("");
    }
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const checkEmailExists = async (email) => {
    if (!email.trim() || !isValidEmail(email)) {
      setEmailExists(null);
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
    if(!otpVerified){
      showNotification("Error","Verify email", "danger");
      return
    }
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
    if (showOtpField && (!otp.trim() || !otpVerified)) {
      showNotification("Error", "Please verify the OTP", "danger");
      return;
    }
    signup();
  };

  const handleOtpSend = async () => {
  if (!emailExists) {
    try {
      // Make the API request to send OTP
      const response = await axios.post('https://adopt-a-love-backend.vercel.app/send-otp', {
        email: user.email, // Send the email address
      });

      // Check for successful response
      if (response.status === 200) {
        showNotification("Success", "OTP sent!", "success");
        setShowOtpField(true);
      } else {
        showNotification("Error", "Failed to send OTP. Please try again.", "danger");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);        
      showNotification("Error", "An error occurred while sending OTP.", "danger");
    }
  }
};

  const handleOtpVerify = async () => {
  try {
    const response = await fetch("https://adopt-a-love-backend.vercel.app/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email:user.email,
        otp:otp,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setOtpVerified(true);
      showNotification("Success", data.message || "OTP Verified", "success");
    } else {
      showNotification("Error", data.message || "Invalid OTP", "danger");
    }
  } catch (err) {
    console.error("OTP verification error:", err);
    showNotification("Error", "Server error during OTP verification", "danger");
  }
};


  return (
    <div className="min-h-screen flex justify-center items-center bg-[#f5f0ff] dark:bg-black transition-colors duration-300">
      <ReactNotifications />
      <div className="w-full max-w-lg bg-white dark:bg-[#1e1e1e] dark:border-2 dark:border-[#333] shadow-lg py-10 px-14 rounded-lg mx-4 md:mx-0">
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-[#f5f5f5] mb-10">
          Sign Up
        </h2>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="relative">
            <input
              type="text"
              id="name"
              value={user.name}
              onChange={handleChange}
              className="block px-3 pb-2.5 pt-5 w-full text-sm text-gray-900 dark:text-[#e0e0e0] bg-transparent rounded-md border border-gray-300 dark:border-[#444] appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 peer transition-colors duration-300"
              placeholder=" "
              required
            />
            <label
              htmlFor="name"
              className="absolute text-sm text-gray-500 dark:text-[#bbb] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-transparent px-3 peer-focus:px-2 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-5 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Name
            </label>
            {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
          </div>

          {/* Email Field */}
          <div className="relative">
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={handleChange}
              className="block px-3 pb-2.5 pt-5 w-full text-sm text-gray-900 dark:text-[#e0e0e0] bg-transparent rounded-md border border-gray-300 dark:border-[#444] appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 peer transition-colors duration-300"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-gray-500 dark:text-[#bbb] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-transparent px-3 peer-focus:px-2 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-5 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Email
            </label>
            {emailExists !== null && (
              <FontAwesomeIcon
                onClick={handleOtpSend}
                icon={emailExists === false ? faCheckCircle : faCircleXmark}
                className={`absolute top-1/2 right-4 transform -translate-y-1/2 ${
                  emailExists === false ? "text-green-500" : "text-red-500"
                } cursor-pointer`}
                title={
                  emailExists === false
                    ? "Email is available (click to get OTP)"
                    : "Email is taken"
                }
              />
            )}
          </div>

          {/* OTP Field */}
          {showOtpField && (
            <div className="flex items-center gap-2">
              <div className="relative w-full">
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="block px-3 pb-2.5 pt-5 w-full text-sm text-gray-900 dark:text-[#e0e0e0] bg-transparent rounded-md border border-gray-300 dark:border-[#444] appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 peer transition-colors duration-300"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="otp"
                  className="absolute text-sm text-gray-500 dark:text-[#bbb] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-transparent px-3 peer-focus:px-2 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-5 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  OTP
                </label>
              </div>
              <button
                type="button"
                onClick={handleOtpVerify}
                className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-md"
              >
                Verify
              </button>
            </div>
          )}

          {/* Password Field */}
          <div className="relative">
            <input
              type="password"
              id="password"
              value={user.password}
              onChange={handleChange}
              className="block px-3 pb-2.5 pt-5 w-full text-sm text-gray-900 dark:text-[#e0e0e0] bg-transparent rounded-md border border-gray-300 dark:border-[#444] appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 peer transition-colors duration-300"
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
              className="absolute text-sm text-gray-500 dark:text-[#bbb] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-transparent px-3 peer-focus:px-2 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-5 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Password
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ${
              loading ? "cursor-no-drop opacity-50" : "cursor-pointer"
            }`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>

          {/* Login Link */}
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
