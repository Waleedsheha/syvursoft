import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { GATE_COOKIE, GATE_HEADER, GATE_PASSED } from "@/lib/gate";
import { routing } from "@/i18n/routing";

/* Search engines and link previews cannot sweep snow, so they go straight in and every page stays indexed. */
const CRAWLER =
  /Googlebot|Google-InspectionTool|Storebot-Google|AdsBot-Google|bingbot|DuckDuckBot|Applebot|YandexBot|Baiduspider|facebookexternalhit|LinkedInBot|Twitterbot|Slackbot|WhatsApp|TelegramBot/i;

const routeByLanguage = createMiddleware(routing);

/* The home page of the language a path is in: "/ar" for the Arabic pages, "/" for the English ones. */
function homeOf(pathname: string) {
  const prefixed = routing.locales.find(
    (locale) => locale !== routing.defaultLocale && (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)),
  );
  return prefixed ? `/${prefixed}` : "/";
}

/* Every page is behind the welcome gate. Without this session's pass, any page sends the visitor to the gate on the home
   page of its language; with it, everything opens normally until the browser closes. Pages are then routed by language,
   English at the root and Arabic under /ar; files in public/ are served as they are. */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const agent = request.headers.get("user-agent");
  const passed = request.cookies.get(GATE_COOKIE)?.value === GATE_PASSED || (agent !== null && CRAWLER.test(agent));
  const home = homeOf(pathname);
  if (!passed && pathname !== home) return NextResponse.redirect(new URL(home, request.url));
  const headers = new Headers(request.headers);
  headers.set(GATE_HEADER, passed ? "open" : "closed");
  if (/\.[^/]+$/.test(pathname)) return NextResponse.next({ request: { headers } });
  return routeByLanguage(new NextRequest(request, { headers }));
}

/* Never gated, because they must open directly: the site's own assets, the images, ATRIA's sign-in callback, the Android
   app links and passkeys file, the favicon, app-ads.txt and the Google site verification file. */
export const config = {
  matcher: [
    "/((?!_next/|images/|atria/|\\.well-known/|favicon\\.ico|app-ads\\.txt|google53a4f72f474950b2\\.html).*)",
  ],
};
