// File: src/pages/Mystic.jsx
import React from "react";
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
  return (
    <div className="mystic">
      <style>{styles}</style>

      {/* Breadcrumbs */}
      <nav className="m-crumbs">
        <Link to="/internal" className="m-crumb">Внутренние проекты</Link>
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
          Превратите тренд на wellness и астрологию в стабильную прибыль. Готовое White-Label решение для вашей аудитории: повышайте вовлеченность (LTV), запускайте новые каналы монетизации и интегрируйте сервис по API всего за пару недель без сложных разработок.
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
  --text:#e9edff; --muted:#94a3b8; --stroke:rgba(255,255,255,.1);
}
.mystic{position:relative; min-height:100vh; color:var(--text); background: radial-gradient(circle at 50% -20%, #171e3b 0%, #0f172a 40%, #020617 100%); overflow-x:hidden; font-family: system-ui, -apple-system, sans-serif;}

/* crumbs */
.m-crumbs{max-width:1100px; margin:86px auto 10px; padding:0 16px; display:flex; align-items:center; gap:8px; color:#94a3b8; font-size: 0.9rem;}
.m-crumb{color:#94a3b8; text-decoration:none; transition: color 0.15s ease}
.m-crumb:hover{color:#cbd5e1}
.m-crumb.active{color:#e2e8f0; font-weight: 500;}
.m-sep{opacity:.4}

/* hero */
.m-hero{padding:30px 16px 10px;}
.m-hero-inner{max-width:1100px; margin:0 auto; text-align:center; position:relative}
.m-badge{display:inline-flex; align-items:center; gap:.55rem; padding:.45rem .8rem; border:1px solid var(--stroke); border-radius:999px; background:rgba(255,255,255,.03); color:#cbd5e1; backdrop-filter: blur(6px); font-size: 0.85rem;}
.m-hero h1{margin:1.4rem 0 1rem; font-size:clamp(2.1rem, 4vw, 3.3rem); line-height:1.2;
  background: linear-gradient(90deg, #f8fafc, #cbd5e1, #94a3b8); -webkit-background-clip:text; color:transparent; font-weight: 700; letter-spacing: -0.02em;}
.m-hero h1 span{display: block; font-size: 0.65em; font-weight: 500; color:#94a3b8; -webkit-text-fill-color: #94a3b8; margin-top: 0.3rem;}
.m-sub{max-width:860px; margin:0 auto; color:var(--muted); font-size: 1.1rem; line-height: 1.6;}
.m-cta{display:flex; justify-content:center; gap:.7rem; flex-wrap:wrap; margin-top:1.5rem}
.btn{display:inline-flex; align-items:center; gap:.6rem; padding:.8rem 1.4rem; border-radius:999px; text-decoration:none; font-weight:600; transition: all .2s ease;}
.btn-primary{color:#020617; background:#e2e8f0; border:1px solid rgba(255,255,255,.8); box-shadow:0 4px 14px rgba(255,255,255,.1)}
.btn-primary:hover{background:#ffffff; transform: translateY(-1px);}

/* sections */
.m-section{position:relative; padding: 50px 16px 20px}
.m-section h2{text-align:center; font-size:clamp(1.6rem, 2.8vw, 2.2rem); margin-bottom:.6rem; color:#f8fafc; font-weight: 600; letter-spacing: -0.01em;}
.m-section-sub{text-align:center; color:var(--muted); max-width:860px; margin:0 auto 3rem; font-size: 1.05rem; line-height: 1.6;}

/* cards grid */
.m-grid{max-width:1100px; margin:0 auto; display:grid; gap:20px; grid-template-columns: repeat( auto-fit, minmax(240px, 1fr) )}
.m-card{position:relative; border:1px solid rgba(255,255,255,.06); border-radius:14px; padding:28px 24px;
  background:rgba(255,255,255,.02);
  transition: all .2s ease;
}
.m-card:hover{background:rgba(255,255,255,.04); border-color: rgba(255,255,255,.15);}
.m-ico{font-size:1.5rem; color:#9fb1ff; margin-bottom: 16px;}
.m-card h3{margin:0 0 .6rem; font-size:1.15rem; color:#f8fafc; font-weight: 600;}
.m-card p{color:var(--muted); font-size: 0.95rem; line-height: 1.6; margin: 0;}

/* steps */
.m-steps{max-width:1050px; margin:0 auto; display:grid; gap:16px; grid-template-columns: repeat( auto-fit, minmax(230px, 1fr) )}
.m-step{border:1px solid rgba(255,255,255,.06); border-radius:14px; padding:24px; background:rgba(255,255,255,.02);}
.m-step-num{font-weight:600; color:#cbd5e1; opacity:.8; font-size:.85rem; margin-bottom: 14px; display:inline-block; padding: 0.2rem 0.6rem; border-radius: 6px; background: rgba(255,255,255,.06); letter-spacing: 0.05em;}
.m-step h4{margin:0 0 .6rem; font-size:1.1rem; color:#f8fafc; font-weight: 600;}
.m-step p{color:var(--muted); font-size: 0.95rem; line-height: 1.6; margin: 0;}

/* benefits */
.m-benefits{max-width:1000px; margin:0 auto; display:grid; gap:16px; grid-template-columns: repeat( auto-fit, minmax(260px, 1fr) )}
.m-benefit{display:flex; gap:1.2rem; align-items:flex-start; border:1px solid rgba(255,255,255,.06); border-radius:14px; padding:24px;
  background:rgba(255,255,255,.02);
}
.m-bico{width:44px; height:44px; display:grid; place-items:center; border-radius:10px;
  background:rgba(255,255,255,.06); color:#9fb1ff; flex-shrink: 0; font-size: 1.2rem;}
.m-benefit h4{margin:0 0 .4rem; font-size:1.1rem; color:#f8fafc; font-weight: 600;}
.m-benefit p{margin: 0; color:var(--muted); font-size: 0.95rem; line-height: 1.6;}

.center{text-align:center; justify-content:center;}

/* footer nav */
.m-foot{max-width:1100px; margin: 24px auto 80px; padding: 40px 16px 0; border-top: 1px solid rgba(255,255,255,.05); display:flex; justify-content:space-between; align-items:center; color:#94a3b8; flex-wrap:wrap; gap:12px; font-size: 0.9rem;}
.m-back{color:#94a3b8; text-decoration:none; transition: color 0.15s ease;}
.m-back:hover{color:#cbd5e1;}

@media (max-width: 780px){
  .m-crumbs{margin-top:96px}
}
`;
