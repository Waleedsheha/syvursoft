import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { GATE_COOKIE, GATE_HEADER, GATE_PASSED } from "@/lib/gate";

/* Search engines and link previews cannot sweep snow, so they go straight in and every page stays indexed. */
const CRAWLER =
  /Googlebot|Google-InspectionTool|Storebot-Google|AdsBot-Google|bingbot|DuckDuckBot|Applebot|YandexBot|Baiduspider|facebookexternalhit|LinkedInBot|Twitterbot|Slackbot|WhatsApp|TelegramBot/i;

/* Every page is behind the welcome gate. Without this session's pass, any page sends the visitor to the gate on the home
   page; with it, everything opens normally until the browser closes. */
export function proxy(request: NextRequest) {
  const agent = request.headers.get("user-agent");
  const passed = request.cookies.get(GATE_COOKIE)?.value === GATE_PASSED || (agent !== null && CRAWLER.test(agent));
  if (!passed && request.nextUrl.pathname !== "/") return NextResponse.redirect(new URL("/", request.url));
  const headers = new Headers(request.headers);
  headers.set(GATE_HEADER, passed ? "open" : "closed");
  return NextResponse.next({ request: { headers } });
}

/* Never gated, because they must open directly: the site's own assets, the images, ATRIA's sign-in callback, the Android
   app links and passkeys file, the favicon, app-ads.txt and the Google site verification file. */
export const config = {
  matcher: [
    "/((?!_next/|images/|atria/|\\.well-known/|favicon\\.ico|app-ads\\.txt|google53a4f72f474950b2\\.html).*)",
  ],
};
