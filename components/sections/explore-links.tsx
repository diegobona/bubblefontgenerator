import { footerArticleLinks, footerToolLinks } from "@/lib/site";
import { routes } from "@/lib/routes";

const descriptions: Record<string, string> = {
  [routes.home]: "Compare the full font collection and customize your lettering.",
  [routes.printableBubbleLetters]: "Make outline templates to print, color or save as a PDF.",
  [routes.bubbleLettersFont]: "Preview your words and download a font to use in your design app.",
  [routes.bubbleFontGeneratorPng]: "Create a lettering image for a banner, sticker or thumbnail.",
  [routes.transparentBubbleFontGenerator]: "Save lettering without a background to place over another design.",
  [routes.bubbleLetterFontGenerator]: "Try rounded letter shapes for names, labels and signs.",
  [routes.bubbleGraffitiFontGenerator]: "Explore heavier outlines and expressive lettering for posters.",
  [routes.whatIsBubbleFont]: "Learn what gives this lettering its rounded, inflated appearance.",
  [routes.howToMakeBubbleLetters]: "Follow the steps for drawing and styling your own letters.",
  [routes.bubbleFontGeneratorVsBubbleLetterFontGenerator]: "Compare the two tools and choose one for your project.",
  [routes.freeBubbleFontGenerator]: "See how to create and download lettering with the free tools.",
};

export function ExploreLinks({ footer = false, home = false }: { footer?: boolean; home?: boolean }) {
  const groups = [
    { id: "style-pages", title: "Style Pages", links: [{ href: routes.home, label: "Bubble Font Generator" }, ...footerToolLinks] },
    { id: "guides", title: "Guides", links: footerArticleLinks },
  ];
  const prefix = footer ? "footer-explore" : "explore";
  return <div className={home ? "home-explore" : footer ? "grid gap-10 md:col-span-2 md:grid-cols-2" : "grid gap-8 lg:grid-cols-2"}>
    {groups.map((group) => <section key={group.id} id={home ? group.id : undefined} data-explore-group={group.id} aria-labelledby={`${prefix}-${group.id}`} className={home ? "home-explore-card" : footer ? "" : "rounded-3xl border border-white/10 bg-[rgba(24,20,48,0.58)] p-5 sm:p-6"}>
      {home ? <div className="home-explore-heading">
        <div><h2 id={`${prefix}-${group.id}`}>{group.title}</h2><p>{group.id === "style-pages" ? "Find the right lettering for your next project." : "Learn how to draw, style, and use your letters."}</p></div>
        <span aria-hidden="true">↗</span>
      </div> :
      <h2 id={`${prefix}-${group.id}`} className={footer ? "text-sm font-semibold uppercase tracking-[0.16em] text-slate-200" : "text-2xl font-semibold text-white"}>{group.title}</h2>
      }
      <ul className="mt-5 space-y-5">
        {group.links.map((link) => <li key={link.href}>
          <a href={link.href} className="font-semibold text-cyan-200 underline underline-offset-4 hover:text-white">{link.label}</a>
          <p className="mt-1 text-sm leading-6 text-slate-300">{descriptions[link.href]}</p>
        </li>)}
      </ul>
    </section>)}
  </div>;
}
