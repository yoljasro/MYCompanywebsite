import React from "react";

/* ---------- Inline badge + ikonlar ---------- */
const IconBadge = ({ children }) => (
  <div className="text-white/90 text-sm rounded-full px-3 py-2 bg-white/10 backdrop-blur border border-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
    <div className="flex items-center justify-center">{children}</div>
  </div>
);
const Svg = (p) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p} />;
const IconSwift = () => (
  <Svg><path d="M20 6c-2 4-6 5-9 2 2 2 3 4 3 5-3-1-6-4-8-7 2 4 4 7 7 9-1 1-3 1-5 0 3 3 7 4 10 2 2-1 3-3 3-6 0-2-1-4-1-5Z" fill="currentColor"/></Svg>
);
const IconAppStore = () => (
  <Svg>
    <path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" fill="currentColor" opacity=".1"/>
    <path d="M7 16h10M8.5 13l3.5-6m3.5 6-3.5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </Svg>
);
const IconAndroid = () => (
  <Svg>
    <rect x="5" y="9" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="2"/>
    <circle cx="9" cy="7" r="1" fill="currentColor"/><circle cx="15" cy="7" r="1" fill="currentColor"/>
    <path d="M8 4l-1-1M16 4l1-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M5 12v4M19 12v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </Svg>
);
const IconReact = () => (
  <Svg>
    <circle cx="12" cy="12" r="2" fill="currentColor"/>
    <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="currentColor" strokeWidth="1.6" transform="rotate(60 12 12)"/>
    <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="currentColor" strokeWidth="1.6" transform="rotate(-60 12 12)"/>
    <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="currentColor" strokeWidth="1.6"/>
  </Svg>
);
const IconFigma = () => (
  <Svg>
    <path d="M10 3h2a3 3 0 1 1 0 6h-2V3Z" fill="currentColor"/>
    <path d="M10 9h2a3 3 0 1 1 0 6h-2V9Z" fill="currentColor" opacity=".8"/>
    <path d="M10 15h1a3 3 0 1 1-3 3v-1a2 2 0 0 1 2-2Z" fill="currentColor" opacity=".7"/>
    <path d="M8 3h2v6H8a3 3 0 1 1 0-6Z" fill="currentColor" opacity=".6"/>
    <path d="M8 9h2v6H8a3 3 0 1 1 0-6Z" fill="currentColor" opacity=".45"/>
  </Svg>
);
const IconVSCode = () => (
  <Svg><path d="M18 4 11 8 7 6 3 9l4 3-4 3 4 3 4-2 7 4V4Z" fill="currentColor" opacity=".9"/></Svg>
);

/* ---------- O‘ng tomondagi Mintrocket-uslubidagi vizual ---------- */
const MintStyleVisual = () => {
  return (
    <div
      className="relative mx-auto select-none"
      style={{ width: "420px" }} /* default */
    >
      {/* responsive widthlar */}
      <style>{`
        @media (min-width: 768px){ .msv-w { width:500px } }
        @media (min-width: 1024px){ .msv-w { width:560px } }
      `}</style>
      <div className="msv-w" />

      {/* wrapper balandligi */}
      <div className="relative h-[420px] md:h-[500px]">
        {/* yumshoq orqa nurlanish */}
        <div className="absolute inset-0 -z-10 rounded-[32px] bg-cyan-500/10 blur-3xl" />

        {/* Kod paneli */}
        <div className="absolute left-0 top-6 w-[56%] h-[48%] rounded-2xl bg-[#0b0f1a]/90 ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.45)] p-3">
          <div className="flex items-center gap-2 text-[10px] text-white/50 mb-3">
            <span className="inline-block h-2 w-2 rounded-full bg-rose-400/70" />
            <span className="inline-block h-2 w-2 rounded-full bg-amber-400/70" />
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400/70" />
            <span className="ml-2">App.tsx</span>
          </div>
          <div className="space-y-2 text-[11px] leading-4">
            <div className="h-3 w-11/12 rounded bg-white/10" />
            <div className="h-3 w-8/12 rounded bg-white/10" />
            <div className="h-3 w-9/12 rounded bg-white/10" />
            <div className="h-3 w-7/12 rounded bg-white/10" />
            <div className="h-3 w-10/12 rounded bg-white/10" />
          </div>
        </div>

        {/* Palitra paneli */}
        <div className="absolute left-4 bottom-6 w-[38%] rounded-xl bg-[#0b0f1a]/90 ring-1 ring-white/10 p-3">
          <div className="mb-2 h-8 rounded-lg bg-gradient-to-r from-fuchsia-500/60 via-violet-400/60 to-cyan-400/60" />
          <div className="flex items-center gap-2">
            <div className="h-6 flex-1 rounded bg-white/10" />
            <div className="h-6 w-16 rounded bg-white/10" />
          </div>
        </div>

        {/* Slayder paneli */}
        <div className="absolute left-1/2 -translate-x-1/2 top-2 w-[42%] rounded-xl bg-[#0b0f1a]/90 ring-1 ring-white/10 p-3">
          <div className="h-1.5 rounded bg-white/15" />
        </div>

        {/* Telefon maketi */}
        <div className="absolute right-0 top-6 w-[54%] md:w-[50%]">
          <div className="rounded-[28px] border border-white/10 bg-gradient-to-b from-slate-900/85 to-slate-950/85 p-3 shadow-[0_20px_80px_rgba(0,0,0,0.5)]">
            <div className="rounded-[22px] bg-[linear-gradient(180deg,rgba(7,10,20,0.95),rgba(8,12,22,0.92))] ring-1 ring-white/10 p-4">
              <div className="mb-4 flex items-center justify-between text-[10px] text-white/60">
                <span>09:41</span>
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-white/60" />
                  <span className="inline-block h-2 w-4 rounded bg-white/60" />
                  <span className="inline-block h-2 w-6 rounded bg-white/60" />
                </div>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-violet-600/25 to-cyan-500/15 ring-1 ring-white/10 p-3 mb-3">
                <div className="flex items-center justify-between text-[12px] text-white">
                  <span className="font-semibold">AOM App</span>
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/80">v1.0</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-white/5 ring-1 ring-white/10 h-14" />
                <div className="rounded-lg bg-white/5 ring-1 ring-white/10 h-14" />
                <div className="col-span-2 rounded-lg bg-white/5 ring-1 ring-white/10 h-16" />
                <div className="rounded-lg bg-white/5 ring-1 ring-white/10 h-12 p-2">
                  <div className="text-[11px] text-white/70">Push / Авторизация</div>
                </div>
                <div className="rounded-lg bg-white/5 ring-1 ring-white/10 h-12 p-2">
                  <div className="text-[11px] text-white/70">Платежи</div>
                </div>
                <div className="col-span-2 rounded-lg bg-white/5 ring-1 ring-white/10 h-14 p-2">
                  <div className="text-[11px] text-white/70">Аналитика</div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between rounded-xl bg-white/5 px-5 py-3 ring-1 ring-white/10">
                <div className="h-2 w-10 rounded bg-white/60" />
                <div className="h-2 w-10 rounded bg-white/35" />
                <div className="h-2 w-10 rounded bg-white/35" />
              </div>
            </div>
          </div>
        </div>

        {/* Atrofdagi badge-ikonlar */}
        <div className="absolute right-[42%] top-[12%] text-cyan-300">
          <IconBadge><IconSwift /></IconBadge>
        </div>
        <div className="absolute right-[10%] top-[2%] text-white">
          <IconBadge><IconAppStore /></IconBadge>
        </div>
        <div className="absolute right-[6%] top-[52%] text-emerald-300">
          <IconBadge><IconAndroid /></IconBadge>
        </div>
        <div className="absolute left-[6%] top-[52%] text-sky-300">
          <IconBadge><IconReact /></IconBadge>
        </div>
        <div className="absolute left-[8%] top-[8%] text-pink-300">
          <IconBadge><IconFigma /></IconBadge>
        </div>
        <div className="absolute left-[42%] bottom-[6%] text-indigo-300">
          <IconBadge><IconVSCode /></IconBadge>
        </div>
      </div>
    </div>
  );
};

/* ---------- Hero bo‘limi ---------- */
const Hero = () => {
  return (
    <section id="home" className="relative w-full bg-transparent" aria-label="Мобильные приложения и веб-сервисы">
      {/* fon blur “blob”lar */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl opacity-30 bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-400" />
        <div className="absolute bottom-0 right-0 h-[26rem] w-[26rem] rounded-full blur-3xl opacity-25 bg-gradient-to-tr from-emerald-400 via-teal-400 to-sky-500" />
      </div>

      {/* Grid: endi siqilmaydi */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 pt-28 pb-16 md:[grid-template-columns:1.1fr_0.9fr] md:items-center md:pt-36 lg:gap-16">
        {/* Chap — matn */}
        <div>
          <p className="text-xs tracking-widest text-white/70 uppercase">Мобильные приложения и веб-сервисы</p>
          <h1 className="mt-2 font-extrabold leading-tight text-white text-3xl sm:text-5xl md:text-6xl">
            <span className="bg-gradient-to-r from-fuchsia-400 via-violet-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(168,85,247,0.35)]">
              Создаём мобильные приложения
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-white/80 text-sm sm:text-base">
            Команда AOM закрывает полный цикл под iOS и Android: дизайн, backend, интеграции и релиз.
            Авторизация, платежи, push-уведомления, аналитика и CI/CD. Акцент — на скорость, стабильность и премиальный UX.
          </p>
          <ul className="mt-5 grid grid-cols-1 gap-2 text-white/85 sm:grid-cols-2">
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" />Swift / Kotlin / React Native</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />Дизайн-система и UI-Kit</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-violet-300" />API и микросервисы</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />Выход в App Store / Google Play</li>
          </ul>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a href="/contact" className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 font-medium text-slate-900 shadow-lg shadow-fuchsia-500/10 hover:opacity-95">Получить консультацию</a>
            <a href="/mobile" className="inline-flex items-center justify-center rounded-xl border border-white/20 px-5 py-3 font-medium text-white/90 hover:bg-white/5">Наши работы</a>
          </div>
        </div>

        {/* O‘ng — vizual: ustun siqilmasligi uchun min-width */}
        <div className="md:justify-self-end min-w-[360px] lg:min-w-[420px]">
          <MintStyleVisual />
        </div>
      </div>
    </section>
  );
};

export default Hero;
