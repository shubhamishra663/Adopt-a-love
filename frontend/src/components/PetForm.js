import React, { useContext, useState, useCallback, useMemo } from 'react';
import { AuthContext } from '../context/authContext';

function PetForm() {
    const { userData } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        petName: '',
        age: '',
        species: '',
        breed: '',
        gender: '',
        weight: '',
        color: '',
        size: '',
        vaccinated: false,
        description: '',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleImageUpload = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/petAdd', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    email: userData.user.email,
                }),
            });

            const responseData = await res.json();
            if (res.ok) {
                console.log(responseData);
            } else {
                console.error(`Request failed with status: ${res.status}`, responseData.message);
            }
        } catch (error) {
            console.error('Error updating Pets:', error);
        }
    };

    // Options for select fields, memoized for optimization
    const speciesOptions = useMemo(() => ['Dog', 'Cat', 'Bird', 'Other'], []);
    const genderOptions = useMemo(() => ['Male', 'Female'], []);
    const sizeOptions = useMemo(() => ['Small', 'Medium', 'Large'], []);

    // Helper function for input rendering to reduce repetition
    const renderInputField = useCallback((label, name, type = 'text', options) => (
        <div>
            <label className="block text-sm font-medium">{label}</label>
            {type === 'select' ? (
                <select
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                >
                    <option value="">Select {label}</option>
                    {options.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            ) : (
                <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required={name !== 'breed' && name !== 'color' && name !== 'description'}
                />
            )}
        </div>
    ), [formData, handleChange]);

    return (
        <div className="w-screen bg-red-950 md:p-20">
            <div className="w-full sm:w-[70%] lg:w-[50%] mx-auto p-6 bg-gray-500 shadow-md rounded-md">
                <h2 className="text-2xl font-bold mb-4">Add Pet for Adoption</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {renderInputField('Pet Name', 'petName')}
                    {renderInputField('Age (in years)', 'age', 'number')}
                    {renderInputField('Species', 'species', 'select', speciesOptions)}
                    {renderInputField('Breed', 'breed')}
                    {renderInputField('Gender', 'gender', 'select', genderOptions)}
                    {renderInputField('Weight (in kg)', 'weight', 'number')}
                    {renderInputField('Color', 'color')}
                    {renderInputField('Size', 'size', 'select', sizeOptions)}

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="vaccinated"
                            checked={formData.vaccinated}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        <label className="text-sm">Vaccinated</label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            rows="4"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Upload Image</label>
                        <input
                            type="file"
                            onChange={handleImageUpload}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PetForm;
