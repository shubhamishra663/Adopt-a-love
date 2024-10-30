import React, { useEffect, useState } from 'react';
import axios from 'axios';
import petPlaceholderImage from '../utils/cat.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const PetCard = ({ pet }) => {
    return (
        <div className="h-80 w-[45%] md:w-[20%] rounded-xl shadow-lg p-2">
            <div className="h-[55%] rounded-xl overflow-hidden">
                <img
                    className="h-full w-full object-cover"
                    src={pet.image || petPlaceholderImage}
                    alt={pet.petName || "Pet"}
                />
            </div>

            <div className="h-[45%] w-full p-3">
                <p className="text-lg font-bold">{pet.petName || "Name not available"}</p>
                <p className='leading-snug'>{pet.species || "Type not available"}</p>
                <p className='leading-snug'>{pet.gender || "Gender not available"}, {pet.breed || "Breed not available"}</p>
                <p className='leading-snug'>{pet.age ? `${pet.age} yrs` : "Age not available"}</p>
                <p>by ~ <span className='font-medium text-gray-800'>{pet.email}</span></p>
            </div>
        </div>
    );
};

export default function Adopt() {
    const [petsData, setPetsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPets = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`http://localhost:5000/adopt`);
                console.log('Data after Response:', response.data);
                setPetsData(response.data); // Adjust according to backend response structure
            } catch (error) {
                console.error('Error fetching pets:', error.response?.data || error.message);
                setError(error.response?.data?.message || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPets();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="bg-gray-800 min-h-screen w-screen p-5">
            <div className='bg-green-700 p-3'>
                <p className='text-lg'>Filter Sort</p>
            </div>

            <div>
                {petsData.length > 0 ? (
                    <div className="bg-gray-300 flex flex-wrap justify-between md:justify-evenly gap-5 md:gap-14">
                        {petsData.map((pet, index) => (
                            <PetCard key={index} pet={pet} />
                        ))}
                    </div>
                ) : (
                    <p>No pets found.</p>
                )}
            </div>
        </div>
    );
}
