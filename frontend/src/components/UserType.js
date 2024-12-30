import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ReactNotifications } from "react-notifications-component";
import { AuthContext } from "../context/authContext";

const UserType = () => {
  const [selectedUserType, setSelectedUserType] = useState("");
  const [loading, setLoading] = useState(false);

  const { isAuthenticated, showNotification, userData } =useContext(AuthContext);
  const navigate = useNavigate();

  const handleSelection = (userType) => {
    setSelectedUserType(userType); // Update the selected text
  };

  const userSubmit = () => {
    if (!selectedUserType) {
        showNotification("Warning", "Please select a user type.", "warning");
        return;
      }
      updateUser(userData?.user?.email, selectedUserType);
  };

  const updateUser = async (email, uType) => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://adopt-a-love-backend.vercel.app/userType",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            userType: uType,
          }),
        }
      );

      if (res.ok) {
        const responseData = await res.json();
        console.log(responseData);
        showNotification(
          "Success",
          "User type updated successfully!",
          "success"
        );
        navigate("/clocation")

      } else {
        console.log(`Request failed with status: ${res.status}`);
        showNotification("Error", "Failed to update user type.", "danger");
      }
    } catch (error) {
      console.log("Error updating user type:", error);
      showNotification(
        "Error",
        error.message || "An error occurred while updating the user type.",
        "danger"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-10 bg-[#f5f0ff] dark:bg-black text-black dark:text-white">
      <ReactNotifications />

      <h1 className="text-xl md:text-4xl font-semibold mb-6">
        Are You a{" "}
        <div className="inline-block px-4 py-1 min-w-48 md:min-w-52 border-b-2 border-gray-500 dark:border-gray-300">
          <p className="inline-block text-sm md:text-2xl text-red-600">
            {selectedUserType}
          </p>
        </div>
        ?
      </h1>
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <button
          onClick={() => handleSelection("Pet Owner / Personal User")}
          className="py-2 px-4 bg-gray-200 text-black rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Pet Owner / Personal User
        </button>
        <button
          onClick={() => handleSelection("Shelter Owner")}
          className="py-2 px-4 bg-gray-200 text-black rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Shelter Owner
        </button>
        <button
          onClick={() => handleSelection("Veterinarian")}
          className="py-2 px-4 bg-gray-200 text-black rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Veterinarian
        </button>

        <button
          onClick={userSubmit}
          className={`py-2 px-4 bg-blue-500 hover:bg-blue-600 text-black font-semibold mt-10 
            ${
              loading
                ? "cursor-no-drop opacity-50 pointer-events-none"
                : "cursor-pointer"
            }`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default UserType;
