import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import UserPetsCard from './UserPetsCard';


export default function Pets() {
  const [petsData, setPetsData] = useState([]);
  const { userData } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log("getting pets");
        
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://adopt-a-love-backend.vercel.app/user-pets/${userData?.user?.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
            },
          }
        );
        console.log(response);

        setPetsData(response.data.pets);
        console.log(response.data.pets);
        
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, [userData]);

  const handleUpdatePet = (pet) => {
    navigate(`/update-pet/${encodeURIComponent(pet._id)}`, { state: pet });
  };

  const handleViewPet = (pet) => {
    navigate(`/petprofile/${encodeURIComponent(pet._id)}`, { state: pet });
  };

  const handleDeletePet = async (petId) => {
    try {
      const token = localStorage.getItem('token');
  
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }
  
      await axios.delete(
        `https://adopt-a-love-backend.vercel.app/delete-pet/${petId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

  
      setPetsData((prev) => prev.filter((pet) => pet._id !== petId));
      setSelectedPetId(null); // Reset the selected pet ID if applicable
      console.log("Pet deleted successfully.");
    } catch (error) {
      console.error("Error deleting pet:", error.response?.data?.error || error.message);
    }
  };
  

  return (
    <div className="w-screen p-2 md:p-5">
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : petsData.length > 0 ? (
        <div className="flex flex-wrap justify-between md:justify-evenly gap-5 md:gap-14">
          {petsData.map((pet, index) => (
            <UserPetsCard
              key={pet._id || index}
              pet={pet}
              isSelected={selectedPetId === pet._id}
              onClick={() => setSelectedPetId((prev) => (prev === pet._id ? null : pet._id))}
              onUpdate={() => handleUpdatePet(pet)}
              onView={() => handleViewPet(pet)}
              onDelete={() => handleDeletePet(pet._id)}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No pets found for this user.</p>
      )}
    </div>
  );
}
