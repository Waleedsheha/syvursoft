"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useLocale } from "next-intl";
import { LucideIcon } from "lucide-react";
import { useState, useRef, memo, useEffect } from "react";
import { directionOf } from "@/i18n/routing";

interface Feature {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    color: string;
    image: string; // Used as placeholder bg or pattern source
}

interface CardProps {
    feature: Feature;
    index: number;
    label: string;
    // 1 when the page reads left to right, -1 when it reads right to left: the visual card sits on the start side.
    side: number;
}

const CardVisual = ({ color, image, title }: { color: string, image: string, title: string }) => (
    <div className={`w-full h-full relative flex items-center justify-center`}>
        {image ? (
            <div className="relative w-full h-full group">
                {/* ESLint disable for standard img tag preference to ensure raw quality */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={image}
                    alt={title}
                    className="w-auto h-auto max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-105 border-[12px] border-white rounded-[2rem] shadow-2xl"
                />
            </div>
        ) : (
            <div className={`w-full h-full bg-gradient-to-br ${color} opacity-20`} />
        )}
    </div>
);

const Card = memo(({ feature, index, label, side, featuresLength, activeIndex, isScrolling }: CardProps & { featuresLength: number, activeIndex: number, isScrolling: boolean }) => {
    const [isActive, setIsActive] = useState(false);

    // Auto-dismiss interaction when scrolling starts
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (isScrolling) setIsActive(false);
    }, [isScrolling]);

    // Windowing logic: Keep 1 card above (stacked) and 2 below (upcoming)
    // "Stack 2 cards": means we keep index >= activeIndex - 1
    const shouldRender = index >= activeIndex - 1 && index <= activeIndex + 2;

    return (
        <div
            className="sticky top-0 flex items-center justify-center pt-10"
            style={{
                // Fix the top position to center the 500px card. 
                // We add a tiny offset per index to create a micro-stack effect without drifting off-screen.
                top: `calc(50vh - 250px + ${index * 4}px)`,
                marginBottom: index === featuresLength - 1 ? 0 : "20vh",
                zIndex: isActive ? 50 : index,
            }}
        >
            {shouldRender ? (
                <motion.div
                    className="relative flex flex-col md:flex-row w-full max-w-6xl h-[500px] gap-8 perspective-1000"
                    style={{ perspective: "1000px" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Visual Side Card */}
                    <motion.div
                        className={`w-full md:w-1/2 h-full cursor-pointer ${isScrolling ? "pointer-events-none" : ""}`}
                        initial={{ x: -250 * side, opacity: 0, rotateY: 45 * side, scale: 0.8 }}
                        animate={isActive ? {
                            scale: 2.2,
                            opacity: 1,
                            rotateY: 0,
                            zIndex: 100,
                            x: 150 * side, // Move towards center
                        } : {
                            scale: 1.1, // Default visible state
                            opacity: 1,
                            rotateY: 0,
                            x: 0,
                            zIndex: 0
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 70,
                            damping: 15,
                            mass: 1,
                            delay: 0.1
                        }}
                        onClick={() => setIsActive(!isActive)}
                    >
                        <CardVisual color={feature.color} image={feature.image} title={feature.title} />
                    </motion.div>

                    {/* Content Side Card */}
                    {/* Content Side Card */}
                    <motion.div
                        className={`relative w-full md:w-1/2 h-full group ${isScrolling ? "pointer-events-none" : ""}`}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        {/* Backlight Glow */}
                        <div
                            className={`absolute -inset-1 bg-gradient-to-r ${feature.color} rounded-[2rem] blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`}
                        />

                        <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-white p-10 flex flex-col justify-center">
                            <div className="absolute top-6 end-8 text-8xl font-black select-none z-0 overflow-hidden">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-400 to-gray-900 bg-[length:200%_auto] animate-shimmer opacity-80">
                                    {(index + 1).toString().padStart(2, '0')}
                                </span>
                            </div>
                            <div className="relative z-10">
                                <h3 className={`text-base font-bold uppercase tracking-widest mb-3 text-transparent bg-clip-text bg-gradient-to-r ${feature.color}`}>
                                    {label}
                                </h3>
                                <h2 className="text-4xl font-bold text-gray-900 mb-6">{feature.title}</h2>
                                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            ) : (
                // Maintain space for smooth scrolling
                <div className="h-[500px] w-full" />
            )}
        </div>
    );
});

Card.displayName = "Card";

export default function CardStack({ features, label }: { features: Feature[]; label: string }) {
    const side = directionOf(useLocale()) === "rtl" ? -1 : 1;
    const [activeIndex, setActiveIndex] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end end"]
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const idx = Math.min(Math.floor(latest * features.length), features.length - 1);
        setActiveIndex(idx);

        // Detect scrolling
        setIsScrolling(true);
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => {
            setIsScrolling(false);
        }, 150);
    });

    return (
        <div ref={containerRef} className="w-full relative py-20">
            {features.map((feature, index) => (
                <Card
                    key={feature.id}
                    feature={feature}
                    index={index}
                    label={label}
                    side={side}
                    featuresLength={features.length}
                    activeIndex={activeIndex}
                    isScrolling={isScrolling}
                />
            ))}
        </div>
    );
}
