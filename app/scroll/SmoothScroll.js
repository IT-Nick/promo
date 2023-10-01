"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CustomEase } from "gsap/dist/CustomEase";
import './Style.css';

gsap.registerPlugin(ScrollTrigger);


function ScrollSection() {
    const main = useRef();
    useEffect(() => {
        const ctx = gsap.context((self) => {
            gsap.to(".scrol-2", {
                x: 150,
                scrollTrigger: {
                    trigger: ".scroll-section",
                    start: 'top top',
                    end: 'top 20%',
                    scrub: true,
                    markers: true
                },
            });
        }, main);
        return () => ctx.revert();
    }, []);

    return (

        <div className="scroll-section">
            <div className="scrol-2">
                <h1 className='title'>asdasd</h1>


            </div>

            <p>
                asdasdasda asdasda asdasd asdasd asdasd asd asd a
                asdasdasda asdasda asdasd asdasd asdasd asd asd a
                asdasdasda asdasda asdasd asdasd asdasd asd asd a
                asdasdasda asdasda asdasd asdasd asdasd asd asd a
                asdasdasda asdasda asdasd asdasd asdasd asd asd a
                asdasdasda asdasda asdasd asdasd asdasd asd asd a
                asdasdasda asdasda asdasd asdasd asdasd asd asd a
                asdasdasda asdasda asdasd asdasd asdasd asd asd a
            </p>
            <p>
                asdasdasda asdasda asdasd asdasd asdasd asd asd a
                asdasdasda asdasda asdasd asdasd asdasd asd asd a
                asdasdasda asdasda asdasd asdasd asdasd asd asd a
                asdasdasda asdasda asdasd asdasd asdasd asd asd a
                asdasdasda asdasda asdasd asdasd asdasd asd asd a
                asdasdasda asdasda asdasd asdasd asdasd asd asd a
                asdasdasda asdasda asdasd asdasd asdasd asd asd a
                asdasdasda asdasda asdasd asdasd asdasd asd asd a
            </p>
            <p>
                asdasdasda asdasda asdasd asdasd asdasd asd asd a
                asdasdasda asdasda asdasd asdasd asdasd asd asd a
                asdasdasda asdasda asdasd asdasd asdasd asd asd a
                asdasdasda asdasda asdasd asdasd asdasd asd asd a
                asdasdasda asdasda asdasd asdasd asdasd asd asd a
                asdasdasda asdasda asdasd asdasd asdasd asd asd a
                asdasdasda asdasda asdasd asdasd asdasd asd asd a
                asdasdasda asdasda asdasd asdasd asdasd asd asd a
            </p>
            <p>
                asdasdasda asdasda asdasd asdasd asdasd asd asd a
                asdasdasda asdasda asdasd asdasd asdasd asd asd a
                asdasdasda asdasda asdasd asdasd asdasd asd asd a
                asdasdasda asdasda asdasd asdasd asdasd asd asd a
                asdasdasda asdasda asdasd asdasd asdasd asd asd a
                asdasdasda asdasda asdasd asdasd asdasd asd asd a
                asdasdasda asdasda asdasd asdasd asdasd asd asd a
                asdasdasda asdasda asdasd asdasd asdasd asd asd a
            </p>
            <p>
                asdasdasda asdasda asdasd asdasd asdasd asd asd a
                asdasdasda asdasda asdasd asdasd asdasd asd asd a
                asdasdasda asdasda asdasd asdasd asdasd asd asd a
                asdasdasda asdasda asdasd asdasd asdasd asd asd a
                asdasdasda asdasda asdasd asdasd asdasd asd asd a
                asdasdasda asdasda asdasd asdasd asdasd asd asd a
                asdasdasda asdasda asdasd asdasd asdasd asd asd a
                asdasdasda asdasda asdasd asdasd asdasd asd asd a
            </p>

        </div>

    );
}

export default ScrollSection;