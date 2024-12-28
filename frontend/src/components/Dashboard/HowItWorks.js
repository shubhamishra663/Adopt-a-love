import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPenNib, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import ScrollTrigger from "gsap/ScrollTrigger";
import TextPlugin from "gsap/TextPlugin";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function HowItWorks() {
  const containerRef = useRef(null);
  const sectionsRef = useRef(null);
  const quoteRef = useRef(null);
  const glowingBallRef = useRef(null);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseInside, setIsMouseInside] = useState(false);
  const [hoveredElement, setHoveredElement] = useState(null);
  const [isBallHovered, setIsBallHovered] = useState(false);

  useEffect(() => {
    const sections = sectionsRef.current.children;

    // Horizontal Scroll Animation
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "power1.out",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        end: () => `+=${containerRef.current.offsetWidth * (sections.length - 1)}`,
        start: "top top",
      },
    });

    // Fade-in and Scale-up Effects for Sections
    gsap.fromTo(
      sections,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: true,
        },
      }
    );

    // Scramble Text Animation for the Quote Section
    gsap.fromTo(
      quoteRef.current,
      { text: { value: "" }, opacity: 0 },
      {
        text: { value: "Discover. Meet. Adopt. Change a life forever!" },
        opacity: 1,
        duration: 3,
        ease: "power2.out",
        repeat: -1,
        repeatDelay: 1.5,
        yoyo: true,
        delay: 0.5,
      }
    );

    // Move glowing ball with mouse within component boundaries
    const updateMousePosition = (e) => {
      const bounds = containerRef.current.getBoundingClientRect();
      const clientX = e.clientX - bounds.left;
      const clientY = e.clientY - bounds.top;

      // Check if mouse is inside the component
      const isInside = clientX >= 0 && clientX <= bounds.width && clientY >= 0 && clientY <= bounds.height;
      setIsMouseInside(isInside);

      if (isInside) {
        setMousePosition({ x: clientX, y: clientY });
      }
    };

    containerRef.current.addEventListener("mousemove", updateMousePosition);

    return () => {
      containerRef.current.removeEventListener("mousemove", updateMousePosition);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleMouseEnter = (id) => setHoveredElement(id);
  const handleMouseLeave = () => setHoveredElement(null);

  const handleBallHover = () => {
    setIsBallHovered(true);
  };

  const handleBallLeave = () => {
    setIsBallHovered(false);
  };

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden bg-black text-white cursor-none">
      {/* Glowing Ball */}
      {isMouseInside && (
        <div
          ref={glowingBallRef}
          className="absolute w-16 h-16 rounded-full bg-white pointer-events-none"
          style={{
            transform: `translate(${mousePosition.x - 32}px, ${mousePosition.y - 32}px)`,
            boxShadow: "0 0 50px 20px rgba(255, 255, 255, 0.7)",
            transition: "transform 0.1s ease-out",
            opacity: 0.9,
          }}
          onMouseEnter={handleBallHover}
          onMouseLeave={handleBallLeave}
        ></div>
      )}

      {/* Quote Section */}
      <div className="absolute top-5 w-full text-center z-10">
        <h1 className="text-5xl font-extrabold">How It Works</h1>
        <p ref={quoteRef} className="mt-3 text-xl font-medium text-gray-300"></p>
      </div>

      {/* Horizontal Sections */}
      <div ref={sectionsRef} className="flex h-full">
        {/* Section 1: Search */}
        <div
          className="flex-shrink-0 w-full h-full flex flex-col justify-center items-center text-white relative"
          onMouseEnter={() => handleMouseEnter("search")}
          onMouseLeave={handleMouseLeave}
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={`h-28 w-28 mb-8 transition-transform transform ${hoveredElement === "search" ? "text-yellow-400" : "text-purple-300"} ${isBallHovered ? "filter invert" : ""} hover:scale-125 hover:rotate-360`}
          />
          <h2 className={`text-5xl font-bold mb-6 transition-transform ${hoveredElement === "search" ? "text-yellow-400" : ""} hover:scale-110`}>
            Search
          </h2>
          <p className={`text-center text-lg md:text-2xl max-w-md transition-colors ${hoveredElement === "search" ? "text-yellow-400" : ""}`}>
            Start your journey by searching for pets in your area.
          </p>
        </div>

        {/* Section 2: Meet */}
        <div
          className="flex-shrink-0 w-full h-full flex flex-col justify-center items-center text-white relative"
          onMouseEnter={() => handleMouseEnter("meet")}
          onMouseLeave={handleMouseLeave}
        >
          <FontAwesomeIcon
            icon={faPenNib}
            className={`h-28 w-28 mb-8 transition-transform transform ${hoveredElement === "meet" ? "text-yellow-400" : "text-green-300"} ${isBallHovered ? "filter invert" : ""} hover:scale-125 hover:rotate-360`}
          />
          <h2 className={`text-5xl font-bold mb-6 transition-transform ${hoveredElement === "meet" ? "text-yellow-400" : ""} hover:scale-110`}>
            Meet
          </h2>
          <p className={`text-center text-lg md:text-2xl max-w-md transition-colors ${hoveredElement === "meet" ? "text-yellow-400" : ""}`}>
            Schedule a visit to meet your potential new best friend.
          </p>
        </div>

        {/* Section 3: Adopt */}
        <div
          className="flex-shrink-0 w-full h-full flex flex-col justify-center items-center text-white relative"
          onMouseEnter={() => handleMouseEnter("adopt")}
          onMouseLeave={handleMouseLeave}
        >
          <FontAwesomeIcon
            icon={faCartShopping}
            className={`h-28 w-28 mb-8 transition-transform transform ${hoveredElement === "adopt" ? "text-yellow-400" : "text-orange-300"} ${isBallHovered ? "filter invert" : ""} hover:scale-125 hover:rotate-360`}
          />
          <h2 className={`text-5xl font-bold mb-6 transition-transform ${hoveredElement === "adopt" ? "text-yellow-400" : ""} hover:scale-110`}>
            Adopt
          </h2>
          <p className={`text-center text-lg md:text-2xl max-w-md transition-colors ${hoveredElement === "adopt" ? "text-yellow-400" : ""}`}>
            Complete the adoption process and welcome your pet home.
          </p>
        </div>
      </div>
    </div>
  );
}
