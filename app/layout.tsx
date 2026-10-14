import type { Metadata, Viewport } from "next";
import "./globals.css";
import GsapReveal from "@/components/gsap-reveal";

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
  themeColor: "#080a0a",
  colorScheme: "dark"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}<GsapReveal /></body>
    </html>
  );
}
