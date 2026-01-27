"use client";

import { useRouter } from "next/navigation";

import { Project } from "@/lib/projects";

import { ExternalLinkIcon } from "./base/ExternalLinkIcon";
import { GithubIcon } from "./base/GithubIcon";
import { GlobeIcon } from "./base/GlobeIcon";

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const router = useRouter();
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 30;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    // selection: bg-cyan-500/30 -> 텍스트를 드래그 했을 때 배경색을 cyan-500/30으로 설정
    <div className="relative min-h-screen bg-black text-white selection:bg-cyan-500/30">
      <div className="m-8">
        <button
          onClick={() => router.push("/")}
          className="group flex items-center gap-2 rounded-full px-4 py-2 backdrop-blur-md transition-all duration-300 hover:bg-white/10"
          style={{ border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <svg
            className="h-5 w-5 transition-transform group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="text-sm font-medium">Back to Home</span>
        </button>{" "}
      </div>

      <main className="relative z-10 mx-auto max-w-[1600px] px-6 pt-4 pb-20 md:px-12 lg:px-16">
        <header className="mb-20">
          <div className="mb-6 flex flex-wrap items-center gap-4">
            {/* 프로젝트 뱃지 */}
            <span
              className="rounded-full px-4 py-1.5 text-sm font-bold tracking-wider uppercase backdrop-blur-md"
              style={{
                background: `${project.accentColor}15`,
                border: `1px solid ${project.accentColor}30`,
                color: project.accentColor,
              }}
            >
              {project.category}
            </span>

            <div className="h-px w-12 bg-white/20" />
            <span className="font-mono text-gray-400">
              Proejct {String(project.id).padStart(2, "0")}
            </span>
          </div>

          <h1 className="mb-8 text-5xl leading-[1.1] font-bold md:text-7xl lg:text-8xl">
            {project.title}
          </h1>

          <p className="max-w-5xl text-lg leading-relaxed text-gray-300 md:text-xl">
            {project.detailedDescription}
          </p>
        </header>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <div className="sticky top-12 space-y-8">
              {/* 카테고리 영역 */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
                <h3 className="mb-6 text-xs font-bold tracking-widest text-gray-500 uppercase">
                  Project Links
                </h3>
                <div className="flex flex-col gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-lg border border-white/5 bg-white/5 px-4 py-3 transition-colors hover:border-white/20 hover:bg-white/10"
                  >
                    <span className="flex items-center gap-2 font-medium">
                      <GithubIcon className="h-4 w-4" fill="currentColor" />
                      <span>GitHub</span>
                    </span>
                    <ExternalLinkIcon className="h-4 w-4 text-gray-500 transition-colors group-hover:text-white" />
                  </a>

                  {project.website && (
                    <a
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-lg border border-white/5 bg-white/5 px-4 py-3 transition-colors hover:border-white/20 hover:bg-white/10"
                    >
                      <span
                        className="flex items-center gap-2 font-medium"
                        style={{ color: project.accentColor }}
                      >
                        <GlobeIcon className="h-5 w-5" />
                        Live Demo
                      </span>
                      <ExternalLinkIcon className="h-4 w-4 text-gray-500 transition-colors group-hover:text-white" />
                    </a>
                  )}
                </div>
              </div>

              {/* 기술 스택 영역 */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <h3 className="mb-6 text-xs font-bold tracking-widest text-gray-500 uppercase">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <nav className="hidden lg:block">
                <ul className="space-y-1 border-l border-white/10 pl-4 text-sm">
                  <li>
                    <button
                      onClick={() => scrollToSection("overview")}
                      className="block py-2 text-left text-gray-400 transition-all hover:translate-x-1 hover:text-white"
                    >
                      01. 프로젝트 개요
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection("technical-decision")}
                      className="block py-2 text-left text-gray-400 transition-all hover:translate-x-1 hover:text-white"
                    >
                      02. 도전과제 및 해결과정
                    </button>
                    {project.challenges && project.challenges.length > 0 && (
                      <ul className="mt-2 space-y-2 border-l border-white/5 pl-4">
                        {project.challenges.map((_, index) => (
                          <li key={index}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                scrollToSection(`challenge-${index}`);
                              }}
                              className="block text-left text-sm text-gray-500 transition-all hover:translate-x-1 hover:text-gray-300"
                            >
                              문제 {index + 1}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection("retrospective")}
                      className="block py-2 text-left text-gray-400 transition-all hover:translate-x-1 hover:text-white"
                    >
                      03. 성과 및 회고
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </aside>
          <div className="space-y-24 lg:col-span-9">
            {/* 프로젝트 설명 페이지 */}
            <section className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">
              <img
                src={project.thumbnail || "/placeholder.svg"}
                alt={project.title}
                className="h-auto w-full transform object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </section>

            {/* 프로젝트 개요 영역 */}
            <section id="overview" className="space-y-12">
              <div className="flex items-end gap-4">
                <span className="font-mono text-5xl leading-none font-bold text-white/10">
                  01
                </span>
                <div className="space-y-1">
                  <h2 className="text-4xl font-bold tracking-tight">
                    프로젝트 개요
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                {/* 왼쪽: 제목 및 설명 */}
                <div className="lg:col-span-12">
                  <h3 className="mb-6 text-2xl font-bold text-white md:text-3xl">
                    {project.overview.title}
                  </h3>
                  <p className="max-w-4xl text-lg leading-relaxed text-gray-400 md:text-xl">
                    {project.overview.description}
                  </p>
                </div>

                {/* 하단: 주요 특징 그리드 */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-12">
                  {project.overview.highlights.map((detail, i) => (
                    <div
                      key={i}
                      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-white/20 hover:bg-white/10"
                    >
                      <div className="flex items-start gap-4">
                        <span
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold"
                          style={{
                            backgroundColor: `${project.accentColor}20`,
                            color: project.accentColor,
                          }}
                        >
                          {i + 1}
                        </span>
                        <p className="text-base leading-relaxed text-gray-300">
                          {detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 문제해결 */}
            <section id="technical-decision" className="space-y-12">
              <div className="flex items-center gap-4">
                <span className="font-mono text-5xl font-bold text-white/20">
                  02
                </span>
                <h2 className="text-3xl font-bold">도전과제 및 해결과정</h2>
              </div>

              <div className="space-y-12">
                {project.challenges?.map((item, index) => (
                  <div
                    key={index}
                    id={`challenge-${index}`}
                    className="scroll-mt-32 space-y-12"
                  >
                    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
                      {/* 1. 문제 정의 (Challenge) */}
                      <div className="relative pb-10">
                        <div className="relative z-10">
                          <div className="mb-6 flex items-center gap-3">
                            <div className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-bold tracking-widest text-red-500 uppercase">
                              Problem{" "}
                              {project.challenges &&
                              project.challenges.length > 1
                                ? `#${index + 1}`
                                : ""}
                            </div>
                            <h3 className="text-xl font-bold text-white">
                              {item.title}
                            </h3>
                          </div>

                          <p className="mb-8 text-lg leading-relaxed text-gray-300">
                            {item.description}
                          </p>

                          <div className="space-y-3 border-l-2 border-red-500/20 pl-4">
                            {item.technicalDetails.map((detail, i) => (
                              <p key={i} className="text-gray-400">
                                • {detail}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* 2. 해결 과정  */}
                      <div className="relative overflow-hidden rounded-3xl border border-emerald-500/10 bg-emerald-500/5 p-8 md:p-10">
                        <div className="relative z-10">
                          <div className="mb-6 flex items-center gap-3">
                            <div className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold tracking-widest text-emerald-500 uppercase">
                              Solution{" "}
                              {project.challenges &&
                              project.challenges.length > 1
                                ? `#${index + 1}`
                                : ""}
                            </div>
                            <h3 className="text-xl font-bold text-white">
                              {item.solution.title}
                            </h3>
                          </div>

                          <p className="mb-8 text-lg leading-relaxed text-gray-300">
                            {item.solution.description}
                          </p>

                          <div className="mb-8 grid gap-4 md:grid-cols-2">
                            {item.solution.technicalDetails.map((detail, i) => (
                              <div
                                key={i}
                                className="rounded-xl border border-white/5 bg-white/5 p-4 transition-colors hover:border-white/20 hover:bg-white/10"
                              >
                                <div className="mb-2 font-mono text-xs text-gray-400">
                                  KEY FEATURE {String(i + 1).padStart(2, "0")}
                                </div>
                                <p className="text-sm font-medium text-gray-300">
                                  {detail}
                                </p>
                              </div>
                            ))}
                          </div>

                          {item.solution.codeExample && (
                            <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0d1117] shadow-2xl">
                              <div className="flex items-center justify-between border-b border-white/5 bg-white/5 px-4 py-3">
                                <div className="flex gap-2">
                                  <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                                  <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                                  <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
                                </div>
                                <div className="font-mono text-xs text-gray-500">
                                  Implementation Example
                                </div>
                              </div>
                              <pre className="scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent overflow-x-auto p-6">
                                <code className="font-mono text-sm leading-relaxed text-gray-300">
                                  {item.solution.codeExample}
                                </code>
                              </pre>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 성과 및 회고  */}
            {project.retrospective && (
              <section id="retrospective" className="space-y-12">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-5xl font-bold text-white/20">
                    03
                  </span>
                  <h2 className="text-3xl font-bold">회고</h2>
                </div>

                <div className="mb-6 flex items-start gap-4">
                  <h3 className="text-xl leading-relaxed font-medium text-white md:text-2xl">
                    {project.retrospective.title}
                  </h3>
                </div>

                {project.retrospective.description.length > 1 && (
                  <div className="relative z-10 grid gap-6">
                    {project.retrospective.description.map((text, i) => (
                      <div
                        key={i}
                        className="group relative rounded-3xl border border-white/5 bg-white/5 p-8 transition-colors duration-300 hover:border-white/20 hover:bg-white/10"
                      >
                        <div className="flex gap-6">
                          <div className="flex shrink-0 flex-col items-center gap-2">
                            <span className="font-mono text-sm font-bold text-white/20 transition-colors group-hover:text-indigo-400">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <div className="h-full w-px bg-white/5 transition-colors group-hover:bg-indigo-500/20" />
                          </div>

                          <p className="text-lg leading-relaxed text-gray-300 transition-colors group-hover:text-white">
                            {text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
