import { permanentRedirect } from "next/navigation";

import { routes } from "@/lib/routes";

export default function FreeBubbleFontGeneratorPage() {
  permanentRedirect(routes.freeBubbleFontGenerator);
}
