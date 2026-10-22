import { readFile } from "node:fs/promises";
import path from "node:path";
import { hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { directionOf, routing } from "@/i18n/routing";

const htmlEscapes: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

/* The page fonts the template loads are Latin; the Arabic page also loads its Arabic face. */
const arabicFont =
  '<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap" rel="stylesheet" />';

/* MEND's page is its own static HTML. Each {{key}} in it is either one of the page slots below or the path of a message,
   and every one must resolve: a missing message stops the page rather than leaving a hole in it. */
export async function GET(_request: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    throw new Error(`The MEND page has no ${locale} version.`);
  }
  const messages = await getMessages({ locale });
  const home = locale === routing.defaultLocale ? "/" : `/${locale}`;
  const slots: Record<string, string> = {
    htmlLang: locale,
    htmlDir: directionOf(locale),
    localeHead: locale === "ar" ? arabicFont : "",
    localeHome: home,
    aboutContactUrl: `https://syvursoft.com${home === "/" ? "" : home}/about#contact`,
  };

  const template = await readFile(path.join(process.cwd(), "public", "mend", "landing.html"), "utf8");
  const html = template.replace(/{{([^}]+)}}/g, (_, key: string) => {
    if (key in slots) return slots[key];
    let value: unknown = messages;
    for (const part of key.split(".")) {
      if (typeof value !== "object" || value === null || !(part in value)) {
        throw new Error(`The MEND page needs the message "${key}", which ${locale} does not have.`);
      }
      value = (value as Record<string, unknown>)[part];
    }
    if (typeof value !== "string") {
      throw new Error(`The MEND page needs "${key}" to be text in ${locale}.`);
    }
    return value.replace(/[&<>"']/g, (c) => htmlEscapes[c]);
  });

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
}
