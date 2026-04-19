import Link from "next/link";

import { PageContainer } from "./page-container";
import { primaryNavLinks } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <PageContainer>
        <div className="flex min-h-16 flex-wrap items-center justify-between gap-6 py-3">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-slate-100"
          >
            Bubble Font Generator
          </Link>
          <nav
            aria-label="Primary"
            className="flex flex-wrap items-center gap-3 text-sm"
          >
            {primaryNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-transparent px-3 py-2 text-slate-300 transition hover:border-sky-400/20 hover:bg-sky-400/10 hover:text-sky-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </PageContainer>
    </header>
  );
}
