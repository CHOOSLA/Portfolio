import { getAllProjects } from "@/lib/projects";
import HeroSection from "@/components/HeroSection";
import ProjectSection from "@/components/ProjectSection";

export default function Home() {
  const projects = getAllProjects();

  return (
    <>
      <HeroSection />
      <ProjectSection projects={projects.slice(0, 1)} />
    </>
  );
}
