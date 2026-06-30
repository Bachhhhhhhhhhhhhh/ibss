import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["three", "@react-pdf/renderer"],
  turbopack: {},
};

export default nextConfig;