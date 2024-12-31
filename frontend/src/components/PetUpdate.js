import React, { useContext, useState, useEffect, useMemo } from "react";
import { AuthContext } from "../context/authContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ReactNotifications, Store } from "react-notifications-component";

function PetUpdate() {
  const { petid } = useParams();
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
  const petView = location.state || {}; // pet data passed via location state

  const type = petView?.type === "pet" ? "pet" : "lostpet"; // set the type (pet or lostpet)

  useEffect(() => {
    if (petView) {
      setFormData({
        petName: petView.petName || "",
        ownerName: petView.ownerName || "",
        age: petView.age || "",
        species: petView.species || "",
        breed: petView.breed || "",
        gender: petView.gender || "",
        weight: petView.weight || "",
        color: petView.color || "",
        size: petView.size || "",
        vaccinated: petView.vaccinated || false,
        description: petView.description || "",
        image: null,
        state: petView.state || "",
        city: petView.city || "",
        mobileNo: petView.mobileNo || "",
        energy: petView.energy || "",
        status: petView.status || false,
      });
    }
  }, [petView]);

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

    try {
      const data = new FormData();
      data.append("image", formData.image);
      data.append("email", userData?.user?.email);
      data.append("ownerName", userData?.user?.name);
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

      const token = localStorage.getItem("token");

      const res = await fetch(
        `${
          type === "pet"
            ? `https://adopt-a-love-backend.vercel.app/petUpdate/${petid}`
            : `https://adopt-a-love-backend.vercel.app/lostPetUpdate/${petid}`
        }`,
        {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
          body: data,
        }
      );

      const responseData = await res.json();
      if (res.ok) {
        setLoading(false);
        showNotification("Success", "Pet details updated successfully", "success");
        navigate(`/${userData?.user?.email}`);
      } else {
        setLoading(false);
        showNotification("Error", responseData.message || "Failed to update pet.", "danger");
      }
    } catch (error) {
      setLoading(false);
      showNotification("Error", error.message || "An error occurred. Please try again later.", "danger");
    }
  };

  const speciesOptions = useMemo(() => ["Dog", "Cat", "Bird", "Other"], []);
  const genderOptions = useMemo(() => ["Male", "Female"], []);
  const sizeOptions = useMemo(() => ["Small", "Medium", "Large"], []);
  const energyOptions = useMemo(() => ["Calm", "Medium", "Active"], []);

  const renderInputField = (label, name, type = "text", options) => (
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
          required
        />
      )}
    </div>
  );

  return (
    <div className="w-screen bg-black md:p-20">
      <ReactNotifications />
      <div className="w-full sm:w-[70%] lg:w-[50%] mx-auto p-6 bg-gray-500 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">{type === "pet" ? "Update Pet for Adoption" : "Update Lost Pet"}</h2>
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

          <div className="flex items-center">
            <input
              type="checkbox"
              name="status"
              checked={formData.status}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-sm">{type === "pet" ? "Pet Adopted" : "Pet Found"}</label>
          </div>

          <div>
            <label className="block text-sm font-medium">{type === "pet" ? "Description" : "Last seen"}</label>
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
            disabled={loading}
            className={`w-full px-4 py-2 rounded ${loading ? "cursor-no-drop opacity-50 pointer-events-none" : "cursor-pointer"} bg-blue-500 text-white font-semibold hover:bg-blue-600 `}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PetUpdate;
