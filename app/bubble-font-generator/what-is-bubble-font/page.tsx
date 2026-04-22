import { permanentRedirect } from "next/navigation";

import { routes } from "@/lib/routes";

export default function WhatIsBubbleFontPage() {
  permanentRedirect(routes.whatIsBubbleFont);
}
