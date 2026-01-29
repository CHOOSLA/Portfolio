// 구글 검색 엔진을 위한 sitemap 생성 설정
// 공식 문서: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
import { MetadataRoute } from "next";

import { getAllProjects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.about-changwoo.com";
  const projects = getAllProjects();

  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projectUrls,
  ];
}
