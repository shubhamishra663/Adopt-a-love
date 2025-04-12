import axios from "axios";
import React, { useState, useEffect } from "react";
import defaultAvatar from "../utils/defaultAvatar.jpg";
import LostPets from "./LostPets";
import {
  faPlus,
  faPen,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Pets from "./Pets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SearchProfile() {
  const [srchEmail, setSrchEmail] = useState("");
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [activeComponent, setActiveComponent] = useState("pets");

  const [showSearchBox, setShowSeachBox] = useState(false);

  const emailChange = (e) => {
    setSrchEmail(e.target.value);
  };

  useEffect(() => {
    console.log("Updated Value:", srchEmail);
    console.log("Updated Length:", srchEmail.length);
  }, [srchEmail]);

  const searchEmail = async () => {
    if (showSearchBox == false) {
      setShowSeachBox(true);
      return;
    }
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `https://adopt-a-love-backend.vercel.app/srchprofile/${srchEmail}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      console.log("Profile Data:", response.data);
      setProfileData(response.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching profile:", error);
      setError("Profile not found or an error occurred.");
      setProfileData(null);
    }
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-purple-700 to-purple-500 flex py-4 justify-center shadow-md">
        <div className="flex gap-3 items-center">
          <input
            value={srchEmail}
            onChange={emailChange}
            type="text"
            placeholder="Search email..."
            className={`transition-all duration-300 ease-in-out h-12 w-80 rounded-full px-4 font-medium text-white bg-white/10 border-2 border-white/70 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/80 ${
              !showSearchBox ? "hidden" : ""
            }`}
          />

          <div
            onClick={searchEmail}
            className="h-12 w-12 cursor-pointer bg-blue-600 hover:bg-blue-700 active:scale-95 transition-transform border-2 rounded-full border-white flex justify-center items-center text-white text-xl shadow-lg"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
        </div>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {profileData && (
        <div className="h-auto w-full bg-[#f5f0ff] dark:bg-black overflow-hidden dark:text-white">
          {/* Banner and profile pic */}
          <div className="bg-[#f5f0ff] h-fit">
            <div
              className="h-[200px] md:h-[300px] w-full bg-gray-800 flex justify-between"
              style={{
                backgroundImage: `url(${
                  profileData?.user?.cover_img || "default-image-path.jpg"
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="flex px-3 md:px-5 gap-2">
                <div className="relative top-[16%] md:top-[12%] flex justify-center items-end">
                  <div className="border-2 h-20 w-20 dark:bg-black rounded-full overflow-hidden">
                    <img
                      src={profileData?.user?.profile_img || defaultAvatar}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User Details */}
          <div className="dark:bg-black p-3 pt-16 md:pt-10 flex justify-between">
            <div className="dark:text-white">
              <p className="font-semibold text-2xl">
                {profileData?.user?.name || "Name not available"}
              </p>
              <p className="text-xs">
                {profileData?.user?.email || "Email not available"}
              </p>
              <p className="text-xs">{profileData?.user?.userType}</p>
            </div>
          </div>
        </div>
      )}

      {/* Sections */}
      <div className="w-full h-20 flex items-end gap-5 pl-5 dark:bg-black-300 dark:text-white">
        <button
          onClick={() => setActiveComponent("pets")}
          className={`h-14 text-lg font-semibold px-5 py-2 rounded-t-md hover:bg-[#e2e5e9] dark:hover:bg-gray-800 ${
            activeComponent === "pets"
              ? "text-blue-600 border-b-4 border-blue-600"
              : "text-gray-500"
          }`}
        >
          Pets
        </button>
        <button
          onClick={() => setActiveComponent("lostPets")}
          className={`h-14 text-lg font-semibold px-5 py-2 rounded-t-md hover:bg-[#e2e5e9] dark:hover:bg-gray-800 ${
            activeComponent === "lostPets"
              ? "text-blue-600 border-b-4 border-blue-600"
              : "text-gray-500"
          }`}
        >
          Lost Pets
        </button>
      </div>

      {/* UserPets */}
      {/* <section>
              <div className="dark:bg-black md:p-5 dark:text-white">
                <div className="py-5 px-2 bg-white dark:bg-[#121212] flex items-center justify-between p-3 rounded-t-xl border-b-2 border-gray-400 dark:border-gray-600">
                  <p className="font-semibold text-2xl">
                    {activeComponent === "pets" ? "Pets" : "Lost Pets"}
                  </p>
                  <Link
                    to="petform"
                    state={activeComponent === "pets" ? "pets" : "lostPets"}
                  >
                    <button className="bg-blue-400 flex text-xl items-center gap-3 p-1 rounded-md active:bg-blue-600">
                      <p className="font-semibold">Add</p>
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </Link>
                </div>
      
                <div className="bg-white dark:bg-[#121212] flex md:p-5">
                  {activeComponent === "pets" && <Pets />}
                  {activeComponent === "lostPets" && <LostPets />}
                </div>
              </div>
            </section> */}
    </div>
  );
}
