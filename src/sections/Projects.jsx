import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls, Environment, ContactShadows, Float } from '@react-three/drei';

import { myProjects } from '../constants/index.js';
import CanvasLoader from '../components/Loading.jsx';
import DemoComputer from '../components/DemoComputer.jsx';

const projectCount = myProjects.length;

const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  const handleNavigation = (direction) => {
    setSelectedProjectIndex((prevIndex) => {
      if (direction === 'previous') return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
      return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
    });
  };

  useGSAP(() => {
    gsap.fromTo(
      '.animatedText',
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power2.out' }
    );
  }, [selectedProjectIndex]);

  const currentProject = myProjects[selectedProjectIndex];

  return (
    <section className="c-space my-20" id="work">
      {/* Sarlavha */}
      <div className="text-center">
        <p className="text-sm uppercase tracking-widest text-white/70">кейсы и продукты</p>
        <h2 className="head-text mt-1">
          <span className="bg-gradient-to-r from-fuchsia-400 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
            Наши избранные работы
          </span>
        </h2>
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-6 w-full">
        {/* KARTA: matn + info */}
        <div className="relative sm:p-10 py-8 px-5 rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(168,85,247,0.25)]">
          {/* Neon “spotlight” fon */}
          <div className="pointer-events-none absolute -top-16 -right-16 h-72 w-72 rounded-full blur-3xl opacity-30 bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-400" />

          {/* Logo / badge */}
          <div className="p-3 rounded-lg bg-white/10 border border-white/15 w-fit relative z-10">
            <img className="w-10 h-10 shadow-sm" src={currentProject.logo} alt="logo" />
          </div>

          {/* Matn */}
          <div className="flex flex-col gap-4 text-white/80 my-6 relative z-10">
            <p className="text-white text-2xl font-semibold animatedText">{currentProject.title}</p>
            <p className="animatedText">{currentProject.desc}</p>
            <p className="animatedText">{currentProject.subdesc}</p>
          </div>

          {/* Teglar + CTA */}
          <div className="flex items-center justify-between flex-wrap gap-5 relative z-10">
            <div className="flex items-center gap-2 flex-wrap">
              {currentProject.tags.map((tag, index) => (
                <div key={index} className="flex items-center gap-2 px-3 py-1 rounded-xl bg-white/10 border border-white/15">
                  <img src={tag.path} alt={tag.name} className="h-4 w-4" />
                  <span className="text-xs text-white/80">{tag.name}</span>
                </div>
              ))}
            </div>

            <a
              className="flex items-center gap-2 cursor-pointer text-white hover:text-white/90 transition"
              href={currentProject.href}
              target="_blank"
              rel="noreferrer"
              title="Открыть проект в новой вкладке"
            >
              <span className="hidden sm:inline">Смотреть сайт</span>
              <img src="/assets/arrow-up.png" alt="arrow" className="w-3 h-3" />
            </a>
          </div>

          {/* Navigatsiya tugmalari */}
          <div className="flex justify-between items-center mt-7 relative z-10">
            <button className="arrow-btn hover:brightness-110" onClick={() => handleNavigation('previous')}>
              <img src="/assets/left-arrow.png" alt="previous" />
            </button>

            <div className="text-xs text-white/60">
              {selectedProjectIndex + 1} / {projectCount}
            </div>

            <button className="arrow-btn hover:brightness-110" onClick={() => handleNavigation('next')}>
              <img src="/assets/right-arrow.png" alt="next" className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3D sahna */}
        <div className="relative border border-white/10 bg-black/40 rounded-2xl h-96 md:h-full overflow-hidden">
          {/* Neon gradient fon */}
          <div className="absolute -bottom-28 -left-28 h-80 w-80 rounded-full blur-3xl opacity-25 bg-gradient-to-tr from-emerald-400 via-teal-400 to-sky-500" />
          <Canvas>
            <Suspense fallback={<CanvasLoader />}>
              {/* Muhit va chiroqlar */}
              <Environment preset="city" />
              <ambientLight intensity={0.4} />
              <spotLight position={[20, 25, 18]} angle={0.35} intensity={2.1} color={'#8ad6ff'} penumbra={0.9} castShadow />
              <spotLight position={[-18, 8, 10]} angle={0.3} intensity={1.6} color={'#a855f7'} penumbra={0.8} />

              <Center>
                <Float floatIntensity={0.8} rotationIntensity={0.15}>
                  <group scale={2.2} position={[0, -3, 0]} rotation={[0, -0.08, 0]}>
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
