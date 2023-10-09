"use client";
import { React, useRef, useEffect } from "react";
import HeaderBar from "./components/HeaderBar";
import CubeComponent from "./cube/CubeComponent";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import BASec from "./components/BASec/BASec";
import BeforeAfter from "./components/BeforeAfter/BeforeAfter";
import Slider from "./components/Slider/Slider";
import JobsSlider from "./components/JobsSlider/JobsSlider";

import HowTo from "./components/HowTo/HowTo";
import Footer from "./components/Footer/Footer";
import Loader from "./Loader/Loader";

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { CustomEase } from 'gsap/dist/CustomEase';


export default function HomeComponent() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(CustomEase);

    const containerRef = useRef(null);  // ref для всего контейнера

    useEffect(() => {
        const extraScrollHeight = window.innerHeight * 0.3; // это соответствует 30% анимации y: "-30%"
        containerRef.current.style.height = `calc(100vh + ${extraScrollHeight}px)`;

        if (containerRef.current) {
        }
    }, []);

    return (
        <>
            <Loader />
            <HeaderBar />
            <CubeComponent />
            <div data-scroll-container ref={containerRef}>
                <Hero />
                <About />
                <JobsSlider />
                {/* <Slider /> */}
                {/* <BASec /> */}
                <BeforeAfter />
                <HowTo />
                <Footer />
            </div>
        </>
    );
}