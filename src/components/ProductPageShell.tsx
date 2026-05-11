import type { ReactNode } from "react";
import ContactGrid from "@/components/ContactGrid";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

type ProductPageShellProps = {
  children: ReactNode;
};

type ProductHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  highlights?: string[];
};

type ProductSectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
};

type FeatureListProps = {
  items: string[];
};

export function ProductPageShell({ children }: ProductPageShellProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <Header />
      <main>{children}</main>
      <ContactGrid />
      <Footer />
    </div>
  );
}

export function ProductHero({
  eyebrow,
  title,
  description,
  highlights = [],
}: ProductHeroProps) {
  return (
    <section className="bg-[#0a192f] px-4 pt-32 pb-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
            {description}
          </p>
        </div>

        {highlights.length > 0 ? (
          <ul className="grid gap-3 rounded-lg border border-white/15 bg-white/5 p-5">
            {highlights.map((highlight) => (
              <li
                key={highlight}
                className="border-l-2 border-cyan-300 pl-4 text-sm leading-6 text-slate-100"
              >
                {highlight}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

export function ProductSection({
  eyebrow,
  title,
  description,
  children,
}: ProductSectionProps) {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-4 text-base leading-7 text-slate-600">
              {description}
            </p>
          ) : null}
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

export function FeatureList({ items }: FeatureListProps) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-lg border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-700 shadow-sm"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
