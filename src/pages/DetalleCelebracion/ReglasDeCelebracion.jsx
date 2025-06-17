import React from 'react';
import { useNavigate } from 'react-router-dom';
import pie from '../../assets/img/Detalles/pie.png';
import farol from '../../assets/img/Detalles/farol.png';
import fondo from '../../assets/img/Detalles/fondo.png';

// Tus imágenes personalizadas
import img1 from '../../assets/img/ReglasDeCelebracion/img1.png';
import img2 from '../../assets/img/ReglasDeCelebracion/img2.png';
import img3 from '../../assets/img/ReglasDeCelebracion/img3.png';
import img4 from '../../assets/img/ReglasDeCelebracion/img4.png';
import img5 from '../../assets/img/ReglasDeCelebracion/img5.png';

const ReglasDeCelebracion = () => {
    const navigate = useNavigate();

    // Lista de reglas con imágenes
    const reglas = [
        { texto: 'Olvidarse de los problemas.', imagen: img1 },
        { texto: 'Tener siempre el vaso lleno.', imagen: img2 },
        { texto: 'Disfrutar de la rica comida que elegimos para ti.', imagen: img3 },
        { texto: 'Bailar sin parar.', imagen: img4 },
        { texto: 'Recordar que la vida es hoy.', imagen: img5 }
    ];

    return (
        <div
            className="relative min-h-screen overflow-hidden"
            style={{
                backgroundImage: `url(${fondo})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                boxSizing: 'border-box'
            }}
        >
            <button
                onClick={() => navigate('/invitacion')}
                className="absolute rounded-full top-5 left-5 w-12 h-12 flex items-center justify-center bg-white/20 text-white text-2xl animate-bounce transition duration-700 hover:scale-110 hover:bg-white/30 backdrop-blur-sm"
            >
                ←
            </button>

            <aside className="absolute top-0 right-0 z-10">
                <img src={farol} alt="Farol" className="w-50" />
            </aside>

            <aside className="absolute bottom-0 left-0 z-10">
                <img src={pie} alt="Pie de página" className="w-50" />
            </aside>

            <section className="font1 text-5xl invitacion-section flex flex-col items-center justify-center py-4 mt-8">
                <h1 className="text-4x5 font-dancing">Reglas de Nuestro Matrimonio</h1>
            </section><br />

            {reglas.map((regla, i) => (
                <React.Fragment key={i}>
                    <section className="text-gray-600 body-font">
                        <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
                            <img
                                className="lg:w-1/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
                                alt={`Regla ${i + 1}`}
                                src={regla.imagen}
                            />
                            <div className="text-center lg:w-2/3 w-full">
                                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 font6 semibold">
                                    {regla.texto}
                                </h1>
                            </div>
                        </div>
                    </section>
                    {i < reglas.length - 1 && (
                        <hr className="border-1 border-[#D4AF37] lg:w-1/4 w-full mx-auto items-center justify-center flex-col" />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default ReglasDeCelebracion;
