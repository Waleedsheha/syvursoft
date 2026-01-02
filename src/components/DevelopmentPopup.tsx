"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Hammer } from "lucide-react";
import { createPortal } from "react-dom";
import { useState } from "react";

interface DevelopmentPopupProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function DevelopmentPopup({ open, onOpenChange }: DevelopmentPopupProps) {
    const [mounted, setMounted] = useState(false);

    // Use layout effect to avoid hydration mismatch
    if (typeof window !== 'undefined' && !mounted) {
        // This runs synchronously during render on client
        setMounted(true);
    }

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => onOpenChange(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150]"
                    />
                    <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="bg-[#0a192f] w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-white/10 pointer-events-auto relative p-8 text-center"
                        >
                            <button
                                onClick={() => onOpenChange(false)}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Hammer className="w-8 h-8 text-orange-500" />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-2">
                                Under Construction
                            </h3>
                            <p className="text-gray-400 mb-6">
                                This product is currently in development. Stay tuned for updates!
                            </p>

                            <button
                                onClick={() => onOpenChange(false)}
                                className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl text-white font-semibold hover:opacity-90 transition-opacity"
                            >
                                Got it
                            </button>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
}
