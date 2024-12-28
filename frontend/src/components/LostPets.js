import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"; 
import { AuthContext } from "../context/authContext";
import petPlaceholderImage from "../utils/cat.jpg";
import shu from "../utils/pets.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import PetsCard from "./PetsCard"; 

export default function LostPets() {
  const [lostPetsData, setLostPetsData] = useState([]);
  const { userData } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          `https://adopt-a-love-backend.vercel.app/user-lostPets/${userData?.user?.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
        setLostPetsData(response.data.lostPets);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, [userData]);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-screen">
      {lostPetsData.length > 0 ? (
        <div className="flex flex-wrap justify-between md:justify-evenly gap-5 md:gap-14 p-3">
          {lostPetsData.map((pet, index) => (
            <PetsCard
              pet={pet}
              key={index}
              onClick={() =>
                navigate(`/lostpetprofile/${encodeURIComponent(pet._id)}`, {
                  state: pet,
                })
              }
            />
          ))}
        </div>
      ) : (
        <p>No pets found for this user.</p>
      )}
    </div>
  );
}