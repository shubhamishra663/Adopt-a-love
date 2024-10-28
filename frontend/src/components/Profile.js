import React, { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie'; // Ensure you have js-cookie installed
import shu from '../utils/pets.jpg';
import pets from '../utils/cat.jpg';
import { AuthContext } from '../context/authContext';
import { Link } from 'react-router-dom';

export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { login, logout, isAuthenticated, value } = useContext(AuthContext); // Get login function and auth state

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset error state
      const token = Cookies.get('token');
      console.log(`Token in Profile: ${token}`);  // Only logging the token, per your preference
      try {
        const response = await fetch('http://localhost:5000/profile', {  // Ensure the full URL is correct
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Use the token from cookies
            'Accept': 'application/json' // Ensure the response is in JSON format
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        const data = await response.json();
        console.log('Data after Response:', data); // Print full object in readable format
        setProfileData(data); // Update state with the profile data
      } catch (error) {
        setError(error.message); // Update error state
      } finally {
        setLoading(false); // Loading is complete
      }
    };
    fetchProfile(); // Call the fetch function
  }, []);



  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error state
  if (error) {
    return <div>Error: {error}</div>;
  }


  // Render profile data
  return (
    <div className='h-screen w-screen bg-gray-200'>
      <div className='h-[8%] w-full bg-gray-400 flex justify-between'>
        <div className='flex p-2 gap-2 bg-red-200'>
          <div>
            <div className='h-12 w-12 bg-green-800 rounded-full overflow-hidden'>
              <img src={shu} alt='Profile' className='h-full w-full object-cover' /> {/* Keep the profile picture */}
            </div>
          </div>

          <div>
            <p className='font-semibold text-l'>{profileData?.user?.name || 'Name not available'}</p> {/* Display the name */}
            <p className='text-xs'>{profileData?.user?.email || 'Email not available'}</p> {/* Dynamically render email */}
          </div>
        </div>

        <div className='h-full flex items-center p-5'>
          <button onClick={logout} className='bg-blue-500 p-1 rounded-md text-sm'>Log out</button>
        </div>
      </div>

      <div className="h-40 w-60  p-3">
        <Link to='/pets'>
        <img src={pets} alt='Profile' className='h-full w-full object-cover rounded-md' /> {/* Keep the profile picture */}
        </Link>
      </div>
    </div>
  );
}
