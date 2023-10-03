"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from 'next/image';

function Loader() {

    const refLoader = useRef(null)
    const [isLoaded, setAllIsLoaded] = useState(false);

    useEffect(() => {
        const tl = gsap.timeline();

        // Анимация для мигания SVG
        tl.to(".loader-svg", { opacity: 0.5, yoyo: true, repeat: -1, duration: 1.5 });

        // Устанавливаем задержку для лоадера в 3 секунды
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
            });
        }
    }, [isLoaded]);

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
