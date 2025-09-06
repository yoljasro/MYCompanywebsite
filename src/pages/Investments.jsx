import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHome, FaChevronRight, FaChartLine, FaShieldAlt, FaCoins,
  FaCube, FaProjectDiagram, FaCheckCircle, FaAngleDoubleUp
} from "react-icons/fa";
import "./Investments.css";

const currency = (n) =>
  new Intl.NumberFormat("ru-RU", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export default function Investments() {
  /* ---- starfield background ---- */
  useEffect(() => {
    const c = document.getElementById("invBg");
    if (!c) return;
    const ctx = c.getContext("2d");
    const fit = () => { c.width = innerWidth; c.height = innerHeight; };
    fit();

    class Star {
      constructor(){
        this.x=Math.random()*c.width; this.y=Math.random()*c.height;
        this.r=Math.random()*1.4+.4; this.vx=(Math.random()-.5)*.25; this.vy=(Math.random()-.5)*.25;
        this.a=Math.random()*Math.PI*2;
      }
      step(){
        this.x+=this.vx; this.y+=this.vy; this.a+=0.03;
        if(this.x<0) this.x=c.width; if(this.x>c.width) this.x=0;
        if(this.y<0) this.y=c.height; if(this.y>c.height) this.y=0;
      }
      draw(){
        const alpha = 0.55 + Math.sin(this.a)*0.45;
        ctx.globalAlpha = alpha;
        ctx.beginPath(); ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
        ctx.fillStyle="#fff"; ctx.fill(); ctx.globalAlpha=1;
      }
    }
    let stars = Array.from({length:160},()=>new Star());
    const loop=()=>{ 
      // bg gradient
      const g = ctx.createLinearGradient(0,0,c.width,c.height);
      g.addColorStop(0,"#0a0b12"); g.addColorStop(1,"#0c0f1c");
      ctx.fillStyle=g; ctx.fillRect(0,0,c.width,c.height);
      stars.forEach(s=>{s.step(); s.draw();}); requestAnimationFrame(loop);
    };
    loop();
    const onResize=()=>{ fit(); stars = Array.from({length:160},()=>new Star()); };
    addEventListener("resize", onResize);
    return ()=>removeEventListener("resize", onResize);
  }, []);

  /* ---- parallax blobs ---- */
  useEffect(() => {
    const el = document.querySelector(".inv-parallax");
    const onMove = (e) => {
      el.style.setProperty("--px", `${(e.clientX/innerWidth - .5) * 24}px`);
      el.style.setProperty("--py", `${(e.clientY/innerHeight - .5) * 24}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /* ---- scroll reveal ---- */
  useEffect(() => {
    const els = document.querySelectorAll(".inv-fade,.inv-rise,.inv-scale");
    const obs = new IntersectionObserver((en)=>en.forEach(e=>e.isIntersecting&&e.target.classList.add("show")), {threshold:.2});
    els.forEach(el=>obs.observe(el)); return ()=>obs.disconnect();
  }, []);

  /* ---- ROI calculator state ---- */
  const [amount, setAmount] = useState(10000);
  const [months, setMonths] = useState(12);
  const [apr, setApr] = useState(16); // % годовых
  const monthlyRate = useMemo(()=> apr/100/12, [apr]);
  const forecast = useMemo(()=>{
    let principal = amount;
    for(let i=0;i<months;i++){ principal *= (1+monthlyRate); }
    return principal;
  }, [amount, months, monthlyRate]);

  const yieldAbs = Math.max(0, forecast - amount);
  const yieldPct = (yieldAbs/amount)*100;

  /* ---- portfolio chart (pie) ---- */
  const [alloc, setAlloc] = useState({ real: 45, tech: 30, alt: 25 }); // %
  const total = alloc.real + alloc.tech + alloc.alt || 1;
  const aReal = Math.round(alloc.real/total*100);
  const aTech = Math.round(alloc.tech/total*100);
  const aAlt  = 100 - aReal - aTech;

  /* ---- products ---- */
  const products = [
    {
      icon: <FaCube/>,
      title: "Доходные объекты недвижимости",
      apy: "12–16% годовых",
      risk: "Низкий–средний",
      brief: "Арендные потоки, индексируемые договоры, ежемесячные выплаты.",
      bullets: ["LTV ≤ 60%", "Срок 12–36 мес.", "Страхование ответственности"]
    },
    {
      icon: <FaProjectDiagram/>,
      title: "Инвестиции в проекты Star House",
      apy: "18–24% годовых",
      risk: "Средний",
      brief: "Финансирование строительно-девелоперских стадий под залог активов.",
      bullets: ["Пул проектов", "Ежеквартальные отчёты", "Залог и ковенанты"]
    },
    {
      icon: <FaChartLine/>,
      title: "Технологический фонд",
      apy: "25–35% годовых",
      risk: "Средний–высокий",
      brief: "Доли в PropTech/MarTech стартапах, синдикаты, адвайзинг.",
      bullets: ["Дью-дилидженс", "Транши по KPI", "Выход 18–36 мес."]
    }
  ];

  return (
    <div className="inv-page">
      <canvas id="invBg" className="inv-bg" />
      <div className="inv-parallax" style={{"--px":"0px","--py":"0px"}}>
        <span className="blob b1"></span>
        <span className="blob b2"></span>
        <span className="blob b3"></span>
        <span className="rays"></span>
      </div>

      {/* crumbs */}
      <div className="inv-crumbs inv-fade">
        <Link to="/services" className="inv-crumb"><FaHome/> Услуги</Link>
        <FaChevronRight className="inv-sep"/>
        <span className="inv-crumb active">Инвестиции</span>
      </div>

      {/* hero */}
      <header className="inv-hero inv-fade">
        <h1 className="inv-title"><FaCoins/> Инвестиционные решения</h1>
        <p>
          Прозрачные инструменты с понятными рисками: доходная недвижимость, проекты Star House
          и технологические доли. Контроль, отчётность и защита капитала.
        </p>
        <div className="inv-hero-tags">
          <span><FaShieldAlt/> Залог активов</span>
          <span><FaCheckCircle/> KYC/AML</span>
          <span><FaAngleDoubleUp/> Диверсификация</span>
        </div>
      </header>

      {/* products */}
      <section className="inv-products inv-rise">
        {products.map((p,i)=>(
          <div className="prod-card tilt3d" key={i} tabIndex={0}>
            <div className="face front">
              <div className="ic">{p.icon}</div>
              <h3>{p.title}</h3>
              <div className="meta">
                <span>Доходность: <b>{p.apy}</b></span>
                <span>Риск-профиль: <b>{p.risk}</b></span>
              </div>
              <p className="brief">{p.brief}</p>
              <button className="btn-ghost">Подробнее</button>
            </div>
            <div className="face back">
              <h4>Преимущества</h4>
              <ul>{p.bullets.map((b,bi)=>(<li key={bi}>{b}</li>))}</ul>
              <Link className="btn-primary" to="/contact">Оставить заявку</Link>
            </div>
          </div>
        ))}
      </section>

      {/* ROI + Portfolio */}
      <section className="inv-lab inv-scale">
        <div className="panel roi">
          <h3>Калькулятор доходности</h3>
          <div className="ctrls">
            <label>Сумма инвестиций: <b>{currency(amount)}</b></label>
            <input type="range" min="2000" max="100000" step="1000"
                   value={amount} onChange={(e)=>setAmount(+e.target.value)} />
            <label>Срок: <b>{months} мес.</b></label>
            <input type="range" min="3" max="36" step="1"
                   value={months} onChange={(e)=>setMonths(+e.target.value)} />
            <label>Ставка, % годовых: <b>{apr}%</b></label>
            <input type="range" min="8" max="36" step="1"
                   value={apr} onChange={(e)=>setApr(+e.target.value)} />
          </div>

          <div className="gauge-wrap">
            <div className="gauge" style={{"--val": Math.min(100, yieldPct)}}>
              <div className="gauge-hole">
                <div className="g-nums">
                  <div className="g-main">{currency(forecast)}</div>
                  <div className="g-sub">прибыль {currency(yieldAbs)} ({yieldPct.toFixed(1)}%)</div>
                </div>
              </div>
            </div>
            <p className="note">* Расчёт носит ориентировочный характер и не является офертой.</p>
          </div>
        </div>

        <div className="panel portfolio">
          <h3>Структура портфеля</h3>
          <div className="pie" style={{
            background: `conic-gradient(#22d3ee 0 ${aReal}%,
                                        #8b5cf6 ${aReal}% ${aReal+aTech}%,
                                        #ec4899 ${aReal+aTech}% 100%)`
          }}>
            <div className="pie-hole">{aReal}% / {aTech}% / {aAlt}%</div>
          </div>
          <div className="alloc">
            <label>Недвижимость: <b>{aReal}%</b></label>
            <input type="range" min="0" max="100" value={alloc.real}
                   onChange={(e)=>setAlloc(s=>({...s, real:+e.target.value}))}/>
            <label>Технологии: <b>{aTech}%</b></label>
            <input type="range" min="0" max="100" value={alloc.tech}
                   onChange={(e)=>setAlloc(s=>({...s, tech:+e.target.value}))}/>
            <label>Альтернативные активы: <b>{aAlt}%</b></label>
            <input type="range" min="0" max="100" value={alloc.alt}
                   onChange={(e)=>setAlloc(s=>({...s, alt:+e.target.value}))}/>
          </div>
          <ul className="legend">
            <li><span className="dot c1"></span> Недвижимость</li>
            <li><span className="dot c2"></span> Технологии</li>
            <li><span className="dot c3"></span> Альтернативные</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="inv-faq inv-rise">
        <h2>Частые вопросы</h2>
        <details><summary>Как обеспечивается защита инвестиций?</summary>
          <p>Залог недвижимых активов, ковенанты по LTV и DSCR, страхование гражданской ответственности, прозрачные отчёты.</p>
        </details>
        <details><summary>Когда и как выплачивается доход?</summary>
          <p>По продукту «Доходная недвижимость» — ежемесячно, по проектам и фонду — по графику (квартал/по выходу).</p>
        </details>
        <details><summary>Можно ли выйти раньше срока?</summary>
          <p>Досрочный выкуп возможен на рыночных условиях по согласованию (в зависимости от продукта и стадии проекта).</p>
        </details>
      </section>
    </div>
  );
}
