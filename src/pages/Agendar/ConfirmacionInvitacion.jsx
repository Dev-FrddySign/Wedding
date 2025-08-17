import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './ConfirmacionInvitacion.css';
import WeddingLoading from '../../component/Loading/WeddingLoading';

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

const usedCodes = new Set();

const ConfirmacionInvitacion = () => {
    const [codigo, setCodigo] = useState('');
    const [invitado, setInvitado] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [menuActivo, setMenuActivo] = useState(false);
    const navigate = useNavigate();

    const handleBuscar = () => {
        const code = codigo.trim();
        if (usedCodes.has(code) && code !== 'Fam000') {
            setError('Este código ya ha sido usado.');
            setInvitado(null);
            return;
        }

        if (guestData[code]) {
            setInvitado(guestData[code]);
            setError('');
        } else {
            setInvitado(null);
            setError('Código no válido. Intenta nuevamente.');
        }
    };

    const enviarRespuesta = async (asistencia) => {
        const mensaje = asistencia ? 'Asistiré' : 'No asistiré';

        const confirmar = await Swal.fire({
            title: 'Confirmar',
            text: `La opción elegida es: ${mensaje}. ¿Estás seguro de tu respuesta?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, confirmar',
            cancelButtonText: 'No, cancelar',
        });

        if (confirmar.isConfirmed) {
            setLoading(true);

            const payload = {
                service_id: 'service_9ohnj1f',
                template_id: 'template_w21418o',
                user_id: 'xgMOMZuu9CkvW9lOF',
                template_params: {
                    code: codigo,
                    name: invitado.name,
                    guests: invitado.guests,
                    asistencia: mensaje,
                },
            };

            try {
                const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });

                setLoading(false);

                if (res.ok) {
                    if (codigo !== 'Fam000') usedCodes.add(codigo);

                    Swal.fire({
                        title: asistencia ? '¡Gracias por confirmar tu asistencia!' : 'Te extrañaremos 😢',
                        text: invitado.name,
                        icon: asistencia ? 'success' : 'info',
                        confirmButtonText: 'Cerrar',
                    });

                    setInvitado(null);
                    setCodigo('');
                    setMenuActivo(false); // opcional: cierra menú si estaba abierto
                } else {
                    throw new Error('Fallo en el envío del correo');
                }
            } catch (err) {
                setLoading(false);
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un problema al enviar tu respuesta. Intenta más tarde.',
                    icon: 'error',
                });
            }
        }
    };

    return (
        <div className="confirm-bg">
            {/* Botón hamburguesa con flecha */}
            <div className="absolute top-5 left-5 z-50">
                <button
                    className={`hamburger hamburger--arrow ${menuActivo ? 'is-active' : ''}`}
                    type="button"
                    onClick={() => {
                        if (menuActivo) {
                            navigate('/invitacion');
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

            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/10 mb-8 image-zoom transition duration-700 ease-in-out hover:scale-105 hover:shadow-xl w-full max-w-md text-black">
                    <h2 className="text-2xl mb-4 text-center font-semibold">Confirma tu asistencia</h2>
                    <div className="text-black flex gap-2 mb-4">
                        <input
                            type="text"
                            value={codigo}
                            onChange={(e) => setCodigo(e.target.value)}
                            placeholder="Ej: Fam000"
                            className="text-black flex-1 p-2 rounded bg-white/20 border border-white/30 placeholder-white/70"
                        />
                        <button
                            onClick={handleBuscar}
                            className="bg-green-900 text-white px-4 py-2 rounded hover:bg-green-800 transition"
                        >
                            Buscar
                        </button>
                    </div>

                    {error && <p className="text-red-400 mb-4">{error}</p>}

                    {loading && (
                        <div className="text-center text-black">
                            <WeddingLoading />
                            <p className="animate-pulse">Enviando confirmación...</p>
                        </div>
                    )}

                    {invitado && !loading && (
                        <div className="space-y-4 text-center">
                            <p><strong>Invitado:</strong> {invitado.name}</p>
                            <p><strong>Cupos disponibles:</strong> {invitado.guests}</p>
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={() => enviarRespuesta(true)}
                                    className="bg-green-900 text-black px-4 py-2 rounded hover:bg-green-800 transition"
                                >
                                    Asistiré
                                </button>
                                <button
                                    onClick={() => enviarRespuesta(false)}
                                    className="bg-green-900 text-black px-4 py-2 rounded hover:bg-green-800 transition"
                                >
                                    No asistiré
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConfirmacionInvitacion;
