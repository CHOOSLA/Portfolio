import { notFound } from "next/navigation";

import { getAllProjects, getProjectById } from "@/lib/projects";
import ProjectDetail from "@/components/ProjectDetail";

interface PageProps {
  params: Promise<{ id: string }>;
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
