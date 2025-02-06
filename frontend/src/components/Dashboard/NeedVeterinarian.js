import React from "react";
import { Link } from "react-router-dom";

export default function NeedVeterinarian() {
  return (
    <div className="flex justify-center items-center py-16 bg-gradient-to-b from-[#eab308] via-[#f8e3b4] to-[#f5f0ff] dark:bg-gradient-to-b dark:from-gray-900 dark:via-gray-950 dark:to-black">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-red-300 mb-6">
          Need Assistance for Your Pet?
        </h2>
        <div className="bg-red-300 hover:bg-red-400 text-gray-800 dark:bg-red-400 dark:hover:bg-red-500 dark:text-white transition duration-300 ease-in-out w-fit px-12 py-3 rounded-full shadow-lg cursor-pointer">
          <Link to="./veterinarian">
            <p className="font-bold">Need Veterinarian</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
