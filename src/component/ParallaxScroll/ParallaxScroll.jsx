import { useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils/utils";

export const ParallaxScroll = ({ images, className }) => {
    const gridRef = useRef(null);

    const { scrollYProgress } = useScroll({
        container: gridRef,
        offset: ["start start", "end start"],
    });

    const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

    const third = Math.ceil(images.length / 3);
    const firstPart = images.slice(0, third);
    const secondPart = images.slice(third, 2 * third);
    const thirdPart = images.slice(2 * third);

    return (
        <div className={cn("h-[40rem] items-start overflow-y-auto w-full mb-10", className)} ref={gridRef}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-5xl mx-auto gap-5 py-40 px-5">
                {[firstPart, secondPart, thirdPart].map((part, i) => (
                    <div className="grid gap-10" key={`col-${i}`}>
                        {part.map((el, idx) => (
                            <motion.div
                                style={{ y: [translateFirst, translateSecond, translateThird][i] }}
                                key={`grid-${i}-${idx}`}
                            >
                                <img
                                    src={el}
                                    className="h-90 w-full display-flex align-items-center justify-content-center image-zoom object-cover object-left-top rounded-lg gap-10 !m-0 !p-0"
                                    height="700"
                                    width="700"
                                    alt="thumbnail"
                                />
                            </motion.div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
