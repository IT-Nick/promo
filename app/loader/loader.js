"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from 'next/image';


function Loader() {

    const refLoader = useRef(null)
    const refText = useRef(null)
    const [isLoaded, setAllIsLoaded] = useState(false);
    const [progressValue, setProgressValue] = useState(0);

    useEffect(() => {
        const tl = gsap.timeline();

        // Анимация для мигания SVG
        tl.to(".loader-svg", { opacity: 0.5, yoyo: true, repeat: -1, duration: 1.5 });

        const imagesVideos = Array.from(document.images);
        const len = imagesVideos.length;
        let counter = 0;

        if (len == 0) {
            setProgressValue(100)
            setTimeout(() => setAllIsLoaded(true), 3000);  // Добавлено задержка
        }
        else {
            const loadImage = image => {
                return new Promise((resolve, reject) => {
                    const loadImg = new Image()
                    loadImg.src = image.src
                    loadImg.onload = () => {
                        counter++;
                        const currentProgress = Math.round((counter / len) * 100);
                        setProgressValue(currentProgress)
                        resolve();
                    }
                    loadImg.onerror = err => reject(err)
                })
            }

            Promise.all(imagesVideos.map(image => loadImage(image)))
                .then(() => {
                    setProgressValue(100)
                    setTimeout(() => setAllIsLoaded(true), 3000);  // Добавлено задержка
                })
                .catch(err => {
                    setAllIsLoaded(true)
                    console.log("Failed to load images", err)
                })
        }

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
            <span ref={refText}>{progressValue}%</span>
        </div>
    );
}

export default Loader;
