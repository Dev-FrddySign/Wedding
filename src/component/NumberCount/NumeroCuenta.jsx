import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "hamburgers/dist/hamburgers.css";
import Marco9 from "../../assets/img/marcos/Marco9.jpg";

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

const NumeroCuenta = () => {
    const [codigo, setCodigo] = useState("");
    const [autorizado, setAutorizado] = useState(false);
    const [nombreInvitado, setNombreInvitado] = useState("");
    const [menuActivo, setMenuActivo] = useState(false);

    const navigate = useNavigate();

    const verificarInvitado = () => {
        const codigoTrim = codigo.trim();
        if (guestData[codigoTrim]) {
            setAutorizado(true);
            setNombreInvitado(guestData[codigoTrim].name);
            setCodigo(codigoTrim);
        } else {
            setAutorizado(false);
            alert("Código inválido ❌");
        }
    };

    const copiar = (texto) => {
        navigator.clipboard.writeText(texto).then(() => {
            alert(`"${texto}" copiado al portapapeles ✅`);
        });
    };

    const descargarNota = () => {
        const codigoTrim = codigo.trim();
        const invitado = guestData[codigoTrim];
        const nombreParaNota = invitado ? invitado.name : "Invitado";

        const texto = ` Regalo de bodas Freddy y Graciela
Gracias ${nombreParaNota}

Nombre: Freddy José Saldivia Rodríguez
RUT: 12.345.678-9
Banco: Banco Estado
Tipo de cuenta: Cuenta Corriente
N° Cuenta: 00000000000000
Correo: frddysign@gmail.com

"Agradecemos su compañía en este día, y si desean obsequiarnos con alegría, un aporte en efectivo, con mucho amor, nos ayudará a construir nuestro futuro mejor."
        `.trim();

        const blob = new Blob([texto], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "DatosBancarios_Freddy.txt";
        a.click();

        URL.revokeObjectURL(url);
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-6 relative"
            style={{ backgroundImage: `url(${Marco9})` }}
        >
            {/* Botón Hamburguesa */}
            <div className="absolute top-4 left-4 z-50">
                <button
                    className={`hamburger hamburger--arrow ${menuActivo ? "is-active" : ""}`}
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

            <div className="max-w-md w-full bg-white/90 shadow-lg rounded-xl p-6 border border-gray-200">
                {!autorizado ? (
                    <>
                        <h2 className="text-xl font-semibold mb-4 text-center">Ingresa tu código</h2>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={codigo}
                                onChange={(e) => setCodigo(e.target.value)}
                                placeholder="Ej: Fam000"
                                className="flex-1 border rounded-lg px-3 py-2"
                            />
                            <button
                                onClick={verificarInvitado}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                            >
                                Ver
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                            Hola, {nombreInvitado}
                        </h2>
                        <p className="text-center font-semibold text-gray-600 mb-6">
                            "Agradecemos su compañía en este día, y si desean obsequiarnos con alegría, un aporte en efectivo, con mucho amor, nos ayudará a construir nuestro futuro mejor."
                        </p>

                        <div className="space-y-2 text-sm text-gray-700 cursor-pointer select-none mb-8">
                            <div onClick={() => copiar("Graciela Rivas")}>
                                <strong>Nombre:</strong> Graciela Rivas
                            </div>
                            <div onClick={() => copiar("26350589-1")}>
                                <strong>RUT:</strong> 26350589-1
                            </div>
                            <div onClick={() => copiar("Banco Falabella ")}>
                                <strong>Banco:</strong> Banco Falabella
                            </div>
                            <div onClick={() => copiar("Cuenta Corriente")}>
                                <strong>Tipo de cuenta:</strong> Cuenta Corriente
                            </div>
                            <div onClick={() => copiar("19991545728")}>
                                <strong>N° Cuenta:</strong> 19991545728
                            </div>
                            <div onClick={() => copiar("grivascoronel@gmail.com")}>
                                <strong>Correo:</strong> grivascoronel@gmail.com
                            </div>
                        </div>

                        <button
                            onClick={descargarNota}
                            className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                        >
                            📥 Descargar Nota
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default NumeroCuenta;
