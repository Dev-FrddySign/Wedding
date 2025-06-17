import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Fuse from "fuse.js";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import "./Seleccionar.css";

const SeleccionarCanciones = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [token, setToken] = useState("");
    const [results, setResults] = useState([]);
    const [seleccionadas, setSeleccionadas] = useState([]);
    const [showAdmin, setShowAdmin] = useState(false);
    const [authCode, setAuthCode] = useState("");
    const [password, setPassword] = useState("");
    const [usuario, setUsuario] = useState("");

    const modalRef = useRef(null);

    useEffect(() => {
        const fetchToken = async () => {
            const res = await axios.post(
                "https://accounts.spotify.com/api/token",
                new URLSearchParams({ grant_type: "client_credentials" }),
                {
                    headers: {
                        Authorization: `Basic ${btoa("7c83b59356ee491b881679e0573ba76f:3d30a3aa6c7c48eeb9ff01b2f5f9c99c")}`,
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );
            setToken(res.data.access_token);
        };
        fetchToken();
    }, []);

    useEffect(() => {
        if (search.length > 2 && token) {
            axios
                .get("https://api.spotify.com/v1/search", {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { q: search, type: "track", limit: 10 },
                })
                .then((res) => {
                    const fuse = new Fuse(res.data.tracks.items, {
                        keys: ["name", "artists.name"],
                        threshold: 0.4,
                    });
                    const filtered = fuse.search(search).map((r) => r.item);

                    // Quitar duplicados ya seleccionados
                    const noDuplicadas = filtered.filter(
                        (track) => !seleccionadas.some((s) => s.id === track.id)
                    );

                    setResults(noDuplicadas);
                });
        } else {
            setResults([]);
        }
    }, [search, token, seleccionadas]);

    const handleSelect = async (track) => {
        const exists = seleccionadas.find((s) => s.id === track.id);
        if (exists) {
            alert("Esta canción ya fue seleccionada.");
            return;
        }

        setSeleccionadas([...seleccionadas, track]);

        try {
            await addDoc(collection(db, "selecciones"), {
                usuario: usuario || "desconocido",
                trackId: track.id,
                nombre: track.name,
                artista: track.artists[0].name,
                duracion: (track.duration_ms / 60000).toFixed(2) + " min"
            });
        } catch (error) {
            console.error("Error al guardar en Firestore:", error);
        }
    };

    const handleDownload = () => {
        if (authCode !== "Fam000" || password !== "#Saldivia.0203.") {
            alert("Credenciales incorrectas.");
            return;
        }

        const data = seleccionadas.map(track => ({
            artista: track.artists[0].name,
            genero: "No disponible",
            duracion: (track.duration_ms / 60000).toFixed(2) + " min",
            cancion: track.name,
        }));

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "selecciones_boda.json";
        a.click();
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (showAdmin && modalRef.current && !modalRef.current.contains(e.target)) {
                setShowAdmin(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showAdmin]);

    return (
        <div
            className="min-h-screen bg-cover bg-center relative"

        >
            <div className="absolute inset-0  bg-opacity-60 z-0" />

            <div className="relative z-10 p-4 max-w-3xl mx-auto text-white">
                {/* Navbar */}
                <div className="flex justify-between items-center mb-4">
                    <button onClick={() => navigate("/invitacion")} className="text-sm text-blue-300 hover:text-white">
                        Volver a la invitación
                    </button>
                    <button onClick={() => setShowAdmin(true)}>
                        <FaUser className="text-xl" />
                    </button>
                </div>

                {/* Modal Admin */}
                {showAdmin && (
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
                        <form
                            ref={modalRef}
                            className="form bg-zinc-900 text-white rounded-3xl px-8 pt-6 pb-4 shadow-lg max-w-sm w-full relative"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleDownload();
                            }}
                        >
                            <button
                                type="button"
                                onClick={() => setShowAdmin(false)}
                                className="absolute top-3 left-3 text-white text-sm"
                            >
                                Volver
                            </button>

                            <p className="text-center text-xl mb-6">Login</p>

                            <div className="field flex items-center gap-3 bg-zinc-800 p-3 rounded-3xl shadow-inner mb-4">
                                <input
                                    type="text"
                                    placeholder="@ Usuario"
                                    value={authCode}
                                    onChange={(e) => setAuthCode(e.target.value)}
                                    className="bg-transparent border-none outline-none text-gray-300 w-full"
                                    autoComplete="off"
                                />
                            </div>

                            <div className="field flex items-center gap-3 bg-zinc-800 p-3 rounded-3xl shadow-inner mb-4">
                                <input
                                    type="password"
                                    placeholder="🔐 Contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-transparent border-none outline-none text-gray-300 w-full"
                                />
                            </div>

                            <div className="flex justify-center mt-6">
                                <button
                                    type="submit"
                                    className="bg-zinc-700 px-6 py-2 rounded text-white hover:bg-black transition"
                                >
                                    Descargar selección
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="main">
                    <div className="currentplaying">
                        <svg height="50px" width="50px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className="spotify"><radialGradient gradientUnits="userSpaceOnUse" gradientTransform="translate(0 -534)" r="43.888" cy="572.064" cx="33.34" id="ipdIa4~cOclR8yt_ClW93a"><stop stop-color="#f4e9c3" offset="0"></stop><stop stop-color="#f8eecd" offset=".219"></stop><stop stop-color="#fdf4dc" offset=".644"></stop><stop stop-color="#fff6e1" offset="1"></stop></radialGradient><path d="M51.03,37.34c0.16,0.98,1.08,1.66,2.08,1.66h5.39c2.63,0,4.75,2.28,4.48,4.96	C62.74,46.3,60.64,48,58.29,48H49c-1.22,0-2.18,1.08-1.97,2.34c0.16,0.98,1.08,1.66,2.08,1.66h8.39c1.24,0,2.37,0.5,3.18,1.32	C61.5,54.13,62,55.26,62,56.5c0,2.49-2.01,4.5-4.5,4.5h-49c-1.52,0-2.9-0.62-3.89-1.61C3.62,58.4,3,57.02,3,55.5	C3,52.46,5.46,50,8.5,50H14c1.22,0,2.18-1.08,1.97-2.34C15.81,46.68,14.89,44,13.89,44H5.5c-2.63,0-4.75-2.28-4.48-4.96	C1.26,36.7,3.36,35,5.71,35H8c1.71,0,3.09-1.43,3-3.16C10.91,30.22,9.45,29,7.83,29H4.5c-2.63,0-4.75-2.28-4.48-4.96	C0.26,21.7,2.37,20,4.71,20H20c0.83,0,1.58-0.34,2.12-0.88C22.66,18.58,23,17.83,23,17c0-1.66-1.34-3-3-3h-1.18	c-0.62-0.09-1.43,0-2.32,0h-9c-1.52,0-2.9-0.62-3.89-1.61S2,10.02,2,8.5C2,5.46,4.46,3,7.5,3h49c3.21,0,5.8,2.79,5.47,6.06	C61.68,11.92,60.11,14,57.24,14H52c-2.76,0-5,2.24-5,5c0,1.38,0.56,2.63,1.46,3.54C49.37,23.44,50.62,24,52,24h6.5	c3.21,0,5.8,2.79,5.47,6.06C63.68,32.92,61.11,35,58.24,35H53C51.78,35,50.82,36.08,51.03,37.34z" fill="url(#ipdIa4~cOclR8yt_ClW93a)"></path><linearGradient gradientUnits="userSpaceOnUse" gradientTransform="translate(0 -534)" y2="590.253" y1="530.096" x2="32" x1="32" id="ipdIa4~cOclR8yt_ClW93b"><stop stop-color="#42d778" offset="0"></stop><stop stop-color="#3dca76" offset=".428"></stop><stop stop-color="#34b171" offset="1"></stop></linearGradient><path d="M57,32c0,12.837-9.663,23.404-22.115,24.837C33.942,56.942,32.971,57,32,57	c-1.644,0-3.25-0.163-4.808-0.471C15.683,54.298,7,44.163,7,32C7,18.192,18.192,7,32,7S57,18.192,57,32z" fill="url(#ipdIa4~cOclR8yt_ClW93b)"></path><path d="M41.683,44.394c-0.365,0-0.731-0.181-1.096-0.365c-3.471-2.009-7.674-3.105-12.24-3.105	c-2.559,0-5.116,0.364-7.491,0.912c-0.365,0-0.914,0.183-1.096,0.183c-0.914,0-1.461-0.732-1.461-1.462	c0-0.913,0.547-1.463,1.279-1.643c2.923-0.732,5.846-1.096,8.951-1.096c5.116,0,9.866,1.276,13.885,3.655	c0.548,0.364,0.914,0.73,0.914,1.642C43.145,43.847,42.414,44.394,41.683,44.394z M44.241,38.181c-0.547,0-0.912-0.18-1.279-0.364	c-3.835-2.375-9.135-3.839-15.163-3.839c-2.924,0-5.664,0.366-7.674,0.916c-0.549,0.18-0.731,0.18-1.096,0.18	c-1.096,0-1.827-0.912-1.827-1.826c0-1.096,0.549-1.645,1.461-2.009c2.74-0.73,5.481-1.279,9.317-1.279	c6.213,0,12.241,1.463,16.991,4.384c0.73,0.364,1.096,1.096,1.096,1.826C46.069,37.269,45.337,38.181,44.241,38.181z M47.165,30.876	c-0.548,0-0.731-0.182-1.279-0.364c-4.385-2.559-10.961-4.021-17.356-4.021c-3.289,0-6.577,0.366-9.5,1.096	c-0.366,0-0.731,0.182-1.279,0.182c-1.279,0.183-2.193-0.912-2.193-2.192c0-1.279,0.731-2.009,1.644-2.192	c3.471-1.096,7.125-1.462,11.327-1.462c6.943,0,14.25,1.462,19.731,4.567c0.73,0.366,1.278,1.096,1.278,2.193	C49.357,29.961,48.442,30.876,47.165,30.876z" fill="#fff"></path></svg>
                        <p className="heading">Elige tu canción favorita</p>

                        <input
                            type="text"
                            placeholder="(ej. Famxxx)"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            className="flex-row mt-2 ml-10 w-30 h-10 p-2 rounded bg-white bg-opacity-10 text-black placeholder:text-gray-300"
                        />

                        <input
                            className="search w-30 h-10 rounded d-flex flex-row ml-2 mt-2 text-black"
                            type="text"
                            placeholder="Buscar 🔍"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* RESULTADOS CON SCROLL Y LOADER VISUAL */}
                    <div className="results-container overflow-y-auto max-h-[300px] px-4 py-2 space-y-2">
                        {results.map(track => (
                            <div key={track.id} className="p-2 rounded bg-white bg-opacity-10 flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">{track.name}</p>
                                    <p className="text-sm text-gray-700">{track.artists[0].name}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    {/* Botón de seleccionar */}
                                    <button
                                        className="bg-green-700 hover:bg-green-800 text-white px-3 py-1 rounded"
                                        onClick={() => handleSelect(track)}
                                    >
                                        Elegir
                                    </button>
                                    {/* Loader visual estilo Spotify */}
                                    <div className="flex gap-[2px] items-end h-6">
                                        <div className="w-1 bg-green-500 animate-loader-bar1 h-4 rounded-sm"></div>
                                        <div className="w-1 bg-green-500 animate-loader-bar2 h-5 rounded-sm"></div>
                                        <div className="w-1 bg-green-500 animate-loader-bar3 h-3 rounded-sm"></div>
                                        <div className="w-1 bg-green-500 animate-loader-bar1 h-4 rounded-sm"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => setSearch("")}
                        className="text-sm text-red-400 hover:text-white mt-4"
                    >
                        Clear
                    </button>
                </div>

            </div>
        </div>

    );
};


export default SeleccionarCanciones;
