"use client";

import './About.css';
import { gsap } from 'gsap';
import Image from 'next/image'

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
        if (textRefBig.current) {
            const animation = gsap.from(textRefBig.current.children, {
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
            return () => {
                animation.kill();
            };
        }

    }, [isMobile]);

    return (
        <div className="about-grid-container">
            <div className="about-large-box">
                <div ref={textRefBig}>
                    <p><span class="about-text-opacity">Звезды и знаменитости,</span></p>
                    <p>доверяющие <span class="about-text-opacity">нам свои</span> улыбки,</p>
                    <p><span class="about-text-opacity">люди состоятельные. Но даже они</span></p>
                    <p>ценят <span class="about-text-opacity">и считают</span> свои деньги.</p>
                </div>
            </div>
            <div className="about-bottom-section">
                <div className="about-left-box">
                    <div>
                        <p>Доктор Эльмар</p>
                        <p className="about-text-opacity">Основатель и главный врач</p>
                        <Image src="/drElmPod.svg" alt="Подпись" width={200} height={100} />

                    </div>
                </div>
                <div className="about-right-box">
                    <div className="about-right-box-left">
                        <p> А к нам в клинику приходят за
                            высочайшим качеством в
                            стоматологии по демократичной
                            цене, без необходимости выезжать
                            заграницу.</p>
                    </div>
                    <div className="about-right-box-right">
                        <p>Поэтому наши двери всегда открыты,
                            и открыты для всех. А высочайшее
                            качество и сервис мы гарантируем
                            каждому, как популярным людям,
                            так и людям не столь публичным.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
