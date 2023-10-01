"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CustomEase } from "gsap/dist/CustomEase";
import './Style.css';
import Hero from "../components/Hero";
import BeforeAfter from "../components/BeforeAfter";

gsap.registerPlugin(ScrollTrigger);


function ScrollSection() {

    const main = useRef();
    const sectionPin = useRef();
    useEffect(() => {
        const ctx = gsap.context((self) => {
            gsap.to(sectionPin.current, {
                y: 500,
                scrollTrigger: {
                    trigger:  main.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                    markers: true,
                },
            });
        }, main);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={main}>
            <div className="scroll-section">
            <Hero />
            <Hero />
            <BeforeAfter sectionPin={sectionPin}/>
            <Hero />
            </div>
        </div>


    );
}

export default ScrollSection;