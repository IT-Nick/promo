"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from 'next/image';

function Loader() {
    const refLoader = useRef(null)
    const [isLoaded, setAllIsLoaded] = useState(false);
    const [isAnimationComplete, setIsAnimationComplete] = useState(false); // новое состояние

    useEffect(() => {
        const tl = gsap.timeline();

        tl.to(".loader-svg", { opacity: 0.5, yoyo: true, repeat: -1, duration: 1.5 });

        setTimeout(() => {
            setAllIsLoaded(true);
        }, 3000);

        return () => {
            tl.kill();
        };
    }, []);

    useEffect(() => {
        if (isLoaded) {
            gsap.to(refLoader.current, {
                opacity: 0,
                duration: 1,
                onComplete: () => setIsAnimationComplete(true) // устанавливаем состояние после завершения анимации
            });
        }
    }, [isLoaded]);

    if (isAnimationComplete) return null; // если анимация завершена, не отображаем лоадер

    return (
        <div className="loader" ref={refLoader} style={{
            color: "white",
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
