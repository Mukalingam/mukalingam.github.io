import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // static export for GitHub Pages (mukalingam.github.io)
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
