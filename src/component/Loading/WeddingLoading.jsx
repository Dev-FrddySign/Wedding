import React, { useEffect, useState } from 'react';

const WeddingLoading = () => {
    const [filled, setFilled] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setFilled((prev) => (prev < 5 ? prev + 1 : 0));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-extrabold tracking-widest mb-1">WEDDING</h1>
            <p className="text-xl font-semibold mb-3">LOADING...</p>
            <div className="flex gap-1 border-2 border-black p-1">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className={`w-6 h-10 border border-black transition-all duration-300 ${i < filled ? 'bg-black' : 'bg-white'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default WeddingLoading;
