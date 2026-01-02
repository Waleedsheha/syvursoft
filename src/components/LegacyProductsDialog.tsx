import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface LegacyProductsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function LegacyProductsDialog({ open, onOpenChange }: LegacyProductsDialogProps) {
    const [mounted, setMounted] = useState(false);

    // Use synchronous check to avoid eslint warning
    if (typeof window !== 'undefined' && !mounted) {
        setMounted(true);
    }

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => onOpenChange(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[110]"
                    />

                    {/* Dialog Container */}
                    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="bg-[#0a192f] w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-white/10 pointer-events-auto relative"
                        >
                            {/* Header */}
                            <div className="p-6 border-b border-white/10 flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-white">
                                    Legacy Products
                                </h2>
                                <button
                                    onClick={() => onOpenChange(false)}
                                    className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 grid gap-4">
                                <p className="text-gray-400 mb-2">
                                    Explore our foundational medical applications on the Google Play Store.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Atria Card */}
                                    <Link
                                        href="https://play.google.com/store/apps/details?id=com.syvursoft.atria"
                                        target="_blank"
                                        className="group relative bg-white/5 hover:bg-white/10 border border-white/5 hover:border-orange-500/30 rounded-2xl p-6 transition-all duration-300 flex flex-col items-center text-center gap-4"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:to-orange-500/5 rounded-2xl transition-all duration-500" />

                                        <div className="relative w-24 h-24 rounded-2xl overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-300">
                                            <Image
                                                src="/images/atrialogo.png"
                                                alt="Atria Logo"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-1">Atria</h3>
                                            <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                                                Make Echo Reports
                                            </p>
                                        </div>
                                        <div className="mt-2 text-xs font-semibold tracking-wider text-orange-500 uppercase flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                                            View on Store
                                        </div>
                                    </Link>

                                    {/* ABGen Card */}
                                    <Link
                                        href="https://play.google.com/store/apps/details?id=com.syvursoft.abgen"
                                        target="_blank"
                                        className="group relative bg-white/5 hover:bg-white/10 border border-white/5 hover:border-blue-500/30 rounded-2xl p-6 transition-all duration-300 flex flex-col items-center text-center gap-4"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/0 group-hover:to-blue-500/5 rounded-2xl transition-all duration-500" />

                                        <div className="relative w-24 h-24 rounded-2xl overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-300">
                                            <Image
                                                src="/images/appicon.png"
                                                alt="ABGen Logo"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-1">ABGen</h3>
                                            <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                                                ABG Analysis Tool
                                            </p>
                                        </div>
                                        <div className="mt-2 text-xs font-semibold tracking-wider text-blue-500 uppercase flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                                            View on Store
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
}
