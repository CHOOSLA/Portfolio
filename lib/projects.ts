// MDX 파일을 이용해 프로젝트 설명을 구성
// 공식 문서 : https://nextjs-ko.org/docs/pages/building-your-application/configuring/mdx#frontmatter
// 참고한 코드 : https://github.com/vercel/examples/blob/main/solutions/blog/app/blog/utils.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Project {
  id: Number;
  title: string;
  description: string;
  accentColor: string;
  tech: string[];
  github: string;
  website: string;
  thumbnail: string;
  alt: string;
  category: string;
  detailedDescription?: string;
  overview: {
    title: string;
    description: string;
    highlights: string[];
  };
  challenges: {
    title: string;
    description: string;
    technicalDetails: string[];
    solution: {
      title: string;
      description: string;
      technicalDetails: string[];
      codeExample?: string;
    };
  }[];
  retrospective: {
    title: string;
    description: string[];
  };
}

export function getAllProjects(): Project[] {
  // 코드 53번줄
  const projectsDir = path.join(process.cwd(), "content");

  // 코드 33번줄
  const fileNames = fs
    .readdirSync(projectsDir)
    .filter((file) => path.extname(file) === ".mdx");

  // 파일을 순회하면서 파싱
  const projectDatas = fileNames.map((fileName) => {
    const slug = path.basename(fileName, path.extname(fileName)); // 코드 42번줄 파일 이름을 지우고 라우터 경로로 지정

    const fullPath = path.join(projectsDir, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // gray-matter를 통해서 mdx 파일을 파싱
    // 메타 데이터와 본문을 분리해서 파싱
    const { data, content } = matter(fileContents);

    // 파싱된 것을 리턴
    return {
      slug,
      content,
      ...data,
    } as unknown as Project;
  });

  return projectDatas.sort((a, b) => {
    if (a.id > b.id) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getProjectById(id: number): Project | undefined {
  const allProjects = getAllProjects();
  return allProjects.find((project) => project.id === id);
}
