import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StyleAuthentication.css';

// Importa tus imágenes de fondo
import bg1 from '../../assets/img/bg1.jpg';
import bg2 from '../../assets/img/bg2.jpg';
import bg3 from '../../assets/img/bg3.jpg';
import bg4 from '../../assets/img/bg4.jpg';

const backgroundImages = [bg1, bg2, bg3, bg4];

const guestData = {
    Fam000: { name: 'Prueba', guests: 0 },
    Fam001: { name: 'Maria Coronel', guests: 1 },
    Fam002: { name: 'Johanny & Daniel', guests: 4 },
    Fam003: { name: 'Marialyn Suarez', guests: 3 },
    Fam004: { name: 'Delibeth & Alejandra', guests: 2 },
    Fam005: { name: 'Ivett & Abuelita', guests: 2 },
    Fam006: { name: 'Yordan & Christofer', guests: 2 },
    Fam007: { name: 'Daniela & Carlos', guests: 3 },
    Fam008: { name: 'Papa y Mama Daniela', guests: 2 },
    Fam009: { name: 'Pastor & Angela', guests: 4 },
    Fam010: { name: 'Anamilena & Hendry', guests: 3 },
    Fam011: { name: 'Susana Lagos', guests: 2 },
    Fam012: { name: 'Stefy Quezada', guests: 1 },
    Fam013: { name: 'Susana Zelada', guests: 1 },
    Fam014: { name: 'Sara Piña', guests: 1 },
    Fam015: { name: 'Catalina Guerrero', guests: 1 },
    Fam016: { name: 'Lisandro & Ivanna', guests: 2 },
    Fam017: { name: 'Ninoska & Esposo', guests: 2 },
    Fam018: { name: 'Joanny & Etson', guests: 2 },
    Fam019: { name: 'Oscarina y esposo', guests: 2 },
};

const Authentication = () => {
    const [submitted, setSubmitted] = useState(false);
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [guestInfo, setGuestInfo] = useState(null);
    const [backgroundIndex, setBackgroundIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setBackgroundIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
        }, 20000); // Cada 20 segundos
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (submitted) {
            document.body.classList.add('authenticated');
        } else {
            document.body.classList.remove('authenticated');
        }
    }, [submitted]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedCode = code.trim();

        if (guestData[trimmedCode]) {
            setGuestInfo(guestData[trimmedCode]);
            setSubmitted(true);
            setError('');
        } else {
            setError('Código incorrecto. Por favor, verifica e intenta nuevamente.');
            setGuestInfo(null);
        }
    };

    const handleGoToInvitation = () => {
        navigate('/invitacion');
    };

    return (
        <div
            className="relative min-h-screen w-full flex items-center justify-center bg-cover bg-center transition-all duration-1000"
            style={{
                backgroundImage: `url(${backgroundImages[backgroundIndex]})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Capa blanca opaca encima del fondo */}
            <div className="absolute inset-0 bg-white/40 z-0" />

            {/* Contenido del formulario */}
            <div className="relative z-10 flex flex-col items-center justify-center w-full">
                {!submitted && (
                    <div className="form-container animate-fade-in">
                        <div className="form-content bg-white/70 backdrop-blur-md p-8 rounded-xl shadow-lg max-w-md w-full border border-white/40 text-center">
                            <h4 className="text-2xl text-black font2 font-semibold mb-2">
                                ¡NOS ENCANTARIA QUE SEAS PARTE DE ESTE DIA TAN ESPECIAL!
                            </h4>
                            <p className="text-black mb-2 font2 font-semibold">Ingresá tu código para continuar:</p>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center ">
                                <input
                                    type="text"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    placeholder="Ej: Fam000"
                                    className="font2 font-semibold w-full px-4 py-2 border rounded-lg text-gray-700 focus:border-blue-500 focus:outline-none"
                                />
                                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                                <button
                                    type="submit"
                                    className="focus:outline-none font-semibold font2 w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 shadow-lg"
                                >
                                    Ver invitación
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {submitted && guestInfo && (
                    <div className="popup-container bg-white/60 backdrop-blur-md p-8 rounded-xl shadow-lg border border-white/40 text-center max-w-md animate-fade-in flex flex-col items-center">
                        <h2 className="text-xl font-bold mb-2 text-gray-800">¡Bienvenid@!</h2>
                        <p className="text-lg text-gray-700 mb-1"><strong>Invitado(s):</strong> {guestInfo.name}</p>
                        <p className="text-gray-700 mb-4"><strong>Número de invitados:</strong> {guestInfo.guests}</p>
                        <button
                            onClick={handleGoToInvitation}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 shadow-lg focus:outline-none display flex justify-center items-center" 
                        >
                            Ver invitación
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Authentication;
