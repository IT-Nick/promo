import React, { useRef, useState, useLayoutEffect } from 'react';
import './BeforeAfter.css';
import { gsap } from 'gsap';


function VideoPlayer({ src, className, counter, caption }) {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [canPlay, setCanPlay] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userRequestedPlay, setUserRequestedPlay] = useState(false);
    const videoWrapperRef = useRef(null);

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
        if (videoWrapperRef.current) {
            let rotationValue = 0;
            let xValue = 0;  // смещение по оси X
            const width = videoWrapperRef.current.offsetWidth;


            const animation = gsap.from(videoWrapperRef.current, {
                opacity: 0,
                y: 50, // небольшой сдвиг вниз для эффекта "выезда"
                rotation: rotationValue, // поворот видео
                duration: 0.5,
                scrollTrigger: {
                    trigger: videoWrapperRef.current,
                    start: "top 80%", // начать анимацию, когда верх видео достигает 80% высоты экрана
                    toggleActions: "play none none reverse", // проиграть анимацию только один раз при достижении точки
                },
            });

            return () => {
                animation.kill();
            };
        }
    }, []);

    return (
        <div className={`videoWrapper ${className}`} onClick={handlePlayPause} ref={videoWrapperRef}>
            <div className="videoCounter">{String(counter).padStart(2, '0')}</div>
            <div className="videoContent">

                <video
                    ref={videoRef}
                    src={src}
                    className="randomVideo"
                    poster={`${src.split('.')[0]}.png`}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                >
                </video>
                <div className="videoCaption">{caption}</div>
            </div>

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



function BeforeAfter() {
    const headerRef = useRef(null);

    useLayoutEffect(() => {
        if (headerRef.current) {
            const animation = gsap.to(headerRef.current, {
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: "top 15%",
                    end: () => `+=${document.querySelector(".BaVideos").offsetHeight - headerRef.current.offsetHeight}`,
                    pin: true,  // Закрепляем элемент
                    pinSpacing: false,
                    markers: false,
                    scrub: false
                }
            });

            return () => {
                animation.kill();
            };
        }

    }, []);



    return (
        <div className="BaGeneral">
            <div className="BaHeader" ref={headerRef}>До и после</div>
            <div className="BaVideos">
                <VideoPlayer className="video1 videoL1 leftmost" src="/videos/video1.mp4" counter={1} caption="Подпись для видео 1" />
                <VideoPlayer className="video1 videoL1" src="/videos/video12.mp4" counter={2} caption="Подпись для видео 2" />
                <VideoPlayer className="video1 videoL1 rightmost" src="/videos/video13.mp4" counter={3} caption="Подпись для видео 3" />
                <VideoPlayer className="video1 videoL1 leftmost" src="/videos/video14.mp4" counter={4} caption="Подпись для видео 4" />
                <VideoPlayer className="video1 videoL1" src="/videos/video15.mp4" counter={5} caption="Подпись для видео 5" />
                <VideoPlayer className="video1 videoL1 rightmost" src="/videos/video16.mp4" counter={6} caption="Подпись для видео 6" />
                <VideoPlayer className="video1 videoL1" src="/videos/video17.mp4" counter={7} caption="Подпись для видео 7" />
            </div>
        </div>
    );
}

export default BeforeAfter;
