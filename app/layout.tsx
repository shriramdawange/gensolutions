import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./theme-reference.css";
import { Geist, Instrument_Serif } from "next/font/google";
import GsapReveal from "@/components/gsap-reveal";
import Preloader from "@/components/preloader";
import CustomCursor from "@/components/custom-cursor";
import ScrollNav from "@/components/scroll-nav";
import LiquidGlassFilter from "@/components/liquid-glass-filter";

const sans = Geist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap"
});

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gensolutions.in"),
  title: {
    default: "GenSolutions — We generate solutions, not just software.",
    template: "%s | GenSolutions"
  },
  description:
    "GenSolutions is an AI engineering, research and product-building company. We turn ambitious ideas into intelligent systems and useful digital products.",
  applicationName: "GenSolutions",
  keywords: [
    "GenSolutions", "AI engineering", "R&D", "AI agents", "software engineering",
    "ZeroBite", "AIRLANCE", "generative solutions"
  ],
  openGraph: {
    title: "GenSolutions — We generate solutions, not just software.",
    description: "AI engineering. Research. Products. Built for real-world impact.",
    url: "https://gensolutions.in",
    siteName: "GenSolutions",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "GenSolutions",
    description: "We generate solutions, not just software."
  },
  robots: { index: true, follow: true }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#121212" },
    { media: "(prefers-color-scheme: light)", color: "#fcfcfc" }
  ],
  colorScheme: "dark light"
};

const themeScript = `try{if(localStorage.getItem('theme')==='light'){document.documentElement.dataset.theme='light'}}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Preloader />
        <CustomCursor />
        <LiquidGlassFilter />
        <div className="k-noise-overlay" aria-hidden="true" />
        <ScrollNav />
        {children}
        <GsapReveal />
      </body>
    </html>
  );
}
