"use client";

import { motion } from "framer-motion";
import {
    Mail,
    MessageCircle,
    Send,
    Facebook,
    Globe,
    Linkedin
} from "lucide-react";

const contactItems = [
    {
        id: "email",
        title: "Email",
        subtitle: "Send us a message anytime",
        value: "Syvursoft@gmail.com",
        href: "mailto:Syvursoft@gmail.com",
        icon: Mail,
        gradient: "from-orange-400 to-orange-500",
        shadow: "shadow-orange-200",
        accent: "from-orange-100",
        textColor: "text-orange-500",
        hoverColor: "group-hover:text-orange-600",
    },
    {
        id: "whatsapp",
        title: "WhatsApp",
        subtitle: "Chat with us directly",
        value: "+20 121 164 4172",
        href: "https://wa.me/201211644172",
        icon: MessageCircle,
        gradient: "from-green-400 to-green-500",
        shadow: "shadow-green-200",
        accent: "from-green-100",
        textColor: "text-green-500",
        hoverColor: "group-hover:text-green-600",
    },
    {
        id: "telegram",
        title: "Telegram",
        subtitle: "Fast & secure messaging",
        value: "+20 121 164 4172",
        href: "https://t.me/+201211644172",
        icon: Send,
        gradient: "from-blue-400 to-cyan-500",
        shadow: "shadow-blue-200",
        accent: "from-blue-100",
        textColor: "text-blue-500",
        hoverColor: "group-hover:text-blue-600",
    },
    {
        id: "facebook",
        title: "Facebook",
        subtitle: "Follow our updates",
        value: "SyvurSoft",
        href: "https://facebook.com/SyvurSoft",
        icon: Facebook,
        gradient: "from-blue-500 to-indigo-600",
        shadow: "shadow-indigo-200",
        accent: "from-indigo-100",
        textColor: "text-indigo-500",
        hoverColor: "group-hover:text-indigo-600",
    },
    {
        id: "website",
        title: "Website",
        subtitle: "Visit our main site",
        value: "Syvursoft.com",
        href: "/",
        icon: Globe,
        gradient: "from-purple-400 to-violet-500",
        shadow: "shadow-purple-200",
        accent: "from-purple-100",
        textColor: "text-purple-500",
        hoverColor: "group-hover:text-purple-600",
    },
    {
        id: "linkedin",
        title: "LinkedIn",
        subtitle: "Connect professionally",
        value: "waleed-sheha",
        href: "https://linkedin.com/in/waleed-sheha",
        icon: Linkedin,
        gradient: "from-sky-500 to-blue-600",
        shadow: "shadow-sky-200",
        accent: "from-sky-100",
        textColor: "text-sky-500",
        hoverColor: "group-hover:text-sky-600",
    }
];

export default function ContactGrid() {
    return (
        <section className="py-24 bg-gradient-to-b from-orange-50 via-amber-50/30 to-white relative overflow-hidden" id="contact">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100 rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-100 rounded-full blur-3xl opacity-40 translate-y-1/2 -translate-x-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-orange-500 font-semibold tracking-widest uppercase text-sm mb-3"
                    >
                        Get in Touch
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl font-bold text-[#0a192f]"
                    >
                        Contact U<span className="text-orange-500">s</span>
                    </motion.h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "48px" }}
                        viewport={{ once: true }}
                        className="h-1 bg-gradient-to-r from-teal-400 to-teal-500 mx-auto mt-4 rounded-full"
                    />
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-600 mt-6 max-w-md mx-auto"
                    >
                        If you want a demo, please reach out through any of the channels below
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {contactItems.map((item, index) => (
                        <motion.a
                            key={item.id}
                            href={item.href}
                            target={item.id !== "website" ? "_blank" : undefined}
                            rel={item.id !== "website" ? "noopener noreferrer" : undefined}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                            whileHover={{ y: -8 }}
                            className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
                        >
                            {/* Decorative corner accent */}
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${item.accent} to-transparent rounded-bl-full opacity-60`}></div>

                            <div className="relative">
                                {/* Icon container */}
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6 shadow-lg ${item.shadow} group-hover:scale-110 transition-transform duration-300`}>
                                    <item.icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-500 text-sm mb-3">{item.subtitle}</p>
                                <p className={`font-medium ${item.textColor} ${item.hoverColor} transition-colors`}>
                                    {item.value}
                                </p>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
