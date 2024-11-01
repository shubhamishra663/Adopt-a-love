import React, { useEffect, useState } from 'react';
import petPlaceholderImage from '../utils/cat.jpg';
import { Helmet } from 'react-helmet';
import { gsap, Expo } from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassStart, faRulerCombined, faDog, faBolt, faPaw } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
const mobileNumber = process.env.REACT_APP_MOBILE_NO || '+919472314319';
export default function PetProfile() {
    const location = useLocation();
    const currentURL = `${window.location.origin}${location.pathname}${location.search}${location.hash}`;
    const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentURL)}`;

    console.log(`currentlocation : ${currentURL}`);
    console.log(`mbno ${mobileNumber}`);
    
    
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
        <div className='bg-gray-400 flex flex-col'>
            <header className='bg-purple-300 flex justify-between px-2 md:px-10 p-3'>
                <p className='font-semibold text-2xl text-gray-700'>Adopt Kitty</p>
                <p className='text-blue-600 text-sm'>Posted on 1 November 2024</p>
            </header>

            <section className='bg-red-400 h-[60%] flex items-center justify-center p-14'>
                <div className='bg-gray-500 h-96 md:w-1/2 w-3/4 relative rounded-lg overflow-hidden shadow-lg'>
                    <div className='loading-bar bg-[#121212] h-full w-full flex flex-col justify-center items-center absolute top-0 transition-all duration-700'>
                        <div className='loader absolute left-0 h-[4px] bg-green-500' style={{ width: `${counter}%` }}></div>
                        <div className='count absolute text-xl font-bold text-white'>{counter}%</div>
                    </div>
                    <div className='content absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 transition-opacity duration-700'>
                        <img src={petPlaceholderImage} alt="Pet" className="rounded-lg w-full h-full object-cover" />
                    </div>
                </div>
            </section>

            <section className='bg-gray-700'>
                <p className='font-bold text-3xl p-3'>Quick facts</p>
                <div className='flex bg-red-200 justify-evenly p-3 flex-wrap'>
                    {facts.map(({ icon, additionalIcon, label, value }, index) => (
                        <div key={index} className='flex bg-orange-900 h-32 w-60 items-center gap-3 rounded-lg justify-center shadow-xl'>
                            <div className='bg-white w-24 h-24 p-5 rounded-full flex flex-col justify-center items-center'>
                                <div>
                                    <FontAwesomeIcon icon={icon} className='h-6' />
                                    {additionalIcon && <FontAwesomeIcon icon={additionalIcon} className='h-5' />}
                                </div>
                                <p>{label}</p>
                            </div>
                            <div className='font-bold text-xl'>{value}</div>
                        </div>
                    ))}
                </div>
            </section>

            <section className='p-3 md:p-5'>
                <div className='bg-red-300 border-2 border-gray-500 p-5 rounded-md'>
                    <div><p className='text-3xl font-bold'>Contact Info</p></div>
                    <div className=' p-3 md:p-5 leading-5'>
                        <p className='text-lg bg-purple-200 w-fit'><span className='font-medium text-xl'>Name</span> Shubham Mishra</p>
                        <p className='text-lg w-fit'><span className='font-medium text-xl'>Address</span> Phulwari sharif, Patna</p>
                        <div className='flex gap-8 flex-wrap'>
                        <p className='text-lg w-fit'><span className='font-medium text-xl'>Phone</span> 9472314319</p>
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

            <h1>Meet Jonh</h1>
            <p>Breed: Husky</p>
            {/* Other profile info */}
        </div>
        

                    </div>
                </div>
            </section>


            
        </div>
    );
}
