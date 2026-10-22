"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import {
    Activity,
    Database,
    Monitor,
    Search,
    UserCircle,
    FlaskConical,
    FileText,
    Users,
    Calculator,
    Package
} from "lucide-react";
import CardStack from "./CardStack";
import MagnetLines from "./MagnetLines";
import ParticlesBackground from "./ParticlesBackground";

// Each feature's title and description are in the messages, under radex.features.items.<key>.
const risFeatures = [
    {
        id: "portal",
        key: "portal",
        icon: UserCircle,
        color: "from-orange-500 to-amber-500",
        image: "/images/patientportal1.png"
    },
    {
        id: "rad-catalogue",
        key: "radCatalogue",
        icon: Activity,
        color: "from-cyan-500 to-blue-500",
        image: "/images/patientportal3.png"
    },
    {
        id: "lab-catalogue",
        key: "labCatalogue",
        icon: FlaskConical,
        color: "from-teal-500 to-emerald-500",
        image: "/images/patientportal2.png"
    },
    {
        id: "dashboard",
        key: "dashboard",
        icon: Activity,
        color: "from-blue-500 to-cyan-500",
        image: "/images/Home.png"
    },
    {
        id: "patients",
        key: "patients",
        icon: Users,
        color: "from-indigo-500 to-purple-500",
        image: "/images/patients.png"
    },
    {
        id: "emr",
        key: "emr",
        icon: FileText,
        color: "from-emerald-500 to-green-500",
        image: "/images/patientprofile.png"
    },
    {
        id: "history",
        key: "history",
        icon: Activity,
        color: "from-lime-500 to-green-500",
        image: "/images/patientprofile2.png"
    },
    {
        id: "schedule",
        key: "schedule",
        icon: Calculator,
        color: "from-violet-500 to-fuchsia-500",
        image: "/images/schedule.png"
    },
    {
        id: "reception",
        key: "reception",
        icon: Users,
        color: "from-fuchsia-500 to-pink-500",
        image: "/images/reservationinterface.png"
    },

    {
        id: "worklist",
        key: "worklist",
        icon: FileText,
        color: "from-pink-500 to-rose-500",
        image: "/images/resevations.png"
    },
    {
        id: "clinical-worklist",
        key: "clinicalWorklist",
        icon: Activity,
        color: "from-teal-500 to-emerald-500",
        image: "/images/examination.png"
    },
    {
        id: "mwl",
        key: "mwl",
        icon: Search,
        color: "from-sky-500 to-cyan-500",
        image: "/images/mwl.png"
    },
    {
        id: "templates",
        key: "templates",
        icon: FileText,
        color: "from-cyan-500 to-blue-500",
        image: "/images/template.png"
    },
    {
        id: "pacs",
        key: "pacs",
        icon: Database,
        color: "from-indigo-500 to-purple-500",
        image: "/images/pacs.png"
    },
    {
        id: "viewer",
        key: "viewer",
        icon: Monitor,
        color: "from-violet-600 to-purple-600",
        image: "/images/viewer.png"
    },
    {
        id: "reporting",
        key: "reporting",
        icon: FileText,
        color: "from-green-500 to-emerald-500",
        image: "/images/reportwriter.png"
    },
    {
        id: "print",
        key: "print",
        icon: Package, // Using Package as generic output icon
        color: "from-slate-500 to-gray-500",
        image: "/images/print.png"
    },
    {
        id: "tracker",
        key: "tracker",
        icon: Activity,
        color: "from-blue-600 to-indigo-600",
        image: "/images/tracker.png"
    },
    {
        id: "invoice",
        key: "invoice",
        icon: Calculator,
        color: "from-purple-600 to-pink-600",
        image: "/images/invoice.png"
    },
    {
        id: "accounting",
        key: "accounting",
        icon: Activity,
        color: "from-indigo-500 to-violet-500",
        image: "/images/accounting.png"
    },
    {
        id: "inventory",
        key: "inventory",
        icon: Package,
        color: "from-cyan-600 to-blue-600",
        image: "/images/inventory.png"
    },
    {
        id: "audit",
        key: "audit",
        icon: Database,
        color: "from-red-500 to-orange-500",
        image: "/images/loger.png"
    }
];

const wobble = {
    animate: { rotate: [0, 5, -5, 0] },
    transition: { repeat: Infinity, duration: 3, repeatType: "reverse" as const }
};

/* The "CLICK!" arrow image has its English word drawn in, so the Arabic page draws its own: the same brush arrow,
   mirrored to point at the screenshot on its right, with the words in Arabic. */
function ArabicClickHint({ label }: { label: string }) {
    return (
        <motion.svg viewBox="0 0 860 680" className="w-28 h-28" role="img" aria-label={label} {...wobble}>
            <defs>
                <filter id="click-hint-soft">
                    <feGaussianBlur stdDeviation="2" />
                </filter>
            </defs>
            <g fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" filter="url(#click-hint-soft)">
                <path d="M815 640 C710 500 480 300 170 112" strokeWidth="20" />
                <path d="M355 98 L32 45" strokeWidth="28" />
                <path d="M32 45 L203 266" strokeWidth="16" />
            </g>
            <text
                x="620"
                y="320"
                transform="rotate(39 620 320)"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="112"
                fontWeight="700"
                fill="#000"
            >
                {label}
            </text>
        </motion.svg>
    );
}

export default function RadexFeatures() {
    const t = useTranslations("radex");
    const locale = useLocale();
    const features = risFeatures.map(({ key, ...feature }) => ({
        ...feature,
        title: t(`features.items.${key}.title`),
        description: t(`features.items.${key}.description`)
    }));

    return (
        <section id="meet-radex" className="py-24 bg-[#FFFBF5]">
            {/* Background Wrapper - clipped to prevent horizontal scroll from MagnetLines */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <ParticlesBackground color="#ea580c" particleCount={60} className="opacity-60" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10 opacity-30">
                    <MagnetLines
                        rows={9}
                        columns={16}
                        containerSize="100%"
                        lineColor="rgba(249, 115, 22, 0.2)"
                        lineWidth="2px"
                        lineHeight="20px"
                        baseAngle={0}
                        style={{ width: '100%', height: '100%' }}
                    />
                </div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-24 max-w-3xl mx-auto relative z-10">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <h2 className="text-[#f97316] font-semibold tracking-wider uppercase mb-4 text-lg">
                            {t("features.eyebrow")}
                        </h2>
                        <h1 className="text-5xl md:text-7xl font-bold text-[#0a192f] mb-6 tracking-tight relative z-20">
                            {t.rich("features.title", {
                                brand: (chunks) => <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">{chunks}</span>
                            })}
                        </h1>



                        <p className="text-xl text-gray-500 relative z-20">
                            {t("features.description")}
                        </p>
                    </motion.div>
                </div>

                <div className="max-w-7xl mx-auto mb-32 relative">
                    {/* Click Me Image - Start Side of Card Stack, beside the screenshots */}
                    <motion.div
                        className="absolute -start-8 top-20 md:-start-20 md:top-32 z-20 hidden lg:block"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    >
                        {locale === "ar" ? (
                            <ArabicClickHint label={t("features.clickMeAlt")} />
                        ) : (
                            <motion.img
                                src="/images/clickme.png"
                                alt={t("features.clickMeAlt")}
                                className="w-28 h-28 object-contain"
                                {...wobble}
                            />
                        )}
                    </motion.div>
                    <CardStack features={features} label={t("cardLabel")} />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                    className="relative max-w-4xl mx-auto p-1 rounded-3xl bg-gradient-to-r from-orange-500 via-purple-500 to-cyan-500 opacity-90 shadow-2xl"
                >
                    <div className="bg-white/90 backdrop-blur-xl rounded-[22px] p-8 md:p-12 text-center relative overflow-hidden">
                        {/* Subtle background shine */}
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white via-white to-gray-100 opacity-50" />

                        <div className="relative z-10">
                            <p className="text-xl md:text-2xl font-medium text-gray-700 leading-relaxed">
                                {t.rich("features.beyond", {
                                    brand: (chunks) => <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">{chunks}</span>
                                })}
                            </p>
                        </div>
                    </div>
                </motion.div>


            </div>
        </section>
    );
}
