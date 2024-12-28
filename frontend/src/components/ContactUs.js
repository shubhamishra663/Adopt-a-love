import React from "react";

const ContactUs = () => {
  return (
    <div className="bg-gray-100 dark:bg-black min-h-screen flex flex-col items-center py-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold dark:text-gray-400 py-8">Contact us</h1>
        <p className="text-gray-600 dark:text-white py-4 ">
          With lots of unique blocks, you can easily build a page without coding. <br />
          Build your next consultancy website within a few minutes.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-8 mb-20 py-5">
        <div className="flex flex-col items-center">
          <div className="bg-blue-100 p-4 rounded-full mb-4">
            <span role="img" aria-label="Call us">
              📞
            </span>
          </div>
          <p className="text-gray-800 font-medium dark:text-gray-400">Call us</p>
          <p className="text-gray-600 dark:text-white">+919472314319</p>
          <p className="text-gray-600 dark:text-white">+919297532308</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-blue-100 p-4 rounded-full mb-4">
            <span role="img" aria-label="Email us">
              📧
            </span>
          </div>
          <p className="text-gray-800 font-medium dark:text-gray-400">Email us</p>
          <p className="text-gray-600 dark:text-white">shubhamishra663@gmail.com</p>
          <p className="text-gray-600 dark:text-white">singhhsanjeetaryan@gmail.com</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-blue-100 p-4 rounded-full mb-4">
            <span role="img" aria-label="Visit us">
              📍
            </span>
          </div>
          <p className="text-gray-800 font-medium dark:text-gray-400">Visit us</p>
          <p className="text-gray-600 dark:text-white">Sarari, Danapur, Patna 801105</p>
        </div>
      </div>
      <form className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full dark:bg-gray-950">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2 dark:text-gray-400">First & Last Name</label>
            <input
              type="text"
              placeholder="i.e. John Doe"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 dark:text-gray-400">Email</label>
            <input
              type="email"
              placeholder="i.e. john@mail.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 dark:text-gray-400">Phone Number</label>
            <input
              type="tel"
              placeholder="i.e. +1-234-567-7890"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 dark:text-gray-400">Subject</label>
            <input
              type="text"
              placeholder="i.e. I need help"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="mt-6">
          <label className="block text-gray-700 mb-2 dark:text-gray-400">Message</label>
          <textarea
            placeholder="Type your message"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          ></textarea>
        </div>
        <button
          type="submit"
          className="mt-6 bg-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
