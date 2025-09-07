// src/pages/OurServicesMini.jsx
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaGlobe, FaPaperPlane, FaMobileAlt, FaBrain, FaArrowRight } from "react-icons/fa";

const CARDS = [
  { key: "web",    title: "Веб-сайты",            desc: "Лендинги, магазины, порталы. Скорость и SEO.",          to: "/itprojects",    icon: FaGlobe,       theme: "violet" },
  { key: "bots",   title: "Telegram-боты",        desc: "Витрины, оплаты, CRM, рассылки.",                      to: "/telegrambots",   icon: FaPaperPlane,  theme: "cyan"   },
  { key: "mobile", title: "Мобильные приложения", desc: "iOS/Android, оффлайн-режим, пуш-уведомления.",         to: "/mobile", icon: FaMobileAlt,   theme: "pink"   },
  { key: "ai",     title: "AI-проекты",           desc: "RAG, ассистенты, генерация контента.",                 to: "/ai",     icon: FaBrain,       theme: "lime"   },
];

export default function OurServicesMini() {
  // ===== Infinite animated background (stars + soft orbs) =====
  const canvasRef = useRef(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    let raf;

    const DPR = Math.min(2, window.devicePixelRatio || 1);
    const resize = () => {
      c.width = Math.floor(c.clientWidth * DPR);
      c.height = Math.floor(c.clientHeight * DPR);
    };
    resize();

    // stars
    const N = 160;
    const stars = Array.from({ length: N }).map(() => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      r: (Math.random() * 1.4 + 0.4) * DPR,
      vx: (Math.random() - 0.5) * 0.25 * DPR,
      vy: (Math.random() - 0.5) * 0.25 * DPR,
      a: Math.random() * Math.PI * 2
    }));

    // slow drifting orbs
    const orbs = Array.from({ length: 3 }).map((_, i) => ({
      x: (0.2 + 0.3 * i) * c.width,
      y: (0.28 + 0.26 * i) * c.height,
      r: (220 + 90 * i) * DPR,
      t: Math.random() * 1000,
      hue: 220 + i * 60
    }));

    const draw = () => {
      // soft gradient bg
      const g = ctx.createLinearGradient(0, 0, c.width, c.height);
      g.addColorStop(0, "#07080d");
      g.addColorStop(1, "#0b0f1a");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, c.width, c.height);

      // orbs
      orbs.forEach((o, i) => {
        o.t += 0.003;
        const ox = o.x + Math.cos(o.t + i) * 40 * DPR;
        const oy = o.y + Math.sin(o.t * 0.8 + i) * 36 * DPR;
        const rg = ctx.createRadialGradient(ox, oy, 0, ox, oy, o.r);
        rg.addColorStop(0, `hsla(${o.hue}, 90%, 60%, .18)`);
        rg.addColorStop(1, "transparent");
        ctx.fillStyle = rg;
        ctx.beginPath(); ctx.arc(ox, oy, o.r, 0, Math.PI * 2); ctx.fill();
      });

      // stars
      ctx.fillStyle = "rgba(255,255,255,.9)";
      stars.forEach(s => {
        s.x += s.vx; s.y += s.vy; s.a += 0.03;
        if (s.x < 0) s.x = c.width; if (s.x > c.width) s.x = 0;
        if (s.y < 0) s.y = c.height; if (s.y > c.height) s.y = 0;
        ctx.globalAlpha = 0.55 + Math.sin(s.a) * 0.45;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
      });
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => { resize(); };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  return (
    <div className="osm-page">
      <style>{styles}</style>

      {/* animated background */}
      <canvas ref={canvasRef} className="osm-bg" />

      <header className="osm-hero">
        <h1>OUR SERVICES</h1>
        <p>IT • Telegram • Mobile • AI</p>
      </header>

      <section className="osm-grid">
        {CARDS.map(({ key, icon: Icon, title, desc, to, theme }) => (
          <Link key={key} to={to} className={`osm-card theme-${theme}`}>
            <div className="osm-icon">
              <Icon />
              <span className="ring" />
            </div>

            <div className="osm-body">
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>

            <span className="osm-cta">
              К проектам <FaArrowRight />
            </span>

            <span className="bubble b1" />
            <span className="bubble b2" />
          </Link>
        ))}
      </section>
    </div>
  );
}

const styles = `
:root{
  --text:#e8ecff;
  --muted:#b6c1ff;
  --stroke:rgba(255,255,255,.12);
}

/* PAGE + BG */
.osm-page{ position:relative; color:var(--text); min-height:100vh; overflow:hidden; }
.osm-bg{ position:fixed; inset:0; width:100%; height:100%; z-index:-1; display:block; }

/* HERO — lowered so it doesn't touch navbar */
.osm-hero{
  text-align:center;
  padding: 140px 16px 22px;
}
.osm-hero h1{
  margin:0; font-size: clamp(2.2rem, 4vw, 3.4rem);
  background: linear-gradient(90deg,#fff,#cfe0ff,#98e9ff);
  -webkit-background-clip:text; background-clip:text; color:transparent;
  filter: drop-shadow(0 0 20px rgba(139,92,246,.28));
}
.osm-hero p{ margin:.5rem 0 0; color:var(--muted); }

/* GRID */
.osm-grid{
  display:grid; gap:18px;
  grid-template-columns: repeat(2, minmax(340px, 1fr));  /* a bit wider */
  max-width: 1180px;
  margin: 12px auto 90px;
  padding: 0 16px;
}
@media (max-width: 820px){ .osm-grid{ grid-template-columns: 1fr; } }

/* CARD — higher */
.osm-card{
  position:relative; display:grid; grid-template-columns: 86px 1fr auto; align-items:center; gap:18px;
  min-height: 138px;                         /* ↑ taller than before */
  border-radius:18px; padding:20px 20px;
  text-decoration:none; color:inherit; overflow:hidden; isolation:isolate;
  background: linear-gradient(180deg, rgba(255,255,255,.07), rgba(255,255,255,.03));
  border:1px solid var(--stroke);
  transition: transform .25s cubic-bezier(.2,.7,.2,1), box-shadow .25s, border-color .25s;
  box-shadow: 0 22px 60px rgba(0,0,0,.5);
}
.osm-card:hover{ transform: translateY(-6px) scale(1.02); box-shadow: 0 30px 90px rgba(0,0,0,.58); }

/* ICON — larger */
.osm-icon{
  position:relative; width:86px; height:86px; border-radius:18px; display:grid; place-items:center;
  color:#0b0d14; font-size:32px; z-index:1;
  background: var(--grad); border:1px solid rgba(255,255,255,.22);
  box-shadow: 0 18px 48px var(--shadow);
}
.osm-icon .ring{ content:""; position:absolute; inset:-8px; border-radius:20px; border:1px dashed rgba(255,255,255,.35); animation: spin 8s linear infinite; opacity:.7; }
@keyframes spin{ to{ transform: rotate(360deg) } }

/* BODY */
.osm-body h3{ margin:0 0 4px; font-size:1.2rem; letter-spacing:.2px }
.osm-body p{ margin:0; color:#d7e7ff; font-size:1.02rem; opacity:.96 }

/* CTA */
.osm-cta{
  display:inline-flex; align-items:center; gap:.55rem; white-space:nowrap;
  padding:.78rem 1.08rem; border-radius:999px; font-weight:800; font-size:1rem; z-index:1;
  background: var(--grad); color:#0b0d14; border:1px solid rgba(255,255,255,.24);
  box-shadow: 0 16px 44px var(--shadow);
  transition: transform .2s ease, filter .2s ease;
}
.osm-card:hover .osm-cta{ transform: translateX(3px) }

/* bubbles */
.bubble{ position:absolute; border-radius:999px; opacity:.5; pointer-events:none; }
.b1{ width:18px; height:18px; right:16px; top:12px; background: rgba(255,255,255,.22); }
.b2{ width:10px; height:10px; right:44px; top:14px; background: rgba(255,255,255,.18); }

/* THEMES */
.theme-violet{ --grad: linear-gradient(135deg,#a78bfa,#22d3ee); --shadow: rgba(139,92,246,.38); }
.theme-cyan  { --grad: linear-gradient(135deg,#22d3ee,#60a5fa); --shadow: rgba(34,211,238,.38); }
.theme-pink  { --grad: linear-gradient(135deg,#f472b6,#a78bfa); --shadow: rgba(244,114,182,.38); }
.theme-lime  { --grad: linear-gradient(135deg,#34d399,#a7f3d0); --shadow: rgba(52,211,153,.38); }

/* sheen */
.osm-card:after{
  content:""; position:absolute; inset:-40% -20%; transform: translateX(-60%);
  background: linear-gradient(110deg, transparent 20%, rgba(255,255,255,.16) 46%, transparent 56%);
  filter: blur(7px); transition: transform .85s ease; z-index:0;
}
.osm-card:hover:after{ transform: translateX(24%); }
`;
