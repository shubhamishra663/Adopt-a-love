import React from 'react';
import Lottie from 'lottie-react'; // Use default export if applicable
import animationData from '../Lotties/Loading.json';

export default function Loader() {
  return (
    <div className="h-screen w-full bg-[#f5f0ff] dark:bg-black flex justify-center items-center">
      <Lottie style={{ height: '150px', width: '150px' }}  animationData={animationData} loop={true} />
    </div>
  );
}
