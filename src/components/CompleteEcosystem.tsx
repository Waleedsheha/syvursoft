"use client";

import { motion } from "framer-motion";
import {
    Zap,
    Stethoscope,
    Link as LinkIcon,
    BrainCircuit
} from "lucide-react";

const ecosystemItems = [
    {
        id: "radex",
        title: "RADex",
        description: "The complete radiology engine. Unified RIS, PACS, and Viewer for ultimate diagnostic speed and precision.",
        icon: Zap,
        color: "from-orange-500 to-red-600",
        shadow: "shadow-orange-500/20",
        bg: "bg-orange-50",
        border: "border-orange-200",
        text: "text-orange-900"
    },
    {
        id: "mend",
        title: "MEND",
        description: "Specialized critical care software designed for Intensive Care Units and Emergency response.",
        icon: Stethoscope,
        color: "from-cyan-400 to-blue-600",
        shadow: "shadow-cyan-500/20",
        bg: "bg-cyan-50",
        border: "border-cyan-200",
        text: "text-cyan-900"
    },
    {
        id: "bond",
        title: "BOND",
        description: "Complete hospital management with real-time automation and immersive visual control.",
        icon: LinkIcon,
        color: "from-violet-500 to-purple-600",
        shadow: "shadow-violet-500/20",
        bg: "bg-violet-50",
        border: "border-violet-200",
        text: "text-violet-900"
    },
    {
        id: "adam-ai",
        title: "ADAM AI",
        description: "The central intelligence brain that orchestrates and optimizes the entire ecosystem.",
        icon: BrainCircuit,
        color: "from-amber-400 to-yellow-600",
        shadow: "shadow-amber-500/20",
        bg: "bg-amber-50",
        border: "border-amber-200",
        text: "text-amber-900"
    }
];

export default function CompleteEcosystem() {
    return (
        <section className="py-32 bg-slate-50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-gray-200/50 to-transparent blur-3xl opacity-50" />
                <div className="absolute bottom-[0%] left-[0%] w-[40%] h-[40%] rounded-full bg-gradient-to-tr from-gray-200/50 to-transparent blur-3xl opacity-50" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sm font-bold tracking-[0.2em] text-gray-500 uppercase mb-4"
                    >
                        The Complete Ecosystem
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight mb-6"
                    >
                        Four Pillars of <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">Power</span>
                    </motion.h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {ecosystemItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5, type: "spring" }}
                            whileHover={{ y: -10 }}
                            className="group relative"
                        >
                            <div className={`h-full relative rounded-[2.5rem] bg-white p-8 border ${item.border} ${item.shadow} shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden`}>
                                {/* Gradient Orb Background */}
                                <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${item.color} blur-3xl opacity-20 group-hover:scale-150 transition-transform duration-700 ease-out`} />

                                <div className="relative z-10 flex flex-col h-full items-center text-center">
                                    <h4 className="text-5xl font-black tracking-tight text-gray-900 mb-8 pt-8 group-hover:scale-110 transition-transform duration-300">
                                        {item.title}
                                    </h4>

                                    <p className="text-gray-600 leading-relaxed mb-8 flex-grow">
                                        {item.description}
                                    </p>


                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
