import React, { useRef, useState, useLayoutEffect } from 'react';
import './Slider.css';
import { gsap } from 'gsap';
import Image from 'next/image';


function ImagePlayer({ src, className, counter, caption }) {
    return (
        <div className={`QvideoWrapper ${className}`}>
            <div className="QvideoCounter">{String(counter).padStart(2, '0')}</div>
            <div className="QvideoContent">
                <Image src={src} alt={caption} width={200} height={300} />
                <div className="QvideoCaption">{caption}</div>
            </div>
        </div>
    );
}



function Slider() {
    const videosRef = useRef(null);

    useLayoutEffect(() => {
        if (videosRef.current) {
            const videoChildren = [...videosRef.current.children];
            const clonedVideos = videoChildren.map(video => video.cloneNode(true));

            clonedVideos.forEach(clonedVideo => videosRef.current.appendChild(clonedVideo));

            const halfWidth = videosRef.current.scrollWidth / 2; // половина ширины

            const animateSlider = () => {
                if (videosRef.current.scrollLeft >= halfWidth) {
                    videosRef.current.scrollLeft = 0;
                } else {
                    videosRef.current.scrollLeft += 2; // скорость движения
                }
                requestAnimationFrame(animateSlider);
            };

            animateSlider();
        }
    }, []);

    return (
        <div className="QBaGeneral">
            <div className="QBaHeader">До и после</div>
            <div className="QBaVideos" ref={videosRef}>
                <ImagePlayer className="Qimage1 QimageL1 Qleftmost" src="/videos/video1.png" counter={1} caption="Подпись для изображения 1" />
                <ImagePlayer className="Qimage1 QimageL1 Qleftmost" src="/videos/video12.png" counter={1} caption="Подпись для изображения 1" />
                <ImagePlayer className="Qimage1 QimageL1 Qleftmost" src="/videos/video13.png" counter={1} caption="Подпись для изображения 1" />
                <ImagePlayer className="Qimage1 QimageL1 Qleftmost" src="/videos/video14.png" counter={1} caption="Подпись для изображения 1" />
                <ImagePlayer className="Qimage1 QimageL1 Qleftmost" src="/videos/video15.png" counter={1} caption="Подпись для изображения 1" />
                <ImagePlayer className="Qimage1 QimageL1 Qleftmost" src="/videos/video16.png" counter={1} caption="Подпись для изображения 1" />
                <ImagePlayer className="Qimage1 QimageL1 Qleftmost" src="/videos/video17.png" counter={1} caption="Подпись для изображения 1" />
            </div>
        </div>
    );
}

export default Slider;
