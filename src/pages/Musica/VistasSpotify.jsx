// VistasSpotify.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Marco4 from "../../assets/img/marcos/Marco4.jpg";
import { guardarCancion, obtenerCanciones } from "../../firebase";
import emailjs from "emailjs-com";

const CLIENT_ID = "7c83b59356ee491b881679e0573ba76f";
const CLIENT_SECRET = "3d30a3aa6c7c48eeb9ff01b2f5f9c99c";

const guestData = {
  Fam001: { name: 'Maria Coronel', guests: 1 },
  Fam002: { name: 'Johanny & Daniel', guests: 4 },

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

function normalizeString(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/gi, '');
}

function isDuplicate(track, existingTracks) {
  const currentName = normalizeString(track.name + track.artists[0].name);
  return existingTracks.some((t) => {
    const existingName = normalizeString(t.track + t.artista);
    return existingName === currentName;
  });
}

const VistasSpotify = () => {
  const navigate = useNavigate();
  const [menuActivo, setMenuActivo] = useState(false);
  const [query, setQuery] = useState("");
  const [token, setToken] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [codigo, setCodigo] = useState("");

  const search = async () => {
    let currentToken = token;
    if (!currentToken) {
      currentToken = await getToken();
      setToken(currentToken);
    }
    if (!query.trim()) return;
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=5`,
      { headers: { Authorization: `Bearer ${currentToken}` } }
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
    setSelectedTrack(track);
  };

  const eliminarCancion = (id) => {
    setSelectedTracks(selectedTracks.filter((t) => t.id !== id));
  };

  const enviarSeleccion = async () => {
    if (!guestData[codigo]) {
      alert("Código no válido.");
      return;
    }

    const cancionesGuardadas = await obtenerCanciones();
    const cancionesNoRepetidas = selectedTracks.filter((track) => !isDuplicate(track, cancionesGuardadas));

    if (cancionesNoRepetidas.length < selectedTracks.length) {
      alert("Una o más canciones ya fueron seleccionadas por otros invitados. Solo se enviarán las no repetidas.");
    }

    if (cancionesNoRepetidas.length === 0) {
      alert("Todas las canciones ya fueron seleccionadas previamente.");
      return;
    }

    const nombreInvitado = guestData[codigo].name;
    const cancionesFormateadas = cancionesNoRepetidas.map((t) => `${t.name} - ${t.artists[0].name}`);

    for (const track of cancionesNoRepetidas) {
      await guardarCancion({
        invitado: nombreInvitado,
        track: track.name,
        artista: track.artists[0].name,
        id: track.id,
        fecha: new Date().toISOString(),
      });
    }

    emailjs.send(
      "service_9ohnj1f", // TU SERVICE ID
      "template_w21418o", // TU TEMPLATE ID
      {
        to_name: "Freddy",
        from_name: nombreInvitado,
        message: cancionesFormateadas.join("\n"),
        reply_to: "frddysign@gmail.com",
      },
      "xgMOMZuu9CkvW9lOF" // TU PUBLIC KEY
    );

    alert("Canciones enviadas con éxito.");
    setSelectedTracks([]);
  };

  return (
    <div className="min-h-screen text-black relative p-4 max-w-xl mx-auto" style={{ backgroundImage: `url(${Marco4})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}>

      <div className="absolute top-1 left-1 z-50">
        <button
          className={`hamburger hamburger--arrow ${menuActivo ? "is-active" : ""}`}
          type="button"
          onClick={() => menuActivo ? navigate("/invitacion") : setMenuActivo(true)}
          aria-label="Menú"
        >
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
      </div>

      <input
        type="text"
        placeholder="Código de invitación"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
        className="block w-full mt-20 p-2 border rounded text-black"
      />

      <div className="flex gap-2 mt-4 items-center">
        <input
          type="text"
          className="flex-grow bg-[#282828] border border-gray-700 rounded p-2 text-black placeholder-gray-400"
          placeholder="Buscar canción o artista"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && search()}
        />
        <button onClick={limpiar} className="bg-[#1db954] hover:bg-[#1ed760] text-black px-4 py-2 rounded font-semibold">
          Limpiar
        </button>
      </div>

      <button onClick={search} className="bg-[#1db954] hover:bg-[#1ed760] text-black px-6 py-2 rounded mt-2 mb-4 font-semibold w-full">
        Buscar
      </button>

      <div className="space-y-2">
        {tracks.map((track) => (
          <div key={track.id} className="p-2 border border-gray-700 rounded cursor-pointer hover:bg-[#282828]" onClick={() => agregarCancion(track)}>
            {track.name} - {track.artists[0].name}
          </div>
        ))}
      </div>

      {selectedTracks.length > 0 && (
        <div className="mt-5 space-y-6">
          <iframe
            src={`https://open.spotify.com/embed/track/${selectedTracks[selectedTracks.length - 1].id}`}
            width="100%"
            height="80"
            frameBorder="0"
            allow="encrypted-media"
            allowTransparency="true"
            title="Spotify Player"
          ></iframe>

            {/* Texto de contador */}
    <h3 className="text-lg font-bold text-center text-black">
      Canciones seleccionadas {selectedTracks.length}/5
    </h3>

    {/* Lista visual de canciones (sin iframe) */}
    {selectedTracks.map((track) => (
      <div
        key={track.id}
        className="relative border border-gray-300 bg-white rounded-lg p-4 shadow-md"
      >
        {/* Botón eliminar */}
        <button
          onClick={() => eliminarCancion(track.id)}
          className="absolute top-2 right-2 text-red-600 text-xl hover:text-red-800 transition-all"
          title="Eliminar canción"
        >
          &times;
        </button>

        <div className="flex items-center gap-4">
          <img
            src={track.album.images[0]?.url}
            alt={`${track.name} cover`}
            className="w-16 h-16 rounded shadow-md"
          />
          <div className="flex-grow">
            <p className="font-semibold text-black">{track.name}</p>
            <p className="text-sm text-gray-600">{track.artists[0].name}</p>
          </div>
        </div>
      </div>
    ))}


          <button
            disabled={selectedTracks.length === 0}
            onClick={enviarSeleccion}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-2 rounded mt-4 w-full"
          >
            Enviar selección
          </button>
        </div>
      )}
    </div>
  );
};

export default VistasSpotify;
