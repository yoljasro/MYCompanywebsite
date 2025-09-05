import { Leva } from 'leva';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useMediaQuery } from 'react-responsive';
import { PerspectiveCamera, ContactShadows, Environment, Float } from '@react-three/drei';

import Cube from '../components/Cube.jsx';
import Rings from '../components/Rings.jsx';
import ReactLogo from '../components/ReactLogo.jsx';
import Button from '../components/Button.jsx';
import Target from '../components/Target.jsx';
import CanvasLoader from '../components/Loading.jsx';
import HeroCamera from '../components/HeroCamera.jsx';
import { calculateSizes } from '../constants/index.js';
import { HackerRoom } from '../components/HackerRoom.jsx';

const Hero = () => {
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  const sizes = calculateSizes(isSmall, isMobile, isTablet);

  return (
    <section id="home" className="relative w-full min-h-screen ">
      {/* Яркие градиентные пятна на фоне */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-24 h-80 w-80 rounded-full blur-3xl opacity-35 bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-400" />
        <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full blur-3xl opacity-30 bg-gradient-to-tr from-emerald-400 via-teal-400 to-sky-500" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-64 w-[42rem] rounded-full blur-3xl opacity-25 bg-gradient-to-r from-fuchsia-500/60 via-violet-400/60 to-cyan-400/60" />
      </div>

      {/* Заголовок и подзаголовок */}
      <div className="mx-auto flex flex-col items-center gap-4 sm:mt-32 mt-30 px-4 text-center">
        <p className="text-xs tracking-widest text-white/70 uppercase">
          Премиальные решения для вашего бизнеса
        </p>

        <h1 className="font-extrabold leading-tight text-white text-3xl sm:text-5xl md:text-6xl">
          <span className="bg-gradient-to-r from-fuchsia-400 via-violet-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(168,85,247,0.35)]">
            IT · SMM · INVESTMENT
          </span>
        </h1>

        <p className="max-w-2xl text-white/80 text-sm sm:text-base">
          Технологии + маркетинг + капитал — всё в одной экосистеме.
          Интеграции&nbsp;ИИ, SMM-стратегии, веб/мобильная разработка и инвестиционные проекты.
        </p>

        {/* CTA-кнопки */}
        {/* <div className="mt-2 flex flex-col sm:flex-row items-center gap-3">
          <a href="#contact">
            <Button name="Связаться сейчас" variant="primary" icon />
          </a>
          <a href="#work">
            <Button name="Портфолио" variant="ghost" />
          </a>
        </div> */}

        {/* Плашки-доверия */}
        {/* <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-xs text-white/75">
          <span className="glass-badge">Интеграции ИИ</span>
          <span className="glass-badge">Next.js · React</span>
          <span className="glass-badge">Производительность 95+</span>
        </div> */}
      </div>

      {/* 3D-сцена */}
      <div className="absolute inset-0"  >
        <Canvas className="w-full h-full">
          <Suspense fallback={<CanvasLoader />}>
            <Leva hidden />
            <PerspectiveCamera makeDefault position={[0, 0, 30]} />

            {/* Лёгкий туман + окружающая среда (даёт современный блеск) */}
            <fog attach="fog" args={['#0b0b12', 38, 120]} />
            <Environment preset="city" />

            <HeroCamera isMobile={isMobile}>
              <HackerRoom
                scale={sizes.deskScale}
                position={sizes.deskPosition}
                rotation={[0.08, -Math.PI, 0]}
              />
            </HeroCamera>

            {/* Контрастная подсветка неоновыми прожекторами */}
            <spotLight
              position={[22, 28, 18]}
              angle={0.33}
              intensity={2.35}
              color={'#8ad6ff'}
              penumbra={0.8}
              castShadow
            />
            <spotLight
              position={[-24, 10, 12]}
              angle={0.28}
              intensity={1.8}
              color={'#a855f7'}
              penumbra={0.9}
            />
            <ambientLight intensity={0.4} />

            {/* Вспомогательные 3D-элементы */}
            <group>
              <Target position={sizes.targetPosition} />
              <ReactLogo position={sizes.reactLogoPosition} />
              <Rings position={sizes.ringPosition} />
              <Float floatIntensity={1.3}>
                <Cube position={sizes.cubePosition} />
              </Float>
            </group>

            {/* Мягкие контактные тени под объектами */}
            <ContactShadows
              opacity={0.4}
              scale={90}
              blur={2}
              far={55}
              resolution={1024}
              color="#000000"
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Индикатор прокрутки */}
      <div className="absolute bottom-6 inset-x-0 flex justify-center">
        <a href="#about" className="group inline-flex items-center gap-2 text-white/75 text-sm">
          Прокрутите вниз
          <span className="h-2 w-2 rounded-full bg-white/80 group-hover:translate-y-1 transition-transform"></span>
        </a>
      </div>
    </section>
  );
};

export default Hero;
