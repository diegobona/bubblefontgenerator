import { SeoPage } from "@/components/sections/seo-page";
import { buildMetadata } from "@/lib/metadata";
import { pageDocuments } from "@/lib/page-data";

const page = pageDocuments.bubbleFontGeneratorPng;

export const metadata = buildMetadata(page);

export default function BubbleFontGeneratorPngPage() {
  return <SeoPage page={page} />;
}
