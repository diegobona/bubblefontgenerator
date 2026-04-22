import type { MetadataRoute } from "next";

import { pageDocuments } from "@/lib/page-data";
import { getCanonicalUrl } from "@/lib/metadata";
import { routes } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(pageDocuments)
    .filter((page) => page.path !== routes.bubbleFontGenerator)
    .map((page) => ({
      url: getCanonicalUrl(page.path),
      lastModified: new Date(),
      changeFrequency: page.path === "/" ? "weekly" : "monthly",
      priority: page.path === "/" ? 1 : 0.8,
    }));
}
