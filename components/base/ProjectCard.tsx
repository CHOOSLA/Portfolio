"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Project } from "@/lib/projects";

import { ArrowRightIcon } from "./ArrowRightIcon";
import { GithubIcon } from "./GithubIcon";
import { GlobeIcon } from "./GlobeIcon";

export function ProjectCard({ project }: { project: Project }) {
  const router = useRouter();
  return (
    <div
      className="group cursor-pointer"
      onClick={() => router.push(`/projects/${project.id}`)}
    >
      <div className="overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-[#0f0f23]/90 to-[#05050f]/95 backdrop-blur-[20px] transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/20">
        {/* 호버가 되었을 때 */}
        {/* 부모에 객체에 있는 그레디언트를 자연스럽게 opacity를 이용해서 덮어 씌움 */}
        {/* 이렇게 하는 이유는 그레디언트는 transition이 자연스럽지 않기 때문에 이런 방식을 자주 채택함 */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 opacity-0 transition-opacity duration-500 group-hover:opacity-30" />
        <div className="z-10 grid gap-8 p-6 md:grid-cols-[1fr_1.2fr] md:p-10">
          {/* 왼쪽 프로젝트 정보 */}
          <div className="flex flex-col justify-center space-y-6">
            {/* 프로젝트 뱃지*/}
            <div className="mb-2 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span
                  className="rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase backdrop-blur-md"
                  // badge 칼라
                  style={{
                    background: `${project.accentColor}15`,
                    border: `1px solid ${project.accentColor}30`,
                    color: project.accentColor,
                  }}
                >
                  {project.category}
                </span>
                <span className="text-sm text-gray-600">
                  {String(project.id).padStart(2, "0")}
                </span>
              </div>

              {/* 모바일용 자세히 보기 */}
              <div className="text-md flex items-center gap-1 font-medium text-indigo-400 opacity-80 md:hidden">
                <span>클릭하여 상세보기</span>
                <ArrowRightIcon className="h-3 w-3" />
              </div>
            </div>

            <h3 className="bg-gradient-to-br from-white to-[#a0a0a0] bg-clip-text text-3xl leading-tight font-bold tracking-tight text-transparent md:text-4xl">
              {project.title}
            </h3>

            <p className="text-base leading-relaxed text-gray-400">
              {project.description}
            </p>

            {/* 기술스택과 태그 목록 */}
            <div className="flex flex-wrap gap-2.5">
              {project.tech.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-gray-200 backdrop-blur-md transition-all duration-300 hover:scale-105"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* 깃허브 링크 */}
            <div className="flex flex-wrap gap-3 pt-4">
              <div className="flex gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="group/btn relative flex items-center gap-2 overflow-hidden rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${project.accentColor} 0%, ${project.accentColor}dd 100%)`,
                    boxShadow: `0 0 20px ${project.accentColor}30`,
                  }}
                >
                  {/* 여기도 카드와 마찬가지로 hover시에 gradient된 투명한 레이어를 덮어 씌움 */}
                  <span className="absolute inset-0 translate-y-full bg-white/20 transition-transform duration-300 group-hover/btn:translate-y-0" />
                  <GithubIcon className="relative z-10 h-4 w-4" />
                  <span className="relative z-10">GitHub</span>
                </a>
                {/* 사이트 바로 가기 정보 */}
                {project.website && (
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="group/btn relative flex items-center gap-2 overflow-hidden rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium backdrop-blur-md transition-all duration-300 hover:scale-105"
                  >
                    <span className="absolute inset-0 translate-y-full bg-white/20 transition-transform duration-300 group-hover/btn:translate-y-0" />
                    <GlobeIcon className="relative z-10 h-4 w-4" />
                    <span className="relative z-10">사이트 방문</span>
                  </a>
                )}
              </div>

              {/* 테스크탑 버전 상세보기*/}
              <div className="hidden flex-1 items-center justify-end md:flex">
                <span className="group/text flex -translate-x-4 items-center gap-2 text-sm font-medium text-indigo-400 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                  상세 보기
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover/text:translate-x-1" />
                </span>
              </div>
            </div>
          </div>
          {/* 오른쪽 프로젝트 이미지*/}
          <div className="group/img relative aspect-video overflow-hidden rounded-xl md:aspect-auto">
            <div className="absolute inset-0 opacity-50 transition-opacity duration-500 group-hover/img:opacity-70" />

            {/* 이미지에서도 자세히 보기 버튼 추가 */}
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover/img:opacity-100">
              <span className="rounded-full border border-white/30 bg-white/10 px-6 py-2 text-sm font-medium text-white backdrop-blur-md">
                상세 보기
              </span>
            </div>

            <Image
              src={project.thumbnail}
              alt={project.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover/img:scale-110"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
