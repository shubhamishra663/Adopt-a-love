import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // Ensure you have js-cookie installed
import { AuthContext } from '../context/authContext';
import petPlaceholderImage from '../utils/cat.jpg';
import shu from '../utils/pets.jpg';





const PetsCard=({pet,index})=>{
  return(
    <div key={index} className="h-72 w-[45%] md:w-[20%] rounded-xl shadow-lg p-2">
              <div className="h-[60%] rounded-xl overflow-hidden">
                <img
                  className="h-full w-full object-cover"
                  src={shu} // Display pet image or placeholder
                  alt={pet.name || "Pet"}
                />
              </div>

              <div className="h-[40%] w-full p-3">
                <p className="text-lg font-bold">{pet.petName || "Name not available"}</p>
                <p>{pet.type || "Type not available"}</p>
                <p>{pet.gender || "Gender"} , {pet.breed || "Breed not available"}</p>
                <p>{pet.age || "Age not available"}</p>
              </div>
            </div>
  )

}






export default function Pets() {
  const [petsData, setPetsData] = useState([]);
  const { userData } = useContext(AuthContext); // Get userData from AuthContext
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);
      setError(null);
      const token = Cookies.get('token');

      try {
        const response = await axios.get(`http://localhost:5000/user-pets/${userData?.user?.email}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });

        console.log('Data after Response:', response.data);
        setPetsData(response.data.pets); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching user pets:', error.response?.data || error.message);
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, [userData]);

  useEffect(() => {
    console.log("Pets data after update:", petsData); // Log petsData after it updates

  }, [petsData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-gray-400 w-screen p-5">
      <div className="py-5 bg-blue-950">
        <p className="font-semibold text-2xl">Pets</p>
      </div>

      {petsData.length > 0 ? (
        <div className="bg-gray-300 flex flex-wrap justify-between md:justify-evenly gap-5 md:gap-14">
          {petsData.map((pet, index) => (
            <PetsCard pet={pet} index={index}/>
          ))}
        </div>
      ) : (
        <p>No pets found for this user.</p>
      )}
    </div>
  );
}
