"use client";
import React, { useEffect } from 'react';
import './Hero.css';

function Hero() {
    useEffect(() => {
        const button = document.getElementById('magnetBtn');
        const rect = button.getBoundingClientRect();
        const maxMove = rect.width / 4; // максимальное смещение кнопки
        const magnetRadius = rect.width * 1.05; // радиус магнитного поля

        document.addEventListener('mousemove', (e) => {
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            // расчет расстояния от центра кнопки до курсора
            const distance = Math.sqrt(Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2));

            // если курсор в пределах магнитного поля
            if (distance < magnetRadius) {
                const diffX = mouseX - centerX;
                const diffY = mouseY - centerY;
                button.style.transform = `translate(${diffX / 4}px, ${diffY / 4}px)`;
            } else {
                button.style.transform = '';
            }
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    }, []);


    return (
            <div className="grid-container">
                <div className="large-box">
                    <svg viewBox="0 0 400 338" xmlns="http://www.w3.org/2000/svg">
                        <text x="0" y="90" fontFamily="Inter" fontWeight="500" fontSize="90" fill="white" letterSpacing="-3">Клинике</text>
                        <text x="0" y="157" fontFamily="Inter" fontWeight="500" fontSize="90" fill="white" letterSpacing="-3" dy="15">Dr. Elmar —</text>
                        <text x="0" y="225" fontFamily="Inter" fontWeight="500" fontSize="90" fill="white" letterSpacing="-3" dy="30">10 лет!</text>
                    </svg>
                </div>
                <div className="right-section">
                    <div className="top-box">
                        <div className="upper-container"></div>
                        <div className="lower-container">
                            <svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
                                <text x="0" y="30" fontFamily="Inter" fontWeight="normal" fontSize="24" fill="white" textAnchor="start" className="hide-on-mobile">
                                    В честь Дня рождения мы
                                    <tspan x="0" dy="30">запускаем акцию на установку</tspan>
                                    <tspan x="0" dy="30">самых качественных виниров</tspan>
                                    <tspan x="0" dy="30">на рынке.</tspan>
                                </text>
                                <text x="0" y="200" fontFamily="Inter" fontWeight="500" fontSize="40" fill="white" textAnchor="start">
                                    Виниры E-MAX
                                </text>
                                <text x="0" y="260" fontFamily="Inter" fontWeight="500" fontSize="40" fill="#dca76d" textAnchor="start">
                                    45 000 ₽
                                </text>
                                <text x="190" y="240" fontFamily="Inter" fontWeight="normal" fontSize="24" fill="white" textDecoration="line-through" fillOpacity="0.8" textAnchor="start">
                                    70 000 ₽
                                </text>
                            </svg>
                        </div>
                    </div>
                    <div className="bottom-box">
                        <button className="magnet-button" id="magnetBtn">Узнать больше</button>
                    </div>

                </div>
            </div >

    );
}

export default Hero;
