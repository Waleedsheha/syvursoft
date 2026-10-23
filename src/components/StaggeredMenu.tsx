"use client";

import type { ComponentProps } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import NextLink from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { directionOf } from "@/i18n/routing";

export interface NavLink {
    name: string;
    href: ComponentProps<typeof Link>["href"];
    action?: () => void;
    external?: boolean;
    submenu?: NavLink[];
}

export interface LocaleSwitch {
    locale: string;
    href: string;
    label: string;
}

interface StaggeredMenuProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    links: NavLink[];
    localeSwitch: LocaleSwitch;
}

export default function StaggeredMenu({ open, setOpen, links, localeSwitch }: StaggeredMenuProps) {
    const t = useTranslations("header");
    // The menu slides in from the end side: the right in English, the left in Arabic.
    const side = directionOf(useLocale()) === "rtl" ? -1 : 1;
    const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

    const toggleSubmenu = (name: string) => {
        setExpandedMenu(expandedMenu === name ? null : name);
    };

    // Variants for the sidebar container
    const sidebarVariants: Variants = {
        closed: {
            x: `${side * 100}%`,
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
            x: side * 50,
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
                        className="fixed end-0 top-0 z-[100] flex h-screen w-full flex-col justify-between overflow-y-auto border-s border-white/10 bg-[#070c17] p-8 shadow-2xl md:w-[450px]"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={sidebarVariants}
                    >
                        {/* Decorative Background Elements */}
                        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
                        <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />

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
                                                className="group flex w-full items-center justify-between text-start text-4xl font-bold tracking-[-0.04em] text-white transition-colors hover:text-cyan-200"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <span className="text-sm font-light text-slate-500 transition-colors group-hover:text-cyan-300/70">
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
                                                        className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]"
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
                                                                        className="flex w-full items-center gap-3 rounded-xl px-4 py-2 text-start text-xl text-slate-300 transition-all hover:bg-white/[0.06] hover:text-cyan-200"
                                                                    >
                                                                        <div className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                                                                        {subItem.name}
                                                                    </button>
                                                                ) : (
                                                                    <Link
                                                                        key={subItem.name}
                                                                        href={subItem.href}
                                                                        target={subItem.external ? "_blank" : undefined}
                                                                        rel={subItem.external ? "noopener noreferrer" : undefined}
                                                                        onClick={() => setOpen(false)}
                                                                        className="flex items-center gap-3 rounded-xl px-4 py-2 text-xl text-slate-300 transition-all hover:bg-white/[0.06] hover:text-cyan-200"
                                                                    >
                                                                        <div className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
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
                                            className="group flex items-center gap-4 text-4xl font-bold tracking-[-0.04em] text-white transition-colors hover:text-cyan-200"
                                        >
                                            <span className="text-sm font-light text-slate-500 transition-colors group-hover:text-cyan-300/70">
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

                            <div className="flex justify-between items-center">
                                <NextLink
                                    href={localeSwitch.href}
                                    lang={localeSwitch.locale}
                                    hrefLang={localeSwitch.locale}
                                    onClick={() => setOpen(false)}
                                    className="text-sm font-medium text-slate-400 hover:text-cyan-200"
                                >
                                    {localeSwitch.label}
                                </NextLink>
                                <motion.button
                                    onClick={() => setOpen(false)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-cyan-200"
                                >
                                    {t("closeMenu")} <ArrowRight size={16} className="rtl:-scale-x-100" />
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
