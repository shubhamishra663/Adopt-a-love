import React, { useContext, useState, useCallback, useMemo } from "react";
import { AuthContext } from "../context/authContext";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactNotifications, Store } from 'react-notifications-component';

function PetForm() {
  const { userData, showNotification } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    petName: "",
    ownerName: "",
    age: "",
    species: "",
    breed: "",
    gender: "",
    weight: "",
    color: "",
    size: "",
    vaccinated: false,
    description: "",
    image: null,
    state: "",
    city: "",
    mobileNo: "",
    energy: "",
    status: false,
  });
  const navigate = useNavigate();

  const location = useLocation();
  const petView = location.state || {};
  console.log(`Petview : ${petView}`);

  const type = petView === "pets" ? "pet" : "lostpet";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageUpload = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);

    try {
      const data = new FormData();
      data.append("image", formData.image);
      data.append("email", userData.user.email);
      data.append("ownerName", userData.user.name);
      data.append("petName", formData.petName);
      data.append("type", type);
      data.append("age", formData.age);
      data.append("species", formData.species);
      data.append("breed", formData.breed);
      data.append("gender", formData.gender);
      data.append("weight", formData.weight);
      data.append("color", formData.color);
      data.append("size", formData.size);
      data.append("vaccinated", formData.vaccinated);
      data.append("description", formData.description);
      data.append("state", formData.state);
      data.append("city", formData.city);
      data.append("mobileNo", formData.mobileNo);
      data.append("energy", formData.energy);
      data.append("status", formData.status);

      console.log(`New Formdata: ${formData}`);

      const res = await fetch(
        `${
          petView === "pets"
            ? "https://adopt-a-love-backend.vercel.app/petAdd"
            : "https://adopt-a-love-backend.vercel.app/lostPetAdd"
        }`,
        {
          method: "POST",
          body: data,
        }
      );

      const responseData = await res.json();
      if (res.ok) {
        console.log(responseData);
        setLoading(false);
        showNotification("Success", "Pet added successful", "success");
        navigate(`/${userData?.user?.email}`);
      } else {
        console.error(
          `Request failed with status: ${res.status}`,
          responseData.message
        );
        showNotification(
          "Error",
          responseData.message || "Failed to add pet. Please try again later.",
          "danger"
        );
      }
    } catch (error) {
      console.error("Error updating Pets:", error);
      showNotification(
        "Error",
        error.message ||
          "An error occurred while adding the pet. Please try again later.",
        "danger"
      );
    }
  };

  // Options for select fields, memoized for optimization
  const speciesOptions = useMemo(() => ["Dog", "Cat", "Bird", "Other"], []);
  const genderOptions = useMemo(() => ["Male", "Female"], []);
  const sizeOptions = useMemo(() => ["Small", "Medium", "Large"], []);
  const energyOptions = useMemo(() => ["Calm", "Medium", "Active"], []);

  // Helper function for input rendering to reduce repetition
  const renderInputField = useCallback(
    (label, name, type = "text", options) => (
      <div>
        <label className="block text-sm font-medium">{label}</label>
        {type === "select" ? (
          <select
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select {label}</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required={
              name !== "breed" && name !== "color" && name !== "description"
            }
          />
        )}
      </div>
    ),
    [formData, handleChange]
  );

  return (
    <div className="w-screen bg-black md:p-20">
      <ReactNotifications />

      <div className="w-full sm:w-[70%] lg:w-[50%] mx-auto p-6 bg-gray-500 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">
          {petView === "pets" ? "Add Pet for Adoption" : "Add Lost Pet"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {renderInputField("Pet Name", "petName")}
          {renderInputField("Age (in years)", "age", "number")}
          {renderInputField("Species", "species", "select", speciesOptions)}
          {renderInputField("Breed", "breed")}
          {renderInputField("Gender", "gender", "select", genderOptions)}
          {renderInputField("Weight (in kg)", "weight", "number")}
          {renderInputField("Color", "color")}
          {renderInputField("Size", "size", "select", sizeOptions)}
          {renderInputField("State", "state")}
          {renderInputField("City", "city")}
          {renderInputField("Mobile No", "mobileNo")}
          {renderInputField("Energy", "energy", "select", energyOptions)}

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
            <label className="block text-sm font-medium">
              {petView === "pets" ? "Description" : "Last seen"}
            </label>
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
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 rounded ${
              loading
                ? "cursor-no-drop opacity-50 pointer-events-none"
                : "cursor-pointer"
            } bg-blue-500 text-white font-semibold hover:bg-blue-600 `}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PetForm;