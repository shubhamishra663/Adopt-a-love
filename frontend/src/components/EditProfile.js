import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function ProfileEdit({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNo: "",
    profile_img: null,
    cover_img: null,
  });
  const [profilePreview, setProfilePreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" })); 
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    setFormData({ ...formData, [name]: file });

    const previewUrl = URL.createObjectURL(file);
    if (name === "profile_img") {
      setProfilePreview(previewUrl);
    } else if (name === "cover_img") {
      setCoverPreview(previewUrl);
    }
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required.";
    if (!formData.mobileNo.trim()) newErrors.mobileNo = "Mobile Number is required.";
    if (!formData.profile_img) newErrors.profile_img = "Profile image is required.";
    if (!formData.cover_img) newErrors.cover_img = "Cover image is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return; 

    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("mobileNo", formData.mobileNo);
    data.append("profile_img", formData.profile_img);
    data.append("cover_img", formData.cover_img);

    try {
      const response = await fetch("https://adopt-a-love-backend.vercel.app/profile-edit", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, 
        },
        body: data,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Profile updated:", result);

        setFormData({
          fullName: "",
          mobileNo: "",
          profile_img: null,
          cover_img: null,
        });
        setProfilePreview(null);
        setCoverPreview(null);
      } else {
        console.error("Error updating profile:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className="relative w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>

        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Edit Your Profile
        </h2>

        <div className="flex flex-col items-center gap-6 mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 shadow-md">
            {profilePreview ? (
              <img
                src={profilePreview}
                alt="Profile Preview"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-gray-400">
                No Image
              </div>
            )}
          </div>
          <label className="bg-blue-500 text-white py-2 px-4 rounded-full flex items-center gap-2 cursor-pointer hover:bg-blue-600">
            <FontAwesomeIcon icon={faUpload} />
            <span>Upload Profile Picture</span>
            <input
              type="file"
              name="profile_img"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          {errors.profile_img && <p className="text-red-500">{errors.profile_img}</p>}

          <div className="w-full h-32 rounded-md overflow-hidden border-2 border-gray-300 shadow-md">
            {coverPreview ? (
              <img
                src={coverPreview}
                alt="Cover Preview"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-gray-400">
                No Cover Image
              </div>
            )}
          </div>
          <label className="bg-blue-500 text-white py-2 px-4 rounded-full flex items-center gap-2 cursor-pointer hover:bg-blue-600">
            <FontAwesomeIcon icon={faUpload} />
            <span>Upload Cover Picture</span>
            <input
              type="file"
              name="cover_img"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          {errors.cover_img && <p className="text-red-500">{errors.cover_img}</p>}
        </div>

        <div className="flex flex-col items-center gap-4 mb-6">
          <input
            type="text"
            name="fullName"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleInputChange}
          />
          {errors.fullName && <p className="text-red-500">{errors.fullName}</p>}

          <input
            type="text"
            name="mobileNo"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Mobile No"
            value={formData.mobileNo}
            onChange={handleInputChange}
          />
          {errors.mobileNo && <p className="text-red-500">{errors.mobileNo}</p>}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
