import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  // Disable Turbopack to fix Sanity build issues
  experimental: {
    turbo: undefined,
  },
};

export default nextConfig;
