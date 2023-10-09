"use client";
import React, { useEffect, useState, useRef } from 'react';
import './Hero.css';
import { gsap } from 'gsap';

function Hero() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const gradientTextRef = useRef(null);


    useEffect(() => {
        gsap.to(gradientTextRef.current, {
            backgroundPosition: "-200% 0%",
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
            duration: 5
        });
    }, []);




    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        }

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return (
        <div className="Gcontainer">
            {isMobile ? (
                <div className="Gtext-left">
                    <p ref={gradientTextRef} className="gradientText">Лаборатория улыбок &mdash;<br />
                        нам 10 лет!</p>
                </div>
            ) : (
                <div className="Gtext-left">
                    <p ref={gradientTextRef} className="gradientText">Лаборатория улыбок &mdash;<br />
                        нам 10 лет!</p>
                </div>
            )}
            <div className="Gright-section">
                <div className="Gright-inner">
                    <div className="little-font">
                        <p>Установка виниров высшего качества, признанных лучшими на рынке.</p>
                        <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                            <text
                                class="svg-text"
                                x="0"
                                y="70"
                                fontFamily="Inter"
                                fontWeight="500"
                                fontSize="40"
                                fill="white"
                                textAnchor="start"
                            >
                                Виниры
                                <tspan fill="white"> E-MAX</tspan>
                            </text>
                            <text
                                class="svg-text"

                                x="0"
                                y="150"  // 290 / 1.2 = 241.67
                                fontFamily="Inter"
                                fontWeight="700"
                                fontSize="40"  // 60 / 1.2 = 50
                                textAnchor="start"
                                fill="#dca76d"
                            >
                                45 000 ₽
                            </text>
                            <text
                                class="svg-text"

                                x="190"
                                y="120"  // 350 / 1.2 = 291.67
                                fontFamily="Inter"
                                fontWeight="normal"
                                fontSize="24"  // 36 / 1.2 = 30
                                fill="white"
                                textDecoration="line-through"
                                fillOpacity="0.8"
                                textAnchor="start"
                            >
                                70 000 ₽
                            </text>



                        </svg>
                    </div>
                    <button className="Gbutton">Оставить заявку</button>
                </div>
            </div>
        </div>
    );
}

export default Hero;
