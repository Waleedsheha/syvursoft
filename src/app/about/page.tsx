"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactGrid from "@/components/ContactGrid";
import MagnetLines from "@/components/MagnetLines";
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

export default function AboutPage() {
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
                            About <span className="text-[#f97316]">SyvurSoft</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Transforming complex medical data into intuitive, actionable insights for healthcare professionals worldwide.
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
                            <h2 className="text-sm font-bold tracking-[0.2em] text-[#f97316] uppercase mb-3">Origin</h2>
                            <h2 className="text-4xl font-bold text-[#0a192f]">Our Story</h2>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-2 h-full bg-[#f97316]" />

                            <div className="flex flex-col md:flex-row gap-10 items-center">
                                <div className="flex-shrink-0 relative group">
                                    <div className="absolute -inset-4 bg-gradient-to-br from-orange-100 to-blue-50 rounded-full blur-lg opacity-70 group-hover:opacity-100 transition duration-500" />
                                    <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white shadow-lg relative z-10">
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                                            {/* Defensive rendering for image */}
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={FOUNDER_IMAGE}
                                                alt="Dr. Waleed Sheha"
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

                                <div className="flex-1 text-center md:text-left">
                                    <div className="mb-6">
                                        <h3 className="text-3xl font-bold text-[#0a192f]">Dr. Waleed Sheha</h3>
                                        <p className="text-[#f97316] font-medium text-lg mt-1">Emergency & Critical Care Physician • Founder</p>
                                    </div>
                                    <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                                        <p>
                                            &ldquo;I started SyvurSoft after working for years in busy emergency rooms and ICUs. As a doctor, I kept facing the same problem - we had to make quick decisions with complex patient data, especially blood gas results.&rdquo;
                                        </p>
                                        <p>
                                            &ldquo;I looked for tools to help with this, but couldn&apos;t find anything that was both accurate and easy to use in high-pressure situations. So I decided to build one myself.&rdquo;
                                        </p>
                                        <p>
                                            &ldquo;This led to ABGen, our first app that helps doctors quickly understand blood gas results. We designed it to be simple enough to use during emergencies but detailed enough to provide valuable insights.&rdquo;
                                        </p>
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
                        <h2 className="text-sm font-bold tracking-[0.2em] text-[#f97316] uppercase mb-3">Purpose</h2>
                        <h2 className="text-4xl font-bold text-[#0a192f]">Our Mission</h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                        >
                            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-6 text-red-500">
                                <HeartPulse className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#0a192f] mb-4">Why We Started</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                We started SyvurSoft to make better medical software. As doctors, we know how hard it can be to make quick decisions with complex patient data. Our goal is simple: create tools that make doctors&apos; lives easier and help patients get better care.
                            </p>
                            <div className="pl-4 border-l-4 border-[#f97316] italic text-gray-500">
                                &ldquo;We turn complicated medical data into clear, useful information that helps doctors make better decisions.&rdquo;
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                        >
                            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 text-indigo-500">
                                <Target className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#0a192f] mb-4">What We Want to Do</h3>
                            <ul className="space-y-4">
                                {[
                                    { text: "Help Doctors Make Better Decisions", desc: "Easier understanding of test results." },
                                    { text: "Better Patient Care", desc: "Spot problems faster." },
                                    { text: "Better Medical Education", desc: "Interactive learning tools." },
                                    { text: "Tools for Everyone", desc: "Software for all resource settings." },
                                    { text: "Keep Improving", desc: "Constantly solving new problems." }
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-600">
                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#f97316] flex-shrink-0" />
                                        <span><strong className="text-[#0a192f]">{item.text}:</strong> {item.desc}</span>
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
                        <h2 className="text-sm font-bold tracking-[0.2em] text-[#f97316] uppercase mb-3">Methodology</h2>
                        <h2 className="text-4xl font-bold text-[#0a192f] mb-6">Our Approach</h2>
                        <p className="text-gray-600 text-lg">At SyvurSoft, we combine medical expertise with technological innovation to create software that truly serves healthcare professionals.</p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Stethoscope, title: "Clinical Expertise", text: "Founded by a practicing physician with real-world clinical experience. Solutions built from deep medical knowledge.", color: "text-blue-500", bg: "bg-blue-50" },
                            { icon: Laptop, title: "User-Centered Design", text: "Built with the clinician's workflow in mind. Ensuring seamless integration in high-pressure environments.", color: "text-[#f97316]", bg: "bg-orange-50" },
                            { icon: GraduationCap, title: "Educational Focus", text: "Enhancing understanding through interactive tools. Every feature builds clinical reasoning skills.", color: "text-green-500", bg: "bg-green-50" }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="bg-white p-8 rounded-3xl shadow-lg border border-gray-50 flex flex-col items-center text-center group"
                            >
                                <div className={`w-20 h-20 rounded-full ${item.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <item.icon className={`w-10 h-10 ${item.color}`} />
                                </div>
                                <h3 className="text-xl font-bold text-[#0a192f] mb-4">{item.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{item.text}</p>
                            </motion.div>
                        ))}
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
                        <h2 className="text-sm font-bold tracking-[0.2em] text-[#f97316] uppercase mb-3">Core Beliefs</h2>
                        <h2 className="text-4xl font-bold">Our Values</h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Award, title: "Excellence", text: "Highest standards of medical accuracy and evidence-based practice." },
                            { icon: Lightbulb, title: "Innovation", text: "Combining medical expertise with cutting-edge tech to solve problems." },
                            { icon: Globe, title: "Accessibility", text: "Tools useful for clinicians across all resource settings worldwide." },
                            { icon: BookOpen, title: "Education", text: "Turning every clinical decision into a learning opportunity." }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors"
                            >
                                <item.icon className="w-8 h-8 text-[#f97316] mb-4" />
                                <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Vision --- */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl font-bold text-[#0a192f] mb-8">Our Vision</h2>
                        <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light">
                            &ldquo;SyvurSoft aims to become the leading developer of specialized medical software solutions that transform complex clinical data into actionable insights.&rdquo;
                        </p>
                        <div className="w-24 h-1 bg-[#f97316] mx-auto my-10 rounded-full" />
                        <p className="text-gray-500">
                            We envision a future where advanced analytical tools are seamlessly integrated into clinical practice, enhancing diagnostic accuracy and patient outcomes.
                        </p>
                    </div>
                </div>
            </section>

            <ContactGrid />
            <Footer />
        </main>
    );
}
