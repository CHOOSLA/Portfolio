import type { Metadata } from "next";

import "@/styles/global.css";

import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.about-changwoo.com"),
  title: {
    default: "About ChooChangWoo",
    template: "%s | ChooChangWoo",
  },
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
    "추창우",
    "추창우 포트폴리오",
    "웹 개발자",
    "프론트엔드 개발자",
    "ChooChangWoo Logo",
    "Frontend Developer",
  ],
  authors: [{ name: "ChooChangWoo", url: "https://github.com/choosla" }],
  creator: "CHOOSLA",
  publisher: "CHOOSLA",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://www.about-changwoo.com",
    title: "About ChooChangWoo",
    description:
      "ChooChangWoo's Portfolio Website. Explore creative frontend projects and backend solutions.",
    siteName: "ChooChangWoo Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ChooChangWoo Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About ChooChangWoo",
    description: "ChooChangWoo's Portfolio Website",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.about-changwoo.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {children}
        <Footer />
      </body>
    </html>
  );
}
