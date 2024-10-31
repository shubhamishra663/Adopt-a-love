import React, { useEffect, useState } from 'react';
import axios from 'axios';
import petPlaceholderImage from '../utils/cat.jpg';
import { useNavigate } from 'react-router-dom';

const ToggleExpand = ({ title, isExpanded, toggleExpanded, children }) => (
    <div
        className={`p-3 w-full md:w-[45%] relative shadow-lg rounded-lg 
                    ${isExpanded ? 'bg-green-900 z-10' : 'bg-green-700'}`}
    >
        <button className='text-lg mb-2' onClick={toggleExpanded}>
            {title}
        </button>
        {isExpanded && children}
    </div>
);

const PetCard = ({ pet, onClick }) => (
    <div 
        className="h-80 w-[45%] md:w-[20%] rounded-xl shadow-lg p-2 cursor-pointer" 
        onClick={onClick}
    >
        <div className="h-[50%] rounded-xl overflow-hidden">
            <img
                className="h-full w-full object-cover"
                src={pet.image || petPlaceholderImage}
                alt={pet.petName || "Pet"}
            />
        </div>
        <div className="h-[50%] w-full p-3">
            <p className="text-lg font-bold">{pet.petName || "Name not available"}</p>
            <p className='leading-snug'>{pet.species || "Type not available"}</p>
            <p className='leading-snug'>{pet.gender || "Gender not available"}, {pet.breed || "Breed not available"}</p>
            <p className='leading-snug'>{pet.age ? `${pet.age} yrs` : "Age not available"}</p>
            <p>by ~ <span className='font-medium text-gray-800'>{pet.email}</span></p>
        </div>
    </div>
);

export default function Adopt() {
    const [petsData, setPetsData] = useState([]);
    const [filteredPetData, setFilteredPetData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFilterExpanded, setIsFilterExpanded] = useState(false);
    const [isSortExpanded, setIsSortExpanded] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState({
        species: '',
        breed: '',
        color: '',
    });
    const [sortOption, setSortOption] = useState('');
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="bg-gray-800 min-h-screen w-screen p-5 relative">
            {/* Filter and Sort Side by Side */}
            <div className="flex gap-4 md:flex-row flex-col">
                <ToggleExpand
                    title="Filter"
                    isExpanded={isFilterExpanded}
                    toggleExpanded={() => {
                        setIsFilterExpanded(!isFilterExpanded);
                        setIsSortExpanded(false);
                    }}
                >
                    <div className="flex flex-col gap-4 mt-2">
                        <label>
                            Species:
                            <select
                                value={selectedFilters.species}
                                onChange={(e) => handleFilterChange('species', e.target.value)}
                            >
                                <option value="">All</option>
                                {getUniqueValues('species').map((species) => (
                                    <option key={species} value={species}>{species}</option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Breed:
                            <select
                                value={selectedFilters.breed}
                                onChange={(e) => handleFilterChange('breed', e.target.value)}
                            >
                                <option value="">All</option>
                                {getUniqueValues('breed').map((breed) => (
                                    <option key={breed} value={breed}>{breed}</option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Color:
                            <select
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
                </ToggleExpand>

                <ToggleExpand
                    title="Sort"
                    isExpanded={isSortExpanded}
                    toggleExpanded={() => {
                        setIsSortExpanded(!isSortExpanded);
                        setIsFilterExpanded(false);
                    }}
                >
                    <div className="flex flex-col gap-4 mt-2">
                        <label>
                            Sort by:
                            <select value={sortOption} onChange={handleSortChange}>
                                <option value="">Select...</option>
                                <option value="name">Name</option>
                                <option value="age">Age</option>
                            </select>
                        </label>
                    </div>
                </ToggleExpand>
            </div>

            {/* Pet Cards */}
            <div className="mt-4">
                {filteredPetData.length > 0 ? (
                    <div className="bg-gray-300 flex flex-wrap justify-between md:justify-evenly gap-5 md:gap-14">
                        {filteredPetData.map((pet) => (
                            <PetCard 
                                key={pet._id} 
                                pet={pet} 
                                onClick={() => navigate(`/petprofile/${pet._id}`)} // Navigate to pet profile
                            />
                        ))}
                    </div>
                ) : (
                    <p>No pets found.</p>
                )}
            </div>
        </div>
    );
}
