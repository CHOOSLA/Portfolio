"use client";

import { useEffect, useRef } from "react";

interface StarfieldProps {
  className?: string; // 위치 잡을 때 쓰는 클래스
  density?: number; // 별 개수
  speed?: number; // 별이 움직이는 속도
  triggerRef?: React.RefObject<HTMLElement | null>; // 스크롤 기준이 될 요소 (없으면 윈도우 스크롤 기준)
}

export default function Starfield({
  className = "",
  density = 250,
  speed = 0.5,
  triggerRef,
}: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let scrollY = 0;

    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
      // 특정 섹션 기준으로 스크롤 계산
      if (triggerRef?.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        const sectionTop = rect.top;
        const windowHeight = window.innerHeight;
        // ProjectSection 로직: 섹션이 뷰포트에 있을 때 움직임 처리
        scrollY = Math.max(0, (windowHeight - sectionTop) * 0.3);
      } else {
        // 기본 동작: 전체 윈도우 스크롤 기준
        scrollY = window.scrollY;
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    const stars: Array<{
      x: number;
      y: number;
      baseY: number;
      z: number;
      size: number;
    }> = [];

    const resize = () => {
      // 캔버스 크기 조절 (fixed면 화면 전체, 아니면 부모 크기)
      const isFixed = getComputedStyle(canvas).position === "fixed";

      if (isFixed) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      } else {
        canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
        canvas.height =
          canvas.parentElement?.offsetHeight || window.innerHeight;
      }
    };

    resize();
    window.addEventListener("resize", resize);

    // 별 초기화
    for (let i = 0; i < density; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      stars.push({
        x,
        y,
        baseY: y,
        z: Math.random() * 1000,
        size: Math.random() * 2 + 0.5,
      });
    }

    const animate = () => {
      // 프레임마다 캔버스 지워주기 (잔상 제거)
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        const depth = 1 - star.z / 1000;
        const movement = scrollY * depth * speed;
        let currentY = (star.baseY - movement) % canvas.height;
        if (currentY < 0) currentY += canvas.height;

        const size = star.size * depth;

        ctx.beginPath();
        ctx.arc(star.x, currentY, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${depth})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [density, speed, triggerRef]);

  return (
    <canvas ref={canvasRef} className={`pointer-events-none ${className}`} />
  );
}
