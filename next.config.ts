import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";
import createNextIntlPlugin from "next-intl/plugin";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  reactCompiler: true,
  turbopack: {
    root: projectRoot,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/atria",
        destination: "https://atria.syvursoft.com",
        permanent: true,
      },
      {
        source: "/mend/landing.html",
        destination: "/mend",
        permanent: true,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
