import React from 'react'

const UserPetsCard = ({ pet, onClick, isSelected, onUpdate, onDelete, onView }) => {
    const type = pet?.type;
  
    return (
      <div
        className={`relative h-72 w-[47%] md:w-[20%] rounded-xl shadow-lg p-2 cursor-pointer ${
          type === 'lostpet' ? 'bg-red-400' : 'bg-white dark:bg-black'
        }`}
        onClick={onClick}
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
          <p className="text-sm md:text-base">{pet.species || "Type not available"}</p>
          <p className="text-sm md:text-base">{pet.gender || "Gender"}, {pet.age ? `${pet.age} yrs` : "Age not available"}</p>
          <p className="text-sm md:text-base">{pet.breed || "Breed not available"}</p>
        </div>
  
        {isSelected && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 text-white rounded-xl z-10 gap-4">
            <button
              className="bg-blue-500 w-28 h-10 text-sm px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
              onClick={(e) => {
                e.stopPropagation();
                onUpdate();
              }}
            >
              Update
            </button>
            <button
              className="bg-green-500 w-28 h-10 text-sm px-4 py-2 rounded-md shadow-md hover:bg-green-600"
              onClick={(e) => {
                e.stopPropagation();
                onView();
              }}
            >
              View
            </button>
            <button
              className="bg-red-500 w-28 h-10 text-sm px-4 py-2 rounded-md shadow-md hover:bg-red-600"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    );
  };

  export default UserPetsCard;
