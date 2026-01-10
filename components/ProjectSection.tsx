import { ProjectCard } from "./base/ProjectCard";

export default function ProjectSection() {
  return (
    // 제일 큰 부분
    <section className="min-h-screen w-full overflow-hidden bg-black px-6 py-32 md:px-12 lg:px-24">
      {/* 전체에 일관된 margin을 넣음 */}
      <div className="mx-auto max-w-7xl">
        <div className="mb-32 text-center">
          <h2 className="mb-8 text-6xl leading-none font-bold tracking-tight text-white md:text-8xl lg:text-9xl">
            {/* 그레디언트를 생성하고 Text에 맞게 Clip을 따냄
                그 다음에 텍스트를 투명하게 만듦 */}
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Featured
            </span>
            <span className="mt-4 block text-white/90">Project</span>
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-400 md:text-xl">
            프론트엔드 개발
          </p>

          {/* 절취선 */}
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-gray-400" />
            <div className="h-2 w-2 animate-pulse rounded-full bg-white" />
            <div className="h-px w-24 bg-gradient-to-r from-gray-400 to-transparent" />
          </div>
        </div>

        {/* 프로젝트 카드 섹션 */}
        <div>
          {/* 그레디언트된 카드 */}
          <ProjectCard />
        </div>
      </div>
    </section>
  );
}
