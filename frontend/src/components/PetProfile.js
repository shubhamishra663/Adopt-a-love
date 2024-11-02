import React, { useContext, useEffect, useState } from 'react';
import petPlaceholderImage from '../utils/cat.jpg';
import { Helmet } from 'react-helmet';
import { gsap, Expo } from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassStart, faRulerCombined, faDog, faBolt, faPaw } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const mobileNumber = process.env.REACT_APP_MOBILE_NO || '+919472314319';

export default function PetProfile() {
    const location = useLocation();
    const currentURL = `${window.location.origin}${location.pathname}${location.search}${location.hash}`;
    const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentURL)}`;

    const { isAuthenticated } = useContext(AuthContext);
    const [counter, setCounter] = useState(0);
    const [loadingComplete, setLoadingComplete] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCounter(prev => {
                if (prev < 100) return prev + 1;
                clearInterval(intervalId);
                setLoadingComplete(true);
                return 100;
            });
        }, 25);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (loadingComplete) {
            gsap.timeline()
                .to('.loader', { height: '100%', duration: 1.2, ease: Expo.easeInOut })
                .to('.count', { display: 'none' })
                .to('.content', { opacity: 1, duration: 0 });
        }
    }, [loadingComplete]);

    const facts = [
        { icon: faPaw, label: "Breed", value: "Labrador" },
        { icon: faHourglassStart, label: "Age", value: "2 yrs" },
        { icon: faRulerCombined, additionalIcon: faDog, label: "Size", value: "Medium" },
        { icon: faBolt, label: "Energy", value: "Calm" }
    ];

    return (
        <div className='bg-gray-800 flex flex-col text-white'>
            <header className='bg-purple-600 flex justify-between px-2 md:px-10 p-3'>
                <p className='font-semibold text-2xl'>Adopt Kitty</p>
                <p className='text-blue-400 text-sm'>Posted on 1 November 2024</p>
            </header>

            {/* Pet image */}
            <section className='bg-gray-700 h-[60%] flex items-center justify-center p-5 md:p-14'>
                <div className='bg-gray-600 h-96 w-11/12 md:w-1/2 relative rounded-lg overflow-hidden shadow-lg'>
                    <div className='loading-bar bg-[#121212] h-full w-full flex flex-col justify-center items-center absolute top-0 transition-all duration-700'>
                        <div className='loader absolute left-0 h-[4px] bg-green-500' style={{ width: `${counter}%` }}></div>
                        <div className='count absolute text-xl font-bold'>{counter}%</div>
                    </div>
                    <div className='content absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 transition-opacity duration-700'>
                        <img src={petPlaceholderImage} alt="Pet" className="rounded-lg w-full h-full object-cover" />
                    </div>
                </div>
            </section>

            {/* Quick Facts */}
            <section className='bg-gray-700'>
                <p className='font-bold text-3xl p-3'>Quick facts</p>
                <div className='flex bg-gray-600 justify-evenly p-1 md:p-3 flex-wrap gap-5'>
                    {facts.map(({ icon, additionalIcon, label, value }, index) => (
                        <div
                            key={index}
                            className='flex items-center bg-gray-500 h-28 w-40 md:h-32 md:w-60 gap-3 rounded-lg shadow-xl p-3'
                        >
                            {/* Left side: Icon and Label */}
                            <div className='flex flex-col items-center w-16 md:w-24'>
                                <div className='bg-gray-400 h-12 w-12 md:w-16 md:h-16 rounded-full flex items-center justify-center'>
                                    <FontAwesomeIcon icon={icon} className='h-6 text-gray-800' />
                                    {additionalIcon && <FontAwesomeIcon icon={additionalIcon} className='h-5 text-gray-800' />}
                                </div>
                                <p className='text-center text-sm md:text-base mt-1'>{label}</p>
                            </div>

                            {/* Right side: Value */}
                            <div className='font-bold text-lg md:text-xl flex-grow text-center'>
                                {value}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact Info */}
            <section className='p-3 md:p-5'>
                <div className='bg-gray-600 border-2 border-gray-500 p-5 rounded-md'>
                    <div><p className='text-3xl font-bold'>Contact Info</p></div>
                    <div className='p-3 md:p-5 leading-5'>
                        <p className='text-lg bg-purple-400 w-fit'><span className='font-medium text-xl'>Name</span> Shubham Mishra</p>
                        <p className='text-lg w-fit'><span className='font-medium text-xl'>Address</span> Phulwari sharif, Patna</p>
                        <div className='flex gap-8 flex-wrap'>
                            <p className='text-lg w-fit'><span className='font-medium text-xl'>Phone </span>{isAuthenticated ? mobileNumber : <Link to='/login' state={{ from: location }}
                                className='bg-blue-500 font-semibold'>See Now</Link>}</p>
                            <p className='text-lg w-fit'><span className='font-medium text-xl'>Email</span> shubhamishra663@gmail.com</p>
                        </div>

                        {/* Share */}
                        <a aria-label="Chat on WhatsApp" href={`https://wa.me/${mobileNumber}/?text=hello:${currentURL}`}> <img alt="Chat on WhatsApp" src="WhatsAppButtonGreenLarge.svg" /></a>

                        <div>
                            <Helmet>
                                <title>Jonh</title>
                                <meta property="og:title" content={`Adopt Jonh`} />
                                <meta property="og:description" content={`Meet Jonh, a lovely Husky available for adoption!`} />
                                <meta property="og:image" content={petPlaceholderImage} />
                                <meta property="og:url" content={window.location.href} />
                                <meta property="og:type" content="website" />
                            </Helmet>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
