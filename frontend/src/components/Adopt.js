import React, { useEffect, useState } from 'react';
import axios from 'axios';
import petPlaceholderImage from '../utils/cat.jpg';
import { useNavigate } from 'react-router-dom';

const PetCard = ({ pet, onClick }) => (
    <div
        className="h-80 w-[45%] md:w-[20%] rounded-xl shadow-lg p-2 cursor-pointer bg-gray-900 hover:bg-gray-800 transition-colors duration-300"
        onClick={onClick}
    >
        <div className="h-[50%] rounded-xl overflow-hidden relative">
            <img
                className="h-full w-full object-cover transition-transform duration-300 transform hover:scale-125"
                src={pet.image || petPlaceholderImage}
                alt={pet.petName || "Pet"}
            />
        </div>
        <div className="h-[50%] w-full p-3 text-gray-200">
            <p className="text-lg font-bold">{pet.petName || "Name not available"}</p>
            <p className='leading-snug'>{pet.species || "Type not available"}</p>
            <p className='leading-snug'>{pet.gender || "Gender not available"}, {pet.breed || "Breed not available"}</p>
            <p className='leading-snug'>{pet.age ? `${pet.age} yrs` : "Age not available"}</p>
            <p>by ~ <span className='font-medium'>{pet.email}</span></p>
        </div>
    </div>
);

export default function Adopt() {
    const [petsData, setPetsData] = useState([]);
    const [filteredPetData, setFilteredPetData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState({
        species: '',
        breed: '',
        color: '',
    });
    const [sortOption, setSortOption] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPets = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get('http://localhost:5000/adopt');
                setPetsData(response.data);
                setFilteredPetData(response.data);
            } catch (error) {
                console.error('Error fetching pets:', error.response?.data || error.message);
                setError(error.response?.data?.message || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPets();
    }, []);

    const getUniqueValues = (key) => {
        return [...new Set(petsData.map((pet) => pet[key]).filter(Boolean))];
    };

    useEffect(() => {
        let updatedData = petsData.filter((pet) => {
            return (
                (selectedFilters.species ? pet.species === selectedFilters.species : true) &&
                (selectedFilters.breed ? pet.breed === selectedFilters.breed : true) &&
                (selectedFilters.color ? pet.color === selectedFilters.color : true)
            );
        });

        if (sortOption === 'name') {
            updatedData.sort((a, b) => a.petName.localeCompare(b.petName));
        } else if (sortOption === 'age') {
            updatedData.sort((a, b) => a.age - b.age);
        }

        setFilteredPetData(updatedData);
    }, [selectedFilters, sortOption, petsData]);

    const handleFilterChange = (key, value) => {
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            [key]: value,
        }));
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    
    if (loading) return <p className="text-white">Loading...</p>;
    if (error) return <p className="text-red-400">Error: {error}</p>;

    return (
        <div className="bg-black min-h-screen w-screen p-5 relative">
            {/* Filter and Sort */}
            <div className="flex gap-4 mb-4">
                {/* Filter Section */}
                <div className="bg-gray-800 rounded-lg p-4 shadow-md flex-1 transition-all duration-300">
                    <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                        <h2 className="text-xl text-white">Filter Pets</h2>
                        <span className="text-white">{isFilterOpen ? '▲' : '▼'}</span>
                    </div>
                    {isFilterOpen && (
                        <div className="grid grid-cols-1 gap-4 mt-4">
                            <label className="flex flex-col text-gray-300">
                                Species:
                                <select
                                    className="bg-gray-700 text-white border border-gray-600 rounded p-2 mt-1"
                                    value={selectedFilters.species}
                                    onChange={(e) => handleFilterChange('species', e.target.value)}
                                >
                                    <option value="">All</option>
                                    {getUniqueValues('species').map((species) => (
                                        <option key={species} value={species}>{species}</option>
                                    ))}
                                </select>
                            </label>
                            <label className="flex flex-col text-gray-300">
                                Breed:
                                <select
                                    className="bg-gray-700 text-white border border-gray-600 rounded p-2 mt-1"
                                    value={selectedFilters.breed}
                                    onChange={(e) => handleFilterChange('breed', e.target.value)}
                                >
                                    <option value="">All</option>
                                    {getUniqueValues('breed').map((breed) => (
                                        <option key={breed} value={breed}>{breed}</option>
                                    ))}
                                </select>
                            </label>
                            <label className="flex flex-col text-gray-300">
                                Color:
                                <select
                                    className="bg-gray-700 text-white border border-gray-600 rounded p-2 mt-1"
                                    value={selectedFilters.color}
                                    onChange={(e) => handleFilterChange('color', e.target.value)}
                                >
                                    <option value="">All</option>
                                    {getUniqueValues('color').map((color) => (
                                        <option key={color} value={color}>{color}</option>
                                    ))}
                                </select>
                            </label>
                        </div>
                    )}
                </div>

                {/* Sort Section */}
                <div className="bg-gray-800 rounded-lg p-4 shadow-md flex-1 transition-all duration-300">
                    <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsSortOpen(!isSortOpen)}>
                        <h2 className="text-xl text-white">Sort Pets</h2>
                        <span className="text-white">{isSortOpen ? '▲' : '▼'}</span>
                    </div>
                    {isSortOpen && (
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
            </div>

            {/* Pet Cards */}
            <div className="mt-4 flex flex-wrap justify-evenly gap-5">
                {filteredPetData.length > 0 ? (
                    filteredPetData.map((pet) => (
                        <PetCard 
                            key={pet._id} 
                            pet={pet} 
                            onClick={() =>navigate(`/petprofile/${encodeURIComponent(pet._id)}`, { state: pet })}
                        />
                    ))
                ) : (
                    <p className="text-white">No pets found.</p>
                )}
            </div>
        </div>
    );
}
