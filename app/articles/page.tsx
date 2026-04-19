import Link from "next/link";

import { PageContainer } from "@/components/layout/page-container";
import { buildMetadata } from "@/lib/metadata";
import { pageDocuments } from "@/lib/page-data";
import { routes } from "@/lib/routes";

const page = pageDocuments.articlesHub;

function getArticleMeta(href: string) {
  if (href === routes.whatIsBubbleFont) {
    return {
      type: "Concept",
      note: "Best for users who want a definition before using a tool.",
    };
  }

  if (href === routes.howToMakeBubbleLetters) {
    return {
      type: "Tutorial",
      note: "Best for users who want a step-by-step beginner workflow.",
    };
  }

  if (href === routes.bubbleFontGeneratorVsBubbleLetterFontGenerator) {
    return {
      type: "Comparison",
      note: "Best for users comparing two similar search intents.",
    };
  }

  return {
    type: "Guide",
    note: "Best for users evaluating free-use expectations and features.",
  };
}

export const metadata = buildMetadata(page);

export default function ArticlesPage() {
  return (
    <main className="flex-1 bg-transparent">
      <PageContainer>
        <article className="py-12 sm:py-16">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href={routes.home} className="hover:text-sky-300">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-slate-300">Articles</li>
            </ol>
          </nav>

          <header className="sr-only">
            <h1>{page.h1}</h1>
            <p>{page.intro}</p>
          </header>

          <section className="grid gap-5 md:grid-cols-2">
            {page.relatedLinks.map((link) => {
              const meta = getArticleMeta(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-2xl border border-white/10 bg-slate-950/55 p-6 shadow-xl shadow-black/10 transition hover:border-cyan-400/30 hover:bg-slate-900/80"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">
                      {meta.type}
                    </span>
                    <span className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                      Article
                    </span>
                  </div>
                  <h2 className="mt-5 text-2xl font-semibold tracking-tight text-slate-50">
                    {link.label}
                  </h2>
                  <p className="mt-3 text-base leading-7 text-slate-300">
                    {link.description}
                  </p>
                  <p className="mt-4 text-sm leading-6 text-slate-400">
                    {meta.note}
                  </p>
                  <p className="mt-5 text-sm font-medium text-cyan-300">
                    Open article
                  </p>
                </Link>
              );
            })}
          </section>

          <section className="mt-10 rounded-3xl border border-cyan-400/15 bg-gradient-to-r from-slate-950/75 to-cyan-950/35 p-8 shadow-2xl shadow-black/10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Ready To Create?
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
              Jump Back To The Main Bubble Font Generator
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
              The articles explain the topic. The main tool page is still the
              best place to turn ideas into editable bubble text and export a
              visual result.
            </p>
            <div className="mt-6">
              <Link
                href={routes.bubbleFontGenerator}
                className="inline-flex items-center rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Open Bubble Font Generator
              </Link>
            </div>
          </section>
        </article>
      </PageContainer>
    </main>
  );
}
