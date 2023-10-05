
import React, { useRef, useState, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import '../BeforeAfter/BeforeAfter.css';
import './HowTo.css';

function VideoPlayer({ src, className }) {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [canPlay, setCanPlay] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userRequestedPlay, setUserRequestedPlay] = useState(false);
    const HowTovideoWrapperRef = useRef(null);

    const checkBuffer = () => {
        if (videoRef.current && videoRef.current.buffered.length > 0) {
            const loadedPercentage = videoRef.current.buffered.end(0) / videoRef.current.duration;
            if (loadedPercentage > 0.10) {
                setCanPlay(true);
                setIsLoading(false);
                videoRef.current.play();
            } else {
                setTimeout(checkBuffer, 100); // Проверяем буфер каждые 100 мс
            }
        }
    };

    const handlePlayPause = () => {
        console.log("handlePlayPause triggered");
        setUserRequestedPlay(true);

        if (videoRef.current.paused) {
            console.log("Video is paused, trying to play");
            if (!canPlay) {
                console.log("Video is not ready to play yet");
                setIsLoading(true);
                if (videoRef.current) {
                    videoRef.current.setAttribute("autoplay", "true");
                    videoRef.current.load();
                    checkBuffer();
                }
                return;
            }
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            console.log("Video is playing, trying to pause");
            setIsLoading(false); // <--- Добавленная строка
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    useLayoutEffect(() => {
        if (HowTovideoWrapperRef.current) {
            gsap.from(HowTovideoWrapperRef.current, {
                opacity: 0,
                y: 50, // небольшой сдвиг вниз для эффекта "выезда"
                scrollTrigger: {
                    trigger: HowTovideoWrapperRef.current,
                    start: "top 80%", // начать анимацию, когда верх видео достигает 80% высоты экрана
                    toggleActions: "play none none reverse", // проиграть анимацию только один раз при достижении точки
                },
            });
        }
    }, []);
    return (
        <div className={`videoWrapper ${className}`} onClick={handlePlayPause} ref={HowTovideoWrapperRef}>
            <video
                ref={videoRef}
                src={src}
                className="randomVideo"
                poster={`${src.split('.')[0]}.png`}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            ></video>
            <div
                className={`playButton ${isLoading && !isPlaying ? 'loading' : ''}`}
                onClick={(event) => {
                    event.stopPropagation(); // Предотвращаем всплытие события
                    handlePlayPause();
                }}
            >
                {isPlaying ? '⏸' : '▶'}
            </div>
        </div>
    );
}



function HowTo() {
    const HowToheaderRef = useRef(null);

    useLayoutEffect(() => {
        if (HowToheaderRef.current) {
            gsap.to(HowToheaderRef.current, {
                scrollTrigger: {
                    trigger: HowToheaderRef.current,
                    start: "top top",
                    end: () => `+=${document.querySelector(".BaVideos1").offsetHeight - HowToheaderRef.current.offsetHeight}`,
                    pin: true,  // Закрепляем элемент
                    pinSpacing: false,
                    markers: false,
                    scrub: false
                }
            });
        }
    }, []);


    return (
        <div className="BaGeneral">
            <div className="BaHeader" ref={HowToheaderRef}>Про виниры</div>
            <div className="BaVideos1">
                <VideoPlayer className="video1 videoLeft" src="/videos/video21.mp4" />
                <VideoPlayer className="video1" src="/videos/video23.mp4" />
                {/* <VideoPlayer className="video1" src="/videos/video24.mp4" /> */}
                <VideoPlayer className="video1" src="/videos/video25.mp4" />
                <VideoPlayer className="video1" src="/videos/video26.mp4" />
            </div>
        </div>
    );
}

export default HowTo;
