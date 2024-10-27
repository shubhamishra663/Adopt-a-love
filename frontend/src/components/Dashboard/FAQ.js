import React, { useEffect, useRef } from 'react'
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from 'gsap';

export default function FAQ() {
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
        </div>  )
}
