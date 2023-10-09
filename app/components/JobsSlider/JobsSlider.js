import React, { useRef, useState, useLayoutEffect } from 'react';
import './JobsSlider.css';
import Image from 'next/image';
import { gsap } from 'gsap';

function ImagePlayer({ className, counter, src, src2, caption }) {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const sliderRef = useRef(null);


    const handleMouseDown = (e) => {
        setIsDragging(true);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e) => {
        if (isDragging && sliderRef.current) {
            const rect = sliderRef.current.getBoundingClientRect();
            let newPosition = ((e.clientX - rect.left) / rect.width) * 100;

            // Ограничиваем newPosition, чтобы он не выходил за границы 0-100
            newPosition = Math.max(0, Math.min(100, newPosition));
            setSliderPosition(newPosition);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    const handleTouchStart = (e) => {
        setIsDragging(true);
        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);
    };

    const handleTouchMove = (e) => {
        e.preventDefault();
        if (isDragging && sliderRef.current) {
            const clientX = e.touches[0].clientX;
            const rect = sliderRef.current.getBoundingClientRect();
            let newPosition = ((clientX - rect.left) / rect.width) * 100;

            // Ограничиваем newPosition, чтобы он не выходил за границы 0-100
            newPosition = Math.max(0, Math.min(100, newPosition));
            setSliderPosition(newPosition);
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
    };

    return (
        <div className={`SliderImageWrapper ${className}`}>
            <div className="SliderRectangle" ref={sliderRef} onMouseMove={handleMouseMove} onTouchMove={handleTouchMove}>
                <div className="ImageLayer" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
                    <Image src={src} layout="fill" objectFit="cover" alt={caption} />
                </div>
                <div className="ImageLayer" style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}>
                    <Image src={src2} layout="fill" objectFit="cover" alt={`Modified ${caption}`} />
                </div>
                <div className="SliderBar" style={{ left: `${sliderPosition}%` }}>
                    <div className="SliderHandle" onMouseDown={handleMouseDown} onTouchStart={handleTouchStart}></div>
                </div>
            </div>
        </div>
    );



}







function JobsSlider() {
    const sliderTrackRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const progressBarRef = useRef(null);

    const animateToSlide = (index) => {
        if (sliderTrackRef.current) {
            const slideWidth = window.innerWidth * (70 / 1.5) / 100;
            const margin = window.innerWidth * (6 / 1.5) / 100;
            const offsetToCenter = (window.innerWidth - slideWidth) / 2;
            const distance = (index * slideWidth) + (index * margin) - offsetToCenter;

            gsap.killTweensOf(sliderTrackRef.current);
            gsap.to(sliderTrackRef.current, {
                x: -distance,
                duration: 0.5
            });

            gsap.killTweensOf(progressBarRef.current);
            gsap.to(progressBarRef.current, {
                width: `${(index / maxIndex) * 100}%`,
                duration: 0.5
            });
        }
    };










    useLayoutEffect(() => {
        // Установка начального значения width для SliderProgressBar
        gsap.set(progressBarRef.current, {
            width: '0%'
        });
        animateToSlide(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);




    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevIndex => {
                const newIndex = prevIndex - 1;
                animateToSlide(newIndex);
                return newIndex;
            });
        }
    };

    const handleNext = () => {
        if (currentIndex < 5) { // как и раньше, предполагаем, что у нас 7 слайдов
            setCurrentIndex(prevIndex => {
                const newIndex = prevIndex + 1;
                animateToSlide(newIndex);
                return newIndex;
            });
        }
    };
    const maxIndex = 5; // Общее количество слайдов минус 2 (так как на экране одновременно 2 слайда и еще половина третьего)
    const progressPercentage = (currentIndex / maxIndex) * 100;

    return (
        <div className="SliderContainer">
            <div className="SliderProgressBarContainer">
                <div className="SliderProgressBar" ref={progressBarRef}></div>
            </div>
            <div className="SliderControls">
                <button className="SliderPrevButton" onClick={handlePrev}>←</button>
                <button className="SliderNextButton" onClick={handleNext}>→</button>
            </div>
            <div className="SliderViewport">
                <div className="SliderTextContainer">
                    <div className="SliderTextBefore">Наши работы, до и после</div>
                </div>
                <div className="SliderTrack" ref={sliderTrackRef}>
                    <ImagePlayer className="Eimage1 EimageL1 Eleftmost" src="/videos/video1.png" src2="/videos/video12.png" counter={1} caption="Подпись для изображения 1" />
                    <ImagePlayer className="Eimage1 EimageL1 Eleftmost" src="/videos/video12.png" src2="/videos/video13.png" counter={2} caption="Подпись для изображения 2" />
                    <ImagePlayer className="Eimage1 EimageL1 Eleftmost" src="/videos/video13.png" src2="/videos/video14.png" counter={3} caption="Подпись для изображения 3" />
                    <ImagePlayer className="Eimage1 EimageL1 Eleftmost" src="/videos/video14.png" src2="/videos/video15.png" counter={4} caption="Подпись для изображения 4" />
                    <ImagePlayer className="Eimage1 EimageL1 Eleftmost" src="/videos/video15.png" src2="/videos/video16.png" counter={5} caption="Подпись для изображения 5" />
                    <ImagePlayer className="Eimage1 EimageL1 Eleftmost" src="/videos/video16.png" src2="/videos/video1.png" counter={6} caption="Подпись для изображения 6" />
                </div>
            </div>
        </div>
    );
}

export default JobsSlider;