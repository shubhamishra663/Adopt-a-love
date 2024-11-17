// PetsCard.js
import React from 'react';
import shu from '../utils/pets.jpg';
import { useNavigate } from 'react-router-dom';


const PetsCard = ({ pet, onClick }) => {
  const navigate = useNavigate();
  // console.log(`pet?.image : ${pet?.image}`);

  const type=pet?.type;
  console.log(`type: ${type}`);
  
  

  return (
    <div 
    className={`h-72 w-[48%] md:w-[20%] rounded-xl shadow-lg p-2 cursor-pointer ${type === 'lostpet' ? 'bg-red-400' : 'bg-white dark:bg-black'}`}      
    onClick={() => {
        console.log("Card clicked", pet);
        onClick(); 
      }} 
    >
      <div className="h-[60%] rounded-xl overflow-hidden">
        <img
          className="h-full w-full object-center transition-transform duration-300 transform hover:scale-125"
          src={pet?.image}
          alt={pet.petName || "Pet"}
        />
      </div>

      <div className="h-[40%] w-full p-3 dark:text-white">
        <p className="text-lg font-bold">{pet.petName || "Name not available"}</p>
        <p className='text-sm md:text-base'>{pet.species || "Type not available"}</p>
        <p className='text-sm md:text-base'>{pet.gender || "Gender"}, {pet.age ? `${pet.age} yrs` : "Breed not available"}</p>
        <p className='text-sm md:text-base'>{pet.breed || "Age not available"}</p>
      </div>
    </div>
  );
};
export default PetsCard;