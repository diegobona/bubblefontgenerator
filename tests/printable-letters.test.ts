import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { parse } from "opentype.js";
import { buildPrintablePages, PAPER_SIZES } from "../lib/printable-letters";
import { createPrintablePdf } from "../lib/printable-pdf";
import { PDFDocument } from "pdf-lib";

async function main() {
  const data = readFileSync("public/fonts/google/chewy.ttf");
  const font = parse(data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength) as ArrayBuffer);
  for (const paper of ["a4", "letter"] as const) {
    const result = buildPrintablePages(font, { text: "HELLO\nworld", paper, size: 160, layout: "sheet" });
    assert.equal(result.pages.length, 1);
    assert.equal(result.pages[0].length, 2);
    assert.ok(result.pages[0].every((line) => line.path.startsWith("M")));
    for (const line of result.pages.flat()) {
      assert.ok(line.bounds.x1 >= 35 && line.bounds.x2 <= PAPER_SIZES[paper].width - 35);
      assert.ok(line.bounds.y1 >= 35 && line.bounds.y2 <= PAPER_SIZES[paper].height - 35);
    }
    const bytes = await createPrintablePdf(result, paper, "outline", 1.5);
    const pdf = await PDFDocument.load(bytes);
    assert.equal(pdf.getPageCount(), 1);
    assert.equal(pdf.getPage(0).getWidth(), PAPER_SIZES[paper].width);
    assert.equal(pdf.getPage(0).getHeight(), PAPER_SIZES[paper].height);
  }
  assert.equal(buildPrintablePages(font, {text:"  \n ",paper:"a4",size:140,layout:"sheet"}).pages.length, 0);
  const cards = buildPrintablePages(font, {text:"A b!",paper:"letter",size:160,layout:"letter"});
  assert.equal(cards.pages.length, 3);
  const long = buildPrintablePages(font, {text:"WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",paper:"letter",size:240,layout:"sheet"});
  assert.ok(long.pages.length > 1);
  assert.equal(long.pages.flat().map((line) => line.text).join("").length, 64);
  assert.ok(long.pages.flat().every((line) => line.bounds.x2 <= 577 && line.bounds.y2 <= 757));
  const missing = buildPrintablePages(font, {text:"Hi你🙂",paper:"a4",size:100,layout:"sheet"});
  assert.deepEqual(missing.unsupported, ["你", "🙂"]);
  assert.equal(missing.pages[0][0].text, "Hi");
  const pdf = await PDFDocument.load(await createPrintablePdf(cards,"letter","coloring",2));
  assert.equal(pdf.getPageCount(), 3);
  console.log("Printable path bounds, pagination and PDF tests passed");
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
