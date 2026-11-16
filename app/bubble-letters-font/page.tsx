import Link from "next/link";

import { FontLibraryBrowser } from "@/components/editor/font-library-browser";
import { PageContainer } from "@/components/layout/page-container";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-jsonld";
import { bubbleFontLibrary } from "@/lib/font-library";
import { buildMetadata, getCanonicalUrl } from "@/lib/metadata";
import { routes } from "@/lib/routes";

export const metadata = buildMetadata({
  title: "Bubble Letters Font — Free Previews & TTF Downloads",
  description: `Find your bubble letters font in ${bubbleFontLibrary.length} free fonts. Preview your own text, compare rounded and outline styles, and download TTF files with their licenses.`,
  path: routes.bubbleLettersFont,
});

export default function BubbleLettersFontPage() {
  return (
    <main className="flex-1">
      <BreadcrumbJsonLd items={[{ name: "Home", item: getCanonicalUrl(routes.home) }, { name: "Bubble Letters Font", item: getCanonicalUrl(routes.bubbleLettersFont) }]} />
      <PageContainer size="wide">
        <article className="py-10 sm:py-14">
          <header className="mb-8 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">{bubbleFontLibrary.length} free font downloads</p>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Bubble Letters Font</h1>
            <p className="mt-4 text-base leading-7 text-slate-300">Find a bubble letters font for a birthday banner, classroom heading, sticker or logo. Type your words to compare rounded, chunky, cartoon and outline fonts, then download a TTF to use in your own design app.</p>
          </header>
          <FontLibraryBrowser />
          <div className="mt-12 grid gap-8 border-t border-white/10 pt-10 lg:grid-cols-2">
            <section>
              <h2 className="text-2xl font-semibold text-white">How to use a downloaded font</h2>
              <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-7 text-slate-300">
                <li>Preview your text and choose Download TTF. Save the accompanying License file too.</li>
                <li>Open the TTF file on your computer and choose Install. Reopen your design app if the font does not appear immediately.</li>
                <li>Select the font by its family name in an app that supports installed fonts. For an online design tool, check whether your account supports custom font uploads.</li>
              </ol>
              <p className="mt-4 text-sm leading-7 text-slate-300">A TTF contains the letter shapes. Colors, shadows and sticker edges are added in your design app. To create a styled image directly, use the <Link href={routes.home} className="text-cyan-200 underline underline-offset-4">bubble font generator</Link>.</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-white">Choose a font for your project</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">Rubik Bubbles gives short headings a puffy shape, while Bubblegum Sans keeps longer phrases easy to read. Try an outline font for a hollow letter effect or a chunky font for a bold banner. Preview the actual letters and numbers you need, because each font has its own character set.</p>
              <p className="mt-4 text-sm leading-7 text-slate-300">Each font includes its own open source license and a link to the original Google Fonts listing. Read the included terms for your intended use, especially if you modify or redistribute the font files.</p>
              <p className="mt-4 text-sm leading-7 text-slate-300">For ready-to-print worksheets, names and coloring pages, create <Link href={routes.printableBubbleLetters} className="text-cyan-200 underline underline-offset-4">printable bubble letters</Link> with a paper-size preview and PDF download.</p>
            </section>
          </div>
        </article>
      </PageContainer>
    </main>
  );
}
