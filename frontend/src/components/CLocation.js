import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function CLocation() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();

  // Request and fetch location
  const getLocation = () => {
    if (!navigator.geolocation) {
      setErrorMsg("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (error) => {
        setErrorMsg("Unable to fetch location.");
        console.error("Error getting location:", error);
      }
    );
  };

  // Update user location
  const updateLocation = async (latitude, longitude, email) => {
    try {
      const res = await fetch(
        "https://adopt-a-love-backend.vercel.app/update-location",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            latitude,
            longitude,
          }),
        }
      );

      if (res.ok) {
        const responseData = await res.json();
        alert("Location updated successfully!");
        navigate("/usertype", { state: { email: userData.email, name: userData.name } });
      } else {
        console.error(`Request failed with status: ${res.status}`);
        alert("Failed to update location.");
      }
    } catch (error) {
      console.error("Error updating location:", error);
      alert("Something went wrong.");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Map Section */}
      <div style={{ flex: 1, position: "relative" }}>
        {location ? (
          <MapContainer
            center={[location.latitude, location.longitude]}
            zoom={15}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[location.latitude, location.longitude]}>
              <Popup>
                You are here: {location.latitude}, {location.longitude}
              </Popup>
            </Marker>
          </MapContainer>
        ) : (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
            <p>{errorMsg || "Fetching location..."}</p>
          </div>
        )}
      </div>

      {/* Input and Submit Button */}
      <div style={{ padding: "10px", background: "#f9f9f9" }}>
        <input
          type="text"
          placeholder="Set your location"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginBottom: "10px",
          }}
        />
        <button
          onClick={() =>
            location
              ? updateLocation(location.latitude, location.longitude, userData.email)
              : alert("Location not available.")
          }
          style={{
            padding: "10px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Submit Location
        </button>
      </div>

      {/* Display User Email */}
      <div style={{ padding: "10px", background: "#e9e9e9", textAlign: "center" }}>
        <p>Email: {userData.email}</p>
      </div>
    </div>
  );
}
