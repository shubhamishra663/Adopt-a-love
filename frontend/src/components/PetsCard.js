// PetsCard.js
import React from 'react';
import shu from '../utils/pets.jpg';
import { useNavigate } from 'react-router-dom';


const PetsCard = ({ pet, onClick }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="h-72 w-[46%] md:w-[20%] rounded-xl shadow-lg md:p-2 cursor-pointer bg-white dark:bg-black" 
      onClick={() => {
        console.log("Card clicked", pet);
        onClick(); // Calls the onClick function passed from LostPets
      }} // Make sure onClick is attached here
    >
      <div className="h-[60%] rounded-xl overflow-hidden">
        <img
          className="h-full w-full object-center transition-transform duration-300 transform hover:scale-125"
          src={pet?.image || shu}
          alt={pet.petName || "Pet"}
        />
      </div>

      <div className="h-[40%] w-full p-3 dark:text-white">
        <p className="text-lg font-bold">{pet.petName || "Name not available"}</p>
        <p>{pet.species || "Type not available"}</p>
        <p>{pet.gender || "Gender"}, {pet.breed || "Breed not available"}</p>
        <p>{pet.age ? `${pet.age} yrs` : "Age not available"}</p>
      </div>
    </div>
  );
};
export default PetsCard;
