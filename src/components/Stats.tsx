"use client";

import { motion } from "framer-motion";
import { Users, Building2, Globe2, Award } from "lucide-react";

const stats = [
    {
        id: 1,
        label: "Active Users",
        value: "2M+",
        icon: Users,
    },
    {
        id: 2,
        label: "Medical Facilities",
        value: "5000+",
        icon: Building2,
    },
    {
        id: 3,
        label: "Global Partners",
        value: "150+",
        icon: Globe2,
    },
    {
        id: 4,
        label: "Years Experience",
        value: "15+",
        icon: Award,
    },
];

export default function Stats() {
    return (
        <section className="py-20 bg-[#f8fafc]">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.id}
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="bg-orange-100 p-4 rounded-full mb-4">
                                <stat.icon className="w-8 h-8 text-[#f97316]" />
                            </div>
                            <h3 className="text-4xl md:text-5xl font-bold text-[#0a192f] mb-2 font-mono">
                                {stat.value}
                            </h3>
                            <p className="text-gray-500 font-medium">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
