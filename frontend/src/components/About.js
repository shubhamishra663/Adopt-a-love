import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="px-6 py-12 bg-[#f5f0ff] text-gray-800 dark:bg-black dark:text-gray-100">
      {/* Hero Section */}
      <section className="text-center bg-gradient-to-r from-orange-400 to-red-500 text-white p-10 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-4">Welcome to Adopt-a-Love</h1>
        <p className="text-lg">
          At Adopt-a-Love, we connect loving families with pets in need. Join us
          in creating bonds of love and care.
        </p>
      </section>

      {/* Mission Section */}
      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-orange-500 mb-4">
          Our Mission
        </h2>
        <p className="text-lg leading-relaxed">
          We aim to reduce the number of homeless animals by making adoption
          simple, enjoyable, and accessible for everyone. Adopt-a-Love bridges
          the gap between rescuers and caring homes, ensuring every pet finds a
          family that cherishes them.
        </p>
      </section>

      {/* Stats Section */}
      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-orange-500 mb-6">
          What We Have Achieved
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-orange-400 text-white p-6 rounded-lg text-center shadow-md">
            <h3 className="text-4xl font-bold">1000+</h3>
            <p>Pets Adopted</p>
          </div>
          <div className="bg-orange-400 text-white p-6 rounded-lg text-center shadow-md">
            <h3 className="text-4xl font-bold">500+</h3>
            <p>Happy Families</p>
          </div>
          <div className="bg-orange-400 text-white p-6 rounded-lg text-center shadow-md">
            <h3 className="text-4xl font-bold">200+</h3>
            <p>Active Rescuers</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-orange-500 mb-6">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#F4CE14] p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-2">1. Browse Pets</h3>
            <p>Explore adorable pets waiting for a loving home.</p>
          </div>
          <div className="bg-[#F4CE14] p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-2">2. Connect</h3>
            <p>
              Contact rescuers or shelters to learn more about your chosen pet.
            </p>
          </div>
          <div className="bg-[#F4CE14] p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-2">3. Adopt</h3>
            <p>Welcome your furry friend into your home and life.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="mt-12 text-center">
        <h2 className="text-3xl font-semibold text-orange-500 mb-4">
          Get in Touch
        </h2>
        <p className="mb-6">
          Have questions? Reach out to us, and we’ll help you on your adoption
          journey.
        </p>
        <Link to={"/contactus"}>
        <button className="bg-teal-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-teal-700 transition duration-300">
          Contact Us
        </button>
        </Link>
      </section>
    </div>
  );
};

export default About;
