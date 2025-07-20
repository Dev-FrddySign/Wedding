import React, { useState } from "react";

export default function SpotifySearch({ accessToken, onSelectTrack }) {
    const [query, setQuery] = useState("");
    const [tracks, setTracks] = useState([]);

    const search = async () => {
        if (!accessToken || !query) return;
        const res = await fetch(
            `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=5`,
            {
                headers: { Authorization: `Bearer ${accessToken}` },
            }
        );
        const data = await res.json();
        setTracks(data.tracks ? data.tracks.items : []);
    };

    return (
        <div className="p-4 bg-[#121212] rounded text-white">
            <div className="flex gap-2 mb-4 items-center">
                <input
                    type="text"
                    placeholder="Buscar canción o artista"
                    className="flex-grow bg-[#282828] p-2 rounded"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && search()}
                />
                <button
                    onClick={() => {
                        setQuery("");
                        setTracks([]);
                    }}
                    className="bg-[#1db954] px-4 py-2 rounded font-semibold text-black"
                >
                    Limpiar
                </button>
                <button
                    onClick={search}
                    className="bg-[#1db954] px-6 py-2 rounded font-semibold text-black"
                >
                    Buscar
                </button>
            </div>

            {tracks.map((track) => (
                <div
                    key={track.id}
                    className="cursor-pointer p-2 hover:bg-[#282828] rounded"
                    onClick={() => onSelectTrack(track)}
                >
                    {track.name} - {track.artists[0].name}
                </div>
            ))}
        </div>
    );
}
