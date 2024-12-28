import React from "react";
import adoptMeImage from "../../utils/adoptMe.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faDog, faShieldAlt, faUsers, faSearch } from "@fortawesome/free-solid-svg-icons";

export default function WhyChooseUs() {
  return (
    <div className="bg-[#f5f0ff] dark:bg-black">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row h-full">
          {/* Left Section: Image */}
          <div className="md:w-1/2 h-full relative overflow-hidden">
            <img
              className="w-full h-full object-center md:object-cover"
              src={adoptMeImage}
              alt="Adopt Me"
              loading="lazy"
            />
          </div>

          {/* Right Section: Content */}
          <div className="md:w-1/2 p-8 flex flex-col justify-center space-y-6">
            <h2 className="text-4xl font-extrabold text-[#4B0082] mb-6">Why Choose Us?</h2>
            <div className="space-y-6">
              {/* Box for Adopt with Confidence */}
              <div className="flex flex-col md:flex-row items-center bg-white dark:bg-[#333] border-2 border-[#444]  p-6 rounded-lg shadow-lg space-y-4 md:space-x-6 md:space-y-0">
                <div className="w-12 h-12 bg-[#ff6347] flex items-center justify-center rounded-full">
                  <FontAwesomeIcon icon={faHeart} className="text-2xl text-white" />
                </div>
                <div className="text-lg text-[#333] dark:text-white">
                  <strong className="font-semibold">Adopt with Confidence:</strong> We ensure every pet is thoroughly vetted for a healthy and loving companionship.
                </div>
              </div>

              {/* Box for Wide Variety of Pets */}
              <div className="flex flex-col md:flex-row items-center bg-white dark:bg-[#333] border-2 border-[#444] p-6 rounded-lg shadow-lg space-y-4 md:space-x-6 md:space-y-0">
                <div className="w-12 h-12 bg-[#ff6347] flex items-center justify-center rounded-full">
                  <FontAwesomeIcon icon={faDog} className="text-2xl text-white" />
                </div>
                <div className="text-lg text-[#333] dark:text-white">
                  <strong className="font-semibold">Wide Variety of Pets:</strong> From playful puppies to loyal adult dogs, and cuddly kittens to wise older cats, we offer a diverse range of pets ready for adoption.
                </div>
              </div>

              {/* Box for Safe & Secure Adoption Process */}
              <div className="flex flex-col md:flex-row items-center bg-white dark:bg-[#333] border-2 border-[#444] p-6 rounded-lg shadow-lg space-y-4 md:space-x-6 md:space-y-0">
                <div className="w-12 h-12 bg-[#ff6347] flex items-center justify-center rounded-full">
                  <FontAwesomeIcon icon={faShieldAlt} className="text-2xl text-white" />
                </div>
                <div className="text-lg text-[#333] dark:text-white">
                  <strong className="font-semibold">Safe & Secure Adoption Process:</strong> We guide you through a transparent adoption process, ensuring safety for both pets and adopters.
                </div>
              </div>

              {/* Box for Support for Pet Rescuers */}
              <div className="flex flex-col md:flex-row items-center bg-white dark:bg-[#333] border-2 border-[#444] p-6 rounded-lg shadow-lg space-y-4 md:space-x-6 md:space-y-0">
                <div className="w-12 h-12 bg-[#ff6347] flex items-center justify-center rounded-full">
                  <FontAwesomeIcon icon={faUsers} className="text-2xl text-white" />
                </div>
                <div className="text-lg text-[#333] dark:text-white">
                  <strong className="font-semibold">Support for Pet Rescuers:</strong> Empowering pet rescuers with the tools they need to find homes for pets in need.
                </div>
              </div>

              {/* Box for Comprehensive Pet Profiles */}
              <div className="flex flex-col md:flex-row items-center bg-white dark:bg-[#333] border-2 border-[#444] p-6 rounded-lg shadow-lg space-y-4 md:space-x-6 md:space-y-0">
                <div className="w-12 h-12 bg-[#ff6347] flex items-center justify-center rounded-full">
                  <FontAwesomeIcon icon={faSearch} className="text-2xl text-white" />
                </div>
                <div className="text-lg text-[#333] dark:text-white">
                  <strong className="font-semibold">Comprehensive Pet Profiles:</strong> Detailed pet profiles, including temperament and medical history, help you make informed decisions.
                </div>
              </div>

              {/* Box for Lifetime Support */}
              <div className="flex flex-col md:flex-row items-center bg-white dark:bg-[#333] border-2 border-[#444] p-6 rounded-lg shadow-lg space-y-4 md:space-x-6 md:space-y-0">
                <div className="w-12 h-12 bg-[#ff6347] flex items-center justify-center rounded-full">
                  <FontAwesomeIcon icon={faHeart} className="text-2xl text-white" />
                </div>
                <div className="text-lg text-[#333] dark:text-white">
                  <strong className="font-semibold">Lifetime Support:</strong> Once adopted, you're part of our community! Continuous support for your new furry friend.
                </div>
              </div>

              {/* Box for A Community of Pet Lovers */}
              <div className="flex flex-col md:flex-row items-center bg-white dark:bg-[#333] border-2 border-[#444] p-6 rounded-lg shadow-lg space-y-4 md:space-x-6 md:space-y-0">
                <div className="w-12 h-12 bg-[#ff6347] flex items-center justify-center rounded-full">
                  <FontAwesomeIcon icon={faUsers} className="text-2xl text-white" />
                </div>
                <div className="text-lg text-[#333] dark:text-white">
                  <strong className="font-semibold">A Community of Pet Lovers:</strong> Join a vibrant community where pet lovers and rescuers share advice, stories, and support.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
