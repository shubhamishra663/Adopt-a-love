import React from 'react'
import { Lottie } from 'lottie-react';
import animationData from '../Lotties/Loading.json';

export default function Loader() {
  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <Lottie animationData={animationData} loop={true} />
    </div>
  )
}
