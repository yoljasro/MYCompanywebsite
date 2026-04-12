import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMagic, FaChartPie, FaWallet, FaShieldAlt, FaRocket,
  FaPlaneDeparture, FaGlobeEurope, FaArrowRight
} from "react-icons/fa";

export default function InternalProjects() {
  // ===== Scroll-reveal =====

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
          logo={<span className="logo-circ"><FaMagic /></span>}
          title="Mystic"
          tag="Астрология • Знакомства • Медитации"
          points={[
            "Астрологические прогнозы",
            "Знакомства и комьюнити по интересам",
            "Медитации и практики для гармонии",
          ]}
          offer="Mystic — это инвестиционный проект, который объединяет астрологию, знакомства и практики для роста. Ищем партнёров для масштабирования контента и маркетинга."
          route="/mystic"
        />


        <ProjectCard
          theme="cyan"
          logo={<span className="logo-circ"><FaWallet /></span>}
          title="FinTech (Crypto Bank)"
          tag="Платёжная экосистема"
          points={[
            "Кастодиальные и некастодиальные кошельки",
            "P2P/Off-ramp, мультивалютные карты",
            "Агрегатор курсов и быстрая конвертация",
            "Контроль рисков, KYC/AML, антифрод"
          ]}
          offer="Открыты к инвестициям и стратегическим интеграциям: эмиссия карт, процессинг, локализация под рынки."
          route="/fintech"
        />

        <ProjectCard
          theme="mint"
          logo={<span className="logo-circ"><FaPlaneDeparture /></span>}
          title="StellarBond"
          tag="Туризм и путешествия"
          points={[
            "Умное планирование маршрутов (AI)",
            "Онлайн-бронирование, страхование и визовая поддержка",
            "Динамическое ценообразование и кэшбэк",
            "Комьюнити-гид и UGC-контент"
          ]}
          offer="Нужны партнёры из travel-сферы и инвестиции в контент/договорные сети, запуск пилота в 2–3 странах."
          route="/travelcand"
        />
      </section>

      {/* Why invest */}
      <section className="ip-why reveal">
        <h2>Почему это интересно инвестору</h2>
        <div className="ip-why-grid">
          <Why icon={<FaRocket />} title="Быстрый пилот">
            MVP-подход, time-to-market 6–12 недель, метрики и экономика на ранних этапах.
          </Why>
          <Why icon={<FaChartPie />} title="Прозрачная экономика">
            Юнит-экономика, отчётность, недельные спринты и трекинг гипотез.
          </Why>
          <Why icon={<FaShieldAlt />} title="Риски под контролем">
            Правовые и тех-риски, безопасность данных, масштабируемая архитектура.
          </Why>
          <Why icon={<FaGlobeEurope />} title="Глобальный взгляд">
            Продукты проектируются для быстрого выхода на зарубежные рынки.
          </Why>
        </div>
        <div className="ip-cta-wrap">
          {/* MAIN CTA → /contact */}
          <button type="button" onClick={goContact} className="ip-btn">
            Связаться и получить питч <FaArrowRight />
          </button>
        </div>
      </section>
    </div>
  );
}

function ProjectCard({ theme, logo, title, tag, points, offer, route }) {
  const navigate = useNavigate();
  const go = () => route && navigate(route);

  // Enter / Space bilan ham ishlasin
  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      go();
    }
  };

  return (
    <article
      onClick={go}
      onKeyDown={onKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`${title} — Подробнее`}
      className={`ip-card reveal`}
    >
      <div className="ip-card-head">
        <div className="ip-logo">{logo}</div>
        <div className="ip-titles">
          <h3>{title}</h3>
          <span className="ip-tag">{tag}</span>
        </div>
      </div>

      <ul className="ip-list">
        {points.map((p) => <li key={p}>{p}</li>)}
      </ul>

      <p className="ip-offer">{offer}</p>

      <div className="ip-actions">
        {/* BARCHA TUGMALAR → card route */}
        <button
          type="button"
          className="ip-cta filled"
          onClick={(e) => { e.stopPropagation(); go(); }}
        >
          Подробно
        </button>
      </div>
    </article>
  );
}

function Why({ icon, title, children }) {
  return (
    <div className="ip-why-card reveal">
      <div className="wh-ico">{icon}</div>
      <div>
        <h4>{title}</h4>
        <p>{children}</p>
      </div>
    </div>
  );
}

const styles = `
:root{
  --text:#f1f5f9; --muted:#94a3b8; --stroke:rgba(255,255,255,.05);
}

/* page */
.ip{ position:relative; min-height:100vh; color:var(--text); background: radial-gradient(circle at 50% -20%, #171e3b 0%, #0f172a 40%, #020617 100%); overflow-x:hidden; font-family: system-ui, -apple-system, sans-serif;}

/* reveal */
.reveal{ opacity:0; transform: translateY(16px); transition: opacity .5s ease, transform .5s ease; }
.reveal.in{ opacity:1; transform: translateY(0); }

/* HERO */
.ip-hero{ padding: 100px 16px 20px; text-align:center; }
.ip-hero-inner{ max-width:1100px; margin:0 auto; }
.ip-hero h1{
  margin:.9rem 0 .6rem; font-size: clamp(2.2rem, 4vw, 3.2rem);
  background:linear-gradient(90deg, #f8fafc, #cbd5e1, #94a3b8); -webkit-background-clip:text; color:transparent; font-weight: 700; letter-spacing: -0.02em;
}
.ip-sub{ color:var(--muted); max-width:860px; margin:0 auto; font-size: 1.1rem; line-height: 1.6;}

/* GRID */
.ip-grid{
  max-width:1150px; margin: 30px auto 60px; padding:0 16px;
  display:grid; gap:20px; grid-template-columns: repeat( auto-fit, minmax(300px, 1fr) );
}

/* CARD */
.ip-card{
  position:relative; border:1px solid var(--stroke); border-radius:14px;
  background: rgba(255,255,255,.02);
  padding:28px 24px; min-height: 248px;
  transition: all .2s ease;
  cursor:pointer;
}
.ip-card:hover{ background:rgba(255,255,255,.03); border-color: rgba(255,255,255,.12); box-shadow: 0 10px 40px rgba(0,0,0,0.3); }

.ip-card-head{ display:flex; align-items:center; gap:16px; margin-bottom: 20px; }
.ip-logo{ width:48px; height:48px; border-radius:12px; display:grid; place-items:center;
  background: rgba(255,255,255,.06); color:#cbd5e1; font-size:22px; 
}
.logo-circ{ display:flex; align-items:center; justify-content:center; }
.ip-titles h3{ margin:0; font-size:1.15rem; color:#f8fafc; font-weight: 600; }
.ip-tag{ color:#94a3b8; font-size:0.9rem; margin-top:2px; display:block; }

.ip-list{ margin:0 0 16px; padding:0 0 0 1.2rem; }
.ip-list li{ margin:6px 0; color:#cbd5e1; font-size: 0.95rem; }
.ip-offer{ color:var(--muted); margin:0 0 20px; font-size: 0.95rem; line-height: 1.6;}

.ip-actions{ display:flex; gap:10px; }
.ip-cta{ display:inline-flex; align-items:center; justify-content:center; gap:8px; padding:10px 20px; border-radius:8px; text-decoration:none; font-weight:600; font-size: 0.95rem; transition:all 0.2s; }
.ip-cta.filled{ color:#0f172a; background: #e2e8f0; border:1px solid rgba(255,255,255,.8); box-shadow:0 2px 10px rgba(255,255,255,.05); }
.ip-cta.filled:hover{ background:#ffffff; transform:translateY(-1px); }

/* WHY */
.ip-why{ padding: 30px 16px 80px; }
.ip-why h2{ text-align:center; font-size: clamp(1.6rem, 2.8vw, 2.2rem); margin:0 0 30px; font-weight: 600; color:#f8fafc; letter-spacing: -0.01em;}
.ip-why-grid{
  max-width:1050px; margin:0 auto; display:grid; gap:16px;
  grid-template-columns: repeat( auto-fit, minmax(240px, 1fr) );
}
.ip-why-card{
  display:flex; gap:16px; align-items:flex-start; padding:24px; border-radius:14px; border:1px solid var(--stroke);
  background:rgba(255,255,255,.02);
  transition:all 0.2s;
}
.ip-why-card:hover{ background:rgba(255,255,255,.03); border-color: rgba(255,255,255,.1); }
.wh-ico{ font-size:1.2rem; width:40px; height:40px; display:grid; place-items:center; border-radius:10px;
  background:rgba(255,255,255,.06); color:#cbd5e1; flex-shrink:0; }
.ip-why-card h4{ margin:0 0 6px; font-size:1.05rem; color:#f8fafc; font-weight: 600; }
.ip-why-card p{ color:var(--muted); margin:0; font-size: 0.95rem; line-height: 1.6; }

/* CTA */
.ip-cta-wrap{ display:flex; justify-content:center; margin-top:40px; }
.ip-btn{
  display:inline-flex; align-items:center; gap:10px; padding:14px 28px; border-radius:10px; text-decoration:none; font-weight:600; font-size:1.05rem;
  color:#0f172a; background: #e2e8f0; border:1px solid rgba(255,255,255,.8);
  box-shadow: 0 4px 14px rgba(255,255,255,.05); transition: all .2s ease; cursor:pointer;
}
.ip-btn:hover{ background:#ffffff; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(255,255,255,.1); }

/* Responsive */
@media (max-width: 780px){
  .ip-hero{ padding-top:90px }
  .ip-card{ min-height: auto }
}
`;
