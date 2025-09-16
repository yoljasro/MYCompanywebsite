import React, { useEffect, useState } from "react";
import {
  FaCode, FaBullhorn, FaChartLine, FaRobot, FaMobileAlt, FaBrain, FaShareAlt,
  FaCamera, FaVideo, FaBullseye, FaHandHoldingUsd, FaRocket,FaUserFriends,
  FaCheckCircle, FaShieldAlt, FaHeadset, FaBolt, FaGlobe, FaMagic,
  FaTelegramPlane, FaWhatsapp, FaPhone
} from "react-icons/fa";
import "./Services.css";
import { Link } from "react-router-dom";

const Services = () => {
  // --------- Starfield background ---------
  useEffect(() => {
    const canvas = document.getElementById("backgroundCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();

    let particles = [];
    const numParticles = 150;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.6;
        this.speedX = Math.random() * 0.8 - 0.4;
        this.speedY = Math.random() * 0.8 - 0.4;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.85)";
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < numParticles; i++) particles.push(new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => { p.update(); p.draw(); });
      requestAnimationFrame(animate);
    };

    init();
    animate();

    const onResize = () => { setSize(); init(); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // --------- Scroll animations ---------
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in, .slide-up, .scale-in");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.isIntersecting && e.target.classList.add("show"));
    }, { threshold: 0.2 });
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // --------- FAQ data ---------
  const faqs = [
    { q: "Сколько длится запуск?", a: "Обычно 10–14 дней: бриф, план работ, подготовка окружения. Для сложных систем — 2–6 недель." },
    { q: "Как считаете стоимость?", a: "Фикс-прайс по ТЗ или почасовая ставка. Предоставляем прозрачную смету и план спринтов." },
    { q: "Кто сопровождает проект?", a: "PM, разработчики, дизайнер и QA. Канал в Telegram, еженедельные демо и отчёты." },
    { q: "Как передаёте доступы и данные?", a: "Через защищённые секрет-хранилища. Подписываем NDA по запросу." }
  ];

  return (
    <div className="services-page">
      {/* Background */}
      <canvas id="backgroundCanvas" className="background-canvas" />

      {/* ORBITING DECOR */}
      <div className="orbiters" aria-hidden="true">
        <span className="orb orb-1"></span>
        <span className="orb orb-2"></span>
        <span className="orb orb-3"></span>
        <span className="orb orb-4"></span>
      </div>

      {/* HERO */}
      <div className="services-content fade-in">
        <h1 className="title">Наши услуги</h1>
        <p className="subtitle">IT, Маркетинг и Инвестиционные проекты</p>

        <div className="cards">
          {/* IT */}
          <Link to={"/services/it"} className="card-link">
            <div className="card gradient-blue slide-up">
              <div className="card-icon large"><FaCode /></div>
              <h2>IT-услуги</h2>
              <div className="buttons">
                <Link className="btn-like" to={"/services/it"}><FaCode /> Создание сайтов</Link>
                <span className="btn-like"><FaRobot /> Telegram-боты</span>
                <span className="btn-like"><FaMobileAlt /> Мобильные приложения</span>
                <span className="btn-like"><FaBrain /> AI-решения</span>
              </div>
            </div>
          </Link>

          {/* Marketing */}
          <Link to={"/services/marketing"} className="card-link">
            <div className="card gradient-pink slide-up">
              <div className="card-icon large"><FaBullhorn /></div>
              <h2>Маркетинг</h2>
              <div className="buttons">
                <span className="btn-like"><FaShareAlt /> SMM-продвижение</span>
                <span className="btn-like"><FaCamera /> Мобилография</span>
                <span className="btn-like"><FaVideo /> Видеомонтаж</span>
                <span className="btn-like"><FaBullseye /> Таргетированная реклама</span>
              </div>
            </div>
          </Link>

          {/* Investments */}
           <Link to={"/services/ai"} className="card-link">
          <div className="card gradient-green slide-up">
  <div className="card-icon large"><FaRobot /></div>
  <h2>AI-решения</h2>
  <div className="buttons">
    <span className="btn-like"><FaBrain /> Генерация контента</span>
    <span className="btn-like"><FaMagic /> Автоматизация процессов</span>
    <span className="btn-like"><FaChartLine /> Аналитика и прогнозы</span>
    <span className="btn-like"><FaUserFriends /> AI-чаты и ассистенты</span>
  </div>
</div>
</Link>

        </div>
      </div>

      {/* CTA — как на маркетинг странице */}


      {/* Why us */}
      <section className="why-us slide-up">
        <h3>Почему выбирают нас</h3>
        <div className="why-grid">
          <div className="why-item">
            <i><FaBolt /></i>
            <h4>Скорость</h4>
            <p>MVP и первые результаты за 2–6 недель.</p>
          </div>
          <div className="why-item">
            <i><FaShieldAlt /></i>
            <h4>Надёжность</h4>
            <p>Договор, гарантия и мониторинг.</p>
          </div>
          <div className="why-item">
            <i><FaHeadset /></i>
            <h4>Поддержка 24/7</h4>
            <p>Группа в Telegram и персональный менеджер.</p>
          </div>
          <div className="why-item">
            <i><FaGlobe /></i>
            <h4>Комплексный подход</h4>
            <p>IT + Маркетинг + Инвестиции — всё в одном месте.</p>
          </div>
        </div>
      </section>

      {/* FAQ — как на маркетинг странице (компакт) */}
      <section className="faq-section fade-in">
        <h2>FAQ</h2>
        <div className="faq-accordion">
          {faqs.map((f, i) => (
            <details key={i} className="faq-item">
              <summary>{f.q}</summary>
              <div className="faq-body"><p>{f.a}</p></div>
            </details>
          ))}
        </div>

        {/* мини-CTA под FAQ */}
        {/* <div className="faq-mini-cta">
          <a className="btn btn-primary" href="https://t.me/" target="_blank" rel="noreferrer">
            <FaTelegramPlane/> Telegram
          </a>
          <a className="btn btn-ghost" href="https://wa.me/" target="_blank" rel="noreferrer">
            <FaWhatsapp/> WhatsApp
          </a>
          <Link className="btn btn-link" to="/services">Вернуться к услугам</Link>
        </div> */}
      </section>

      {/* Footer */}
      <footer className="mini-footer">
        <span>© {new Date().getFullYear()} AOM Global. All rights reserved.</span>
        <nav className="footer-nav">
          <a href="#!" className="link">Terms & Conditions</a>
          <a href="#!" className="link">Privacy Policy</a>
        </nav>
      </footer>
    </div>
  );
};

export default Services;
