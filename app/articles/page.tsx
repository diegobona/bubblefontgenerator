import Link from "next/link";

import { PageContainer } from "@/components/layout/page-container";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-jsonld";
import { buildMetadata, getCanonicalUrl } from "@/lib/metadata";
import { pageDocuments } from "@/lib/page-data";
import { routes } from "@/lib/routes";

const page = pageDocuments.articlesHub;

function getArticleMeta(href: string) {
  if (href === routes.whatIsBubbleFont) {
    return {
      type: "Concept",
    };
  }

  if (href === routes.howToMakeBubbleLetters) {
    return {
      type: "Tutorial",
    };
  }

  if (href === routes.bubbleFontGeneratorVsBubbleLetterFontGenerator) {
    return {
      type: "Comparison",
    };
  }

  return {
    type: "Guide",
  };
}

export const metadata = buildMetadata(page);

export default function ArticlesPage() {
  return (
    <main className="flex-1 bg-transparent">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: getCanonicalUrl(routes.home) },
          { name: page.h1, item: getCanonicalUrl(page.path) },
        ]}
      />
      <PageContainer>
        <article className="py-12 sm:py-16">
          <header className="mb-8 max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {page.h1}
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
              {page.intro}
            </p>
          </header>

          <section className="grid gap-5 md:grid-cols-2">
            {page.relatedLinks.map((link) => {
              const meta = getArticleMeta(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-2xl border border-white/10 bg-slate-950/45 p-5 shadow-xl shadow-black/10 transition hover:border-cyan-400/30 hover:bg-slate-900/80"
                >
                  <div className="mb-3">
                    <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">
                      {meta.type}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold tracking-tight text-slate-50">
                    {link.label}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {link.description}
                  </p>
                </Link>
              );
            })}
          </section>

          <div className="mt-8">
            <Link
              href={`${routes.home}#main-editor`}
              className="inline-flex items-center rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Open The Bubble Font Generator
            </Link>
          </div>
        </article>
      </PageContainer>
    </main>
  );
}
