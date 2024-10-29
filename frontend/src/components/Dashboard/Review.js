import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Cat from '../../utils/cat.jpg';

gsap.registerPlugin(ScrollTrigger);

const Card = ({ name, location, message }) => (
    <div className="bg-white bg-opacity-20 backdrop-blur-lg shadow-2xl h-[50%] w-[85%] md:w-[60%] lg:w-[50%] flex items-center p-5 rounded-2xl mx-2 my-2">
        <div className="bg-gray-800 h-[70%] w-full p-3 flex flex-col justify-between rounded-xl shadow-inner">
            <div className="h-[35%] flex justify-center">
                <img className="h-full w-[25%] rounded-full relative bottom-[60%]" src={Cat} alt="Cat" loading="lazy" />
            </div>
            <div className="h-[65%] flex flex-col justify-between">
                <p className="leading-5 text-white">{message}</p>
                <p className="leading-5 text-sm text-right text-gray-200">~ {name}, {location}</p>
            </div>
        </div>
    </div>
);

export default function Review() {
    const cardData = [
        { id: 1, name: "Shubham Mishra", location: "Patna", message: "Hi, I adopted this cat 'Luci' with the reference of this site, I'm really satisfied." },
        { id: 2, name: "Kumar", location: "Patna", message: "Hi, I adopted this cat 'Luci' with the reference of this site, I'm really satisfied." },
        { id: 3, name: "Mishra", location: "Patna", message: "Hi, I adopted this cat 'Luci' with the reference of this site, I'm really satisfied." }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Create ScrollTriggers for each section to update the card content
        cardData.forEach((_, index) => {
            ScrollTrigger.create({
                trigger: `.section-${index}`,
                start: "top center",
                end: "bottom center",
                onEnter: () => setCurrentIndex(index),
                onEnterBack: () => setCurrentIndex(index)
            });
        });

        // Pin the card section
        ScrollTrigger.create({
            trigger: ".pin-section",
            start: "top top",
            end: "bottom bottom",
            pin: ".pin",
            pinSpacing: false
        });
    }, []);

    return (
        <div className="flex">
            {/* Left Side Content with full-height sections */}
            <div className="w-1/2 overflow-y-auto">
                <div className="h-screen p-10 flex items-center section-0">
                    <p className="text-3xl text-gray-400">
                        "Every pet deserves a loving home – read how our adopters found friendship and loyalty in unexpected ways."
                    </p>
                </div>
                <div className="h-screen p-10 flex items-center section-1">
                    <p className="text-3xl text-gray-400">
                        "We’re proud to share these stories from people just like you, who opened their hearts and homes."
                    </p>
                </div>
                <div className="h-screen p-10 flex items-center section-2">
                    <p className="text-3xl text-gray-400">
                        "Join the journey – stories that remind us of the joy and companionship that only pets can bring."
                    </p>
                </div>
            </div>

            {/* Right Side - Pinned Single Card with Dynamic Content */}
            <div className="w-1/2 pin-section relative">
                <div className="pin h-screen flex justify-center items-center">
                    <Card {...cardData[currentIndex]} />
                </div>
            </div>
        </div>
    );
}
