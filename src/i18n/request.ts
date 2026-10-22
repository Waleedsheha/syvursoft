import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

const messageLoaders = {
  en: () => import("../../messages/en.json"),
  ar: () => import("../../messages/ar.json"),
};

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  if (!hasLocale(routing.locales, locale)) {
    throw new Error(`No supported locale for this request: ${String(locale)}`);
  }
  const { default: messages } = await messageLoaders[locale]();
  return {
    locale,
    messages,
    // Syvursoft works from Cairo. The site formats no dates, but next-intl needs a set zone so server and browser agree.
    timeZone: "Africa/Cairo",
    // A missing message is a gap in the copy, so the render stops here instead of showing the key path.
    onError: (error) => {
      throw error;
    },
  };
});
