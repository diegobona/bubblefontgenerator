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

const homeGuideLinks = [
  {
    href: routes.whatIsBubbleFont,
    title: "What Is Bubble Font?",
  },
  {
    href: routes.howToMakeBubbleLetters,
    title: "How to Make Bubble Letters",
  },
  {
    href: routes.freeBubbleFontGenerator,
    title: "Free Bubble Font Generator Guide",
  },
];

const homeTrustItems = ["Free to use", "PNG export", "Fast preview"];

export function SeoPage({ page }: SeoPageProps) {
  const isHomePage = page.path === routes.home;
  const presentation = getPagePresentation(page.path, page.h1);
  const isToolPage = presentation.kind === "tool";
  const isArticlePage = presentation.kind === "article";
  const hasFaqs = page.faqs.length > 0;
  const hasRelatedLinks = page.relatedLinks.length > 0;
  const visibleToolSections = page.sections.slice(0, 2);
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
        <article className="py-12 sm:py-16">
          {isHomePage ? (
            <header className="mb-8">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                {page.h1}
              </h1>
              <div className="mt-4 flex flex-wrap gap-3">
                {homeTrustItems.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100"
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
              <p className={isToolPage ? "sr-only" : "mt-3 max-w-3xl text-sm leading-6 text-slate-400 sm:text-base"}>
                {page.intro}
              </p>
            </header>
          ) : null}

          <div className={isToolPage || isHomePage ? "mt-8" : "mt-12"}>
            <div className="space-y-12">
              {isToolPage || isHomePage ? (
                <section id={isHomePage ? "main-editor" : undefined} aria-label="Bubble editor">
                  <BubbleEditor pagePath={isHomePage ? routes.home : page.path} heading={page.h1} />
                </section>
              ) : null}

              {isToolPage ? (
                <section className="sr-only">
                  {visibleToolSections.map((section) => (
                    <section
                      key={section.id}
                      id={section.id}
                      aria-labelledby={section.id}
                    >
                      <h2 id={section.id}>{section.title}</h2>
                      <div>
                        <p>{section.paragraphs[0]}</p>
                      </div>
                    </section>
                  ))}
                </section>
              ) : null}

              {isHomePage ? (
                <>
                  <section
                    aria-labelledby="home-guides"
                    className="rounded-3xl border border-white/10 bg-[rgba(24,20,48,0.76)] p-6 shadow-xl shadow-[#080812]/20"
                  >
                    <h2
                      id="home-guides"
                      className="text-xl font-semibold tracking-tight text-slate-50"
                    >
                      Quick Guides
                    </h2>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {homeGuideLinks.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="inline-flex items-center rounded-full border border-white/10 bg-[rgba(34,27,63,0.78)] px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300/25 hover:bg-[rgba(43,34,79,0.92)] hover:text-white"
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  </section>

                  <section className="sr-only">
                    {page.sections.map((section) => (
                      <section key={section.id} id={section.id} aria-labelledby={section.id}>
                        <h2 id={section.id}>{section.title}</h2>
                        <div>
                          <p>{section.paragraphs[0]}</p>
                        </div>
                      </section>
                    ))}
                  </section>
                </>
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

              {hasFaqs && !isHomePage ? (
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

              {hasRelatedLinks ? (
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
                  aria-labelledby="page-faq"
                  className="sr-only"
                >
                  <h2
                    id="page-faq"
                  >
                    Frequently Asked Questions
                  </h2>
                  <div>
                    {page.faqs.map((faq) => (
                      <div key={faq.question}>
                        <h3>
                          {faq.question}
                        </h3>
                        <p>
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
