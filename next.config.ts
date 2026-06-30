import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  transpilePackages: ["three", "@react-pdf/renderer"],
  turbopack: {},
  ...(isGithubPages
    ? {
        output: "export" as const,
        basePath: "/ibss",
        assetPrefix: "/ibss/",
        images: { unoptimized: true },
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;