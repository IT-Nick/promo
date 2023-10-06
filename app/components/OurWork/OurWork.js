"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import './OurWork.css';
import JuxtaposeComponent from './JuxtaposeComponent';

function OurWork() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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
        <div>
            <div className='OurWork-scroll'>
                <div className='OurWork-element'>
                    <div className='OurWork-img-container'>
                        <div className='OurWork-img'>
                            <JuxtaposeComponent
                                id="1"
                                initialPosition="50%" // Set the initial position of the slider (e.g., '50%' for the middle)
                                imageUrlBefore="/OurWork/before.jpeg" // Provide the URL to the 'before' image
                                imageUrlAfter="/OurWork/after.jpeg"   // Provide the URL to the 'after' image
                            />

                        </div>
                    </div>
                    <div className='OurWork-text-container'>
                        <div className='OurWork-text'>
                            А к нам в клинику приходят за высочайшим качеством в стоматологии по демократичной цене, без необходимости выезжать заграницу.
                        </div>
                        <div className='OurWork-text'>
                            Поэтому наши двери всегда открыты, и открыты для всех. А высочайшее качество и сервис мы гарантируем каждому, как популярным людям,
                            так и людям не столь публичным.
                        </div>
                    </div>
                </div>
                <div className='OurWork-element'>
                    <div className='OurWork-img-container'>
                        <div className='OurWork-img'>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OurWork;