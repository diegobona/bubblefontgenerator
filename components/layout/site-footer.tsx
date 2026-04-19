import Link from "next/link";

import { PageContainer } from "./page-container";
import { footerArticleLinks, footerToolLinks } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <PageContainer>
        <div className="grid gap-10 py-12 md:grid-cols-3">
          <section aria-labelledby="footer-brand">
            <h2
              id="footer-brand"
              className="text-base font-semibold text-slate-900"
            >
              Bubble Font Generator
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              A focused bubble font generator project built to serve one topic
              cluster well: bubble text, bubble letters, bubble writing, and
              bubble graffiti.
            </p>
          </section>
          <section aria-labelledby="footer-tools">
            <h2
              id="footer-tools"
              className="text-base font-semibold text-slate-900"
            >
              Tool Pages
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {footerToolLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-sky-700">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="footer-articles">
            <h2
              id="footer-articles"
              className="text-base font-semibold text-slate-900"
            >
              Article Pages
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {footerArticleLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-sky-700">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </PageContainer>
    </footer>
  );
}
