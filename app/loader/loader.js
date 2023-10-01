"use client";
import React, { useEffect } from "react";
import gsap from "gsap";
import Image from 'next/image';

function Loader({ isLoaded }) {
    useEffect(() => {
        const tl = gsap.timeline();

        // Анимация для мигания SVG
        tl.to(".loader-svg", { opacity: 0.5, yoyo: true, repeat: -1, duration: 1.5 });

        return () => {
            tl.kill();
        };
    }, []);

    useEffect(() => {
        if (isLoaded) {
            gsap.to(".loader", {
                opacity: 0,
                duration: 3.5,
                onComplete: () => {
                    setIsLoaded(false); // Теперь эта функция доступна для `Loader`, и она обновит состояние в `HomeComponent`
                }
            });
        }
    }, [isLoaded]);


    return (
        <div className="loader" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 1000,
            backgroundColor: 'black',
            display: 'flex',
            alignItems: 'center',  // выровнять по вертикали
            justifyContent: 'center',  // выровнять по горизонтали
            opacity: 1
        }}>
            <div className="loader-svg">
                <Image src="/Cube/Logo.svg" alt="Loader" width={100} height={100} />
            </div>
        </div>
    );
}

export default Loader;
