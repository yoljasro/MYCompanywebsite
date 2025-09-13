import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import {
  PerspectiveCamera,
  ContactShadows,
  Environment,
  Float,
  AdaptiveDpr,
  AdaptiveEvents,
  PerformanceMonitor,
  Bounds, // <= YANGI
} from "@react-three/drei";

import { Leva } from "leva";

import Cube from "../components/Cube.jsx";
import Rings from "../components/Rings.jsx";
import ReactLogo from "../components/ReactLogo.jsx";
import Target from "../components/Target.jsx";
import CanvasLoader from "../components/Loading.jsx";
// import HeroCamera from "../components/HeroCamera.jsx"; // <-- olib tashladik
import { calculateSizes } from "../constants/index.js";
import { HackerRoom } from "../components/HackerRoom.jsx";

const Hero = () => {
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  const sizes = useMemo(
    () => calculateSizes(isSmall, isMobile, isTablet),
    [isSmall, isMobile, isTablet]
  );

  // ====== Lazy render 3D faqat vьюport ichida bo'lsa ======
  const containerRef = useRef(null);
  const [showScene, setShowScene] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowScene(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  // DPR va GL sozlamalari (mobilga yengilroq)
  const dpr = useMemo(() => (isMobile ? [1, 1.3] : [1, 1.8]), [isMobile]);
  const glOptions = useMemo(
    () => ({
      powerPreference: "high-performance",
      antialias: !isMobile,
      alpha: true,
      stencil: false,
      depth: true,
      preserveDrawingBuffer: false,
    }),
    [isMobile]
  );

  // Sahnani bitta guruhga jamlaymiz — Bounds shu guruhni “fit” qiladi
  const SceneContent = () => (
    <group>
      <HackerRoom
        scale={sizes.deskScale}
        position={sizes.deskPosition}
        rotation={[0.08, -Math.PI, 0]}
      />

      <group>
        <Target position={sizes.targetPosition} />
        {!isSmall && <ReactLogo position={sizes.reactLogoPosition} />}
        {!isSmall && <Rings position={sizes.ringPosition} />}
        <Float floatIntensity={isMobile ? 0.9 : 1.3}>
          <Cube position={sizes.cubePosition} />
        </Float>
      </group>
    </group>
  );

  return (
    <section id="home" className="relative w-full min-h-[100svh]">
      {/* BG blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-24 h-80 w-80 rounded-full blur-3xl opacity-35 bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-400" />
        <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full blur-3xl opacity-30 bg-gradient-to-tr from-emerald-400 via-teal-400 to-sky-500" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-64 w-[42rem] rounded-full blur-3xl opacity-25 bg-gradient-to-r from-fuchsia-500/60 via-violet-400/60 to-cyan-400/60" />
      </div>

      {/* Title */}
      <div className="mx-auto flex flex-col items-center gap-4 sm:mt-48 mt-44 px-4 text-center">
        <p className="text-xs tracking-widest text-white/70 uppercase">
          Премиальные решения для вашего бизнеса
        </p>
        <h1 className="font-extrabold leading-tight text-white text-3xl sm:text-5xl md:text-6xl">
          <span className="bg-gradient-to-r from-fuchsia-400 via-violet-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(168,85,247,0.35)]">
            IT · SMM · INVESTMENT
          </span>
        </h1>
        <p className="max-w-2xl text-white/80 text-sm sm:text-base">
          Технологии + маркетинг + капитал — всё в одной экосистеме. Интеграции&nbsp;ИИ,
          SMM-стратегии, веб/мобильная разработка и инвестиционные проекты.
        </p>
      </div>

      {/* 3D: to'liq ekran, doimiy to'liq ko'rinish */}
      <div ref={containerRef} className="relative w-full h-[100svh] overflow-hidden">
        {showScene ? (
          <Canvas
            className="w-full h-full"
            dpr={dpr}
            gl={glOptions}
            shadows
            resize={{ scroll: false, debounce: { scroll: 50, resize: 50 } }}
          >
            <Suspense fallback={<CanvasLoader />}>
              <Leva hidden />
              <PerformanceMonitor />
              <AdaptiveDpr pixelated />
              <AdaptiveEvents />

              {/* Kameraga start pozitsiya beramiz, lekin Bounds uni qayta joylaydi */}
              <PerspectiveCamera makeDefault position={[0, 0, 30]} />
              <fog attach="fog" args={["#0b0b12", 45, 120]} />
              <Environment preset="city" background={false} blur={0.7} />

              {/* MAGIC: sahnani har doim to‘liq sig‘dirish */}
              <Bounds fit clip observe margin={1.15}>
                <SceneContent />
              </Bounds>

              <ContactShadows
                opacity={0.35}
                scale={90}
                blur={2.2}
                far={60}
                resolution={isMobile ? 512 : 1024}
                color="#000000"
              />
            </Suspense>
          </Canvas>
        ) : (
          <div className="absolute inset-0 grid place-items-center text-white/60 text-sm">
            Загрузка интерактивной сцены…
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 inset-x-0 flex justify-center">
        <a href="#about" className="group inline-flex items-center gap-2 text-white/75 text-sm">
          Прокрутите вниз
          <span className="h-2 w-2 rounded-full bg-white/80 group-hover:translate-y-1 transition-transform" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
