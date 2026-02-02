import type { Metadata } from "next";

import "@/styles/global.css";

import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.about-changwoo.me"),
  title: {
    default: "추창우 포트폴리오 :: CCW's Portfolio",
    template: "%s | 추창우 포트폴리오",
  },
  description:
    "추창우 포트폴리오 웹사이트입니다. 기술을 도구로서 사용하는 본질을 탐구하는 개발자입니다.",
  generator: "Next.js",
  applicationName: "추창우 포트폴리오 :: CCW's Portfolio",
  keywords: [
    "추창우",
    "추창우 포트폴리오",
    "프론트엔드 개발자",
    "웹 개발자",
    "개발자 포트폴리오",
    "ChooChangWoo",
    "Portfolio",
    "Web Developer",
    "Frontend",
    "Next.js",
    "React",
    "TypeScript",
    "JavaScript",
    "Creative Developer",
    "ChooChangWoo Logo",
    "Frontend Developer",
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
    title: "추창우 포트폴리오 :: CCW's Portfolio",
    description:
      "추창우 포트폴리오 웹사이트입니다. 기술을 도구로서 사용하는 본질을 탐구하는 개발자입니다.",
    siteName: "ChooChangWoo Portfolio",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "ChooChangWoo Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "추창우 포트폴리오 :: CCW's Portfolio",
    description:
      "추창우 포트폴리오 웹사이트입니다. 기술을 도구로서 사용하는 본질을 탐구하는 개발자입니다.",
    images: ["/og-image.webp"],
  },
  alternates: {
    canonical: "https://www.about-changwoo.me",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: { url: "/apple-icon.png", type: "image/png", sizes: "180x180" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydationWarning : SSR에서 서버에서 렌더링된 HTML을 클라이언트가 재사용할떄 경고문구
    <html lang="ko" suppressHydrationWarning>
      <body className="overflow-x-hidden bg-black text-white">
        {children}
        <Footer />
      </body>
    </html>
  );
}
