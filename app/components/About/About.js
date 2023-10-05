"use client";

import './About.css';
import { gsap } from 'gsap';

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

function About() {

    const textRef = useRef(null); // Добавим ссылку на текст
    const textRef2 = useRef(null); // Добавим ссылку на текст

    const textRefBig = useRef(null); // Добавим ссылку на текст
    const textRef2Big = useRef(null); // Добавим ссылку на текст
    const textRef3Big = useRef(null); // Добавим ссылку на текст

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useLayoutEffect(() => {
        // Анимация GSAP
        if (textRef.current) {
            gsap.from(textRef.current.children, {
                opacity: 0,
                y: 30,
                stagger: 0.3,
                scrollTrigger: {
                    trigger: textRef.current,
                    start: "top+=30 90%",
                    end: "bottom-=30 40%",
                    markers: false,
                    scrub: 3,
                    toggleActions: "play none none none"
                }
            });
        }
        if (textRef2.current) {
            gsap.from(textRef2.current.children, {
                opacity: 0,
                y: 30,
                stagger: 0.3,
                scrollTrigger: {
                    trigger: textRef2.current,
                    start: "top+=30 90%",
                    end: "bottom-=30 40%",
                    markers: false,
                    scrub: 1,
                    toggleActions: "play none none none"
                }
            });
        }
        if (textRefBig.current) {
            gsap.from(textRefBig.current.children, {
                opacity: 0,
                y: 30,
                stagger: 0.3,
                scrollTrigger: {
                    trigger: textRefBig.current,
                    start: "top-=50 100%",
                    end: "bottom+=5 80%",
                    markers: false,
                    scrub: 1,
                    toggleActions: "play none none none"
                }
            });
        }
        if (textRef2Big.current) {
            gsap.from(textRef2Big.current.children, {
                opacity: 0,
                y: 30,
                stagger: 0.3,
                scrollTrigger: {
                    trigger: textRef2Big.current,
                    start: "top-=50 100%",
                    end: "bottom-=30 60%",
                    markers: false,
                    scrub: 1,
                    toggleActions: "play none none none"
                }
            });
        }
        if (textRef3Big.current) {
            gsap.from(textRef3Big.current.children, {
                opacity: 0,
                y: 30,
                stagger: 0.3,
                scrollTrigger: {
                    trigger: textRef3Big.current,
                    start: "top-=50 100%",
                    end: "bottom-=30 60%",
                    markers: false,
                    scrub: 1,
                    toggleActions: "play none none none"
                }
            });
        }

    }, [isMobile]);

    return (
        <div className="about-grid-container">
            <div className="about-large-box">
                <svg viewBox={isMobile ? "0 0 400 338" : "0 0 400 100"} xmlns="http://www.w3.org/2000/svg">
                    {isMobile ? (
                        <>
                            <g ref={textRef}>

                                <text x="0" y="40" fontFamily="Arial" fontSize="35" fill="white">
                                    Звезды и знаменитости,
                                </text>
                                <text x="0" y="80" fontFamily="Arial" fontSize="35" fill="white">
                                    доверяющие нам свои
                                </text>
                                <text x="0" y="120" fontFamily="Arial" fontSize="35" fill="white">
                                    прекрасные улыбки -
                                </text>
                                <text x="0" y="160" fontFamily="Arial" fontSize="35" fill="white">
                                    люди состоятельные.
                                </text>
                                <text x="0" y="200" fontFamily="Arial" fontSize="35" fill="white">
                                    Но даже они ценят и
                                </text>
                                <text x="0" y="240" fontFamily="Arial" fontSize="35" fill="white">
                                    считают свои деньги.
                                </text>
                            </g>

                        </>
                    ) : (
                        <>
                            <g ref={textRefBig}>

                                <text x="0" y="20" fontFamily="Arial" fontSize="20" fill="white">
                                    Звезды и знаменитости,
                                </text>
                                <text x="0" y="40" fontFamily="Arial" fontSize="20" fill="white">
                                    доверяющие нам свои улыбки,
                                </text>
                                <text x="0" y="60" fontFamily="Arial" fontSize="20" fill="white">
                                    люди состоятельные. Но даже
                                </text>
                                <text x="0" y="80" fontFamily="Arial" fontSize="20" fill="white">
                                    они ценят и считают свои деньги.
                                </text>
                            </g>
                        </>
                    )}
                </svg>
            </div>
            <div className="about-bottom-section">
                <div className="about-left-box">
                    <svg viewBox="0 0 400 138" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                        {/* Gradient */}
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="00%" style={{ stopColor: '#D32F2F', stopOpacity: 1 }} />
                                <stop offset="50%" style={{ stopColor: '#D32F2F', stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: '#D32F2F', stopOpacity: 1 }} />
                            </linearGradient>
                        </defs>
                        {isMobile ? (
                            <>
                                <g ref={textRef2}>
                                    <line x1="0" y1="5" x2="400" y2="5" stroke="white" strokeWidth="2" />
                                    <text x="0" y="60" fontFamily="Inter" fontWeight="normal" fontSize="34" fill="white" textAnchor="start">
                                        <tspan x="0" dy="40">В клинику приходят за</tspan>
                                        <tspan x="0" dy="40">высочайшим качеством</tspan>
                                        <tspan x="0" dy="40">в стоматологии по</tspan>
                                        <tspan x="0" dy="40">демократичной цене,</tspan>
                                        <tspan x="0" dy="40">без необходимости</tspan>
                                        <tspan x="0" dy="40">выезжать заграницу.</tspan>
                                    </text>
                                </g>
                            </>
                        ) : (
                            <g ref={textRef2Big}>
                                <text x="0" y="25" fontFamily="Inter" fontWeight="normal" fontSize="16" fill="white" textAnchor="start">
                                    А к нам в клинику приходят за
                                    <tspan x="0" dy="20">высочайшим качеством в</tspan>
                                    <tspan x="0" dy="20">стоматологии по демократичной</tspan>
                                    <tspan x="0" dy="20">цене, без необходимости выезжать</tspan>
                                    <tspan x="0" dy="20">заграницу.</tspan>
                                </text>
                            </g>
                        )}
                    </svg>
                </div>
                <div className="about-right-box">
                    <svg viewBox="0 0 400 138" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                        {/* Gradient */}
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="00%" style={{ stopColor: '#D32F2F', stopOpacity: 1 }} />
                                <stop offset="50%" style={{ stopColor: '#D32F2F', stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: '#D32F2F', stopOpacity: 1 }} />
                            </linearGradient>
                        </defs>
                        {!isMobile && (
                            <g ref={textRef3Big}>
                                <text x="0" y="25" fontFamily="Inter" fontWeight="normal" fontSize="16" fill="white" textAnchor="start">
                                    Поэтому наши двери всегда открыты,
                                    <tspan x="0" dy="20">и открыты для всех. А высочайшее</tspan>
                                    <tspan x="0" dy="20">качество и сервис мы гарантируем</tspan>
                                    <tspan x="0" dy="20">каждому, как популярным людям,</tspan>
                                    <tspan x="0" dy="20">так и людям не столь публичным.</tspan>
                                </text>
                            </g>
                        )}
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default About;
