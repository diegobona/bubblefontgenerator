import { PDFDocument, rgb } from "pdf-lib";
import { PAPER_SIZES, type PaperSize, type PrintableResult, type PrintStyle } from "./printable-letters";

export async function createPrintablePdf(result: PrintableResult, paper: PaperSize, style: PrintStyle, stroke: number) {
  if (!result.pages.length) throw new Error("Enter some supported letters before downloading.");
  const pdf = await PDFDocument.create();
  pdf.setTitle("Printable Bubble Letters");
  pdf.setCreator("BubbleFontGenerator.net");
  const { width, height } = PAPER_SIZES[paper];
  for (const lines of result.pages) {
    const page = pdf.addPage([width, height]);
    for (const line of lines) {
      page.drawSvgPath(line.path, {
        x: 0, y: height,
        color: rgb(1, 1, 1),
        borderColor: style === "tracing" ? rgb(0.45, 0.45, 0.45) : rgb(0, 0, 0),
        borderWidth: stroke,
        ...(style === "tracing" ? { borderDashArray: [3, 3] } : {}),
      });
    }
  }
  return pdf.save();
}
