// VistasSpotify.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Marco4 from "../../assets/img/marcos/Marco4.jpg";
import { guardarCancion, obtenerCanciones } from "../../firebase";
import emailjs from "emailjs-com";

const CLIENT_ID = "7c83b59356ee491b881679e0573ba76f";
const CLIENT_SECRET = "3d30a3aa6c7c48eeb9ff01b2f5f9c99c";

const guestData = {
    Fam000: { name: 'Prueba', guests: 0 },
    Fam001: { name: 'Maria Coronel', guests: 1 },
    Fam002: { name: 'Flia Abi Karam Rivas', guests: 4 },
    Fam003: { name: 'Flia Suarez', guests: 3 },
    Fam004: { name: 'Flia Briceño Bauza', guests: 2 },
    Fam005: { name: 'Flia Briceño', guests: 2 },
    Fam006: { name: 'Flia Pedreañez', guests: 2 },
    Fam007: { name: 'Flia Perozo Barrios', guests: 3 },
    Fam008: { name: 'Flia Barrios', guests: 2 },
    Fam009: { name: 'Flia Alvarado Barrios', guests: 4 },
    Fam010: { name: 'Flia Gonzalez Acosta', guests: 3 },
    Fam011: { name: 'Susana Lagos & Compañia', guests: 2 },
    Fam012: { name: 'Stefy Quezada', guests: 1 },
    Fam013: { name: 'Susana Zelada', guests: 1 },
    Fam014: { name: 'Sara Piña', guests: 1 },
    Fam015: { name: 'Catalina Guerrero', guests: 1 },
    Fam016: { name: 'Lisandro Castillo & Compañia', guests: 2 },
    Fam017: { name: 'Patricia Hernandez', guests: 1 },
    Fam018: { name: 'Julie Arias & Compañia', guests: 2 },
    Fam019: { name: 'Flia Boscan Mora', guests: 2 },
    Fam020: { name: 'Flia Luca Ramirez', guests: 2 },
    Fam021: { name: 'Flia Tejada Romero', guests: 2 },
    Fam022: { name: 'Hectluis Leon', guests: 1 },
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
  return str.toLowerCase().replace(/[^a-z0-9]/gi, "");
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
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [codigo, setCodigo] = useState("");
  const [loading, setLoading] = useState(false); // Estado loading agregado

  const search = async () => {
    let currentToken = token;
    if (!currentToken) {
      currentToken = await getToken();
      setToken(currentToken);
    }
    if (!query.trim()) return;
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        query
      )}&type=track&limit=5`,
      { headers: { Authorization: `Bearer ${currentToken}` } }
    );
    const data = await res.json();
    setTracks(data.tracks.items);
  };

  const limpiar = () => {
    setQuery("");
    setTracks([]);
    setSelectedTracks([]);
    setCodigo("");
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
  };

  const eliminarCancion = (id) => {
    setSelectedTracks(selectedTracks.filter((t) => t.id !== id));
  };

  const enviarSeleccion = async () => {
    const codigoNormalizado = codigo.trim().toLowerCase();

    if (!guestData[codigoNormalizado]) {
      alert("Código no válido.");
      return;
    }

    if (selectedTracks.length === 0) {
      alert("No has seleccionado ninguna canción.");
      return;
    }

    setLoading(true); // Activa spinner

    try {
      // Obtener canciones guardadas para filtrar duplicados
      const cancionesGuardadas = await obtenerCanciones();
      const cancionesNoRepetidas = selectedTracks.filter(
        (track) => !isDuplicate(track, cancionesGuardadas)
      );

      if (cancionesNoRepetidas.length < selectedTracks.length) {
        alert(
          "Una o más canciones ya fueron seleccionadas por otros invitados. Solo se enviarán las no repetidas."
        );
      }

      if (cancionesNoRepetidas.length === 0) {
        alert("Todas las canciones ya fueron seleccionadas previamente.");
        setLoading(false);
        return;
      }

      const nombreInvitado = guestData[codigoNormalizado].name;
      const numeroInvitados = guestData[codigoNormalizado].guests;
      const cancionesFormateadas = cancionesNoRepetidas.map(
        (t) => `${t.name} - ${t.artists[0].name}`
      );

      // Guardar canciones en Firebase
      for (const track of cancionesNoRepetidas) {
        await guardarCancion({
          invitado: nombreInvitado,
          track: track.name,
          artista: track.artists[0].name,
          id: track.id,
          fecha: new Date().toISOString(),
        });
      }

      const emailParams = {
        to_name: "Freddy",
        name: nombreInvitado,
        guestsData: codigoNormalizado.toUpperCase(),
        guests: numeroInvitados,
        canciones: cancionesFormateadas.join("\n"),
        reply_to: "frddysign@gmail.com",
      };

      await emailjs.send(
        "service_9ohnj1f", // service ID correcto
        "template_u0q3e2o", // template ID correcto para canciones
        emailParams,
        "xgMOMZuu9CkvW9lOF" // public key
      );

      alert("Se envió tu selección."); // Popup luego de enviar

      limpiar();
    } catch (error) {
      console.error("Error enviando email:", error);
      alert("Error al enviar las canciones. Intenta nuevamente.");
    } finally {
      setLoading(false); // Desactiva spinner
    }
  };

  return (
    <div
      className="min-h-screen text-black relative p-4 max-w-xl mx-auto"
      style={{
        backgroundImage: `url(${Marco4})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute top-1 left-1 z-50">
        <button
          className={`hamburger hamburger--arrow ${
            menuActivo ? "is-active" : ""
          }`}
          type="button"
          onClick={() =>
            menuActivo ? navigate("/invitacion") : setMenuActivo(true)
          }
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
        <button
          onClick={limpiar}
          className="bg-[#1db954] hover:bg-[#1ed760] text-black px-4 py-2 rounded font-semibold"
        >
          Limpiar
        </button>
      </div>

      <button
        onClick={search}
        className="bg-[#1db954] hover:bg-[#1ed760] text-black px-6 py-2 rounded mt-2 mb-4 font-semibold w-full"
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
        <div className="mt-5 space-y-6">
          <iframe
            src={`https://open.spotify.com/embed/track/${
              selectedTracks[selectedTracks.length - 1].id
            }`}
            width="100%"
            height="80"
            frameBorder="0"
            allow="encrypted-media"
            allowTransparency="true"
            title="Spotify Player"
          ></iframe>

          <h3 className="text-lg font-bold text-center text-black">
            Canciones seleccionadas {selectedTracks.length}/5
          </h3>

          {selectedTracks.map((track) => (
            <div
              key={track.id}
              className="relative border border-gray-300 bg-white rounded-lg p-4 shadow-md"
            >
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

          {/* Spinner y botón */}
          {loading && (
            <div className="flex justify-center items-center space-x-2 mb-4">
              <svg
                className="animate-spin h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              <span>Enviando selección...</span>
            </div>
          )}

          <button
            disabled={selectedTracks.length === 0 || loading}
            onClick={enviarSeleccion}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-2 rounded mt-4 w-full"
          >
            {loading ? "Enviando..." : "Enviar selección"}
          </button>
        </div>
      )}
    </div>
  );
};

export default VistasSpotify;
