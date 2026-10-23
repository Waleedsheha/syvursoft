"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const orbitLabels = [
  ["RADex", "radex", 0],
  ["MEND", "mend", -12],
  ["ADAM", "adam", -24],
] as const;

export default function SyvursoftHero() {
  const t = useTranslations("home.hero");
  const heroStats: string[] = t.raw("stats");
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const copy = root.querySelectorAll<HTMLElement>("[data-hero-copy]");
    const visual = root.querySelectorAll<HTMLElement>("[data-hero-visual]");
    const pills = root.querySelectorAll<HTMLElement>("[data-orbit-pill]");

    const reveal = animate([...copy, ...visual], {
      opacity: [0, 1],
      y: [24, 0],
      duration: 820,
      delay: stagger(80),
      ease: "outCubic",
    });

    const pillReveal = animate(pills, {
      opacity: [0, 1],
      duration: 620,
      delay: stagger(160, { start: 360 }),
      ease: "outCubic",
    });

    return () => {
      reveal.revert();
      pillReveal.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative isolate overflow-hidden bg-[#070c17] px-4 pb-24 pt-32 text-white sm:px-6 lg:flex lg:min-h-screen lg:items-center lg:px-8 lg:pt-36"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_20%_20%,rgba(14,165,233,0.10),transparent_50%),radial-gradient(ellipse_at_80%_60%,rgba(37,99,235,0.08),transparent_50%),radial-gradient(ellipse_at_50%_92%,rgba(34,211,238,0.06),transparent_42%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-52 bg-gradient-to-t from-[#f4f8fb] to-transparent" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-2">
        <div>
          <h1
            data-hero-copy
            className="max-w-4xl text-5xl font-bold leading-[0.94] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl"
          >
            {t("title")}
          </h1>

          <p
            data-hero-copy
            className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl"
          >
            {t("description")}
          </p>

          <div
            data-hero-copy
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link
              href="#products"
              onClick={(event) => {
                // Next's router skips scrolling when the hash is already #products.
                if (window.location.hash !== "#products") {
                  return;
                }

                const productsSection = document.getElementById("products");

                if (!productsSection) {
                  throw new Error("Missing #products section");
                }

                event.preventDefault();
                productsSection.scrollIntoView();
              }}
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-sky-950/25 transition hover:-translate-y-1 hover:shadow-cyan-500/20 focus:outline-none focus:ring-2 focus:ring-cyan-200"
            >
              {t("exploreProducts")}
              <ArrowRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
            </Link>
            <Link
              href="/about"
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.06] px-8 py-4 text-sm font-semibold text-slate-100 backdrop-blur transition hover:-translate-y-1 hover:border-cyan-200/30 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-200"
            >
              {t("aboutSyvursoft")}
            </Link>
          </div>

          <div
            data-hero-copy
            className="mt-14 grid gap-3 border-t border-white/[0.08] pt-8 sm:grid-cols-2"
          >
            {heroStats.map((statement) => (
              <div
                key={statement}
                className="flex min-h-24 items-center rounded-2xl border border-white/[0.08] bg-[#070c17]/40 px-6 py-4 backdrop-blur transition hover:-translate-y-2 hover:border-cyan-300/30 hover:bg-[#070c17]/55 hover:shadow-2xl hover:shadow-cyan-500/10"
              >
                <p className="w-full text-center text-sm font-semibold uppercase leading-5 tracking-[0.12em] text-slate-100">
                  {statement}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          data-hero-visual
          className="relative hidden min-h-[560px] items-center justify-center lg:flex"
          aria-hidden="true"
        >
          <div className="absolute h-[430px] w-[430px] rounded-full bg-sky-400/15 blur-3xl" />
          <div className="absolute h-[360px] w-[360px] animate-[spin_32s_linear_infinite] rounded-full border border-sky-300/[0.14]" />
          <div className="absolute h-[270px] w-[270px] animate-[spin_24s_linear_infinite_reverse] rounded-full border border-cyan-300/10" />

          <div className="relative z-10 flex h-44 w-44 items-center justify-center">
            <Image
              src="/images/syvursoft-logo.png"
              alt={t("logoAlt")}
              width={260}
              height={144}
              className="h-auto w-full object-contain drop-shadow-[0_0_22px_rgba(34,211,238,0.42)]"
              priority
            />
          </div>

          <div className="absolute h-[420px] w-[420px] rounded-full border border-cyan-300/[0.08]" />
          <div className="absolute h-[520px] w-[520px] rounded-full border border-sky-300/[0.06]" />

          {orbitLabels.map(([name, id, delay], index) => (
            <div
              key={name}
              className="absolute left-1/2 top-1/2 z-20 h-[420px] w-[420px] -ml-[210px] -mt-[210px] animate-[ecosystem-orbit_36s_linear_infinite]"
              style={{ animationDelay: `${delay}s` }}
            >
              <div className="absolute left-1/2 top-0 -translate-x-1/2">
                <div
                  className="animate-[ecosystem-counter_36s_linear_infinite]"
                  style={{ animationDelay: `${delay}s` }}
                >
                  <div
                    data-orbit-pill
                    className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-xs font-semibold text-slate-100 opacity-0 shadow-xl shadow-black/20 backdrop-blur-2xl transition hover:scale-105 hover:border-cyan-200/30 hover:bg-white/[0.12]"
                  >
                    <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.85)]" />
                    <span className="text-white">{name}</span>
                    <span className="text-slate-400">{t(`orbit.${id}`)}</span>
                    <span className="sr-only">{index}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>

      <style>{`
        @keyframes ecosystem-orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes ecosystem-counter {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
      `}</style>
    </section>
  );
}
