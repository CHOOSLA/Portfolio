"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

import { Project } from "@/lib/projects";

import { ExternalLinkIcon } from "./base/ExternalLinkIcon";
import { GithubIcon } from "./base/GithubIcon";
import { GlobeIcon } from "./base/GlobeIcon";

const Starfield = dynamic(() => import("./Starfield"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -50% 0px", // 화면의 중앙쯤에 왔을 때 인식
        threshold: 0.1,
      }
    );

    const sections = document.querySelectorAll(
      "section[id], div[id^='challenge-']"
    );
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [project]);

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

  // Gsap 애니메이션 적용
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".fade-in-up", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, [project]);

  return (
    // selection: bg-cyan-500/30 -> 텍스트를 드래그 했을 때 배경색을 cyan-500/30으로 설정
    <div
      ref={containerRef}
      className="relative min-h-screen bg-black text-white selection:bg-cyan-500/30"
    >
      <Starfield className="fixed inset-0 h-full w-full" />

      <div className="relative z-20 m-4 md:m-8">
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

      <main className="relative z-10 mx-auto max-w-[1600px] px-4 pt-10 pb-20 md:px-12 md:pb-32 lg:px-16">
        <header className="fade-in-up relative mb-20 flex flex-col items-center text-center md:mb-32">
          <div
            className="absolute top-1/2 left-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px] transition-all duration-700 md:h-[400px] md:w-[600px] md:blur-[120px]"
            style={{ backgroundColor: `${project.accentColor}15` }}
          />

          <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
            <span
              className="flex items-center gap-2 rounded-full border px-5 py-2 text-xs font-bold tracking-[0.15em] uppercase backdrop-blur-md"
              style={{
                borderColor: `${project.accentColor}30`,
                backgroundColor: `${project.accentColor}05`,
                color: project.accentColor,
              }}
            >
              <span
                className="h-1.5 w-1.5 animate-pulse rounded-full"
                style={{ backgroundColor: project.accentColor }}
              />
              {project.category}
            </span>

            <span className="font-mono text-sm tracking-widest text-white/40">
              NO. {String(project.id).padStart(2, "0")}
            </span>
          </div>

          <h1
            className="mb-8 text-4xl font-black tracking-tighter text-white md:text-6xl lg:text-8xl"
            style={{
              textShadow: `0 0 50px ${project.accentColor}30`,
            }}
          >
            {project.title}
          </h1>

          <p className="max-w-4xl text-base leading-relaxed font-light text-gray-300 md:text-xl lg:text-2xl">
            {project.detailedDescription}
          </p>
        </header>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <aside className="fade-in-up order-2 lg:order-1 lg:col-span-3">
            <div className="sticky top-12 space-y-8">
              {/* 카테고리 영역 */}
              <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-6 backdrop-blur-xl">
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
              <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-6 backdrop-blur-xl">
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

              {/* 프로젝트 네비게이션 영역 */}
              <nav className="hidden lg:block">
                <ul className="space-y-1 pl-4 text-sm">
                  <li>
                    <button
                      onClick={() => scrollToSection("overview")}
                      className={`block w-full border-l-2 py-2 pl-4 text-left transition-all duration-300 ${
                        activeSection === "overview"
                          ? "scale-105 border-white font-bold text-white"
                          : "border-transparent text-gray-500 hover:text-gray-300"
                      }`}
                    >
                      01. 프로젝트 개요
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection("technical-decision")}
                      className={`block w-full border-l-2 py-2 pl-4 text-left transition-all duration-300 ${
                        activeSection === "technical-decision" ||
                        activeSection.startsWith("challenge-")
                          ? "scale-105 border-white font-bold text-white"
                          : "border-transparent text-gray-500 hover:text-gray-300"
                      }`}
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
                              className={`block w-full truncate text-left text-sm transition-all duration-300 ${
                                activeSection === `challenge-${index}`
                                  ? "scale-105 pl-2 font-medium text-white"
                                  : "text-gray-500 hover:text-gray-300"
                              }`}
                            >
                              {index + 1}.{" "}
                              {project.challenges[index].menuTitle ||
                                project.challenges[index].title ||
                                `문제 ${index + 1}`}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection("retrospective")}
                      className={`block w-full border-l-2 py-2 pl-4 text-left transition-all duration-300 ${
                        activeSection === "retrospective"
                          ? "scale-105 border-white font-bold text-white"
                          : "border-transparent text-gray-500 hover:text-gray-300"
                      }`}
                    >
                      03. 성과 및 회고
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </aside>
          <div className="fade-in-up order-1 space-y-16 lg:order-2 lg:col-span-9 lg:space-y-24">
            {/* 프로젝트 설명 페이지 */}
            <section className="group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/80">
              <Image
                src={project.thumbnail || "/placeholder.svg"}
                alt={project.title}
                width={1200}
                height={800}
                className="h-auto w-full transform object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 1200px"
              />
            </section>

            {/* 프로젝트 개요 영역 */}
            <section id="overview" className="space-y-12">
              <div className="flex items-end gap-4">
                <span className="font-mono text-3xl leading-none font-bold text-white/80 md:text-5xl">
                  01
                </span>
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold tracking-tight md:text-4xl">
                    프로젝트 개요
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                {/* 왼쪽: 제목 및 설명 */}
                <div className="lg:col-span-12">
                  <h3 className="mb-6 text-xl font-bold text-white md:text-3xl">
                    {project.overview.title}
                  </h3>
                  <p className="max-w-4xl text-base leading-relaxed text-gray-400 md:text-xl">
                    {project.overview.description}
                  </p>
                </div>

                {/* 하단: 주요 특징 그리드 */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-12">
                  {project.overview.highlights.map((detail, i) => (
                    <div
                      key={i}
                      className="relative overflow-hidden rounded-none border-0 bg-black/50 p-4 backdrop-blur-md md:rounded-2xl md:border md:border-white/10 md:bg-zinc-900/90 md:p-6 md:hover:border-white/20 md:hover:bg-zinc-800/60"
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
                <span className="font-mono text-3xl font-bold text-white/80 md:text-5xl">
                  02
                </span>
                <h2 className="text-2xl font-bold md:text-3xl">
                  도전과제 및 해결과정
                </h2>
              </div>

              <div className="space-y-12">
                {project.challenges?.map((item, index) => (
                  <div
                    key={index}
                    id={`challenge-${index}`}
                    className="scroll-mt-32 space-y-12"
                  >
                    <div className="overflow-hidden rounded-none border-0 bg-black/50 p-4 backdrop-blur-md md:overflow-hidden md:rounded-3xl md:border md:border-white/10 md:bg-zinc-900/90 md:p-10">
                      {/* 1. 문제 정의 (Challenge) */}
                      <div className="relative pb-10">
                        <div className="relative z-10">
                          <div className="mb-6 flex flex-col items-start gap-3 md:flex-row md:items-center">
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

                          <p className="mb-8 text-base leading-relaxed text-gray-300 md:text-lg">
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
                      <div className="relative overflow-hidden rounded-none border-0 bg-black/50 p-4 backdrop-blur-md md:overflow-hidden md:rounded-3xl md:border md:border-emerald-500/20 md:bg-zinc-900/80 md:p-10">
                        <div className="relative z-10">
                          <div className="mb-6 flex flex-col items-start gap-3 md:flex-row md:items-center">
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

                          <p className="mb-8 text-base leading-relaxed text-gray-300 md:text-lg">
                            {item.solution.description}
                          </p>

                          <div className="mb-8 grid gap-4 md:grid-cols-2">
                            {item.solution.technicalDetails.map((detail, i) => (
                              <div
                                key={i}
                                className="rounded-xl border border-white/5 bg-zinc-900/50 p-4 transition-colors hover:border-white/20 hover:bg-zinc-800"
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
                            <div className="w-full max-w-[calc(100vw-5rem)] overflow-hidden rounded-xl border border-white/10 bg-[#0d1117] shadow-2xl md:max-w-none">
                              <div className="flex items-center justify-between border-b border-white/5 bg-zinc-800/50 px-4 py-3">
                                <div className="flex gap-2">
                                  <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                                  <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                                  <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
                                </div>
                                <div className="font-mono text-xs text-gray-500">
                                  Implementation Example
                                </div>
                              </div>
                              <SyntaxHighlighter
                                language={
                                  item.solution.codeLanguage || "typescript"
                                }
                                style={vscDarkPlus}
                                customStyle={{
                                  margin: 0,
                                  padding: "1.5rem",
                                  backgroundColor: "transparent",
                                  fontSize: "0.875rem",
                                  lineHeight: "1.625",
                                  overflowX: "auto",
                                }}
                                wrapLongLines={true}
                              >
                                {item.solution.codeExample}
                              </SyntaxHighlighter>
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
                  <span className="font-mono text-3xl font-bold text-white/80 md:text-5xl">
                    03
                  </span>
                  <h2 className="text-2xl font-bold md:text-3xl">회고</h2>
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
                        className="group relative overflow-hidden rounded-none border-0 bg-black/50 p-4 backdrop-blur-md transition-colors duration-300 hover:bg-black/60 md:overflow-hidden md:rounded-3xl md:border md:border-white/10 md:bg-zinc-900/80 md:p-8 md:hover:border-white/20 md:hover:bg-zinc-800"
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
