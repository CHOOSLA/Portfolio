import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getAllProjects, getProjectById } from "@/lib/projects";
import ProjectDetail from "@/components/ProjectDetail";

interface PageProps {
  params: Promise<{ id: string }>;
}

// 동적으로 메타 데이터를 생성하는 Nextjs 예약함수
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const project = getProjectById(Number(resolvedParams.id));

  if (!project) {
    return {
      title: "페이지를 찾을 수 없습니다.",
      description: "요청하신 프로젝트 상세 페이지를 찾을 수 없습니다.",
    };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [
        {
          url: project.thumbnail,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [project.thumbnail],
    },
  };
}

// 정적 콘텐츠 생성을 위한 함수
export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    id: project.id.toString(),
  }));
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;

  const project = getProjectById(Number(resolvedParams.id));

  if (!project) {
    notFound();
  }
  return <ProjectDetail project={project} />;
}
