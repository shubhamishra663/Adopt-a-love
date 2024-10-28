import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faPenNib, faCartShopping, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks() {
    const containerRef = useRef(null);
    const sectionsRef = useRef(null);

    useEffect(() => {
        const sections = sectionsRef.current.children;

        gsap.to(sections, {
            xPercent: -100 * (sections.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                pin: true,
                scrub: 2, // Slows down the scroll (increase value for slower effect)
                snap: 1 / (sections.length - 1),
                end: "+=2000", // Adjust end distance for a slower scroll effect
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <div ref={containerRef} className="h-screen overflow-hidden">
            <div className="flex h-full" ref={sectionsRef}>

                <div className="flex-shrink-0 w-full h-full flex flex-col items-center bg-gray-800">
                    <h2 className="text-4xl p-5 font-bold">How It Works?</h2>
                    <div className='bg-gray-900 h-full w-full flex justify-center items-center'>
                        <div className='h-[50%] w-[80%] flex flex-col gap-10 rounded-md'>
                            <div className='flex justify-center items-center gap-5 text-white'>
                                <FontAwesomeIcon icon={faMagnifyingGlass} className='h-28 w-50' />
                                <p className='text-4xl font-bold'>Search</p>
                            </div>
                            <p className='text-center text-2xl md:text-6xl text-gray-400'>Simply enter your city to start your search</p>
                        </div>
                    </div>
                </div>

                <div className="flex-shrink-0 w-full h-full flex flex-col items-center bg-blue-500">
                    <h2 className="text-4xl p-5 font-bold">How It Works?</h2>
                    <div className='bg-gray-900 h-full w-full flex justify-center items-center'>
                        <div className='h-[50%] w-[80%] flex flex-col gap-10 rounded-md'>
                            <div className='flex justify-center items-center gap-5 text-white'>
                                <FontAwesomeIcon icon={faPenNib} className='h-28 w-50' />
                                <p className='text-4xl font-bold'>Meet</p>
                            </div>
                            <p className='text-center text-2xl md:text-6xl text-gray-400'>Schedule your appointment to meet the pet you love</p>
                        </div>
                    </div>
                </div>

                <div className="flex-shrink-0 w-full h-full flex flex-col items-center bg-blue-500">
                    <h2 className="text-4xl p-5 font-bold">How It Works?</h2>
                    <div className='bg-gray-900 h-full w-full flex justify-center items-center'>
                        <div className='h-[50%] w-[50%] md:w-[80%] flex flex-col gap-10 rounded-md'>
                            <div className='flex justify-center items-center gap-5 text-white '>
                                <FontAwesomeIcon icon={faCartShopping} className='h-28 w-50'/>
                                <p className='text-4xl font-bold'>Adopt</p>
                            </div>
                            <p className='text-center text-2xl md:text-6xl text-gray-400'>Finally adopt the pet you love</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}