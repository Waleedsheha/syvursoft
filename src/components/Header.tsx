"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import StaggeredMenu from "./StaggeredMenu";
import LegacyProductsDialog from "./LegacyProductsDialog";
import DevelopmentPopup from "./DevelopmentPopup";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [legacyDialogOpen, setLegacyDialogOpen] = useState(false);
  const [devPopupOpen, setDevPopupOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    {
      name: "Legacy Products",
      href: "#",
      action: () => setLegacyDialogOpen(true)
    },
    {
      name: "Products",
      href: "/#products",
      submenu: [
        { name: "RADex", href: "/#meet-radex" },
        { name: "MEND", href: "#", action: () => setDevPopupOpen(true) },
        { name: "BOND", href: "#", action: () => setDevPopupOpen(true) },
        { name: "ADAM AI", href: "#", action: () => setDevPopupOpen(true) },
      ]
    },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "#contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="text-2xl font-bold tracking-tighter">
            <span className="text-[#f97316]">Syvur</span>
            <span className={cn("transition-colors", isScrolled ? "text-[#0a192f]" : "text-white")}>
              soft
            </span>
          </div>
        </Link>



        <button
          className="p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={cn("w-6 h-6", isScrolled ? "text-slate-900" : "text-white")} />
          ) : (
            <Menu className={cn("w-6 h-6", isScrolled ? "text-slate-900" : "text-white")} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <StaggeredMenu
        open={isMobileMenuOpen}
        setOpen={setIsMobileMenuOpen}
        links={navLinks}
      />

      {/* Legacy Products Dialog */}
      <LegacyProductsDialog
        open={legacyDialogOpen}
        onOpenChange={setLegacyDialogOpen}
      />

      {/* Development Popup */}
      <DevelopmentPopup
        open={devPopupOpen}
        onOpenChange={setDevPopupOpen}
      />
    </header>
  );
}
