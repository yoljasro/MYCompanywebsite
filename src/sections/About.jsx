import { useState } from 'react';
import Globe from 'react-globe.gl';

import Button from '../components/Button.jsx';

const About = () => {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('hello@mainstream.global');
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <section className="c-space my-20" id="about">
      <div className="grid xl:grid-cols-3 xl:rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        {/* Кто мы */}
        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <img src="assets/grid1.png" alt="grid-1" className="w-full sm:h-[276px] h-fit object-contain" />
            <div>
              <p className="grid-headtext">Кто мы</p>
              <p className="grid-subtext">
                Мы создаём решения на стыке <b>IT, SMM и инвестиций</b>: цифровые продукты, AI-интеграции,
                сильные маркетинговые системы и понятную аналитику. Наша цель — рост показателей бизнеса,
                а не просто красивые презентации.
              </p>
            </div>
          </div>
        </div>

        {/* Технологический стек */}
        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <img src="assets/grid2.png" alt="grid-2" className="w-full sm:h-[276px] h-fit object-contain" />
            <div>
              <p className="grid-headtext">Технологический стек</p>
              <p className="grid-subtext">
                <b>Next.js, React, Node.js, TypeScript</b>, интеграции ИИ (OpenAI, компьютерное зрение),
                Telegram-боты, CRM, аналитика, no-code/low-code. Строим <b>масштабируемые</b> и
                <b>высокопроизводительные</b> продукты.
              </p>
            </div>
          </div>
        </div>

        {/* География и гибкость — 3D-глобус */}
        <div className="col-span-1 xl:row-span-4">
          <div className="grid-container">
            <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center">
              <Globe
                height={326}
                width={326}
                backgroundColor="rgba(0, 0, 0, 0)"
                backgroundImageOpacity={0.55}
                showAtmosphere
                showGraticules
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                labelsData={[
                  { lat: 41.31, lng: 69.24, text: 'Tashkent, Uzbekistan', color: 'white', size: 15 },
                  { lat: 55.75, lng: 37.62, text: 'Moscow', color: 'white', size: 10 },
                  { lat: 25.20, lng: 55.27, text: 'Dubai', color: 'white', size: 10 }
                ]}
              />
            </div>
            <div>
              <p className="grid-headtext">География и формат работы</p>
              <p className="grid-subtext">
                Мы базируемся в Ташкенте и работаем по всему миру. Адаптируемся под ваши часовые пояса,
                берём на себя коммуникации и управление проектом. Удобно, прозрачно, результативно.
              </p>
              <Button name="Связаться" isBeam containerClass="w-full mt-10" />
            </div>
          </div>
        </div>

        {/* Подход и ценности */}
        <div className="xl:col-span-2 xl:row-span-3">
          <div className="grid-container">
            <img src="assets/grid3.png" alt="grid-3" className="w-full sm:h-[266px] h-fit object-contain" />
            <div>
              <p className="grid-headtext">Наш подход</p>
              <p className="grid-subtext">
                Мы объединяем стратегию, креатив и технологию: от исследования и воронок до дизайна, кода и
                масштабирования. Любим измеримый эффект: <b>рост заявок, снижение CAC, LTV↑</b>.
                Делаем не «ещё один сайт», а систему роста.
              </p>
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
              <div className="copy-container" onClick={handleCopy} title="Скопировать e-mail">
                <img src={hasCopied ? 'assets/tick.svg' : 'assets/copy.svg'} alt="copy" />
                <p className="lg:text-2xl md:text-xl font-medium text-gray_gradient text-white">
                  hello@mainstream.global
                </p>
              </div>
              <p className="text-xs text-white/60 text-center">
                Нажмите, чтобы скопировать адрес. {hasCopied ? 'Скопировано!' : ''}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
