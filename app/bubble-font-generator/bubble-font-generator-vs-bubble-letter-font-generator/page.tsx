import { permanentRedirect } from "next/navigation";

import { routes } from "@/lib/routes";

export default function BubbleFontGeneratorComparisonPage() {
  permanentRedirect(routes.bubbleFontGeneratorVsBubbleLetterFontGenerator);
}
