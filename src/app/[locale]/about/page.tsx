"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactGrid from "@/components/ContactGrid";
import MagnetLines from "@/components/MagnetLines";
import { directionOf } from "@/i18n/routing";
import { motion } from "framer-motion";
import {
    HeartPulse,
    Target,
    Stethoscope,
    Laptop,
    GraduationCap,
    Award,
    Lightbulb,
    Globe,
    BookOpen
} from "lucide-react";

// Placeholder for missing image
const FOUNDER_IMAGE = "/images/waleed.jpg";

const approachStyles = [
    { icon: Stethoscope, color: "text-blue-500", bg: "bg-blue-50" },
    { icon: Laptop, color: "text-[#f97316]", bg: "bg-orange-50" },
    { icon: GraduationCap, color: "text-green-500", bg: "bg-green-50" }
];

const valueIcons = [Award, Lightbulb, Globe, BookOpen];

type TitledText = { title: string; text: string };

export default function AboutPage() {
    const t = useTranslations("about");
    // The mission cards slide in from their own side, which flips in Arabic.
    const side = directionOf(useLocale()) === "rtl" ? -1 : 1;
    const quotes: string[] = t.raw("story.quotes");
    const wants: { text: string; description: string }[] = t.raw("purpose.whatWeWant.items");
    const approach: TitledText[] = t.raw("methodology.cards");
    const values: TitledText[] = t.raw("values.items");
    if (approach.length !== approachStyles.length || values.length !== valueIcons.length) {
        throw new Error("The About page copy and its icons are out of step.");
    }

    return (
        <main className="min-h-screen bg-slate-50 overflow-x-hidden selection:bg-orange-100 selection:text-orange-900">
            <Header />

            {/* --- Hero Section --- */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#0a192f] text-white">
                {/* Dynamic Background */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                    <MagnetLines
                        rows={12}
                        columns={12}
                        containerSize="120%"
                        lineColor="#f97316"
                        lineWidth="2px"
                        lineHeight="40px"
                        baseAngle={45}
                    />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                            {t.rich("hero.title", {
                                brand: (chunks) => <span className="text-[#f97316]">{chunks}</span>
                            })}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            {t("hero.description")}
                        </p>
                    </motion.div>
                </div>

                {/* Decorative bottom gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent" />
            </section>

            {/* --- Our Story (Founder) --- */}
            <section className="py-20 relative">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-sm font-bold tracking-[0.2em] text-[#f97316] uppercase mb-3">{t("story.label")}</h2>
                            <h2 className="text-4xl font-bold text-[#0a192f]">{t("story.heading")}</h2>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 relative overflow-hidden"
                        >
                            <div className="absolute top-0 start-0 w-2 h-full bg-[#f97316]" />

                            <div className="flex flex-col md:flex-row gap-10 items-center">
                                <div className="flex-shrink-0 relative group">
                                    <div className="absolute -inset-4 bg-gradient-to-br from-orange-100 to-blue-50 rounded-full blur-lg opacity-70 group-hover:opacity-100 transition duration-500" />
                                    <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white shadow-lg relative z-10">
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                                            {/* Defensive rendering for image */}
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={FOUNDER_IMAGE}
                                                alt={t("story.founderImageAlt")}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = "none";
                                                    const parent = e.currentTarget.parentElement;
                                                    if (parent) {
                                                        parent.innerText = "WSS";
                                                        parent.className = "w-full h-full bg-[#f97316] text-white flex items-center justify-center text-5xl font-bold";
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 text-center md:text-start">
                                    <div className="mb-6">
                                        <h3 className="text-3xl font-bold text-[#0a192f]">{t("story.founderName")}</h3>
                                        <p className="text-[#f97316] font-medium text-lg mt-1">{t("story.founderRole")}</p>
                                    </div>
                                    <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                                        {quotes.map((quote) => (
                                            <p key={quote}>{quote}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- Mission --- */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-sm font-bold tracking-[0.2em] text-[#f97316] uppercase mb-3">{t("purpose.label")}</h2>
                        <h2 className="text-4xl font-bold text-[#0a192f]">{t("purpose.heading")}</h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -30 * side }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                        >
                            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-6 text-red-500">
                                <HeartPulse className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#0a192f] mb-4">{t("purpose.whyWeStarted.title")}</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                {t("purpose.whyWeStarted.text")}
                            </p>
                            <div className="ps-4 border-s-4 border-[#f97316] italic rtl:not-italic text-gray-500">
                                {t("purpose.whyWeStarted.quote")}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 * side }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                        >
                            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 text-indigo-500">
                                <Target className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#0a192f] mb-4">{t("purpose.whatWeWant.title")}</h3>
                            <ul className="space-y-4">
                                {wants.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-600">
                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#f97316] flex-shrink-0" />
                                        <span><strong className="text-[#0a192f]">{item.text}:</strong> {item.description}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- Approach --- */}
            <section className="py-20 relative">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-16 max-w-3xl mx-auto"
                    >
                        <h2 className="text-sm font-bold tracking-[0.2em] text-[#f97316] uppercase mb-3">{t("methodology.label")}</h2>
                        <h2 className="text-4xl font-bold text-[#0a192f] mb-6">{t("methodology.heading")}</h2>
                        <p className="text-gray-600 text-lg">{t("methodology.description")}</p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {approach.map((card, idx) => {
                            const style = approachStyles[idx];
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    whileHover={{ y: -10 }}
                                    className="bg-white p-8 rounded-3xl shadow-lg border border-gray-50 flex flex-col items-center text-center group"
                                >
                                    <div className={`w-20 h-20 rounded-full ${style.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                        <style.icon className={`w-10 h-10 ${style.color}`} />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#0a192f] mb-4">{card.title}</h3>
                                    <p className="text-gray-500 leading-relaxed">{card.text}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* --- Values --- */}
            <section className="py-20 bg-[#0a192f] text-white relative overflow-hidden">
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f97316] rounded-full blur-[100px] opacity-10 pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-sm font-bold tracking-[0.2em] text-[#f97316] uppercase mb-3">{t("values.label")}</h2>
                        <h2 className="text-4xl font-bold">{t("values.heading")}</h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((item, idx) => {
                            const Icon = valueIcons[idx];
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors"
                                >
                                    <Icon className="w-8 h-8 text-[#f97316] mb-4" />
                                    <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* --- Vision --- */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl font-bold text-[#0a192f] mb-8">{t("vision.heading")}</h2>
                        <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light">
                            {t("vision.quote")}
                        </p>
                        <div className="w-24 h-1 bg-[#f97316] mx-auto my-10 rounded-full" />
                        <p className="text-gray-500">
                            {t("vision.description")}
                        </p>
                    </div>
                </div>
            </section>

            <ContactGrid />
            <Footer />
        </main>
    );
}
