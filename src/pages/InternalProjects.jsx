import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMagic, FaChartPie, FaWallet, FaShieldAlt, FaRocket,
  FaPlaneDeparture, FaGlobeEurope, FaArrowRight
} from "react-icons/fa";

export default function InternalProjects() {
  const canvasRef = useRef(null);
  const nebulaRef = useRef(null);

  // ===== Infinite animated background (stars + orbs) =====
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

    const N = 150;
    const stars = Array.from({ length: N }).map(() => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      r: (Math.random() * 1.3 + 0.5) * DPR,
      vx: (Math.random() - 0.5) * 0.25 * DPR,
      vy: (Math.random() - 0.5) * 0.25 * DPR,
      a: Math.random() * Math.PI * 2,
    }));

    const orbs = [
      { hue: 265, r: 360 * DPR, t: Math.random() * 1000, x: () => c.width * .22, y: () => c.height * .28 },
      { hue: 190, r: 320 * DPR, t: Math.random() * 1000, x: () => c.width * .80, y: () => c.height * .22 },
      { hue: 330, r: 280 * DPR, t: Math.random() * 1000, x: () => c.width * .55, y: () => c.height * .76 },
    ];

    const draw = () => {
      const g = ctx.createLinearGradient(0, 0, c.width, c.height);
      g.addColorStop(0, "#0a0b12");
      g.addColorStop(1, "#0b0f1c");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, c.width, c.height);

      orbs.forEach((o, i) => {
        o.t += 0.003;
        const ox = o.x() + Math.cos(o.t + i) * 30 * DPR;
        const oy = o.y() + Math.sin(o.t * 0.8 + i) * 28 * DPR;
        const rg = ctx.createRadialGradient(ox, oy, 0, ox, oy, o.r);
        rg.addColorStop(0, `hsla(${o.hue}, 90%, 60%, .16)`);
        rg.addColorStop(1, "transparent");
        ctx.fillStyle = rg;
        ctx.beginPath(); ctx.arc(ox, oy, o.r, 0, Math.PI * 2); ctx.fill();
      });

      stars.forEach(s => {
        s.x += s.vx; s.y += s.vy; s.a += 0.03;
        if (s.x < 0) s.x = c.width; if (s.x > c.width) s.x = 0;
        if (s.y < 0) s.y = c.height; if (s.y > c.height) s.y = 0;
        ctx.globalAlpha = 0.55 + Math.sin(s.a) * 0.45;
        ctx.fillStyle = "#fff";
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

  // ===== Nebula wave layer =====
  useEffect(() => {
    const c = nebulaRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    let t = 0, raf;
    const DPR = Math.min(2, window.devicePixelRatio || 1);
    const resize = () => { c.width = c.clientWidth * DPR; c.height = c.clientHeight * DPR; };
    resize();

    const draw = () => {
      t += 0.0035;
      const { width:w, height:h } = c;
      ctx.clearRect(0,0,w,h);

      const layers = [
        { hue: 265, amp: 38, alpha:.10 },
        { hue: 195, amp: 28, alpha:.08 },
        { hue: 315, amp: 24, alpha:.06 },
      ];
      layers.forEach((L, i) => {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 8) {
          const y = h*0.25 + Math.sin(x*0.004 + t*(1+i*0.6)) * (L.amp*DPR) + i*60*DPR;
          if (x===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
        }
        ctx.lineTo(w,h); ctx.lineTo(0,h); ctx.closePath();
        ctx.fillStyle = `hsla(${L.hue},90%,60%,${L.alpha})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  // ===== Scroll-reveal =====
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (ents) => ents.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.15 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const navigate = useNavigate();
  const goContact = () => navigate("/contact");

  return (
    <div className="ip">
      <style>{styles}</style>

      {/* layered background */}
      <canvas ref={canvasRef} className="ip-bg" />
      <canvas ref={nebulaRef} className="ip-bg ip-bg-nebula" />

      {/* Hero */}
      <header className="ip-hero reveal">
        <div className="ip-hero-inner">
          <h1>Наши внутренние проекты</h1>
          <p className="ip-sub">
            Мы создаём продукты с перспективой масштабирования и привлечения инвестиций.
            Ниже — три направления, открытые для партнёрств и финансирования.
          </p>
        </div>
      </header>

      {/* Cards */}
      <section className="ip-grid">
        <ProjectCard
          theme="violet"
          logo={<span className="logo-circ"><FaMagic/></span>}
          title="Mystic"
          tag="Астрология • Мета-практики"
          points={[
            "Таро-расклады и консультации онлайн",
            "Натальная карта и совместимость",
            "Колесо Фортуны и медитации",
            "Персональные рекомендации по дате/времени"
          ]}
          offer="Ищем партнёров для масштабирования контента, маркетинга и подписочной модели в СНГ/МЕНА."
          onPrimary={goContact}
          onSecondary={goContact}
        />

        <ProjectCard
          theme="cyan"
          logo={<span className="logo-circ"><FaWallet/></span>}
          title="FinTech (Crypto Bank)"
          tag="Платёжная экосистема"
          points={[
            "Кастодиальные и некастодиальные кошельки",
            "P2P/Off-ramp, мультивалютные карты",
            "Агрегатор курсов и быстрая конвертация",
            "Контроль рисков, KYC/AML, антифрод"
          ]}
          offer="Открыты к инвестициям и стратегическим интеграциям: эмиссия карт, процессинг, локализация под рынки."
          onPrimary={goContact}
          onSecondary={goContact}
        />

        <ProjectCard
          theme="mint"
          logo={<span className="logo-circ"><FaPlaneDeparture/></span>}
          title="TravelCand"
          tag="Туризм и путешествия"
          points={[
            "Умное планирование маршрутов (AI)",
            "Онлайн-бронирование, страхование и визовая поддержка",
            "Динамическое ценообразование и кэшбэк",
            "Комьюнити-гид и UGC-контент"
          ]}
          offer="Нужны партнёры из travel-сферы и инвестиции в контент/договорные сети, запуск пилота в 2–3 странах."
          onPrimary={goContact}
          onSecondary={goContact}
        />
      </section>

      {/* Why invest */}
      <section className="ip-why reveal">
        <h2>Почему это интересно инвестору</h2>
        <div className="ip-why-grid">
          <Why icon={<FaRocket/>} title="Быстрый пилот">
            MVP-подход, time-to-market 6–12 недель, метрики и экономика на ранних этапах.
          </Why>
          <Why icon={<FaChartPie/>} title="Прозрачная экономика">
            Юнит-экономика, отчётность, недельные спринты и трекинг гипотез.
          </Why>
          <Why icon={<FaShieldAlt/>} title="Риски под контролем">
            Правовые и тех-риски, безопасность данных, масштабируемая архитектура.
          </Why>
          <Why icon={<FaGlobeEurope/>} title="Глобальный взгляд">
            Продукты проектируются для быстрого выхода на зарубежные рынки.
          </Why>
        </div>
        <div className="ip-cta">
          {/* MAIN CTA → /contact */}
          <button type="button" onClick={goContact} className="ip-btn">
            Связаться и получить питч <FaArrowRight/>
          </button>
        </div>
      </section>
    </div>
  );
}

function ProjectCard({ theme, logo, title, tag, points, offer, onPrimary, onSecondary }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const onMove = (e) => {
    const r = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: y * -6, ry: x * 8 });
  };
  const onLeave = () => setTilt({ rx: 0, ry: 0 });

  // Enter bosilganda ham ishlasin
  const onKeyDown = (e) => {
    if (e.key === "Enter") onPrimary?.();
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onKeyDown={onKeyDown}
      tabIndex={0}
      className={`ip-card theme-${theme} reveal`}
      style={{ transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
    >
      <div className="ring" />
      <div className="ip-card-head">
        <div className="ip-logo">{logo}</div>
        <div className="ip-titles">
          <h3>{title}</h3>
          <span className="ip-tag">{tag}</span>
        </div>
        <span className="orbit o1" />
        <span className="orbit o2" />
      </div>

      <ul className="ip-list">
        {points.map((p) => <li key={p}>{p}</li>)}
      </ul>

      <p className="ip-offer">{offer}</p>

      <div className="ip-actions">
        {/* BARCHA TUGMALAR → /contact */}
        <button type="button" onClick={onPrimary} className="ip-cta filled">Инвестировать</button>
        <button type="button" onClick={onSecondary} className="ip-cta ghost">Стать партнёром</button>
      </div>
    </article>
  );
}

function Why({ icon, title, children }) {
  return (
    <div className="ip-why-card reveal">
      <span className="p-orbit" />
      <div className="wh-ico">{icon}</div>
      <div>
        <h4>{title}</h4>
        <p>{children}</p>
      </div>
      <span className="sheen"/>
    </div>
  );
}

const styles = `
:root{
  --text:#e8ecff; --muted:#b8c3ff; --stroke:rgba(255,255,255,.12);
  --vio:#a78bfa; --cy:#7dd3fc; --pk:#f0a6d8; --mt:#9cf3cf;
}

/* page */
.ip{ position:relative; min-height:100vh; color:var(--text); background:#090b12; overflow:hidden; }
.ip-bg{ position:fixed; inset:0; width:100%; height:100%; z-index:-2; }
.ip-bg-nebula{ z-index:-1; mix-blend-mode:screen; pointer-events:none; }

/* reveal */
.reveal{ opacity:0; transform: translateY(16px) scale(.98); transition: opacity .6s cubic-bezier(.2,.7,.2,1), transform .6s cubic-bezier(.2,.7,.2,1); }
.reveal.in{ opacity:1; transform: translateY(0) scale(1); }

/* HERO */
.ip-hero{ padding: 128px 16px 22px; text-align:center; }
.ip-hero-inner{ max-width:1100px; margin:0 auto; }
.ip-hero h1{
  margin:.9rem 0 .4rem; font-size: clamp(2.2rem, 4.4vw, 3.5rem);
  background:linear-gradient(90deg,#fff,#cfe0ff,#8de7ff); -webkit-background-clip:text; color:transparent;
  filter: drop-shadow(0 10px 40px rgba(139,92,246,.25));
}
.ip-sub{ color:var(--muted); max-width:860px; margin:0 auto; }

/* GRID */
.ip-grid{
  max-width:1150px; margin: 16px auto 64px; padding:0 16px;
  display:grid; gap:16px; grid-template-columns: repeat( auto-fit, minmax(300px, 1fr) );
}

/* CARD */
.ip-card{
  position:relative; border:1px solid var(--stroke); border-radius:18px;
  background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.025));
  padding:18px; overflow:hidden; isolation:isolate; min-height: 248px;
  transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease, opacity .25s ease;
  transform-style: preserve-3d;
}
.ip-card:hover{ box-shadow:0 26px 80px rgba(0,0,0,.5); border-color: rgba(255,255,255,.2); }
.ip-card::after{
  content:""; position:absolute; inset:-40% -20%; transform: translateX(-60%);
  background: linear-gradient(110deg, transparent 20%, rgba(255,255,255,.16) 46%, transparent 56%);
  filter: blur(6px); transition: transform .9s ease; z-index:0;
}
.ip-card:hover::after{ transform: translateX(24%); }
.ip-card .ring{
  content:""; position:absolute; inset:-1px; border-radius:20px; filter:blur(14px); opacity:.55; z-index:-1;
  background: radial-gradient(340px 190px at 20% 8%, var(--a1), transparent 70%),
              radial-gradient(320px 180px at 85% 120%, var(--a2), transparent 70%);
}
.theme-violet{ --a1: rgba(167,139,250,.25); --a2: rgba(34,211,238,.22); }
.theme-cyan  { --a1: rgba(34,211,238,.25); --a2: rgba(96,165,250,.22); }
.theme-mint  { --a1: rgba(52,211,153,.25); --a2: rgba(167,243,208,.22); }

.ip-card-head{ position:relative; display:flex; align-items:center; gap:.8rem; }
.ip-logo{ width:56px; height:56px; border-radius:16px; display:grid; place-items:center;
  background: linear-gradient(135deg, #ffffff, #cfeaff);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.25), 0 16px 40px rgba(143,179,255,.25);
  color:#0b0e16; font-size:26px; z-index:1;
}
.logo-circ{ display:grid; place-items:center; width:34px; height:34px; border-radius:999px;
  background:linear-gradient(135deg,#a78bfa,#22d3ee); color:#0b0e16 }
.ip-titles h3{ margin:0; font-size:1.2rem }
.ip-tag{ color:#dbe8ff; opacity:.9; font-size:.9rem }

/* small orbits in header */
.orbit{ position:absolute; border-radius:999px; pointer-events:none; opacity:.5; filter: blur(1px); }
.o1{ width:10px; height:10px; right:14px; top:12px; background: rgba(255,255,255,.25); animation: orb 3.6s ease-in-out infinite; }
.o2{ width:6px; height:6px; right:36px; top:16px; background: rgba(255,255,255,.18); animation: orb 3.6s ease-in-out infinite reverse; }
@keyframes orb{ 0%,100%{ transform: translate(0,0) } 50%{ transform: translate(4px,-4px) } }

.ip-list{ margin:.6rem 0 .4rem; padding:0 0 0 1.1rem; }
.ip-list li{ margin:.2rem 0; color:#dfe6ff; }
.ip-offer{ color:var(--muted); margin:.4rem 0 .6rem; }

.ip-actions{ display:flex; gap:.5rem; flex-wrap:wrap }
.ip-cta{ display:inline-flex; align-items:center; gap:.45rem; padding:.55rem .9rem; border-radius:999px; text-decoration:none; font-weight:800; }
.ip-cta.filled{ color:#0b0f16; background: radial-gradient(100% 100% at 0% 0%, #fff, #a8e7ff); border:1px solid rgba(255,255,255,.22);
  box-shadow:0 16px 44px rgba(168,231,255,.35) }
.ip-cta.ghost{ color:#dfe8ff; border:1px solid rgba(255,255,255,.25); background:rgba(255,255,255,.05) }

/* WHY */
.ip-why{ padding: 12px 16px 80px; }
.ip-why h2{ text-align:center; font-size: clamp(1.5rem, 2.6vw, 2.1rem); margin:0 0 .6rem }
.ip-why-grid{
  max-width:1050px; margin:0 auto; display:grid; gap:12px;
  grid-template-columns: repeat( auto-fit, minmax(240px, 1fr) );
}
.ip-why-card{
  position:relative; display:flex; gap:.7rem; align-items:flex-start; padding:16px; border-radius:16px; border:1px solid var(--stroke);
  background:linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03));
  overflow:hidden; isolation:isolate; transition:transform .25s, box-shadow .25s, border-color .25s;
}
.ip-why-card:hover{ transform: translateY(-5px); box-shadow: 0 24px 70px rgba(0,0,0,.5); border-color: rgba(255,255,255,.2) }
.wh-ico{ font-size:1.2rem; width:34px; height:34px; display:grid; place-items:center; border-radius:10px;
  background:linear-gradient(135deg,#a78bfa,#22d3ee); color:#0b0f16 }
.ip-why-card h4{ margin:.1rem 0 .15rem }
.ip-why-card p{ color:var(--muted); margin:0 }
.sheen{ content:""; position:absolute; inset:-40% -20%; transform: translateX(-60%);
  background: linear-gradient(110deg, transparent 20%, rgba(255,255,255,.16) 46%, transparent 56%);
  filter: blur(6px); transition: transform .85s ease; z-index:0; }
.ip-why-card:hover .sheen{ transform: translateX(24%) }
.p-orbit{ position:absolute; right:12px; top:10px; width:14px; height:14px; border-radius:999px; background:rgba(134,239,172,.28); box-shadow:0 0 0 0 rgba(134,239,172,.28); animation: pulse 2.4s infinite }
@keyframes pulse{ 0%{ box-shadow:0 0 0 0 rgba(134,239,172,.35) } 70%{ box-shadow:0 0 0 18px rgba(134,239,172,0) } 100%{ box-shadow:0 0 0 0 rgba(134,239,172,0) } }

/* CTA */
.ip-cta{ margin-top:.6rem }
.ip-btn{
  display:inline-flex; align-items:center; gap:.6rem; padding:.75rem 1.15rem; border-radius:999px; text-decoration:none; font-weight:900;
  color:#0b0f16; background: radial-gradient(100% 100% at 0% 0%, #fff, #b9f1ff); border:1px solid rgba(255,255,255,.25);
  box-shadow: 0 18px 56px rgba(150,230,255,.45); transition: transform .2s ease, box-shadow .2s ease, filter .2s ease;
}
.ip-btn:hover{ transform: translateY(-2px); box-shadow: 0 24px 70px rgba(150,230,255,.6); filter:saturate(1.05) }

/* Responsive */
@media (max-width: 780px){
  .ip-hero{ padding-top:110px }
  .ip-card{ min-height: 236px }
}
`;
