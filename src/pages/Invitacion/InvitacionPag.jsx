import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from 'scrollreveal';
import Countdown from '../../component/Countdown/Countdown';
import './StyleInvitacion.css';

import Arrow from '../../assets/img/svg/arrow.svg';

import { ParallaxScrollDemo } from '../../component/ParallaxScroll/ParallaxScrollDemo';

import Fondo1 from '../../assets/img/fondo1.png';
import Foto1 from '../../assets/img/marquee-wrapper/Foto1.jpg';
import Foto2 from '../../assets/img/marquee-wrapper/Foto2.jpg';
import Foto3 from '../../assets/img/marquee-wrapper/Foto3.jpg';
import Foto4 from '../../assets/img/marquee-wrapper/Foto4.jpg';
import Foto5 from '../../assets/img/marquee-wrapper/Foto5.jpg';
import Foto6 from '../../assets/img/marquee-wrapper/Foto6.jpg';
import Foto7 from '../../assets/img/marquee-wrapper/Foto7.jpg';
import Foto8 from '../../assets/img/marquee-wrapper/Foto8.jpg';
import Foto9 from '../../assets/img/marquee-wrapper/Foto9.jpg';
import Foto10 from '../../assets/img/marquee-wrapper/Foto10.jpg';
import Foto11 from '../../assets/img/marquee-wrapper/Foto11.jpg';
import Foto12 from '../../assets/img/marquee-wrapper/Foto12.jpg';
import Foto13 from '../../assets/img/marquee-wrapper/Foto13.jpg';
import Foto14 from '../../assets/img/marquee-wrapper/Foto14.jpg';


import Iglesia from '../../assets/img/svg/Iglesia.gif';
import Brindar from '../../assets/img/svg/Brindar.gif';
import DessCode from '../../assets/img/svg/DressCode.gif';
import Regalo from '../../assets/img/svg/regalo.gif';
import Baile from '../../assets/img/svg/baile.gif';
import Foto from '../../assets/img/svg/foto.gif';
import Musica from '../../assets/img/svg/musica.gif';

import AsideIzq from '../../assets/img/aside/AsideIzq.png';
import AsideDerechoTop from '../../assets/img/aside/AsideDerechoTop.png';
import AsideDerechoPie from '../../assets/img/aside/AsideDerechoPie.png';
import WeddingCalendar from '../../component/Calendario/WeddinCalendar';
import SpotifyPlayer from '../../component/Spotify/SpotifyPlayer';


const cardSectionStyle = "invitacion-section  z-30 flex flex-col items-center justify-center w-full max-w-md min-h-[460px] bg-white/10 backdrop-blur-md p-8 rounded-cl shadow-lg border border-white/10 mb-8 image-zoom transition duration-500 ease-in-out hover:scale-105 hover:shadow-xl";


const InvitacionPag = () => {
    const navigate = useNavigate();



    useEffect(() => {
        const sr = ScrollReveal({
            origin: 'bottom',
            distance: '40px',
            duration: 1000,
            delay: 100,
            reset: false, // <-- Evita reinicios que bloquean botones
            scale: 0.95,
            opacity: 0,
            easing: 'ease-in-out',
            mobile: true,
        });

        const timeout = setTimeout(() => {
            sr.reveal('.invitacion-section', { interval: 200 });
            const asideElement = document.querySelector('aside');
            if (asideElement) {
                sr.reveal('aside', { origin: 'left', distance: '80px', duration: 1500 });
            }
        }, 100);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className=" relative min-h-screen overflow-hidden flex flex-col items-center justify-center text-center bg-[linear-gradient(to_left,_#A08963,_#ffffff,_#F5F0D4,_#FFB4A2)]">
            <img src={AsideIzq} alt="Aside Izquierdo"
                className='absolute top-0 left-0 w-200px h-200px object-cover z-10'
            />

            <aside className="absolute top-0 right-0 w-200px h-200px object-cover z-10">
                <img src={AsideDerechoTop} alt="Decoración superior derecha" className="w-full h-full object-contain" />
            </aside>

            <aside className="absolute bottom-0 right-0 w-200px h-200px object-cover z-20">
                <img src={AsideDerechoPie} alt="Decoración inferior derecha" className="w-full h-full object-contain" />
            </aside>

            <section className="invitacion-section z-20 flex flex-col items-center justify-center pt-16 pb-12 px-4 lazyload">
                <div className="relative flex justify-center items-center w-full">
                    <img src={Fondo1} alt="Fondo" className="w-160" style={{ maxWidth: '100%', height: 'auto' }} />
                    <h1 className="absolute font1 text-2xl text-center antialiased">Freddy & Graciela</h1>
                </div>
                <div className="flex flex-col items-center mt-10">
                    <p className="text-2xl font6  mb-2 font-bold leading-relaxed">
                        Nuestra Boda
                    </p>
                    
                </div>
            </section>

            <SpotifyPlayer />

            <section className="invitacion-section mb-2 flex flex-col items-center justify-center px-4 z-30">
                <h1 className="text-l leading-relaxed max-w-2x justify-center font6">
                    <p>A veces, lo que empieza como una locura se transforma en el milagro más hermoso de la vida.</p><br />
                </h1>
            </section>

            <section className="invitacion-section flex flex-col items-center justify-center py-4 sm:py-6 px-2 sm:px-4 z-30">
                <h1 className="text-sm sm:text-base md:text-lg sm:mb-6 text-gray-800">
                    <p className='mb-5 font4'>Estamos emocionados de celebrar con ustedes</p>
                    <p className='mb-10 font4'>Te esperamos el día:</p>
                    <p className="text-xl sm:text-2xl md:text-3xl sm:mt-6 font1 text-gray-800">
                        20 de Diciembre 2025
                    </p>
                    <WeddingCalendar />
                </h1>
            </section>

            <Countdown />

            <section className="invitacion-section flex flex-col items-center justify-center pt-6 pb-6 px-4">
                <button
                    className="text-xl font2 font-bold px-6 py-3 rounded bg-yellow-300 hover:brightness-110 transition duration-200"
                    onClick={() => {
                        console.log("Click en Agendar Fecha");
                        navigate('/confirmacion');
                    }}
                >
                    Confirmar Asistencia
                </button>
            </section>

            <p className="font6 text-sm sm:text-base md:text-lg sm:mb-6 text-gray-800 mt-6 mb-6">Así fue como nos encontramos: en medio de risas espontáneas, sueños compartidos y realidades que se tejían sin planearlo.</p>

            <section className={cardSectionStyle}>
                <h2 className="text-xl font-semibold mb-2">CEREMONIA</h2>
                <img src={Iglesia} alt="Iglesia"
                    className='w-20 h-20 w-1/2'
                />
                <p className="text-lg mt-2 mb-2 font6">18:00 hs, en el Centro de Eventos</p>
                <p className='text-lg font6'>Valle Verde</p>
                <div className="flex justify-center z-20">
                    <a
                        href="https://www.google.com/maps/dir/?api=1&destination=Centro+de+Eventos+Valle+Verde,+Valparaíso,+Chile"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font2 z-20 px-6 py-2 rounded-md bg-green-900 hover:brightness-95 transition mt-4  text-center text-white font-semibold"
                    >
                        Ver ubicación
                    </a>
                </div>
            </section>

            <section className={cardSectionStyle}>
                <h2 className="text-xl font-semibold mb-2">CELEBRACION</h2>
                <img src={Brindar} alt="Copas de Brindis"
                    className='w-20 h-20 w-1/2'
                />
                <p className="text-lg mt-2 mb-2 font6">Despues de la ceremonia festejaremos</p>
                <p className='text-lg font6 mb-6'>en el salon de eventos principal</p>
                <button className="font2  px-6 py-2 rounded-md bg-green-900 hover:brightness-95 transition mt-4  text-center text-white font-semibold"
                    onClick={() => {
                        navigate('/ReglasDeCelebracion');
                    }}
                >
                    Detalle de la Celebración
                </button>
            </section>
            
            <p className="font6 text-sm sm:text-base md:text-lg sm:mb-6 text-gray-800 mt-6 mb-6">Desde aquel instante, nuestras almas comenzaron a caminar al unísono, construyendo con amor, paciencia y entrega el sendero que hoy nos une. </p>
            
            <section className="invitacion-section flex flex-col items-center justify-center py-4 mt-7">
                <h2 className="text-xl font-semibold mb-2 mt-6">NUESTRA HISTORIA</h2>
                <div className="marquee-wrapper mt-15 ">
                    <div className="marquee-content">
                        {[Foto1, Foto2, Foto3, Foto4, Foto5, Foto6, Foto7, Foto8, Foto9, Foto10, Foto11, Foto12, Foto13, Foto14].map((foto, index) => (
                            <div key={index} className="marquee-item group-hover:blur-sm hover:!blur-0 hover:scale-110 transition duration-300">
                                <img
                                    src={foto}  // Ahora se usan las imágenes importadas
                                    alt={`Foto ${index + 1}`}
                                    className="w-full h-full object-cover rounded-xl shadow-md"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            <section className={cardSectionStyle}>
                <img src={DessCode} alt="Vestimenta"
                    className='w-20 h-20 w-1/2'
                />
                <div className='border-t border-gray-300 w-1/2 mb-4'></div>
                <p className="text-lg mb-2 font6">¡Nuestra historia se viste de gala!</p>
                <h1><strong>¡¡Y TU TAMBIEN!!</strong></h1>
                <h2 className='mt-4'><strong>Dress Code</strong></h2>
                <p className="text-lg font6">Traje Formal</p>
                <p className="text-lg mb-2 font6">Se reserva el blanco para la novia</p>
            </section>

            <section className={cardSectionStyle}>
                <img src={Regalo} alt="Regalo"
                    className='w-20 h-20 w-1/2'
                />
                <p className="text-lg mb-2 font6">Si deseas hacernos un regalo, ademas de tu valiosa compañia</p>
                <p className="text-lg mb-2 font6">puedes hacerlo a traves de esta siguiente cuenta</p>
                <button className="font2  px-6 py-2 rounded-md bg-green-900 hover:brightness-95 transition mt-4  text-center text-white font-semibold">
                    Ver datos bancarios
                </button>
            </section>

            <p className='font6 text-sm sm:text-base md:text-lg  text-gray-800'>Y es precisamente ese amor el que queremos compartir con ustedes en este momento tan especial y significativo de nuestras vidas.</p>

            <ParallaxScrollDemo />

            <section className={cardSectionStyle}>
                <img src={Baile} alt="Fiesta"
                    className='w-20 h-20 w-1/2'
                />
                <div className='border-t border-gray-300 w-1/2 mb-4'></div>
                <p className="text-lg mb-2 font6">¡La Fiesta esta en marcha!</p>
                <p className="text-lg mb-2 font6">Sera una ocacion para alejarnos y</p>
                <p className="text-lg mb-2 font6">disfrutar juntos, en familia</p>
            </section>

            <section className={cardSectionStyle}>
                <img src={Foto} alt="Foto"
                    className='w-20 h-20 w-1/2'
                />
                <p className="text-lg mb-2 font6">¡Si hay foto, hay historia!</p>
                <p className="text-lg mb-2 font6">
                    <strong>@frddysign</strong> <br />
                    <strong>@chela693</strong></p>
                <p className="text-lg mb-2 font6">Siguenos en nuestras cuentas de instagram</p>
                <p className="text-lg mb-2 font6">y etiquetanos en tus fotos y videos</p>
            </section>

            <section className={cardSectionStyle}>
                <img src={Musica} alt="sonido" className='w-20 h-20 w-1/2' />
                <p className="text-lg mb-2 font6"><strong>¡Queremos armar la playlist perfecta!</strong></p>
                <p className="text-lg mb-2 font6">Dinos cuales son las canciones que no</p>
                <p className="text-lg mb-2 font6">pueden faltar en la Fiesta</p>
                <button
                    onClick={() => navigate("/canciones")}
                    className="font2 px-6 py-2 rounded-md bg-green-900 hover:brightness-95 transition mt-4 text-center text-white font-semibold"
                >
                    Selecciona tus canciones
                </button>
            </section>
        </div>
    );
};

export default InvitacionPag;
