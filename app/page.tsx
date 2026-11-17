import { SeoPage } from "@/components/sections/seo-page";
import { buildMetadata } from "@/lib/metadata";
import { pageDocuments } from "@/lib/page-data";
import { Nunito } from "next/font/google";
import "./home.css";

const homeFont = Nunito({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const page = pageDocuments.home;

export const metadata = buildMetadata(page);

export default function Home() {
  return <>
    <style>{`body:has([data-home-page]) { font-family: ${homeFont.style.fontFamily}; }`}</style>
    <SeoPage page={page} />
  </>;
}
