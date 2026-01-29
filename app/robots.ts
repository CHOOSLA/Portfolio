// 구글 검색 엔진을 위한 robots.txt 생성 설정
// 공식 문서: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.about-changwoo.me";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
