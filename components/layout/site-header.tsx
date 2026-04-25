"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { PageContainer } from "./page-container";
import { primaryNavLinks, siteConfig } from "@/lib/site";
import { routes } from "@/lib/routes";

const articlePaths = new Set([
  routes.whatIsBubbleFont,
  routes.howToMakeBubbleLetters,
  routes.bubbleFontGeneratorVsBubbleLetterFontGenerator,
  routes.freeBubbleFontGenerator,
]);

function normalizePath(path: string) {
  if (path === "/") {
    return path;
  }

  return path.endsWith("/") ? path.slice(0, -1) : path;
}

export function SiteHeader() {
  const pathname = normalizePath(usePathname());

  const isActiveLink = (href: string) => {
    const normalizedHref = normalizePath(href);

    if (normalizedHref === routes.home) {
      return pathname === routes.home;
    }

    if (normalizedHref === normalizePath(routes.articles)) {
      return (
        pathname === normalizedHref ||
        Array.from(articlePaths).some(
          (articlePath) => pathname === normalizePath(articlePath),
        )
      );
    }

    return pathname === normalizedHref;
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-[#120f28]/78 backdrop-blur-xl">
      <PageContainer>
        <div className="flex min-h-16 flex-wrap items-center justify-between gap-6 py-3">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-slate-50"
            aria-label="Bubble Font Generator homepage"
          >
            {siteConfig.brandName}
          </Link>
          <nav
            aria-label="Primary"
            className="flex flex-wrap items-center gap-3 text-sm"
          >
            {primaryNavLinks.map((link) => {
              const isActive = isActiveLink(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={
                    isActive
                      ? "rounded-full border border-cyan-300/25 bg-cyan-300/12 px-3 py-2 text-cyan-100"
                      : "rounded-full border border-transparent px-3 py-2 text-slate-300 transition hover:border-cyan-300/20 hover:bg-cyan-300/10 hover:text-cyan-100"
                  }
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </PageContainer>
    </header>
  );
}
