import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaGlobe,
  FaPaperPlane,
  FaMobileAlt,
  FaBrain,
  FaArrowRight,
} from "react-icons/fa";

const CARDS = [
  {
    key: "web",
    title: "Веб-сайты",
    desc: "Лендинги, магазины, порталы. Скорость и SEO.",
    to: "/itprojects",
    icon: FaGlobe,
    theme: "violet",
  },
  {
    key: "bots",
    title: "Telegram-боты",
    desc: "Витрины, оплаты, CRM, рассылки.",
    to: "/telegrambots",
    icon: FaPaperPlane,
    theme: "cyan",
  },
  {
    key: "mobile",
    title: "Мобильные приложения",
    desc: "iOS/Android, оффлайн-режим, пуш-уведомления.",
    to: "/mobile",
    icon: FaMobileAlt,
    theme: "pink",
  },
  {
    key: "ai",
    title: "AI-проекты",
    desc: "RAG, ассистенты, генерация контента.",
    to: "/ai",
    icon: FaBrain,
    theme: "lime",
  },
];

export default function OurServicesMini() {
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

    const stars = Array.from({ length: 140 }).map(() => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      r: (Math.random() * 1.2 + 0.4) * DPR,
      vx: (Math.random() - 0.5) * 0.2 * DPR,
      vy: (Math.random() - 0.5) * 0.2 * DPR,
      a: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      const g = ctx.createLinearGradient(0, 0, c.width, c.height);
      g.addColorStop(0, "#07080d");
      g.addColorStop(1, "#0b0f1a");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, c.width, c.height);

      ctx.fillStyle = "rgba(255,255,255,.9)";
      stars.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.a += 0.03;

        if (s.x < 0) s.x = c.width;
        if (s.x > c.width) s.x = 0;
        if (s.y < 0) s.y = c.height;
        if (s.y > c.height) s.y = 0;

        ctx.globalAlpha = 0.6 + Math.sin(s.a) * 0.4;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    draw();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="osm-page">
      <style>{styles}</style>

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
            </div>

            <div className="osm-body">
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>

            <span className="osm-cta">
              К проектам <FaArrowRight />
            </span>
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

.osm-page{
  position:relative;
  color:var(--text);
  min-height:100vh;
  overflow:hidden;
}

.osm-bg{
  position:fixed;
  inset:0;
  width:100%;
  height:100%;
  z-index:-1;
  display:block;
}

/* HERO */
.osm-hero{
  text-align:center;
  padding: clamp(100px, 18vw, 140px) 16px 30px;
}

.osm-hero h1{
  margin:0;
  font-size: clamp(2rem, 5vw, 3.2rem);
  background: linear-gradient(90deg,#fff,#cfe0ff,#98e9ff);
  -webkit-background-clip:text;
  background-clip:text;
  color:transparent;
}

.osm-hero p{
  margin:.5rem 0 0;
  color:var(--muted);
}

/* GRID RESPONSIVE */
.osm-grid{
  display:grid;
  gap:20px;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  max-width:1180px;
  margin:0 auto 90px;
  padding:0 16px;
}

/* CARD */
.osm-card{
  display:grid;
  grid-template-columns: 86px 1fr auto;
  align-items:center;
  gap:18px;
  min-height:140px;
  border-radius:18px;
  padding:20px;
  text-decoration:none;
  color:inherit;
  background: linear-gradient(180deg, rgba(255,255,255,.07), rgba(255,255,255,.03));
  border:1px solid var(--stroke);
  transition:.3s;
  box-shadow:0 20px 60px rgba(0,0,0,.5);
}

.osm-card:hover{
  transform:translateY(-6px);
}

.osm-icon{
  width:86px;
  height:86px;
  border-radius:18px;
  display:grid;
  place-items:center;
  font-size:30px;
  background: var(--grad);
  color:#0b0d14;
}

.osm-body h3{
  margin:0 0 6px;
  font-size:1.1rem;
}

.osm-body p{
  margin:0;
  font-size:.95rem;
  opacity:.9;
}

.osm-cta{
  display:inline-flex;
  align-items:center;
  gap:.5rem;
  padding:.7rem 1rem;
  border-radius:999px;
  font-weight:700;
  font-size:.9rem;
  background: var(--grad);
  color:#0b0d14;
  white-space:nowrap;
}

/* MOBILE FIX */
@media (max-width:600px){

  .osm-card{
    grid-template-columns:1fr;
    text-align:center;
  }

  .osm-icon{
    margin:0 auto 12px;
  }

  .osm-cta{
    justify-content:center;
  }

}

/* THEMES */
.theme-violet{ --grad: linear-gradient(135deg,#a78bfa,#22d3ee); }
.theme-cyan{ --grad: linear-gradient(135deg,#22d3ee,#60a5fa); }
.theme-pink{ --grad: linear-gradient(135deg,#f472b6,#a78bfa); }
.theme-lime{ --grad: linear-gradient(135deg,#34d399,#a7f3d0); }
`;