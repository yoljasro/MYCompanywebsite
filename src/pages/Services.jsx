import React, { useEffect, useState } from "react";
import {
  FaCode, FaBullhorn, FaChartLine, FaRobot, FaMobileAlt, FaBrain, FaShareAlt,
  FaCamera, FaVideo, FaBullseye, FaHandHoldingUsd, FaRocket, FaUsers,
  FaCheckCircle, FaClock, FaShieldAlt, FaHeadset, FaAward, FaTelegramPlane,
  FaWhatsapp, FaStar, FaHandshake, FaBolt, FaGlobe, FaChevronLeft, FaChevronRight, FaQuoteLeft
} from "react-icons/fa";
import "./Services.css";

const Services = () => {
  /* --------- Starfield background --------- */
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

  /* --------- Scroll animations --------- */
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in, .slide-up, .scale-in");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.isIntersecting && e.target.classList.add("show"));
    }, { threshold: 0.2 });
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* --------- Testimonials slider --------- */
  const testimonials = [
    { name: "Азизбек", role: "Founder, Retail", text: "SMM + bot savdoni 32% oshirdi. Komanda tez ishlaydi va hisob-kitoblar shaffof.", stars: 5 },
    { name: "Анна", role: "CEO, EdTech", text: "Mobil MVP 6 haftada. Dizayn + analytics bir joyda — juda qulay.", stars: 5 },
    { name: "Мурад", role: "COO, HoReCa", text: "Target + videomontaj tufayli bronlar 2,3x ga oshdi. Qo‘llab-quvvatlash 24/7.", stars: 4 },
  ];
  const [tIndex, setTIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTIndex((i) => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(id);
  }, [testimonials.length]);

  const prev = () => setTIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setTIndex((i) => (i + 1) % testimonials.length);

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
          <div className="card gradient-blue slide-up">
            <div className="card-icon large"><FaCode /></div>
            <h2>IT-услуги</h2>
            <div className="buttons">
              <button><FaCode /> Создание сайтов</button>
              <button><FaRobot /> Telegram-боты</button>
              <button><FaMobileAlt /> Мобильные приложения</button>
              <button><FaBrain /> AI-решения</button>
            </div>
          </div>

          {/* Marketing */}
          <div className="card gradient-pink slide-up">
            <div className="card-icon large"><FaBullhorn /></div>
            <h2>Маркетинг</h2>
            <div className="buttons">
              <button><FaShareAlt /> SMM-продвижение</button>
              <button><FaCamera /> Мобилография</button>
              <button><FaVideo /> Видеомонтаж</button>
              <button><FaBullseye /> Таргетированная реклама</button>
            </div>
          </div>

          {/* Investments */}
          <div className="card gradient-green slide-up">
            <div className="card-icon large"><FaChartLine /></div>
            <h2>Инвестиции</h2>
            <div className="buttons">
              <button><FaHandHoldingUsd /> Инвестиции в наши продукты</button>
              <button><FaRocket /> Инвестиции в перспективные проекты</button>
            </div>
          </div>
        </div>
      </div>

      {/* —— BOTTOM SECTIONS —— */}

      {/* Stats */}
      <section className="stats enhanced fade-in">
        <div className="stat-box pro big">
          <div className="stat-icon"><FaUsers /></div>
          <h3>50+</h3>
          <p>Успешных проектов</p>
        </div>
        <div className="stat-box pro big">
          <div className="stat-icon"><FaHandshake /></div>
          <h3>20+</h3>
          <p>Партнёров</p>
        </div>
        <div className="stat-box pro big">
          <div className="stat-icon"><FaClock /></div>
          <h3>5 лет</h3>
          <p>Опыта</p>
        </div>
        <div className="stat-box pro big">
          <div className="stat-icon"><FaAward /></div>
          <h3>98%</h3>
          <p>Удовлетворённость</p>
        </div>

        {/* subtle parallax lights behind stats */}
        <span className="stats-light l1"></span>
        <span className="stats-light l2"></span>
      </section>

      {/* Why us */}
      <section className="why-us slide-up">
        <h3>Почему выбирают нас</h3>
        <div className="why-grid">
          <div className="why-item">
            <i><FaBolt /></i>
            <h4>Скорость</h4>
            <p>MVP va ilk natijalar 2–6 hafta ichida.</p>
          </div>
          <div className="why-item">
            <i><FaShieldAlt /></i>
            <h4>Надёжность</h4>
            <p>Shartnoma + kafolat + monitoring.</p>
          </div>
          <div className="why-item">
            <i><FaHeadset /></i>
            <h4>Поддержка 24/7</h4>
            <p>Telegram guruh + shaxsiy menedjer.</p>
          </div>
          <div className="why-item">
            <i><FaGlobe /></i>
            <h4>Комплексный подход</h4>
            <p>IT + Marketing + Invest — bir joyda.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials slide-up">
        <h3>Отзывы клиентов</h3>
        <div className="testimonial-wrap">
          <button className="nav-btn left" onClick={prev} aria-label="previous">
            <FaChevronLeft />
          </button>

          <div className="testimonial-card huge">
            <FaQuoteLeft className="quote-mark" />
            <div className="avatar" aria-hidden="true" />
            <div className="stars">
              {Array.from({ length: testimonials[tIndex].stars }).map((_, i) => <FaStar key={i} />)}
            </div>
            <p className="t-text">“{testimonials[tIndex].text}”</p>
            <div className="t-meta">
              <span className="t-name">{testimonials[tIndex].name}</span>
              <span className="t-role"> · {testimonials[tIndex].role}</span>
            </div>
          </div>

          <button className="nav-btn right" onClick={next} aria-label="next">
            <FaChevronRight />
          </button>
        </div>

        <div className="t-dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              aria-label={`testimonial ${i + 1}`}
              className={`dot ${i === tIndex ? "active" : ""}`}
              onClick={() => setTIndex(i)}
            />
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner big fade-in">
        <div className="cta-border"></div>
        <h3>Готовы обсудить ваш проект?</h3>
        <p>Yozing — 24 soat ichida bepul konsultatsiya va dastlabki roadmap taqdim etamiz.</p>
        <div className="cta-actions">
          <a className="btn btn-primary lift" href="https://t.me/" target="_blank" rel="noreferrer">
            <FaTelegramPlane /> Telegram
          </a>
          <a className="btn btn-ghost lift" href="https://wa.me/" target="_blank" rel="noreferrer">
            <FaWhatsapp /> WhatsApp
          </a>
        </div>
        <ul className="cta-points">
          <li><FaCheckCircle /> Бриф за 3 минуты</li>
          <li><FaCheckCircle /> Прозрачная смета</li>
          <li><FaCheckCircle /> Дедлайны под ключ</li>
        </ul>

        {/* sparkles */}
        <span className="spark s1"></span>
        <span className="spark s2"></span>
        <span className="spark s3"></span>
      </section>

      {/* Footer */}
      <footer className="mini-footer">
        <span>© {new Date().getFullYear()} Adrian Hajdin. All rights reserved.</span>
        <nav className="footer-nav">
          <a href="#!" className="link">Terms & Conditions</a>
          <a href="#!" className="link">Privacy Policy</a>
        </nav>
      </footer>
    </div>
  );
};

export default Services;
