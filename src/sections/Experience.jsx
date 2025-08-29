import { Suspense, useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float } from '@react-three/drei';

import Developer from '../components/Developer.jsx';
import CanvasLoader from '../components/Loading.jsx';
import { workExperiences } from '../constants/index.js';

const WorkExperience = () => {
  const [animationName, setAnimationName] = useState('idle');
  const activeKey = useMemo(() => animationName?.toLowerCase(), [animationName]);

  return (
    <section className="c-space my-20" id="work">
      {/* Sarlavha */}
      <div className="text-center">
        <p className="text-xs uppercase tracking-widest text-white/70">путь и компетенции</p>
        <h2 className="head-text mt-1">
          <span className="bg-gradient-to-r from-fuchsia-400 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
            Опыт работы
          </span>
        </h2>
      </div>

      {/* Yonma-yon layout */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* 3D ustun — sticky */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 lg:sticky lg:top-24 h-[420px] md:h-[520px]">
          {/* Neon fon bloblari */}
          <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full blur-3xl opacity-30 bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-400 pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full blur-3xl opacity-25 bg-gradient-to-tr from-emerald-400 via-teal-400 to-sky-500 pointer-events-none" />

          <Canvas shadows>
            <Suspense fallback={<CanvasLoader />}>
              <Environment preset="city" />
              <ambientLight intensity={0.45} />
              <spotLight position={[20, 25, 18]} angle={0.35} intensity={2.0} color={'#8ad6ff'} penumbra={0.9} castShadow />
              <spotLight position={[-18, 8, 10]} angle={0.3} intensity={1.5} color={'#a855f7'} penumbra={0.8} />

              <Float floatIntensity={0.7} rotationIntensity={0.1}>
                <group position={[0, -3, 0]} rotation={[0, 0.12, 0]} scale={3}>
                  <Developer animationName={animationName} />
                </group>
              </Float>

              <ContactShadows opacity={0.35} scale={80} blur={2} far={55} resolution={1024} color="#000000" />
              <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} />
            </Suspense>
          </Canvas>
        </div>

        {/* Kontent ustun */}
        <div className="flex flex-col gap-4">
          {workExperiences.map((item, idx) => {
            const key = item.animation?.toLowerCase?.() || `item-${idx}`;
            const isActive = key === activeKey && key !== 'idle';

            return (
              <button
                type="button"
                key={idx}
                onClick={() => setAnimationName(key)}
                onPointerOver={() => setAnimationName(key)}
                onPointerOut={() => setAnimationName('idle')}
                className={`text-left relative rounded-2xl border transition-all duration-300 p-4 sm:p-5
                  ${isActive
                    ? 'border-violet-400/60 bg-white/10 shadow-[0_20px_60px_-20px_rgba(168,85,247,0.35)]'
                    : 'border-white/10 bg-white/5 hover:bg-white/7'}`}
              >
                <span className={`absolute inset-x-0 -top-px h-[2px] rounded-t-2xl
                  ${isActive ? 'bg-gradient-to-r from-fuchsia-500 via-violet-400 to-cyan-400/90' : 'bg-white/10'}`} />

                <div className="flex items-start gap-4">
                  <div className={`rounded-xl overflow-hidden border min-w-12 min-h-12 ${isActive ? 'border-violet-400/60' : 'border-white/15'}`}>
                    <img src={item.icon} alt={item.name} className="w-12 h-12 object-contain" />
                  </div>

                  <div className="flex-1">
                    <p className="font-bold text-white">{item.name}</p>
                    <p className="text-sm mb-3 text-white/70">
                      {item.pos} · <span className="text-white/80">{item.duration}</span>
                    </p>
                    <p className={`transition-colors ${isActive ? 'text-white' : 'text-white/70 hover:text-white'}`}>
                      {item.title}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
