import React, { useEffect, useState } from "react";
import axios from "axios";

export default function FindVets() {
  const [vets, setVets] = useState([]);
  const [filteredVets, setFilteredVets] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [pincode, setPincode] = useState("");

  useEffect(() => {
    const fetchVets = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get("https://adopt-a-love-backend.vercel.app/veterinarians",{
          headers: {
            'Authorization': `Bearer ${token}`
        }
        });
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
    const vetsByPincode = vets.filter((vet) => vet.pincode === pincode);
    setFilteredVets(vetsByPincode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900 dark:to-green-900 text-gray-800 dark:text-white">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-extrabold text-center mb-8">Find the Best Veterinarians</h2>
        
        <div className="flex flex-col md:flex-row justify-center gap-6 mb-8">
          <button
            onClick={findNearbyVets}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg transform hover:scale-105 hover:bg-indigo-700 transition duration-200 w-full md:w-auto"
          >
            Find Nearby Vets
          </button>
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <input
              type="text"
              placeholder="Enter Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="p-3 border-2 border-indigo-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-48"
            />
            <button
              onClick={searchByPincode}
              className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg transform hover:scale-105 hover:bg-green-700 transition duration-200 w-full md:w-auto"
            >
              Search
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVets.length > 0 ? (
            filteredVets.map((vet) => (
              <div key={vet.id} className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
                <div className="flex flex-col items-center text-center">
                  <img
                    src={vet.profile_img || "https://via.placeholder.com/150"}
                    alt={vet.name}
                    className="w-32 h-32 rounded-full border-4 border-indigo-600 object-cover mb-4"
                  />
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">{vet.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{vet.clinicName}</p>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">{vet.address}, {vet.pincode}</p>
                  {vet.distance && <p className="text-sm text-gray-500 mt-2">Distance: {vet.distance.toFixed(2)} km</p>}
                  
                  <div className="mt-4 space-x-4">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${vet.latitude},${vet.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View on Google Maps
                    </a>
                    <a
                      href={`tel:${vet.mobileNo}`}
                      className="bg-yellow-500 text-white px-6 py-3 rounded-full shadow-md transform hover:scale-105 hover:bg-yellow-600 transition duration-200 text-sm"
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
