import React, { useRef, useState } from 'react';

const SongPlayer = ({ audioUrl }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(100); // Porcentaje del 0 al 100

    const togglePlayback = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }

        setIsPlaying(!isPlaying);
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseInt(e.target.value, 10);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume / 100; // Convertimos a 0.0 - 1.0
        }
    };

    return (
        <div className="bg-white shadow-lg p-4 rounded-xl w-full max-w-md mx-auto flex flex-col items-center gap-4">
            <audio ref={audioRef} src={audioUrl} preload="auto" />

            <div className="flex items-center gap-2">
                <button
                    onClick={togglePlayback}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    {isPlaying ? '⏸ Pausar' : '▶️ Reproducir'}
                </button>
            </div>

            <div className="w-full flex flex-col items-center">
                <label className="text-sm text-gray-700 font-medium mb-1">Volumen: {volume}%</label>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full accent-blue-500"
                />
            </div>
        </div>
    );
};

export default SongPlayer;
