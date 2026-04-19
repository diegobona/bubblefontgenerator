import Image from "next/image";
import Link from "next/link";

import { BubbleEditor } from "@/components/editor/bubble-editor";
import { PageContainer } from "@/components/layout/page-container";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-jsonld";
import { FaqJsonLd } from "@/components/seo/faq-jsonld";
import type { PageDocument } from "@/lib/page-data";
import { getCanonicalUrl } from "@/lib/metadata";
import { getPagePresentation } from "@/lib/page-presentation";
import { routes } from "@/lib/routes";

type SeoPageProps = {
  page: PageDocument;
};

export function SeoPage({ page }: SeoPageProps) {
  const isHomePage = page.path === routes.home;
  const presentation = getPagePresentation(page.path, page.h1);
  const isToolPage = presentation.kind === "tool";
  const isArticlePage = presentation.kind === "article";
  const breadcrumbItems = isHomePage
    ? [{ name: "Home", item: getCanonicalUrl(routes.home) }]
    : [
        { name: "Home", item: getCanonicalUrl(routes.home) },
        {
          name: "Bubble Font Generator",
          item: getCanonicalUrl(routes.bubbleFontGenerator),
        },
        ...(page.path !== routes.bubbleFontGenerator
          ? [{ name: page.h1, item: getCanonicalUrl(page.path) }]
          : []),
      ];

  return (
    <main className="flex-1 bg-white">
      {isHomePage ? <FaqJsonLd faqs={page.faqs} /> : null}
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <PageContainer>
        <article className="py-12 sm:py-16">
          {!isHomePage ? (
            <nav
              aria-label="Breadcrumb"
              className="mb-6 text-sm text-slate-500"
            >
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href={routes.home} className="hover:text-sky-700">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    href={routes.bubbleFontGenerator}
                    className="hover:text-sky-700"
                  >
                    Bubble Font Generator
                  </Link>
                </li>
                {page.path !== routes.bubbleFontGenerator ? (
                  <>
                    <li aria-hidden="true">/</li>
                    <li className="text-slate-700">{page.h1}</li>
                  </>
                ) : null}
              </ol>
            </nav>
          ) : null}

          <header className="rounded-3xl bg-gradient-to-br from-sky-50 via-white to-violet-50 p-8 sm:p-12">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
                  {presentation.heroLabel}
                </p>
                <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                  {page.h1}
                </h1>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
                  {page.intro}
                </p>
                {isHomePage ? (
                  <ul className="mt-8 space-y-3 text-sm leading-6 text-slate-700">
                    {presentation.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-sky-500"
                        />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>

              <figure className="overflow-hidden rounded-3xl border border-sky-100 bg-white shadow-sm">
                <Image
                  src={presentation.sampleImage.src}
                  alt={presentation.sampleImage.alt}
                  width={1200}
                  height={900}
                  className="block h-auto w-full"
                  unoptimized
                />
                <figcaption className="border-t border-slate-200 px-5 py-4 text-sm leading-6 text-slate-600">
                  This preview image is rendered in the initial HTML with
                  descriptive alt text for SEO-friendly page structure.
                </figcaption>
              </figure>
            </div>
          </header>

          <div className="mt-12">
            <div className="space-y-12">
              {isToolPage ? (
                <section
                  aria-labelledby="editor-preview"
                  className="rounded-2xl border border-slate-200 p-8"
                >
                  <h2
                    id="editor-preview"
                    className="text-2xl font-semibold tracking-tight text-slate-950"
                  >
                    Online Editor Preview
                  </h2>
                  <div className="mt-6">
                    <BubbleEditor pagePath={page.path} heading={page.h1} />
                  </div>
                </section>
              ) : null}

              {(isHomePage || isArticlePage) ? page.sections.map((section, index) => (
                <section
                  key={section.id}
                  id={section.id}
                  aria-labelledby={section.id}
                  className={`rounded-2xl border p-8 ${
                    index % 2 === 0
                      ? "border-slate-200 bg-white"
                      : "border-sky-100 bg-sky-50/50"
                  }`}
                >
                  <h2
                    id={section.id}
                    className="text-2xl font-semibold tracking-tight text-slate-950"
                  >
                    {section.title}
                  </h2>
                  <div className="mt-4 space-y-4 text-base leading-7 text-slate-700">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              )) : null}

              {isHomePage ? (
                <section
                  aria-labelledby="page-faq"
                  className="rounded-2xl border border-slate-200 p-8"
                >
                  <h2
                    id="page-faq"
                    className="text-2xl font-semibold tracking-tight text-slate-950"
                  >
                    Frequently Asked Questions
                  </h2>
                  <div className="mt-6 space-y-6">
                    {page.faqs.map((faq) => (
                      <div key={faq.question}>
                        <h3 className="text-lg font-semibold text-slate-900">
                          {faq.question}
                        </h3>
                        <p className="mt-2 text-base leading-7 text-slate-700">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null}
            </div>
          </div>
        </article>
      </PageContainer>
    </main>
  );
}
