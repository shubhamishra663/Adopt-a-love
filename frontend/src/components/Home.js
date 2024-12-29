import React, { useEffect, useRef, memo } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import ScrollTrigger from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import Pets from '../utils/pets.jpg';
import Cat from '../utils/cat.jpg';
import HowItWorks from './Dashboard/HowItWorks';
import FAQ from './Dashboard/FAQ';
import Review from './Dashboard/Review';
import Donation from './Dashboard/Donation';
import FAQs from './Dashboard/FAQs';
import Footer from './Footer';
import WhyChooseUs from './Dashboard/WhyChooseUs';
import Header from './Dashboard/Header';

gsap.registerPlugin(ScrollTrigger);




// const HomeCarousel = () => (
//     <div className="bg-purple-400 h-[70vh] w-screen relative overflow-hidden">
//         <img
//             className="w-screen h-full object-cover"
//             src={Pets}
//             alt="Pets"
//             loading="lazy"
//         />
//     </div>
// );


function Home() {
    return (
        <div className="relative overflow-hidden">
            {/* <HomeCarousel /> */}
            <Header/>
            <WhyChooseUs/>
            {/* <HowItWorks /> */}
            <Review />
            <Donation/>
            <FAQs/>
            <Footer/>
        </div>
    );
}

export default Home;