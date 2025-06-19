import React, { useRef, useState, useEffect } from 'react';
import './SpotifyPlayer.css';
import cancion from '../../assets/audio/16.- Que Mas Puedo Pedir (bonus track) - Carin Leon.mp3';

const SpotifyPlayer = () => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.volume = 0;
            audio.play()
                .then(() => {
                    setIsPlaying(true);
                    let currentVolume = 0;
                    const interval = setInterval(() => {
                        if (currentVolume < 1) {
                            currentVolume = Math.min(currentVolume + 0.05, 1);
                            audio.volume = currentVolume;
                            setVolume(currentVolume);
                        } else {
                            clearInterval(interval);
                        }
                    }, 200);
                })
                .catch(err => {
                    console.warn('Reproducción automática bloqueada por el navegador.', err);
                    setIsPlaying(false);
                });
        }
    }, []);

    const onLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    };

    const onTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleVolumeChange = e => {
        const v = parseFloat(e.target.value);
        setVolume(v);
        audioRef.current.volume = v;
    };

    const formatTime = sec => {
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const progressPercent = duration ? (currentTime / duration) * 100 : 0;

    return (
        <div className="card">
            <audio
                ref={audioRef}
                src={cancion}
                onLoadedMetadata={onLoadedMetadata}
                onTimeUpdate={onTimeUpdate}
            />

            <div className="top">
                <div className="pfp">
                    <div className="playing">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className={`greenline line-${i + 1}`}></div>
                        ))}
                    </div>
                </div>
                <div className="texts">
                    <p className="title-1">
                        <span>Que más puedo pedir (bonus track)</span>
                    </p>
                    <p className="title-2">Carín León</p>
                </div>
            </div>

            <div className="controls">
                <div className="vol-control">
                    <svg className="volume_button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height="20" width="24" style={{ marginTop: '15px', marginLeft: '10px' }}>
                        <path clipRule="evenodd" fillRule="evenodd" d="M11.26 3.691A1.2 1.2 0 0 1 12 4.8v14.4a1.199 1.199 0 0 1-2.048.848L5.503 15.6H2.4a1.2 1.2 0 0 1-1.2-1.2V9.6a1.2 1.2 0 0 1 1.2-1.2h3.103l4.449-4.448a1.2 1.2 0 0 1 1.308-.26Zm6.328-.176a1.2 1.2 0 0 1 1.697 0A11.967 11.967 0 0 1 22.8 12a11.966 11.966 0 0 1-3.515 8.485 1.2 1.2 0 0 1-1.697-1.697A9.563 9.563 0 0 0 20.4 12a9.565 9.565 0 0 0-2.812-6.788 1.2 1.2 0 0 1 0-1.697Zm-3.394 3.393a1.2 1.2 0 0 1 1.698 0A7.178 7.178 0 0 1 18 12a7.18 7.18 0 0 1-2.108 5.092 1.2 1.2 0 1 1-1.698-1.698A4.782 4.782 0 0 0 15.6 12a4.78 4.78 0 0 0-1.406-3.394 1.2 1.2 0 0 1 0-1.698Z" />
                    </svg>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        className="volume-slider"
                        value={volume}
                        onChange={handleVolumeChange}
                    />
                </div>

            

                {/* BOTÓN DE PLAY/PAUSE CORREGIDO PARA MÓVILES */}
                <div
                    onClick={togglePlay}
                    className="play-pause"
                    style={{
                        padding: '12px',
                        cursor: 'pointer',
                        zIndex: 100,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        touchAction: 'manipulation'
                    }}
                >
                    {isPlaying ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height="32" width="32">
                            <path clipRule="evenodd" fillRule="evenodd" d="M8 5h2v14H8zm6 0h2v14h-2z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height="32" width="32">
                            <path clipRule="evenodd" fillRule="evenodd" d="M8 5v14l11-7z" />
                        </svg>
                    )}
                </div>

                
                <div onClick={() => setLiked(!liked)} className="heart">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" stroke="currentColor" fill={liked ? 'red' : 'none'} height="20" width="24">
                        <path d="M3.343 7.778a4.5 4.5 0 0 1 7.339-1.46L12 7.636l1.318-1.318a4.5 4.5 0 1 1 6.364 6.364L12 20.364l-7.682-7.682a4.501 4.501 0 0 1-.975-4.904Z" />
                    </svg>
                </div>
            </div>

            <div className="time">
                <div className="elapsed" style={{ width: `${progressPercent}%` }}></div>
            </div>
            <p className="timetext time_now">{formatTime(currentTime)}</p>
            <p className="timetext time_full">{formatTime(duration)}</p>
        </div>
    );
};

export default SpotifyPlayer;
