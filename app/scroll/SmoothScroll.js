"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CustomEase } from "gsap/dist/CustomEase";
import './Style.css';

gsap.registerPlugin(ScrollTrigger);


function ScrollSection() {

    const main = useRef();
    const sectionPin = useRef();
    useEffect(() => {
        const ctx = gsap.context((self) => {
            gsap.to(sectionPin.current, {
                y: 600,
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
                <div ref={sectionPin} className="scrol-2">
                    <h1 className='title'>asdasd</h1>


                </div>
                <p>
                video video video video video video video video video
                video video video video video video video video video
                video video video video video video video video video
                video video video video video video video video video
                video video video video video video video video video
                video video video video video video video video video
            </p>
            <p>
            video video video video video video video video video
                video video video video video video video video video
                video video video video video video video video video
                video video video video video video video video video
                video video video video video video video video video
                video video video video video video video video video
            </p>
            <p>
            video video video video video video video video video
                video video video video video video video video video
                video video video video video video video video video
                video video video video video video video video video
                video video video video video video video video video
                video video video video video video video video video
            </p>
            <p>
            video video video video video video video video video
                video video video video video video video video video
                video video video video video video video video video
                video video video video video video video video video
                video video video video video video video video video
                video video video video video video video video video
            </p>
            <p>
            video video video video video video video video video
                video video video video video video video video video
                video video video video video video video video video
                video video video video video video video video video
                video video video video video video video video video
                video video video video video video video video video
            </p>



            <p>
            video video video video video video video video video
                video video video video video video video video video
                video video video video video video video video video
                video video video video video video video video video
                video video video video video video video video video
                video video video video video video video video video
            </p>
            <p>
            video video video video video video video video video
                video video video video video video video video video
                video video video video video video video video video
                video video video video video video video video video
                video video video video video video video video video
                video video video video video video video video video
            </p>
            <p>
            video video video video video video video video video
                video video video video video video video video video
                video video video video video video video video video
                video video video video video video video video video
                video video video video video video video video video
                video video video video video video video video video
            </p>
            <p>
            video video video video video video video video video
                video video video video video video video video video
                video video video video video video video video video
                video video video video video video video video video
                video video video video video video video video video
                video video video video video video video video video
            </p>
            <p>
            video video video video video video video video video
                video video video video video video video video video
                video video video video video video video video video
                video video video video video video video video video
                video video video video video video video video video
                video video video video video video video video video
            </p>

            <p>
            video video video video video video video video video
                video video video video video video video video video
                video video video video video video video video video
                video video video video video video video video video
                video video video video video video video video video
                video video video video video video video video video
            </p>
           

            </div>
        </div>


    );
}

export default ScrollSection;