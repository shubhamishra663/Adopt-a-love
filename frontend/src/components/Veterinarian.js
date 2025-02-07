import React, { useEffect, useState } from "react";
import axios from "axios";
import defaultAvatar from "../utils/defaultAvatar.jpg";

export default function FindVets() {
  const [vets, setVets] = useState([]);
  const [filteredVets, setFilteredVets] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [pincode, setPincode] = useState("");

  useEffect(() => {
    const fetchVets = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://adopt-a-love-backend.vercel.app/veterinarians",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setVets(response.data);
      } catch (error) {
        console.error("Error fetching vets:", error);
      }
    };

    fetchVets();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
  }, []);

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const findNearbyVets = () => {
    if (!userLocation) return;
    const nearbyVets = vets
      .map((vet) => ({
        ...vet,
        distance: getDistance(
          userLocation.latitude,
          userLocation.longitude,
          vet.latitude,
          vet.longitude
        ),
      }))
      .sort((a, b) => a.distance - b.distance);
    setFilteredVets(nearbyVets);
  };

  const searchByPincode = () => {
    const vetsByPincode = vets.filter((vet) => vet.pincode == pincode);
    setFilteredVets(vetsByPincode);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600 dark:text-indigo-400">
          Find Trusted Veterinarians
        </h2>

        <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
          <button
            onClick={findNearbyVets}
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-200"
          >
            Find Nearby Vets
          </button>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder="Enter Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={searchByPincode}
              className="px-5 py-2.5 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-200"
            >
              Search
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVets.length > 0 ? (
            filteredVets.map((vet) => (
              <div key={vet.id} className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-5">
                <div className="flex flex-col items-center text-center">
                  <img
                    src={vet.profile_img || defaultAvatar}
                    alt={vet.name}
                    className="w-24 h-24 rounded-full border-2 border-indigo-500 object-cover mb-3"
                  />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {vet.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {vet?.veterinarianDetails?.clinicName}
                  </p>
                  <p className="text-xs text-gray-500">License: {vet?.veterinarianDetails?.licenseNumber}</p>
                  <p className="text-xs text-gray-500">Specialization: {vet?.veterinarianDetails?.specialization}</p>
                  <p className="text-xs text-gray-500">Experience: {vet?.veterinarianDetails?.experience} years</p>
                  {vet.distance && (
                    <p className="text-xs text-gray-500">
                      Distance: {vet.distance.toFixed(2)} km
                    </p>
                  )}
                  <div className="mt-3 flex gap-3">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${vet.latitude},${vet.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-xs"
                    >
                      View on Maps
                    </a>
                    <a
                      href={`tel:${vet.mobileNo}`}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-full shadow-md hover:bg-yellow-600 text-xs"
                    >
                      Contact
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No veterinarians found.</p>
          )}
        </div>
      </div>
    </div>
  );
}