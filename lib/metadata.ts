import type { Metadata } from "next";

import { siteConfig } from "./site";

type MetadataInput = {
  title: string;
  description: string;
  path: string;
};

function normalizePath(path: string) {
  if (path === "/") {
    return "/";
  }

  return `/${path.replace(/^\/+|\/+$/g, "")}/`;
}

export function getCanonicalUrl(path: string) {
  const normalizedPath = normalizePath(path);
  return new URL(normalizedPath, siteConfig.url).toString();
}

export function buildMetadata({
  title,
  description,
  path,
}: MetadataInput): Metadata {
  const canonical = getCanonicalUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.siteName,
      locale: siteConfig.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
