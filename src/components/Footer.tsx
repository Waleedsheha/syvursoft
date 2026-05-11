import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#070c17] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <Link
          href="/"
          className="text-2xl font-bold tracking-[-0.03em] text-white transition hover:text-cyan-200"
        >
          Syvursoft
        </Link>

        <nav className="flex flex-wrap justify-center gap-8 text-sm font-semibold text-slate-400">
          <Link href="/about" className="transition-colors duration-200 hover:text-cyan-300">
            About Us
          </Link>
          <Link href="/privacy" className="transition-colors duration-200 hover:text-cyan-300">
            Privacy Policy
          </Link>
          <Link href="/terms" className="transition-colors duration-200 hover:text-cyan-300">
            Terms of Service
          </Link>
        </nav>

        <p className="text-xs text-slate-500">
          &copy; {new Date().getFullYear()} Syvursoft. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
