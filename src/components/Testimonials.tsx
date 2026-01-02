"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
    {
        id: 1,
        content: "Syvursoft's HMS completely transformed our hospital's workflow. Patient wait times dropped by 40% and our revenue cycle management has never been more efficient.",
        author: "Dr. Ahmed El-Sayed",
        role: "Medical Director, Cairo Medical Center",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 2,
        content: "The Radiology Information System is world-class. Integration with our PACS was seamless, and the reporting tools are incredibly intuitive for our radiologists.",
        author: "Dr. Sarah Thompson",
        role: "Head of Radiology, Modern Diagnostics",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 3,
        content: "Technical support is outstanding. They understand healthcare workflows deeply and are always responsive to our customization needs.",
        author: "Eng. Mohamed Ali",
        role: "IT Manager, Al-Salam International Hospital",
        image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=2070&auto=format&fit=crop"
    }
];

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    useEffect(() => {
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-24 bg-[#0a192f] text-white overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 p-12 opacity-5">
                <Quote className="w-64 h-64 rotate-12" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-[#f97316] font-semibold tracking-wider uppercase mb-2">Testimonials</h2>
                    <h3 className="text-4xl font-bold">Trusted by Medical Professionals</h3>
                </div>

                <div className="max-w-4xl mx-auto relative">
                    <div className="border border-white/10 bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col items-center text-center"
                            >
                                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-[#f97316] mb-6 shadow-lg relative">
                                    <Image
                                        src={testimonials[currentIndex].image}
                                        alt={testimonials[currentIndex].author}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <Quote className="w-10 h-10 text-[#f97316] mb-6 opacity-50" />

                                <p className="text-xl md:text-2xl italic leading-relaxed mb-8 text-gray-200">
                                    &ldquo;{testimonials[currentIndex].content}&rdquo;
                                </p>

                                <div className="border-t border-white/10 pt-6 w-full">
                                    <h4 className="text-xl font-bold text-white mb-1">
                                        {testimonials[currentIndex].author}
                                    </h4>
                                    <p className="text-[#f97316] font-medium text-sm uppercase tracking-wide">
                                        {testimonials[currentIndex].role}
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={prev}
                        className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 bg-white/10 hover:bg-[#f97316] p-3 rounded-full transition-colors backdrop-blur-sm"
                    >
                        <ChevronLeft className="w-6 h-6 text-white" />
                    </button>

                    <button
                        onClick={next}
                        className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 bg-white/10 hover:bg-[#f97316] p-3 rounded-full transition-colors backdrop-blur-sm"
                    >
                        <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                </div>

                {/* Indicators */}
                <div className="flex justify-center gap-2 mt-8">
                    {testimonials.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentIndex ? "bg-[#f97316] w-8" : "bg-white/30 hover:bg-white/50"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
