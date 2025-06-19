import corazon from '../../assets/img/aside/corazon.png';

const days = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
const startingDay = 0; // Diciembre 2025 comienza en lunes (0=Sun)
const totalDays = 31;

const WeddingCalendar = () => {
    return (
        <div className="flex justify-center items-center min-h-screen whitespace-nowrap mt-[-100px]">
            <div className="bg-white border-[3px] border-[#D4AF37] p-6 rounded-2xl shadow-lg max-w-md w-full text-center bg-white/40 backdrop-blur-md p-8 rounded-cl shadow-lg max-w-l w-full border border-white/70">
                <h2 className="text-4xl font-dancing text-[#D4AF37] font1">Diciembre</h2>
                <h3 className="text-xl font-dancing text-gray-700 mb-4">2025</h3>

                <div className="border-t-2 border-[#D4AF37] my-2"></div>

                <div className="grid grid-cols-7 gap-2 text-sm text-gray-600 font-semibold mb-2 font2">
                    {days.map((d, i) => (
                        <div key={i} className="uppercase">{d}</div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-2 text-black-800 font2 text-semibold">
                    {Array.from({ length: startingDay + totalDays }).map((_, index) => {
                        const date = index >= startingDay ? index - startingDay + 1 : null;
                        const isSpecial = date === 20;

                        return (
                            <div
                                key={index}
                                className={`h-12 flex items-center justify-center text-lg font-medium ${isSpecial
                                    ? 'relative'
                                    : ''
                                    }`}
                            >
                                {isSpecial ? (
                                    <div className="relative w-12 h-12 mx-auto">
                                        <img
                                            src={corazon}
                                            alt="corazón"
                                            className="absolute mt-1 inset-0 w-full h-full object-contain text-[#D4AF37] "
                                        />
                                        <span className="absolute inset-0 flex items-center justify-center text-[#D4AF37] font-bold z-20">
                                            20
                                        </span>
                                    </div>
                                ) : (
                                    date
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="border-t-2 border-[#D4AF37] my-4"></div>
                <h4 className="font-dancing text-3xl text-gray-700 font1">Freddy & Graciela</h4>
            </div>
        </div>
    );
};

export default WeddingCalendar;
