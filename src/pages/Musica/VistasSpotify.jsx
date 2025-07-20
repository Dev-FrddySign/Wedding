import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Marco10 from "../../assets/img/marcos/Marco10.jpg";

const CLIENT_ID = "7c83b59356ee491b881679e0573ba76f";
const CLIENT_SECRET = "3d30a3aa6c7c48eeb9ff01b2f5f9c99c";

const guestData = {
  Fam000: { name: "Prueba", guests: 0 },
  Fam001: { name: "Maria Coronel", guests: 1 },
  Fam002: { name: "Johanny & Daniel", guests: 4 },
  Fam003: { name: "Marialyn Suarez", guests: 3 },
  Fam004: { name: "Delibeth & Alejandra", guests: 2 },
  Fam005: { name: "Ivett & Abuelita", guests: 2 },
  Fam006: { name: "Yordan & Christofer", guests: 2 },
  Fam007: { name: "Daniela & Carlos", guests: 3 },
  Fam008: { name: "Papa y Mama Daniela", guests: 2 },
  Fam009: { name: "Pastor & Angela", guests: 4 },
  Fam010: { name: "Anamilena & Hendry", guests: 3 },
  Fam011: { name: "Susana Lagos", guests: 2 },
  Fam012: { name: "Stefy Quezada", guests: 1 },
  Fam013: { name: "Susana Zelada", guests: 1 },
  Fam014: { name: "Sara Piña", guests: 1 },
  Fam015: { name: "Catalina Guerrero", guests: 1 },
  Fam016: { name: "Lisandro & Ivanna", guests: 2 },
  Fam017: { name: "Ninoska & Esposo", guests: 2 },
  Fam018: { name: "Joanny & Etson", guests: 2 },
  Fam019: { name: "Oscarina y esposo", guests: 2 },
};

async function getToken() {
  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET),
    },
    body: "grant_type=client_credentials",
  });
  const data = await result.json();
  return data.access_token;
}

const VistasSpotify = () => {
  const navigate = useNavigate();
  const [menuActivo, setMenuActivo] = useState(false);
  const [query, setQuery] = useState("");
  const [token, setToken] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [selectedTracks, setSelectedTracks] = useState([]);

  const search = async () => {
    if (!token) {
      const t = await getToken();
      setToken(t);
      return;
    }
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        query
      )}&type=track&limit=5`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    setTracks(data.tracks.items);
  };

  const limpiar = () => {
    setQuery("");
    setTracks([]);
    setSelectedTrack(null);
  };

  const agregarCancion = (track) => {
    if (selectedTracks.find((t) => t.id === track.id)) {
      alert("Ya seleccionaste esta canción.");
      return;
    }
    if (selectedTracks.length >= 5) {
      alert("Solo puedes seleccionar hasta 5 canciones.");
      return;
    }
    setSelectedTracks([...selectedTracks, track]);
    setSelectedTrack(track); // Esto hace que el iframe reproduzca la canción
  };

  const eliminarCancion = (id) => {
    setSelectedTracks(selectedTracks.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen text-black relative p-4 max-w-xl mx-auto"
      // style={{
      //   backgroundImage: `url(${Marco10})`,
      //   backgroundSize: "cover",
      //   backgroundRepeat: "no-repeat",
      //   backgroundPosition: "center",
      //   padding: "20px",
      //   borderRadius: "10px",
      //}}
    >
      <div className="absolute top-1 left-1 z-50">
        <button
          className={`hamburger hamburger--arrow ${menuActivo ? "is-active" : ""
            }`}
          type="button"
          onClick={() => {
            if (menuActivo) {
              navigate("/invitacion");
            } else {
              setMenuActivo(true);
            }
          }}
          aria-label="Menú"
        >
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
      </div>

      <div className="flex gap-2 mb-4 mt-20 items-center">
        <input
          type="text"
          className="flex-grow bg-[#282828] border border-gray-700 rounded p-2 text-black placeholder-gray-400"
          placeholder="Buscar canción o artista"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && search()}
        />
        <button
          onClick={limpiar}
          className="bg-[#1db954] hover:bg-[#1ed760] text-black px-4 py-2 rounded font-semibold"
        >
          Limpiar
        </button>
      </div>

      <button
        onClick={search}
        className="bg-[#1db954] hover:bg-[#1ed760] text-black px-6 py-2 rounded mb-4 font-semibold w-full"
      >
        Buscar
      </button>

      <div className="space-y-2">
        {tracks.map((track) => (
          <div
            key={track.id}
            className="p-2 border border-gray-700 rounded cursor-pointer hover:bg-[#282828]"
            onClick={() => agregarCancion(track)}
          >
            {track.name} - {track.artists[0].name}
          </div>
        ))}
      </div>

      {selectedTracks.length > 0 && (
        <div className="mt-4 border-t pt-4">
          <h3 className="font-semibold mb-2">
            Canciones seleccionadas ({selectedTracks.length}/5):
          </h3>
          <ul>
            {selectedTracks.map((track) => (
              <li
                key={track.id}
                className="flex justify-between items-center p-2 border border-gray-700 rounded mb-1"
              >
                <span>
                  {track.name} - {track.artists[0].name}
                </span>
                <button
                  className="text-red-500 hover:text-red-700 font-bold"
                  onClick={() => eliminarCancion(track.id)}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedTrack && (
        <div className="mt-6">
          <iframe
            src={`https://open.spotify.com/embed/track/${selectedTrack.id}`}
            width="100%"
            height="80"
            frameBorder="0"
            allow="encrypted-media"
            allowTransparency="true"
            title="Spotify Player"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default VistasSpotify;
