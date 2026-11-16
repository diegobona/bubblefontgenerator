import type { Font } from "opentype.js";

export const PAPER_SIZES = {
  a4: { width: 595.28, height: 841.89, label: "A4", css: "210mm 297mm" },
  letter: { width: 612, height: 792, label: "US Letter", css: "8.5in 11in" },
} as const;
export type PaperSize = keyof typeof PAPER_SIZES;
export type PrintStyle = "outline" | "coloring" | "tracing";
export type PrintableLine = { text: string; path: string; bounds: { x1: number; y1: number; x2: number; y2: number } };
export type PrintableResult = { pages: PrintableLine[][]; unsupported: string[] };
export type PrintableOptions = { text: string; paper: PaperSize; size: number; layout: "sheet" | "letter" };
export const printableFonts = [
  { id: "rubik-bubbles", name: "Rubik Bubbles" },
  { id: "chewy", name: "Chewy" },
  { id: "bubblegum-sans", name: "Bubblegum Sans" },
] as const;

export function buildPrintablePages(font: Font, options: PrintableOptions): PrintableResult {
  const { width, height } = PAPER_SIZES[options.paper];
  const margin = 36;
  const available = width - margin * 2;
  const size = Math.max(40, Math.min(240, options.size || 140));
  const unsupported = new Set<string>();
  const text = Array.from(options.text.slice(0, 500).replace(/\r\n?/g, "\n"), (char) => {
    if (/\s/.test(char) || font.charToGlyphIndex(char)) return char === "\t" ? " " : char;
    unsupported.add(char);
    return "";
  }).join("");
  const pages: PrintableLine[][] = [];
  if (!text.trim()) return { pages, unsupported: [...unsupported] };

  function place(value: string, fontSize: number, top: number): PrintableLine {
    const bounds = font.getPath(value, 0, 0, fontSize).getBoundingBox();
    const path = font.getPath(value, (width - (bounds.x2 - bounds.x1)) / 2 - bounds.x1, top - bounds.y1, fontSize);
    const box = path.getBoundingBox();
    return { text: value, path: path.toPathData(3), bounds: { x1: box.x1, y1: box.y1, x2: box.x2, y2: box.y2 } };
  }
  if (options.layout === "letter") {
    for (const char of Array.from(text).filter((char) => !/\s/.test(char))) {
      const box = font.getPath(char, 0, 0, 100).getBoundingBox();
      const fittedSize = 100 * Math.min(available / Math.max(1, box.x2 - box.x1), (height - 2 * margin) / Math.max(1, box.y2 - box.y1));
      const glyphHeight = (box.y2 - box.y1) * fittedSize / 100;
      pages.push([place(char, fittedSize, (height - glyphHeight) / 2)]);
    }
    return { pages, unsupported: [...unsupported] };
  }

  const lines: string[] = [];
  const fits = (value: string) => {
    const bounds = font.getPath(value, 0, 0, size).getBoundingBox();
    return bounds.x2 - bounds.x1 <= available;
  };
  for (const paragraph of text.split("\n")) {
    if (!paragraph.trim()) { lines.push(""); continue; }
    let current = "";
    for (const word of paragraph.trim().split(/\s+/)) {
      if (current && !fits(`${current} ${word}`)) { lines.push(current); current = ""; }
      for (const char of Array.from((current ? " " : "") + word)) {
        if (current && !fits(current + char)) { lines.push(current.trimEnd()); current = ""; }
        current += char;
      }
    }
    if (current.trim()) lines.push(current.trim());
  }
  let page: PrintableLine[] = [];
  let top = margin;
  for (const line of lines) {
    if (!line) { top += size * 0.5; continue; }
    const box = font.getPath(line, 0, 0, size).getBoundingBox();
    const lineHeight = box.y2 - box.y1;
    if (top + lineHeight > height - margin) {
      if (page.length) pages.push(page);
      page = []; top = margin;
    }
    page.push(place(line, size, top));
    top += lineHeight + size * 0.3;
  }
  if (page.length) pages.push(page);
  return { pages, unsupported: [...unsupported] };
}
