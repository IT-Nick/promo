"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CustomEase } from "gsap/dist/CustomEase";
import './Style.css';
import Hero from "../components/Hero";

function ScrollSection() {
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);

    gsap.registerPlugin(ScrollTrigger, CustomEase);

    const handleScroll = (event) => {
        const scrollTop = window.scrollY;
        const endPosition = triggerRef.current.offsetHeight - window.innerHeight;
        if (scrollTop >= endPosition) {
            window.scrollTo(0, endPosition);
            window.removeEventListener('scroll', handleScroll);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        const pin = gsap.fromTo(
            sectionRef.current,
            {
                translateY: 0,
            },
            {
                translateY: '-300vh',
                duration: 10,  // установите большее значение duration для управления скоростью анимации

                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 4.6,
                    ease: CustomEase.create("custom", "M0,0 C1.062,0.08 0.976,0.024 1,1.014 "),
                    pin: true,
                    markers: true  // добавьте эту строку для отображения маркеров

                },
            }
        );
        return () => {
            pin.kill();
            window.removeEventListener('scroll', handleScroll);
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
                        <Hero />
                    </div>
                    <div className="scroll-section">
                        <Hero />
                    </div>
                    <div className="scroll-section">
                        <Hero />
                    </div>
                </div>

            </div>

        </section>
    );
}

export default ScrollSection;