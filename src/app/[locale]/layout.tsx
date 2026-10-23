import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getMessages, getTimeZone, getTranslations, setRequestLocale } from "next-intl/server";
import ClientIntlProvider from "@/i18n/client-provider";
import { directionOf, routing } from "@/i18n/routing";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  adjustFontFallback: false,
});

/* The Arabic pages are set in IBM Plex Sans Arabic, which also draws the Latin product names. Only the Arabic pages
   download it, so it is not preloaded on every page. */
const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-arabic",
  adjustFontFallback: false,
  preload: false,
});

type LocaleParams = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "metadata.root" });
  return { title: t("title"), description: t("description") };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<LocaleParams & { children: React.ReactNode }>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  const timeZone = await getTimeZone();

  return (
    <html lang={locale} dir={directionOf(locale)} suppressHydrationWarning>
      <body className={`${inter.variable} ${plexArabic.variable} antialiased`}>
        <ClientIntlProvider locale={locale} messages={messages} timeZone={timeZone}>
          {children}
        </ClientIntlProvider>
      </body>
    </html>
  );
}
