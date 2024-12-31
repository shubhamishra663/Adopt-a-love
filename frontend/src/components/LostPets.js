import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import UserPetsCard from './UserPetsCard';

export default function LostPets() {
  const [lostPetsData, setLostPetsData] = useState([]);
  const { userData } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchLostPets = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://adopt-a-love-backend.vercel.app/user-lostPets/${userData?.user?.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
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

    fetchLostPets();
  }, [userData]);

  const handleUpdateLostPet = (pet) => {
    navigate(`/update-pet/${encodeURIComponent(pet._id)}`, { state: pet });
  };

  const handleViewLostPet = (pet) => {
    navigate(`/lostpetprofile/${encodeURIComponent(pet._id)}`, { state: pet });
  };

  const handleDeleteLostPet = async (petId) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('No token found. Please log in.');
        return;
      }

      await axios.delete(
        `https://adopt-a-love-backend.vercel.app/delete-lostPet/${petId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLostPetsData((prev) => prev.filter((pet) => pet._id !== petId));
      setSelectedPetId(null);
      console.log('Lost pet deleted successfully.');
    } catch (error) {
      console.error('Error deleting pet:', error.response?.data?.error || error.message);
    }
  };

  return (
    <div className="w-screen p-2 md:p-5">
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : lostPetsData.length > 0 ? (
        <div className="flex flex-wrap justify-between md:justify-evenly gap-5 md:gap-14">
          {lostPetsData.map((pet, index) => (
            <UserPetsCard
              key={pet._id || index}
              pet={pet}
              isSelected={selectedPetId === pet._id}
              onClick={() => setSelectedPetId((prev) => (prev === pet._id ? null : pet._id))}
              onUpdate={() => handleUpdateLostPet(pet)}
              onView={() => handleViewLostPet(pet)}
              onDelete={() => handleDeleteLostPet(pet._id)}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No lost pets found for this user.</p>
      )}
    </div>
  );
}
