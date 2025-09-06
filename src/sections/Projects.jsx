import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls, Environment, ContactShadows, Float } from '@react-three/drei';

import { myProjects } from '../constants/index.js';
import CanvasLoader from '../components/Loading.jsx';
import DemoComputer from '../components/DemoComputer.jsx';

const projectCount = myProjects.length;

const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const wrapRef = useRef(null);
  const touch = useRef({ x: 0, y: 0 });

  const handleNavigation = (direction) => {
    setSelectedProjectIndex((prevIndex) => {
      if (direction === 'previous') return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
      return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
    });
  };

  // Анимации текста
  useGSAP(() => {
    gsap.fromTo(
      '.animatedText',
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.65, stagger: 0.12, ease: 'power2.out' }
    );
  }, [selectedProjectIndex]);

  // Навигация с клавиатуры
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') handleNavigation('previous');
      if (e.key === 'ArrowRight') handleNavigation('next');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Свайп для тач-экрана
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onStart = (e) => (touch.current.x = e.touches[0].clientX);
    const onMove = (e) => {
      const dx = e.touches[0].clientX - touch.current.x;
      if (Math.abs(dx) > 60) {
        handleNavigation(dx > 0 ? 'previous' : 'next');
        touch.current.x = e.touches[0].clientX + (dx > 0 ? 9999 : -9999); // чтобы не дёргалось
      }
    };
    el.addEventListener('touchstart', onStart, { passive: true });
    el.addEventListener('touchmove', onMove, { passive: true });
    return () => {
      el.removeEventListener('touchstart', onStart);
      el.removeEventListener('touchmove', onMove);
    };
  }, []);

  const currentProject = myProjects[selectedProjectIndex];

  return (
    <section className="c-space my-20" id="work" ref={wrapRef} aria-label="Портфолио проектов">
      {/* Заголовок */}
      <div className="text-center relative">
        {/* светящийся штрих фона */}
        <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 h-24 w-[60%] max-w-5xl rounded-full blur-3xl opacity-30 bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400" />
        <p className="text-sm uppercase tracking-widest text-white/70">кейсы и продукты</p>
        <h2 className="head-text mt-1">
          <span className="bg-gradient-to-r from-fuchsia-400 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
            Наши избранные работы
          </span>
        </h2>
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-6 w-full">
        {/* Карточка: описание + теги */}
        <div className="relative sm:p-10 py-8 px-5 rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(168,85,247,0.28)]">
          {/* фоновые орбы */}
          <div className="pointer-events-none absolute -top-20 -right-20 h-80 w-80 rounded-full blur-3xl opacity-30 bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-400" />
          <div className="pointer-events-none absolute -bottom-16 -left-12 h-64 w-64 rounded-full blur-3xl opacity-25 bg-gradient-to-tr from-emerald-400 via-teal-400 to-sky-500" />

          {/* логотип/бейдж проекта */}
          <div className="p-3 rounded-xl bg-white/10 border border-white/15 w-fit relative z-10">
            <img className="w-10 h-10" src={currentProject.logo} alt="Логотип проекта" />
          </div>

          {/* тексты */}
          <div className="flex flex-col gap-4 text-white/85 my-6 relative z-10">
            <h3 className="text-white text-2xl font-semibold animatedText">{currentProject.title}</h3>
            <p className="animatedText">{currentProject.desc}</p>
            {currentProject.subdesc && <p className="animatedText">{currentProject.subdesc}</p>}
          </div>

          {/* теги + CTA */}
          <div className="flex items-center justify-between flex-wrap gap-5 relative z-10">
            <div className="flex items-center gap-2 flex-wrap">
              {currentProject.tags?.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-1 rounded-xl bg-white/10 border border-white/15"
                  aria-label={`Технология: ${tag.name}`}
                >
                  <img src={tag.path} alt="" className="h-4 w-4" />
                  <span className="text-xs text-white/85">{tag.name}</span>
                </div>
              ))}
            </div>

            {currentProject.href && (
              <a
                className="group flex items-center gap-2 cursor-pointer rounded-full px-4 py-2 bg-white/90 text-slate-900 font-semibold shadow-[0_10px_30px_-12px_rgba(168,85,247,0.45)] hover:brightness-95 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300"
                href={currentProject.href}
                target="_blank"
                rel="noreferrer"
                aria-label="Открыть сайт проекта в новой вкладке"
                title="Открыть сайт проекта"
              >
                Смотреть проект
                <img
                  src="/assets/arrow-up.png"
                  alt=""
                  className="w-3 h-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            )}
          </div>

          {/* Навигация */}
          <div className="flex items-center justify-between mt-7 relative z-10">
            <button
              className="arrow-btn hover:brightness-110"
              onClick={() => handleNavigation('previous')}
              aria-label="Предыдущий проект"
              title="Предыдущий"
            >
              <img src="/assets/left-arrow.png" alt="" />
            </button>

            {/* прогресс-точки */}
            <div className="flex items-center gap-2">
              {Array.from({ length: projectCount }).map((_, i) => (
                <span
                  key={i}
                  aria-label={`Проект ${i + 1}`}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    i === selectedProjectIndex ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>

            <button
              className="arrow-btn hover:brightness-110"
              onClick={() => handleNavigation('next')}
              aria-label="Следующий проект"
              title="Следующий"
            >
              <img src="/assets/right-arrow.png" alt="" className="w-4 h-4" />
            </button>
          </div>

          {/* декоративный блик */}
          <span className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(90deg,transparent,white,transparent)] opacity-0 hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-white/5 via-white/20 to-white/5" />
        </div>

        {/* 3D-сцена */}
        <div className="relative border border-white/10 bg-black/40 rounded-2xl h-96 md:h-full overflow-hidden">
          {/* фон-градиент */}
          <div className="absolute -bottom-28 -left-28 h-80 w-80 rounded-full blur-3xl opacity-25 bg-gradient-to-tr from-emerald-400 via-teal-400 to-sky-500" />
          <Canvas>
            <Suspense fallback={<CanvasLoader />}>
              <Environment preset="city" />
              <ambientLight intensity={0.45} />
              <spotLight position={[20, 25, 18]} angle={0.35} intensity={2.1} color={'#8ad6ff'} penumbra={0.9} castShadow />
              <spotLight position={[-18, 8, 10]} angle={0.3} intensity={1.6} color={'#a855f7'} penumbra={0.8} />

              <Center>
                <Float floatIntensity={0.9} rotationIntensity={0.2}>
                  <group scale={2.25} position={[0, -3, 0]} rotation={[0, -0.08, 0]}>
                    <DemoComputer texture={currentProject.texture} />
                  </group>
                </Float>
              </Center>

              <ContactShadows opacity={0.35} scale={80} blur={2} far={50} resolution={1024} color="#000000" />
              <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false} />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </section>
  );
};

export default Projects;
