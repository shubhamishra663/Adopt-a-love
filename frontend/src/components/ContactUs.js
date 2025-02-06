import React, { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { ReactNotifications, } from 'react-notifications-component';

const ContactUs = () => {
  const { login, isAuthenticated, value, userData, showNotification } =
    useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    subject: "",
    message: "",
    status: false,
  });

  const submission = async () => {
    try {
      const res = await fetch(
        "https://adopt-a-love-backend.vercel.app/contact-us",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const responseData = await res.json();
      if (res.ok) {
        showNotification(
          "Success",
          "Contact details submitted successful",
          "success"
        );
        setFormData({
          name: "",
          email: "",
          mobileNo: "",
          subject: "",
          message: "",
          status: false,
        });
        setIsSubmitting(false);
      } else {
        console.log(`Request failed with status: ${res.status}`);
        showNotification(
          "Error",
          responseData.message ||
            "An error occurred while submitting contact details.",
          "danger"
        );
        setIsSubmitting(false);
      }
    } catch (error) {
      console.log("Error submitting contact form:", error);
      showNotification(
        "Error",
        error.message || "An error occurred while submitting contact details.",
        "danger"
      );
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Error", "Please fill in all required fields.");
      return;
    }
    setIsSubmitting(true);
    submission();
  };

  return (
    <div className="bg-[#f5f0ff] dark:bg-black min-h-screen flex flex-col items-center py-4">
      <ReactNotifications />
      <div className="text-center">
        <h1 className="text-3xl font-bold dark:text-gray-300 py-8">
          Contact us
        </h1>
        <p className="text-gray-600 dark:text-white py-4 ">
          We're here to help! <br />
          Feel free to reach out to us for any queries, support, or assistance regarding pet adoption.<br/>
          You can call us or email us at the details below.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-8 mb-20 py-5">
        {/* Contact Information */}
        <div className="flex flex-col items-center">
          <div className="bg-blue-100 p-4 rounded-full mb-4">
            <span role="img" aria-label="Call us">
              📞
            </span>
          </div>
          <p className="text-gray-800 font-medium dark:text-gray-400">
            Call us
          </p>
          <p className="text-gray-600 dark:text-white">+919472314319</p>
          <p className="text-gray-600 dark:text-white">+919297532308</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-blue-100 p-4 rounded-full mb-4">
            <span role="img" aria-label="Email us">
              📧
            </span>
          </div>
          <p className="text-gray-800 font-medium dark:text-gray-400">
            Email us
          </p>
          
          <a
              href="mailto:adoptalove@yahoo.com"
              className="hover:underline text-gray-600 dark:text-white"
            >
              adoptalove@yahoo.com
            </a>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-blue-100 p-4 rounded-full mb-4">
            <span role="img" aria-label="Visit us">
              📍
            </span>
          </div>
          <p className="text-gray-800 font-medium dark:text-gray-400">
            Visit us
          </p>
          <p className="text-gray-600 dark:text-white">
            Sarari, Danapur, Patna 801105
          </p>
        </div>
      </div>
      <form
        className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full dark:bg-gray-950"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2 dark:text-gray-400">
              First & Last Name
            </label>
            <input
              name="name"
              onChange={handleChange}
              type="text"
              value={formData.name}
              placeholder="i.e. John Doe"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 dark:text-gray-400">
              Email
            </label>
            <input
              name="email"
              onChange={handleChange}
              type="email"
              value={formData.email}
              placeholder="i.e. john@mail.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 dark:text-gray-400">
              Phone Number
            </label>
            <input
              name="mobileNo"
              onChange={handleChange}
              type="tel"
              value={formData.mobileNo}
              placeholder="i.e. +1-234-567-7890"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 dark:text-gray-400">
              Subject
            </label>
            <input
              name="subject"
              onChange={handleChange}
              type="text"
              value={formData.subject}
              placeholder="i.e. I need help"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="mt-6">
          <label className="block text-gray-700 mb-2 dark:text-gray-400">
            Message
          </label>
          <textarea
            name="message"
            onChange={handleChange}
            value={formData.message}
            placeholder="Type your message"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          ></textarea>
        </div>
        <button
          type="submit"
          className="mt-6 bg-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default ContactUs;