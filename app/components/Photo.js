"use client";
import React, { useEffect, useState } from 'react';
import './Photo.css';

function Photo() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const button = document.getElementById('magnetBtn');
        const rect = button.getBoundingClientRect();
        const maxMove = rect.width / 4;
        const magnetRadius = rect.width * 1.05;

        const moveButton = (clientX, clientY) => {
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const distance = Math.sqrt(Math.pow(clientX - centerX, 2) + Math.pow(clientY - centerY, 2));

            if (distance < magnetRadius) {
                const diffX = clientX - centerX;
                const diffY = clientY - centerY;
                button.style.transform = `translate(${diffX / 4}px, ${diffY / 4}px)`;
            } else {
                button.style.transform = '';
            }
        };

        document.addEventListener('mousemove', (e) => moveButton(e.clientX, e.clientY));
        document.addEventListener('touchmove', (e) => moveButton(e.touches[0].clientX, e.touches[0].clientY));

        const resetButtonPosition = () => {
            button.style.transform = '';
        };

        button.addEventListener('mouseleave', resetButtonPosition);
        button.addEventListener('touchend', resetButtonPosition);
    }, []);

    return (
        <div className="grid-container">
            {!isMobile &&
                <div className="large-box">
                    <svg viewBox="0 0 400 338" xmlns="http://www.w3.org/2000/svg">
                        <>
                            <text x="0" y="82.5" fontFamily="Inter" fontWeight="500" fontSize="57.68" fill="white" letterSpacing="-3" dy="-3.75">Фотки</text>
                            <text x="0" y="149.5" fontFamily="Inter" fontWeight="500" fontSize="57.68" fill="white" letterSpacing="-3" dy="11.25">Фотки —</text>
                            <text x="0" y="217.5" fontFamily="Inter" fontWeight="500" fontSize="57.68" fill="white" letterSpacing="-3" dy="26.25">10 лет!</text>
                        </>
                    </svg>
                </div>
            }
            <div className="right-section">
                <div className="top-box">
                    <svg viewBox="0 0 400 338" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="00%" style={{ stopColor: '#D32F2F', stopOpacity: 1 }} /> {/* Пастельный кофейный */}
                                <stop offset="50%" style={{ stopColor: '#D32F2F', stopOpacity: 1 }} /> {/* Бирюзовый */}
                                <stop offset="100%" style={{ stopColor: '#D32F2F', stopOpacity: 1 }} /> {/* Темно-бирюзовый */}
                            </linearGradient>
                        </defs>
                        {!isMobile && (
                            <>
                                <text x="0" y="30" fontFamily="Inter" fontWeight="normal" fontSize="24" fill="white" textAnchor="start">
                                    В честь Дня рождения мы
                                    <tspan x="0" dy="30">запускаем акцию на установку</tspan>
                                    <tspan x="0" dy="30">самых качественных виниров</tspan>
                                    <tspan x="0" dy="30">на рынке.</tspan>
                                </text>
                            </>
                        )}
                        <text
                            x="0"
                            y={isMobile ? "141.67" : "200"}
                            fontFamily="Inter"
                            fontWeight="500"
                            fontSize={isMobile ? "50" : "40"}
                            fill="white"
                            textAnchor="start"
                        >
                            Виниры
                            {isMobile && <tspan x="0" dy="50" fill="white">E-MAX</tspan>}
                            {!isMobile && <tspan fill="white"> E-MAX</tspan>}
                        </text>
                        <text
                            x="0"
                            y={isMobile ? "241.67" : "260"}  // 290 / 1.2 = 241.67
                            fontFamily="Inter"
                            fontWeight={isMobile ? "500" : "700"}
                            fontSize={isMobile ? "50" : "40"}  // 60 / 1.2 = 50
                            textAnchor="start"
                            fill={isMobile ? "url(#gradient)" : "#dca76d"}
                        >
                            45 000 ₽
                        </text>
                        <text
                            x={isMobile ? "0" : "190"}
                            y={isMobile ? "291.67" : "240"}  // 350 / 1.2 = 291.67
                            fontFamily="Inter"
                            fontWeight="normal"
                            fontSize={isMobile ? "30" : "24"}  // 36 / 1.2 = 30
                            fill="white"
                            textDecoration="line-through"
                            fillOpacity="0.8"
                            textAnchor="start"
                        >
                            70 000 ₽
                        </text>



                    </svg>
                </div>
                <div className="bottom-box">
                    <button className="magnet-button" id="magnetBtn">Узнать больше</button>
                </div>
            </div>
        </div >
    );
}

export default Photo;
