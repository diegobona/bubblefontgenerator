import { PageContainer } from "./page-container";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-slate-950/70">
      <PageContainer>
        <div className="py-12">
          <section aria-labelledby="footer-brand" className="max-w-xl">
            <h2
              id="footer-brand"
              className="text-base font-semibold text-slate-100"
            >
              Bubble Font Generator
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              A focused bubble font generator project built to serve one topic
              cluster well: bubble text, bubble letters, bubble writing, and
              bubble graffiti.
            </p>
          </section>
        </div>
      </PageContainer>
    </footer>
  );
}
