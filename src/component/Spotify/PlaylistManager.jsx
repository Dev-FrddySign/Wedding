import React, { useState, useEffect } from "react";

export default function PlaylistManager({ accessToken, playlistId }) {
    const [selectedTracks, setSelectedTracks] = useState([]);
    const [addedTrackUris, setAddedTrackUris] = useState(new Set());
    const [message, setMessage] = useState("");

    // Evita duplicados
    const addTrack = (track) => {
        if (addedTrackUris.has(track.uri)) {
            setMessage("La canción ya está en la playlist");
            return;
        }
        setSelectedTracks([...selectedTracks, track]);
        setAddedTrackUris(new Set(addedTrackUris).add(track.uri));
        setMessage("");
    };

    const saveTracksToPlaylist = async () => {
        if (selectedTracks.length === 0) {
            setMessage("No hay canciones para agregar");
            return;
        }
        const uris = selectedTracks.map((t) => t.uri);
        const res = await fetch("/api/spotify", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ access_token: accessToken, playlist_id: playlistId, track_uris: uris }),
        });
        if (res.ok) {
            setSelectedTracks([]);
            setMessage("Canciones agregadas a la playlist correctamente");
        } else {
            setMessage("Error al agregar canciones");
        }
    };

    return (
        <div className="mt-4 p-4 bg-[#121212] text-white rounded">
            <h3 className="mb-2 font-semibold">Canciones seleccionadas para agregar:</h3>
            {selectedTracks.length === 0 ? (
                <p>No has seleccionado canciones</p>
            ) : (
                <ul className="mb-2 max-h-40 overflow-y-auto">
                    {selectedTracks.map((track) => (
                        <li key={track.id}>{track.name} - {track.artists[0].name}</li>
                    ))}
                </ul>
            )}
            <button
                onClick={saveTracksToPlaylist}
                className="bg-[#1db954] px-4 py-2 rounded font-semibold text-black"
                disabled={selectedTracks.length === 0}
            >
                Guardar en playlist
            </button>
            {message && <p className="mt-2">{message}</p>}
        </div>
    );
}
