import React from "react";
import {
  SiAndroid,
  SiAppstore,
  SiSwift,
  SiReact,
  SiFigma,
  SiVisualstudiocode,
} from "react-icons/si";

/** Statik vizual kompozitsiya (Mintrocket uslubi). Hech qanday animatsiya yo‘q */
export default function MintStyleVisual() {
  return (
    <div
      className="relative mx-auto w-full max-w-[560px] h-[440px] md:h-[500px] select-none"
      aria-hidden="true"
    >
      {/* fon nuri */}
      <div className="absolute inset-0 -z-10 rounded-[32px] bg-cyan-500/10 blur-3xl" />

      {/* — kod panel — */}
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

      {/* — palitra/piker — */}
      <div className="absolute left-4 bottom-6 w-[38%] rounded-xl bg-[#0b0f1a]/90 ring-1 ring-white/10 p-3">
        <div className="mb-2 h-8 rounded-lg bg-gradient-to-r from-fuchsia-500/60 via-violet-400/60 to-cyan-400/60" />
        <div className="flex items-center gap-2">
          <div className="h-6 flex-1 rounded bg-white/10" />
          <div className="h-6 w-16 rounded bg-white/10" />
        </div>
      </div>

      {/* — slayder — */}
      <div className="absolute left-1/2 -translate-x-1/2 top-2 w-[42%] rounded-xl bg-[#0b0f1a]/90 ring-1 ring-white/10 p-3">
        <div className="h-1.5 rounded bg-white/15" />
      </div>

      {/* — telefon — */}
      <div className="absolute right-0 top-6 w-[54%] md:w-[50%]">
        <div className="rounded-[28px] border border-white/10 bg-gradient-to-b from-slate-900/85 to-slate-950/85 p-3 shadow-[0_20px_80px_rgba(0,0,0,0.5)]">
          <div className="rounded-[22px] bg-[linear-gradient(180deg,rgba(7,10,20,0.95),rgba(8,12,22,0.92))] ring-1 ring-white/10 p-4">
            {/* status bar */}
            <div className="mb-4 flex items-center justify-between text-[10px] text-white/60">
              <span>09:41</span>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-white/60" />
                <span className="inline-block h-2 w-4 rounded bg-white/60" />
                <span className="inline-block h-2 w-6 rounded bg-white/60" />
              </div>
            </div>

            {/* header card */}
            <div className="rounded-xl bg-gradient-to-br from-violet-600/25 to-cyan-500/15 ring-1 ring-white/10 p-3 mb-3">
              <div className="flex items-center justify-between text-[12px] text-white">
                <span className="font-semibold">AOM App</span>
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/80">
                  v1.0
                </span>
              </div>
            </div>

            {/* grid */}
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

            {/* bottom nav */}
            <div className="mt-4 flex items-center justify-between rounded-xl bg-white/5 px-5 py-3 ring-1 ring-white/10">
              <div className="h-2 w-10 rounded bg-white/60" />
              <div className="h-2 w-10 rounded bg-white/35" />
              <div className="h-2 w-10 rounded bg-white/35" />
            </div>
          </div>
        </div>
      </div>

      {/* — platforma ikonlari (statik “pill”lar) — */}
      <div className="absolute right-[42%] top-[12%]">
        <Badge><SiSwift /></Badge>
      </div>
      <div className="absolute right-[10%] top-[2%]">
        <Badge><SiAppstore /></Badge>
      </div>
      <div className="absolute right-[6%] top-[52%]">
        <Badge><SiAndroid /></Badge>
      </div>
      <div className="absolute left-[6%] top-[52%]">
        <Badge><SiReact /></Badge>
      </div>
      <div className="absolute left-[8%] top-[8%]">
        <Badge><SiFigma /></Badge>
      </div>
      <div className="absolute left-[42%] bottom-[6%]">
        <Badge><SiVisualstudiocode /></Badge>
      </div>
    </div>
  );
}

function Badge({ children }) {
  return (
    <div className="text-white/90 text-sm rounded-full px-3 py-2 bg-white/10 backdrop-blur border border-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
      <div className="flex items-center justify-center text-[16px]">{children}</div>
    </div>
  );
}
