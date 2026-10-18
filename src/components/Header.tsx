"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import StaggeredMenu, { type NavLink } from "./StaggeredMenu";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks: NavLink[] = [
    { name: "Home", href: "/" },
    {
      name: "Products",
      href: "/#products",
      submenu: [
        { name: "RADex", href: "/radex" },
        { name: "MEND", href: "/mend" },
        {
          name: "Atria",
          href: "https://play.google.com/store/apps/details?id=com.syvursoft.atria",
          external: true,
        },
        {
          name: "ABGen",
          href: "https://play.google.com/store/apps/details?id=com.syvursoft.abgen",
          external: true,
        },
      ],
    },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "#contact" },
  ];

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 px-4 transition-all duration-300 sm:px-6 lg:px-8",
        isScrolled
          ? "py-3"
          : "py-5"
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border px-5 py-3 shadow-2xl backdrop-blur-2xl transition-all duration-300",
          isScrolled
            ? "border-white/[0.12] bg-[#070c17]/[0.92] shadow-black/30"
            : "border-white/[0.08] bg-[#070c17]/[0.82] shadow-black/30",
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/images/syvursoft-logo.png"
            alt=""
            width={44}
            height={24}
            className="h-7 w-auto object-contain transition group-hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.45)]"
            priority
          />
          <div className="text-2xl font-bold tracking-[-0.03em] text-white transition group-hover:text-cyan-200">
            Syvursoft
          </div>
        </Link>



        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            if (link.submenu) {
              return (
                <div key={link.name} className="group relative">
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-1 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-300 transition hover:bg-white/[0.08] hover:text-cyan-200",
                    )}
                  >
                    {link.name}
                    <ChevronDown className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <div className="invisible absolute right-0 top-full pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100">
                    <div className="min-w-44 translate-y-1 rounded-2xl border border-white/10 bg-[#070c17]/95 p-2 shadow-2xl shadow-black/30 backdrop-blur-xl transition group-hover:translate-y-0">
                      {link.submenu.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          target={item.external ? "_blank" : undefined}
                          rel={item.external ? "noopener noreferrer" : undefined}
                          className="block rounded-xl px-3 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/[0.08] hover:text-cyan-200"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-300 transition hover:bg-white/[0.08] hover:text-cyan-200",
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <button
          className="rounded-full border border-white/[0.12] bg-white/[0.06] p-3 text-white transition hover:border-cyan-200/30 hover:bg-white/10 md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Open navigation menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <StaggeredMenu
        open={isMobileMenuOpen}
        setOpen={setIsMobileMenuOpen}
        links={navLinks}
      />
    </header>
  );
}
