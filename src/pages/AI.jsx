import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FaHome,
  FaChevronRight,
  FaTelegramPlane,
  FaCheckCircle,
  FaBrain,
  FaMagic,
  FaCogs,
  FaShieldAlt,
  FaSearch,
  FaRobot,
  FaProjectDiagram,
  FaChartLine,
  FaPlug,
  FaDatabase,
  FaNetworkWired,
  FaUserShield,
  FaFileAlt,
  FaChevronLeft,
  FaPlay,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Ai.css";

const AIServices = () => {
  /* ===== Background (neural particles) ===== */
  useEffect(() => {
    const canvas = document.getElementById("aiBg");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const DPR = Math.min(2, window.devicePixelRatio || 1);
    let W = (canvas.width = window.innerWidth * DPR);
    let H = (canvas.height = window.innerHeight * DPR);
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    const N = Math.min(140, Math.floor((W * H) / 30000));
    const nodes = new Array(N).fill(0).map(() => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: 1.2 + Math.random() * 1.8,
    }));

    function tick() {
      ctx.clearRect(0, 0, W, H);
      // gradient background glow
      const g = ctx.createRadialGradient(W * 0.7, H * 0.2, 40, W * 0.7, H * 0.2, Math.max(W, H));
      g.addColorStop(0, "rgba(120, 84, 255, .15)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g; ctx.fillRect(0,0,W,H);

      for (let i = 0; i < N; i++) {
        const a = nodes[i];
        a.x += a.vx; a.y += a.vy;
        if (a.x < 0 || a.x > W) a.vx *= -1;
        if (a.y < 0 || a.y > H) a.vy *= -1;

        // draw node
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,.8)";
        ctx.fill();

        // connect to neighbors
        for (let j = i + 1; j < N; j++) {
          const b = nodes[j];
          const dx = a.x - b.x; const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 120 * 120) {
            const o = 1 - Math.sqrt(d2) / 120;
            ctx.strokeStyle = `rgba(120, 84, 255, ${o * 0.35})`;
            ctx.lineWidth = 1 * DPR * o;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(tick);
    }

    let raf = requestAnimationFrame(tick);
    const onResize = () => {
      W = canvas.width = window.innerWidth * DPR;
      H = canvas.height = window.innerHeight * DPR;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  /* ===== Scroll-in animations ===== */
  useEffect(() => {
    const items = document.querySelectorAll(".fade, .rise, .scale");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.isIntersecting && e.target.classList.add("show"));
    }, { threshold: 0.2 });
    items.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* ===== Interactive tabs / demos ===== */
  const demos = [
    { key: "chat", title: "AI Chat / Copilot", icon: <FaRobot/>,
      desc: "Brendingizga mos AI chat: savol-javob, FAQ, lead yig‘ish, CRMga yuborish.",
      hint: "LLM + Retrieval (RAG) + Guardrails"
    },
    { key: "rag", title: "RAG: hujjatlar bilan javob", icon: <FaSearch/>,
      desc: "PDF/Google Docs/Notion dan bilim bazasi. Kontekst bilan aniq javob.",
      hint: "Embedding + vektor qidiruv + citatsiya"
    },
    { key: "vision", title: "Vision: Face/QR/Invoice", icon: <FaBrain/>,
      desc: "Kameradan xodim yuzini aniqlash va kelib-ketish vaqtini log qilamiz.",
      hint: "Face recognition + Attendance + Reports"
    },
    { key: "automation", title: "Automation / Integrations", icon: <FaCogs/>,
      desc: "Telegram-bot, CRM, 1C, Click/Payme, Shopify, Notion bilan ulanadi.",
      hint: "Webhook + ETL + Event Orchestrations"
    }
  ];
  const [demoKey, setDemoKey] = useState("chat");

  /* ===== Fake typing for demo ===== */
  const typedRef = useRef(null);
  const typingText = useMemo(() => ({
    chat: "Salom! Menga mahsulot haqida ma'lumot bering. – Albatta! Mana katalog va narxlar…",
    rag: "Savол: Qanday hujjatlar kerak? → Javob: Shartnoma 1.2-bandiga ko‘ra … (manba bilan)",
    vision: "Xodim: #A-102 | Kirish 09:03 | Chiqish 18:12 | Ish vaqti 8:45",
    automation: "Trigger: Yangi buyurtma → CRMga yozildi → Omborga yuborildi → Mijozga xabar"
  }), []);

  useEffect(() => {
    const el = typedRef.current; if (!el) return;
    let i = 0; const text = typingText[demoKey];
    el.textContent = "";
    const id = setInterval(() => {
      el.textContent = text.slice(0, i++);
      if (i > text.length) clearInterval(id);
    }, 18);
    return () => clearInterval(id);
  }, [demoKey, typingText]);

  /* ===== Cases slider ===== */
  const cases = [
    { title: "AI helpdesk + CRM", text: "Savollarni avtomatik javob + leadlarni CRMga push.", tags: ["RAG", "Node", "Postgres"], impact: "Response time −63%" },
    { title: "Face Attendance", text: "Yuz orqali kelib-ketish. Hisobot va grafiklar.", tags: ["Vision", "Python", "Docker"], impact: "Manual tekshiruv −90%" },
    { title: "AI Content Engine", text: "SMM post, caption, hashtag, scheduling.", tags: ["OpenAI", "Next.js", "Redis"], impact: "Content cost −55%" }
  ];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % cases.length), 6000);
    return () => clearInterval(id);
  }, [cases.length]);

  return (
    <div className="ai-page">
      <canvas id="aiBg" className="ai-bg" />

      {/* Glow orbits */}
      <div className="ai-orbits" aria-hidden>
        <span className="ao ao1"/>
        <span className="ao ao2"/>
        <span className="ao ao3"/>
      </div>

      {/* Breadcrumb */}
      <div className="crumbs fade">
        <Link to="/services" className="crumb"><FaHome/> Услуги</Link>
        <FaChevronRight className="sep" />
        <span className="crumb active">AI-услуги</span>
      </div>

      {/* Hero */}
      <header className="ai-hero fade">
        <div className="hero-col">
          <h1>AI-услуги и интеграции</h1>
          <p>От идеи до продакшна: чат-боты, RAG, комп. зрение, автоматизация процессов и безопасные интеграции с вашими системами.</p>
          <div className="hero-cta">
            <a className="btn primary" href="https://t.me/" target="_blank" rel="noreferrer"><FaTelegramPlane/> Бесплатная консультация</a>
            <a className="btn ghost" href="#pricing">Тарифы</a>
          </div>
          <div className="hero-bullets">
            <span><FaCheckCircle/> PoC 1–2 недели</span>
            <span><FaShieldAlt/> Guardrails & мониторинг</span>
            <span><FaCogs/> CI/CD & observability</span>
          </div>
        </div>

        {/* 3D cube */}
        <div className="hero-cube">
          <div className="cube" tabIndex={0} aria-label="interactive cube">
            <div className="face f1"><FaBrain/></div>
            <div className="face f2"><FaSearch/></div>
            <div className="face f3"><FaRobot/></div>
            <div className="face f4"><FaProjectDiagram/></div>
            <div className="face f5"><FaDatabase/></div>
            <div className="face f6"><FaUserShield/></div>
          </div>
          <small className="cube-hint">Наведи/зажми — поверни куб</small>
        </div>
      </header>

      {/* What we build */}
      <section className="ai-grid rise">
        <div className="ai-card">
          <i className="ic"><FaRobot/></i>
          <h3>AI чат и ассистенты</h3>
          <p>Клиентская поддержка, внутренний помощник, генерация контента, голосовые сценарии.</p>
          <ul>
            <li><FaCheckCircle/> LLM + RAG + цитаты</li>
            <li><FaCheckCircle/> Multi-lang RU/UZ/EN</li>
            <li><FaCheckCircle/> Web/App/Telegram</li>
          </ul>
        </div>
        <div className="ai-card">
          <i className="ic"><FaSearch/></i>
          <h3>RAG и поиск по знаниям</h3>
          <p>Индексация PDF, Google Drive, Notion, Confluence. Достоверные ответы со ссылками.</p>
          <ul>
            <li><FaCheckCircle/> pgvector/FAISS/Redis</li>
            <li><FaCheckCircle/> Цитирование источников</li>
            <li><FaCheckCircle/> ACL и приватность</li>
          </ul>
        </div>
        <div className="ai-card">
          <i className="ic"><FaBrain/></i>
          <h3>Vision и OCR</h3>
          <p>Face-ID табель, счёт-фактуры, штрих/QR, дефекты на производстве, кассовые чеки.</p>
          <ul>
            <li><FaCheckCircle/> Realtime + отчёты</li>
            <li><FaCheckCircle/> Kamera/RTSP stream</li>
            <li><FaCheckCircle/> Export to Excel/BI</li>
          </ul>
        </div>
        <div className="ai-card">
          <i className="ic"><FaPlug/></i>
          <h3>Интеграции и автоматика</h3>
          <p>CRM/ERP, 1C, Telegram, Click/Payme, Shopify, Notion. События и сценарии.</p>
          <ul>
            <li><FaCheckCircle/> Webhook & API gateway</li>
            <li><FaCheckCircle/> ETL/ELT пайплайны</li>
            <li><FaCheckCircle/> Role-based доступ</li>
          </ul>
        </div>
      </section>

      {/* Demos (interactive) */}
      <section className="ai-demos scale" id="demos">
        <h2>Живые демо</h2>
        <div className="tabs">
          {demos.map((d) => (
            <button
              key={d.key}
              className={`tab ${demoKey===d.key?"active":""}`}
              onClick={() => setDemoKey(d.key)}
            >{d.icon} {d.title}</button>
          ))}
        </div>
        <div className="demo-stage">
          <div className="stage-header">
            <span className="dot"/><span className="dot"/><span className="dot"/>
            <span className="hint"><FaMagic/> {demos.find(d=>d.key===demoKey)?.hint}</span>
          </div>
          <pre className="typing" ref={typedRef}/>
          <button className="play"><FaPlay/> Запустить сценарий</button>
        </div>
      </section>

      {/* Integrations marquee */}
      <section className="ai-marquee fade" aria-label="Интеграции">
        <div className="row">
          <span>OpenAI</span>
          <span>Anthropic</span>
          <span>Google AI</span>
          <span>Telegram</span>
          <span>Notion</span>
          <span>Shopify</span>
          <span>1C</span>
          <span>Click</span>
          <span>Payme</span>
          <span>Firebase</span>
          <span>PostgreSQL</span>
          <span>Redis</span>
        </div>
        <div className="row clone" aria-hidden>
          <span>OpenAI</span>
          <span>Anthropic</span>
          <span>Google AI</span>
          <span>Telegram</span>
          <span>Notion</span>
          <span>Shopify</span>
          <span>1C</span>
          <span>Click</span>
          <span>Payme</span>
          <span>Firebase</span>
          <span>PostgreSQL</span>
          <span>Redis</span>
        </div>
      </section>

      {/* Process */}
      <section className="ai-process rise">
        <h2>Как мы запускаем AI</h2>
        <div className="steps">
          <div className="step">
            <span className="n">1</span>
            <h4><FaSearch/> Диагностика</h4>
            <p>Юз-кейсы, KPI, датасеты, приватность. Быстрый PoC-план.</p>
          </div>
          <div className="step">
            <span className="n">2</span>
            <h4><FaProjectDiagram/> Архитектура</h4>
            <p>RAG/векторка, очереди, ретраи, кеши, observability.</p>
          </div>
          <div className="step">
            <span className="n">3</span>
            <h4><FaCogs/> Разработка</h4>
            <p>Спринты, автотесты, CI/CD, безопасные ключи и секреты.</p>
          </div>
          <div className="step">
            <span className="n">4</span>
            <h4><FaChartLine/> Запуск и рост</h4>
            <p>AB-тесты, наблюдение и дообучение. Экономия и масштаб.</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="ai-pricing fade">
        <h2>Тарифы</h2>
        <div className="price-grid">
          <div className="price-card">
            <h3>PoC</h3>
            <p className="desc">Гипотеза проверяется за 1–2 недели</p>
            <div className="price">от $1,490</div>
            <ul>
              <li><FaCheckCircle/> 1 юз-кейс</li>
              <li><FaCheckCircle/> Базовый прототип</li>
              <li><FaCheckCircle/> Итоговый отчёт</li>
            </ul>
            <a className="btn primary" href="https://t.me/" target="_blank" rel="noreferrer">Заказать</a>
          </div>
          <div className="price-card best">
            <div className="badge">Популярно</div>
            <h3>Business</h3>
            <p className="desc">RAG/чат/автоматизация для команды</p>
            <div className="price">от $3,490</div>
            <ul>
              <li><FaCheckCircle/> 2–3 интеграции</li>
              <li><FaCheckCircle/> Внедрение + обучение</li>
              <li><FaCheckCircle/> 2 месяца поддержки</li>
            </ul>
            <a className="btn primary" href="https://t.me/" target="_blank" rel="noreferrer">Заказать</a>
          </div>
          <div className="price-card">
            <h3>Enterprise</h3>
            <p className="desc">SLA, SSO, приватный хостинг</p>
            <div className="price">по запросу</div>
            <ul>
              <li><FaCheckCircle/> Аудит и roadmap</li>
              <li><FaCheckCircle/> Observability/Alerting</li>
              <li><FaCheckCircle/> SRE/24×7</li>
            </ul>
            <a className="btn ghost" href="https://t.me/" target="_blank" rel="noreferrer">Связаться</a>
          </div>
        </div>
      </section>

      {/* Cases slider */}
      <section className="ai-cases scale">
        <h2>Кейсы</h2>
        <div className="cases-wrap">
          <button className="nav left" onClick={()=>setIdx((idx-1+cases.length)%cases.length)}><FaChevronLeft/></button>
          <article className="case-card">
            <FaFileAlt className="qmark" />
            <h3>{cases[idx].title}</h3>
            <p className="c-text">{cases[idx].text}</p>
            <div className="tags">{cases[idx].tags.map((t,i)=> <span key={i} className="tag">{t}</span>)}</div>
            <div className="impact">{cases[idx].impact}</div>
          </article>
          <button className="nav right" onClick={()=>setIdx((idx+1)%cases.length)}><FaChevronLeft style={{transform:'rotate(180deg)'}}/></button>
        </div>
      </section>

      {/* FAQ */}
      <section className="ai-faq rise">
        <h2>FAQ</h2>
        <details>
          <summary>Что нужно для старта?</summary>
          <p>Доступы к источникам (Docs/Notion/CRM), один контакт от бизнеса и KPI.</p>
        </details>
        <details>
          <summary>Данные будут безопасны?</summary>
          <p>Секреты в vault, аудиты доступа, шифрование в транзите и на хранении.</p>
        </details>
        <details>
          <summary>Можно кастомизировать под бренд?</summary>
          <p>Да. UI, тональность, языки, шаблоны ответов и сценарии — под ключ.</p>
        </details>
      </section>

      {/* CTA */}
      <section className="ai-cta fade">
        <div className="border-anim"></div>
        <h2>Запустим AI-проект?</h2>
        <p>15–30 минут созвона: цель → решение → бюджет → сроки. Присылайте задачу в Telegram.</p>
        <div className="cta-actions">
          <a className="btn primary lift" href="https://t.me/" target="_blank" rel="noreferrer"><FaTelegramPlane/> Написать в Telegram</a>
          <Link className="btn ghost lift" to="/services">Назад к услугам</Link>
        </div>
      </section>
    </div>
  );
};

export default AIServices;
