import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBullhorn, FaChartLine, FaShareAlt, FaCamera, FaVideo, FaBullseye, FaUsers,
  FaCalendarCheck, FaFunnelDollar, FaProjectDiagram, FaRobot, FaComments,
  FaChartPie, FaPaintBrush, FaTiktok, FaFacebook, FaInstagram, FaGoogle,
  FaGlobe, FaQuoteLeft, FaCheckCircle, FaChevronLeft, FaChevronRight, FaTelegramPlane, FaWhatsapp
} from "react-icons/fa";

const iconCss = { verticalAlign: "-2px", marginRight: 8 };

// —— Reusable Tilt Card ——
function TiltCard({ className = "", children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const px = (x / r.width) * 2 - 1; // -1..1
      const py = (y / r.height) * 2 - 1;
      el.style.transform = `perspective(900px) rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 10).toFixed(2)}deg) translateZ(0)`;
      const glowX = 50 + px * 50;
      const glowY = 50 + py * 50;
      el.style.setProperty("--glow-x", `${glowX}%`);
      el.style.setProperty("--glow-y", `${glowY}%`);
    };
    const reset = () => {
      el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)";
      el.style.setProperty("--glow-x", `50%`);
      el.style.setProperty("--glow-y", `50%`);
    };
    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", reset);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", reset);
    };
  }, []);

  return (
    <div ref={ref} className={`tilt ${className}`}>{children}</div>
  );
}

// —— Floating Orbs Canvas background ——
function useOrbsBackground(canvasId = "mk-orbs") {
  useEffect(() => {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const DPR = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = canvas.clientWidth * DPR;
      canvas.height = canvas.clientHeight * DPR;
      ctx.scale(DPR, DPR);
    };
    resize();

    const colors = [
      { from: "rgba(120, 119, 255, 0.35)", to: "rgba(255, 119, 221, 0.35)" },
      { from: "rgba(0, 209, 178, 0.30)", to: "rgba(0, 122, 255, 0.30)" },
      { from: "rgba(255, 183, 77, 0.30)", to: "rgba(255, 99, 132, 0.30)" },
    ];

    const orbs = Array.from({ length: 14 }).map((_, i) => ({
      x: Math.random() * canvas.clientWidth,
      y: Math.random() * canvas.clientHeight,
      r: 80 + Math.random() * 140,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      c: colors[i % colors.length],
    }));

    let raf;
    const draw = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      // subtle backdrop
      const grd = ctx.createLinearGradient(0, 0, w, h);
      grd.addColorStop(0, "rgba(9, 9, 15, 1)");
      grd.addColorStop(1, "rgba(15, 10, 25, 1)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);

      orbs.forEach((o) => {
        o.x += o.dx; o.y += o.dy;
        if (o.x < -o.r) o.x = w + o.r;
        if (o.x > w + o.r) o.x = -o.r;
        if (o.y < -o.r) o.y = h + o.r;
        if (o.y > h + o.r) o.y = -o.r;

        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        g.addColorStop(0, o.c.to);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => { resize(); };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, [canvasId]);
}

const services = [
  { icon: <FaShareAlt style={iconCss} />, title: "SMM‑продвижение", desc: "Контент‑стратегия, контент‑план, Reels/Shorts, комьюнити‑менеджмент, геймификация.", tags: ["Instagram", "TikTok", "YouTube Shorts"] },
  { icon: <FaBullseye style={iconCss} />, title: "Performance‑реклама", desc: "Точечные кампании в Meta, TikTok, Google/YouTube, Yandex. A/B тесты, ретаргетинг.", tags: ["Lead Gen", "Conversions", "ROAS"] },
  { icon: <FaCamera style={iconCss} />, title: "Мобилография/Фото", desc: "Съёмка для меню, каталога, UGC; лайфстайл‑контент для соцсетей.", tags: ["UGC", "Product", "Lifestyle"] },
  { icon: <FaVideo style={iconCss} />, title: "Видеопродакшн", desc: "Рилсы, клипы, промо‑ролики, интервью. Скрипт → съёмка → монтаж → цвет.", tags: ["Reels", "Promo", "Docu"] },
  { icon: <FaPaintBrush style={iconCss} />, title: "Айдентика и дизайн", desc: "Лого, гид по стилю, соцмедиа‑пак, лендинги и продающие креативы.", tags: ["Brand", "Guidelines", "Creatives"] },
  { icon: <FaRobot style={iconCss} />, title: "Автоматизация/боты", desc: "Telegram‑боты для лидов/продаж, авто‑ответы, квизы, интеграции CRM.", tags: ["TG Bot", "CRM", "Auto‑reply"] },
  { icon: <FaComments style={iconCss} />, title: "Influencer/PR", desc: "Подбор блогеров, бартер/CPA‑схемы, спецпроекты, пресс‑релизы.", tags: ["CPM/CPA", "PR" ] },
  { icon: <FaChartPie style={iconCss} />, title: "Аналитика и BI", desc: "Единая дашборд‑панель: рекламные каналы, воронка, LTV, CAC/ROMI.", tags: ["GA4", "Data Studio", "BI"] },
  { icon: <FaFunnelDollar style={iconCss} />, title: "Воронки и лендинги", desc: "Лиды → квизы → прогрев → продажи. UX‑лендинги под оффер.", tags: ["CRO", "LP", "Quiz"] },
  { icon: <FaGlobe style={iconCss} />, title: "SEO / ASO", desc: "Страницы, блоги, карточки приложений. Семантика, тексты, on‑page.", tags: ["Organic", "ASO", "Technical"] },
];

const cases = [
  {
    name: "HoReCa (бронь столов)",
    text: "Target + Reels prod.: рост бронирований ×2.3 за 6 недель, стоимость лида −41%.",
    kpis: ["CTR 2.8%", "CPL −41%", "2.3× броней"],
  },
  {
    name: "Retail (e‑com)",
    text: "SMM + UGC + ремаркетинг: рост выручки +32% за 3 месяца.",
    kpis: ["ROAS 3.7", "AOV +18%", "CAC −25%"],
  },
  {
    name: "EdTech (MVP)",
    text: "Лендинг + квиз‑воронка + TikTok Ads: 480 заявок по $1.92, 9.7% конверсия в оплату.",
    kpis: ["CPL $1.92", "CRtoPay 9.7%", "ROMI 4.2"],
  },
];

const faqs = [
  { q: "Сколько длится запуск?", a: "Обычно 10–14 дней: стратегия, креативы, технастройки, аналитика. Для полного продакшна — 2–4 недели." },
  { q: "Нужен ли бюджет на рекламу?", a: "Да. Мы планируем медиасплит и тестовые бюджеты. Минимум рекомендуем $500–$1,500 в месяц в зависимости от ниши." },
  { q: "Как отчитываетесь?", a: "Еженедельные отчёты + живой дашборд (GA4/Data Studio). Показатели: лиды/продажи, CAC/ROAS, динамика, гипотезы." },
  { q: "Работаете по KPI?", a: "Делаем KPI‑рамку: цели, вехи, SLA по срокам и качеству. Прозрачная смета и спринт‑подход." },
];

export default function Marketing() {
  useOrbsBackground("mk-orbs");
  const [caseIndex, setCaseIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCaseIndex((i) => (i + 1) % cases.length), 6000);
    return () => clearInterval(id);
  }, []);

  const prev = () => setCaseIndex((i) => (i - 1 + cases.length) % cases.length);
  const next = () => setCaseIndex((i) => (i + 1) % cases.length);

  return (
    <div className="mk-page">
      {/* Inline styles to keep this file self‑contained */}
      <style>{styles}</style>

      {/* Animated background */}
      <canvas id="mk-orbs" className="mk-bg" />
      <div className="mk-noise" aria-hidden="true" />

      {/* Hero */}
      <section className="mk-hero">
        <div className="mk-hero-inner">
          <div className="mk-badge">
            <FaBullhorn /> Полный цикл маркетинга
          </div>
          <h1>
            Масштабируйте бренд: <span>Стратегия → Контент → Реклама → Продажи</span>
          </h1>
          <p className="mk-sub">
            IT + Marketing + Invest — bir joyda. Мы закрываем весь цикл: от позиционирования и креативов до
            performance‑кампаний, аналитики и автоматизации.
          </p>
          <div className="mk-cta">
            <a className="btn btn-primary" href="https://t.me/" target="_blank" rel="noreferrer">
              <FaTelegramPlane /> Telegram
            </a>
            <a className="btn btn-ghost" href="https://wa.me/" target="_blank" rel="noreferrer">
              <FaWhatsapp /> WhatsApp
            </a>
            <Link className="btn btn-link" to="/services/it">Нужен сайт/бот?</Link>
          </div>
          <div className="mk-logos">
            <span className="mk-chip"><FaInstagram /> Instagram</span>
            <span className="mk-chip"><FaTiktok /> TikTok</span>
            <span className="mk-chip"><FaFacebook /> Meta</span>
            <span className="mk-chip"><FaGoogle /> Google/YouTube</span>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="mk-section">
        <h2>Что делаем</h2>
        <p className="mk-section-sub">Полный стек услуг — от SMM и продакшна до performance и BI‑аналитики.</p>
        <div className="mk-grid">
          {services.map((s, i) => (
            <TiltCard key={i} className="mk-card">
              <div className="mk-card-head">
                <div className="mk-ico">{s.icon}</div>
                <h3>{s.title}</h3>
              </div>
              <p className="mk-desc">{s.desc}</p>
              <div className="mk-tags">
                {s.tags.map((t) => (
                  <span key={t} className="mk-tag">{t}</span>
                ))}
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* Process timeline */}
      <section className="mk-section">
        <h2>Как работаем</h2>
        <p className="mk-section-sub">Спринтовая модель: быстрые гипотезы, измеримый результат.</p>
        <div className="mk-steps">
          <TiltCard className="mk-step">
            <div className="mk-step-num">01</div>
            <h4><FaProjectDiagram style={iconCss}/> Стратегия</h4>
            <p>Аудит, ЦА, позиционирование, tone of voice, медиаплан/контент‑план.</p>
          </TiltCard>
          <TiltCard className="mk-step">
            <div className="mk-step-num">02</div>
            <h4><FaCalendarCheck style={iconCss}/> Продакшн</h4>
            <p>Скрипты, съёмки, дизайн‑пак, landing/квиз, подготовка UTM/пикселей.</p>
          </TiltCard>
          <TiltCard className="mk-step">
            <div className="mk-step-num">03</div>
            <h4><FaBullseye style={iconCss}/> Запуск</h4>
            <p>Meta/TikTok/Google. A/B креативов и офферов, ретаргетинг, look‑a‑like.</p>
          </TiltCard>
          <TiltCard className="mk-step">
            <div className="mk-step-num">04</div>
            <h4><FaChartLine style={iconCss}/> Аналитика</h4>
            <p>GA4 + Data Studio дашборд, срезы по воронке, LTV, CAC/ROAS, гипотезы.</p>
          </TiltCard>
        </div>
      </section>

      {/* Cases slider */}
      <section className="mk-section mk-cases">
        <h2>Кейсы и результаты</h2>
        <div className="mk-case-wrap">
          <button className="nav-btn left" onClick={prev} aria-label="previous"><FaChevronLeft/></button>
          {cases.map((c, i) => (
            <div key={i} className={`mk-case ${i === caseIndex ? 'active' : ''}`}>
              <FaQuoteLeft className="mk-quote"/>
              <h4>{c.name}</h4>
              <p>{c.text}</p>
              <div className="mk-kpis">
                {c.kpis.map((k) => <span key={k} className="mk-kpi">{k}</span>)}
              </div>
            </div>
          ))}
          <button className="nav-btn right" onClick={next} aria-label="next"><FaChevronRight/></button>
        </div>
        <div className="t-dots">
          {cases.map((_, i) => (
            <button key={i} className={`dot ${i === caseIndex ? 'active' : ''}`} onClick={() => setCaseIndex(i)} aria-label={`case ${i+1}`}/>
          ))}
        </div>
      </section>

      {/* Packages */}
      <section className="mk-section">
        <h2>Пакеты и формат работы</h2>
        <p className="mk-section-sub">Подбираем под нишу и цели. Можно кастомизировать.</p>
        <div className="mk-pack-grid">
          <TiltCard className="mk-pack">
            <h3>Starter</h3>
            <ul>
              <li><FaCheckCircle/> Контент‑план + дизайн</li>
              <li><FaCheckCircle/> 8–12 постов/мес + 4–6 Reels</li>
              <li><FaCheckCircle/> Настройка рекламного кабинета</li>
              <li><FaCheckCircle/> Еженедельный отчёт</li>
            </ul>
          </TiltCard>
          <TiltCard className="mk-pack highlight">
            <h3>Growth</h3>
            <ul>
              <li><FaCheckCircle/> SMM + видеопродакшн (до 8–10 Reels)</li>
              <li><FaCheckCircle/> Performance‑реклама (Meta/TikTok/Google)</li>
              <li><FaCheckCircle/> Дашборд (GA4/Data Studio)</li>
              <li><FaCheckCircle/> A/B тесты + ретаргетинг</li>
            </ul>
          </TiltCard>
          <TiltCard className="mk-pack">
            <h3>Pro</h3>
            <ul>
              <li><FaCheckCircle/> Полный цикл: стратегия → продакшн → реклама</li>
              <li><FaCheckCircle/> Фулл‑фаннел (UGC, инфлюенсеры, PR)</li>
              <li><FaCheckCircle/> Воронки/квизы/лендинги + TG‑бот</li>
              <li><FaCheckCircle/> KPI‑рамка + спринты + SLA</li>
            </ul>
          </TiltCard>
        </div>
      </section>

      {/* FAQ */}
      <section className="mk-section mk-faq">
        <h2>FAQ</h2>
        <div className="mk-accordion">
          {faqs.map((f, i) => <FaqItem key={i} f={f} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="mk-cta">
        <div className="mk-cta-inner">
          <h3>Готовы обсудить ваш маркетинг?</h3>
          <p>Напишите нам — в течение 24 часов подготовим бесплатную консультацию и дорожную карту на 1–2 месяца.</p>
          <div className="mk-cta-actions">
            <a className="btn btn-primary" href="https://t.me/" target="_blank" rel="noreferrer"><FaTelegramPlane/> Telegram</a>
            <a className="btn btn-ghost" href="https://wa.me/" target="_blank" rel="noreferrer"><FaWhatsapp/> WhatsApp</a>
            <Link className="btn btn-link" to="/services">Вернуться к услугам</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FaqItem({ f }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq ${open ? 'open' : ''}`}>
      <button className="faq-q" onClick={() => setOpen(v => !v)}>
        <span>{f.q}</span>
        <span className="faq-ico">{open ? '−' : '+'}</span>
      </button>
      <div className="faq-a"><p>{f.a}</p></div>
    </div>
  );
}

// —— Styles (scoped via class prefixes) ——
const styles = `
:root {
  --mk-bg: #0a0b10;
  --mk-card: #0f1220;
  --mk-card-2: #12162a;
  --mk-text: #e6e7ee;
  --mk-sub: #a9acc7;
  --mk-accent: #8b5cf6; /* violet */
  --mk-accent-2: #22d3ee; /* cyan */
  --mk-success: #22c55e;
  --mk-danger: #ef4444;
}
* { box-sizing: border-box; }
body { background: var(--mk-bg); }
.mk-page { position: relative; color: var(--mk-text); min-height: 100vh; overflow-x: hidden; }
.mk-bg { position: fixed; inset: 0; width: 100%; height: 100%; z-index: -2; display:block; }
.mk-noise { position: fixed; inset:0; pointer-events:none; z-index: -1; background-image: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"140\" height=\"140\" viewBox=\"0 0 140 140\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"1\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23n)\" opacity=\"0.035\"/></svg>'); mix-blend-mode: soft-light; opacity:.6 }

/* Buttons */
.btn { display:inline-flex; align-items:center; gap:.5rem; padding:.85rem 1.1rem; border-radius: 999px; text-decoration:none; transition: transform .2s ease, box-shadow .2s ease; will-change: transform; }
.btn:hover { transform: translateY(-2px); }
.btn-primary { background: linear-gradient(135deg, var(--mk-accent), var(--mk-accent-2)); color:white; box-shadow: 0 10px 30px rgba(139,92,246,.35); }
.btn-ghost { border:1px solid rgba(255,255,255,.2); color: var(--mk-text); }
.btn-link { color: var(--mk-accent-2); }

/* Hero */
.mk-hero { position: relative; padding: 7rem 1.25rem 3rem; text-align:center; }
.mk-hero-inner { max-width: 1100px; margin: 0 auto; }
.mk-badge { display:inline-flex; align-items:center; gap:.5rem; padding:.4rem .8rem; border:1px solid rgba(255,255,255,.1); border-radius:999px; font-size:.9rem; color:#d9dcff; background: radial-gradient(100% 100% at var(--glow-x,50%) var(--glow-y,50%), rgba(139,92,246,.2), rgba(34,211,238,.15) 60%, transparent 80%); }
.mk-hero h1 { font-size: clamp(2.2rem, 3.8vw, 3.6rem); line-height: 1.1; margin: 1rem 0 .75rem; }
.mk-hero h1 span { background: linear-gradient(90deg, #fff, #a7b7ff, #7de3ff); -webkit-background-clip: text; background-clip: text; color: transparent; }
.mk-sub { font-size: clamp(1rem, 1.4vw, 1.1rem); color: var(--mk-sub); max-width: 840px; margin: 0 auto 1.4rem; }
.mk-cta { display:flex; justify-content:center; gap:.8rem; flex-wrap:wrap; margin-top: .7rem; }
.mk-logos { display:flex; justify-content:center; gap:.6rem; flex-wrap:wrap; margin-top: 1rem; }
.mk-chip { font-size:.9rem; padding:.4rem .6rem; border-radius: 999px; background: rgba(255,255,255,.06); color:#cfe7ff; border:1px solid rgba(255,255,255,.08) }

/* Sections */
.mk-section { position: relative; padding: 3.6rem 1.25rem; }
.mk-section h2 { text-align:center; font-size: clamp(1.6rem, 2.8vw, 2.2rem); margin-bottom:.4rem }
.mk-section-sub { text-align:center; color: var(--mk-sub); max-width: 860px; margin: 0 auto 2rem; }

/* Grid */
.mk-grid { display:grid; grid-template-columns: repeat( auto-fit, minmax(260px, 1fr) ); gap: 16px; max-width: 1200px; margin: 0 auto; }
.mk-card { position: relative; background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.025)); border:1px solid rgba(255,255,255,.08); border-radius: 18px; padding: 18px; overflow:hidden; isolation:isolate; }
.mk-card:before { content:""; position:absolute; inset:-1px; background: radial-gradient( 320px 200px at var(--glow-x,50%) var(--glow-y,50%), rgba(139,92,246,.25), rgba(34,211,238,.22), transparent 70% ); filter: blur(14px); opacity:.5; z-index: -1 }
.mk-card .mk-ico { font-size: 1.4rem; color:#e9e9ff; }
.mk-card h3 { margin: .35rem 0 .2rem; font-size: 1.15rem; }
.mk-card .mk-desc { color: var(--mk-sub); font-size: .98rem; }
.mk-tags { display:flex; flex-wrap:wrap; gap:.4rem; margin-top:.65rem; }
.mk-tag { font-size:.8rem; padding:.25rem .5rem; border-radius:999px; background: rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.08); color:#dfe7ff }

/* Tilt */
.tilt { transition: transform .15s ease; transform-style: preserve-3d; will-change: transform; }

/* Steps */
.mk-steps { display:grid; grid-template-columns: repeat( auto-fit, minmax(230px, 1fr) ); gap:14px; max-width:1100px; margin:0 auto }
.mk-step { padding: 20px; background: linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.02)); border:1px solid rgba(255,255,255,.08); border-radius:16px }
.mk-step-num { font-weight:700; color:#99a2ff; opacity:.8; }
.mk-step h4 { margin:.2rem 0 .2rem }
.mk-step p { color: var(--mk-sub); }

/* Cases */
.mk-cases { overflow:hidden; }
.mk-case-wrap { position:relative; max-width: 950px; margin: 0 auto; display:grid; grid-template-columns: 1fr; align-items:center; }
.mk-case { position:absolute; left:50%; transform: translateX(-50%) scale(.92) rotateX(10deg); top:0; width: min(95%, 820px); background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02)); border:1px solid rgba(255,255,255,.09); border-radius:20px; padding:22px; opacity:0; transition: all .6s cubic-bezier(.2,.7,.2,1); box-shadow: 0 50px 120px rgba(0,0,0,.35); backdrop-filter: blur(6px); min-height: 180px; }
.mk-case.active { position:relative; transform: translateX(0) scale(1) rotateX(0deg); opacity:1; }
.mk-case h4 { margin: .2rem 0 .2rem; }
.mk-case p { color: var(--mk-sub); }
.mk-kpis { display:flex; gap:.5rem; flex-wrap:wrap; margin-top:.6rem }
.mk-kpi { padding:.35rem .55rem; border-radius:999px; background: rgba(34,211,238,.12); color:#b8f2ff; border:1px solid rgba(34,211,238,.25) }
.mk-quote { opacity:.25; font-size: 1.4rem; }
.nav-btn { position:absolute; top:50%; transform: translateY(-50%); width:42px; height:42px; display:grid; place-items:center; border-radius:999px; border:1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.04); color:#fff; }
.nav-btn.left { left:-2px }
.nav-btn.right { right:-2px }
.t-dots { display:flex; justify-content:center; gap:.4rem; margin-top: 12rem; }
.dot { width:9px; height:9px; border-radius:999px; background:#3b3f6b; border:none }
.dot.active { background:#9aa3ff }

/* Packages */
.mk-pack-grid { display:grid; grid-template-columns: repeat( auto-fit, minmax(240px, 1fr) ); gap: 14px; max-width: 1050px; margin:0 auto }
.mk-pack { padding: 18px; border:1px solid rgba(255,255,255,.1); background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02)); border-radius: 18px }
.mk-pack h3 { margin-top: .1rem }
.mk-pack ul { list-style:none; padding:0; margin:.6rem 0 0; display:grid; gap:.45rem }
.mk-pack li { display:flex; align-items:center; gap:.4rem; color:#dfe7ff }
.mk-pack li svg { color: var(--mk-success) }
.mk-pack.highlight { outline: 2px solid rgba(139,92,246,.45); box-shadow: 0 20px 60px rgba(139,92,246,.25); }

/* FAQ */
.mk-accordion { max-width: 950px; margin: 0 auto; display:grid; gap:8px }
.faq { border:1px solid rgba(255,255,255,.1); border-radius:14px; background: rgba(255,255,255,.04); overflow:hidden }
.faq-q { width:100%; background:none; border:none; color:inherit; display:flex; align-items:center; justify-content:space-between; padding: 14px 16px; font-size:1rem; text-align:left }
.faq-a { max-height:0; overflow:hidden; transition:max-height .35s ease; }
.faq.open .faq-a { max-height: 300px; }
.faq-a p { padding: 0 16px 14px; color: var(--mk-sub) }

/* CTA */
.mk-cta { padding: 3.2rem 1.25rem 5rem; }
.mk-cta-inner { max-width: 980px; margin: 0 auto; text-align:center; border:1px dashed rgba(255,255,255,.18); border-radius: 20px; padding: 28px; background: radial-gradient(120% 120% at 50% 0%, rgba(139,92,246,.18), rgba(34,211,238,.18), transparent 60%); }
.mk-cta-actions { display:flex; justify-content:center; gap:.7rem; flex-wrap:wrap; margin-top:.6rem }
`;
