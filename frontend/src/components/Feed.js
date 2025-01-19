import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment, faShare } from "@fortawesome/free-solid-svg-icons";
import defaultAvatar from "../utils/defaultAvatar.jpg";


const Feed = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [liked, setLiked] = useState(false);


  // Fetch posts from the API
  const fetchPosts = useCallback(async () => {
    try {
      const response = await fetch("https://adopt-a-love-backend.vercel.app/posts");
      console.log(response.data);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      
      
      setPosts(data.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      alert("Unable to fetch posts. Please try again later.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const openPet = (petId) => {
    navigation.navigate(`petprofile/:petid`)
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchPosts();
  };

  const renderPost = (item) => (
    <div className="bg-white dark:bg-[#252728] p-4 md:rounded-lg shadow-md mb-4">
      {/* Header */}
      <div className="flex items-center mb-4">
        <img
          src={item.user.profile_img || defaultAvatar}
          alt="Profile"
          className="w-10 h-10 rounded-full  object-cover"
        />
        <div className="ml-4">
          <p className="text-black dark:text-white  font-bold">{item.email}</p>
          <p className="text-gray-400 text-xs">{item.createdAt}</p>
        </div>
      </div>

      {/* Post Body */}
      <pre className="text-black dark:text-gray-300 mb-4 text-wrap">{item.text}</pre>
      {item.image && (
        <div className="mb-4 cursor-pointer" onClick={() => openPet(item._id)}>
          <img src={item.image} alt="Post" className="w-full h-80 object-cover rounded-lg" />
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-around border-t border-gray-700 pt-2">
        <button className="flex items-center space-x-2 text-gray-400 hover:text-gray-200">
          <FontAwesomeIcon icon={faThumbsUp} size="lg" />
          <span>Like {item.likes}</span>
        </button>
        <button className="flex items-center space-x-2 text-gray-400 hover:text-gray-200">
          <FontAwesomeIcon icon={faComment} size="lg" />
          <span>Comment</span>
        </button>
        <button className="flex items-center space-x-2 text-gray-400 hover:text-gray-200">
          <FontAwesomeIcon icon={faShare} size="lg" />
          <span>Share</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-[#f5f0ff] dark:bg-black min-h-screen flex justify-center">
      <div className="max-w-2xl w-full py-4">
        {loading ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-white text-lg">Loading...</div>
          </div>
        ) : posts.length > 0 ? (
          <div>
            {posts.map((post) => (
              renderPost(post)
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 mt-10">No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default Feed;
