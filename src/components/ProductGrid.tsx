"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const products = [
    {
        id: "radex",
        title: "RADex",
        category: "Radiology Engine",
        description: "The complete radiology engine. Unified RIS, PACS, and Viewer for ultimate diagnostic speed and precision.",
        image: "https://images.unsplash.com/photo-1516549655169-df83a0833860?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: "mend",
        title: "MEND",
        category: "Critical Care",
        description: "Specialized critical care software designed for Intensive Care Units and Emergency response.",
        image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: "bond",
        title: "BOND",
        category: "Hospital Management",
        description: "Complete hospital management with real-time automation and immersive visual control.",
        image: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: "adam-ai",
        title: "ADAM AI",
        category: "Central Intelligence",
        description: "The central intelligence brain that orchestrates and optimizes the entire ecosystem.",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop"
    }
];

import { useState } from "react";
import DevelopmentPopup from "./DevelopmentPopup";

export default function ProductGrid() {
    const [devPopupOpen, setDevPopupOpen] = useState(false);

    const handleProductClick = (id: string) => {
        if (id === "radex") {
            // Scroll to the specific section
            const element = document.getElementById("meet-radex");
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            setDevPopupOpen(true);
        }
    };

    return (
        <section id="products" className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-[#f97316] font-semibold tracking-wider uppercase mb-2">Our Solutions</h2>
                    <h3 className="text-4xl font-bold text-[#0a192f]">Integrated Medical Software</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            id={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="relative h-80 w-full">
                                <div className="absolute inset-0 bg-[#0a192f]/20 group-hover:bg-[#0a192f]/40 transition-colors z-10" />
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 bg-gradient-to-t from-[#0a192f] via-[#0a192f]/50 to-transparent">
                                    <span className="text-[#f97316] text-xs font-bold uppercase tracking-wider mb-2">
                                        {product.category}
                                    </span>
                                    <h4 className="text-white text-2xl font-bold mb-2 group-hover:translate-y-0 transition-transform">
                                        {product.title}
                                    </h4>
                                    <p className="text-gray-300 text-sm mb-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                        {product.description}
                                    </p>

                                    <button
                                        onClick={() => handleProductClick(product.id)}
                                        className="flex items-center gap-2 text-white text-sm font-semibold group-hover:text-[#f97316] transition-colors"
                                    >
                                        Read More <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <DevelopmentPopup
                open={devPopupOpen}
                onOpenChange={setDevPopupOpen}
            />
        </section>
    );
}
