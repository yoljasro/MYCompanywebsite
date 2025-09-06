import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaComments,
  FaBrain,
  FaCamera,
  FaCogs,
  FaChartLine,
  FaMicrophoneAlt,
  FaShieldAlt,
  FaDatabase,
  FaArrowRight,
} from "react-icons/fa";
import "./Al.css";

export default function AIServices() {
  const canvasRef = useRef(null);

  // Infinite animated background (stars + soft orbs)
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

    const STARS = 160;
    const stars = Array.from({ length: STARS }).map(() => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      r: (Math.random() * 1.4 + 0.4) * DPR,
      vx: (Math.random() - 0.5) * 0.25 * DPR,
      vy: (Math.random() - 0.5) * 0.25 * DPR,
      a: Math.random() * Math.PI * 2,
    }));

    const orbs = [
      { hue: 265, r: 360 * DPR, t: Math.random() * 1000, x: () => c.width * 0.22, y: () => c.height * 0.28 },
      { hue: 190, r: 320 * DPR, t: Math.random() * 1000, x: () => c.width * 0.80, y: () => c.height * 0.22 },
      { hue: 330, r: 280 * DPR, t: Math.random() * 1000, x: () => c.width * 0.55, y: () => c.height * 0.78 },
    ];

    const draw = () => {
      // bg gradient
      const g = ctx.createLinearGradient(0, 0, c.width, c.height);
      g.addColorStop(0, "#0a0b12");
      g.addColorStop(1, "#0c0f1c");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, c.width, c.height);

      // soft glowing orbs
      orbs.forEach((o, i) => {
        o.t += 0.003;
        const ox = o.x() + Math.cos(o.t + i) * 30 * DPR;
        const oy = o.y() + Math.sin(o.t * 0.8 + i) * 28 * DPR;
        const rg = ctx.createRadialGradient(ox, oy, 0, ox, oy, o.r);
        rg.addColorStop(0, `hsla(${o.hue}, 90%, 60%, .16)`);
        rg.addColorStop(1, "transparent");
        ctx.fillStyle = rg;
        ctx.beginPath();
        ctx.arc(ox, oy, o.r, 0, Math.PI * 2);
        ctx.fill();
      });

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
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Reveal-on-scroll animations
  useEffect(() => {
    const els = document.querySelectorAll(".fade-in, .slide-up");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("show"));
      },
      { threshold: 0.2 }
    );

    els.forEach((el) => {
      io.observe(el);
      // if already in viewport on mount
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) el.classList.add("show");
    });

    return () => io.disconnect();
  }, []);

  const features = [
    {
      theme: "violet",
      icon: <FaComments />,
      title: "Чат-боты и ассистенты",
      desc:
        "Telegram / WhatsApp, колл-боты, приём заказов, поддержка клиентов, интеграции с CRM и платежами.",
      to: "/telegrambots",
    },
    {
      theme: "cyan",
      icon: <FaBrain />,
      title: "RAG и база знаний",
      desc:
        "Поиск по документам (PDF, DOCX, БД), векторные базы, контроль приватности и ролевая модель доступа.",
    },
    {
      theme: "pink",
      icon: <FaCamera />,
      title: "Компьютерное зрение",
      desc:
        "Face ID, счёт людей, распознавание номеров/товаров, контроль качества и безопасность на объектах.",
      to: "/ai",
    },
    {
      theme: "mint",
      icon: <FaCogs />,
      title: "Автоматизация процессов",
      desc:
        "RPA/скрипты, интеграции 1С/Bitrix/amoCRM, ETL-пайплайны, обработка заявок и уведомления без ручного труда.",
    },
    {
      theme: "blue",
      icon: <FaChartLine />,
      title: "Аналитика и прогнозы",
      desc:
        "Дэшборды, когортный анализ, LTV/CAC, предсказание оттока, оптимизация маркетинга и запасов.",
    },
    {
      theme: "violet",
      icon: <FaMicrophoneAlt />,
      title: "Речь и перевод",
      desc:
        "STT/TTS, суммаризация звонков, автопротоколы встреч, перевод и распознавание аудио/видео.",
    },
    {
      theme: "cyan",
      icon: <FaShieldAlt />,
      title: "Безопасные интеграции",
      desc:
        "OAuth/Keys rotation, шифрование, аудит логов, SSO, приватный деплой (on-prem / VPC) и контроль рисков.",
    },
    {
      theme: "mint",
      icon: <FaDatabase />,
      title: "Данные и хранилища",
      desc:
        "Vector DB (Qdrant/PGVecto/Weaviate), PostgreSQL, S3/MinIO, импорт из Google/Excel и API-коннекторы.",
    },
  ];

  const steps = [
    { n: "01", t: "Аудит и гипотезы", d: "Разбираем задачи, источники данных и KPI. Быстрый план пилота." },
    { n: "02", t: "Прототип", d: "Кликабельная демо/PoC: показываем ценность на реальных сценариях." },
    { n: "03", t: "MVP 2–6 недель", d: "Функционал ядра, метрики, обучение персонала и документация." },
    { n: "04", t: "Интеграции", d: "CRM/ERP/1C, базы данных, хранилища файлов, BI-панели и отчёты." },
    { n: "05", t: "Запуск и масштаб", d: "Нагрузочное тестирование, безопасность, мониторинг, автодеплой." },
    { n: "06", t: "Поддержка", d: "Сопровождение, A/B, развитие моделей и оптимизация затрат." },
  ];

  return (
    <div className="ai-page">
      <canvas ref={canvasRef} className="ai-bg" />

      {/* HERO */}
      <section className="ai-hero fade-in">
        <h1>AI-сервисы</h1>
        <p className="ai-subtitle">
          От идеи до продакшна: чат-боты, RAG, компьютерное зрение, автоматизация процессов
          и безопасные интеграции с вашими системами.
        </p>

        <div className="ai-badges">
          <span className="badge">LLM • GPT-4/Claude</span>
          <span className="badge">RAG • Vector DB</span>
          <span className="badge">Vision • Face ID</span>
          <span className="badge">On-prem / VPC</span>
        </div>

        <div className="ai-cta">
          <Link to="/contact" className="ai-btn primary">
            Обсудить проект <FaArrowRight />
          </Link>
          <Link to="/itprojects" className="ai-btn ghost">Портфолио</Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="ai-grid slide-up">
        {features.map((f, i) => (
          <article key={i} className={`ai-card theme-${f.theme}`}>
            <div className="ai-ring" />
            <div className="ai-head">
              <span className="ai-ico">{f.icon}</span>
              <h3>{f.title}</h3>
            </div>
            <p className="ai-desc">{f.desc}</p>
            <div className="ai-actions">
              <Link to="/contact" className="ai-chip">Консультация</Link>
              {f.to && (
                <Link to={f.to} className="ai-chip ghost">
                  Подробнее
                </Link>
              )}
            </div>
          </article>
        ))}
      </section>

      {/* STEPS */}
      <section className="ai-steps fade-in">
        <h2>Как работаем</h2>
        <div className="steps-grid">
          {steps.map((s) => (
            <div key={s.n} className="step-card">
              <span className="num">{s.n}</span>
              <h4>{s.t}</h4>
              <p>{s.d}</p>
              <span className="sheen" />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="ai-final slide-up">
        <div className="ai-final-inner">
          <div className="glow-border" />
          <h3>Хотите внедрить AI в бизнес-процессы?</h3>
          <p>
            Поможем выбрать верные сценарии, посчитать экономику и запустим пилот за 2–6 недель.
          </p>
          <Link to="/contact" className="ai-btn primary">
            Хочу внедрить AI <FaArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}
