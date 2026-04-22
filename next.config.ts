import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/bubble-font-generator",
        destination: "/",
        permanent: true,
      },
      {
        source: "/bubble-font-generator/",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
