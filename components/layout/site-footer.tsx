import Link from "next/link";

import { PageContainer } from "./page-container";
import { footerArticleLinks, footerToolLinks } from "@/lib/site";
import { routes } from "@/lib/routes";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-white/8 bg-[#120f28]/70">
      <PageContainer>
        <div className="grid gap-10 py-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)_minmax(0,0.9fr)]">
          <div>
            <Link
              href={routes.home}
              className="text-lg font-semibold tracking-tight text-slate-50"
            >
              Bubble Font Generator
            </Link>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
              Use the main Bubble Font Generator to type your text, compare multiple styles, and
              download a PNG in seconds.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-200">
              Style Pages
            </h2>
            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
              <Link href={routes.home} className="transition hover:text-cyan-200">
                Bubble Font Generator
              </Link>
              {footerToolLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition hover:text-cyan-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-200">
              Guides
            </h2>
            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
              {footerArticleLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition hover:text-cyan-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </PageContainer>
    </footer>
  );
}
