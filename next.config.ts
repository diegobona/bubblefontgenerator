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
      {
        source: "/bubble-font-generator/bubble-letter-font-generator",
        destination: "/bubble-letter-font-generator/",
        permanent: true,
      },
      {
        source: "/bubble-font-generator/bubble-letter-font-generator/",
        destination: "/bubble-letter-font-generator/",
        permanent: true,
      },
      {
        source: "/bubble-font-generator/bubble-writing-font-generator",
        destination: "/bubble-writing-font-generator/",
        permanent: true,
      },
      {
        source: "/bubble-font-generator/bubble-writing-font-generator/",
        destination: "/bubble-writing-font-generator/",
        permanent: true,
      },
      {
        source: "/bubble-font-generator/bubble-graffiti-font-generator",
        destination: "/bubble-graffiti-font-generator/",
        permanent: true,
      },
      {
        source: "/bubble-font-generator/bubble-graffiti-font-generator/",
        destination: "/bubble-graffiti-font-generator/",
        permanent: true,
      },
      {
        source: "/bubble-font-generator/what-is-bubble-font",
        destination: "/articles/what-is-bubble-font/",
        permanent: true,
      },
      {
        source: "/bubble-font-generator/what-is-bubble-font/",
        destination: "/articles/what-is-bubble-font/",
        permanent: true,
      },
      {
        source: "/bubble-font-generator/how-to-make-bubble-letters",
        destination: "/articles/how-to-make-bubble-letters/",
        permanent: true,
      },
      {
        source: "/bubble-font-generator/how-to-make-bubble-letters/",
        destination: "/articles/how-to-make-bubble-letters/",
        permanent: true,
      },
      {
        source: "/bubble-font-generator/bubble-font-generator-vs-bubble-letter-font-generator",
        destination: "/articles/bubble-font-generator-vs-bubble-letter-font-generator/",
        permanent: true,
      },
      {
        source: "/bubble-font-generator/bubble-font-generator-vs-bubble-letter-font-generator/",
        destination: "/articles/bubble-font-generator-vs-bubble-letter-font-generator/",
        permanent: true,
      },
      {
        source: "/bubble-font-generator/free-bubble-font-generator",
        destination: "/articles/free-bubble-font-generator/",
        permanent: true,
      },
      {
        source: "/bubble-font-generator/free-bubble-font-generator/",
        destination: "/articles/free-bubble-font-generator/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
