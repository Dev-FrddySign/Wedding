import React, { useRef, useState, useEffect } from 'react';
import './SpotifyPlayer.css';
import cancion from '../../assets/audio/16.- Que Mas Puedo Pedir (bonus track) - Carin Leon.mp3';

const SpotifyPlayer = () => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.volume = 1;
            audio.play()
                .then(() => setIsPlaying(true))
                .catch(() => setIsPlaying(false));
        }
    }, []);

    const togglePlay = () => {
        if (!audioRef.current) return;
        isPlaying ? audioRef.current.pause() : audioRef.current.play();
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        if (!audioRef.current) return;
        audioRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    return (
        <>
            <audio ref={audioRef} src={cancion} />

            <div className="top-right-controls">
                <button onClick={toggleMute} className="circle-button translucent" aria-label="Mute toggle">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" height="20" width="20">
                        {isMuted ? (
                            <>
                                <path d="M5 9v6h4l5 5V4l-5 5H5z" />
                                <line x1="4" y1="4" x2="20" y2="20" stroke="white" strokeWidth="2" />
                            </>
                        ) : (
                            <path d="M5 9v6h4l5 5V4l-5 5H5z" />
                        )}
                    </svg>
                </button>

                <button onClick={togglePlay} className="circle-button translucent" aria-label="Play/Pause toggle">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" height="20" width="20">
                        {isPlaying ? (
                            <path d="M8 5h2v14H8zm6 0h2v14h-2z" />
                        ) : (
                            <path d="M8 5v14l11-7z" />
                        )}
                    </svg>
                </button>
            </div>
        </>
    );
};

export default SpotifyPlayer;
