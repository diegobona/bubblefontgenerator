import Link from "next/link";
import { routes } from "@/lib/routes";

const guides = [
  [routes.printableBubbleLetters, "Printable Bubble Letters · PDF Templates"],
  [routes.bubbleLettersFont, "Bubble Letters Font · Free TTF Downloads"],
  [routes.bubbleLetterFontGenerator, "bubble letter generator"],
  [routes.transparentBubbleFontGenerator, "Transparent Bubble Font Generator"],
  [routes.bubbleGraffitiFontGenerator, "Bubble Graffiti Font Generator"],
  [routes.bubbleFontGeneratorPng, "Bubble Font Generator PNG"],
  [routes.whatIsBubbleFont, "What Is Bubble Font?"],
  [routes.howToMakeBubbleLetters, "How to Make Bubble Letters"],
];

const sections = [
  {
    title: "Bubble Text Generator",
    paragraphs: [
      "Use this bubble font generator for two everyday jobs: decorating text you can paste and designing lettering you can download. The Copy & Paste panel turns the same input into six Unicode styles, including circles, filled circles, squares, fullwidth letters, parenthesized letters, and small caps. Copy a line for an IG bio, Discord display name, TikTok profile, or a message without saving an image first.",
      "For artwork, keep using the PNG previews beside the copy panel. Those previews use actual fonts and let you adjust color, outline, shadow, and depth. Unicode text cannot carry those visual settings into another app. A PNG preserves them as pixels, making it useful when the exact shape and color matter more than editable text. Both outputs start with the words you enter above.",
    ],
  },
  {
    title: "How to Use the Tool in Three Steps",
    paragraphs: [
      "1. Enter your text. Start with a name, a short greeting, or a headline in the shared input. The bubble font generator updates both output areas as you type. Keep names short enough to read on a phone, and check spelling before downloading. Spaces, punctuation, emoji, and non-Latin characters remain in the copied text when there is no matching styled character; they are not translated or removed.",
      "2. Choose a style. Compare the six text results for a profile, or browse the font previews for artwork. In the bubble font generator, use the existing color and outline controls to improve contrast, then adjust spacing if neighboring letters feel crowded. Start with one effect and add another only when it helps readability. A short word can handle a thick outline that would overwhelm a longer sentence.",
      "3. Copy or download PNG. Press Copy beside the text you want and look for the confirmation message, then paste into your destination. For a graphic, use Download PNG on the chosen preview. Enable Remove background when downloading if the lettering should sit over a photo or another color. Open the saved image at its intended size before using it in a finished design.",
    ],
  },
  {
    title: "Choose a Style for Your Project",
    paragraphs: [
      "3D: Use depth and shadow for raised lettering on a thumbnail or party title. The bubble font generator lets you compare the effect before export. Leave room around the word so its shadow does not compete with nearby elements. A bright face with a darker edge can help a short title stand out over a busy photograph.",
      "Outline: Choose a clear border when the shape of each letter matters. Keep the border thinner for small labels and stronger for large headings. For coloring activities, check the actual preview before printing: an outline effect does not automatically make every font hollow. Use a light fill when you want an open, easy-to-color appearance.",
      "Bubble Letters: Rounded, friendly shapes suit names, classroom headings, and simple greetings. Compare the lowercase and uppercase versions in the bubble font generator because their proportions may differ considerably. Wider letters need more space; reducing the number of words often improves a label more than shrinking the whole design.",
      "70s: Build a retro mood with rounded forms and a warm palette such as orange, cream, or brown. This is a styling direction rather than a separate download format. Pair a decorative title with plain supporting text, and make sure the colors still separate clearly when you view the design at a smaller size.",
      "Graffiti: Try heavier shapes and bold borders for a poster, gaming title, or expressive sticker. Start with a short phrase in the bubble font generator, then compare how much shadow the letters need. Strong effects work best when the surrounding layout is simple enough to give the word room.",
      "Cursive: Flowing, handwritten styles can suit invitations, personal notes, and decorative names. Connected forms are harder to read when tightly spaced or heavily outlined, so inspect the preview carefully. Keep essential details, such as dates or addresses, in ordinary text alongside your decorative heading.",
      "Alphabet: Enter a few letters at a time for learning cards or matching classroom labels. The bubble font generator can keep the same colors and settings while you change the input. Check that each chosen font makes similar shapes, such as I and l, easy to distinguish. For early readers, favor familiar letterforms over elaborate effects.",
    ],
  },
  {
    title: "Ideas for Stickers, Labels, and Social Profiles",
    paragraphs: [
      "Stickers: Create a short name or phrase, add a contrasting edge, and export with a transparent background. Leave some empty space around the design when placing it in your print layout. The bubble font generator provides the artwork; your printing or cutting software determines the final dimensions and any cut line.",
      "Classroom labels: Use a consistent palette for storage boxes, desks, or reading groups. Test one label at the actual print size before making a full set. Keep the words readable from the distance students will see them. For birthday banners, split a long greeting into individual words or letters so each piece can be positioned separately.",
      "YouTube thumbnails: Limit decorative lettering to the main message. Place the PNG over the image, inspect it at phone size, and increase contrast if the title disappears into the background. The bubble font generator is useful for preparing a reusable title treatment, but the surrounding photograph and layout still determine whether it is easy to read.",
      "Social nicknames: Copy circled letters or small caps for a display name or short bio detail. Keep a plain version of important names and contact details nearby, since decorative Unicode may be harder to search, pronounce with a screen reader, or recognize quickly. Paste into the actual app before committing to a style; profile fields may impose their own character limits.",
    ],
  },
  {
    title: "Copyable Text or a PNG: Which Fits?",
    paragraphs: [
      "Choose copyable text when the destination accepts typing and you want something quick to edit. The characters remain text, so you can combine them with ordinary words. They do not install a font on another device, and the recipient's system controls their appearance. If a character appears as an empty box, try a different style or use plain letters for that part.",
      "Choose an image from the bubble font generator for precise colors, outlines, or a consistent visual style. A transparent PNG can sit on another design without a rectangular background. It will not behave like a typed nickname, and enlarging a small image can soften its edges. Export for the size you intend to use and keep the original words separately for later edits.",
    ],
  },
];

const faqs = [
  ["Is it completely free?", "Yes. This bubble font generator lets you enter text, copy all six Unicode styles, adjust the artwork, and download PNG files without payment or registration. You can compare results directly in the browser. There is no account step between typing your words and using the copy or download buttons."],
  ["Can I use the results on Discord and Instagram?", "You can paste Unicode results into text fields that accept those characters, including many display names, bios, and messages. Discord and Instagram may treat handles differently from display names or apply their own restrictions. Test your chosen text in the destination field. PNG artwork is suitable for image posts and graphics, not as a replacement for typed text in a bio."],
  ["What is the difference between Soap bubble and Outline?", "Soap bubble usually describes an airy, inflated look with shine or translucent-looking highlights. Outline emphasizes the border around the letter. These are visual directions, and different fonts interpret them differently. In the bubble font generator, compare the preview and adjust highlights, fill, and border rather than assuming that a style name guarantees a particular finish."],
  ["Can I use the artwork commercially?", "The font library records commercial use as allowed for its included fonts. You can use the exported lettering in projects such as promotional graphics or product labels, while following the license of the selected font. That permission does not grant rights to someone else's brand name, logo, or artwork. Check the font's license before redistributing font files themselves."],
  ["Should I copy and paste or download a PNG?", "Use Copy for a nickname, bio, or message that needs to remain text. Download a PNG from the bubble font generator for stickers, banners, thumbnails, or any design where color and exact shape matter. If your destination rejects decorative characters, use ordinary text there and save the illustrated lettering for an image area."],
];

export const homeFaqItems = faqs.map(([question, answer]) => ({ question, answer }));

export function HomeContent() {
  return <div data-home-content="true" className="space-y-10 text-slate-300">
    {sections.map((section, index) => <section key={section.title} className="space-y-4">
      <h2 className="text-2xl font-semibold text-white">{section.title}</h2>
      {section.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraph} className="max-w-4xl leading-7">{paragraph}{index === 0 && paragraphIndex === 1 ? <> For names and signs, try the <Link href={routes.bubbleLetterFontGenerator} className="text-cyan-200 underline underline-offset-4 hover:text-white">bubble letter generator</Link>.</> : null}</p>)}
      {index === 0 ? <nav aria-label="Recommended styles and articles" className="grid gap-3 pt-4 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map(([href, title]) => <Link key={href} href={href} className="rounded-xl border border-white/10 bg-white/5 p-5 font-semibold text-cyan-100 hover:bg-white/10">{title}</Link>)}
      </nav> : null}
    </section>)}
    <section className="space-y-5">
      <h2 className="text-2xl font-semibold text-white">Frequently Asked Questions</h2>
      {faqs.map(([question, answer]) => <div key={question} className="max-w-4xl">
        <h3 className="font-semibold text-white">{question}</h3>
        <p className="mt-2 leading-7">{answer}</p>
      </div>)}
    </section>
  </div>;
}
