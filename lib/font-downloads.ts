import licenseManifest from "../public/fonts/licenses/manifest.json";
import { bubbleFontLibrary, type BubbleFont, type BubbleFontCategory } from "./font-library";

type FontLicense = {
  name: string;
  path: string;
  sourceUrl: string;
  sha256: string;
};

export type DownloadableFont = BubbleFont & { downloadName: string; license: FontLicense };

const licenses: Record<string, FontLicense> = licenseManifest.fonts;

export const downloadableFonts: DownloadableFont[] = bubbleFontLibrary.map((font) => {
  const license = licenses[font.id];
  if (!license) throw new Error(`Missing accompanying license for ${font.id}`);
  return { ...font, downloadName: `${font.id}.ttf`, license };
});

export function searchDownloadableFonts(query: string, category: BubbleFontCategory | "all" = "all") {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return downloadableFonts.filter((font) => {
    if (category !== "all" && !font.categories.includes(category)) return false;
    const searchable = `${font.displayName} ${font.id.replace(/-/g, " ")} ${font.categories.join(" ")}`.toLowerCase();
    return terms.every((term) => searchable.includes(term));
  }).sort((left, right) => right.popularityScore - left.popularityScore);
}
