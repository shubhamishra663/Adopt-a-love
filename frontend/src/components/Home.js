import React, { useEffect, useRef, memo } from 'react';
import 'react-alice-carousel/lib/alice-carousel.css';
import Cat from '../utils/cat.jpg';
import Review from './Dashboard/Review';
import Donation from './Dashboard/Donation';
import FAQs from './Dashboard/FAQs';
import Footer from './Footer';
import WhyChooseUs from './Dashboard/WhyChooseUs';
import Header from './Dashboard/Header';
import NeedVeterinarian from './Dashboard/NeedVeterinarian';



function Home() {
    return (
        <div className="relative overflow-hidden">
            <Header/>
            <NeedVeterinarian/>
            <WhyChooseUs/>
            <Review />
            <Donation/>
            <FAQs/>
            <Footer/>
        </div>
    );
}

export default Home;