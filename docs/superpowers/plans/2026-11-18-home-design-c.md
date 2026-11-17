# Homepage Design C Implementation Plan

> **For agentic workers:** Use the existing authorized implementation workflow, execute these tasks in this session, and verify the production result. Review this plan before implementation.

**Goal:** Redesign only `/` with the confirmed graphite/lime C palette and the attachment's toolbar → Copy & Paste → font grid → entry cards → unchanged editorial content/FAQ → discovery lists ordering.

**Architecture:** Keep existing editor state, SVG/export, alignment/drag and AI behavior. Recompose shared JSX into a homepage toolbar while preserving the existing layout on other routes. Scope CSS tokens and typography to a server-rendered homepage marker. Keep editorial and discovery content server components; a small pathname-aware footer shell omits duplicate homepage discovery lists during initial rendering.

**Tech Stack:** Next.js 16.2.4 static export, React 19, Tailwind 4, existing native pointer events. No npm dependencies.

## Task 1 — Baseline and scope
- [x] Read attachment and local Next.js server/client and font documentation.
- [x] Confirm conflicting directions: user explicitly chose C dark/lime visuals with attachment layout.
- [x] Save previous production HTML to `.qa/redesign-c/before-home.html`.
- [x] Run cached Lighthouse CLI with Microsoft Edge, mobile defaults, production baseline. Save JSON and actual errors if collection fails.
- [x] Record SEO, editorial text, five FAQ question/answers and JSON-LD, discovery hrefs, exact phrase/variant density using one reproducible parser.

## Task 2 — Homepage visual structure
Files: `app/page.tsx`, new `app/home.css`, `components/sections/seo-page.tsx`, `components/layout/site-header.tsx`, `components/layout/site-footer.tsx`, new `components/layout/site-footer-frame.tsx`, `components/sections/explore-links.tsx`.
- [x] Load Nunito 600/700/800 with swap and system-ui/sans-serif fallback only on home. Apply a home marker and scoped CSS, no change to other route styling or metadata.
- [x] Home nav: existing text logo becomes BubbleFont; Generator, Printable Letters, Fonts & TTF, Guides point to specified existing destinations.
- [x] Center exact existing H1/intro. Remove decorative trust chips from home hero.
- [x] Add the two specified entry cards after the editor. Keep `HomeContent` and FAQ code/content untouched.
- [x] Add home-only discovery card headers with real 7+4 existing links/descriptions. One H2 per group, `#guides` target. Footer preserves branding/copy and omits home duplicate lists, while all other pages retain their current footer.

## Task 3 — Toolbar and results
Files: `components/editor/bubble-editor.tsx`, `components/editor/unicode-copy-panel.tsx`, `components/editor/bubble-editor.css`.
- [x] Reuse existing JSX/handlers for AI and advanced fields; home-only text default becomes `Bubble Magic`. Keep export, font limit, copy transforms, drag algorithms and disabled conditions intact.
- [x] Home toolbar: text, color/background, size select, 44px alignment buttons, native Advanced disclosure, AI disclosure. Mobile text spans two-column grid. Expanded AI renders directly below toolbar, no scrolling/jump behavior.
- [x] Copy panel precedes results in DOM with six cards, server-rendered names/buttons; columns 6/3/2 at 1440/1024/<768.
- [x] Results retain exact H2, font count badge and sort. Grid 3/2/1, fixed 4:3 preview area, actual SVG fonts, initial 12 cards then existing next-24 behavior. Font names, PNG controls and TTF/license links render initially. Preserve download status and transparency toggle.
- [x] All colors use homepage variables; subtle 150–200ms transitions. At most two solid primary calls to action in desktop first viewport. No new product features.

## Task 4 — Verification
Files: `tests/seo-rendering.test.ts`, new `scripts/check-home-redesign.py`; artifacts under ignored `.qa/redesign-c/`.
- [x] Replace obsolete homepage trust-chip assertions with checks for the new hierarchy; retain other-route assertions and functional tests.
- [x] Run `npm test`, `npm run lint`, `npm run build`. Parse exported HTML: SEO/body diff empty, exact FAQs match JSON-LD, 7+4 links, six Unicode labels and first 12 font TTF/license hrefs, no duplicate H2s.
- [x] Compare representative non-home static pages and all content/route configuration to baseline.
- [x] Serve static export locally. Edge UI at 1440×900 and 390×844: responsive geometry, no overflow, touch targets, inline AI template/apply/success, sort/pagination, copy, alignment/drag/PNG and transparency.
- [x] Verify no-JS static content using CSP `script-src 'none'` local response; save evidence. Close task tabs and reset viewport.
- [x] Run matching Edge Lighthouse after implementation, fix any CLS regression. Report score and CLS, methodology and limitations; never claim passing measurements that failed.


Verified locally: 13 test modules, ESLint, Next static build, exact SEO/editorial diff, Edge desktop/mobile and CSP no-JS checks. Local Lighthouse performance 96, CLS 0 (production baseline 88/0; production after-release measurement still pending). Existing 7-item home FAQ schema was inconsistent with the 5 visible FAQs; only schema sourcing was corrected, with all visible text preserved.

## Task 5 — Release and report
- [ ] Commit only reviewed source/test/plan files, preserving existing dirty dev logs.
- [ ] Sync verified commit to authorized GitHub main without force, await Cloudflare production deployment.
- [ ] Fetch production HTML and edited bundle; verify HTML acceptance and bundle hash/source version. Run production mobile Lighthouse with same Edge settings and compare baseline.
- [ ] Report all seven attachment acceptance items, density method/data, exact empty SEO/body diff, file list and any failed/blocked measurement honestly.
