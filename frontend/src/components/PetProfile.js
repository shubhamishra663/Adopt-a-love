import React, { useEffect, useState } from 'react';
import petPlaceholderImage from '../utils/cat.jpg';
import { gsap, Expo } from 'gsap';

export default function PetProfile() {
    const [counter, setCounter] = useState(0);
    const [loadingComplete, setLoadingComplete] = useState(false);

    useEffect(() => {
        const count = setInterval(() => {
            setCounter(prev => {
                if (prev < 100) {
                    return prev + 1;
                } else {
                    clearInterval(count);
                    setLoadingComplete(true);
                    return 100;
                }
            });
        }, 25);

        return () => clearInterval(count); // Cleanup on unmount
    }, []);

    useEffect(() => {
        if (loadingComplete) {
            const tl = gsap.timeline();
            // Expand the height of the loading bar
            tl.to('.loader', {
                height: '100%', // Increase height to reveal the image
                duration: 1.2,
                ease: Expo.easeInOut,
            })
            
            .to('.content', {
                opacity: 1,
            });
        }
    }, [loadingComplete]);

    return (
        <div className='bg-red-400 h-screen w-screen flex items-center justify-center'>
            <div className='bg-gray-500 h-96 w-1/2 relative rounded-lg overflow-hidden shadow-lg'>
                {/* Loading Bar */}
                <div className='loading-bar bg-[#121212] h-full w-full flex flex-col justify-center items-center absolute top-0 transition-all duration-700'>
                    <div className='loader absolute left-0 h-[4px] bg-green-500' style={{ width: counter + '%' }}></div>
                    <div className='absolute text-xl font-bold text-white'>{counter}%</div>
                </div>

                {/* Content */}
                <div 
                    className={`content absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center duration-700 opacity-0`}
                >
                    <img src={petPlaceholderImage} alt="Pet" className="rounded-lg w-full h-full object-cover" />
                </div>
            </div>
        </div>
    );
}
