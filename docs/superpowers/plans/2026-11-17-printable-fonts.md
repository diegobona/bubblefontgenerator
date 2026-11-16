# Printable letters and font downloads implementation plan

> **For agentic workers:** Use superpowers:subagent-driven-development for bounded implementation and review. Preserve all existing uncommitted changes.

**Goal:** Finish six Unicode copy styles and font preview/TTF download, add /printable-bubble-letters/, and deploy the verified static export to the existing production site.

**Architecture:** Retain Next.js static export and current dark design. Render printable text as font outlines shared by SVG preview and vector PDF, so printed shapes do not depend on installed fonts. Keep SEO page content server rendered and heavy PDF code loaded on demand.

**Tech Stack:** Next.js 16, React 19, TypeScript, opentype.js, pdf-lib, Cloudflare Pages.

## Task 1: Existing Unicode panel
- [ ] Extract pure conversion to lib/unicode-text.ts and add behavioral tests for six styles, case, digits, punctuation, emoji and non-Latin text.
- [ ] Retain existing copy feedback and test actual clipboard in Edge.

## Task 2: Font previews and downloads
- [ ] Add /bubble-letters-font/ with live custom previews and direct TTF download links using existing local library; include font source and accompanying licenses.
- [ ] Add TTF links beside existing PNG previews without losing current edits.
- [ ] Verify files, metadata, preview loading and downloads. Own files: components/editor/font-library-browser.tsx, app/bubble-letters-font/page.tsx, lib/font-downloads.ts, public/fonts/licenses/*, scripts/fetch-font-licenses.mjs, tests/font-downloads.test.ts. Root handles routes/nav/sitemap/test runner.

## Task 3: Printable page
- [ ] Add tests/printable-letters.test.ts for actual path bounds, line wrapping, pagination, blank input, unsupported characters and both paper sizes. Run failing tests first.
- [ ] Implement lib/printable-letters.ts with font path layout; lib/printable-pdf.ts with vector PDF export.
- [ ] Implement components/editor/printable-editor.tsx and isolated print stylesheet. Options: custom text / alphabet, upper/lowercase presets, sheet or one character per page, three bubble fonts, outline/coloring/tracing styles, font size and stroke, A4/Letter.
- [ ] Add app/printable-bubble-letters/page.tsx with unique title, canonical, H1, practical teacher/parent copy and matching FAQ schema.
- [ ] Wire routes, nav, footer, homepage links and sitemap for both new pages.

## Task 4: Verify and release
- [ ] Run npm test, npm run lint, npm run build and inspect generated metadata.
- [ ] Review requirements and code. In Edge verify copy, font download, responsive layout, printable preview, PDF download and print dialog. Close task tabs afterward.
- [ ] Identify existing Cloudflare project and production branch, deploy out, verify public homepage and both new routes plus PDF/font assets, save receipt locally.
