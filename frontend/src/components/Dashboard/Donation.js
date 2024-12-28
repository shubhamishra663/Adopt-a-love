import React from "react";
import donation from "../../utils/donation.png";
import donate from "../../utils/donate.jpg";

export default function Donation() {
  const content =
    "Our mission is to provide every rescued and homeless animal with the care, shelter, and love they deserve. With your donations, we aim to ensure that each pet receives the necessary medical treatment, nutritious food, and a safe, comfortable environment as they wait for their forever home. Through community support, we can continue to rescue more animals, reduce pet homelessness, and promote responsible pet adoption. Every contribution, no matter how big or small, helps save lives and gives these animals a second chance at happiness.";

  return (
    <div className="flex flex-col md:flex-row bg-[#f5f0ff] dark:bg-black w-full min-h-screen">
      {/* Left Section */}
      <div className="flex flex-col items-center justify-center md:w-1/2 p-4">
        <img
          className="h-[250px] md:h-[450px] w-[250px] md:w-[450px] object-contain"
          src={donation}
          alt="Donation Page"
        />
        <h1 className="text-xl md:text-2xl font-bold text-gray-700 dark:text-gray-200 mt-4">
          Rescuera Foundation
        </h1>
        <p className="text-sm md:text-md text-gray-500 dark:text-gray-400 italic">
          Choose Love, Adopt A Pet
        </p>
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-center bg-[#f5f0ff] dark:bg-black md:w-1/2 p-2">
        <div>
          <p className="text-right text-[#8b00ff] dark:text-[#d8b4ff] text-lg md:text-2xl font-semibold mb-4">
            #AdoptLoveGiveHope
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-base md:text-xl leading-7 md:leading-8 mb-6 text-right">
            {content}
          </p>
        </div>
        <div className="flex justify-end mt-4 pl-5 ">
          <img
            className="max-h-[80px] md:max-h-[100px] max-w-[150px] md:max-w-[200px] object-contain cursor-pointer hover:opacity-80 bg-[#09b0ea] rounded-lg"
            src={donate}
            alt="Donate"
          />
        </div>
      </div>
    </div>
  );
}
