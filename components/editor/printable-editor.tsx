"use client";

import { useEffect, useMemo, useState } from "react";
import type { Font } from "opentype.js";
import { buildPrintablePages, PAPER_SIZES, printableFonts, type PaperSize, type PrintStyle } from "@/lib/printable-letters";
import "./printable-editor.css";

const inputClass = "mt-2 w-full rounded-xl border border-white/15 bg-[#17152e] px-3 py-2.5 text-white focus:outline-2 focus:outline-cyan-200";
const buttonClass = "cursor-pointer rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-cyan-200";

export function PrintableEditor() {
  const [text, setText] = useState("ABC\nabc");
  const [fontId, setFontId] = useState<string>("rubik-bubbles");
  const [loaded, setLoaded] = useState<{ id: string; font: Font } | null>(null);
  const [fontError, setFontError] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [paper, setPaper] = useState<PaperSize>("a4");
  const [layout, setLayout] = useState<"sheet" | "letter">("sheet");
  const [size, setSize] = useState(140);
  const [style, setStyle] = useState<PrintStyle>("outline");
  const [stroke, setStroke] = useState(1.5);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const font = loaded?.id === fontId ? loaded.font : null;

  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    Promise.all([
      import("opentype.js"),
      fetch(`/fonts/google/${fontId}.ttf`, { signal: controller.signal }).then((response) => {
        if (!response.ok) throw new Error("Font download failed");
        return response.arrayBuffer();
      }),
    ]).then(([opentype, buffer]) => {
      if (active) { setLoaded({ id: fontId, font: opentype.parse(buffer) }); setFontError(""); }
    }).catch((error) => {
      if (active && error.name !== "AbortError") setFontError("The font could not load. Check your connection and retry.");
    });
    return () => { active = false; controller.abort(); };
  }, [fontId, attempt]);

  const result = useMemo(() => font ? buildPrintablePages(font, { text, paper, size, layout }) : null, [font, text, paper, size, layout]);
  const ready = !!result?.pages.length && !result.unsupported.length;
  const dimensions = PAPER_SIZES[paper];

  async function downloadPdf() {
    if (!result || !ready) return;
    setBusy(true); setStatus("Preparing your PDF…");
    try {
      const { createPrintablePdf } = await import("@/lib/printable-pdf");
      const bytes = await createPrintablePdf(result, paper, style, stroke);
      const blob = new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url; link.download = `printable-bubble-letters-${paper}-${style}.pdf`;
      document.body.append(link); link.click(); link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 60000);
      setStatus("Your PDF is ready. Check your downloads.");
    } catch { setStatus("Could not create the PDF. Please try again."); }
    finally { setBusy(false); }
  }

  return <div className="printable-editor grid items-start gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
    <style>{`@page { size: ${dimensions.css}; margin: 0; }`}</style>
    <section aria-label="Template settings" className="no-print space-y-5 rounded-3xl border border-white/10 bg-[#181430] p-5">
      <div>
        <label htmlFor="print-text" className="font-semibold">Your letters or words</label>
        <textarea id="print-text" rows={4} maxLength={500} value={text} onChange={(event) => {setText(event.target.value);setStatus("");}} className={inputClass} />
        <p className="mt-1 text-xs text-slate-400">Up to 500 characters. Press Enter for a new line.</p>
      </div>
      <div className="flex flex-wrap gap-2" aria-label="Quick templates">
        <button className={buttonClass} onClick={() => setText("ABCDEFGHIJKLMNOPQRSTUVWXYZ")}>A–Z</button>
        <button className={buttonClass} onClick={() => setText("abcdefghijklmnopqrstuvwxyz")}>a–z</button>
        <button className={buttonClass} onClick={() => setText("0123456789")}>0–9</button>
        <button className={buttonClass} onClick={() => setText("Happy\nBirthday!")}>Birthday</button>
      </div>
      <label className="block text-sm font-medium" htmlFor="print-font">Bubble font
        <select id="print-font" value={fontId} onChange={(event) => {setFontId(event.target.value);setFontError("");}} className={inputClass}>
          {printableFonts.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
        </select>
      </label>
      <label className="block text-sm font-medium" htmlFor="print-style">Template style
        <select id="print-style" value={style} onChange={(event) => {const next = event.target.value as PrintStyle; setStyle(next); setStroke(next === "coloring" ? 2.5 : next === "tracing" ? 1 : 1.5);}} className={inputClass}>
          <option value="outline">Clean outline</option><option value="coloring">Coloring page · bold outline</option><option value="tracing">Tracing · dashed outline</option>
        </select>
      </label>
      <label className="block text-sm font-medium" htmlFor="print-paper">Paper size
        <select id="print-paper" value={paper} onChange={(event) => setPaper(event.target.value as PaperSize)} className={inputClass}><option value="a4">A4 (210 × 297 mm)</option><option value="letter">US Letter (8.5 × 11 in)</option></select>
      </label>
      <label className="block text-sm font-medium" htmlFor="print-layout">Page layout
        <select id="print-layout" value={layout} onChange={(event) => setLayout(event.target.value as "sheet" | "letter")} className={inputClass}><option value="sheet">Words / alphabet sheet</option><option value="letter">One large character per page</option></select>
      </label>
      <label className="block text-sm" htmlFor="print-size">Letter size · {size} pt
        <input id="print-size" type="range" min={40} max={240} step={10} value={size} disabled={layout === "letter"} onChange={(event) => setSize(Number(event.target.value))} className="mt-3 w-full accent-cyan-300 disabled:opacity-40" />
        {layout === "letter" && <span className="text-xs text-slate-400">Each character automatically fits the page.</span>}
      </label>
      <label className="block text-sm" htmlFor="print-stroke">Outline thickness · {stroke} pt
        <input id="print-stroke" type="range" min={0.5} max={3} step={0.5} value={stroke} onChange={(event) => setStroke(Number(event.target.value))} className="mt-3 w-full accent-cyan-300" />
      </label>
      <button disabled={!ready || busy} onClick={downloadPdf} className="w-full cursor-pointer rounded-xl bg-cyan-200 px-4 py-3 font-semibold text-slate-950 hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-40">{busy ? "Creating PDF…" : "Download PDF"}</button>
      <button disabled={!ready || busy} onClick={() => window.print()} className={`${buttonClass} w-full disabled:cursor-not-allowed disabled:opacity-40`}>Print templates</button>
      <p role="status" className="text-sm text-cyan-100">{status}</p>
      <p className="text-xs leading-5 text-slate-400">Free, no sign-up. Your text stays in your browser. Print at 100% / actual size, with headers and footers off.</p>
    </section>
    <section aria-label="Printable preview" className="min-w-0">
      <div className="no-print mb-4 flex items-center justify-between gap-3"><h2 className="text-xl font-semibold">Print preview</h2><span className="text-sm text-slate-300">{result?.pages.length ?? 0} {result?.pages.length === 1 ? "page" : "pages"} · {dimensions.label}</span></div>
      {!font && !fontError && <p role="status" className="no-print p-8 text-slate-300">Loading bubble font…</p>}
      {fontError && <div role="alert" className="no-print rounded-xl bg-red-950/40 p-4"><p>{fontError}</p><button onClick={() => {setFontError(""); setAttempt((value) => value + 1);}} className={`${buttonClass} mt-3`}>Retry font</button></div>}
      {result && !text.trim() && <p className="no-print rounded-xl border border-dashed border-white/20 p-10 text-center text-slate-300">Type some letters or choose an alphabet above to make a template.</p>}
      {!!result?.unsupported.length && <p role="alert" className="no-print mb-4 rounded-xl bg-amber-200/10 p-4 text-amber-100">This font cannot draw: {result.unsupported.join(" ")}. Remove these characters or choose another font before printing or downloading.</p>}
      <div className="print-sheets space-y-6">
        {result?.pages.map((lines, index) => <div className="print-sheet mx-auto w-full max-w-[650px] overflow-hidden rounded-sm bg-white shadow-xl" key={index} style={{aspectRatio:`${dimensions.width}/${dimensions.height}`}}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${dimensions.width} ${dimensions.height}`} className="h-full w-full" role="img" aria-label={`Printable page ${index + 1}: ${lines.map((line) => line.text).join(" ")}`}>
            {lines.map((line, lineIndex) => <path key={lineIndex} d={line.path} fill="white" stroke={style === "tracing" ? "#737373" : "black"} strokeWidth={stroke} strokeDasharray={style === "tracing" ? "3 3" : undefined} />)}
          </svg>
        </div>)}
      </div>
    </section>
  </div>;
}
