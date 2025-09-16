import React, { useEffect, useState } from "react";
import {
  FaHome, FaChevronRight, FaCode, FaRobot, FaMobileAlt, FaBrain,
  FaCloud, FaDatabase, FaDocker, FaShieldAlt, FaCogs, FaSearch,
  FaChartLine, FaCheckCircle, FaTelegramPlane, FaAndroid, FaApple,
  FaReact, FaNode, FaPython, FaGitAlt, FaQuoteLeft, FaChevronLeft, 
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./ITServices.css";

const ITServices = () => {
  // ------ Фон: звёздное поле ------
  useEffect(() => {
    const canvas = document.getElementById("itBg");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();

    let stars = [];
    const N = 160;

    class Star {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.r = Math.random() * 1.8 + 0.5;
        this.sx = Math.random() * 0.7 - 0.35;
        this.sy = Math.random() * 0.7 - 0.35;
      }
      upd() {
        this.x += this.sx; this.y += this.sy;
        if (this.x < 0 || this.x > canvas.width) this.sx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.sy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,.9)";
        ctx.fill();
      }
    }

    const init = () => {
      stars = [];
      for (let i = 0; i < N; i++) stars.push(new Star());
    };
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => { s.upd(); s.draw(); });
      requestAnimationFrame(loop);
    };
    init(); loop();

    const onResize = () => { setSize(); init(); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ------ Анимации появления ------
  useEffect(() => {
    const items = document.querySelectorAll(".fade, .rise, .scale");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => e.isIntersecting && e.target.classList.add("show"));
    }, { threshold: 0.2 });
    items.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // ------ Слайдер кейсов ------
  const cases = [
    {
      title: "E-commerce сайт + Telegram-бот",
      text: "Каталог, корзина, оплата, уведомления. Бот принимает заказы и шлёт статусы.",
      tags: ["Next.js", "Node", "Stripe", "PostgreSQL"],
      impact: "Конверсия +27%"
    },
    {
      title: "EdTech мобильное приложение",
      text: "Видео-уроки, тесты, прогресс-трекер, пуш-уведомления. iOS/Android.",
      tags: ["React Native", "Firebase", "Analytics"],
      impact: "DAU +35%"
    },
    {
      title: "Автогенератор контента на ИИ",
      text: "Интеграция LLM, продуманная цепочка промптов, модерация и мониторинг.",
      tags: ["Python", "FastAPI", "OpenAI", "Docker"],
      impact: "Снижение расходов на контент ≈60%"
    }
  ];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % cases.length), 6000);
    return () => clearInterval(id);
  }, [cases.length]);

  return (
    <div className="it-page">
      <canvas id="itBg" className="it-bg" />

      {/* Хлебные крошки */}
      <div className="crumbs fade">
        <Link to="/services" className="crumb"><FaHome /> Услуги</Link>
        <FaChevronRight className="sep" />
        <span className="crumb active">IT-услуги</span>
      </div>

      {/* Херо */}
      <header className="it-hero fade">
        <h1>IT-услуги под ключ</h1>
        <p>
          Разрабатываем сайты, Telegram-ботов, мобильные приложения и AI-решения.
          Полный цикл: аналитика → дизайн/разработка → тестирование и безопасность → запуск и сопровождение.
        </p>
        {/* <div className="hero-cta">
          <a className="btn primary" href="https://t.me/" target="_blank" rel="noreferrer">
            <FaTelegramPlane /> Бесплатная консультация
          </a>
          <a className="btn ghost" href="#pricing">Тарифы</a>
        </div> */}
        <div className="hero-highlights">
          <span><FaCheckCircle /> MVP за 2–6 недель</span>
          <span><FaShieldAlt /> SLA и мониторинг</span>
          <span><FaCogs /> CI/CD и код-ревью</span>
        </div>
      </header>

      {/* Сервисы */}
      <section className="svc-grid rise">
        <div className="svc-card">
          <i className="ic"><FaCode /></i>
          <h3>Создание сайтов</h3>
          <p>Лендинги, интернет-магазины, порталы. Высокая скорость, адаптивность, SEO-фундамент.</p>
          <ul>
            <li><FaCheckCircle /> Frontend: Next.js / React</li>
            <li><FaCheckCircle /> Backend: Node / NestJS</li>
            <li><FaCheckCircle /> CMS: Headless (Strapi) или WordPress</li>
            <li><FaCheckCircle /> Оплата: Stripe / Payme / Click</li>
          </ul>
        </div>

        <div className="svc-card">
          <i className="ic"><FaRobot /></i>
          <h3>Telegram-боты</h3>
          <p>Заказы, CRM, рассылки, чат-бот с ИИ. Админ-панель и статистика.</p>
          <ul>
            <li><FaCheckCircle /> Node/Python фреймворки</li>
            <li><FaCheckCircle /> WebApp + оплата в Telegram</li>
            <li><FaCheckCircle /> Логи, модерация, алёрты</li>
          </ul>
        </div>

        <div className="svc-card">
          <i className="ic"><FaMobileAlt /></i>
          <h3>Мобильные приложения</h3>
          <p>React Native (iOS/Android) с офлайн-режимом и пушами. Витрина, профиль, покупки.</p>
          <ul>
            <li><FaCheckCircle /> Публикация в App Store / Google Play</li>
            <li><FaCheckCircle /> Аналитика и A/B-тесты</li>
            <li><FaCheckCircle /> OTA-обновления (CodePush)</li>
          </ul>
        </div>

        <div className="svc-card">
          <i className="ic"><FaBrain /></i>
          <h3>AI-решения</h3>
          <p>RAG-поиск по документам, чат-копилоты, рекомендации, автоматизация процессов.</p>
          <ul>
            <li><FaCheckCircle /> Микросервисы на Python/FastAPI</li>
            <li><FaCheckCircle /> Векторный поиск (FAISS / pgvector)</li>
            <li><FaCheckCircle /> Guardrails и наблюдаемость</li>
          </ul>
        </div>
      </section>

      {/* Процесс работы — без круглых маркеров */}
      <section className="process scale">
        <h2>Как мы работаем</h2>
        <div className="steps">
          <div className="step">
            <h4><FaSearch /> Аналитика</h4>
            <p>Бриф, цели и KPI, пользовательские сценарии, прототип, техническое задание.</p>
          </div>
          <div className="step">
            <h4><FaCogs /> Разработка</h4>
            <p>Agile-спринты, код-ревью, CI/CD. Еженедельные демо и прозрачный бэклог.</p>
          </div>
          <div className="step">
            <h4><FaShieldAlt /> Тестирование и безопасность</h4>
            <p>Автотесты, статический анализ, управление секретами, проверка производительности.</p>
          </div>
          <div className="step">
            <h4><FaChartLine /> Запуск и рост</h4>
            <p>Мониторинг и алёрты, аналитика, A/B-эксперименты, итеративное развитие.</p>
          </div>
        </div>
      </section>

      {/* Стек */}
      <section className="stack rise">
        <h2>Технологический стек</h2>
        <div className="stack-list">
          <div className="st"><FaReact /> React / Next.js</div>
          <div className="st"><FaNode /> Node / NestJS</div>
          <div className="st"><FaPython /> Python / FastAPI</div>
          <div className="st"><FaDatabase /> PostgreSQL / MongoDB</div>
          <div className="st"><FaDocker /> Docker / CI/CD</div>
          <div className="st"><FaCloud /> Облако (Vercel / Render)</div>
          <div className="st"><FaGitAlt /> GitHub Actions</div>
          <div className="st"><FaAndroid /> Android</div>
          <div className="st"><FaApple /> iOS</div>
        </div>
      </section>

      {/* Тарифы (RUB + больше содержания) */}
      <section id="pricing" className="pricing fade">
        <h2>Тарифы</h2>
        <div className="price-grid">

          <div className="price-card">
            <h3>Start</h3>
            <p className="desc">Лендинг или простой бот</p>
            {/* <div className="price">от 89 000 ₽</div> */}
            <ul>
              <li><FaCheckCircle /> Аналитика и прототип (до 2 секций)</li>
              <li><FaCheckCircle /> Дизайн по сетке + адаптив</li>
              <li><FaCheckCircle /> Разработка (Next.js / Node)</li>
              <li><FaCheckCircle /> 1 интеграция (форма/оплата)</li>
              <li><FaCheckCircle /> Базовая SEO-настройка</li>
              <li><FaCheckCircle /> Хостинг и домен (1 месяц)</li>
              <li><FaCheckCircle /> Гарантия и хотфиксы 30 дней</li>
            </ul>
            <a className="btn primary" href="/contact"  rel="noreferrer">Заказать</a>
          </div>

          <div className="price-card best">
            <div className="badge">Популярно</div>
            <h3>Business</h3>
            <p className="desc">Магазин / супер-бот / MVP приложения</p>
            {/* <div className="price">от 269 000 ₽</div> */}
            <ul>
              <li><FaCheckCircle /> Проработка CJM и KPI</li>
              <li><FaCheckCircle /> Индивидуальный дизайн</li>
              <li><FaCheckCircle /> Каталог/корзина/оплата или сложный бот</li>
              <li><FaCheckCircle /> 3–6 интеграций (CRM/оплаты/аналитика)</li>
              <li><FaCheckCircle /> Настройка аналитики и событий</li>
              <li><FaCheckCircle /> Автотесты + CI/CD</li>
              <li><FaCheckCircle /> Поддержка 2 месяца</li>
            </ul>
            <a className="btn primary" href="/contact" rel="noreferrer">Заказать</a>
          </div>

          <div className="price-card">
            <h3>Enterprise</h3>
            <p className="desc">AI + микросервисы, SLA</p>
            {/* <div className="price">по запросу</div> */}
            <ul>
              <li><FaCheckCircle /> Аудит архитектуры и roadmap</li>
              <li><FaCheckCircle /> SSO, RBAC, безопасность</li>
              <li><FaCheckCircle /> RAG/LLM, очереди, шардирование</li> 
              <li><FaCheckCircle /> Наблюдаемость: метрики/логи/трейсы</li>
              <li><FaCheckCircle /> SRE-подход и 24/7 мониторинг</li>
              <li><FaCheckCircle /> SLA по доступности и реакции</li>
            </ul>
            <a className="btn ghost" href="/contact"  rel="noreferrer">Связаться</a>
          </div>

        </div>
      </section>

      {/* Кейсы */}
      {/* <section className="cases scale">
        <h2>Кейсы</h2>
        <div className="cases-wrap">
          <button className="nav left" onClick={()=>setIdx((idx-1+cases.length)%cases.length)} aria-label="Назад">
            <FaChevronLeft/>
          </button>

          <article className="case-card">
            <FaQuoteLeft className="qmark" />
            <h3>{cases[idx].title}</h3>
            <p className="c-text">{cases[idx].text}</p>
            <div className="tags">
              {cases[idx].tags.map((t,i)=> <span key={i} className="tag">{t}</span>)}
            </div>
            <div className="impact">{cases[idx].impact}</div>
          </article>

          <button className="nav right" onClick={()=>setIdx((idx+1)%cases.length)} aria-label="Вперёд">
            <FaChevronRight/>
          </button>
        </div>
      </section> */}

      {/* FAQ */}
      <section className="faq rise">
        <h2>FAQ</h2>
        <details>
          <summary>Сколько длится запуск?</summary>
          <p>MVP обычно занимает 2–6 недель, сложные системы — 2–3 месяца.</p>
        </details>
        <details>
          <summary>Как рассчитывается стоимость?</summary>
          <p>Зависит от объёма и интеграций. Возможны фикс-прайс или почасовая модель — под вашу задачу.</p>
        </details>
        <details>
          <summary>Кто сопровождает проект?</summary>
          <p>Проект-менеджер, разработчики и дизайнеры. Настроены мониторинг, алёрты и поддержка.</p>
        </details>
      </section>

      {/* CTA */}

    </div>
  );
};

export default ITServices;
