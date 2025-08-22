import React, { useEffect, useState } from "react";
import {
  FaHome, FaChevronRight, FaCode, FaRobot, FaMobileAlt, FaBrain,
  FaCloud, FaDatabase, FaDocker, FaShieldAlt, FaCogs, FaSearch,
  FaChartLine, FaCheckCircle, FaTelegramPlane, FaAndroid, FaApple,
  FaReact, FaNode, FaPython, FaGitAlt, FaQuoteLeft, FaChevronLeft
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./ITServices.css";

const ITServices = () => {
  /* ------ Starfield Background ------ */
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

  /* ------ Scroll animations ------ */
  useEffect(() => {
    const items = document.querySelectorAll(".fade, .rise, .scale");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => e.isIntersecting && e.target.classList.add("show"));
    }, { threshold: 0.2 });
    items.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* ------ Cases slider ------ */
  const cases = [
    {
      title: "E-commerce sayt + Telegram-bot",
      text: "Katalog, savat, to‘lov integratsiyasi. Bot orqali buyurtma va notifikatsiyalar.",
      tags: ["Next.js", "Node", "Stripe", "PostgreSQL"],
      impact: "Konversiya +27%"
    },
    {
      title: "EdTech mobil ilova",
      text: "React Native (iOS/Android), video darslar, testlar, progress track.",
      tags: ["React Native", "Firebase", "Analytics"],
      impact: "DAU +35%"
    },
    {
      title: "AI-kontent avto-generator",
      text: "LLM integratsiya, prompt-jarayon, moderation va monitoring.",
      tags: ["Python", "FastAPI", "OpenAI", "Docker"],
      impact: "Kontent tejalishi 60%"
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

      {/* orbiting decor */}
      <div className="it-orbits" aria-hidden="true">
        <span className="io io1"></span>
        <span className="io io2"></span>
        <span className="io io3"></span>
      </div>

      {/* Breadcrumb */}
      <div className="crumbs fade">
        <Link to="/services" className="crumb"><FaHome /> Услуги</Link>
        <FaChevronRight className="sep" />
        <span className="crumb active">IT-услуги</span>
      </div>

      {/* Hero */}
      <header className="it-hero fade">
        <h1>IT-услуги под ключ</h1>
        <p>Создаём сайты, Telegram-боты, мобильные приложения и AI-решения. От аналитики до сопровождения — быстро, прозрачно, безопасно.</p>
        <div className="hero-cta">
          <a className="btn primary" href="https://t.me/" target="_blank" rel="noreferrer"><FaTelegramPlane /> Бесплатная консультация</a>
          <a className="btn ghost" href="#pricing">Тарифы</a>
        </div>
        <div className="hero-highlights">
          <span><FaCheckCircle /> MVP 2–6 недель</span>
          <span><FaShieldAlt /> SLA & мониторинг</span>
          <span><FaCogs /> CI/CD</span>
        </div>
      </header>

      {/* Services grid */}
      <section className="svc-grid rise">
        <div className="svc-card">
          <i className="ic"><FaCode /></i>
          <h3>Создание сайтов</h3>
          <p>Витрины, лендинги, интернет-магазины, порталы. SEO-friendly, быстрые, адаптивные.</p>
          <ul>
            <li><FaCheckCircle /> Next.js / React frontend</li>
            <li><FaCheckCircle /> Node / NestJS backend</li>
            <li><FaCheckCircle /> CMS: Headless (Strapi) или WordPress</li>
            <li><FaCheckCircle /> Оплата: Stripe/Payme/Click</li>
          </ul>
        </div>

        <div className="svc-card">
          <i className="ic"><FaRobot /></i>
          <h3>Telegram-боты</h3>
          <p>Заказы, CRM, рассылки, чат-боты с LLM. Админ-панель va statistika.</p>
          <ul>
            <li><FaCheckCircle /> Node/Python bot-framework</li>
            <li><FaCheckCircle /> WebApp + Pay интеграция</li>
            <li><FaCheckCircle /> Moderation & logging</li>
          </ul>
        </div>

        <div className="svc-card">
          <i className="ic"><FaMobileAlt /></i>
          <h3>Мобильные приложения</h3>
          <p>iOS/Android: React Native yoki native modullar. Offline-режим, push-уведомления.</p>
          <ul>
            <li><FaCheckCircle /> App Store / Google Play релиз</li>
            <li><FaCheckCircle /> Аналитика va A/B test</li>
            <li><FaCheckCircle /> OTA обновления (CodePush)</li>
          </ul>
        </div>

        <div className="svc-card">
          <i className="ic"><FaBrain /></i>
          <h3>AI-решения</h3>
          <p>LLM chat, summarization, rekomendatsiya, avtomatlashtirish.</p>
          <ul>
            <li><FaCheckCircle /> Python/FastAPI микросервисы</li>
            <li><FaCheckCircle /> Векторный поиск (FAISS/pgvector)</li>
            <li><FaCheckCircle /> Observability va guardrails</li>
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="process scale">
        <h2>Как мы работаем</h2>
        <div className="steps">
          <div className="step">
            <span className="n">1</span>
            <h4><FaSearch /> Аналитика</h4>
            <p>Бриф, цели, KPI, scope. Texnik topshiriq va prototip.</p>
          </div>
          <div className="step">
            <span className="n">2</span>
            <h4><FaCogs /> Разработка</h4>
            <p>Agile спринты, код-ревью, CI/CD. Har hafta demo.</p>
          </div>
          <div className="step">
            <span className="n">3</span>
            <h4><FaShieldAlt /> Тесты и безопасность</h4>
            <p>Автотесты, статический анализ, секретlar boshqaruvi.</p>
          </div>
          <div className="step">
            <span className="n">4</span>
            <h4><FaChartLine /> Запуск и рост</h4>
            <p>Мониторинг, аналитика, A/B test, iterativ rivoj.</p>
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="stack rise">
        <h2>Технологический стек</h2>
        <div className="stack-list">
          <div className="st"><FaReact /> React / Next.js</div>
          <div className="st"><FaNode /> Node / NestJS</div>
          <div className="st"><FaPython /> Python / FastAPI</div>
          <div className="st"><FaDatabase /> PostgreSQL / MongoDB</div>
          <div className="st"><FaDocker /> Docker / CI/CD</div>
          <div className="st"><FaCloud /> Cloud (Vercel/Render)</div>
          <div className="st"><FaGitAlt /> GitHub Actions</div>
          <div className="st"><FaAndroid /> Android</div>
          <div className="st"><FaApple /> iOS</div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="pricing fade">
        <h2>Тарифы</h2>
        <div className="price-grid">
          <div className="price-card">
            <h3>Start</h3>
            <p className="desc">Landing yoki oddiy bot</p>
            <div className="price">от $999</div>
            <ul>
              <li><FaCheckCircle /> 1–2 hafta</li>
              <li><FaCheckCircle /> Dizayn shablon</li>
              <li><FaCheckCircle /> Hotfix 30 kun</li>
            </ul>
            <a className="btn primary" href="https://t.me/" target="_blank" rel="noreferrer">Заказать</a>
          </div>

          <div className="price-card best">
            <div className="badge">Популярно</div>
            <h3>Business</h3>
            <p className="desc">Do‘kon / super-bot / app MVP</p>
            <div className="price">от $2990</div>
            <ul>
              <li><FaCheckCircle /> 3–6 hafta</li>
              <li><FaCheckCircle /> Individual dizayn</li>
              <li><FaCheckCircle /> Integratsiyalar</li>
              <li><FaCheckCircle /> 2 oy support</li>
            </ul>
            <a className="btn primary" href="https://t.me/" target="_blank" rel="noreferrer">Заказать</a>
          </div>

          <div className="price-card">
            <h3>Enterprise</h3>
            <p className="desc">AI + mikroservislar, SLA</p>
            <div className="price">по запросу</div>
            <ul>
              <li><FaCheckCircle /> Audit & roadmap</li>
              <li><FaCheckCircle /> SSO, security</li>
              <li><FaCheckCircle /> SRE/Monitoring</li>
            </ul>
            <a className="btn ghost" href="https://t.me/" target="_blank" rel="noreferrer">Связаться</a>
          </div>
        </div>
      </section>

      {/* Case studies slider */}
      <section className="cases scale">
        <h2>Кейсы</h2>
        <div className="cases-wrap">
          <button className="nav left" onClick={()=>setIdx((idx-1+cases.length)%cases.length)}><FaChevronLeft/></button>

          <article className="case-card">
            <FaQuoteLeft className="qmark" />
            <h3>{cases[idx].title}</h3>
            <p className="c-text">{cases[idx].text}</p>
            <div className="tags">
              {cases[idx].tags.map((t,i)=> <span key={i} className="tag">{t}</span>)}
            </div>
            <div className="impact">{cases[idx].impact}</div>
          </article>

          <button className="nav right" onClick={()=>setIdx((idx+1)%cases.length)}><FaChevronRight/></button>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq rise">
        <h2>FAQ</h2>
        <details>
          <summary>Сколько длится запуск?</summary>
          <p>MVP odatda 2–6 hafta, murakkab tizimlar 2–3 oy.</p>
        </details>
        <details>
          <summary>Как считаете стоимость?</summary>
          <p>Scope + baholash. Fiks narx yoki soatbay — sizning qulaylikka qarab.</p>
        </details>
        <details>
          <summary>Кто сопровождает проект?</summary>
          <p>PM, devlar va dizaynerlar jamoasi, monitoring va support bilan.</p>
        </details>
      </section>

      {/* CTA */}
      <section className="it-cta fade">
        <div className="border-anim"></div>
        <h2>Готовы обсудить IT-проект?</h2>
        <p>Qisqa qo‘ng‘iroq/чат: g‘oya → reja → byudjet va muddatlar.</p>
        <div className="cta-actions">
          <a className="btn primary lift" href="https://t.me/" target="_blank" rel="noreferrer"><FaTelegramPlane/> Написать в Telegram</a>
          <Link className="btn ghost lift" to="/services">Назад к услугам</Link>
        </div>
      </section>
    </div>
  );
};

export default ITServices;
