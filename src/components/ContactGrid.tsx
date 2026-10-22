"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import {
  Mail,
  MessageCircle,
  Send,
  Facebook,
  Globe,
  Linkedin,
} from "lucide-react";
import { getPathname } from "@/i18n/navigation";

const contactItems = [
  {
    id: "email",
    value: "waleedsheha@syvursoft.com",
    href: "mailto:waleedsheha@syvursoft.com",
    icon: Mail,
    tone: "from-sky-500 to-cyan-400",
  },
  {
    id: "whatsapp",
    value: "+20 121 164 4172",
    href: "https://wa.me/201211644172",
    icon: MessageCircle,
    tone: "from-emerald-500 to-teal-400",
  },
  {
    id: "telegram",
    value: "+20 121 164 4172",
    href: "https://t.me/+201211644172",
    icon: Send,
    tone: "from-blue-500 to-cyan-500",
  },
  {
    id: "facebook",
    value: "SyvurSoft",
    href: "https://facebook.com/SyvurSoft",
    icon: Facebook,
    tone: "from-blue-500 to-indigo-500",
  },
  {
    id: "website",
    value: "Syvursoft.com",
    href: "/",
    icon: Globe,
    tone: "from-cyan-500 to-blue-500",
  },
  {
    id: "linkedin",
    value: "waleed-sheha",
    href: "https://linkedin.com/in/waleed-sheha",
    icon: Linkedin,
    tone: "from-sky-500 to-blue-600",
  },
];

export default function ContactGrid() {
  const t = useTranslations("contact");
  const locale = useLocale();

  return (
    <section
      className="relative overflow-hidden bg-[#f4f8fb] px-4 py-24 sm:px-6 lg:px-8"
      id="contact"
    >
      <div className="absolute left-1/2 top-[-80px] h-80 w-[min(680px,80vw)] -translate-x-1/2 rounded-full bg-cyan-300/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-sky-700"
          >
            {t("label")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold leading-[0.98] tracking-[-0.045em] text-slate-950 md:text-5xl"
          >
            {t("heading")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-md text-base leading-7 text-slate-600"
          >
            {t("description")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {contactItems.map((item, index) => (
            <motion.a
              key={item.id}
              href={item.id === "website" ? getPathname({ locale, href: item.href }) : item.href}
              target={item.id !== "website" ? "_blank" : undefined}
              rel={item.id !== "website" ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, type: "spring", stiffness: 100 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-white/90 p-8 shadow-[0_24px_80px_rgba(96,165,250,0.10)] backdrop-blur transition-all duration-500 hover:border-sky-200 hover:shadow-[0_32px_72px_rgba(15,23,42,0.12)]"
            >
              <div
                className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.tone}`}
              />
              <div className="absolute inset-0 translate-x-[-120%] bg-[linear-gradient(120deg,transparent,rgba(14,165,233,0.08),transparent)] transition duration-700 group-hover:translate-x-[120%]" />

              <div className="relative">
                <div
                  className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${item.tone} shadow-lg shadow-sky-200/50 transition-transform duration-300 group-hover:scale-110`}
                >
                  <item.icon className="h-8 w-8 text-white" strokeWidth={1.5} />
                </div>

                <h3 className="mb-2 text-xl font-bold text-slate-950">
                  {t(`items.${item.id}.title`)}
                </h3>
                <p className="mb-3 text-sm text-slate-500">{t(`items.${item.id}.subtitle`)}</p>
                <p className="font-semibold text-sky-600 transition-colors group-hover:text-cyan-600">
                  <span dir="ltr">{item.value}</span>
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
