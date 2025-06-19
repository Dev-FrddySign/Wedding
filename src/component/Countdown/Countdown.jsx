import React, { useState, useEffect } from 'react';

const Countdown = () => {
    const calculateTimeLeft = () => {
        const targetDate = new Date('2025-12-20T18:30:00');
        const currentDate = new Date();
        const difference = targetDate - currentDate;

        const totalSeconds = Math.floor(difference / 1000);
        const totalMinutes = Math.floor(totalSeconds / 60);
        const totalHours = Math.floor(totalMinutes / 60);
        const totalDays = Math.floor(totalHours / 24);

        // Calcular los meses restantes (aproximado)
        const startYear = currentDate.getFullYear();
        const startMonth = currentDate.getMonth(); // 0-indexed
        const endYear = targetDate.getFullYear();
        const endMonth = targetDate.getMonth(); // 0-indexed

        let months = (endYear - startYear) * 12 + (endMonth - startMonth);
        if (currentDate.getDate() > targetDate.getDate()) {
            months--;
        }
        if (months < 0) months = 0;

        return {
            months: months,
            days: totalDays < 0 ? 0 : totalDays, // Corregido: mostrar el total de días restantes
            hours: totalHours < 0 ? 0 : totalHours % 24,
            minutes: totalMinutes < 0 ? 0 : totalMinutes % 60,
            seconds: totalSeconds < 0 ? 0 : totalSeconds % 60,
            isExpired: difference < 0,
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="rounded-lg border-white/80 mt-[-100px] flex items-center  justify-center bg-white/10 backdrop-blur-md p-4 rounded-cl shadow-lg shadow-lg border border-white/10 ">
            <div className="">
                <div className="absolute inset-0 border-gold rounded-lg pointer-events-none" />
                <div className="flex justify-center space-x-4">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold">{timeLeft.months}</h2>
                        <p>Meses</p>
                    </div>
                    <div className="text-center">
                        <h2 className="text-4xl font-bold">{timeLeft.days}</h2> {/* Ahora muestra el total de días */}
                        <p>Días</p>
                    </div>
                    <div className="text-center">
                        <h2 className="text-4xl font-bold">{timeLeft.hours}</h2>
                        <p>Hs</p>
                    </div>
                    <div className="text-center">
                        <h2 className="text-4xl font-bold">{timeLeft.minutes}</h2>
                        <p>Min</p>
                    </div>
                    <div className="text-center">
                        <h2 className="text-4xl font-bold">{timeLeft.seconds}</h2>
                        <p>Seg</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Countdown;