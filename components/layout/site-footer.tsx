import { PageContainer } from "./page-container";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-slate-950/70">
      <PageContainer>
        <div className="py-8">
          <p className="text-sm text-slate-500">Bubble Font Generator</p>
        </div>
      </PageContainer>
    </footer>
  );
}
