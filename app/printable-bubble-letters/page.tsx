import Link from "next/link";
import { PrintableEditor } from "@/components/editor/printable-editor";
import { PageContainer } from "@/components/layout/page-container";
import { FaqJsonLd } from "@/components/seo/faq-jsonld";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-jsonld";
import { buildMetadata, getCanonicalUrl } from "@/lib/metadata";
import { routes } from "@/lib/routes";

export const metadata = buildMetadata({
  title: "Printable Bubble Letters – Free Alphabet & PDF Templates",
  description: "Make free printable bubble letters for names, banners and coloring. Choose uppercase or lowercase, outline or tracing, then print or download an A4 or Letter PDF.",
  path: routes.printableBubbleLetters,
});

const faqs = [
  { question: "How do I print bubble letters?", answer: "Enter your text or choose A–Z, a–z or 0–9. Pick a font, template style and paper size, then select Print templates. Use actual size or 100% scale and turn off browser headers and footers. Only the white letter templates print." },
  { question: "Can I download printable bubble letters as a PDF?", answer: "Yes. Download PDF saves your current templates as a free PDF with one page for each preview sheet. The letters are vector outlines, so they stay sharp when enlarged and do not require you to install a font." },
  { question: "Are there bubble letters for coloring?", answer: "Choose Coloring page for hollow white letters with a bold black outline. You can adjust the outline thickness and letter size. The open letter shapes are ready for crayons, markers or decorating with patterns." },
  { question: "Can I print one large bubble letter per page?", answer: "Yes. Select One large character per page. Each non-space character fills its own page with a safety margin, which works well for classroom displays, birthday banners and letter cutouts." },
  { question: "Can I make lowercase letters and name templates?", answer: "Use the a–z preset for the lowercase alphabet, or type a name exactly as you want it to appear. Uppercase, lowercase, numbers and punctuation are supported when the selected font includes them. The tool flags unsupported characters before you download." },
  { question: "What paper sizes can I use?", answer: "Choose A4 (210 × 297 mm) or US Letter (8.5 × 11 inches), both in portrait orientation. The preview and PDF use the same size. Match your printer settings to the selected paper to avoid unwanted scaling." },
];

export default function PrintableBubbleLettersPage() {
  return <main className="printable-page flex-1">
    <FaqJsonLd faqs={faqs} />
    <BreadcrumbJsonLd items={[{ name: "Home", item: getCanonicalUrl(routes.home) }, { name: "Printable Bubble Letters", item: getCanonicalUrl(routes.printableBubbleLetters) }]} />
    <PageContainer size="wide">
      <div className="no-print pb-8 pt-10 sm:pt-14">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-cyan-200">Make it. Print it. Color it.</p>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Printable Bubble Letters</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">Turn names, the alphabet or a birthday message into ready-to-print bubble letter templates. Choose a clean outline, a coloring page or a tracing sheet, then print or download a free PDF.</p>
        <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-300">{["Free PDF download", "Uppercase & lowercase", "A4 & US Letter", "No sign-up"].map((label) => <span key={label} className="rounded-full border border-white/10 px-3 py-1.5">{label}</span>)}</div>
      </div>
      <PrintableEditor />
      <div className="no-print mt-16 max-w-4xl space-y-12 text-slate-300">
        <section>
          <h2 className="text-2xl font-semibold text-white">Make your printable alphabet in three steps</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 leading-7">
            <li><strong className="text-white">Choose your letters.</strong> Start with A–Z, a–z or numbers, or type a child’s name. Add line breaks to separate words for a sign.</li>
            <li><strong className="text-white">Set up your template.</strong> Choose a font, outline thickness and paper size. Use a sheet for short words or one character per page for a large banner.</li>
            <li><strong className="text-white">Print or save.</strong> Download a PDF to reuse later, or print the templates now. The PDF includes every preview page without navigation or website text.</li>
          </ol>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-white">Bubble letter coloring pages for home and school</h2>
          <p className="mt-4 leading-7">Use a name template for a desk label, let children fill each letter with a different pattern, or print an alphabet for a classroom display. The coloring style leaves the letter interiors white and makes the border thicker. For tracing practice, switch to the dashed outline and use a larger letter size so there is room to follow each curve.</p>
          <p className="mt-4 leading-7">Rubik Bubbles has playful rounded shapes, Chewy gives words a hand-drawn look, and Bubblegum Sans offers simpler forms. Check the preview for the letter shapes your activity needs. Teachers introducing handwriting may prefer a familiar letterform over a decorative one.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-white">Large letter templates for banners and cutouts</h2>
          <p className="mt-4 leading-7">Select one character per page to turn a greeting into a banner. Every letter fits inside a half-inch safety margin; spaces are skipped. Print on cardstock for sturdier cutouts, and leave room outside the outline when cutting. For word sheets, long lines wrap automatically onto additional lines and pages.</p>
          <p className="mt-4 leading-7">Use 100% or actual-size printing and match the paper setting to A4 or Letter. Turn off headers and footers in the print dialog. Try one page first before printing a full alphabet.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-white">Frequently asked questions</h2>
          <div className="mt-5 space-y-6">{faqs.map((faq) => <div key={faq.question}><h3 className="font-semibold text-white">{faq.question}</h3><p className="mt-2 leading-7">{faq.answer}</p></div>)}</div>
        </section>
        <nav aria-label="More bubble letter tools" className="flex flex-wrap gap-4 text-cyan-200">
          <Link href={routes.home} className="underline underline-offset-4">Copy bubble text or create a PNG</Link>
          <Link href={routes.bubbleLettersFont} className="underline underline-offset-4">Preview and download bubble fonts</Link>
          <Link href={routes.bubbleLetterFontGenerator} className="underline underline-offset-4">Bubble letter generator</Link>
        </nav>
      </div>
    </PageContainer>
  </main>;
}
