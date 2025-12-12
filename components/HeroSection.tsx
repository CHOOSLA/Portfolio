"use client";

import Particles from "./Particles";

export default function HeroSection() {
  return (
    <div className="relative h-screen w-full">
      <div className="absolute flex min-h-screen w-full items-center justify-center bg-transparent">
        <div className="flex flex-col items-center gap-12">
          <span className="text-4xl">Portfolio</span>
          <div className="flex flex-col items-center gap-4">
            <div className="text-sm tracking-widest text-gray-500 uppercase">
              Scroll to explore
            </div>
            <div className="h-16 w-px animate-pulse bg-gradient-to-b from-gray-500 to-transparent" />
          </div>
        </div>
      </div>
      <Particles
        particleColors={["#ffffff", "#ffffff"]}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={true}
      />
    </div>
  );
}
