import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ReactNotifications } from "react-notifications-component";
import { AuthContext } from "../context/authContext";

const UserType = () => {
  const [selectedUserType, setSelectedUserType] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [clinicTimings, setClinicTimings] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [university, setUniversity] = useState("");
  const [experience, setExperience] = useState("");
  const [loading, setLoading] = useState(false);

  const { isAuthenticated, showNotification, userData, navUserData } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const handleSelection = (userType) => {
    setSelectedUserType(userType);
  };

  const userSubmit = () => {
    if (!selectedUserType) {
      showNotification("Warning", "Please select a user type.", "warning");
      return;
    }

    // If the user is a veterinarian, ensure they have filled in additional details
    if (
      selectedUserType === "Veterinarian" &&
      (!clinicName.trim() ||
        !licenseNumber.trim() ||
        !clinicTimings.trim() ||
        !specialization.trim() ||
        !university.trim() ||
        !experience.trim())
    ) {
      showNotification(
        "Warning",
        "Please fill in all veterinarian details.",
        "warning"
      );
      return;
    }

    updateUser(userData?.user?.email || navUserData?.email, selectedUserType);
  };

  const updateUser = async (email, uType) => {
    try {
      setLoading(true);
      const requestBody = {
        email: email,
        userType: uType,
      };

      // Include additional details if the user is a veterinarian
      if (uType === "Veterinarian") {
        requestBody.clinicName = clinicName;
        requestBody.licenseNumber = licenseNumber;
        requestBody.clinicTimings = clinicTimings;
        requestBody.specialization = specialization;
        requestBody.university = university;
        requestBody.experience = experience;
      }

      const res = await fetch(
        "http://localhost:5000/userType",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
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
        navigate("/clocation", { state: uType });
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
        <div className="inline-block px-4 py-1 flex-1 border-b-2 border-gray-500 dark:border-gray-300">
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

        {/* Additional form for veterinarians */}
        {selectedUserType === "Veterinarian" && (
          <div className="flex flex-col gap-4 p-4 border rounded-md bg-gray-100 dark:bg-gray-800">
            <input
              type="text"
              placeholder="Clinic Name"
              value={clinicName}
              onChange={(e) => setClinicName(e.target.value)}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <input
              type="text"
              placeholder="License Number"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <input
              type="text"
              placeholder="Clinic Timings (e.g. 9 AM - 5 PM)"
              value={clinicTimings}
              onChange={(e) => setClinicTimings(e.target.value)}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <input
              type="text"
              placeholder="Specialization (e.g. Surgery, Dentistry)"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <input
              type="text"
              placeholder="University Studied At"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <input
              type="number"
              placeholder="Years of Experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        )}

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
