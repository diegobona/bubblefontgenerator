import { permanentRedirect } from "next/navigation";

import { routes } from "@/lib/routes";

export default function BubbleFontGeneratorPage() {
  permanentRedirect(routes.home);
}
