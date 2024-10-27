import React, { useEffect, useRef } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Logo from '../utils/logo.png';
import Cat from '../utils/cat.jpg';
import adoptMeImage from '../utils/adoptMe.png';
import Pets from '../utils/pets.jpg';
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from 'gsap';
import HowItWorks from './Dashboard/HowItWorks';
import FAQ from './Dashboard/FAQ';


gsap.registerPlugin(ScrollTrigger);

const cardData = [
    { id: 1, name: "Shubham Mishra", location: "Patna", message: "Hi, I adopted this cat 'Luci' with the reference of this site, I'm really satisfied." },
    { id: 2, name: "Kumar", location: "Patna", message: "Hi, I adopted this cat 'Luci' with the reference of this site, I'm really satisfied." },
    { id: 3, name: "Mishra", location: "Patna", message: "Hi, I adopted this cat 'Luci' with the reference of this site, I'm really satisfied." }
];





const WhyChooseUs = () => {
    const imgRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        // Timeline for the image animation (left to right)
        const imgTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: imgRef.current,
                start: "top 80%",
                end: "top 30%",
                scrub: true,
            },
        });

        imgTimeline.fromTo(
            imgRef.current,
            { x: '-100%', y: '300' },
            { x: '0%', y: '0%', duration: 1 }
        );

        // Timeline for the whole section scroll up and fade out
        const sectionTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "bottom 80%", // Start animation when bottom of component hits 80%
                end: "bottom top", // End when the component is completely out of view
                scrub: true,
                pin: true, // Pin the section in place until it scrolls out
            },
        });

        sectionTimeline.to(containerRef.current, {
            y: '-100%', // Move the section up entirely out of view (adjust as needed)
            opacity: 0, // Fade out the section
            duration: 1,
            ease: "none",
            backgroundColor: "white", // Change background to white
        });

        return () => {
            imgTimeline.kill();
            sectionTimeline.kill();
        };
    }, []);

    return (
        <div className='h-screen'>
            <div ref={containerRef} className='flex flex-col md:flex-row h-screen'>
                <div className='md:w-1/2 h-full relative bg-gray-900 overflow-hidden'>
                    <img
                        className='h-full object-center md:object-cover'
                        src={adoptMeImage}
                        ref={imgRef}
                        alt="Adopt Me"
                    />
                </div>

                <div className='md:w-1/2 h-full text-center p-8 bg-gray-900 flex flex-col justify-center'>
                    <h2 className='text-3xl font-bold'>Why Choose Us?</h2>
                </div>
            </div>
        </div>
    );
};



const HomeCarousel = () => {
    return (
        <div className="bg-purple-400 h-[70vh] w-screen relative overflow-hidden">
            <img
                className="w-screen h-full object-cover"
                src={Pets}
                alt="Pets"
            />
        </div>
    );
};

const Card = ({ name, location, message }) => {
    return (
        <div className='bg-[#749785] h-80 w-[85%] md:w-[80%] lg:w-[60%] flex items-center p-5 rounded-2xl mx-2 my-2'>
            <div className='bg-[#D9D9D9] h-[70%] w-full p-3 flex flex-col justify-between'>
                <div className='h-[35%] flex justify-center'>
                    <img className='h-full w-[25%] rounded-full relative bottom-[60%]' src={Cat} alt="Cat" />
                </div>
                <div className='h-[65%] flex flex-col justify-between'>
                    <p className='leading-5'>{message}</p>
                    <p className='leading-5 text-sm text-right'>~ {name}, {location}</p>
                </div>
            </div>
        </div>
    );
};

const Review = () => {
    return (
        <>
            <div className='text-center text-4xl font-bold p-2'>
                <p className='text-gray-400'>Reviews from Our Happy Pet Parents</p>
            </div>

            <div className='w-screen flex flex-wrap justify-center md:grid md:grid-cols-2 lg:grid-cols-3 md:justify-items-center p-8'>
                {cardData.map((card) => (
                    <Card
                        key={card.id}
                        name={card.name}
                        message={card.message}
                        location={card.location}
                    />
                ))}
            </div>
        </>
    );
};

function Home() {
    return (
        <div className="relative overflow-hidden">
            <HomeCarousel />
            <WhyChooseUs />
            <HowItWorks />
            <FAQ/>
            <Review />
            <div className='h-screen bg-blue-950'></div>
        </div>
    );
}

export default Home;
