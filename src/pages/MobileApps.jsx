// src/pages/MobileApps.jsx
import React, { useEffect, useRef } from "react";
import {
  FaMobileAlt, FaGooglePlay, FaAppStore, FaExternalLinkAlt,
  FaChartLine, FaTruck, FaStore, FaUtensils, FaGraduationCap, FaDumbbell, FaFish
} from "react-icons/fa";

/** ------------ Данные приложений (всё на русском) ------------ */
const APPS = [
  {
    key: "qqb",
    name: "QQB Quant",
    desc: "Финтех/крипто: курсы в реальном времени, портфель, сигналы и уведомления.",
    links: [{ type: "play", url: "https://play.google.com/store/apps/details?id=com.qqb.quant" }],
    theme: "violet",
    icon: FaChartLine,
  },
  {
    key: "lorry",
    name: "Lorry Водитель",
    desc: "Логистика: рейсы, геолокация, заказы, чат-диспетчер, статусы доставки.",
    links: [{ type: "play", url: "https://play.google.com/store/apps/details?id=lorry.haydovchi" }],
    theme: "cyan",
    icon: FaTruck,
  },
  {
    key: "meathouse",
    name: "Meat House (Корея)",
    desc: "Доставка еды: меню, корзина, онлайн-оплата, трекинг заказов.",
    links: [{ type: "appstore", url: "https://apps.apple.com/uz/app/meat-house-south-korea/id6741596041" }],
    theme: "pink",
    icon: FaUtensils,
  },
  {
    key: "bozoraka",
    name: "Bozoraka",
    desc: "Маркетплейс: каталог, поиск и фильтры, избранное, оформление заказа.",
    links: [{ type: "play", url: "https://play.google.com/store/apps/details?id=com.bozoraka.mobile" }],
    theme: "lime",
    icon: FaStore,
  },
  {
    key: "tma",
    name: "TMA Mobile",
    desc: "Образование/медицина: уроки, тесты, рейтинг, пуш-уведомления.",
    links: [{
      type: "play",
      url: "https://www.google.com/url?q=https://play.google.com/store/apps/details?id%3Duz.TMA.tma_mobie&sa=D&source=editors&ust=1741112336134764&usg=AOvVaw0U7crCB2M4NFksO-lwsqwK"
    }],
    theme: "blue",
    icon: FaGraduationCap,
  },
  {
    key: "topstretching",
    name: "TOPSTRETCHING",
    desc: "Фитнес: видео-уроки, абонементы, расписание, запись в студию.",
    links: [{
      type: "play",
      url: "https://www.google.com/url?q=https://play.google.com/store/apps/details?id%3Dio.fitbase.topstretching%26hl%3Den_US&sa=D&source=editors&ust=1741112336135078&usg=AOvVaw31lpyyDdUDkiEXYDFpOaFJ"
    }],
    theme: "indigo",
    icon: FaDumbbell,
  },
  {
    key: "sushilove",
    name: "Суши Love",
    desc: "Рестораны: меню, промокоды, быстрая доставка и отслеживание.",
    links: [{
      type: "appstore",
      url: "https://www.google.com/url?q=https://apps.apple.com/uz/app/%25D1%2581%25D1%2583%25D1%2588%25D0%25B8-love/id1584777711&sa=D&source=editors&ust=1741112336135367&usg=AOvVaw1IKGHHnZk-PjZGUvY7QJ2E"
    }],
    theme: "teal",
    icon: FaFish,
  },
];

/** ------------ Страница ------------ */
export default function MobileApps() {
  const canvasRef = useRef(null);

  // Бесконечный фон: звёзды + орбы
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

    const stars = Array.from({ length: 180 }).map(() => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      r: (Math.random() * 1.4 + 0.4) * DPR,
      vx: (Math.random() - 0.5) * 0.25 * DPR,
      vy: (Math.random() - 0.5) * 0.25 * DPR,
      a: Math.random() * Math.PI * 2,
    }));

    const orbs = Array.from({ length: 3 }).map((_, i) => ({
      x: (0.2 + 0.32 * i) * c.width,
      y: (0.25 + 0.28 * i) * c.height,
      r: (220 + 90 * i) * DPR,
      t: Math.random() * 1000,
      hue: 220 + i * 60,
    }));

    const draw = () => {
      const g = ctx.createLinearGradient(0, 0, c.width, c.height);
      g.addColorStop(0, "#0a0b12");
      g.addColorStop(1, "#0b0f1c");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, c.width, c.height);

      orbs.forEach((o, i) => {
        o.t += 0.003;
        const ox = o.x + Math.cos(o.t + i) * 40 * DPR;
        const oy = o.y + Math.sin(o.t * 0.8 + i) * 36 * DPR;
        const rg = ctx.createRadialGradient(ox, oy, 0, ox, oy, o.r);
        rg.addColorStop(0, `hsla(${o.hue},90%,60%,.18)`);
        rg.addColorStop(1, "transparent");
        ctx.fillStyle = rg;
        ctx.beginPath(); ctx.arc(ox, oy, o.r, 0, Math.PI * 2); ctx.fill();
      });

      ctx.fillStyle = "rgba(255,255,255,.9)";
      stars.forEach((s) => {
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

    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  // 3D-tilt + подсветка
  useEffect(() => {
    const cards = document.querySelectorAll(".ma-card");
    function handleMove(e, el) {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const px = (x / r.width) * 2 - 1;
      const py = (y / r.height) * 2 - 1;
      el.style.setProperty("--rx", `${(-py * 7).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${(px * 9).toFixed(2)}deg`);
      el.style.setProperty("--gx", `${50 + px * 30}%`);
      el.style.setProperty("--gy", `${50 + py * 30}%`);
    }
    cards.forEach((el) => {
      const move = (e) => handleMove(e, el);
      const leave = () => {
        el.style.setProperty("--rx", `0deg`);
        el.style.setProperty("--ry", `0deg`);
        el.style.setProperty("--gx", `50%`);
        el.style.setProperty("--gy", `50%`);
      };
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
    });
    return () => {
      cards.forEach((el) => el.replaceWith(el.cloneNode(true)));
    };
  }, []);

  return (
    <div className="ma-page">
      <style>{styles}</style>
      <canvas ref={canvasRef} className="ma-bg" />

      <header className="ma-hero">
        <div className="ma-badge"><FaMobileAlt /> Мобильные приложения</div>
        <h1>Наши мобильные продукты</h1>
        <p>iOS / Android · платежи · пуш-уведомления · интеграции</p>
      </header>

      <section className="ma-grid">
        {APPS.map((app) => {
          const Icon = app.icon || FaMobileAlt;
          return (
            <article key={app.key} className={`ma-card theme-${app.theme}`}>
              <div className="ma-ring" />
              <div className="ma-left">
                <div className="ma-ico"><Icon /></div>
                <div className="ma-pulse" />
              </div>

              <div className="ma-body">
                <div className="ma-top">
                  <h3>{app.name}</h3>
                  <span className="ma-dot" />
                </div>
                <p className="ma-desc">{app.desc}</p>

                <div className="ma-links">
                  {app.links.map((l, i) => (
                    <a
                      key={i}
                      className={`badge ${l.type}`}
                      href={l.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={l.type === "play" ? "Открыть в Google Play" : "Открыть в App Store"}
                      title={l.type === "play" ? "Открыть в Google Play" : "Открыть в App Store"}
                    >
                      {l.type === "play" ? <><FaGooglePlay /> Google Play</> : <><FaAppStore /> App Store</>}
                    </a>
                  ))}
                </div>
              </div>

              <a
                className="ma-cta"
                href={app.links[0]?.url}
                target="_blank"
                rel="noreferrer"
                title="Открыть"
              >
                Открыть <FaExternalLinkAlt />
              </a>
            </article>
          );
        })}
      </section>
    </div>
  );
}

/** ------------ Стили (ограничены компонентом) ------------ */
const styles = `
:root{
  --text:#e8ecff;
  --muted:#aeb8df;
  --stroke:rgba(255,255,255,.14);
}
.ma-page{ position:relative; min-height:100vh; color:var(--text); overflow:hidden; background:#090b12; }
.ma-bg{ position:fixed; inset:0; width:100%; height:100%; z-index:-1; display:block; }

/* Hero */
.ma-hero{ text-align:center; padding:128px 16px 14px; }
.ma-badge{
  display:inline-flex; gap:.5rem; align-items:center; font-weight:800; color:#dfe7ff;
  padding:.45rem .8rem; border-radius:999px; border:1px solid rgba(255,255,255,.12);
  background: radial-gradient(100% 100% at 50% 50%, rgba(139,92,246,.22), rgba(34,211,238,.18));
}
.ma-hero h1{
  margin:.6rem 0 .35rem; font-size:clamp(2.2rem,4.6vw,3.4rem);
  background: linear-gradient(90deg,#fff,#cfe0ff,#8de9ff);
  -webkit-background-clip:text; background-clip:text; color:transparent;
  filter: drop-shadow(0 12px 36px rgba(139,92,246,.26));
}
.ma-hero p{ color:var(--muted) }

/* Grid */
.ma-grid{
  max-width:1160px; margin:12px auto 100px; padding:0 16px;
  display:grid; gap:16px; grid-template-columns: repeat(2, minmax(320px,1fr));
}
@media (max-width:820px){ .ma-grid{ grid-template-columns:1fr } }

/* Card */
.ma-card{
  position:relative; display:grid; grid-template-columns: 86px 1fr auto; align-items:center; gap:16px;
  min-height:138px; border-radius:18px; padding:18px;
  background: linear-gradient(180deg, rgba(255,255,255,.07), rgba(255,255,255,.03));
  border:1px solid var(--stroke); overflow:hidden; isolation:isolate;
  transform-style:preserve-3d; --rx:0deg; --ry:0deg;
  box-shadow:0 22px 60px rgba(0,0,0,.48);
  transition: transform .25s cubic-bezier(.2,.7,.2,1), box-shadow .25s, border-color .25s;
}
.ma-card:hover{ transform: translateY(-6px) rotateX(var(--rx)) rotateY(var(--ry)); box-shadow:0 30px 90px rgba(0,0,0,.58); border-color:rgba(255,255,255,.22); }

.ma-ring{
  content:""; position:absolute; inset:-1px; border-radius:20px; z-index:-1; filter:blur(14px); opacity:.6;
  background: radial-gradient(380px 220px at var(--gx,50%) var(--gy,50%), var(--glow1), transparent 70%),
              radial-gradient(420px 260px at 120% 140%, var(--glow2), transparent 70%);
}

/* Left icon */
.ma-left{ position:relative; width:86px; height:86px; }
.ma-ico{
  width:86px; height:86px; display:grid; place-items:center; border-radius:18px; font-size:30px; color:#0b0d14;
  background: var(--grad); border:1px solid rgba(255,255,255,.22); box-shadow:0 18px 46px var(--shadow);
}
.ma-pulse{ position:absolute; inset:-4px; border-radius:22px; border:1px dashed rgba(255,255,255,.35); animation:spin 8s linear infinite; opacity:.7; }
@keyframes spin{ to{ transform:rotate(360deg) } }

/* Body */
.ma-top{ display:flex; align-items:center; justify-content:space-between; }
.ma-top h3{ margin:0 0 4px; font-size:1.18rem; }
.ma-dot{ width:10px; height:10px; border-radius:999px; background: var(--dot); box-shadow:0 0 16px var(--dot); }
.ma-desc{ margin:.25rem 0 .5rem; color:#d8e6ff; opacity:.96 }

.ma-links{ display:flex; gap:.45rem; flex-wrap:wrap; }
.badge{
  display:inline-flex; align-items:center; gap:.45rem; padding:.48rem .7rem; border-radius:999px; font-weight:800;
  color:#0b0d14; background: var(--grad); border:1px solid rgba(255,255,255,.22); box-shadow:0 14px 40px var(--shadow);
  transition: transform .2s ease;
}
.badge:hover{ transform: translateY(-2px); }

/* CTA */
.ma-cta{
  display:inline-flex; align-items:center; gap:.5rem; white-space:nowrap;
  padding:.68rem 1rem; border-radius:999px; font-weight:800; color:#0b0d14;
  background: var(--grad); border:1px solid rgba(255,255,255,.22); box-shadow:0 14px 40px var(--shadow);
  transition: transform .2s ease, filter .2s ease;
}
.ma-card:hover .ma-cta{ transform: translateX(3px); }

/* Темы (градиенты/подсветки) */
.theme-violet{ --grad:linear-gradient(135deg,#a78bfa,#22d3ee); --shadow:rgba(139,92,246,.38); --dot:#b9a5ff; --glow1:rgba(167,139,250,.34); --glow2:rgba(34,211,238,.26); }
.theme-cyan  { --grad:linear-gradient(135deg,#22d3ee,#60a5fa); --shadow:rgba(34,211,238,.38);  --dot:#9be8ff; --glow1:rgba(34,211,238,.32);  --glow2:rgba(96,165,250,.26); }
.theme-pink  { --grad:linear-gradient(135deg,#f472b6,#a78bfa); --shadow:rgba(244,114,182,.38); --dot:#ffb3da; --glow1:rgba(244,114,182,.34); --glow2:rgba(167,139,250,.24); }
.theme-lime  { --grad:linear-gradient(135deg,#34d399,#a7f3d0); --shadow:rgba(52,211,153,.38);  --dot:#b7ffd9; --glow1:rgba(52,211,153,.32);  --glow2:rgba(167,243,208,.24); }
.theme-blue  { --grad:linear-gradient(135deg,#93c5fd,#22d3ee); --shadow:rgba(147,197,253,.36); --dot:#c9e3ff; --glow1:rgba(147,197,253,.32); --glow2:rgba(34,211,238,.24); }
.theme-indigo{ --grad:linear-gradient(135deg,#818cf8,#22d3ee); --shadow:rgba(129,140,248,.36); --dot:#c8cbff; --glow1:rgba(129,140,248,.32); --glow2:rgba(34,211,238,.24); }
.theme-teal  { --grad:linear-gradient(135deg,#2dd4bf,#60a5fa); --shadow:rgba(45,212,191,.36); --dot:#b7fff2; --glow1:rgba(45,212,191,.32); --glow2:rgba(96,165,250,.24); }
`;
