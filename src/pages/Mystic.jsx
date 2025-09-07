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

  // Soft infinite starfield background
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

    const N = 140;
    const stars = Array.from({ length: N }).map(() => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      r: (Math.random() * 1.3 + 0.5) * DPR,
      vx: (Math.random() - 0.5) * 0.25 * DPR,
      vy: (Math.random() - 0.5) * 0.25 * DPR,
      a: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      // background gradient
      const g = ctx.createLinearGradient(0, 0, c.width, c.height);
      g.addColorStop(0, "#0a0b12");
      g.addColorStop(1, "#0b0f1c");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, c.width, c.height);

      // stars
      stars.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.a += 0.03;
        if (s.x < 0) s.x = c.width;
        if (s.x > c.width) s.x = 0;
        if (s.y < 0) s.y = c.height;
        if (s.y > c.height) s.y = 0;
        ctx.globalAlpha = 0.55 + Math.sin(s.a) * 0.45;
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
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

  // Nebula waves layer
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
        { hue: 265, amp: 40, y: h * 0.18, alpha: 0.10 },
        { hue: 195, amp: 28, y: h * 0.28, alpha: 0.08 },
        { hue: 315, amp: 24, y: h * 0.38, alpha: 0.06 },
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

  return (
    <div className="mystic">
      <style>{styles}</style>

      {/* layered animated background */}
      <canvas ref={bgRef} className="m-bg" />
      <canvas ref={waveRef} className="m-bg m-wave" />

      {/* Breadcrumbs */}
      <nav className="m-crumbs">
        <Link to="/internal" className="m-crumb">
          Внутренние проекты
        </Link>
        <span className="m-sep">/</span>
        <span className="m-crumb active">Mystic</span>
      </nav>

      {/* Hero */}
      <header className="m-hero">
        <div className="m-hero-inner">
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

          <div className="m-cta">
            <Link to="/contact" className="btn btn-primary">
              Хочу установить в компании <FaArrowRight />
            </Link>
            <a href="#features" className="btn btn-ghost">
              Что внутри?
            </a>
          </div>
        </div>
      </header>

      {/* Feature Cards */}
      <section id="features" className="m-section">
        <h2>Ключевые возможности</h2>
        <p className="m-section-sub">
          Собираем практики в единое приложение: от таро и натальной карты до медитаций и трекинга состояния.
        </p>
        <div className="m-grid">
          <Card
            icon={<FaCompass />}
            title="Таро-расклады и консультации"
            desc="Быстрые спрэды на день/неделю, глубокие расклады на запрос, расшифровки и советы."
          />
          <Card
            icon={<FaMoon />}
            title="Натальная карта и совместимость"
            desc="Построение карты, аспекты, совместимость партнёров, сильные и слабые стороны."
          />
          <Card
            icon={<FaHeartbeat />}
            title="Медитации и практики"
            desc="Сеансы на фокус, сон, баланс; дыхательные техники и ритуалы благополучия."
          />
          <Card
            icon={<FaClock />}
            title="Персональные рекомендации"
            desc="Окна удачи, рекомендованные часы, напоминания и трекинг самочувствия."
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

      {/* Business Block */}
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

      {/* Small footer nav */}
      <footer className="m-foot">
        <Link to="/internal" className="m-back">
          ← Ко всем внутренним проектам
        </Link>
        <div className="m-rights">© {new Date().getFullYear()} Mystic (внутренний проект)</div>
      </footer>
    </div>
  );
}

/* Small presentational pieces */
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
.mystic{position:relative; min-height:100vh; color:var(--text); background:#090b12; overflow:hidden}
.m-bg{position:fixed; inset:0; width:100%; height:100%; z-index:-3; display:block}
.m-wave{z-index:-2}

/* crumbs */
.m-crumbs{max-width:1100px; margin:86px auto 10px; padding:0 16px; display:flex; align-items:center; gap:8px; color:#d9e6ff}
.m-crumb{color:#d9e6ff; text-decoration:none}
.m-crumb.active{color:#fff}
.m-sep{opacity:.6}

/* hero */
.m-hero{padding:10px 16px 8px}
.m-hero-inner{max-width:1100px; margin:0 auto; text-align:center}
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

/* sections */
.m-section{position:relative; padding: 24px 16px 10px}
.m-section h2{text-align:center; font-size:clamp(1.6rem, 2.8vw, 2.2rem); margin-bottom:.4rem}
.m-section-sub{text-align:center; color:var(--muted); max-width:860px; margin:0 auto 1.3rem}

/* cards grid */
.m-grid{max-width:1100px; margin:0 auto; display:grid; gap:14px; grid-template-columns: repeat( auto-fit, minmax(240px, 1fr) )}
.m-card{position:relative; border:1px solid var(--stroke); border-radius:16px; padding:16px; background:linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.025)); overflow:hidden; isolation:isolate; transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease}
.m-card:hover{transform: translateY(-6px); box-shadow:0 24px 70px rgba(0,0,0,.5); border-color: rgba(255,255,255,.2)}
.m-ico{font-size:1.35rem; color:#e9ecff}
.m-card h3{margin:.35rem 0 .15rem; font-size:1.06rem}
.m-card p{color:#dfe7ff}
.m-sheen{content:""; position:absolute; inset:-40% -20%; transform: translateX(-60%); background: linear-gradient(110deg, transparent 20%, rgba(255,255,255,.16) 46%, transparent 56%); filter: blur(6px); transition: transform .85s ease; z-index:0}
.m-card:hover .m-sheen{ transform: translateX(24%) }

/* steps */
.m-steps{max-width:1050px; margin:0 auto; display:grid; gap:12px; grid-template-columns: repeat( auto-fit, minmax(230px, 1fr) )}
.m-step{border:1px solid var(--stroke); border-radius:16px; padding:16px; background:linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02))}
.m-step-num{font-weight:800; color:#9fb1ff; opacity:.9; font-size:.95rem}
.m-step h4{margin:.2rem 0 .15rem; font-size:1.02rem}
.m-step p{color:var(--muted)}

/* benefits */
.m-benefits{max-width:1000px; margin:0 auto; display:grid; gap:12px; grid-template-columns: repeat( auto-fit, minmax(260px, 1fr) )}
.m-benefit{display:flex; gap:.7rem; align-items:flex-start; border:1px solid var(--stroke); border-radius:16px; padding:16px; background:linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02))}
.m-bico{width:36px; height:36px; display:grid; place-items:center; border-radius:10px; background:linear-gradient(135deg, var(--violet), var(--cyan)); color:#0b0f16}

/* footer nav */
.m-foot{max-width:1100px; margin: 8px auto 80px; padding: 0 16px; display:flex; justify-content:space-between; align-items:center; color:#cfe1ff; flex-wrap:wrap; gap:10px}
.m-back{color:#dff2ff; text-decoration:none; border-bottom:1px dashed rgba(255,255,255,.2)}
.m-rights{opacity:.85}

@media (max-width: 780px){
  .m-crumbs{margin-top:96px}
}
`;
