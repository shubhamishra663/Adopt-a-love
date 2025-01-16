import React, { useContext, useEffect, useState } from "react";
import defaultAvatar from "../utils/defaultAvatar.jpg";
import { AuthContext } from "../context/authContext";
import Pets from "./Pets";
import LostPets from "./LostPets";
import { faPlus,faPen } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfileEdit from "./EditProfile";
import Loader from "./Loader";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userData, setUserData,logout } = useContext(AuthContext);
  const [activeComponent, setActiveComponent] = useState("pets");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const fetchProfile = async () => {
    console.log("fetching");
    
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authorization token is missing. Please log in.");
      logout();
      return;
    }

    console.log("fetching profile");
    
    try {
      const response = await fetch(
        `https://adopt-a-love-backend.vercel.app/profile/${userData?.user?.email}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      

      if (response.status === 401) {
        setError("Unauthorized. Please log in again.");
        logout();
        return;
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch profile data: ${response.statusText}`);
        logout();

      }

      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching profile data:", error.message);
      logout();
      setError(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    console.log("profile")
    console.log(userData?.user?.email)

    const localhostUser=localStorage.getItem("user");
    if (userData?.user?.email  || localhostUser) {
      fetchProfile();
    }
  }, []);
  

  if (loading) {
    return <Loader/>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return ( 
    <div className="h-auto w-full bg-[#f5f0ff] dark:bg-black overflow-hidden dark:text-white">
      {/* Banner and profile pic */}
      <div className="bg-[#f5f0ff] h-fit">
        <div
          className="h-[200px] md:h-[300px] w-full bg-gray-800 flex justify-between"
          style={{
            backgroundImage: `url(${
              userData?.user?.cover_img || "default-image-path.jpg"
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
                  src={userData?.user?.profile_img || defaultAvatar}
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
            {userData?.user?.name || "Name not available"}
          </p>
          <p className="text-xs">
            {userData?.user?.email || "Email not available"}
          </p>
          <p className="text-xs">
            {userData?.user?.userType}
          </p>
        </div>
        <div>
        <button
  onClick={() => setIsEditModalOpen(true)}
  className="bg-[#e2e5e9] dark:bg-gray-800 text-black dark:text-white py-2 px-4 rounded-lg flex items-center hover:bg-gray-700"
>
  <FontAwesomeIcon icon={faPen} className="mr-2" /> {/* FontAwesome Icon */}
  Edit Profile
</button>
        </div>
      </div>

      {/* Profile Edit Modal */}
      {isEditModalOpen && (
        <ProfileEdit isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
      )}


{/* Section */}
<div className="p-2">
  <Link to={"./create-post"}>
      <button className="bg-blue-400 w-full p-2 rounded-md font-semibold hover:bg-blue-500">Add a post</button>
  </Link>
</div>


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
      <section>
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
      </section>
    </div>
  );
}