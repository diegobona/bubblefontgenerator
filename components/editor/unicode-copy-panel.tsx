"use client";

import { useState } from "react";

import { unicodeStyles as styles, unicodeText } from "@/lib/unicode-text";

export function UnicodeCopyPanel({ text }: { text: string }) {
  const [status, setStatus] = useState("");
  async function copy(value: string, label: string) {
    try {
      await navigator.clipboard.writeText(value);
      setStatus(`${label} copied!`);
    } catch {
      setStatus("Copy unavailable. Select the result and copy it manually.");
    }
  }
  return (
    <section aria-labelledby="copy-paste-heading" className="min-w-0 rounded-3xl border border-cyan-300/20 bg-[rgba(24,20,48,0.82)] p-4">
      <div className="home-copy-heading"><span className="home-eyebrow">TEXT STYLES</span><h2 id="copy-paste-heading" className="text-xl font-semibold text-white">Copy &amp; Paste</h2></div>
      <p className="mt-2 text-sm leading-6 text-slate-300">Your text, in six styles. Copy a result straight into a bio or message.</p>
      <div className="home-copy-grid mt-4 space-y-3">
        {styles.map((label, index) => {
          const value = unicodeText(text, index);
          return <div key={label} className="home-copy-card rounded-xl border border-white/10 p-3">
            <div className="flex items-center justify-between gap-2">
              <label htmlFor={`unicode-${index}`} className="text-xs text-slate-300">{label}</label>
              <button type="button" disabled={!text} aria-label={`Copy ${label}`} onClick={() => copy(value, label)} className="cursor-pointer rounded bg-cyan-300/15 px-3 py-1 text-sm text-cyan-100 transition-colors enabled:hover:bg-cyan-300/30 enabled:hover:text-white enabled:active:bg-cyan-300/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 disabled:cursor-not-allowed disabled:opacity-40">Copy</button>
            </div>
            <textarea id={`unicode-${index}`} readOnly value={value} rows={2} className="mt-2 w-full resize-none bg-transparent text-lg text-white" />
          </div>;
        })}
      </div>
      <p role="status" aria-live="polite" className="home-copy-status mt-3 min-h-10 text-sm text-cyan-100">{status}</p>
      <p className="text-xs leading-5 text-slate-400">Latin letters are converted; other scripts and emoji stay unchanged. Some styles use one case. Appearance varies by device.</p>
    </section>
  );
}
