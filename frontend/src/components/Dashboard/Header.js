import React from 'react'
import { useState,useEffect ,useRef} from 'react';
import {gsap} from 'gsap'
import pic1 from '../../utils/headerDog1.jpg';
import pic2 from '../../utils/headerDog2.jpg';
import pic3 from '../../utils/headerDog3.jpg';
import { useNavigate } from 'react-router-dom';



function Header() {
    const Imge =[pic1,pic2,pic3,];
    const [currentIndex,SetcurrentIndex] =useState(0);
    const textRef = useRef(null);
    const textRef1 = useRef(null);
      const navigate = useNavigate();

    useEffect(()=>{
        const interval = setInterval(()=>
        {
            SetcurrentIndex((currentIndex)=>currentIndex===Imge.length-1?0:currentIndex+1 );
        },3000);
        gsap.from(textRef.current,{
           duration:1.5,
           opacity:0,
           y:-50,
           ease:'bounce.out' 
        });
        gsap.from(textRef1.current,{
            duration:1.5,
            opacity:0,
            y:50,
            ease:'bounce.out' 
         });
        return()=> clearInterval(interval);

    },[currentIndex]);

  return (
    <div className='bg-yellow-500 dark:bg-black flex  h-screen '>
        <div className='w-[60%]'>
            <div className='h-[40%] flex justify-center md:justify-end items-center flex-col '>
                <h1 style={{fontFamily:"Playfair Display"}} className=' font-playbill font-[700] md:text-5xl text-[28px] text-green-800' ref={textRef}>WELCOME TO </h1>
                <h1 style={{fontFamily:"Playfair Display"}} className=' font-Poppins font-[700] md:text-5xl text-[24px] text-green-800 pl-[50px]' ref={textRef1}>ADOPT-A-LOVE</h1>
            </div>
            <div className='h-[15%] flex items-start md:justify-end justify-center'>
                <p className='font-Poppins dark:text-[#ccc] font-[400] md:text-l text-sm md:pr-[40px] md:pt-4 md:pl-0 pl-1'>Our mission is to connect loving<br />
                  pets with caring families, creating lifelong bonds.</p>
            </div>
            <div className='h-[30%] flex items-center justify-center'>
                <h1 className='text-[#9D0808] font-Poppins font-[700] md:text-3xl text-2xl'>Give Them <br/>a Second Chance!</h1>
            </div>
            <div className='flex h-[14%] md:justify-center md:pl-[180px] justify-end'>
                <button onClick={()=>{navigate("/adopt")}} className='bg-green-800 h-[40px] md:w-[180px] pr-2 pl-2 font-bold text-center text-white border rounded-lg hover:shadow-[0_0_10px_green]'>ADOPT NOW</button>
            </div>
        </div>
        <div className=' w-[40%] flex justify-center items-center'>
            <div className='md:h-[300px] md:w-[300px] h-[150px] w-[150px] '>
                <img src={Imge[currentIndex]} alt="slide" className='md:h-[300px] md:w-[300px] h-[150] w-[150] object-cover rounded-full border-4  border-black dark:border-green-800  overflow-hidden'></img>
            </div>
        </div>
    </div>
  )
}

export default Header