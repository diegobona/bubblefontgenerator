"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PageContainer } from "./page-container";
import { routes } from "@/lib/routes";

// The link lists remain server components. Only their home duplication is omitted.
export function SiteFooterFrame({ children }: { children: ReactNode }) {
  const isHome = usePathname() === routes.home;
  return (
    <footer className="mt-16 border-t border-white/8 bg-[#120f28]/70">
      <PageContainer>
        <div className={isHome ? "home-footer-content" : "grid gap-10 py-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)_minmax(0,0.9fr)]"}>
          <div>
            <Link href={routes.home} className="text-lg font-semibold tracking-tight text-slate-50">
              Bubble Font Generator
            </Link>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
              Use the main Bubble Font Generator to type your text, compare multiple styles, and
              download a PNG in seconds.
            </p>
          </div>
          {isHome ? null : children}
        </div>
      </PageContainer>
    </footer>
  );
}
