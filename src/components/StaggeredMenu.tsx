"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";

export interface NavLink {
    name: string;
    href: string;
    action?: () => void;
    submenu?: NavLink[];
}

interface StaggeredMenuProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    links: NavLink[];
}

export default function StaggeredMenu({ open, setOpen, links }: StaggeredMenuProps) {
    const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

    const toggleSubmenu = (name: string) => {
        setExpandedMenu(expandedMenu === name ? null : name);
    };

    // Variants for the sidebar container
    const sidebarVariants: Variants = {
        closed: {
            x: "100%",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40,
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        },
        open: {
            x: "0%",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40,
                staggerChildren: 0.07,
                delayChildren: 0.2
            }
        }
    };

    // Variants for individual list items
    const itemVariants = {
        closed: {
            x: 50,
            opacity: 0,
            transition: {
                y: { stiffness: 1000 }
            }
        },
        open: {
            x: 0,
            opacity: 1,
            transition: {
                y: { stiffness: 1000, velocity: -100 }
            }
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
                    />

                    {/* Sidebar */}
                    <motion.div
                        className="fixed top-0 right-0 h-screen w-full md:w-[450px] bg-[#0a192f] z-[100] p-8 flex flex-col justify-between shadow-2xl border-l border-white/10 overflow-y-auto"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={sidebarVariants}
                    >
                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                        <div className="flex flex-col gap-6 mt-16 relative z-10">
                            {links.map((link, idx) => (
                                <motion.div
                                    key={link.name}
                                    variants={itemVariants}
                                    className="overflow-hidden"
                                >
                                    {link.submenu ? (
                                        <div className="flex flex-col">
                                            <button
                                                onClick={() => toggleSubmenu(link.name)}
                                                className="text-4xl font-bold text-white hover:text-[#f97316] transition-colors flex items-center justify-between group w-full text-left"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <span className="text-sm font-light text-gray-500 group-hover:text-[#f97316]/50 transition-colors">
                                                        0{idx + 1}
                                                    </span>
                                                    {link.name}
                                                </div>
                                                <div className={`transition-transform duration-300 ${expandedMenu === link.name ? "rotate-180" : ""}`}>
                                                    <ChevronDown className="w-8 h-8 opacity-50 group-hover:opacity-100" />
                                                </div>
                                            </button>

                                            <AnimatePresence>
                                                {expandedMenu === link.name && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        className="overflow-hidden bg-[#0f2440]/50 rounded-xl mt-4"
                                                    >
                                                        <div className="flex flex-col p-4 gap-2">
                                                            {link.submenu.map((subItem) => (
                                                                subItem.action ? (
                                                                    <button
                                                                        key={subItem.name}
                                                                        onClick={() => {
                                                                            subItem.action?.();
                                                                            setOpen(false);
                                                                        }}
                                                                        className="text-xl text-gray-300 hover:text-[#f97316] py-2 px-4 rounded-lg hover:bg-white/5 transition-all flex items-center gap-3 w-full text-left"
                                                                    >
                                                                        <div className="w-1.5 h-1.5 rounded-full bg-[#f97316]" />
                                                                        {subItem.name}
                                                                    </button>
                                                                ) : (
                                                                    <Link
                                                                        key={subItem.name}
                                                                        href={subItem.href}
                                                                        onClick={() => setOpen(false)}
                                                                        className="text-xl text-gray-300 hover:text-[#f97316] py-2 px-4 rounded-lg hover:bg-white/5 transition-all flex items-center gap-3"
                                                                    >
                                                                        <div className="w-1.5 h-1.5 rounded-full bg-[#f97316]" />
                                                                        {subItem.name}
                                                                    </Link>
                                                                )
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ) : (
                                        <Link
                                            href={link.href}
                                            onClick={(e) => {
                                                if (link.action) {
                                                    e.preventDefault();
                                                    link.action();
                                                }
                                                setOpen(false);
                                            }}
                                            className="text-4xl font-bold text-white hover:text-[#f97316] transition-colors flex items-center gap-4 group"
                                        >
                                            <span className="text-sm font-light text-gray-500 group-hover:text-[#f97316]/50 transition-colors">
                                                0{idx + 1}
                                            </span>
                                            {link.name}
                                        </Link>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            className="flex flex-col gap-6 relative z-10 mt-8"
                            variants={itemVariants}
                        >
                            <div className="h-px w-full bg-white/10" />

                            <div className="flex justify-end items-center">
                                <motion.button
                                    onClick={() => setOpen(false)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white"
                                >
                                    Close <ArrowRight size={16} />
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

