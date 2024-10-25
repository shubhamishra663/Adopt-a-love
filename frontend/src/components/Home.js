import React, { useEffect, useRef } from 'react'; 
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Logo from '../utils/logo.png';
import Cat from '../utils/cat.jpg';
import adoptMeImage from '../utils/adoptMe.jpg'

import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from 'gsap';


gsap.registerPlugin(ScrollTrigger);

const cardData = [
    { id: 1, name: "Shubham Mishra", location: "Patna", message: "Hi, I adopt this cat 'Luci' with the reference of this site, I'm really satisfied." },
    { id: 2, name: "Kumar", location: "Patna", message: "Hi, I adopt this cat 'Luci' with the reference of this site, I'm really satisfied." },
    { id: 3, name: "Mishra", location: "Patna", message: "Hi, I adopt this cat 'Luci' with the reference of this site, I'm really satisfied." }
];




const WhyChooseUs = () => {
    const imgRef = useRef(null); 

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: imgRef.current, 
                start: "top 70%", 
                end: "top 20%", 
                scrub: true, 
                markers: true, 
            },
        });

        tl.fromTo(imgRef.current, 
            { x: '-100%',y:'200' },
            { x: '0%',y:'0%' ,duration: 1 } 
        );

        
        return () => {
            tl.kill();
        };
    }, []);

    return (
        <div className='md:flex'>
            <div className='md:w-[50%] bg-red-500 h-screen relative overflow-hidden'>
                <img 
                    className='h-full' 
                    src={adoptMeImage} 
                    ref={imgRef} 
                    alt="Adopt Me" 
                />
            </div>

            <div className='md:w-[50%] bg-red-500 h-screen text-center p-8'>
                <h2 className='text-3xl font-bold'>Why Choose Us?</h2>
            </div>
        </div>
    );
};





const Card = ({ name, location, message }) => {
    return (
        <div className='bg-[#749785] h-80 w-[85%] md:w-[60%] lg:w-[60%] flex items-center p-5 rounded-2xl mx-2 my-2'>
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
            <p className=''>Reviews from Our Happy Pet Parents</p>
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
        <div>
            <div className='h-screen w-screen bg-purple-300'></div>
            <WhyChooseUs/>
            <Review />
        </div>
    );
}

export default Home;
