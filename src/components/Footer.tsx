import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");

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
            {t("aboutUs")}
          </Link>
          <Link href="/privacy" className="transition-colors duration-200 hover:text-cyan-300">
            {t("privacyPolicy")}
          </Link>
          <Link href="/terms" className="transition-colors duration-200 hover:text-cyan-300">
            {t("termsOfService")}
          </Link>
        </nav>

        <p className="text-xs text-slate-500">
          {t("copyright", { year: new Date().getFullYear() })}
        </p>
      </div>

      <address className="mx-auto mt-6 max-w-7xl text-center text-xs not-italic text-slate-500">
        {t("address")}
      </address>
    </footer>
  );
}
