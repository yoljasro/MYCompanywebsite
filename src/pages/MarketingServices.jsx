import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBullhorn, FaChartLine, FaShareAlt, FaCamera, FaVideo, FaBullseye,
  FaRobot, FaComments, FaChartPie, FaPaintBrush, FaFunnelDollar,
  FaGlobe, FaCheckCircle, FaProjectDiagram, FaCalendarCheck,
  FaChevronRight
} from "react-icons/fa";

/* ========================= STARFIELD + ORBS BACKGROUND ========================= */
function useStarfield(canvasId = "mk-stars") {
  useEffect(() => {
    const c = document.getElementById(canvasId);
    if (!c) return;
    const ctx = c.getContext("2d");

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

    let raf;
    const draw = () => {
      const g = ctx.createLinearGradient(0, 0, c.width, c.height);
      g.addColorStop(0, "#0a0b12");
      g.addColorStop(1, "#0e1020");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, c.width, c.height);

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

    const onResize = () => fit();
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, [canvasId]);
}

function useOrbs(canvasId = "mk-orbs") {
  useEffect(() => {
    const c = document.getElementById(canvasId);
    if (!c) return;
    const ctx = c.getContext("2d");
    const DPR = window.devicePixelRatio || 1;

    const fit = () => {
      c.width = Math.floor(c.clientWidth * DPR);
      c.height = Math.floor(c.clientHeight * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    fit();

    const orbs = [
      { hue: 266, r: 380, t: Math.random() * 1000, x: () => c.clientWidth * .22, y: () => c.clientHeight * .28 },
      { hue: 190, r: 340, t: Math.random() * 1000, x: () => c.clientWidth * .78, y: () => c.clientHeight * .22 },
      { hue: 330, r: 300, t: Math.random() * 1000, x: () => c.clientWidth * .55, y: () => c.clientHeight * .76 },
    ];

    let raf;
    const draw = () => {
      // transparent — ustki qatlam, ostida starfield ko‘rinadi
      ctx.clearRect(0, 0, c.clientWidth, c.clientHeight);

      orbs.forEach((o, i) => {
        o.t += 0.003;
        const ox = o.x() + Math.cos(o.t + i) * 26;
        const oy = o.y() + Math.sin(o.t * 0.8 + i) * 24;
        const rg = ctx.createRadialGradient(ox, oy, 0, ox, oy, o.r);
        rg.addColorStop(0, `hsla(${o.hue}, 90%, 60%, .16)`);
        rg.addColorStop(1, "transparent");
        ctx.fillStyle = rg;
        ctx.beginPath(); ctx.arc(ox, oy, o.r, 0, Math.PI * 2); ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => fit();
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, [canvasId]);
}

/* ========================= TILT CARD ========================= */
function TiltCard({ className = "", children }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width * 2 - 1;
      const py = (e.clientY - r.top) / r.height * 2 - 1;
      el.style.transform = `perspective(900px) rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 10).toFixed(2)}deg)`;
      el.style.setProperty("--glow-x", `${50 + px * 50}%`);
      el.style.setProperty("--glow-y", `${50 + py * 50}%`);
    };
    const reset = () => {
      el.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
      el.style.setProperty("--glow-x", "50%");
      el.style.setProperty("--glow-y", "50%");
    };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", reset);
    return () => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", reset); };
  }, []);
  return <div ref={ref} className={`mk-tilt ${className}`}>{children}</div>;
}

/* ========================= DATA ========================= */
const services = [
  { icon: <FaShareAlt />, title: "SMM-продвижение", desc: "Контент-стратегия, контент-план, Reels/Shorts, комьюнити-менеджмент, геймификация.", tags: ["Instagram", "TikTok", "YouTube Shorts"] },
  { icon: <FaBullseye />, title: "Performance-реклама", desc: "Meta, TikTok, Google/YouTube, Yandex. A/B-тесты, ретаргетинг.", tags: ["Lead Gen", "Conversions", "ROAS"] },
  { icon: <FaCamera />, title: "Мобилография / Фото", desc: "Контент для меню, каталога, UGC; лайфстайл-съёмки.", tags: ["UGC", "Product", "Lifestyle"] },
  { icon: <FaVideo />, title: "Видеопродакшн", desc: "Рилсы, клипы, промо, интервью. Скрипт → съёмка → монтаж → цвет.", tags: ["Reels", "Promo", "Docu"] },
  { icon: <FaPaintBrush />, title: "Айдентика и дизайн", desc: "Лого, гид по стилю, соцмедиа-пак, лендинги и продающие креативы.", tags: ["Brand", "Guidelines", "Creatives"] },
  { icon: <FaRobot />, title: "Автоматизация / боты", desc: "Telegram-боты для лидов/продаж, авто-ответы, квизы, интеграции CRM.", tags: ["TG Bot", "CRM", "Auto-reply"] },
  { icon: <FaComments />, title: "Influencer / PR", desc: "Подбор блогеров, CPA-модели, спецпроекты, пресс-релизы.", tags: ["CPM/CPA", "PR"] },
  { icon: <FaChartPie />, title: "Аналитика и BI", desc: "Дашборд: каналы, воронка, LTV, CAC/ROMI (GA4 / Data Studio).", tags: ["GA4", "Data Studio", "BI"] },
  { icon: <FaFunnelDollar />, title: "Воронки и лендинги", desc: "Лиды → квизы → прогрев → продажи. UX-лендинги под оффер.", tags: ["CRO", "LP", "Quiz"] },
  { icon: <FaGlobe />, title: "SEO / ASO", desc: "Органика, страницы/блоги, карточки приложений, on-page.", tags: ["Organic", "ASO", "Technical"] },
];

const faqs = [
  { q: "Сколько длится запуск?", a: "10–14 дней: стратегия, креативы, технастройки, аналитика. Полный продакшн — 2–4 недели." },
  { q: "Нужен ли рекламный бюджет?", a: "Да. Рекомендуем $500–$1 500/мес на тесты, затем масштабируем под цели." },
  { q: "Как вы отчитываетесь?", a: "Еженедельные отчёты + живой дашборд (GA4 / Data Studio): лиды/продажи, CAC/ROAS, динамика, гипотезы." },
  { q: "Работаете по KPI?", a: "Да. KPI-рамка: цели, вехи, SLA по срокам/качеству. Прозрачная смета и спринтовая модель." },
];

/* ========================= PAGE ========================= */
export default function Marketing() {
  useStarfield("mk-stars");
  useOrbs("mk-orbs");

  return (
    <div className="mk-page">
      <style>{styles}</style>

      {/* BACKGROUND LAYERS */}
      <canvas id="mk-stars" className="mk-stars" />
      <canvas id="mk-orbs" className="mk-orbs" />
      <div className="mk-rotor" aria-hidden="true" />
      <div className="mk-noise" aria-hidden="true" />

      {/* HERO */}
      <section className="mk-hero">
        <div className="mk-hero-inner">
          <div className="mk-badge"><FaBullhorn /> Полный цикл маркетинга</div>
          <h1>Масштабируйте бренд: <span>Стратегия → Контент → Реклама → Продажи</span></h1>
          <p className="mk-sub">
            IT + Marketing + Invest — всё в одной экосистеме. Закрываем весь цикл: от позиционирования и креативов
            до performance-кампаний, аналитики и автоматизации.
          </p>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="mk-section">
        <h2>Что делаем</h2>
        <p className="mk-section-sub">От SMM и продакшна до performance и BI-аналитики.</p>
        <div className="mk-grid">
          {services.map((s, i) => (
            <TiltCard key={i} className="mk-card">
              <div className="mk-card-head">
                <div className="mk-ico">{s.icon}</div>
                <h3>{s.title}</h3>
              </div>
              <p className="mk-desc">{s.desc}</p>
              <div className="mk-tags">
                {s.tags.map((t) => <span key={t} className="mk-tag">{t}</span>)}
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="mk-section">
        <h2>Как работаем</h2>
        <p className="mk-section-sub">Спринтовая модель: быстрые гипотезы, измеримый результат.</p>
        <div className="mk-steps">
          <TiltCard className="mk-step">
            <div className="mk-step-num">01</div>
            <h4><FaProjectDiagram /> Стратегия</h4>
            <p>Аудит, ЦА, позиционирование, tone of voice, медиаплан/контент-план.</p>
          </TiltCard>
          <TiltCard className="mk-step">
            <div className="mk-step-num">02</div>
            <h4><FaCalendarCheck /> Продакшн</h4>
            <p>Скрипты, съёмки, дизайн-пак, landing/квиз, подготовка UTM/пикселей.</p>
          </TiltCard>
          <TiltCard className="mk-step">
            <div className="mk-step-num">03</div>
            <h4><FaBullseye /> Запуск</h4>
            <p>Meta/TikTok/Google. A/B креативов и офферов, ретаргетинг, look-a-like.</p>
          </TiltCard>
          <TiltCard className="mk-step">
            <div className="mk-step-num">04</div>
            <h4><FaChartLine /> Аналитика</h4>
            <p>GA4 + Data Studio, воронка, LTV, CAC/ROAS, гипотезы и масштабирование.</p>
          </TiltCard>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="mk-section">
        <h2>Пакеты и формат работы</h2>
        <p className="mk-section-sub">Подберём под нишу и цели. Возможна кастомизация.</p>
        <div className="mk-pack-grid">
          <TiltCard className="mk-pack">
            <h3>Starter</h3>
            <ul>
              <li><FaCheckCircle/> Контент-план + дизайн</li>
              <li><FaCheckCircle/> 8–12 постов/мес + 4–6 Reels</li>
              <li><FaCheckCircle/> Настройка рекламного кабинета</li>
              <li><FaCheckCircle/> Еженедельный отчёт</li>
            </ul>
          </TiltCard>
          <TiltCard className="mk-pack highlight">
            <h3>Growth</h3>
            <ul>
              <li><FaCheckCircle/> SMM + видеопродакшн (до 8–10 Reels)</li>
              <li><FaCheckCircle/> Performance-реклама (Meta/TikTok/Google)</li>
              <li><FaCheckCircle/> Дашборд (GA4/Data Studio)</li>
              <li><FaCheckCircle/> A/B тесты + ретаргетинг</li>
            </ul>
          </TiltCard>
          <TiltCard className="mk-pack">
            <h3>Pro</h3>
            <ul>
              <li><FaCheckCircle/> Полный цикл: стратегия → продакшн → реклама</li>
              <li><FaCheckCircle/> Фулл-фаннел (UGC, инфлюенсеры, PR)</li>
              <li><FaCheckCircle/> Воронки/квизы/лендинги + TG-бот</li>
              <li><FaCheckCircle/> KPI-рамка + спринты + SLA</li>
            </ul>
          </TiltCard>
        </div>
      </section>

      {/* FAQ */}
      <section className="mk-section mk-faq">
        <h2>FAQ</h2>
        <div className="mk-accordion">
          {faqs.map((f, i) => <Faq key={i} f={f} />)}
        </div>
      </section>
    </div>
  );
}

/* ========================= FAQ PILL ========================= */
function Faq({ f }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-pill ${open ? "open" : ""}`}>
      <button className="faq-head" onClick={() => setOpen(v => !v)}>
        <span className="faq-title">{f.q}</span>
        <span className="faq-chevron" aria-hidden="true"><FaChevronRight /></span>
      </button>
      <div className="faq-body"><p>{f.a}</p></div>
    </div>
  );
}

/* ========================= STYLES ========================= */
const styles = `
:root{
  --violet:#8b5cf6; --cyan:#22d3ee; --pink:#ec4899;
  --bg:#0a0b12; --text:#e8ecff; --muted:#a9acc7;
}
*{box-sizing:border-box}
.mk-page{position:relative;color:var(--text);min-height:100vh;overflow-x:hidden}

/* backgrounds */
.mk-stars,.mk-orbs{position:fixed;inset:0;width:100%;height:100%;display:block;z-index:-3}
.mk-orbs{z-index:-2}
.mk-rotor{position:fixed;inset:-20%;z-index:-1;pointer-events:none;background:conic-gradient(from 0deg, rgba(139,92,246,0.14), rgba(34,211,238,0.10), rgba(236,72,153,0.14), rgba(139,92,246,0.14));mix-blend-mode:overlay;filter:blur(40px);animation:spin 140s linear infinite;opacity:.35}
.mk-noise{position:fixed;inset:0;pointer-events:none;z-index:-1;background-image:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="140" height="140" viewBox="0 0 140 140"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="1" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23n)" opacity="0.035"/></svg>');mix-blend-mode:soft-light;opacity:.6}
@keyframes spin{to{transform:rotate(360deg)}}

/* hero */
.mk-hero{padding:120px 20px 38px;text-align:center}
.mk-hero-inner{max-width:1100px;margin:0 auto}
.mk-badge{display:inline-flex;align-items:center;gap:.5rem;padding:.42rem .8rem;border:1px solid rgba(255,255,255,.12);border-radius:999px;background:rgba(255,255,255,.05);color:#dfe7ff}
.mk-hero h1{font-size:clamp(2.2rem,3.8vw,3.6rem);line-height:1.08;margin:1rem 0 .7rem}
.mk-hero h1 span{background:linear-gradient(90deg,#fff,#bcd5ff,#7de3ff);-webkit-background-clip:text;background-clip:text;color:transparent}
.mk-sub{color:var(--muted);max-width:860px;margin:0 auto}

/* sections */
.mk-section{padding:42px 20px}
.mk-section h2{text-align:center;font-size:clamp(1.6rem,2.6vw,2.1rem);margin-bottom:.2rem}
.mk-section-sub{text-align:center;color:var(--muted);max-width:840px;margin:0 auto 1.2rem}

/* grid cards */
.mk-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px;max-width:1200px;margin:0 auto}
.mk-tilt{transition:transform .15s ease;transform-style:preserve-3d;will-change:transform}
.mk-card{position:relative;background:linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.025));border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:16px;overflow:hidden;isolation:isolate}
.mk-card:before{content:"";position:absolute;inset:-1px;background:radial-gradient(340px 190px at var(--glow-x,50%) var(--glow-y,50%), rgba(139,92,246,.25), rgba(34,211,238,.22), transparent 70%);filter:blur(12px);opacity:.5;z-index:-1}
.mk-card-head{display:flex;align-items:center;gap:.55rem}
.mk-ico{font-size:1.32rem}
.mk-card h3{margin:.15rem 0 .15rem;font-size:1.05rem}
.mk-desc{color:var(--muted);font-size:.95rem}
.mk-tags{display:flex;flex-wrap:wrap;gap:.35rem;margin-top:.5rem}
.mk-tag{font-size:.78rem;padding:.22rem .48rem;border-radius:999px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);color:#dfe7ff}

/* steps */
.mk-steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:12px;max-width:1100px;margin:0 auto}
.mk-step{padding:16px;border:1px solid rgba(255,255,255,.1);background:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02));border-radius:14px}
.mk-step-num{color:#9fb2ff;font-weight:700}

/* packages */
.mk-pack-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;max-width:1050px;margin:0 auto}
.mk-pack{padding:16px;border:1px solid rgba(255,255,255,.1);background:linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.02));border-radius:16px}
.mk-pack.highlight{outline:2px solid rgba(139,92,246,.45);box-shadow:0 22px 60px rgba(139,92,246,.22)}
.mk-pack ul{list-style:none;margin:.5rem 0 0;padding:0;display:grid;gap:.4rem}
.mk-pack li{display:flex;align-items:center;gap:.35rem;color:#e6ecff}
.mk-pack li svg{color:#22c55e}

/* FAQ pills */
.mk-accordion{max-width:820px;margin:0 auto;display:grid;gap:12px}
.faq-pill{position:relative;border-radius:18px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);backdrop-filter:blur(8px);overflow:hidden;transition:box-shadow .25s,transform .25s,border-color .25s}
.faq-pill:hover{transform:translateY(-2px);box-shadow:0 14px 36px rgba(0,0,0,.35);border-color:rgba(255,255,255,.22)}
.faq-pill::after{content:"";position:absolute;inset:1px;border-radius:16px;background:radial-gradient(900px 240px at 50% -30%, rgba(139,92,246,.12), rgba(34,211,238,.10), transparent 70%);pointer-events:none}
.faq-head{width:100%;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:14px 18px;background:transparent;border:0;color:inherit;cursor:pointer;text-align:left}
.faq-title{font-weight:600}
.faq-chevron{display:inline-grid;place-items:center;width:34px;height:34px;border-radius:10px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);transition:transform .25s,background .25s;color:#e9ecff}
.faq-pill.open .faq-chevron{transform:rotate(90deg)}
.faq-body{max-height:0;overflow:hidden;transition:max-height .3s ease}
.faq-pill.open .faq-body{max-height:220px}
.faq-body p{padding:0 18px 16px 18px;color:var(--muted)}

/* responsive */
@media (max-width:820px){ .mk-section{padding:32px 16px} .mk-hero{padding-top:110px} }
`;
