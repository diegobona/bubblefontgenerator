"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { downloadableFonts, searchDownloadableFonts, type DownloadableFont } from "@/lib/font-downloads";
import { type BubbleFontCategory } from "@/lib/font-library";

const pageSize = 12;
const defaultPreview = "Bubble Magic";
const fontLoads = new Map<string, Promise<void>>();
const categories: Array<BubbleFontCategory | "all"> = ["all", "bubble", "cartoon", "chunky", "cute", "graffiti", "handwritten", "outline", "school", "sticker"];
const inputClassName = "mt-2 w-full rounded-xl border border-white/15 bg-[#121128] px-4 py-3 text-slate-100 outline-none focus:border-cyan-300";

function loadPreviewFont(font: DownloadableFont) {
  let loading = fontLoads.get(font.id);
  if (!loading) {
    const face = new FontFace(`Library ${font.id}`, `url("${font.filePath}")`, { weight: font.fontWeight, display: "swap" });
    loading = face.load().then((loaded) => { document.fonts.add(loaded); }).catch((error) => {
      fontLoads.delete(font.id);
      throw error;
    });
    fontLoads.set(font.id, loading);
  }
  return loading;
}

function FontPreviewCard({ font, text, fontSize }: { font: DownloadableFont; text: string; fontSize: number }) {
  const cardRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<"waiting" | "loading" | "ready" | "error">("waiting");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    const load = () => {
      setStatus("loading");
      loadPreviewFont(font).then(
        () => { if (active) setStatus("ready"); },
        () => { if (active) setStatus("error"); },
      );
    };
    if (!cardRef.current) return;
    if (!("IntersectionObserver" in window)) {
      load();
      return () => { active = false; };
    }
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer.disconnect();
        load();
      }
    }, { rootMargin: "160px" });
    observer.observe(cardRef.current);
    return () => { active = false; observer.disconnect(); };
  }, [font, attempt]);

  return (
    <article ref={cardRef} className="min-w-0 rounded-3xl border border-white/10 bg-[#1a1933] p-5" data-font-preview={font.id}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="font-semibold text-white">{font.displayName}</h3>
        <span className="text-xs capitalize text-slate-400">{font.categories.slice(0, 2).join(" / ")}</span>
      </div>
      <div className="mt-4 flex min-h-40 items-center rounded-2xl bg-[#111126] p-4" aria-label={`${font.displayName} preview`} aria-busy={status === "loading" || status === "waiting"}>
        {status === "ready" ? (
          <p className="max-h-64 w-full overflow-auto whitespace-pre-wrap break-words text-center leading-tight text-cyan-100 [overflow-wrap:anywhere]" style={{ fontFamily: `"Library ${font.id}", sans-serif`, fontSize, fontWeight: font.fontWeight }}>{text.trim() ? text : defaultPreview}</p>
        ) : status === "error" ? (
          <div className="w-full text-center text-sm text-slate-300">
            <p>Preview could not load. The font download is still available.</p>
            <button type="button" onClick={() => setAttempt((current) => current + 1)} className="mt-2 text-cyan-200 underline underline-offset-4">Retry preview</button>
          </div>
        ) : <p className="w-full text-center text-sm text-slate-400">Loading font preview…</p>}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-3 text-sm">
        <a href={font.filePath} download={font.downloadName} className="rounded-full bg-cyan-300 px-4 py-2.5 font-semibold transition hover:bg-cyan-200" style={{ color: "#020617" }} aria-label={`Download ${font.displayName} TTF`}>Download TTF</a>
        <a href={font.license.path} download={`${font.id}-license.txt`} className="text-cyan-100 underline underline-offset-4" aria-label={`Download ${font.displayName} license`}>License</a>
        <a href={font.sourceUrl} className="text-slate-300 underline underline-offset-4" aria-label={`${font.displayName} on Google Fonts`}>Font source</a>
      </div>
      <p className="mt-3 text-xs text-slate-400"><a href={font.license.sourceUrl} className="hover:text-cyan-100">{font.license.name}</a></p>
    </article>
  );
}

export function FontLibraryBrowser() {
  const [text, setText] = useState(defaultPreview);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<BubbleFontCategory | "all">("all");
  const [fontSize, setFontSize] = useState(48);
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const matchingFonts = useMemo(() => searchDownloadableFonts(query, category), [query, category]);

  return (
    <section aria-labelledby="font-library-heading" className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-[#1b1933] p-5 sm:p-6">
        <h2 id="font-library-heading" className="text-xl font-semibold text-white">Find your bubble letters font</h2>
        <div className="mt-4 grid gap-5 lg:grid-cols-2">
          <label className="block text-sm font-medium text-slate-300">Your preview text
            <textarea value={text} onChange={(event) => setText(event.target.value)} maxLength={120} rows={2} className={inputClassName} placeholder={defaultPreview} />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-slate-300">Search fonts
              <input type="search" value={query} onChange={(event) => { setQuery(event.target.value); setVisibleCount(pageSize); }} className={inputClassName} placeholder="Name or style" />
            </label>
            <label className="block text-sm font-medium text-slate-300">Style
              <select value={category} onChange={(event) => { setCategory(event.target.value as BubbleFontCategory | "all"); setVisibleCount(pageSize); }} className={`${inputClassName} capitalize`}>
                {categories.map((item) => <option key={item} value={item}>{item === "all" ? "All styles" : item}</option>)}
              </select>
            </label>
            <label className="block text-sm font-medium text-slate-300 sm:col-span-2">Preview size: {fontSize}px
              <input type="range" min={24} max={96} value={fontSize} onChange={(event) => setFontSize(Number(event.target.value))} className="mt-3 w-full accent-cyan-300" />
            </label>
          </div>
        </div>
        <p className="mt-3 text-xs leading-5 text-slate-400">Type up to 120 characters. Character support varies by font; try your text before downloading.</p>
      </div>
      <p role="status" className="text-sm text-slate-300">{matchingFonts.length} of {downloadableFonts.length} fonts · showing {Math.min(visibleCount, matchingFonts.length)}</p>
      {matchingFonts.length ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {matchingFonts.slice(0, visibleCount).map((font) => <FontPreviewCard key={font.id} font={font} text={text} fontSize={fontSize} />)}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 p-8 text-center text-slate-300">
          <p>No fonts match this search.</p>
          <button type="button" onClick={() => { setQuery(""); setCategory("all"); setVisibleCount(pageSize); }} className="mt-3 font-medium text-cyan-200 underline underline-offset-4">Clear filters</button>
        </div>
      )}
      {visibleCount < matchingFonts.length ? <button type="button" onClick={() => setVisibleCount((current) => current + pageSize)} className="w-full rounded-2xl border border-cyan-300/25 bg-cyan-300/10 px-5 py-4 font-semibold text-cyan-100 hover:bg-cyan-300/20">Show {Math.min(pageSize, matchingFonts.length - visibleCount)} more fonts</button> : null}
    </section>
  );
}
