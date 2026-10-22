import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  // The language comes from the address alone, so nothing needs to remember it in a cookie.
  localeDetection: false,
  localeCookie: false,
});

/* Arabic reads right to left; English left to right. */
export function directionOf(locale: string) {
  return locale === "ar" ? "rtl" : "ltr";
}
