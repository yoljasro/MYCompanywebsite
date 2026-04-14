// File: src/pages/Mystic.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaMagic,
  FaArrowRight,
  FaMoon,
  FaUserAstronaut,
  FaStar,
  FaBell,
  FaGem
} from "react-icons/fa";

export default function Mystic() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mystic-page">
      <style>{styles}</style>

      {/* Breadcrumbs */}
      <nav className="m-crumbs">
        <Link to="/internal" className="m-crumb">Внутренние проекты</Link>
        <span className="m-sep">/</span>
        <span className="m-crumb active">Mystic App</span>
      </nav>

      {/* Hero Section */}
      <header className="m-hero">
        <div className="m-hero-inner">
          <div className="m-badge">
            <FaMagic /> Готовый продукт: Нативное iOS / Android приложение
          </div>
          <h1>
            Mystic — Астрология & Благополучие
            <span>Ваш персональный путеводитель по звездам</span>
          </h1>
          <p className="m-sub">
            Полноценное мобильное приложение, объединяющее ежедневные астрологические прогнозы, натальные карты, лунный календарь и персональные рекомендации. Приложение уже полностью готово к запуску и масштабированию.
          </p>
        </div>
      </header>

      {/* App Showcase section */}
      <section className="m-showcase">
        
        {/* Feature 1 */}
        <div className="m-feature-row">
          <div className="m-feature-text">
            <div className="m-feature-icon"><FaStar /></div>
            <h2>Персональная панель управления</h2>
            <p>
              Главный экран приложения встречает пользователя завораживающим дизайном и персональными данными. Здесь собрано самое важное: текущий знак, стихия дня и быстрая навигация к натальной карте и лунному календарю. Уникальный 3D-арт создает атмосферу премиального сервиса.
            </p>
            <ul className="m-feature-list">
              <li>Адаптивный дизайн главного экрана</li>
              <li>Интерактивные элементы и плавная анимация</li>
              <li>Мгновенный доступ к ключевым разделам</li>
            </ul>
          </div>
          <div className="m-feature-image">
            <div className="phone-mockup">
              <img src="/mystic/screen1.png" alt="Mystic Главный экран" />
              <div className="phone-glare"></div>
            </div>
          </div>
        </div>

        {/* Feature 2: Reversed */}
        <div className="m-feature-row reversed">
          <div className="m-feature-text">
            <div className="m-feature-icon"><FaGem /></div>
            <h2>Детализированные гороскопы на каждый день</h2>
            <p>
              Интуитивно понятный интерфейс выбора знака зодиака. Каждый знак проиллюстрирован уникальным, высококачественным артом. Пользователи могут читать развернутые прогнозы на сегодня, завтра, неделю и месяц для себя и своих близких.
            </p>
            <ul className="m-feature-list">
              <li>12 уникальных аватаров знаков зодиака</li>
              <li>Глубокая аналитика и советы от ИИ</li>
              <li>Проверка совместимости знаков</li>
            </ul>
          </div>
          <div className="m-feature-image">
            <div className="phone-mockup">
              <img src="/mystic/screen2.png" alt="Mystic Гороскопы" />
              <div className="phone-glare"></div>
            </div>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="m-feature-row">
          <div className="m-feature-text">
            <div className="m-feature-icon"><FaMoon /></div>
            <h2>Продвинутый лунный календарь</h2>
            <p>
              Точный трекинг лунных фаз и лунных дней. Приложение рассчитывает положение луны в знаках зодиака и дает ежедневные "советы дня". Это помогает пользователям планировать свои дела, очищать пространство и начинать новые проекты в наиболее благоприятное время.
            </p>
            <ul className="m-feature-list">
              <li>Интерактивный календарь-сетка на месяц</li>
              <li>Фазы луны и их влияние на эмоциональный фон</li>
              <li>Специальные рекомендации на каждый лунный день</li>
            </ul>
          </div>
          <div className="m-feature-image">
            <div className="phone-mockup">
              <img src="/mystic/screen3.png" alt="Mystic Лунный календарь" />
              <div className="phone-glare"></div>
            </div>
          </div>
        </div>

        {/* Feature 4: Reversed */}
        <div className="m-feature-row reversed">
          <div className="m-feature-text">
            <div className="m-feature-icon"><FaUserAstronaut /></div>
            <h2>Глубокий личный профиль пользователя</h2>
            <p>
              Mystic — это не просто прогнозы, это самопознание. Приложение анализирует интересы, тип личности, точные дату и место рождения пользователя, выстраивая точный астрологический портрет.
            </p>
            <ul className="m-feature-list">
              <li>Отображение психотипа (например, Флегматик)</li>
              <li>Трекинг интересов: природа, кулинария, танцы и др.</li>
              <li>Формирование идеальных матчей на основе профиля</li>
            </ul>
          </div>
          <div className="m-feature-image">
            <div className="phone-mockup">
              <img src="/mystic/screen4.png" alt="Mystic Профиль пользователя" />
              <div className="phone-glare"></div>
            </div>
          </div>
        </div>

        {/* Feature 5 */}
        <div className="m-feature-row">
          <div className="m-feature-text">
            <div className="m-feature-icon"><FaBell /></div>
            <h2>Гибкие настройки и уведомления</h2>
            <p>
              Высокий уровень персонализации позволяет пользователям получать push-уведомления только о том, что им действительно важно. Будь то ежедневный гороскоп, фазы новолуния и полнолуния или советы по совместимости.
            </p>
            <ul className="m-feature-list">
              <li>Детальная настройка PUSH-уведомлений</li>
              <li>Управление аккаунтом и приватностью</li>
              <li>Аватары профиля и звуковое сопровождение фоном</li>
            </ul>
          </div>
          <div className="m-feature-image">
            <div className="phone-mockup">
              <img src="/mystic/screen5.png" alt="Mystic Настройки" />
              <div className="phone-glare"></div>
            </div>
          </div>
        </div>

      </section>

      {/* Info Block */}
      <section className="m-info-block">
        <div className="m-info-inner">
          <h2>Почему Mystic — это успех?</h2>
          <p>
            Готовое приложение, разработанное с учетом лучших UX/UI практик и современных трендов wellness-индустрии. Монетизация через подписки, высокая вовлеченность (Retention Rate) благодаря ежедневным советам и лунному календарю.
          </p>
          <div className="m-cta center">
            <Link to="/contact" className="btn btn-primary">
              Заказать аналогичное приложение <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="m-foot">
        <Link to="/internal" className="m-back">← Вернуться к проектам</Link>
        <div className="m-rights">© {new Date().getFullYear()} Mystic. Готовый проект.</div>
      </footer>
    </div>
  );
}

const styles = `
:root {
  --mystic-bg: #0b0c10;
  --mystic-accent: #cfa871; /* Золотистый оттенок как на скринах */
  --mystic-text: #f3f4f6;
  --mystic-muted: #9ca3af;
  --mystic-card: #1f2937;
  --mystic-border: rgba(255, 255, 255, 0.08);
}

.mystic-page {
  position: relative;
  min-height: 100vh;
  color: var(--mystic-text);
  background: var(--mystic-bg);
  background-image: 
    radial-gradient(circle at 20% 0%, rgba(207, 168, 113, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 100%, rgba(207, 168, 113, 0.05) 0%, transparent 50%);
  overflow-x: hidden;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* crumbs */
.m-crumbs {
  max-width: 1200px;
  margin: 100px auto 20px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.95rem;
}
.m-crumb { color: var(--mystic-muted); text-decoration: none; transition: color 0.2s; }
.m-crumb:hover { color: var(--mystic-accent); }
.m-crumb.active { color: var(--mystic-text); font-weight: 500; }
.m-sep { color: var(--mystic-border); }

/* hero */
.m-hero {
  padding: 40px 24px 20px;
}
.m-hero-inner {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}
.m-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: 1px solid var(--mystic-accent);
  border-radius: 999px;
  background: rgba(207, 168, 113, 0.1);
  color: var(--mystic-accent);
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 24px;
}
.m-hero h1 {
  font-size: clamp(2.5rem, 5vw, 4rem);
  line-height: 1.1;
  font-weight: 700;
  margin: 0 0 24px;
  color: #ffffff;
}
.m-hero h1 span {
  display: block;
  font-size: 0.45em;
  font-weight: 400;
  color: var(--mystic-muted);
  margin-top: 12px;
}
.m-sub {
  font-size: 1.2rem;
  line-height: 1.6;
  color: var(--mystic-muted);
  max-width: 700px;
  margin: 0 auto;
}

/* showcase */
.m-showcase {
  max-width: 1200px;
  margin: 80px auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 100px;
}
.m-feature-row {
  display: flex;
  align-items: center;
  gap: 60px;
  justify-content: space-between;
}
.m-feature-row.reversed {
  flex-direction: row-reverse;
}
.m-feature-text {
  flex: 1;
  max-width: 540px;
}
.m-feature-icon {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: rgba(207, 168, 113, 0.1);
  color: var(--mystic-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 24px;
}
.m-feature-text h2 {
  font-size: 2.2rem;
  margin: 0 0 20px;
  color: #fff;
  line-height: 1.2;
}
.m-feature-text p {
  font-size: 1.1rem;
  color: var(--mystic-muted);
  line-height: 1.6;
  margin: 0 0 24px;
}
.m-feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.m-feature-list li {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #d1d5db;
  font-size: 1.05rem;
}
.m-feature-list li::before {
  content: "✦";
  color: var(--mystic-accent);
}

.m-feature-image {
  flex: 1;
  display: flex;
  justify-content: center;
  perspective: 1000px; /* effect */
}
.phone-mockup {
  position: relative;
  width: 300px;
  height: 620px;
  border-radius: 40px;
  border: 12px solid #1f2937;
  background: #0b0c10;
  overflow: hidden;
  box-shadow: 0 30px 60px -12px rgba(0,0,0,0.8), 0 0 0 1px var(--mystic-border);
  display: flex;
  align-items: flex-start; /* top align important for crop */
  justify-content: center;
  color: var(--mystic-muted);
  text-align: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-style: preserve-3d;
}
.phone-mockup:hover {
  transform: translateY(-12px) rotateX(4deg) rotateY(-4deg) scale(1.02);
  box-shadow: 20px 40px 80px -15px rgba(207, 168, 113, 0.3), -20px 40px 80px -15px rgba(139, 92, 246, 0.2), 0 0 0 1px var(--mystic-accent);
  border-color: #293140;
}
.m-feature-row.reversed .phone-mockup:hover {
  transform: translateY(-12px) rotateX(4deg) rotateY(4deg) scale(1.02);
}

.phone-mockup::before {
  content: '';
  position: absolute;
  top: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 140px;
  height: 28px;
  background: #1f2937;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  z-index: 10;
  transition: background 0.4s ease;
}
.phone-mockup:hover::before {
  background: #293140;
}

.phone-mockup img {
  width: 100%;
  /* Make the image taller to push the top status bar out of bounds */
  height: calc(100% + 56px);
  margin-top: -56px; 
  object-fit: cover;
  position: relative;
  z-index: 1;
}
.phone-glare {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 50%);
  pointer-events: none;
  z-index: 5;
  transition: opacity 0.4s ease;
}
.phone-mockup:hover .phone-glare {
  opacity: 1.5;
  background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 60%);
}

/* info block */
.m-info-block {
  margin: 60px 24px;
  padding: 80px 24px;
  background: rgba(207, 168, 113, 0.03);
  border-top: 1px solid var(--mystic-border);
  border-bottom: 1px solid var(--mystic-border);
  text-align: center;
}
.m-info-inner {
  max-width: 800px;
  margin: 0 auto;
}
.m-info-inner h2 {
  font-size: 2.2rem;
  margin: 0 0 20px;
  color: var(--mystic-accent);
}
.m-info-inner p {
  font-size: 1.15rem;
  color: var(--mystic-muted);
  line-height: 1.6;
  margin: 0 0 40px;
}

/* buttons */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}
.btn-primary {
  color: #000;
  background: var(--mystic-accent);
  box-shadow: 0 8px 24px rgba(207, 168, 113, 0.3);
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(207, 168, 113, 0.4);
}
.center {
  justify-content: center;
}

/* footer */
.m-foot {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--mystic-muted);
  font-size: 0.95rem;
}
.m-back {
  color: var(--mystic-muted);
  text-decoration: none;
  transition: color 0.2s;
}
.m-back:hover {
  color: var(--mystic-accent);
}

@media (max-width: 992px) {
  .m-feature-row, .m-feature-row.reversed {
    flex-direction: column;
    text-align: center;
    gap: 40px;
  }
  .m-feature-text {
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .phone-mockup {
    width: 280px;
    height: 580px;
  }
}
@media (max-width: 576px) {
  .m-hero h1 { font-size: 2rem; }
  .phone-mockup { width: 260px; height: 538px; border-width: 8px; }
  .m-feature-text h2 { font-size: 1.8rem; }
  .btn { width: 100%; justify-content: center; }
  .m-foot { flex-direction: column; gap: 20px; text-align: center; }
}
`;

