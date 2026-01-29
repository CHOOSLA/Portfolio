import type { Metadata } from "next";

import "@/styles/global.css";

import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.about-changwoo.me"),
  title: {
    default: "추창우 포트폴리오 :: CCW Portfolio",
    template: "%s | 추창우",
  },
  description:
    "추창우 포트폴리오 웹사이트입니다. 기술을 도구로서 사용하는 본질을 탐구하는 개발자입니다.",
  generator: "Next.js",
  applicationName: "추창우 포트폴리오 :: CCW Portfolio",
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
    "개발자 포트폴리오",
    "포트폴리오",
    "프론트엔드 포트폴리오",
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
    url: "https://www.about-changwoo.me",
    title: "추창우 포트폴리오 :: CCW Portfolio",
    description:
      "추창우 포트폴리오 웹사이트입니다. 기술을 도구로서 사용하는 본질을 탐구하는 개발자입니다.",
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
    title: "추창우 포트폴리오 :: CCW Portfolio",
    description:
      "추창우 포트폴리오 웹사이트입니다. 기술을 도구로서 사용하는 본질을 탐구하는 개발자입니다.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.about-changwoo.me",
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
