"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { animate, stagger } from "animejs";
import { ArrowUpRight } from "lucide-react";
import { products, type ProductId, type ProductInfo } from "@/lib/products";

const homepageProductIds = ["radex", "mend", "adam"] satisfies ProductId[];

const productProof: Record<ProductId, string[]> = {
  radex: ["RIS", "PACS", "DICOM", "Reports"],
  mend: ["Digital twin", "Teams", "Maintenance", "Audit"],
  adam: ["AI orchestration", "Insight", "Automation", "Support"],
};

const productCardStyles: Record<
  ProductId,
  { halo: string; icon: string }
> = {
  radex: {
    halo: "from-blue-600 via-sky-500 to-cyan-400",
    icon: "bg-sky-50 text-sky-600 ring-sky-100",
  },
  mend: {
    halo: "from-cyan-500 via-blue-500 to-indigo-500",
    icon: "bg-cyan-50 text-cyan-600 ring-cyan-100",
  },
  adam: {
    halo: "from-emerald-500 via-teal-500 to-cyan-500",
    icon: "bg-emerald-50 text-emerald-600 ring-emerald-100",
  },
};

const homepageProducts = homepageProductIds.map((productId) => {
  const product = products.find(({ id }) => id === productId);

  if (!product) {
    throw new Error(`Missing homepage product metadata for ${productId}`);
  }

  return product;
}) satisfies ProductInfo[];

export default function ProductEcosystem() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const cards = section.querySelectorAll<HTMLElement>("[data-product-card]");
    const cardHeaders = section.querySelectorAll<HTMLElement>(
      "[data-product-card-header]",
    );

    const revealCards = () => {
      animate(cards, {
        opacity: [0, 1],
        y: [28, 0],
        duration: 720,
        delay: stagger(110),
        ease: "outCubic",
      });

      animate(cardHeaders, {
        backgroundPosition: ["0% 50%", "100% 50%"],
        duration: 2200,
        delay: stagger(140),
        ease: "inOutSine",
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        revealCards();
        observer.disconnect();
      },
      { threshold: 0.22 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative overflow-hidden bg-[#edf3f9] px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="absolute left-1/2 top-0 h-72 w-[min(680px,80vw)] -translate-x-1/2 rounded-full bg-sky-300/10 blur-3xl" />
      <div className="mx-auto max-w-7xl">
        <div className="relative grid gap-6 border-y border-slate-200/80 py-8 md:grid-cols-[minmax(0,0.72fr)_minmax(320px,0.28fr)] md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-sky-700">
              Product ecosystem
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-bold leading-[0.98] tracking-[-0.045em] text-slate-950 sm:text-5xl">
              Three active products, one connected clinical software suite.
            </h2>
          </div>
          <p className="text-base leading-7 text-slate-600">
            Move from radiology workflow to whole-facility control and
            intelligence without losing operational context between teams.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {homepageProducts.map(
            ({ id, name, shortRole, description, href }) => {
              const style = productCardStyles[id];

              return (
              <Link
                key={id}
                href={href}
                data-product-card
                className="group relative flex min-h-[390px] flex-col overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-white/90 shadow-[0_24px_80px_rgba(96,165,250,0.10)] backdrop-blur opacity-100 transition duration-500 hover:-translate-y-2 hover:border-sky-200 hover:shadow-[0_32px_72px_rgba(15,23,42,0.12)] focus:outline-none focus:ring-2 focus:ring-cyan-300"
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${style.halo}`}
                />
                <div className="absolute inset-0 translate-x-[-120%] bg-[linear-gradient(120deg,transparent,rgba(14,165,233,0.08),transparent)] transition duration-700 group-hover:translate-x-[120%]" />
                <div
                  data-product-card-header
                  className="relative p-6"
                >
                  <div className="relative flex items-start justify-between gap-5">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        {shortRole}
                      </p>
                      <h3 className="mt-3 text-4xl font-bold tracking-[-0.04em] text-slate-950">
                        {name}
                      </h3>
                    </div>
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ring-1 ${style.icon} transition duration-300 group-hover:scale-110`}
                    >
                      <Image
                        src="/images/syvursoft-logo.png"
                        alt=""
                        width={48}
                        height={27}
                        className="h-auto w-10 object-contain"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <p className="text-base leading-7 text-slate-600">
                      {description}
                    </p>
                    <div className="mt-6 grid grid-cols-2 gap-2">
                      {productProof[id].map((item) => (
                        <div
                          key={item}
                          className="flex min-h-10 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs font-semibold text-slate-700 transition group-hover:border-sky-100 group-hover:bg-sky-50/60"
                        >
                          <Image
                            src="/images/syvursoft-logo.png"
                            alt=""
                            width={20}
                            height={11}
                            className="h-auto w-4 shrink-0 object-contain"
                          />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5 text-sm font-semibold text-slate-950">
                    <span>Open {name}</span>
                    <ArrowUpRight
                      className="h-5 w-5 text-sky-600 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </Link>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}
