"use client";
import React, { useEffect, useState } from 'react';
import './Hero.css';

function Hero() {
    // const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    // useEffect(() => {
    //     const handleResize = () => setIsMobile(window.innerWidth <= 768);
    //     window.addEventListener('resize', handleResize);
    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    // }, []);

    // const handleButtonClick = () => {
    //     window.scrollTo({
    //         top: document.body.scrollHeight,
    //         behavior: 'smooth'
    //     });
    // };

    // useEffect(() => {
    //     const button = document.getElementById('magnetBtn');
    //     const rect = button.getBoundingClientRect();
    //     const maxMove = rect.width / 4;
    //     const magnetRadius = rect.width * 1.05;

    //     const moveButton = (clientX, clientY) => {
    //         const centerX = rect.left + rect.width / 2;
    //         const centerY = rect.top + rect.height / 2;

    //         const distance = Math.sqrt(Math.pow(clientX - centerX, 2) + Math.pow(clientY - centerY, 2));

    //         if (distance < magnetRadius) {
    //             const diffX = clientX - centerX;
    //             const diffY = clientY - centerY;
    //             button.style.transform = `translate(${diffX / 4}px, ${diffY / 4}px)`;
    //         } else {
    //             button.style.transform = '';
    //         }
    //     };

    //     document.addEventListener('mousemove', (e) => moveButton(e.clientX, e.clientY));
    //     document.addEventListener('touchmove', (e) => moveButton(e.touches[0].clientX, e.touches[0].clientY));

    //     const resetButtonPosition = () => {
    //         button.style.transform = '';
    //     };

    //     button.addEventListener('mouseleave', resetButtonPosition);
    //     button.addEventListener('touchend', resetButtonPosition);
    //     button.addEventListener('click', handleButtonClick);
    // }, []);

    return (
        // <div className="grid-container">
        //     {!isMobile &&
        //         <div className="large-box">
        //             <svg viewBox="0 0 400 450" xmlns="http://www.w3.org/2000/svg">
        //                 <text x="0" y="170" fontFamily="Inter" fontWeight="500" fontSize="57.68" fill="white" letterSpacing="-3" dy="-3.75">Лаборатории</text>
        //                 <text x="0" y="220" fontFamily="Inter" fontWeight="500" fontSize="57.68" fill="white" letterSpacing="-3" dy="11.25">улыбок —</text>
        //                 <text x="0" y="270" fontFamily="Inter" fontWeight="500" fontSize="57.68" fill="white" letterSpacing="-3" dy="26.25">10 лет!</text>

        //                 <path transform="scale(0.38) translate(-180, 770)" fill="#dca76d" d="
        // M 481.87 60.53
        // Q 481.96 60.60 482.19 60.61
        // Q 569.84 61.87 657.50 63.34
        // C 664.15 63.45 663.82 70.08 657.43 69.98
        // Q 497.84 67.37 338.25 65.05
        // C 334.54 65.00 333.97 58.50 339.75 58.30
        // Q 389.68 56.59 439.61 54.82
        // Q 439.70 54.82 439.72 54.73
        // Q 439.78 54.55 439.74 54.47
        // Q 439.71 54.41 439.62 54.41
        // Q 347.96 52.76 256.31 50.24
        // C 251.11 50.09 251.02 43.59 255.68 43.40
        // Q 281.64 42.38 368.10 39.72
        // Q 368.19 39.72 368.18 39.63
        // Q 368.18 39.57 368.18 39.56
        // A 0.27 0.26 -85.4 0 0 367.92 39.25
        // Q 205.75 39.25 46.04 39.25
        // C 41.09 39.25 41.24 32.75 45.91 32.75
        // Q 302.65 32.75 559.39 32.75
        // C 564.86 32.75 564.52 39.35 559.00 39.55
        // Q 471.01 42.81 383.00 45.70
        // Q 377.65 45.88 372.20 46.38
        // A 0.15 0.15 0.0 0 0 372.20 46.68
        // C 374.68 46.97 377.53 46.52 379.61 46.56
        // Q 472.58 48.64 565.55 50.34
        // C 567.75 50.38 571.31 49.65 571.64 53.00
        // Q 571.82 54.78 570.80 56.28
        // A 1.17 1.15 12.9 0 1 569.99 56.78
        // Q 566.79 57.24 565.00 57.29
        // Q 523.52 58.57 482.06 60.30
        // Q 481.61 60.32 481.87 60.53
        // Z"
        //                 />
        //             </svg>




        //         </div>
        //     }
        //     <div className="right-section">
        //         <div className="top-box">
        //             <svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        //                 <defs>
        //                     <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        //                         <stop offset="00%" style={{ stopColor: '#D32F2F', stopOpacity: 1 }} /> {/* Пастельный кофейный */}
        //                         <stop offset="50%" style={{ stopColor: '#D32F2F', stopOpacity: 1 }} /> {/* Бирюзовый */}
        //                         <stop offset="100%" style={{ stopColor: '#D32F2F', stopOpacity: 1 }} /> {/* Темно-бирюзовый */}
        //                     </linearGradient>
        //                 </defs>
        //                 {!isMobile && (
        //                     <>
        //                         <text x="0" y="30" fontFamily="Inter" fontWeight="normal" fontSize="24" fill="white" textAnchor="start">
        //                             В честь Дня рождения мы
        //                             <tspan x="0" dy="30">запускаем акцию на установку</tspan>
        //                             <tspan x="0" dy="30">самых качественных виниров</tspan>
        //                             <tspan x="0" dy="30">на рынке.</tspan>
        //                         </text>
        //                     </>
        //                 )}
        //                 <text
        //                     x="0"
        //                     y={isMobile ? "141.67" : "200"}
        //                     fontFamily="Inter"
        //                     fontWeight="500"
        //                     fontSize={isMobile ? "50" : "40"}
        //                     fill="white"
        //                     textAnchor="start"
        //                 >
        //                     Виниры
        //                     {isMobile && <tspan x="0" dy="50" fill="white">E-MAX</tspan>}
        //                     {!isMobile && <tspan fill="white"> E-MAX</tspan>}
        //                 </text>
        //                 <text
        //                     x="0"
        //                     y={isMobile ? "241.67" : "260"}  // 290 / 1.2 = 241.67
        //                     fontFamily="Inter"
        //                     fontWeight={isMobile ? "500" : "700"}
        //                     fontSize={isMobile ? "50" : "40"}  // 60 / 1.2 = 50
        //                     textAnchor="start"
        //                     fill={isMobile ? "url(#gradient)" : "#dca76d"}
        //                 >
        //                     45 000 ₽
        //                 </text>
        //                 <text
        //                     x={isMobile ? "0" : "190"}
        //                     y={isMobile ? "291.67" : "240"}  // 350 / 1.2 = 291.67
        //                     fontFamily="Inter"
        //                     fontWeight="normal"
        //                     fontSize={isMobile ? "30" : "24"}  // 36 / 1.2 = 30
        //                     fill="white"
        //                     textDecoration="line-through"
        //                     fillOpacity="0.8"
        //                     textAnchor="start"
        //                 >
        //                     70 000 ₽
        //                 </text>



        //             </svg>
        //         </div>
        //         <div className="bottom-box">
        //             <button className="magnet-button" id="magnetBtn">Оставить заявку</button>
        //         </div>
        //     </div>
        // </div >
        <div className="Gcontainer">
        <div className="Gtext-left">
            <p>    Лаборатория улыбок &mdash;<br />
                10-летний юбилей</p>
        </div>
        <div className="Gright-section">
            <div className="Gright-inner">
                <div className="little-font">
                    <p>В честь годовщины нашей клиники мы рады предложить вам акцию на установку виниров высшего качества, признанных лучшими на рынке.</p>
                </div>
                <button className="Gbutton">Ваша кнопка</button>
            </div>
        </div>
    </div>
    );
}

export default Hero;
