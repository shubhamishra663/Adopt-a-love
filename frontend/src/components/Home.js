import React, { useEffect, useRef } from 'react'; 
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Logo from '../utils/logo.png';
import Cat from '../utils/cat.jpg';
import adoptMeImage from '../utils/adoptMe.png';
import Pets from '../utils/pets.jpg';
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

const cardData = [
    { id: 1, name: "Shubham Mishra", location: "Patna", message: "Hi, I adopted this cat 'Luci' with the reference of this site, I'm really satisfied." },
    { id: 2, name: "Kumar", location: "Patna", message: "Hi, I adopted this cat 'Luci' with the reference of this site, I'm really satisfied." },
    { id: 3, name: "Mishra", location: "Patna", message: "Hi, I adopted this cat 'Luci' with the reference of this site, I'm really satisfied." }
];

const HowItWorks = () => {
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
                scrub: true,
                snap: 1 / (sections.length - 1),
                end: "+=1000", // Adjust based on your layout
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <div ref={containerRef} className="h-screen overflow-hidden">
            <div className="flex h-full" ref={sectionsRef}>
                <div className="flex-shrink-0 w-full h-full flex flex-col justify-center items-center bg-blue-500 text-white">
                    <h2 className="text-4xl">Step 1</h2>
                    <p>Description for Step 1.</p>
                </div>
                <div className="flex-shrink-0 w-full h-full flex flex-col justify-center items-center bg-green-500 text-white">
                    <h2 className="text-4xl">Step 2</h2>
                    <p>Description for Step 2.</p>
                </div>
                <div className="flex-shrink-0 w-full h-full flex flex-col justify-center items-center bg-red-500 text-white">
                    <h2 className="text-4xl">Step 3</h2>
                    <p>Description for Step 3.</p>
                </div>
            </div>
        </div>
    );
};

const FAQ = () => {
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
                scrub: true,
                snap: 1 / (sections.length - 1),
                end: "+=1000", // Adjust based on your layout
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <div ref={containerRef} className="h-screen overflow-hidden">
            <div className="flex h-full" ref={sectionsRef}>
                <div className="flex-shrink-0 w-full h-full flex flex-col justify-center items-center bg-purple-500 text-white">
                    <h2 className="text-4xl">FAQ 1</h2>
                    <p>Answer to FAQ 1.</p>
                </div>
                <div className="flex-shrink-0 w-full h-full flex flex-col justify-center items-center bg-orange-500 text-white">
                    <h2 className="text-4xl">FAQ 2</h2>
                    <p>Answer to FAQ 2.</p>
                </div>
                <div className="flex-shrink-0 w-full h-full flex flex-col justify-center items-center bg-yellow-500 text-white">
                    <h2 className="text-4xl">FAQ 3</h2>
                    <p>Answer to FAQ 3.</p>
                </div>
            </div>
        </div>
    );
};

const WhyChooseUs = () => {
    const imgRef = useRef(null); 

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: imgRef.current, 
                start: "top 80%", 
                end: "top 30%", 
                scrub: true, 
                markers: true, // Set markers to false to remove them
            },
        });

        tl.fromTo(imgRef.current, 
            { x: '-100%', y: '300' },
            { x: '0%', y: '0%', duration: 1 } 
        );

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <div className='flex flex-col md:flex-row'>
            <div className='md:w-1/2 h-screen relative overflow-hidden'>
                <img 
                    className='h-full object-center md:object-cover' 
                    src={adoptMeImage} 
                    ref={imgRef} 
                    alt="Adopt Me" 
                />
            </div>

            <div className='md:w-1/2 h-screen text-center p-8 bg-red-500 flex flex-col justify-center'>
                <h2 className='text-3xl font-bold'>Why Choose Us?</h2>
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
        <div className="relative overflow-hidden">
            <HomeCarousel />
            <WhyChooseUs />
            <HowItWorks />
            <FAQ />
            <Review />
            <div className='h-screen bg-blue-950'></div>
        </div>
    );
}

export default Home;
