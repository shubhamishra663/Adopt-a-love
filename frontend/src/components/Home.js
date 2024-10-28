import React, { useEffect, useRef, memo } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import ScrollTrigger from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import adoptMeImage from '../utils/adoptMe.png';
import Pets from '../utils/pets.jpg';
import Cat from '../utils/cat.jpg';
import HowItWorks from './Dashboard/HowItWorks';
import FAQ from './Dashboard/FAQ';
import Review from './Dashboard/Review';

gsap.registerPlugin(ScrollTrigger);



const WhyChooseUs = () => {
    const imgRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const imgTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: imgRef.current,
                start: "top 80%",
                end: "top 30%",
                scrub: true,
            },
        }).fromTo(
            imgRef.current,
            { x: '-100%', y: '300' },
            { x: '0%', y: '0%', duration: 1, ease: "power1.out" }
        );

        const sectionTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "bottom 80%",
                end: "bottom top",
                scrub: true,
                pin: true,
            },
        }).to(containerRef.current, {
            y: '-100%',
            opacity: 0,
            duration: 1,
            backgroundColor: "white",
        });

        return () => {
            imgTimeline.kill();
            sectionTimeline.kill();
        };
    }, []);

    return (
        <div className="h-screen">
            <div ref={containerRef} className="flex flex-col md:flex-row h-screen">
                <div className="md:w-1/2 h-full relative bg-gray-900 overflow-hidden">
                    <img
                        className="h-full object-center md:object-cover"
                        src={adoptMeImage}
                        ref={imgRef}
                        alt="Adopt Me"
                        loading="lazy"
                    />
                </div>
                <div className="md:w-1/2 h-full text-center p-8 bg-gray-900 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold">Why Choose Us?</h2>
                </div>
            </div>
        </div>
    );
};

const HomeCarousel = () => (
    <div className="bg-purple-400 h-[70vh] w-screen relative overflow-hidden">
        <img
            className="w-screen h-full object-cover"
            src={Pets}
            alt="Pets"
            loading="lazy"
        />
    </div>
);


function Home() {
    return (
        <div className="relative overflow-hidden">
            <HomeCarousel />
            <WhyChooseUs />
            <HowItWorks />
            <FAQ />
            <Review />
            <div className="h-screen bg-blue-950"></div>
        </div>
    );
}

export default Home;
