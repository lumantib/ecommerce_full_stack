import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";


// import required modules
import { Navigation } from "swiper";
import styled from "styled-components";

const Wrapper=styled.div`
    display:flex;
    height:600px;
    width:100%;     
    z-index:1;
    transition:all 5s ease;
`

const DemoSlider = () => {
    
  return (
    <Wrapper>
        
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide><img src="/images/3.jpg" style={{width:"100%", height:"100%"}}/></SwiperSlide>
        <SwiperSlide>
            <div className="flex  h-[700px]">
                <img src="/images/4.jpg" style={{height:"700px", width:"1200px"}}/>
                <div className="h-[700px] w-full flex flex-col justify-center items-center bg-yellow-50 m-2 mt-0">
                    <h1 className="font-bold text-[50px] text-center">Summer Collection</h1><br/>
                    <p className="font-bold text-[22px] mt-6 tracking-widest">Check out the website every @Friday
                    <br/> to get heavy discount upto 50%</p>
                    <button className=" font-bold p-2 border-current mt-8 ring-black bg-slate-300 text-black">Shop now</button>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-row-reverse h-[700px] ">
            <img src="./images/1.jpg" className="h-[604px]  w-[892px] flex flex-col-reverse"/>
            <div className="h-[700px] w-full flex flex-col justify-center items-center m-2 mt-0 bg-orange-100">
              <h1 className="font-bold text-[50px] text-center">Women's Collection</h1>
              <p className="font-bold text-[20px] text-justify m-5 ">Affordable Thrift Store is continously engage in supporting second hand business. We choose the 
                best dress for your fit at affordable price. <br/>
              </p>
              <p className="font-bold text-[30px] text-center tracking-wider">Grab the hot offer!!!</p>
              <button className="text-center font-bold p-2 border-current mt-8 bg-slate-300">Shop Now</button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-full flex">
            <img src="./images/men.png" className="h-[650px] w-[942px]"/> 
            <div className="h-full w-[1000px] flex flex-col justify-center items-center bg-slate-100 m-2 mt-0"> 
              <h1 className="font-bold text-[50px] text-center">Men's Collection</h1>
              <p className="font-bold text-[20px] text-justify m-5">Exclusive second hand men's item only at @Affordable Thrift Store</p>
              <p className="font-bold text-[22px] text-center tracking-wider">Hurry up and grab it before its gone!!!</p>
              <button className="text-center font-bold p-2 border-current mt-8 bg-slate-300">Shop Now</button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-full w-full flex flex-row"> 
            <img src="./images/kids.jpg" className="h-[600px] w-[700px]"/>
            <div className=" bg-pink-100 w-[800px] justify-center mt-0 items-center flex flex-col h-full m-2">
              <h1 className="text-[50px] font-bold text-center">Kid's Collection</h1>
              <p className="text-[20px] font-bold m-4 flex flex-col text-justify text-center">Buy clothes, accessories and toys for kids only at 
              <br/>@Affordable Thrift Store</p>
              <p className="text-[20px] font-bold">Hurry up and grab the amazing offer for your kids!!!</p>
              <button className="text-[20px] font-bold p-2 mt-8 border-current bg-slate-300">Shop Now</button>
            </div>
          </div>
        </SwiperSlide>

      </Swiper>
      
      </Wrapper>
  )
}

export default DemoSlider
