import Link from "next/link";
import { HomeContent, homeFaqItems } from "@/components/sections/home-content";
import { ExploreLinks } from "@/components/sections/explore-links";

import { BubbleEditor } from "@/components/editor/bubble-editor";
import { PageContainer } from "@/components/layout/page-container";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-jsonld";
import { FaqJsonLd } from "@/components/seo/faq-jsonld";
import { type PageDocument } from "@/lib/page-data";
import { getCanonicalUrl } from "@/lib/metadata";
import { getPagePresentation } from "@/lib/page-presentation";
import { routes } from "@/lib/routes";

type SeoPageProps = {
  page: PageDocument;
};

function linkedText(text: string, anchor: string, href: string) {
  const index = text.indexOf(anchor);
  if (index < 0) return text;
  return <>{text.slice(0, index)}<Link href={href} className="text-cyan-200 underline underline-offset-4 hover:text-white">{anchor}</Link>{text.slice(index + anchor.length)}</>;
}

function letterParagraph(text: string) {
  if (text.includes("transparent bubble letters")) {
    return linkedText(text, "transparent bubble letters", routes.transparentBubbleFontGenerator);
  }
  return linkedText(text, "bubble font generator", routes.home);
}

export function SeoPage({ page }: SeoPageProps) {
  const isHomePage = page.path === routes.home;
  const isLetterPage = page.path === routes.bubbleLetterFontGenerator;
  const presentation = getPagePresentation(page.path, page.h1);
  const isToolPage = presentation.kind === "tool";
  const isArticlePage = presentation.kind === "article";
  const hasFaqs = page.faqs.length > 0;
  const hasRelatedLinks = page.relatedLinks.length > 0;
  const visibleRelatedLinks = page.relatedLinks.slice(0, isHomePage ? 4 : 3);
  const breadcrumbItems = isHomePage
    ? [{ name: "Home", item: getCanonicalUrl(routes.home) }]
    : isArticlePage
      ? [
          { name: "Home", item: getCanonicalUrl(routes.home) },
          { name: "Articles", item: getCanonicalUrl(routes.articles) },
          { name: page.h1, item: getCanonicalUrl(page.path) },
        ]
      : [
          { name: "Home", item: getCanonicalUrl(routes.home) },
          { name: page.h1, item: getCanonicalUrl(page.path) },
        ];

  return (
    <main data-home-page={isHomePage ? "true" : undefined} className="flex-1 bg-transparent">
      {hasFaqs ? <FaqJsonLd faqs={isHomePage ? homeFaqItems : page.faqs} /> : null}
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <PageContainer size={isHomePage || isToolPage ? "wide" : "default"}>
        <article className={isHomePage ? "py-6 sm:py-8" : "py-12 sm:py-16"}>
          {isHomePage ? (
            <header
              data-home-hero-header="true"
              className="mb-3 gap-6 xl:flex xl:items-start xl:justify-between"
            >
              <div className="min-w-0 flex-1">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  {page.h1}
                </h1>
                <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-300 sm:text-base">
                  {page.intro}
                </p>
              </div>
            </header>
          ) : isToolPage || isArticlePage ? (
            <header className="mb-8">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                {page.h1}
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400 sm:text-base">
                {page.intro}
              </p>
            </header>
          ) : null}

          <div className={isToolPage || isHomePage ? "mt-2" : "mt-12"}>
            <div className="space-y-12">
              {isToolPage || isHomePage ? (
                <section id={isHomePage ? "main-editor" : undefined} aria-label="Bubble editor">
                  <BubbleEditor
                    key={page.path}
                    pagePath={isHomePage ? routes.home : page.path}
                    heading={page.h1}
                  />
                </section>
              ) : null}

              {isArticlePage ? (
                <article className="max-w-4xl space-y-10">
                  {page.sections.map((section) => (
                    <section
                      key={section.id}
                      id={section.id}
                      aria-labelledby={section.id}
                      className="space-y-3"
                    >
                      <h2
                        id={section.id}
                        className="text-2xl font-semibold tracking-tight text-slate-50"
                      >
                        {section.title}
                      </h2>
                      <div className="space-y-3 text-base leading-7 text-slate-300">
                        {section.paragraphs.map((paragraph) => (
                          <p key={paragraph}>{page.path === routes.bubbleFontGeneratorVsBubbleLetterFontGenerator && section.id === "which-one-to-use"
                            ? <>{paragraph} Try the {<Link href={routes.bubbleLetterFontGenerator} className="text-cyan-200 underline underline-offset-4 hover:text-white">bubble letter font generator</Link>} for names and rounded letter artwork.</>
                            : paragraph}</p>
                        ))}
                      </div>
                    </section>
                  ))}
                </article>
              ) : null}

              {isLetterPage ? (
                <div data-letter-content="true" className="max-w-4xl space-y-10 text-slate-300">
                  {page.sections.map((section) => (
                    <section key={section.id} aria-labelledby={section.id} className="space-y-4">
                      <h2 id={section.id} className="text-2xl font-semibold text-white">{section.title}</h2>
                      {section.paragraphs.map((paragraph) => <p key={paragraph} className="leading-7">{letterParagraph(paragraph)}</p>)}
                    </section>
                  ))}
                  <section aria-labelledby="letter-faq" className="space-y-5">
                    <h2 id="letter-faq" className="text-2xl font-semibold text-white">Frequently Asked Questions</h2>
                    {page.faqs.map((faq) => <div key={faq.question} data-letter-faq="true">
                      <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                      <p className="mt-2 leading-7">{faq.answer}</p>
                    </div>)}
                  </section>
                </div>
              ) : null}

              {isToolPage && !isLetterPage ? (
                <section
                  aria-labelledby="tool-seo-support"
                  className="max-w-4xl"
                >
                  <details className="group rounded-2xl border border-white/10 bg-[rgba(24,20,48,0.58)]">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-slate-100 transition hover:text-white [&::-webkit-details-marker]:hidden">
                      <span id="tool-seo-support">About this {page.h1}</span>
                      <span className="text-xs font-medium text-cyan-200 transition group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <div className="space-y-5 border-t border-white/10 px-5 py-5">
                      <div className="grid gap-4 text-sm leading-6 text-slate-300 md:grid-cols-2">
                        {page.sections.slice(0, 2).map((section) => (
                          <div key={section.id}>
                            <h2 className="font-semibold text-slate-100">
                              {section.title}
                            </h2>
                            <p className="mt-1">{section.paragraphs[0]}</p>
                          </div>
                        ))}
                      </div>

                      {hasFaqs ? (
                        <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-[rgba(12,10,28,0.32)]">
                          {page.faqs.map((faq) => (
                            <details key={faq.question} className="group px-4 py-3">
                              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-slate-100 transition hover:text-white [&::-webkit-details-marker]:hidden">
                                <span>{faq.question}</span>
                                <span className="text-xs font-medium text-cyan-200 transition group-open:rotate-45">
                                  +
                                </span>
                              </summary>
                              <p className="mt-2 text-sm leading-6 text-slate-300">{faq.answer}</p>
                            </details>
                          ))}
                        </div>
                      ) : null}

                      {hasRelatedLinks ? (
                        <div className="flex flex-wrap gap-3">
                          {visibleRelatedLinks.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              className="inline-flex items-center rounded-full border border-white/10 bg-[rgba(34,27,63,0.62)] px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-300/25 hover:bg-[rgba(43,34,79,0.86)] hover:text-white"
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </details>
                </section>
              ) : null}

              {hasFaqs && !isHomePage && !isToolPage ? (
                <section
                  aria-labelledby="page-faq"
                  className={
                    isToolPage || isArticlePage
                      ? "sr-only"
                      : "max-w-4xl border-t border-white/10 pt-8"
                  }
                >
                  <h2
                    id="page-faq"
                    className={
                      isToolPage || isArticlePage
                        ? ""
                        : "text-2xl font-semibold tracking-tight text-slate-50"
                    }
                  >
                    Frequently Asked Questions
                  </h2>
                  <div className={isToolPage || isArticlePage ? "" : "mt-5 space-y-5"}>
                    {page.faqs.map((faq) => (
                      <div key={faq.question}>
                        <h3
                          className={
                            isToolPage || isArticlePage
                              ? ""
                              : "text-lg font-semibold text-slate-100"
                          }
                        >
                          {faq.question}
                        </h3>
                        <p
                          className={
                            isToolPage || isArticlePage
                              ? ""
                              : "mt-2 text-base leading-7 text-slate-300"
                          }
                        >
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null}

              {hasRelatedLinks && !isHomePage && !isToolPage ? (
                <section
                  aria-labelledby="related-pages"
                  className={
                    isHomePage || isToolPage
                      ? "sr-only"
                      : "max-w-4xl border-t border-white/10 pt-8"
                  }
                >
                  <div className="flex items-center justify-between gap-4">
                    <h2
                      id="related-pages"
                      className={
                        isHomePage || isToolPage
                          ? ""
                          : "text-lg font-semibold tracking-tight text-slate-50"
                      }
                    >
                      Explore More
                    </h2>
                  </div>
                  <div
                    className={
                      isHomePage || isToolPage
                        ? ""
                        : "mt-4 flex flex-wrap gap-3"
                    }
                  >
                    {visibleRelatedLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={isHomePage || isToolPage ? "" : "inline-flex items-center rounded-full border border-white/10 bg-[rgba(34,27,63,0.78)] px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300/25 hover:bg-[rgba(43,34,79,0.92)] hover:text-white"}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </section>
              ) : null}

              {isHomePage ? <>
                <div className="home-entry-cards">
                  <a href={routes.printableBubbleLetters}>
                    <span className="home-entry-icon" aria-hidden="true">Aa</span>
                    <div><h2>Printable Templates</h2><p>Bubble letters and numbers to print, color, and use.</p></div>
                    <span aria-hidden="true">↗</span>
                  </a>
                  <a href={routes.bubbleLettersFont}>
                    <span className="home-entry-icon" aria-hidden="true">Tt</span>
                    <div><h2>Font Downloads (TTF)</h2><p>Download bubble fonts (TTF) to install and use anywhere.</p></div>
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
                <HomeContent />
              </> : null}

              {isHomePage || isLetterPage ? <ExploreLinks home={isHomePage} /> : null}

              {!isHomePage && !isLetterPage ? (
                <section className="max-w-4xl rounded-3xl border border-cyan-300/15 bg-[rgba(24,20,48,0.76)] p-6 shadow-xl shadow-[#080812]/20">
                  <h2 className="text-xl font-semibold tracking-tight text-slate-50">
                    Start With The Main Bubble Font Generator
                  </h2>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                    This page supports the broader bubble font topic, but the homepage is the main
                    Bubble Font Generator destination for quickly creating and downloading bubble
                    text.
                  </p>
                  <Link
                    href={`${routes.home}#main-editor`}
                    className="mt-5 inline-flex items-center rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                  >
                    Open The Bubble Font Generator
                  </Link>
                </section>
              ) : null}
            </div>
          </div>
        </article>
      </PageContainer>
    </main>
  );
}
