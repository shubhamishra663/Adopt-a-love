import React, { useState, useEffect, useContext } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

// Fix for Leaflet's default icon URLs
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const LocationUpdater = ({ location }) => {
  const map = useMap();
  useEffect(() => {
    if (location) {
      map.setView([location.latitude, location.longitude], 15);
    }
  }, [location, map]);

  return null;
};

const LocationComponent = () => {
  const { theme } = useContext(AuthContext);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [pincode, setPincode] = useState("");
  const [loading,setLoading]=useState(false)
  const [inputPincode, setInputPincode] = useState("");
  const { isAuthenticated, showNotification, userData, navUserData } =
    useContext(AuthContext);

  const navigate = useNavigate();


  const getLocation = () => {
    if (!navigator.geolocation) {
      setErrorMsg("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        fetchPincode(latitude, longitude);
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setErrorMsg(
              "Location access denied. Please enable it in your browser settings."
            );
            break;
          case error.POSITION_UNAVAILABLE:
            setErrorMsg(
              "Location information is unavailable. Try again later."
            );
            break;
          case error.TIMEOUT:
            setErrorMsg("Location request timed out. Please try again.");
            break;
          default:
            setErrorMsg("An unknown error occurred.");
        }
        console.error("Error getting location:", error);
      },
      { timeout: 10000 }
    );
  };

  const fetchPincode = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        "https://nominatim.openstreetmap.org/reverse",
        {
          params: {
            lat: latitude,
            lon: longitude,
            format: "json",
          },
        }
      );

      const address = response.data.address;
      if (address && address.postcode) {
        setPincode(address.postcode);
      } else {
        setPincode("Pincode not found");
      }
    } catch (error) {
      console.error("Error fetching pincode:", error);
      setPincode("Error fetching pincode");
    }
  };

  const fetchLocationFromPincode = async () => {
    try {
      const response = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            postalcode: inputPincode,
            countrycodes: "in",
            format: "json",
          },
        }
      );

      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setLocation({ latitude: parseFloat(lat), longitude: parseFloat(lon) });
      } else {
        setErrorMsg("No location found for the entered pincode.");
      }
    } catch (error) {
      console.error("Error fetching location from pincode:", error);
      setErrorMsg("Error fetching location. Please try again.");
    }
  };

  const handleMarkerDrag = (event) => {
    const { lat, lng } = event.target.getLatLng();
    setLocation({ latitude: lat, longitude: lng });
    fetchPincode(lat, lng);
  };

  useEffect(() => {
    getLocation();
  }, []);

  // Update user location
  const updateLocation = async (latitude, longitude, email) => {
    try {
        setLoading(true)
      const res = await fetch(
        "https://adopt-a-love-backend.vercel.app/update-location",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            latitude: latitude,
            longitude: longitude,
          }),
        }
      );

      if (res.ok) {
        const responseData = await res.json();
        navigate(`/${userData?.user?.email || navUserData?.email}`);
      } else {
        console.log(`Request failed with status: ${res.status}`);
      }
    } catch (error) {
      console.log("Error updating location:", error);
    }
  };

  const locationSubmit = () => {
    updateLocation(
      location.latitude,
      location.longitude,
      userData?.user?.email || navUserData.email
    );
  };

  return (
    <div className="bg-[#f5f0ff] dark:bg-black p-5">
      <p className="text-xl md:text-2xl font-bold text-center pb-5">
        User Location
      </p>

      {!location && !errorMsg && <p>Fetching your location...</p>}
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
        {/* Input and Search Button Section */}
        <div className="flex w-full md:w-auto bg-green-400 h-10 border-black dark:border-[#444] rounded-lg overflow-hidden">
          <input
            type="text"
            placeholder="Enter pincode"
            value={inputPincode}
            onChange={(e) => setInputPincode(e.target.value)}
            className="flex-grow h-full p-2 bg-slate-300 dark:bg-[#333] text-black dark:text-white focus:outline-none"
          />
          <button
            className="px-4 text-white bg-black dark:bg-[#444] h-full border-l-2 border-black dark:border-[#333] hover:bg-gray-700 dark:hover:bg-gray-600"
            onClick={fetchLocationFromPincode}
          >
            Search
          </button>
        </div>

        {/* Location Details Section */}
        {location && (
          <div className="w-full md:w-auto flex flex-col md:flex-row items-start md:items-center bg-purple-300 p-4 space-y-2 md:space-y-0 md:space-x-6 rounded-lg shadow-md">
            <p className="text-sm md:text-base">
              <strong>Latitude:</strong> {location.latitude}
            </p>
            <p className="text-sm md:text-base">
              <strong>Longitude:</strong> {location.longitude}
            </p>
            <p className="text-sm md:text-base">
              <strong>Pincode:</strong> {pincode}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button onClick={locationSubmit} className={`py-2 px-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded shadow-md ${
              loading
                ? "cursor-no-drop opacity-50 pointer-events-none"
                : "cursor-pointer"
            }`}>
          {loading?"Submitting...":"Submit"}
        </button>
      </div>

      {location && (
        <MapContainer
          center={[location.latitude, location.longitude]}
          zoom={15}
          className="bg-red-500"
          style={{ height: "500px", width: "100%", margin: "20px auto" }}
        >
          <TileLayer
            className="bg-red-500"
            url={
              theme === "dark"
                ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            }
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker
            position={[location.latitude, location.longitude]}
            draggable={true}
            eventHandlers={{
              dragend: handleMarkerDrag,
            }}
          />
          <LocationUpdater location={location} />
        </MapContainer>
      )}
    </div>
  );
};

export default LocationComponent;
