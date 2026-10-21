import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import { FileVaultEffect } from './FileVaultEffect';
import * as THREE from 'three';

const SceneContent = ({ progress }: { progress: number }) => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      <FileVaultEffect progress={progress} />

      <Environment preset="city" />
      <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
    </>
  );
};

const CanvasOverlay = ({ progress }: { progress: number }) => {
  // Text appears between 0.3-0.5 of scroll and fades out after 0.7
  const textAlpha = THREE.MathUtils.smoothstep(progress, 0.25, 0.4) * (1 - THREE.MathUtils.smoothstep(progress, 0.6, 0.75));
  const textY = THREE.MathUtils.lerp(20, 0, THREE.MathUtils.smoothstep(progress, 0.25, 0.4));

  return (
    <div
      className="absolute inset-0 pointer-events-none flex flex-col items-center justify-start pt-56 px-10"
      style={{
        opacity: textAlpha,
        transform: `translateY(${textY}px)`,
        transition: 'opacity 120ms linear, transform 120ms linear',
      }}
    >
      <div className="max-w-4xl text-center space-y-4">
        <span className="text-blue-500 font-mono text-xs uppercase tracking-[0.5em] block mb-2">Automated Capture</span>
        <h2 className="text-6xl md:text-7xl font-premium text-white leading-[1.1]">
          Seamless Tab <br /> <span className="text-white/40 italic font-serif -tracking-widest">Gathering</span>
        </h2>
        <p className="text-white/50 max-w-lg mx-auto pt-6 text-sm tracking-wide">
          Scroll down to witness your cluttered tabs transform into a beautifully structured digital vault. Our proprietary grouping engine handles everything.
        </p>
      </div>
    </div>
  );
};

export const Scene = () => {
  const canvasSectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const section = canvasSectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      // Section is 140vh, calculate scroll progress from when it enters viewport
      const sectionStart = rect.top;
      const sectionHeight = section.offsetHeight;
      
      // Progress: 0 when section top reaches viewport, 1 when section fully scrolled past
      const scrolledIntoView = Math.max(0, viewportHeight - sectionStart);
      const nextProgress = Math.min(1, scrolledIntoView / Math.max(sectionHeight, 1));

      setProgress(nextProgress);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  const clampedProgress = useMemo(() => THREE.MathUtils.clamp(progress, 0, 1), [progress]);

  return (
    <div className="relative bg-[#050505] text-white">
      <section className="min-h-screen flex flex-col items-center justify-center p-10">
        <div className="max-w-5xl text-center space-y-4">
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-blue-500 mb-4 opacity-80">EST. 2024 — DIGITAL ARCHIVE</span>
            <h1 className="text-[18vw] md:text-[15vw] font-premium leading-[0.8] tracking-[-0.04em] uppercase text-white">
              LINK<span className="text-blue-500">VAULT</span>
            </h1>
          </div>

          <p className="text-xl md:text-3xl text-white/80 font-serif italic max-w-2xl mx-auto leading-relaxed mt-8">
            The ultra-premium way to organize your digital universe.
            One click, <span className="text-white font-bold not-italic">infinite order.</span>
          </p>

          <div className="pt-16">
            <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl transition-all cursor-pointer group">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">Begin Exploration</span>
              <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      <section ref={canvasSectionRef} className="relative mt-20" style={{ height: '220vh' }}>
        <div className="sticky top-0 w-full h-screen">
          <Canvas shadows dpr={[1, 2]}>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
            <SceneContent progress={clampedProgress} />
          </Canvas>
          <CanvasOverlay progress={clampedProgress} />
        </div>
      </section>
    </div>
  );
};
