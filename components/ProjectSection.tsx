"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Project } from "@/lib/projects";

import { ProjectCard } from "./base/ProjectCard";
import Starfield from "./Starfield";

gsap.registerPlugin(ScrollTrigger);

interface ProjectsProps {
  projects: Project[];
}

export default function ProjectSection({ projects }: ProjectsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  // GSAP 애니메이션 적용
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 헤더 텍스트 애니메이션 (스크롤에 따라 각자 다르게 움직임)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom 20%", // 애니메이션이 끝나는 지점을 조금 더 아래로
          scrub: 1.5,
        },
      });

      // FEATURED는 왼쪽에서 오른쪽으로
      tl.from(".featured-text", {
        x: -100,
        opacity: 0,
        duration: 2,
      });

      // PROJECTS는 오른쪽에서 왼쪽으로
      tl.from(
        ".projects-text",
        {
          x: 100,
          opacity: 0,
          duration: 2,
        },
        "<" // 이전 애니메이션과 시작 시간 맞춤
      );

      // 설명글은 아래에서 위로 천천히
      tl.from(
        ".project-desc",
        {
          y: 50,
          opacity: 0,
          duration: 1.5,
        },
        "-=1" // 조금 더 빨리 시작
      );

      // 2. 프로젝트 카드들 애니메이션: 지그재그로 등장하는 느낌
      projectRefs.current.forEach((el, index) => {
        if (!el) return;
        const isEven = index % 2 === 0;

        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%", // 조금 더 일찍 시작
            end: "top 30%",
            scrub: 1.5,
          },
          opacity: 0,
          y: 100,
          scale: 0.95, // 스케일 효과 추가
          x: isEven ? -30 : 30, // 이동 거리 약간 줄임
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    // 제일 큰 부분
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-black px-6 pt-32 pb-64 md:px-12 lg:px-24"
    >
      <Starfield
        triggerRef={sectionRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      {/* 전체에 일관된 margin을 넣음 */}
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="relative mb-32 flex flex-col items-center justify-center text-center">
          {/* 배경 글로우 효과 */}
          <div className="absolute top-1/2 left-1/2 -z-10 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[120px]" />

          <h2
            ref={titleRef}
            className="mb-8 font-black tracking-tighter text-white"
          >
            {/* 상단 텍스트: 외곽선 효과 (Stroke) */}
            <span
              className="featured-text block text-6xl text-transparent transition-all duration-500 hover:tracking-wide md:text-8xl lg:text-9xl"
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}
            >
              FEATURED
            </span>
            {/* 하단 텍스트: 그라데이션 */}
            <span className="projects-text mt-[-0.2em] block bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-6xl text-transparent md:text-8xl lg:text-9xl">
              PROJECTS
            </span>
          </h2>

          <p className="project-desc max-w-2xl text-lg leading-relaxed font-light text-gray-400 md:text-xl">
            상상을 현실로 구현하는 즐거움, <br className="md:hidden" />
            <span className="font-medium text-indigo-400">
              직접 개발하고 배포한
            </span>{" "}
            프로젝트들을 소개합니다.
          </p>
        </div>

        {/* 프로젝트 카드 섹션 */}
        <div className="space-y-24">
          {/* 그레디언트된 카드 */}
          {projects.map((project, index) => {
            return (
              <div
                key={project.id.toString()}
                ref={(el) => {
                  projectRefs.current[index] = el;
                }}
              >
                <ProjectCard project={project} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
