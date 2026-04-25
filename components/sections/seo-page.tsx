import Link from "next/link";
import Image from "next/image";

import { BubbleEditor } from "@/components/editor/bubble-editor";
import { PageContainer } from "@/components/layout/page-container";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-jsonld";
import { FaqJsonLd } from "@/components/seo/faq-jsonld";
import {
  HOME_VISIBLE_FAQ_COUNT,
  HOME_VISIBLE_SECTION_COUNT,
  HOME_VISIBLE_STYLE_IDEA_COUNT,
} from "@/lib/home-seo-layout";
import { homeStyleIdeas, type PageDocument } from "@/lib/page-data";
import { getCanonicalUrl } from "@/lib/metadata";
import { getPagePresentation } from "@/lib/page-presentation";
import { routes } from "@/lib/routes";
import { homePreviewImage } from "@/lib/seo-assets";

type SeoPageProps = {
  page: PageDocument;
};

const homeGuideLinks = [
  {
    href: routes.bubbleLetterFontGenerator,
    title: "Bubble Letter Font Generator",
  },
  {
    href: routes.bubbleFontGeneratorPng,
    title: "Bubble Font Generator PNG",
  },
  {
    href: routes.transparentBubbleFontGenerator,
    title: "Transparent Bubble Font Generator",
  },
  {
    href: routes.bubbleGraffitiFontGenerator,
    title: "Bubble Graffiti Font Generator",
  },
  {
    href: routes.howToMakeBubbleLetters,
    title: "How to Make Bubble Letters",
  },
];

const homeTrustItems = [
  "Real bubble fonts",
  "Download PNG",
  "Transparent background",
  "Free online",
];
const homeFaqsTitle = "Bubble Font Generator FAQ";

export function SeoPage({ page }: SeoPageProps) {
  const isHomePage = page.path === routes.home;
  const presentation = getPagePresentation(page.path, page.h1);
  const isToolPage = presentation.kind === "tool";
  const isArticlePage = presentation.kind === "article";
  const hasFaqs = page.faqs.length > 0;
  const hasRelatedLinks = page.relatedLinks.length > 0;
  const collapsedHomeSections = page.sections.slice(HOME_VISIBLE_SECTION_COUNT);
  const collapsedHomeStyleIdeas = homeStyleIdeas.slice(HOME_VISIBLE_STYLE_IDEA_COUNT);
  const collapsedHomeFaqs = page.faqs.slice(HOME_VISIBLE_FAQ_COUNT);
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
    <main className="flex-1 bg-transparent">
      {hasFaqs ? <FaqJsonLd faqs={page.faqs} /> : null}
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <PageContainer>
        <article className={isHomePage ? "py-8 sm:py-10" : "py-12 sm:py-16"}>
          {isHomePage ? (
            <header className="mb-5">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                {page.h1}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                {page.intro}
              </p>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {homeTrustItems.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3.5 py-1.5 text-sm text-cyan-100"
                  >
                    {item}
                  </span>
                ))}
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

          <div className={isToolPage || isHomePage ? "mt-4" : "mt-12"}>
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
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                    </section>
                  ))}
                </article>
              ) : null}

              {isToolPage ? (
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

              {isHomePage ? (
                <section
                  aria-labelledby="home-seo-support"
                  className="max-w-4xl border-t border-white/10 pt-8"
                >
                  <details className="group rounded-2xl border border-white/10 bg-[rgba(24,20,48,0.58)]">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-slate-100 transition hover:text-white [&::-webkit-details-marker]:hidden">
                      <span id="home-seo-support">About this bubble font generator</span>
                      <span className="text-xs font-medium text-cyan-200 transition group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <div className="space-y-6 border-t border-white/10 px-5 py-5">
                      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_260px]">
                        {collapsedHomeSections.length > 0 ? (
                          <div className="grid gap-4 text-sm leading-6 text-slate-300 md:grid-cols-2">
                            {collapsedHomeSections.map((section) => (
                              <div key={section.id}>
                                <h3 className="font-semibold text-slate-100">
                                  {section.title}
                                </h3>
                                <p className="mt-1">{section.paragraphs[0]}</p>
                              </div>
                            ))}
                          </div>
                        ) : null}
                        <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/35">
                          <Image
                            src={homePreviewImage.src}
                            alt={homePreviewImage.alt}
                            width={homePreviewImage.width}
                            height={homePreviewImage.height}
                            className="h-auto w-full"
                          />
                        </div>
                      </div>

                      {collapsedHomeStyleIdeas.length > 0 ? (
                        <div>
                          <h3 className="text-sm font-semibold text-slate-100">
                            Bubble font style ideas
                          </h3>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {collapsedHomeStyleIdeas.map((idea) => (
                              <span
                                key={idea.label}
                                className="rounded-full border border-cyan-300/15 bg-cyan-300/10 px-3 py-1.5 text-xs text-cyan-100"
                              >
                                {idea.label}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : null}

                      {collapsedHomeFaqs.length > 0 ? (
                        <div>
                          <h3 className="text-sm font-semibold text-slate-100">
                            {homeFaqsTitle}
                          </h3>
                          <div className="mt-3 divide-y divide-white/10 rounded-2xl border border-white/10 bg-[rgba(12,10,28,0.32)]">
                            {collapsedHomeFaqs.map((faq) => (
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
                        </div>
                      ) : null}

                      <div>
                        <h3 className="text-sm font-semibold text-slate-100">
                          Related bubble font generators and guides
                        </h3>
                        <div className="mt-3 flex flex-wrap gap-3">
                          {homeGuideLinks.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="inline-flex items-center rounded-full border border-white/10 bg-[rgba(34,27,63,0.62)] px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-300/25 hover:bg-[rgba(43,34,79,0.86)] hover:text-white"
                            >
                              {item.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </details>
                </section>
              ) : null}

              {!isHomePage ? (
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
