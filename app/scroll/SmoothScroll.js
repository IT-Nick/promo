"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CustomEase } from "gsap/dist/CustomEase";
import './Style.css';
import Hero from "../components/Hero";
import About from "../components/About";

function ScrollSection() {
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);

    gsap.registerPlugin(ScrollTrigger, CustomEase);

    useEffect(() => {
        const pin = gsap.fromTo(
            sectionRef.current,
            {
                translateY: 0,
            },
            {
                translateY: 0,
                duration: 0.01,
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: "bottom top",
                    
                    scrub: 8.6,
                    ease: CustomEase.create("custom", "M0,0 C1.062,0.08 0.976,0.024 1,1.014 "),
                    pin: true,
                    pinSpacing: false,

                    markers: true
                },
            }
        );
        return () => {
            pin.kill();
        };
    }, []);

    return (
        <section ref={triggerRef} className="scroll-section-outer">
            {/* The section up act just as a wrapper. If the trigger (below) is the
      first jsx element in the component, you get an error on route change */}

            {/* The div below act just as a trigger. As the doc suggests, the trigger and 
      the animation should alway be two separated refs */}
            <div ref={sectionRef}>
                <div className="scroll-section-inner">
                    <div className="scroll-section">
                        <Hero />
                    </div>
                    <div className="scroll-section">
                        <About />
                    </div>
                </div>

            </div>

        </section>
    );
}

export default ScrollSection;