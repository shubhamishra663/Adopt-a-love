import React from 'react';
import Lottie from 'lottie-react'; // Use default export if applicable
import animationData from '../Lotties/Loading.json';

export default function Loader() {
  return (
    <div className="h-screen w-screen bg-[#f5f5f5] dark:bg-black flex justify-center items-center">
      <Lottie style={{ height: '150px', width: '150px' }}  animationData={animationData} loop={true} />
    </div>
  );
}
