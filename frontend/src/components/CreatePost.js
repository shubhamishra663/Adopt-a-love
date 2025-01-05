import React, { useContext, useState, useRef } from "react";
import {
  faPlus,
  faImage,
  faUserTag,
  faLocationDot,
  faFaceSmile,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const { userData, navUserData } = useContext(AuthContext);
  const userName = (navUserData?.name || userData?.user?.name)?.split(" ");
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [postText, setPostText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const textareaRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => setSelectedImage(null);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(",");
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!postText.trim()) {
      setError("Post content cannot be empty.");
      return;
    }

    const formData = new FormData();
    formData.append("text", postText.trim());
    formData.append("email", userData?.user?.email || navUserData?.email);
    if (selectedImage) {
      const file = dataURLtoFile(selectedImage, "uploaded-image.jpg");
      formData.append("image", file);
    }

    const token = localStorage.getItem("token");

    try {
      setError("");
      setLoading(true);
      const response = await axios.post(
        "https://adopt-a-love-backend.vercel.app/createPost",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setPostText("");
        clearImage();
        alert("Post created successfully!");
        navigate(`/${userData?.user?.email}`);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 p-4">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg overflow-hidden max-h-screen">
        <div className="p-6 border-b border-gray-300">
          <h1 className="text-2xl font-bold text-center">Create Post</h1>
        </div>
        <form
          className="p-4 space-y-6 flex flex-col h-full max-h-[calc(100vh-64px)]"
          onSubmit={handleSubmit}
        >
          <div className="flex-1 space-y-6 overflow-y-scroll custom-scrollbar scroll-p-32">
            <textarea
              style={{ overflow: "hidden" }}
              autoFocus
              ref={textareaRef}
              className="w-full text-2xl rounded-lg border-gray-300 resize-none focus:outline-none"
              placeholder={`What's on your mind, ${userName?.[0] || "User"}?`}
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              onInput={adjustTextareaHeight}
            ></textarea>

            {showImageUpload && (
              <div className="p-2 border border-gray-300 rounded-lg">
                {selectedImage ? (
                  <div className="relative">
                    <img
                      src={selectedImage}
                      alt="Selected"
                      className="w-full object-cover rounded-lg max-h-max"
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      onClick={clearImage}
                      aria-label="Remove image"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor="imageInput"
                    className="flex flex-col items-center justify-center bg-gray-100 border border-dashed border-gray-400 p-4 rounded-lg cursor-pointer hover:bg-gray-200"
                  >
                    <FontAwesomeIcon
                      icon={faPlus}
                      className="text-2xl text-gray-500"
                    />
                    <span className="text-sm text-gray-500">
                      Add photos/videos
                    </span>
                    <input
                      type="file"
                      id="imageInput"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                )}
              </div>
            )}
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex items-center justify-between border border-gray-300 p-3 rounded-lg">
            <p className="text-sm font-medium text-gray-700">Add to your post:</p>
            <div className="flex space-x-4">
              <FontAwesomeIcon
                icon={faImage}
                className="text-green-500 cursor-pointer hover:text-green-600"
                onClick={() => setShowImageUpload(!showImageUpload)}
                aria-label="Add image"
              />
              <FontAwesomeIcon
                icon={faUserTag}
                className="text-blue-500 cursor-pointer hover:text-blue-600"
                aria-label="Tag people"
              />
              <FontAwesomeIcon
                icon={faFaceSmile}
                className="text-yellow-400 cursor-pointer hover:text-yellow-500"
                aria-label="Add emoji"
              />
              <FontAwesomeIcon
                icon={faLocationDot}
                className="text-red-600 cursor-pointer hover:text-red-700"
                aria-label="Add location"
              />
            </div>
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200 ${
              loading ? "cursor-no-drop opacity-50 pointer-events-none" : "cursor-pointer"
            }`}
          >
            {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Post"}
          </button>
        </form>
      </div>
    </div>
  );
}
