import type { Metadata } from "next";

import "@/styles/global.css";

export const metadata: Metadata = {
  title: "About ChooChangWoo",
  description: "ChooChangWoo's Portfolio Website",
  generator: "Next.js",
  applicationName: "ChooChangWoo Portfolio",
  keywords: [
    "ChooChangWoo",
    "Portfolio",
    "Web Developer",
    "Frontend",
    "Next.js",
    "React",
    "TypeScript",
    "JavaScript",
    "Creative Developer",
  ],
  authors: [{ name: "ChooChangWoo", url: "https://github.com/choosla" }],
  creator: "CHOOSLA",
  publisher: "CHOOSLA",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
