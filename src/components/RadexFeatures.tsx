"use client";

import { motion } from "framer-motion";
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

const risFeatures = [
    {
        id: "portal",
        title: "Patient Portal",
        description: "Empower patients with secure online access to their images and reports. Reduce administrative workload with self-service features and automated result delivery.",
        icon: UserCircle,
        color: "from-orange-500 to-amber-500",
        image: "/images/patientportal1.png"
    },
    // ... (rest of risFeatures is unchanged, I will use a targeted replacement if I can, but here I am just showing the top part change)
    // Actually, I should just modify the start of the file and the start of the component.
    // Let me try to be more precise to avoid replacing the huge list.

    {
        id: "rad-catalogue",
        title: "Radiology Catalogue",
        description: "Complete radiology service listing. Patients can search for scans, view procedure details, check availability, and self-schedule appointments 24/7.",
        icon: Activity,
        color: "from-cyan-500 to-blue-500",
        image: "/images/patientportal3.png"
    },
    {
        id: "lab-catalogue",
        title: "Lab Catalogue",
        description: "Comprehensive test menu access. Patients can browse available lab tests, check preparations instructions, view pricing, and book home visits or clinic slots instantly.",
        icon: FlaskConical,
        color: "from-teal-500 to-emerald-500",
        image: "/images/patientportal2.png"
    },
    {
        id: "dashboard",
        title: "Smart Dashboard",
        description: "Real-time practice analytics at a glance. Track patient volume, revenue trends, and modality, resource utilization with interactive charts. Make data-driven decisions instantly.",
        icon: Activity,
        color: "from-blue-500 to-cyan-500",
        image: "/images/Home.png"
    },
    {
        id: "patients",
        title: "Patient Management",
        description: "A 360-degree view of your patients. Manage demographics, insurance data, and prior history in one secure location. Quick search and automated merging of duplicate records.",
        icon: Users,
        color: "from-indigo-500 to-purple-500",
        image: "/images/patients.png"
    },
    {
        id: "emr",
        title: "Electronic Medical Records",
        description: "A comprehensive digital health record for every patient. Access complete medical history, allergies, and contraindications in a single unified view.",
        icon: FileText,
        color: "from-emerald-500 to-green-500",
        image: "/images/patientprofile.png"
    },
    {
        id: "history",
        title: "Clinical History Timeline",
        description: "Visual timeline of patient encounters, procedures, and prescriptions. Quickly understand the patient's clinical journey with an intuitive chronological display.",
        icon: Activity,
        color: "from-lime-500 to-green-500",
        image: "/images/patientprofile2.png"
    },
    {
        id: "schedule",
        title: "Intelligent Scheduling",
        description: "Intuitive appointment management with conflict detection. Automated SMS/Email reminders reduce no-shows. Color-coded views for different modalities and rooms.",
        icon: Calculator,
        color: "from-violet-500 to-fuchsia-500",
        image: "/images/schedule.png"
    },
    {
        id: "reception",
        title: "User Friendly Interface",
        description: "A streamlined interface for efficient booking and check-in. Manage walk-ins, verify insurance, and handle patient queues with a dedicated, user-friendly dashboard.",
        icon: Users,
        color: "from-fuchsia-500 to-pink-500",
        image: "/images/reservationinterface.png"
    },

    {
        id: "worklist",
        title: "Reservation System",
        description: "Centralized control for all patient bookings. enhanced filtering and status tracking ensure every reservation is accounted for, reducing gaps and maximizing modality uptime.",
        icon: FileText,
        color: "from-pink-500 to-rose-500",
        image: "/images/resevations.png"
    },
    {
        id: "clinical-worklist",
        title: "Worklist",
        description: "Unified clinical workspace. Upload imaging studies directly and enter lab results efficiently. Streamline your diagnostic workflow with quick access to all required inputs.",
        icon: Activity,
        color: "from-teal-500 to-emerald-500",
        image: "/images/examination.png"
    },
    {
        id: "mwl",
        title: "Modality Worklist",
        description: "Automated seamless integration with imaging modalities. Eliminate manual data entry errors and ensure patient demographics match perfectly with DICOM headers.",
        icon: Search,
        color: "from-sky-500 to-cyan-500",
        image: "/images/mwl.png"
    },
    {
        id: "templates",
        title: "Flex Templates",
        description: "Flexible report templates with preset structures. Standardize reporting across your institution while saving time on repetitive formatting.",
        icon: FileText,
        color: "from-cyan-500 to-blue-500",
        image: "/images/template.png"
    },
    {
        id: "pacs",
        title: "PACS Simplified",
        description: "One search for all. Unified query and retrieve across all your DICOM nodes. Find any study, from any modality, instantly from a single powerful search bar.",
        icon: Database,
        color: "from-indigo-500 to-purple-500",
        image: "/images/pacs.png"
    },
    {
        id: "viewer",
        title: "Web DICOM Viewer",
        description: "Zero-footprint diagnostic viewer. Perform MPR, MIP, and 3D reconstructions directly in your browser without installing any software.",
        icon: Monitor,
        color: "from-violet-600 to-purple-600",
        image: "/images/viewer.png"
    },
    {
        id: "reporting",
        title: "Result & Report Writer",
        description: "Advanced reporting module with customizable templates and rich text editing. Automatically incorporate patient data and measurements for professional, accurate reports.",
        icon: FileText,
        color: "from-green-500 to-emerald-500",
        image: "/images/reportwriter.png"
    },
    {
        id: "print",
        title: "Just Print",
        description: "Simple, one-click printing to any device. Supports physical printers, PDF generation, and paperless workflows with zero configuration.",
        icon: Package, // Using Package as generic output icon
        color: "from-slate-500 to-gray-500",
        image: "/images/print.png"
    },
    {
        id: "tracker",
        title: "Staff Tracker & KPI",
        description: "Monitor staff performance and operational efficiency in real-time. Track key performance indicators (KPIs), identify workflow bottlenecks, and optimize resource allocation for maximum productivity.",
        icon: Activity,
        color: "from-blue-600 to-indigo-600",
        image: "/images/tracker.png"
    },
    {
        id: "invoice",
        title: "Billing & Invoicing",
        description: "Automated invoicing linked directly to completed exams. Support for multiple insurance payers, split billing, and detailed financial audits to prevent revenue leakage.",
        icon: Calculator,
        color: "from-purple-600 to-pink-600",
        image: "/images/invoice.png"
    },
    {
        id: "accounting",
        title: "Financial Accounting",
        description: "Integrated financial management handling revenue cycles, expenses, and profit/loss statements. Generate comprehensive financial reports to monitor holistic practice health.",
        icon: Activity,
        color: "from-indigo-500 to-violet-500",
        image: "/images/accounting.png"
    },
    {
        id: "inventory",
        title: "Inventory Control",
        description: "Track medical supplies and contrast media efficiently. Automated alerts for low stock and expiration dates ensure you never run out of critical resources.",
        icon: Package,
        color: "from-cyan-600 to-blue-600",
        image: "/images/inventory.png"
    },
    {
        id: "audit",
        title: "Audit Trail & Security",
        description: "Comprehensive HIPAA-compliant logging of every user action. monitor system access, data modifications, and export activities to ensure complete security and compliance.",
        icon: Database,
        color: "from-red-500 to-orange-500",
        image: "/images/loger.png"
    }
];






export default function RadexFeatures() {
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
                            The All-in-One Solution Journey Begins
                        </h2>
                        <h1 className="text-5xl md:text-7xl font-bold text-[#0a192f] mb-6 tracking-tight relative z-20">
                            Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">RADex</span>
                        </h1>



                        <p className="text-xl text-gray-500 relative z-20">
                            The first decisive step into a fully unified medical system. We combine next-gen RIS, enterprise PACS, and a zero-footprint Viewer into one seamless engine, redefining speed and precision in diagnostic imaging.
                        </p>
                    </motion.div>
                </div>

                <div className="max-w-7xl mx-auto mb-32 relative">
                    {/* Click Me Image - Left Side of Card Stack */}
                    <motion.div
                        className="absolute -left-8 top-20 md:-left-20 md:top-32 z-20 hidden lg:block"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    >
                        <motion.img
                            src="/images/clickme.png"
                            alt="Click Me"
                            className="w-28 h-28 object-contain"
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 3, repeatType: "reverse" }}
                        />
                    </motion.div>
                    <CardStack features={risFeatures} />
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
                                Beyond RIS, <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">RADex</span> offers a comprehensive suite of modules to manage every aspect of your healthcare facility.
                            </p>
                        </div>
                    </div>
                </motion.div>


            </div>
        </section>
    );
}
