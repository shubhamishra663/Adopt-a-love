import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader.js";

const PetsCard = ({ pet, onClick }) => {
  return (
    <div
      className={`h-72 w-full  rounded-xl shadow-lg p-2 cursor-pointer ${
        pet.type === 'lostpet' ? 'bg-red-400' : 'bg-white dark:bg-black'
      }`}
      onClick={() => {
        console.log("Card clicked", pet);
        onClick();
      }}
    >
      <div className="h-[60%] rounded-xl overflow-hidden">
        <img
          className="h-full w-full object-cover transition-transform duration-300 transform hover:scale-125"
          src={pet.image || '/placeholder.svg'}
          alt={pet.petName || "Pet"}
        />
      </div>

      <div className="h-[40%] w-full p-3 dark:text-white">
        <p className="text-lg font-bold">{pet.petName || "Name not available"}</p>
        <p className='text-sm md:text-base'>{pet.species || "Type not available"}</p>
        <p className='text-sm md:text-base'>{pet.gender || "Gender"}, {pet.age ? `${pet.age} yrs` : "Age not available"}</p>
        <p className='text-sm md:text-base'>{pet.breed || "Breed not available"}</p>
      </div>
    </div>
  );
};

const ErrorMessage = ({ message }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

const FilterSection = ({ isOpen, setIsOpen, selectedFilters, handleFilterChange, getUniqueValues }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-md flex-1 transition-all duration-300">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h2 className="text-xl text-white">Filter Pets</h2>
        <span className="text-white" aria-hidden="true">{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <div className="grid grid-cols-1 gap-4 mt-4">
          {["species", "breed", "color"].map((filterKey) => (
            <label key={filterKey} className="flex flex-col text-gray-300">
              {filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}:
              <select
                className="bg-gray-700 text-white border border-gray-600 rounded p-2 mt-1"
                value={selectedFilters[filterKey]}
                onChange={(e) => handleFilterChange(filterKey, e.target.value)}
              >
                <option value="">All</option>
                {getUniqueValues(filterKey).map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const SortSection = ({ isOpen, setIsOpen, sortOption, handleSortChange }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-md flex-1 transition-all duration-300">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h2 className="text-xl text-white">Sort Pets</h2>
        <span className="text-white" aria-hidden="true">{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <label className="flex flex-col text-gray-300 mt-4">
          Sort by:
          <select
            className="bg-gray-700 text-white border border-gray-600 rounded p-2 mt-1"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="">Select...</option>
            <option value="name">Name</option>
            <option value="age">Age</option>
          </select>
        </label>
      )}
    </div>
  );
};

function Adopt() {
  const [petsData, setPetsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    species: "",
    breed: "",
    color: "",
  });
  const [sortOption, setSortOption] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const navigate = useNavigate();

  const fetchPets = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("https://adopt-a-love-backend.vercel.app/adopt");
      const pets = response.data.pets || [];
      const lostPets = response.data.lostPets || [];

      const combinedData = [
        ...pets.map((pet) => ({ ...pet, type: "pet" })),
        ...lostPets.map((pet) => ({ ...pet, type: "lostpet" })),
      ];

      setPetsData(combinedData);
    } catch (error) {
      console.error("Error fetching pets:", error.response?.data || error.message);
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  const getUniqueValues = useCallback((key) => {
    return [...new Set(petsData.map((pet) => pet[key]).filter(Boolean))];
  }, [petsData]);

  const filteredPetData = useMemo(() => {
    let updatedData = petsData.filter((pet) => {
      return (
        (selectedFilters.species ? pet.species === selectedFilters.species : true) &&
        (selectedFilters.breed ? pet.breed === selectedFilters.breed : true) &&
        (selectedFilters.color ? pet.color === selectedFilters.color : true)
      );
    });

    if (sortOption === "name") {
      updatedData.sort((a, b) => a.petName.localeCompare(b.petName));
    } else if (sortOption === "age") {
      updatedData.sort((a, b) => a.age - b.age);
    }

    return updatedData;
  }, [selectedFilters, sortOption, petsData]);

  const handleFilterChange = useCallback((key, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  }, []);

  const handleSortChange = useCallback((e) => {
    setSortOption(e.target.value);
  }, []);

  const handlePetClick = useCallback((pet) => {
    if (pet.type === "pet") {
      navigate(`/petprofile/${encodeURIComponent(pet._id)}`);
    } else if (pet.type === "lostpet") {
      navigate(`/lostpetprofile/${encodeURIComponent(pet._id)}`);
    }
  }, [navigate]);

  return (
    <div className="bg-[#f5f5f5] dark:bg-black min-h-screen w-full">
      <div className="z-50 bg-white dark:bg-black">
        <div className="flex gap-4 p-4 border-b-[1px] dark:border-[#565656]">
          <FilterSection
            isOpen={isFilterOpen}
            setIsOpen={setIsFilterOpen}
            selectedFilters={selectedFilters}
            handleFilterChange={handleFilterChange}
            getUniqueValues={getUniqueValues}
          />
          <SortSection
            isOpen={isSortOpen}
            setIsOpen={setIsSortOpen}
            sortOption={sortOption}
            handleSortChange={handleSortChange}
          />
        </div>
      </div>

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-1 md:p-3 bg-white dark:bg-[#121212] rounded-t-lg">
          {filteredPetData.length > 0 ? (
            filteredPetData.map((pet) => (
              <PetsCard
                key={pet._id}
                pet={pet}
                onClick={() => handlePetClick(pet)}
              />
            ))
          ) : (
            <p className="text-gray-700 dark:text-gray-300">No pets found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Adopt;
