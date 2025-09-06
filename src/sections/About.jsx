import { useState } from 'react';
import Globe from 'react-globe.gl';
import Button from '../components/Button.jsx';

const EMAIL = 'rus-stroy-spb47@yandex.ru';

const About = () => {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 1800);
  };

  return (
    <section className="c-space my-24" id="about">
      {/* Title + micro-badges */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-fuchsia-400 via-violet-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(168,85,247,0.35)]">
            О компании
          </span>
        </h2>
        <div className="mt-3 flex items-center justify-center gap-2 text-[12px] text-white/80 flex-wrap">
          <span className="glass-badge">IT</span>
          <span className="glass-badge">Telegram-боты</span>
          <span className="glass-badge">Мобильные приложения</span>
          <span className="glass-badge">AI/Computer Vision</span>
          <span className="glass-badge">Аналитика и рост</span>
        </div>
      </div>

      <div className="grid xl:grid-cols-3 xl:rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        {/* Кто мы */}
        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <img
              src="assets/grid1.png"
              alt="grid-1"
              className="w-full sm:h-[276px] h-fit object-contain"
            />
            <div>
              <p className="grid-headtext">Кто мы</p>
              <p className="grid-subtext">
                Мы — продуктовая команда на стыке <b>технологий, маркетинга и автоматизации</b>.
                Запускаем веб-сервисы, Telegram-боты и мобильные приложения, интегрируем ИИ
                (распознавание лиц, генерация контента, ассистенты), строим <b>конверсионные воронки</b>
                и управляем <b>метриками</b> бизнеса. Наша цель — <b>понятный рост</b>: заявки, выручка,
                эффективность процессов.
              </p>
            </div>
          </div>
        </div>

        {/* Технологический стек */}
        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <img
              src="assets/grid2.png"
              alt="grid-2"
              className="w-full sm:h-[276px] h-fit object-contain"
            />
            <div>
              <p className="grid-headtext">Технологический стек</p>
              <p className="grid-subtext">
                <b>Next.js, React, Node.js, TypeScript</b>, интеграции AI (OpenAI, CV), Python,
                PostgreSQL/ClickHouse, Redis, WebSockets. Telegram-боты, платежи, CRM и аналитика.
                Архитектура — <b>масштабируемая</b>, с упором на скорость и <b>надёжность</b>.
              </p>
              <ul className="mt-3 space-y-1 text-white/80 text-[13px]">
                <li>• CI/CD, мониторинг и логирование</li>
                <li>• SEO/LCP/CLS оптимизации под высокие рейтинги</li>
                <li>• Интеграции с платежами, картами, KYC/AML</li>
              </ul>
            </div>
          </div>
        </div>

        {/* География и формат — 3D-глобус */}
        <div className="col-span-1 xl:row-span-4">
          <div className="grid-container">
            <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center">
              <Globe
                height={326}
                width={326}
                backgroundColor="rgba(0,0,0,0)"
                backgroundImageOpacity={0.55}
                showAtmosphere
                showGraticules
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                labelsData={[
                  { lat: 59.93, lng: 30.31, text: 'Санкт-Петербург', color: 'white', size: 14 },
                  { lat: 41.31, lng: 69.24, text: 'Ташкент', color: 'white', size: 12 },
                  { lat: 25.20, lng: 55.27, text: 'Дубай', color: 'white', size: 12 },
                ]}
              />
            </div>
            <div>
              <p className="grid-headtext">География и формат работы</p>
              <p className="grid-subtext">
                Базируемся в Санкт-Петербурге и Ташкенте, работаем по всему миру. Подстраиваемся под
                часовые пояса, берём на себя коммуникации, план-график и отчётность. Формат —
                <b> прозрачный и предсказуемый</b>.
              </p>
              <Button name="Связаться" isBeam containerClass="w-full mt-8" />
            </div>
          </div>
        </div>

        {/* Подход и ценности */}
        <div className="xl:col-span-2 xl:row-span-3">
          <div className="grid-container">
            <img
              src="assets/grid3.png"
              alt="grid-3"
              className="w-full sm:h-[266px] h-fit object-contain"
            />
            <div>
              <p className="grid-headtext">Наш подход</p>
              <p className="grid-subtext">
                От гипотез и прототипов к боевому продукту: исследование, UX, дизайн-система, разработка,
                аналитика и масштабирование. Мы строим <b>системы роста</b>, а не «ещё один сайт».
              </p>

              {/* Мини-статистика */}
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div className="glass-card py-3 rounded-2xl">
                  <p className="text-2xl font-extrabold">95%+</p>
                  <p className="text-[12px] text-white/70">Lighthouse Performance</p>
                </div>
                <div className="glass-card py-3 rounded-2xl">
                  <p className="text-2xl font-extrabold">24/7</p>
                  <p className="text-[12px] text-white/70">Мониторинг/алерты</p>
                </div>
                <div className="glass-card py-3 rounded-2xl">
                  <p className="text-2xl font-extrabold">MVP</p>
                  <p className="text-[12px] text-white/70">за 4–8 недель</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Контакты + копирование e-mail */}
        <div className="xl:col-span-1 xl:row-span-2">
          <div className="grid-container">
            <img
              src="assets/grid4.png"
              alt="grid-4"
              className="w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top"
            />
            <div className="space-y-2">
              <p className="grid-subtext text-center">Контакты</p>

              <div
                className="copy-container hover:scale-[1.01] transition-transform"
                onClick={handleCopy}
                title="Скопировать e-mail"
              >
                <img src={hasCopied ? 'assets/tick.svg' : 'assets/copy.svg'} alt="copy" />
                <p className="lg:text-2xl md:text-xl font-medium text-gray_gradient text-white">
                  {EMAIL}
                </p>
              </div>

              <p className="text-xs text-white/60 text-center">
                Нажмите, чтобы скопировать адрес. {hasCopied ? 'Скопировано!' : ''}
              </p>

              <div className="pt-2 grid grid-cols-2 gap-2 text-[12px] text-center">
                <a href="tel:+79111004793" className="glass-badge !justify-center">+7 911 100 4793</a>
                <a href="#contact" className="glass-badge !justify-center">Форма обратной связи</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
