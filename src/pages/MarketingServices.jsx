import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHome, FaChevronRight, FaBullhorn, FaInstagram, FaTiktok, FaYoutube,
  FaHashtag, FaCamera, FaVideo, FaUsers, FaAd, FaChartLine, FaRocket,
  FaCheckCircle, FaChevronLeft, FaChevronDown, FaChevronUp, FaMagic, FaClipboardCheck
} from "react-icons/fa";
import "./MarketingServices.css";

const nfmt = (n) => new Intl.NumberFormat("ru-RU").format(Math.round(n));

export default function MarketingServices(){
  /* ---------- Starfield BG ---------- */
  useEffect(()=>{
    const c = document.getElementById("mktBg"); if(!c) return;
    const ctx = c.getContext("2d");
    const fit = ()=>{ c.width=innerWidth; c.height=innerHeight; };
    fit();
    class Star{ constructor(){ this.x=Math.random()*c.width; this.y=Math.random()*c.height; this.r=Math.random()*1.6+.5; this.vx=(Math.random()-.5)*.36; this.vy=(Math.random()-.5)*.36;}
      step(){ this.x+=this.vx; this.y+=this.vy; if(this.x<0||this.x>c.width) this.vx*=-1; if(this.y<0||this.y>c.height) this.vy*=-1;}
      draw(){ ctx.beginPath(); ctx.arc(this.x,this.y,this.r,0,Math.PI*2); ctx.fillStyle="rgba(255,255,255,.9)"; ctx.fill();}}
    let stars = Array.from({length:170},()=>new Star());
    const loop=()=>{ ctx.clearRect(0,0,c.width,c.height); stars.forEach(s=>{s.step(); s.draw();}); requestAnimationFrame(loop);};
    loop(); const onResize=()=>{fit(); stars=Array.from({length:170},()=>new Star());};
    addEventListener("resize", onResize); return ()=>removeEventListener("resize", onResize);
  },[]);

  /* ---------- reveal on scroll ---------- */
  useEffect(()=>{
    const els = document.querySelectorAll(".mk-fade,.mk-rise,.mk-scale");
    const obs = new IntersectionObserver((en)=>en.forEach(x=>x.isIntersecting&&x.target.classList.add("show")), {threshold:.2});
    els.forEach(el=>obs.observe(el)); return ()=>obs.disconnect();
  },[]);

  /* ---------- Tabs: channels ---------- */
  const [tab, setTab] = useState("ig");

  /* ---------- Media-mix calculator ---------- */
  const [ig, setIg] = useState(600);     // $
  const [tt, setTt] = useState(400);     // $
  const [yt, setYt] = useState(300);     // $
  const [cpmIg, setCpmIg] = useState(2.2);
  const [cpmTt, setCpmTt] = useState(1.4);
  const [cpmYt, setCpmYt] = useState(3.6);
  const [cr, setCr]       = useState(1.8); // % konversiya landing -> lead
  const total = useMemo(()=> ig+tt+yt, [ig,tt,yt]);
  const shows = useMemo(()=> (ig/cpmIg+tt/cpmTt+yt/cpmYt)*1000, [ig,tt,yt,cpmIg,cpmTt,cpmYt]);
  const clicks = useMemo(()=> shows*0.014, [shows]);        // taxmin CTR 1.4%
  const leads  = useMemo(()=> clicks*(cr/100), [clicks,cr]);

  /* ---------- Content plan generator ---------- */
  const ideas = {
    ig: [
      "UGC-интервью: “Почему выбрали наш продукт?” (Reels, 20–30 сек)",
      "Before/After + чек-лист в описании",
      "Обзор топ-3 функций/плюсов (стоп-кадры + субтитры)"
    ],
    tt: [
      "Трендовый звук + быстрый монтаж продукта (7–12 сек)",
      "POV: боль ЦА → решение → CTA",
      "Дуэт с лидером мнений / Stitch-реакция"
    ],
    yt: [
      "Shorts: ‘5 ошибок при выборе …’",
      "Гайд ‘как начать за 3 шага’ (Shorts)",
      "Тест/сравнение: наш продукт vs альтернатива"
    ]
  };
  const [seed,setSeed] = useState(0);
  const pick = (arr)=>arr[(seed+arr.length*10)%arr.length];

  /* ---------- UGC brief generator ---------- */
  const [brief, setBrief] = useState("");
  const genBrief = ()=>{
    const tone = ["дружелюбный","экспертный","ироничный"][seed%3];
    const hook = ["боль/выгода","до/после","кейс клиента"][seed%3];
    setBrief(`Тональность: ${tone}.
Цель: показать ${hook} и дать простой CTA.
Сюжет: 1) Хук 2 сек • 2) Демонстрация 8–12 сек • 3) Соц-доказательство 3 сек • 4) CTA и оффер.
Формат: Reels/TikTok вертикаль, 1080×1920, субтитры, крупные планы рук/лица.`);
    setSeed(s=>s+1);
  };

  /* ---------- Cases ---------- */
  const cases = [
    {t:"Ресторан • Reels + таргет", k:"ER 8,7% • CPL $0,39", d:"Контент-план + ретаргет, лайв-контент — стабильно заполненные брони."},
    {t:"EdTech • TikTok Spark Ads", k:"DAU +42% • CPI $0,27", d:"UGC + Spark Ads: рост установок ×3, виральные клипы."},
    {t:"Ритейл • Инфлюенсеры", k:"ROMI 312% • 2100 продаж", d:"Нативные интеграции, купоны и партнёрки, трекинг по UTM."},
  ];
  const [ci,setCi]=useState(0);

  /* ---------- FAQ ---------- */
  const [open,setOpen]=useState<number|null>(null);

  return (
    <div className="mkt-page">
      <canvas id="mktBg" className="mkt-bg"/>
      <div className="mkt-parallax" aria-hidden="true">
        <span className="b b1"></span><span className="b b2"></span><span className="b b3"></span>
        <span className="rays"></span>
      </div>

      {/* crumbs */}
      <div className="mk-breadcrumb mk-fade">
        <Link to="/services" className="br-link"><FaHome/> Услуги</Link>
        <FaChevronRight className="sep"/><span className="br-link active">Маркетинг</span>
      </div>

      {/* hero */}
      <header className="mk-hero mk-fade">
        <h1 className="mk-title"><FaBullhorn/> Маркетинговые решения</h1>
        <p>Таргет, контент-продакшн и масштабирование. Создаём Reels/Shorts, запускаем точный перформанс и приносим **измеримый результат**.</p>
        <div className="mk-tags">
          <span><FaInstagram/> Instagram</span>
          <span><FaTiktok/> TikTok</span>
          <span><FaYoutube/> YouTube</span>
          <span><FaHashtag/> Стратегия</span>
        </div>
      </header>

      {/* channels tabs */}
      <section className="mk-tabs mk-rise">
        <div className="tabs">
          <button className={tab==="ig"?"on":""} onClick={()=>setTab("ig")}><FaInstagram/> Instagram</button>
          <button className={tab==="tt"?"on":""} onClick={()=>setTab("tt")}><FaTiktok/> TikTok</button>
          <button className={tab==="yt"?"on":""} onClick={()=>setTab("yt")}><FaYoutube/> YouTube</button>
        </div>
        <div className="tab-panels">
          {tab==="ig" && (
            <div className="panel glass">
              <h3>Контент + перформанс (Instagram)</h3>
              <ul className="bullets">
                <li><FaCheckCircle/> Reels-серии: “боль → решение”, UGC, лид-магниты</li>
                <li><FaCheckCircle/> Таргет: ретаргет, Lookalike, лид-формы</li>
                <li><FaCheckCircle/> KPI: ER, охват, CPL/CPA, ROMI</li>
              </ul>
            </div>
          )}
          {tab==="tt" && (
            <div className="panel glass">
              <h3>Виральный рост (TikTok)</h3>
              <ul className="bullets">
                <li><FaCheckCircle/> Быстрый монтаж, тренд-аудио, spark-объявления</li>
                <li><FaCheckCircle/> UGC-пакеты от микроблогеров</li>
                <li><FaCheckCircle/> KPI: просмотры, досмотры, CPI/CPL</li>
              </ul>
            </div>
          )}
          {tab==="yt" && (
            <div className="panel glass">
              <h3>Shorts и намеренный поиск (YouTube)</h3>
              <ul className="bullets">
                <li><FaCheckCircle/> Shorts-гайды/тесты, натив в роликах</li>
                <li><FaCheckCircle/> TrueView/Discovery + ремаркетинг</li>
                <li><FaCheckCircle/> KPI: CTR, watch-time, CAC/LTV</li>
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* services grid with 3D tilt + flip */}
      <section className="mk-services mk-rise">
        {[
          {icon:<FaCamera/>, t:"Мобилография", d:"Съёмка на смартфон с кино-светом, монтаж, субтитры."},
          {icon:<FaVideo/>, t:"Видеопродакшн", d:"Reels/Shorts, сценарии, voice-over, саунд-дизайн."},
          {icon:<FaAd/>, t:"Таргет", d:"Фunnels, ретаргет, Lookalike, Spark Ads, A/B креативы."},
          {icon:<FaUsers/>, t:"Инфлюенсеры", d:"Поиск, согласование, CPA/CPM, UTM-отчёты и ROMI."},
          {icon:<FaChartLine/>, t:"Аналитика", d:"GA4/Pixel, сквозная аналитика, LTV/CR/CPA."},
          {icon:<FaRocket/>, t:"Стратегия", d:"Позиционирование, Tone of Voice, визуальный гайд."}
        ].map((s,i)=>(
          <div key={i} className="svc flip3d">
            <div className="front">
              <div className="ic">{s.icon}</div><h3>{s.t}</h3><p>{s.d}</p>
            </div>
            <div className="back">
              <h4>Что получите?</h4>
              <ul>
                <li>План работ на месяц</li>
                <li>Промежуточные отчёты</li>
                <li>KPI-панель в реальном времени</li>
              </ul>
            </div>
          </div>
        ))}
      </section>

      {/* media-mix calculator + generators */}
      <section className="mk-lab mk-rise">
        <div className="panel calc">
          <h3>Медиамикс — охват и лиды</h3>
          <div className="mix">
            <label>Instagram бюджет: <b>${nfmt(ig)}</b></label>
            <input type="range" min="0" max="5000" step="50" value={ig} onChange={e=>setIg(+e.target.value)}/>
            <label>TikTok бюджет: <b>${nfmt(tt)}</b></label>
            <input type="range" min="0" max="5000" step="50" value={tt} onChange={e=>setTt(+e.target.value)}/>
            <label>YouTube бюджет: <b>${nfmt(yt)}</b></label>
            <input type="range" min="0" max="5000" step="50" value={yt} onChange={e=>setYt(+e.target.value)}/>
          </div>

          <div className="mix two-cols">
            <label>CPM IG: <b>${cpmIg.toFixed(2)}</b></label>
            <input type="range" min="0.8" max="6" step="0.1" value={cpmIg} onChange={e=>setCpmIg(+e.target.value)}/>
            <label>CPM TT: <b>${cpmTt.toFixed(2)}</b></label>
            <input type="range" min="0.6" max="5" step="0.1" value={cpmTt} onChange={e=>setCpmTt(+e.target.value)}/>
            <label>CPM YT: <b>${cpmYt.toFixed(2)}</b></label>
            <input type="range" min="1" max="8" step="0.1" value={cpmYt} onChange={e=>setCpmYt(+e.target.value)}/>
            <label>Конверсия в лид: <b>{cr.toFixed(1)}%</b></label>
            <input type="range" min="0.5" max="8" step="0.1" value={cr} onChange={e=>setCr(+e.target.value)}/>
          </div>

          <div className="cards">
            <div className="card stat"><span className="cap">Итого бюджет</span><span className="val">${nfmt(total)}</span></div>
            <div className="card stat"><span className="cap">Показы</span><span className="val">{nfmt(shows)}</span></div>
            <div className="card stat"><span className="cap">Клики (оценка)</span><span className="val">{nfmt(clicks)}</span></div>
            <div className="card stat"><span className="cap">Лиды (оценка)</span><span className="val">{nfmt(leads)}</span></div>
          </div>
          <p className="note">* Модель ориентировочная. Факт зависит от креативов, аудиторий и ниши.</p>
        </div>

        <div className="panel tools">
          <h3><FaMagic/> Генераторы</h3>
          <div className="gen">
            <div className="gen-box">
              <h4>Идеи контента</h4>
              <div className="chips">
                <button className={tab==="ig"?"on":""} onClick={()=>setTab("ig")}><FaInstagram/> IG</button>
                <button className={tab==="tt"?"on":""} onClick={()=>setTab("tt")}><FaTiktok/> TT</button>
                <button className={tab==="yt"?"on":""} onClick={()=>setTab("yt")}><FaYoutube/> YT</button>
              </div>
              <ul className="ideas">
                {ideas[tab].map((x,i)=><li key={i}>• {x}</li>)}
              </ul>
              <button className="btn-ghost" onClick={()=>setSeed(s=>s+1)}>Ещё варианты</button>
            </div>

            <div className="gen-box">
              <h4>UGC-бриф</h4>
              <textarea className="brief" value={brief} placeholder="Нажмите «Сгенерировать» — получаете готовый тезисный бриф." readOnly />
              <button className="btn-primary" onClick={genBrief}><FaClipboardCheck/> Сгенерировать</button>
            </div>
          </div>
        </div>
      </section>

      {/* cases */}
      <section className="mk-cases mk-scale">
        <div className="cases-head">
          <h2>Кейсы</h2>
          <div className="nav">
            <button onClick={()=>setCi((ci-1+cases.length)%cases.length)}><FaChevronLeft/></button>
            <button onClick={()=>setCi((ci+1)%cases.length)}><FaChevronRight/></button>
          </div>
        </div>
        <article className="case glass">
          <h3>{cases[ci].t}</h3>
          <p className="kpi">{cases[ci].k}</p>
          <p>{cases[ci].d}</p>
        </article>
      </section>

      {/* process timeline + audit checklist */}
      <section className="mk-process mk-rise">
        <div className="timeline">
          {[
            {n:1,t:"Аналитика",d:"Бриф, аудит, стратегия, цели и KPI."},
            {n:2,t:"Продакшн",d:"Контент-план, съёмка UGC/студия, монтаж."},
            {n:3,t:"Запуск",d:"Кампании, ретаргет, креатив-тесты, пиксели."},
            {n:4,t:"Рост",d:"Оптимизация, A/B, масштабирование, ROMI."}
          ].map((s,i)=>(
            <div className="step" key={i}><span className="n">{s.n}</span><h4>{s.t}</h4><p>{s.d}</p></div>
          ))}
        </div>

        <div className="audit glass">
          <h3>Аудит перед стартом</h3>
          <ul className="check">
            <li><FaCheckCircle/> Установлены пиксели (Meta/GA4/TikTok)</li>
            <li><FaCheckCircle/> Цели/конверсии настроены</li>
            <li><FaCheckCircle/> UTM-метки/сквозная аналитика</li>
            <li><FaCheckCircle/> Лэндинг с понятным CTA</li>
          </ul>
        </div>
      </section>

      {/* pricing */}
      <section className="mk-pricing mk-rise">
        <h2>Пакеты</h2>
        <div className="grid">
          <div className="p-card">
            <h3>Start</h3>
            <p className="desc">Контент + запуск рекламы</p>
            <div className="price">от $790</div>
            <ul>
              <li><FaCheckCircle/> 12 Reels/мес</li>
              <li><FaCheckCircle/> 2 кампании ADS</li>
              <li><FaCheckCircle/> Отчёт раз в 2 недели</li>
            </ul>
            <a className="btn-primary" href="https://t.me/" target="_blank" rel="noreferrer">Заказать</a>
          </div>
          <div className="p-card best">
            <div className="badge">Хит</div>
            <h3>Growth</h3>
            <p className="desc">Производство + перформанс</p>
            <div className="price">от $1990</div>
            <ul>
              <li><FaCheckCircle/> 24 Reels/Stories</li>
              <li><FaCheckCircle/> Ретаргет + Lookalike</li>
              <li><FaCheckCircle/> Сквозная аналитика</li>
            </ul>
            <a className="btn-primary" href="https://t.me/" target="_blank" rel="noreferrer">Заказать</a>
          </div>
          <div className="p-card">
            <h3>Enterprise</h3>
            <p className="desc">Стратегия, UGC, инфлюенсеры</p>
            <div className="price">по запросу</div>
            <ul>
              <li><FaCheckCircle/> Media-mix и roadmap</li>
              <li><FaCheckCircle/> Инфлюенсер-кампании</li>
              <li><FaCheckCircle/> KPI: CPA/CAC/LTV</li>
            </ul>
            <a className="btn-ghost" href="https://t.me/" target="_blank" rel="noreferrer">Связаться</a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mk-faq mk-rise">
        <h2>FAQ</h2>
        {[
          {q:"Срок запуска?", a:"Обычно 5–10 дней: бриф, концепции, сетап пикселей, первые креативы и тест."},
          {q:"Как считается стоимость?", a:"Согласуем медиаплан и бюджет. Оплата — фикс + % от кабинета или KPI-модель."},
          {q:"Делаете продакшн?", a:"Да: мобилография/студия, сценарии, монтаж, субтитры, цветокор, озвучка."}
        ].map((f,i)=>(
          <div className={"qa "+(open===i?"open":"")} key={i}>
            <button className="q" onClick={()=>setOpen(open===i?null:i)}>
              {f.q} {open===i? <FaChevronUp/> : <FaChevronDown/>}
            </button>
            <div className="a"><p>{f.a}</p></div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="mk-cta mk-fade">
        <div className="glow"></div>
        <h2>Хотите обсудить рост?</h2>
        <p>Оставьте контакт — пришлём пример медиамикса, контент-плана и прогноз по лидам.</p>
        <div className="cta-actions">
          <a className="btn-primary" href="https://t.me/" target="_blank" rel="noreferrer">Получить консультацию</a>
          <Link className="btn-ghost" to="/services">Вернуться к услугам</Link>
        </div>
      </section>
    </div>
  );
}
