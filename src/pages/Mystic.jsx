// File: src/pages/Mystic.jsx
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaMagic,
  FaArrowRight,
  FaShieldAlt,
  FaClock,
  FaUsers,
  FaChartLine,
  FaCompass,
  FaMoon,
  FaHeartbeat,
} from "react-icons/fa";

export default function Mystic() {
  const bgRef = useRef(null);
  const waveRef = useRef(null);
  const orbRef = useRef(null);
  const sceneRef = useRef(null);

  /* ===== 1) Infinite starfield (back layer) ===== */
  useEffect(() => {
    const c = bgRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    let raf;
    const DPR = Math.min(2, window.devicePixelRatio || 1);

    const fit = () => {
      c.width = Math.floor(c.clientWidth * DPR);
      c.height = Math.floor(c.clientHeight * DPR);
    };
    fit();

    const N = 160;
    const stars = Array.from({ length: N }).map(() => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      r: (Math.random() * 1.2 + 0.5) * DPR,
      vx: (Math.random() - 0.5) * 0.22 * DPR,
      vy: (Math.random() - 0.5) * 0.22 * DPR,
      a: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      const g = ctx.createLinearGradient(0, 0, c.width, c.height);
      g.addColorStop(0, "#070a12");
      g.addColorStop(1, "#0a0f1c");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, c.width, c.height);

      stars.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.a += 0.025;
        if (s.x < 0) s.x = c.width;
        if (s.x > c.width) s.x = 0;
        if (s.y < 0) s.y = c.height;
        if (s.y > c.height) s.y = 0;

        ctx.globalAlpha = 0.55 + Math.sin(s.a) * 0.45;
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();

        // kamroq “constellation” chiziq effekti
        if (Math.random() < 0.003) {
          const nx = (s.x + Math.random() * 60 - 30);
          const ny = (s.y + Math.random() * 60 - 30);
          ctx.globalAlpha = 0.2;
          ctx.strokeStyle = "rgba(200,220,255,.25)";
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(nx, ny);
          ctx.stroke();
        }
      });
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => fit();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  /* ===== 2) Nebula waves (mid layer) ===== */
  useEffect(() => {
    const c = waveRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    let t = 0;
    let raf;
    const DPR = Math.min(2, window.devicePixelRatio || 1);

    const fit = () => {
      c.width = Math.floor(c.clientWidth * DPR);
      c.height = Math.floor(c.clientHeight * DPR);
    };
    fit();

    const draw = () => {
      t += 0.0038;
      const w = c.width;
      const h = c.height;
      ctx.clearRect(0, 0, w, h);

      const layers = [
        { hue: 265, amp: 44, y: h * 0.2, alpha: 0.12 },
        { hue: 195, amp: 30, y: h * 0.3, alpha: 0.10 },
        { hue: 315, amp: 26, y: h * 0.42, alpha: 0.08 },
      ];

      layers.forEach((L, i) => {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 8 * DPR) {
          const y = L.y + Math.sin(x * 0.004 + t * (1 + i * 0.6)) * (L.amp * DPR);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();
        ctx.fillStyle = `hsla(${L.hue}, 90%, 60%, ${L.alpha})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => fit();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  /* ===== 3) “3D Orbs / Planets” (front bg layer) ===== */
  useEffect(() => {
    const c = orbRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    let raf;
    const DPR = Math.min(2, window.devicePixelRatio || 1);

    const fit = () => {
      c.width = Math.floor(c.clientWidth * DPR);
      c.height = Math.floor(c.clientHeight * DPR);
    };
    fit();

    // “depth” bilan sferalar
    const ORBS = Array.from({ length: 8 }).map(() => ({
      x: Math.random(),
      y: Math.random() * 0.7 + 0.05, // yuqoriroq qatlami
      z: Math.random(), // 0 yaqin – old; 1 – orqa
      r: Math.random() * 60 + 40,
      hue: 200 + Math.random() * 140,
      dx: (Math.random() - 0.5) * 0.0008,
      dy: (Math.random() - 0.5) * 0.0006,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      const w = c.width, h = c.height;

      ORBS.forEach((o) => {
        o.x += o.dx;
        o.y += o.dy;
        if (o.x < -0.2) o.x = 1.2;
        if (o.x > 1.2) o.x = -0.2;
        if (o.y < 0.02) o.y = 0.02;
        if (o.y > 0.9) o.y = 0.9;

        const depth = 0.25 + (1 - o.z) * 0.75;
        const R = o.r * depth * DPR;
        const cx = o.x * w;
        const cy = o.y * h;

        // yumshoq soyali 3D gradient sfera
        const grad = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.35, R * 0.2, cx, cy, R);
        grad.addColorStop(0, `hsla(${o.hue}, 85%, 70%, 0.85)`);
        grad.addColorStop(1, `hsla(${o.hue}, 85%, 45%, 0.08)`);

        // atrofida halo/glow
        ctx.shadowColor = `hsla(${o.hue}, 90%, 65%, 0.35)`;
        ctx.shadowBlur = 60 * depth;

        ctx.beginPath();
        ctx.fillStyle = grad;
        ctx.arc(cx, cy, R, 0, Math.PI * 2);
        ctx.fill();

        // specular highlight
        ctx.shadowBlur = 0;
        const hi = ctx.createRadialGradient(cx - R * 0.5, cy - R * 0.6, 0, cx - R * 0.5, cy - R * 0.6, R * 0.6);
        hi.addColorStop(0, "rgba(255,255,255,.25)");
        hi.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = hi;
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => fit();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  /* ===== 4) Scene parallax (cursor-based 3D) ===== */
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const onMove = (e) => {
      const rect = scene.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;  // -0.5..0.5
      const dy = (e.clientY - cy) / rect.height;
      // sahifa ildizi o'zgaruvchilar
      scene.style.setProperty("--tiltX", `${(-dy * 6).toFixed(2)}deg`);
      scene.style.setProperty("--tiltY", `${(dx * 8).toFixed(2)}deg`);
      scene.style.setProperty("--parX", `${(dx * 18).toFixed(2)}px`);
      scene.style.setProperty("--parY", `${(dy * 18).toFixed(2)}px`);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /* ===== 5) 3D Tilt for cards ===== */
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll(".m-card, .m-step, .m-benefit"));
    const maxTilt = 8; // deg
    const onEnter = (el) => el.classList.add("is-tilting");
    const onLeave = (el) => {
      el.classList.remove("is-tilting");
      el.style.transform = "";
    };
    const onMove = (el, e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rx = (py - 0.5) * -maxTilt;
      const ry = (px - 0.5) * maxTilt;
      el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    };

    cards.forEach((el) => {
      const enter = () => onEnter(el);
      const leave = () => onLeave(el);
      const move = (e) => onMove(el, e);
      el.addEventListener("pointerenter", enter);
      el.addEventListener("pointerleave", leave);
      el.addEventListener("pointermove", move);
    });

    return () => {
      cards.forEach((el) => {
        el.replaceWith(el.cloneNode(true)); // tezda listenerlarni tozalash
      });
    };
  }, []);

  return (
    <div className="mystic" ref={sceneRef}>
      <style>{styles}</style>

      {/* Layered animated background */}
      <canvas ref={bgRef} className="m-bg" />
      <canvas ref={waveRef} className="m-bg m-wave" />
      <canvas ref={orbRef} className="m-bg m-orb" />

      {/* Breadcrumbs */}
      <nav className="m-crumbs">
        <Link to="/internal" className="m-crumb">Внутренние проекты</Link>
        <span className="m-sep">/</span>
        <span className="m-crumb active">Mystic</span>
      </nav>

      {/* Hero */}
      <header className="m-hero">
        <div className="m-hero-inner m-hero-3d">
          <div className="m-badge">
            <FaMagic /> Астрология • Медитации • Мета-практики
          </div>
          <h1>
            Mystic — персональные рекомендации{" "}
            <span>по дате и времени, таро, натал карта, колесо фортуны</span>
          </h1>
          <p className="m-sub">
            ИИ-сервис, который помогает пользователям принимать решения: быстрые расклады, разбор совместимости,
            практики и медитации, напоминания и персональные советы по продуктивности и благополучию.
          </p>

          {/* <div className="m-cta">
            <Link to="/contact" className="btn btn-primary">
              Хочу установить в компании <FaArrowRight />
            </Link>
            <a href="#features" className="btn btn-ghost">Что внутри?</a>
          </div> */}

          {/* 3D floater chips */}
          {/* <div className="m-floaters">
            <span className="chip">Таро</span>
            <span className="chip">Натал</span>
            <span className="chip">Медитации</span>
            <span className="chip">Совместимость</span>
            <span className="chip">Вдх техники</span>
          </div> */}
        </div>
      </header>

      {/* Feature Cards */}
   <section id="features" className="m-section">
  <h2>Ключевые возможности</h2>
  <p className="m-section-sub">
    Астрология, знакомства и медитации в одном приложении: прогнозы, совместимость и персональные рекомендации.
  </p>

  <div className="m-grid">
    <Card
      icon={<FaMoon />}
      title="Астрологические прогнозы"
      desc="Ежедневные и недельные прогнозы, транзиты и события, рекомендации по датам."
    />

    <Card
      icon={<FaCompass />}
      title="Знакомства и комьюнити"
      desc="Профили по знакам и совместимости, матчи по интересам, чаты и тематические группы."
    />

    <Card
      icon={<FaHeartbeat />}
      title="Медитации и практики"
      desc="Сеансы для фокуса, сна и баланса, дыхательные техники и ритуалы благополучия."
    />

    <Card
      icon={<FaClock />}
      title="Персональные рекомендации"
      desc="Окна удачи, лучшие часы для действий, напоминания и трекинг самочувствия."
    />
  </div>
</section>

      {/* How it works */}
      <section className="m-section">
        <h2>Как это работает</h2>
        <p className="m-section-sub">
          Нативное мобильное приложение + панель администратора. ИИ-подсказки, гибкий контент, аналитика.
        </p>
        <div className="m-steps">
          <Step n="01" title="Онбординг пользователя">
            Дата, место и время рождения, цели и интересы. Формируем персональный профиль.
          </Step>
          <Step n="02" title="Индивидуальный контент">
            Рекомендации по дням и периодам, практики, расклады, уведомления и ритуалы.
          </Step>
          <Step n="03" title="ИИ-помощник">
            Ответы на вопросы, толкование раскладов, предикты и мягкие рекомендации.
          </Step>
          <Step n="04" title="Аналитика">
            Вовлечённость, ретеншн, конверсия в подписку. A/B гипотезы и ростовые метрики.
          </Step>
        </div>
      </section>

      {/* Business block */}
      <section className="m-section">
        <h2>Для бизнеса</h2>
        <p className="m-section-sub">
          Подходит для медиа/коммьюнити, wellness-брендов и инфра-партнёров. Белая метка и интеграции.
        </p>
        <div className="m-benefits">
          <Benefit icon={<FaUsers />} title="Подписки/пакеты">
            Монетизация через подписку, платные расклады и премиум-контент.
          </Benefit>
          <Benefit icon={<FaShieldAlt />} title="Приватность">
            Хранение данных шифруется, соблюдаем GDPR/локальные требования.
          </Benefit>
          <Benefit icon={<FaChartLine />} title="Ростовые метрики">
            Встроенная аналитика: DAU/WAU/MAU, LTV, ретеншн, воронка подписок.
          </Benefit>
        </div>

        <div className="m-cta center">
          <Link to="/contact" className="btn btn-primary">
            Обсудить внедрение <FaArrowRight />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="m-foot">
        <Link to="/internal" className="m-back">← Ко всем внутренним проектам</Link>
        <div className="m-rights">© {new Date().getFullYear()} Mystic (внутренний проект)</div>
      </footer>
    </div>
  );
}

/* Presentational pieces */
function Card({ icon, title, desc }) {
  return (
    <div className="m-card">
      <div className="m-ico">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
      <span className="m-sheen" />
    </div>
  );
}

function Step({ n, title, children }) {
  return (
    <div className="m-step">
      <div className="m-step-num">{n}</div>
      <h4>{title}</h4>
      <p>{children}</p>
    </div>
  );
}

function Benefit({ icon, title, children }) {
  return (
    <div className="m-benefit">
      <div className="m-bico">{icon}</div>
      <div>
        <h4>{title}</h4>
        <p>{children}</p>
      </div>
    </div>
  );
}

const styles = `
:root{
  --violet:#8b5cf6; --cyan:#22d3ee; --pink:#ec4899; --mint:#34d399;
  --text:#e9edff; --muted:#bac6ff; --stroke:rgba(255,255,255,.12);
}
.mystic{position:relative; min-height:100vh; color:var(--text); background:#090b12; overflow:hidden;
  perspective: 1000px; transform-style: preserve-3d;
  --tiltX:0deg; --tiltY:0deg; --parX:0px; --parY:0px;
}
.m-bg{position:fixed; inset:0; width:100%; height:100%; z-index:-3; display:block; pointer-events:none}
.m-wave{z-index:-2; transform: translate3d(var(--parX),var(--parY),0)}
.m-orb{z-index:-1; filter: saturate(1.1) blur(0.1px); mix-blend-mode: screen; transform: translate3d(calc(var(--parX)*0.6),calc(var(--parY)*0.6),0)}

/* crumbs */
.m-crumbs{max-width:1100px; margin:86px auto 10px; padding:0 16px; display:flex; align-items:center; gap:8px; color:#d9e6ff}
.m-crumb{color:#d9e6ff; text-decoration:none}
.m-crumb.active{color:#fff}
.m-sep{opacity:.6}

/* hero */
.m-hero{padding:10px 16px 8px; transform: rotateX(var(--tiltX)) rotateY(var(--tiltY)); transform-style: preserve-3d;}
.m-hero-inner{max-width:1100px; margin:0 auto; text-align:center; position:relative}
.m-hero-3d::after{
  content:""; position:absolute; inset:-60px -30px auto -30px; height:220px; z-index:-1;
  background: radial-gradient(60% 120% at 50% 0%, rgba(139,92,246,.35), rgba(34,211,238,.08) 60%, transparent 70%);
  filter: blur(18px);
  transform: translateZ(-60px);
}
.m-badge{display:inline-flex; align-items:center; gap:.55rem; padding:.45rem .8rem; border:1px solid var(--stroke); border-radius:999px; background:rgba(255,255,255,.06); color:#dfe7ff; backdrop-filter: blur(6px)}
.m-hero h1{margin:.8rem 0 .5rem; font-size:clamp(2.1rem, 4vw, 3.3rem); line-height:1.12;
  background: linear-gradient(90deg,#fff,#cfe0ff,#8de7ff); -webkit-background-clip:text; color:transparent}
.m-hero h1 span{filter: drop-shadow(0 12px 40px rgba(139,92,246,.25))}
.m-sub{max-width:860px; margin:0 auto; color:var(--muted)}
.m-cta{display:flex; justify-content:center; gap:.7rem; flex-wrap:wrap; margin-top:1.1rem}
.btn{display:inline-flex; align-items:center; gap:.6rem; padding:.8rem 1.1rem; border-radius:999px; text-decoration:none; font-weight:800; transition:transform .2s ease, box-shadow .2s ease, filter .2s ease}
.btn-primary{color:#0b0f16; background:linear-gradient(135deg,#fff,var(--cyan)); border:1px solid rgba(255,255,255,.18); box-shadow:0 16px 44px rgba(34,211,238,.35)}
.btn-ghost{color:#dfe7ff; border:1px solid var(--stroke); background:rgba(255,255,255,.06)}
.btn:hover{transform: translateY(-2px); filter:saturate(1.05)}

/* floating 3D chips */
.m-floaters{position:relative; display:flex; gap:10px; justify-content:center; margin-top:16px; transform-style:preserve-3d}
.m-floaters .chip{
  font-weight:700; font-size:.8rem; color:#071019;
  padding:.45rem .7rem; border-radius:999px;
  background: linear-gradient(135deg, #a5b4fc, #67e8f9);
  box-shadow: 0 14px 40px rgba(103,232,249,.28);
  transform: translateZ(40px);
}
.m-floaters .chip:nth-child(2){ transform: translateZ(70px) translateX(6px)}
.m-floaters .chip:nth-child(3){ transform: translateZ(95px) translateX(-4px)}
.m-floaters .chip:nth-child(4){ transform: translateZ(60px) translateX(10px)}
.m-floaters .chip:nth-child(5){ transform: translateZ(45px) translateX(-8px)}

/* sections */
.m-section{position:relative; padding: 24px 16px 10px}
.m-section h2{text-align:center; font-size:clamp(1.6rem, 2.8vw, 2.2rem); margin-bottom:.4rem}
.m-section-sub{text-align:center; color:var(--muted); max-width:860px; margin:0 auto 1.3rem}

/* cards grid */
.m-grid{max-width:1100px; margin:0 auto; display:grid; gap:14px; grid-template-columns: repeat( auto-fit, minmax(240px, 1fr) )}
.m-card{position:relative; border:1px solid var(--stroke); border-radius:18px; padding:16px;
  background:linear-gradient(180deg, rgba(255,255,255,.07), rgba(255,255,255,.025));
  overflow:hidden; isolation:isolate;
  transition: transform .2s ease, box-shadow .25s ease, border-color .25s ease, filter .2s ease;
  transform-style: preserve-3d;
  will-change: transform;
}
.m-card:hover{box-shadow:0 30px 80px rgba(0,0,0,.55), inset 0 0 0 1px rgba(255,255,255,.06); border-color: rgba(255,255,255,.25); filter: saturate(1.05)}
.m-ico{font-size:1.35rem; color:#e9ecff; transform: translateZ(22px)}
.m-card h3{margin:.35rem 0 .15rem; font-size:1.06rem; transform: translateZ(18px)}
.m-card p{color:#dfe7ff; transform: translateZ(14px)}
.m-sheen{content:""; position:absolute; inset:-40% -20%; transform: translateX(-60%); background: linear-gradient(110deg, transparent 20%, rgba(255,255,255,.16) 46%, transparent 56%); filter: blur(6px); transition: transform .85s ease; z-index:0}
.m-card:hover .m-sheen{ transform: translateX(24%) }

/* steps (slightly 3D) */
.m-steps{max-width:1050px; margin:0 auto; display:grid; gap:12px; grid-template-columns: repeat( auto-fit, minmax(230px, 1fr) )}
.m-step{border:1px solid var(--stroke); border-radius:16px; padding:16px; background:linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02));
  box-shadow: 0 10px 30px rgba(5,10,20,.3);
  transform-style: preserve-3d;
}
.m-step-num{font-weight:800; color:#9fb1ff; opacity:.9; font-size:.95rem}
.m-step h4{margin:.2rem 0 .15rem; font-size:1.02rem}
.m-step p{color:var(--muted)}

/* benefits */
.m-benefits{max-width:1000px; margin:0 auto; display:grid; gap:12px; grid-template-columns: repeat( auto-fit, minmax(260px, 1fr) )}
.m-benefit{display:flex; gap:.7rem; align-items:flex-start; border:1px solid var(--stroke); border-radius:16px; padding:16px;
  background:linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02));
  transform-style: preserve-3d; box-shadow: 0 10px 30px rgba(5,10,20,.28);
}
.m-bico{width:38px; height:38px; display:grid; place-items:center; border-radius:12px;
  background:linear-gradient(135deg, var(--violet), var(--cyan)); color:#0b0f16; transform: translateZ(18px)}

/* footer nav */
.m-foot{max-width:1100px; margin: 8px auto 80px; padding: 0 16px; display:flex; justify-content:space-between; align-items:center; color:#cfe1ff; flex-wrap:wrap; gap:10px}
.m-back{color:#dff2ff; text-decoration:none; border-bottom:1px dashed rgba(255,255,255,.2)}
.m-rights{opacity:.85}

@media (max-width: 780px){
  .m-crumbs{margin-top:96px}
  .m-floaters{flex-wrap:wrap}
}
`;
