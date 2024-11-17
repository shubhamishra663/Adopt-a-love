import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import shu from '../utils/pets.jpg';
import PetsCard from './PetsCard';

export default function Pets() {
  const [petsData, setPetsData] = useState([]);
  const { userData } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get(`http://localhost:5000/user-pets/${userData?.user?.email}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });
        setPetsData(response.data.pets);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, [userData]);

  // if (loading) return <p className="text-center my-5">Loading...</p>;
  // if (error) return <p className="text-center my-5 text-red-500">Error: {error}</p>;

  return (
    <div className="w-screen p-5">
      {petsData.length > 0 ? (
        <div className="flex flex-wrap justify-between md:justify-evenly gap-5 md:gap-14">
          {petsData.map((pet, index) => (
            <PetsCard
              key={pet._id || index} 
              pet={pet}
              onClick={() => navigate(`/petprofile/${encodeURIComponent(pet._id)}`, { state: pet })}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No pets found for this user.</p>
      )}
    </div>
  );
}
