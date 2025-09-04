import React, { useEffect, useRef } from "react";
import { FaArrowRight, FaGlobe } from "react-icons/fa";

/** Replace any placeholder image links with real screenshots whenever you’re ready. */
const PROJECTS = [
  {
    title: "Unicorn GO",
    url: "https://unicorngo.ru",
    img: "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?q=80&w=1200&auto=format&fit=crop",
    desc: "EdTech/курс платформа: лэндинги, кабинет, оплаты и аналитика.",
  },
  {
    title: "Kardise Engineering",
    url: "https://www.kardise.engineering",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop",
    desc: "Инжиниринг и автоматизация: корпоративный сайт, каталог и заявки.",
  },
  {
    title: "Broniboy Tashkent",
    url: "https://broniboy.ru/tashkent",
    img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1200&auto=format&fit=crop",
    desc: "Доставка/витрина: меню, корзина, промо и интеграции с CRM.",
  },
  {
    title: "SAIF ProFace",
    url: "https://www.saif-proface.uz",
    img: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1200&auto=format&fit=crop",
    desc: "Производство/оборудование: каталог, спецификации, заявки в 1 клик.",
  },
  {
    title: "World Halal UZ",
    url: "https://worldhalal.uz/uz",
    img: "https://images.unsplash.com/photo-1544989164-31dc3c645987?q=80&w=1200&auto=format&fit=crop",
    desc: "Ассоциация/новости: мультиязычие, мероприятия и членство.",
  },
  {
    title: "Worldchefs",
    url: "https://worldchefs.org/",
    img: "https://images.unsplash.com/photo-1514517220038-125164b21c56?q=80&w=1200&auto=format&fit=crop",
    desc: "Международное сообщество: образовательные программы и события.",
  },
  {
    title: "JOBO Recruitment",
    url: "https://recruitment.jobo.uz/",
    img: "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?q=80&w=1200&auto=format&fit=crop",
    desc: "HR-платформа: вакансии, воронка откликов, интеграции и отчёты.",
  },
  {
    title: "Chefs.uz",
    url: "https://chefs.uz/",
    img: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=1200&auto=format&fit=crop",
    desc: "Медиа/комьюнити поваров: статьи, видео, события и партнёры.",
  },
  {
    title: "Islom.uz",
    url: "https://islom.uz/",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
    desc: "Контент-портал: новости, разделы, поиск и удобная навигация.",
  },
];

export default function ITProjects() {
  const canvasRef = useRef(null);

  // Infinite stars + soft orbs (same vibe as your Services pages)
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

    const N = 180;
    const stars = Array.from({ length: N }).map(() => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      r: (Math.random() * 1.4 + 0.4) * DPR,
      vx: (Math.random() - 0.5) * 0.25 * DPR,
      vy: (Math.random() - 0.5) * 0.25 * DPR,
      a: Math.random() * Math.PI * 2,
    }));

    const orbs = Array.from({ length: 3 }).map((_, i) => ({
      x: (0.22 + 0.3 * i) * c.width,
      y: (0.25 + 0.27 * i) * c.height,
      r: (240 + 90 * i) * DPR,
      t: Math.random() * 1000,
      hue: 220 + i * 60,
    }));

    const draw = () => {
      const g = ctx.createLinearGradient(0, 0, c.width, c.height);
      g.addColorStop(0, "#090b13");
      g.addColorStop(1, "#0b0f1c");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, c.width, c.height);

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

  // Reveal on scroll
  useEffect(() => {
    const els = document.querySelectorAll(".ip-reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("show")),
      { threshold: 0.16 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="ip-page">
      <style>{styles}</style>
      <canvas ref={canvasRef} className="ip-bg" />

      <header className="ip-hero">
        <div className="ip-badge"><FaGlobe /> IT-кейсы</div>
        <h1>Наши IT-проекты</h1>
        <p className="ip-sub">Сайты, платформы, каталоги и сервисы с интеграциями и аналитикой.</p>
      </header>

      <section className="ip-grid">
        {PROJECTS.map((p, i) => (
          <a
            key={p.title}
            href={p.url}
            target="_blank"
            rel="noreferrer"
            className="ip-card ip-reveal"
            style={{ "--delay": `${i * 60}ms` }}
          >
            <div className="ip-thumb" style={{ backgroundImage: `url(${p.img})` }} />
            <div className="ip-body">
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <span className="ip-cta">
                Открыть сайт <FaArrowRight />
              </span>
            </div>
            <span className="ip-ring" />
          </a>
        ))}
      </section>
    </div>
  );
}

const styles = `
:root{
  --text:#e8ecff;
  --muted:#b6c1ff;
  --glass: rgba(255,255,255,.06);
  --stroke: rgba(255,255,255,.12);
}

.ip-page{ position:relative; min-height:100vh; color:var(--text); overflow:hidden; }
.ip-bg{ position:fixed; inset:0; width:100%; height:100%; z-index:-1; display:block; }

/* HERO */
.ip-hero{ text-align:center; padding: 128px 16px 22px; }
.ip-badge{
  display:inline-flex; gap:.5rem; align-items:center;
  padding:.4rem .8rem; border-radius:999px; border:1px solid rgba(255,255,255,.12);
  background: radial-gradient(100% 100% at 50% 50%, rgba(139,92,246,.18), rgba(34,211,238,.15));
  color:#dfe7ff; font-weight:600; font-size:.95rem;
}
.ip-hero h1{
  margin:.6rem 0 .3rem;
  font-size: clamp(2.1rem, 4.5vw, 3.3rem);
  background: linear-gradient(90deg,#fff,#cfe0ff,#98e9ff);
  -webkit-background-clip:text; background-clip:text; color:transparent;
  filter: drop-shadow(0 12px 36px rgba(139,92,246,.28));
}
.ip-sub{ color:var(--muted); max-width:880px; margin:0 auto; }

/* GRID */
.ip-grid{
  max-width: 1200px;
  margin: 16px auto 90px;
  padding: 0 16px;
  display: grid;
  grid-template-columns: repeat( auto-fit, minmax(280px, 1fr) );
  gap: 16px;
}

/* CARD */
.ip-card{
  position:relative; display:grid; grid-template-rows: 170px 1fr;
  border:1px solid var(--stroke); border-radius:18px; overflow:hidden; text-decoration:none; color:inherit;
  background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.025));
  box-shadow: 0 20px 60px rgba(0,0,0,.45);
  transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
  transform: translateY(8px);
}
.ip-card:hover{ transform: translateY(-6px); box-shadow: 0 30px 90px rgba(0,0,0,.6); border-color: rgba(255,255,255,.2); }

.ip-thumb{
  background-size: cover; background-position: center; filter: saturate(1.05);
}
.ip-body{ padding: 14px 16px 16px; display:flex; flex-direction:column; gap:8px; }
.ip-body h3{ margin:0; font-size:1.15rem; }
.ip-body p{ margin:0; color:#d7e4ff; font-size:.98rem; opacity:.96; }
.ip-cta{
  margin-top:8px; align-self:flex-start; display:inline-flex; gap:.5rem; align-items:center;
  padding:.55rem .9rem; border-radius:999px; font-weight:700; color:#0b0d14;
  background: radial-gradient(100% 100% at 0% 0%, #fff, #9cc9ff);
  border:1px solid rgba(255,255,255,.22); box-shadow: 0 14px 40px rgba(100,150,255,.32);
  transition: transform .2s ease, filter .2s; 
}
.ip-card:hover .ip-cta{ transform: translateX(3px); }

/* glow ring */
.ip-ring{
  position:absolute; inset:-1px; border-radius:18px; pointer-events:none;
  background: radial-gradient(280px 160px at 20% 0%, rgba(147,112,255,.28), transparent 70%),
              radial-gradient(300px 180px at 100% 120%, rgba(34,211,238,.22), transparent 70%);
  filter: blur(14px); opacity:.55;
}

/* Reveal */
.ip-reveal{ opacity:0; transform: translateY(16px) scale(.98); }
.ip-reveal.show{ 
  opacity:1; transform: translateY(0) scale(1); 
  transition: opacity .7s ease var(--delay,0ms), transform .7s ease var(--delay,0ms);
}

/* Responsive tweak */
@media (max-width: 640px){
  .ip-card{ grid-template-rows: 160px 1fr; }
}
`;
