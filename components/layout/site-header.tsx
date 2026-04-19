import Link from "next/link";

import { PageContainer } from "./page-container";
import {
  headerArticleLinks,
  headerToolLinks,
  primaryNavLinks,
} from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
      <PageContainer>
        <div className="flex min-h-16 flex-wrap items-center justify-between gap-6 py-3">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-slate-900"
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
                className="rounded-full px-3 py-2 text-slate-600 transition hover:bg-slate-50 hover:text-sky-700"
              >
                {link.label}
              </Link>
            ))}

            <details className="group relative">
              <summary className="list-none cursor-pointer rounded-full px-3 py-2 text-slate-600 transition hover:bg-slate-50 hover:text-sky-700">
                Tool Pages
              </summary>
              <div className="absolute right-0 z-20 mt-2 w-72 rounded-2xl border border-slate-200 bg-white p-3 shadow-lg">
                <ul className="space-y-2">
                  {headerToolLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="block rounded-xl px-3 py-3 text-sm text-slate-700 transition hover:bg-sky-50 hover:text-sky-700"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </details>

            <details className="group relative">
              <summary className="list-none cursor-pointer rounded-full px-3 py-2 text-slate-600 transition hover:bg-slate-50 hover:text-sky-700">
                Articles
              </summary>
              <div className="absolute right-0 z-20 mt-2 w-72 rounded-2xl border border-slate-200 bg-white p-3 shadow-lg">
                <ul className="space-y-2">
                  {headerArticleLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="block rounded-xl px-3 py-3 text-sm text-slate-700 transition hover:bg-sky-50 hover:text-sky-700"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          </nav>
        </div>
      </PageContainer>
    </header>
  );
}
