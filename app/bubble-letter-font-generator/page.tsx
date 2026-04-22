import { SeoPage } from "@/components/sections/seo-page";
import { buildMetadata } from "@/lib/metadata";
import { pageDocuments } from "@/lib/page-data";

const page = pageDocuments.bubbleLetterFontGenerator;

export const metadata = buildMetadata(page);

export default function BubbleLetterFontGeneratorPage() {
  return <SeoPage page={page} />;
}
