import React, { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import shu from '../utils/pets.jpg';
import { AuthContext } from '../context/authContext';
import Pets from './Pets';

export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { logout, userData, setUserData } = useContext(AuthContext);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      const token = Cookies.get('token');
      try {
        const response = await fetch(`http://localhost:5000/profile/${userData?.user?.email}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
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
    <div className='h-auto w-full bg-gray-400 overflow-hidden'> {/* Changed w-screen to w-full and added overflow-hidden */}

      {/* Banner and profile pic */}
      <div className='bg-black h-fit'>
        <div className='md:h-[30%] h-[12%] w-full bg-gray-800 flex justify-between'>
          <div className='flex p-3 md:p-5 gap-2'>
            <div className='top-[80%] md:top-[65%] relative flex justify-center items-center'>
              <div className='border-2 h-20 w-20 bg-green-800 rounded-full overflow-hidden'>
                <img src={shu} alt='Profile' className='h-full w-full object-cover' />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Details */}
      <div className='bg-purple-400 p-3 pt-16  md:pt-10 flex justify-between'>
        <div className=''>
          <p className='font-semibold text-2xl'>{userData?.user?.name || 'Name not available'}</p>
          <p className='text-xs'>{userData?.user?.email || 'Email not available'}</p>
        </div>

        <div className='bg-green-500 px-10'>
          Edit
        </div>
      </div>

      {/* Sections */}
      <div className='w-full h-28 md:h-32 flex md:gap-10 p-3 md:p-5 justify-between md:justify-normal'>
        <button className='h-full w-[45%] md:w-40 bg-green-500 rounded-md flex justify-center items-center'>
          <p className='font-semibold text-xl'>Pets</p>
        </button>
        <button className='h-full w-[45%] md:w-40 bg-green-500 rounded-md flex justify-center items-center'>
          <p className='font-semibold text-xl'>Lost Pets</p>
        </button>
      </div>

      <div className='bg-red-700 flex'>
        <Pets/>
      </div>

      <div className='h-full flex items-center p-5'>
        <button onClick={logout} className='bg-blue-500 p-1 rounded-md text-sm'>Log out</button>
      </div>
    </div>
  );
}
