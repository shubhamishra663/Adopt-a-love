import React, { useContext, useEffect, useState } from "react";
import shu from "../utils/pets.jpg";
import { AuthContext } from "../context/authContext";
import Pets from "./Pets";
import LostPets from "./LostPets";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { logout, userData, setUserData, theme, setTheme } = useContext(AuthContext);
  const [activeComponent, setActiveComponent] = useState("pets");

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `http://localhost:5000/profile/${userData?.user?.email}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="h-auto w-full bg-[#f5f5f5] dark:bg-black overflow-hidden dark:text-white">
      {/* Banner and profile pic */}
      <div className="bg-white h-fit">
        <div className="h-[300px] md:h-[300px] w-full bg-gray-800 flex justify-between">
          <div className="flex px-3 md:px-5 gap-2">
            <div className="relative top-[12%] flex justify-center items-end">
              <div className="border-2  h-20 w-20 dark:bg-black rounded-full overflow-hidden">
                <img src={shu} alt="Profile" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Details */}
      <div className="bg-[#f5f5f5] dark:bg-black p-3 pt-16 md:pt-10 flex justify-between">
        <div className="dark:text-white">
          <p className="font-semibold text-2xl">{userData?.user?.name || "Name not available"}</p>
          <p className="text-xs">{userData?.user?.email || "Email not available"}</p>
        </div>
        <div>
          <p className="bg-blue-500 p-2 rounded-md flex justify-center items-center">Edit</p>
        </div>
      </div>

      {/* Sections */}
      <div className="w-full h-28 md:h-32 flex md:gap-10 p-3 md:p-5 justify-between md:justify-normal dark:bg-black dark:text-white">
        <button
          onClick={() => setActiveComponent("pets")}
          className="h-full w-[45%] md:w-40 bg-blue-200 rounded-md flex justify-center items-center focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <p className="font-semibold text-xl">Pets</p>
        </button>
        <button
          onClick={() => setActiveComponent("lostPets")}
          className="h-full w-[45%] md:w-40 bg-blue-200 rounded-md flex justify-center items-center focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <p className="font-semibold text-xl">Lost Pets</p>
        </button>
      </div>

      {/* UserPets */}
      <section>
        <div className="dark:bg-black md:p-5 dark:text-white">
          <div className="py-5 px-2 bg-white dark:bg-[#121212] flex items-center justify-between p-3 rounded-t-lg border-b-2 border-gray-400 dark:border-gray-600">
            <p className="font-semibold text-2xl">
              {activeComponent === "pets" ? "Pets" : "Lost Pets"}
            </p>
            <Link to="petform" state={activeComponent === "pets" ? "pets" : "lostPets"}>
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
      </section>

      <div className="h-full flex items-center p-5">
        <button onClick={logout} className="bg-blue-500 p-1 rounded-md text-sm">
          Log out
        </button>
      </div>

      {/* Toggle Theme Button */}
      <button
          onClick={toggleTheme}
          className="p-2 bg-blue-500 text-white rounded-md flex items-center gap-2"
        >
          <span className="text-sm">Set Theme</span>
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
    </div>
  );
}
