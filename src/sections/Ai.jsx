// src/pages/AIProjectFaceID.jsx
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaUserCheck, FaClock, FaChartLine, FaCamera, FaRobot,
  FaShieldAlt, FaMoneyBillWave, FaBolt, FaArrowRight
} from "react-icons/fa";

export default function AIProjectFaceID() {
  const canvasRef = useRef(null);

  // ===== Infinite animated background (stars + soft orbs) =====
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");

    let raf;
    const DPR = Math.min(2, window.devicePixelRatio || 1);

    const resize = () => {
      const { clientWidth, clientHeight } = c;
      c.width  = Math.floor(clientWidth  * DPR);
      c.height = Math.floor(clientHeight * DPR);
    };
    resize();

    // stars
    const N = 160;
    const stars = Array.from({ length: N }).map(() => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      r: (Math.random() * 1.3 + 0.5) * DPR,
      vx: (Math.random() - 0.5) * 0.3 * DPR,
      vy: (Math.random() - 0.5) * 0.3 * DPR,
      a: Math.random() * Math.PI * 2
    }));

    // slow colorful orbs
    const orbs = [
      { hue: 265, r: 360 * DPR, t: Math.random() * 1000, x: c.width * .25, y: c.height * .35 },
      { hue: 190, r: 320 * DPR, t: Math.random() * 1000, x: c.width * .75, y: c.height * .25 },
      { hue: 330, r: 280 * DPR, t: Math.random() * 1000, x: c.width * .50, y: c.height * .75 },
    ];

    const draw = () => {
      // bg
      const g = ctx.createLinearGradient(0, 0, c.width, c.height);
      g.addColorStop(0, "#0a0b12");
      g.addColorStop(1, "#0b0f1c");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, c.width, c.height);

      // orbs
      orbs.forEach((o, i) => {
        o.t += 0.003;
        const ox = o.x + Math.cos(o.t + i) * 32 * DPR;
        const oy = o.y + Math.sin(o.t * 0.8 + i) * 28 * DPR;
        const rg = ctx.createRadialGradient(ox, oy, 0, ox, oy, o.r);
        rg.addColorStop(0, `hsla(${o.hue}, 90%, 60%, .16)`);
        rg.addColorStop(1, "transparent");
        ctx.fillStyle = rg;
        ctx.beginPath(); ctx.arc(ox, oy, o.r, 0, Math.PI * 2); ctx.fill();
      });

      // stars
      stars.forEach(s => {
        s.x += s.vx; s.y += s.vy; s.a += 0.03;
        if (s.x < 0) s.x = c.width; if (s.x > c.width) s.x = 0;
        if (s.y < 0) s.y = c.height; if (s.y > c.height) s.y = 0;
        ctx.globalAlpha = 0.55 + Math.sin(s.a) * 0.45;
        ctx.fillStyle = "#ffffff";
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

  return (
    <div className="ai-faceid">
      <style>{styles}</style>

      {/* animated background */}
      <canvas ref={canvasRef} className="bgfx" />

      {/* hero */}
      <header className="hero">
        <div className="hero-inner">
          <div className="badge">AI • Computer Vision • Automation</div>
          <h1>Face ID для бизнеса</h1>
          <p className="lead">
            Умное распознавание лиц для управления персоналом и автоматизации процессов:
            посещаемость, графики, продуктивность, финансовая аналитика — всё в одном решении.
          </p>
          <div className="hero-grid">
            <HeroChip icon={<FaCamera />} text="Одна камера" />
            <HeroChip icon={<FaBolt />} text="Реальное время" />
            <HeroChip icon={<FaMoneyBillWave />} text="Низкая стоимость" />
            <HeroChip icon={<FaRobot />} text="Полная автоматизация" />
          </div>
        </div>

        {/* Decorative face scanner */}
        <FaceScanner />
      </header>

      {/* features */}
      <section className="section">
        <h2>Что умеет система</h2>
        <p className="sub">
          ИИ-модели компьютерного зрения отслеживают ключевые события и собирают данные в единую
          панель управления. Вы видите живую картину работы компании.
        </p>

        <div className="grid">
          <Feat
            icon={<FaUserCheck />}
            title="Распознавание и учёт"
            desc="Точное определение сотрудника при входе/выходе, отметка смен, контроль опозданий и переработок."
          />
          <Feat
            icon={<FaClock />}
            title="Время и дисциплина"
            desc="Гибкие правила графиков: смены, перерывы, KPI по времени на рабочем месте и зонам."
          />
          <Feat
            icon={<FaChartLine />}
            title="Продуктивность и отчёты"
            desc="Метрики эффективности и динамика: активность по отделам, сравнение периодов, прогнозы."
          />
          <Feat
            icon={<FaShieldAlt />}
            title="Безопасность и приватность"
            desc="Шифрование биометрии, разграничение прав доступа, on-prem или приватное облако."
          />
        </div>
      </section>

      {/* how it works */}
      <section className="section">
        <h2>Как это работает</h2>
        <ol className="steps">
          <li>
            <span className="num">1</span>
            Устанавливаем одну или несколько камер в зонах входа/выхода и рабочих пространствах.
          </li>
          <li>
            <span className="num">2</span>
            Модель ИИ фиксирует событие, сверяет лицо с базой и создаёт запись.
          </li>
          <li>
            <span className="num">3</span>
            Данные поступают в дашборд: время, отдел, локация, KPI, статусы — всё в реальном времени.
          </li>
          <li>
            <span className="num">4</span>
            Интегрируемся с 1С/ERP/CRM и системой зарплат — экономим время и исключаем ошибки.
          </li>
        </ol>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="cta-box">
          <h3>Хотите внедрить Face ID в своей компании?</h3>
          <p>
            Поможем спроектировать схему камер, обучим модель под ваши условия и запустим пилот за 7–14 дней.
          </p>
          <Link to="/contact" className="cta-btn">
            Установить для моей компании <FaArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}

function HeroChip({ icon, text }) {
  return (
    <div className="chip">
      <span className="ico">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

function Feat({ icon, title, desc }) {
  return (
    <article className="feat">
      <div className="feat-ico">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
      <span className="glow" />
    </article>
  );
}

/** Simple animated "face scanner" block (pure CSS) */
function FaceScanner() {
  return (
    <div className="scanner">
      <div className="face">
        <div className="eye e1" />
        <div className="eye e2" />
        <div className="grid" />
        <div className="scanline" />
      </div>
    </div>
  );
}

/* ------------------ styles ------------------ */
const styles = `
:root{
  --text:#e6eaff; --muted:#aab3d9; --glass:rgba(255,255,255,.06); --stroke:rgba(255,255,255,.12);
  --vio:#9b8cff; --cy:#7dd3fc; --pk:#f0a6d8; --gr:#86efac;
}

.ai-faceid{ position:relative; min-height:100vh; color:var(--text); background:#090b12; overflow:hidden; }
.bgfx{ position:fixed; inset:0; width:100%; height:100%; z-index:-1; display:block; }

/* Hero */
.hero{
  position:relative;
  padding: 120px 16px 60px; /* pastdan ko'proq joy */
}
.hero-inner{
  max-width:1100px;
  margin:0 auto;
  text-align:center;
  position:relative;
  z-index:2;
}
.badge{ display:inline-block; padding:.4rem .8rem; border:1px solid var(--stroke); border-radius:999px; color:#cfe7ff; background:rgba(255,255,255,.04); }
.hero h1{
  margin:.9rem 0 .4rem;
  font-size: clamp(2.1rem, 4.6vw, 3.6rem);
  letter-spacing:.02em;
  background:linear-gradient(90deg,#fff,#cfe0ff,#8be7ff);
  -webkit-background-clip:text; background-clip:text; color:transparent;
  filter: drop-shadow(0 10px 40px rgba(139,92,246,.25));
}
.lead{ color:var(--muted); max-width:850px; margin:0 auto 1rem; }
.hero-grid{ display:flex; gap:.6rem; justify-content:center; flex-wrap:wrap; margin-top:.6rem; }
.chip{ display:inline-flex; align-items:center; gap:.5rem; padding:.5rem .7rem; border-radius:999px;
  background: rgba(255,255,255,.06); border:1px solid var(--stroke); color:#dff0ff; font-weight:600; }
.chip .ico{ display:grid; place-items:center; width:24px; height:24px; border-radius:8px;
  background:linear-gradient(135deg,var(--vio),var(--cy)); color:#0b0f16 }

/* Scanner (oqimda markazda, divider sifatida) */
.scanner{
  position:relative;
  margin: 28px auto 36px;
  width: min(980px, 92vw);
  display:flex; justify-content:center;
  pointer-events:none;
  z-index:1;
}
.face{
  position:relative;
  width: min(760px, 88vw);
  height: clamp(180px, 28vw, 300px); /* responsiv balandlik */
  border-radius:22px; overflow:hidden; border:1px solid var(--stroke);
  background:
    radial-gradient(120% 120% at 80% 10%, rgba(139,92,246,.25), transparent 60%),
    radial-gradient(120% 120% at 20% 90%, rgba(34,211,238,.22), transparent 60%),
    linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02));
  backdrop-filter: blur(2px);
  box-shadow: 0 40px 120px rgba(0,0,0,.45);
}
.eye{ position:absolute; top:32%; width:12%; height:16%; border-radius:50%; background:rgba(255,255,255,.12); }
.eye:after{ content:""; position:absolute; inset:20% 24%; border-radius:50%; background:#fff; opacity:.85; animation:blink 5s infinite; }
.e1{ left:28%; } .e2{ right:28%; }
@keyframes blink{ 0%,92%,100%{ transform:scaleY(1)} 94%{ transform:scaleY(.1) } 96%{ transform:scaleY(1)} }
.face .grid{ position:absolute; inset:0; background:
  radial-gradient(circle at 50% 60%, rgba(255,255,255,.08), transparent 55%),
  linear-gradient(transparent 49%, rgba(255,255,255,.08) 50% 51%, transparent 52%),
  linear-gradient(90deg, transparent 49%, rgba(255,255,255,.08) 50% 51%, transparent 52%);
  background-size: 100% 100%, 30px 30px, 30px 30px;
  mix-blend-mode: overlay;
}
.scanline{
  position:absolute; left:0; right:0; height:2px;
  background:linear-gradient(90deg, transparent, #8be7ff, transparent);
  animation:scan 3.4s linear infinite; box-shadow:0 0 18px #8be7ff;
}
@keyframes scan{ 0%{ top: 6% } 100%{ top: 94% } }

/* Sections */
.section{ padding: 14px 16px; }
.section h2{ text-align:center; font-size: clamp(1.6rem, 2.8vw, 2.2rem); margin:0 0 .4rem; }
.sub{ text-align:center; color:var(--muted); max-width:880px; margin: 0 auto 1.2rem; }
.grid{ max-width:1100px; margin:0 auto; display:grid; gap:14px; grid-template-columns: repeat( auto-fit, minmax(250px, 1fr) ); }
.feat{
  position:relative; padding:18px; border-radius:16px; border:1px solid var(--stroke);
  background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03));
  transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease, opacity .25s ease;
  overflow:hidden; isolation:isolate; min-height:140px;
}
.feat:hover{ transform: translateY(-6px); box-shadow: 0 26px 80px rgba(0,0,0,.5); border-color: rgba(255,255,255,.2); }
.feat-ico{ font-size:1.3rem; color:#ddf; width:38px; height:38px; display:grid; place-items:center; border-radius:10px;
  background: linear-gradient(135deg, var(--vio), var(--cy)); color:#0b0f16; }
.feat h3{ margin:.45rem 0 .25rem; font-size:1.06rem }
.feat p{ color:var(--muted) }
.glow{ content:""; position:absolute; inset:-1px; border-radius:18px; filter:blur(16px); opacity:.55; z-index:-1;
  background: radial-gradient(320px 180px at 18% 8%, rgba(139,92,246,.25), transparent 70%),
              radial-gradient(300px 180px at 85% 120%, rgba(34,211,238,.22), transparent 70%);
}

/* Steps */
.steps{ max-width:900px; margin:0 auto; list-style:none; padding:0; display:grid; gap:10px; }
.steps li{ position:relative; padding:14px 14px 14px 48px; border:1px dashed var(--stroke); border-radius:14px; background:rgba(255,255,255,.04); }
.steps .num{ position:absolute; left:10px; top:12px; width:26px; height:26px; border-radius:8px; display:grid; place-items:center;
  background:linear-gradient(135deg,var(--vio),var(--cy)); color:#0b0f16; font-weight:800 }

/* CTA */
.cta{ padding: 30px 16px 80px; }
.cta-box{ max-width:1000px; margin:0 auto; text-align:center; border:1px solid var(--stroke); border-radius:20px; padding:24px;
  background: radial-gradient(120% 120% at 50% -10%, rgba(139,92,246,.18), rgba(34,211,238,.18), transparent 60%),
              linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03)); }
.cta-box h3{ margin:.2rem 0 .4rem; font-size: clamp(1.2rem, 2.2vw, 1.6rem) }
.cta-box p{ color:var(--muted); margin:0 0 .9rem }
.cta-btn{
  display:inline-flex; align-items:center; gap:.55rem; font-weight:800; color:#0b0f16; text-decoration:none;
  padding:.75rem 1.15rem; border-radius:999px; border:1px solid rgba(255,255,255,.22);
  background: radial-gradient(100% 100% at 0% 0%, #fff, #a0e7ff);
  box-shadow: 0 16px 50px rgba(128,212,255,.35); transition: transform .2s ease, box-shadow .2s ease, filter .2s ease;
}
.cta-btn:hover{ transform: translateY(-2px); box-shadow: 0 20px 60px rgba(128,212,255,.5); filter: saturate(1.05); }

/* Responsive tweaks */
@media (max-width: 780px){
  .hero{ padding-top:110px; }
  .scanner{ margin: 20px auto 28px; }
  .face{ height: clamp(160px, 40vw, 220px); }
}

`;
