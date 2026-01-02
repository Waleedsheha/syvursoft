"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";

export default function Hero() {
    const [showDialog, setShowDialog] = useState(false);

    const handleBookDemo = () => {
        setShowDialog(true);
    };

    const handleOk = () => {
        setShowDialog(false);
        // Scroll to contact section
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    };

    const handleNotOk = () => {
        setShowDialog(false);
    };

    return (
        <section className="relative h-[90vh] min-h-[600px] w-full overflow-hidden flex items-center justify-center bg-[#0a192f] text-white">
            {/* Background Graphic/Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a192f]/90 to-[#0a192f]/40 z-10" />
            <div
                className="absolute inset-0 z-0 opacity-50 bg-cover bg-center"
                style={{ backgroundImage: 'url("/images/mri_hero.png")' }}
            ></div>

            <div className="container mx-auto px-4 relative z-20 pt-20">
                <div className="max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                            Empowering <span className="text-[#f97316]">Healthcare</span> with Innovation
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 mb-8 font-light">
                            Advanced Hospital Management Systems & Radiology Information Solutions designed for modern medical facilities.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-8 py-4 rounded-full font-semibold text-lg">
                                RADex is just the beginning
                            </div>
                            <button
                                onClick={handleBookDemo}
                                className="bg-[#f97316] hover:bg-[#ea580c] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all flex items-center gap-2 shadow-lg shadow-orange-900/20"
                            >
                                Book a Demo <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-20"></div>

            {/* Dialog Modal */}
            <AnimatePresence>
                {showDialog && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleNotOk}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        />

                        {/* Dialog */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
                        >
                            <div className="bg-white rounded-3xl p-8 shadow-2xl mx-4">
                                {/* Close button */}
                                <button
                                    onClick={handleNotOk}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                {/* Content */}
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-200">
                                        <ArrowRight className="w-8 h-8 text-white" />
                                    </div>

                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Book a Demo</h3>
                                    <p className="text-gray-600 mb-8">
                                        You will be transferred to Contact to choose your preferred method of communication.
                                    </p>

                                    {/* Buttons */}
                                    <div className="flex gap-4">
                                        <button
                                            onClick={handleNotOk}
                                            className="flex-1 px-6 py-3 rounded-full border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all"
                                        >
                                            Not OK
                                        </button>
                                        <button
                                            onClick={handleOk}
                                            className="flex-1 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:shadow-lg hover:shadow-orange-200 transition-all"
                                        >
                                            OK
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}
