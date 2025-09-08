// File: src/pages/TravelCand.jsx
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaMapMarkedAlt,
  FaHotel,
  FaRoute,
  FaTaxi,
  FaWallet,
  FaShieldAlt,
  FaStar,
  FaParachuteBox,
  FaCompass,
} from "react-icons/fa";

/**
 * TravelCand — one app for every trip
 * WOW redesign: top padding fix, 3D globe, infinity clouds, animated plane route,
 * parallax mountains, floating pins. Flat hero (no tilt).
 * No external libs besides react, react-router-dom, react-icons.
 */
export default function TravelCand() {
  const skyRef = useRef(null);      // starry sky gradient
  const cloudsRef = useRef(null);   // infinite clouds
  const globeRef = useRef(null);    // rotating 3D globe lines
  const wavesRef = useRef(null);    // mountains/waves
  const pathRef = useRef(null);     // flight path + plane

  /* ===== 1) Sky gradient + twinkling stars (infinite) ===== */
  useEffect(() => {
    const c = skyRef.current; if (!c) return; const ctx = c.getContext("2d");
    let raf; const DPR = Math.min(2, window.devicePixelRatio || 1);
    const fit = () => { c.width = Math.floor(c.clientWidth * DPR); c.height = Math.floor(c.clientHeight * DPR); };
    fit();
    const N = 160;
    const stars = Array.from({ length: N }).map(() => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height * 0.8,
      r: (Math.random() * 1.2 + 0.6) * DPR,
      a: Math.random() * Math.PI * 2,
      s: 0.02 + Math.random() * 0.04,
    }));
    const draw = () => {
      const g = ctx.createLinearGradient(0, 0, 0, c.height);
      g.addColorStop(0, "#071226"); g.addColorStop(1, "#0f1730");
      ctx.fillStyle = g; ctx.fillRect(0, 0, c.width, c.height);
      stars.forEach(s => { s.a += s.s; const tw = 0.55 + Math.sin(s.a) * 0.45; ctx.globalAlpha = tw; ctx.beginPath(); ctx.fillStyle = "#fff"; ctx.arc(s.x, s.y, s.r, 0, Math.PI*2); ctx.fill(); });
      ctx.globalAlpha = 1; raf = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => fit();
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  /* ===== 2) Infinite clouds (layered, horizontal scroll) ===== */
  useEffect(() => {
    const c = cloudsRef.current; if (!c) return; const ctx = c.getContext("2d");
    let t = 0, raf; const DPR = Math.min(2, window.devicePixelRatio || 1);
    const fit = () => { c.width = Math.floor(c.clientWidth * DPR); c.height = Math.floor(c.clientHeight * DPR); };
    fit();
    const clouds = Array.from({ length: 24 }).map((_,i)=>({
      y: (0.12 + Math.random()*0.35) * c.height,
      x: Math.random() * c.width,
      s: 0.15 + Math.random()*0.6, // speed
      r: 40 + Math.random()*120,
      a: 0.05 + Math.random()*0.15,
      l: i%2? 0.12:0.18,
    }));
    const puff = (x,y,r,alpha)=>{ ctx.globalAlpha = alpha; const g = ctx.createRadialGradient(x,y,r*0.2, x,y,r); g.addColorStop(0, "rgba(250,253,255,.9)"); g.addColorStop(1, "rgba(200,220,250,.05)"); ctx.fillStyle=g; ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill(); };
    const draw = () => {
      t += 1; ctx.clearRect(0,0,c.width,c.height);
      clouds.forEach(cl=>{ cl.x -= cl.s; if (cl.x < -200) cl.x = c.width + 200; puff(cl.x, cl.y, cl.r, cl.a); puff(cl.x+cl.r*0.9, cl.y+10, cl.r*0.8, cl.a*0.9); puff(cl.x-cl.r*0.7, cl.y+8, cl.r*0.7, cl.a*0.85); });
      raf = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => fit();
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  /* ===== 3) Rotating 3D-esque globe (lat/long lines) ===== */
  useEffect(() => {
    const c = globeRef.current; if (!c) return; const ctx = c.getContext("2d");
    let t = 0, raf; const DPR = Math.min(2, window.devicePixelRatio || 1);
    const fit = () => { c.width = Math.floor(c.clientWidth * DPR); c.height = Math.floor(c.clientHeight * DPR); };
    fit();
    const draw = ()=>{
      t += 0.01; const w=c.width,h=c.height; ctx.clearRect(0,0,w,h);
      const R = Math.min(w,h)*0.18; const cx = w*0.15; const cy = h*0.32; // left-top hero corner
      // globe body glow
      const body = ctx.createRadialGradient(cx-R*0.4, cy-R*0.5, R*0.2, cx, cy, R);
      body.addColorStop(0, "rgba(120,200,255,.55)"); body.addColorStop(1, "rgba(120,200,255,.06)");
      ctx.fillStyle = body; ctx.beginPath(); ctx.arc(cx,cy,R,0,Math.PI*2); ctx.fill();
      // lat/long lines
      ctx.strokeStyle = "rgba(180,220,255,.45)"; ctx.lineWidth = 1*DPR;
      for(let i=-60;i<=60;i+=20){ // latitudes
        const r = Math.cos(i*Math.PI/180) * R; ctx.beginPath(); ctx.ellipse(cx, cy, r, R*0.35, 0, 0, Math.PI*2); ctx.stroke();
      }
      for(let k=0;k<8;k++){ // longitudes animated
        const a = t + k*(Math.PI/8); ctx.beginPath(); ctx.ellipse(cx, cy, R*0.35, R, a, 0, Math.PI*2); ctx.stroke();
      }
      // spark pin rotating
      const px = cx + Math.cos(t*1.2)*R*0.7; const py = cy + Math.sin(t*0.9)*R*0.4;
      ctx.fillStyle = "#9ae6ff"; ctx.beginPath(); ctx.arc(px,py,4*DPR,0,Math.PI*2); ctx.fill();
      ctx.shadowColor = "#9ae6ff"; ctx.shadowBlur = 14; ctx.beginPath(); ctx.arc(px,py,2*DPR,0,Math.PI*2); ctx.fill(); ctx.shadowBlur = 0;
      raf = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => fit();
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  /* ===== 4) Mountain/wave silhouettes (bottom of hero) ===== */
  useEffect(() => {
    const c = wavesRef.current; if (!c) return; const ctx = c.getContext("2d");
    let t=0, raf; const DPR=Math.min(2, window.devicePixelRatio||1);
    const fit = () => { c.width = Math.floor(c.clientWidth*DPR); c.height = Math.floor(c.clientHeight*DPR); };
    fit();
    const layers=[{h:0.62,col:"rgba(60,80,120,.25)"},{h:0.72,col:"rgba(70,90,140,.28)"},{h:0.8,col:"rgba(90,110,160,.3)"}];
    const draw=()=>{ t+=0.004; const w=c.width,h=c.height; ctx.clearRect(0,0,w,h); layers.forEach((L,i)=>{ ctx.beginPath(); for(let x=0;x<=w;x+=10*DPR){ const y=h*L.h + Math.sin(x*0.004 + t*(1+i*0.5))* (16*DPR); if(x===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);} ctx.lineTo(w,h); ctx.lineTo(0,h); ctx.closePath(); ctx.fillStyle=L.col; ctx.fill();}); raf=requestAnimationFrame(draw)};
    draw();
    const onResize=()=>fit(); window.addEventListener("resize", onResize);
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  /* ===== 5) Animated flight path (dashed) + plane ===== */
  useEffect(() => {
    const c = pathRef.current; if (!c) return; const ctx = c.getContext("2d");
    let raf, time=0; const DPR = Math.min(2, window.devicePixelRatio || 1);
    const fit = () => { c.width = Math.floor(c.clientWidth * DPR); c.height = Math.floor(c.clientHeight * DPR); };
    fit();
    const bez = (t,a,b,c,d)=>{ const ab=a+(b-a)*t, bc=b+(c-b)*t, cd=c+(d-c)*t; const abbc=ab+(bc-ab)*t, bccd=bc+(cd-bc)*t; return abbc+(bccd-abbc)*t; };
    const draw=(ts)=>{
      time = ts || 0; const w=c.width,h=c.height; ctx.clearRect(0,0,w,h);
      ctx.lineWidth = 3*DPR; ctx.strokeStyle = "rgba(140,200,255,.85)"; ctx.setLineDash([10*DPR,14*DPR]); ctx.lineDashOffset = -(time/6);
      ctx.beginPath(); const y0=h*0.52,y1=h*0.34,y2=h*0.6,y3=h*0.45; ctx.moveTo(0,y0); ctx.bezierCurveTo(w*0.2,y1,w*0.55,y2,w*0.82,y3); ctx.stroke();
      const tNorm = (Math.sin(time/1800)+1)/2; const x=bez(tNorm,0,w*0.2,w*0.55,w*0.82); const y=bez(tNorm,y0,y1,y2,y3);
      ctx.save(); ctx.translate(x,y); ctx.rotate(Math.sin(time/900)*0.1); ctx.fillStyle="#bde3ff"; ctx.beginPath(); ctx.moveTo(14*DPR,0); ctx.lineTo(-10*DPR,6*DPR); ctx.lineTo(-6*DPR,0); ctx.lineTo(-10*DPR,-6*DPR); ctx.closePath(); ctx.fill(); ctx.restore();
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    const onResize = () => fit(); window.addEventListener("resize", onResize);
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  return (
    <div className="travelcand">
      <style>{styles}</style>

      {/* Background layers */}
      <canvas ref={skyRef} className="tc-bg"/>
      <canvas ref={cloudsRef} className="tc-bg tc-clouds"/>
      <canvas ref={globeRef} className="tc-bg tc-globe"/>
      <canvas ref={wavesRef} className="tc-bg tc-waves"/>
      <canvas ref={pathRef} className="tc-bg tc-path"/>

      {/* Hero (flat, with top padding so it doesn't stick) */}
      <header className="tc-hero">
        <div className="tc-hero-inner">
          {/* <div className="tc-badge"><FaStar/> Умное планирование • Бронирования • Поддержка</div> */}
          <h1>TravelCand — полный travel‑суперапп</h1>
          <p className="tc-sub">
            Один сервис для всего путешествия: идея → план → бронирования → развлечения → трансфер. 
            Прилетел в новую страну — сразу видишь цены, локации, парашют‑клубы, маршруты и такси из отеля.
          </p>
          <div className="tc-cta">
            <Link to="/contact" className="btn btn-primary">Стать партнёром <FaArrowRight/></Link>
            <a href="#features" className="btn btn-ghost">Что внутри?</a>
            <a href="#how" className="btn btn-ghost">Как это работает</a>
          </div>

          {/* Floating destination pins */}
          <div className="tc-pins">
            <span className="pin p1"><FaParachuteBox/></span>
            <span className="pin p2"><FaHotel/></span>
            <span className="pin p3"><FaCompass/></span>
          </div>
        </div>
      </header>

      {/* Features */}
      <section id="features" className="tc-section">
        <h2>Ключевые возможности</h2>
        <p className="tc-section-sub">Целая экосистема — всё в одном приложении.</p>
        <div className="tc-grid">
          <Card icon={<FaRoute/>} title="AI‑маршруты">Умное планирование дня по интересам, времени и бюджету. Динамические окна и оптимальный порядок точек.</Card>
          <Card icon={<FaMapMarkedAlt/>} title="Локальные активности">Парашют, серф, хайкинг, экскурсии, фестивали — с ценами, рейтингами и отзывами.</Card>
          <Card icon={<FaHotel/>} title="Бронирование">Отели/апарты, билеты, страховка. Оплата в приложении, единые чеки и возвраты.</Card>
          <Card icon={<FaTaxi/>} title="Трансфер и такси">Встреча в аэропорту, смарт‑маршрут до отеля, тарификация и трекинг поездки.</Card>
          <Card icon={<FaWallet/>} title="Кошелёк и кэшбэк">Единый кошелёк, мультивалюта, оффлайн‑квитки и кэшбэк за активности.</Card>
          <Card icon={<FaShieldAlt/>} title="Безопасность">SOS‑кнопка, шэринг геолокации, проверенные провайдеры и 24/7‑поддержка.</Card>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="tc-section">
        <h2>Как это работает</h2>
        <p className="tc-section-sub">От первого тапа — до впечатлений и фотоотчёта.</p>
        <div className="tc-steps">
          <Step n="01" title="Выбор интересов">Отмечаете, что нравится: экстремал, культура, гастро, дети, бюджет.</Step>
          <Step n="02" title="AI‑маршрут">Приложение строит маршрут: точки, цены, слоты бронирования, расстояния.</Step>
          <Step n="03" title="Бронирования">Оплачиваете отели/активности/страховку в один клик. Получаете e‑квитки.</Step>
          <Step n="04" title="Трансфер">Такси от отеля возит по отмеченным точкам по расписанию.</Step>
        </div>
      </section>

      <section className="tc-section">
        <div className="tc-cta center">
          <Link to="/contact" className="btn btn-primary">Подключить TravelCand <FaArrowRight/></Link>
        </div>
      </section>

      <footer className="tc-foot">
        <Link to="/internal" className="tc-back">← Ко всем внутренним проектам</Link>
        <div className="tc-rights">© {new Date().getFullYear()} TravelCand (внутренний проект)</div>
      </footer>
    </div>
  );
}

/* UI bits */
function Card({ icon, title, children }){
  return (
    <div className="tc-card">
      <div className="tc-ico">{icon}</div>
      <h3>{title}</h3>
      <p>{children}</p>
      <span className="tc-sheen"/>
    </div>
  );
}
function Step({ n, title, children }){
  return (
    <div className="tc-step">
      <div className="tc-step-num">{n}</div>
      <h4>{title}</h4>
      <p>{children}</p>
    </div>
  );
}

const styles = `
:root{
  --sky:#0b1022; --night:#0f1730; --cyan:#22d3ee; --blue:#60a5fa; --mint:#34d399; --violet:#8b5cf6; --text:#e9f0ff; --muted:#b6c6ff; --stroke:rgba(255,255,255,.12);
}
.travelcand{position:relative; min-height:100vh; color:var(--text); background:var(--night); overflow:hidden}
.tc-bg{position:fixed; inset:0; width:100%; height:100%; z-index:-3; display:block; pointer-events:none}
.tc-clouds{z-index:-2}
.tc-globe{z-index:-1}
.tc-waves{z-index:-1}
.tc-path{z-index:0}

/* hero (top padding so it doesn't stick) */
.tc-hero{padding:110px 16px 8px} /* ~navbar height gap */
.tc-hero-inner{max-width:1100px; margin:0 auto; text-align:center; position:relative}
.tc-badge{display:inline-flex; align-items:center; gap:.55rem; padding:.45rem .8rem; border:1px solid var(--stroke); border-radius:999px; background:rgba(255,255,255,.06); color:#dfe7ff; backdrop-filter: blur(6px)}
.tc-hero h1{margin:.8rem 0 .5rem; font-size:clamp(2.2rem, 4vw, 3.5rem); line-height:1.12; background: linear-gradient(90deg,#fff,#cfe0ff,#8de7ff); -webkit-background-clip:text; color:transparent; text-shadow:0 10px 40px rgba(100,170,255,.25)}
.tc-sub{max-width:860px; margin:0 auto; color:var(--muted)}
.tc-cta{display:flex; justify-content:center; gap:.7rem; flex-wrap:wrap; margin-top:1.1rem}
.btn{display:inline-flex; align-items:center; gap:.6rem; padding:.8rem 1.1rem; border-radius:999px; text-decoration:none; font-weight:800; transition:background .2s ease}
.btn-primary{color:#0b0f16; background:linear-gradient(135deg,#fff,var(--cyan)); border:1px solid rgba(255,255,255,.18)}
.btn-ghost{color:#dfe7ff; border:1px solid var(--stroke); background:rgba(255,255,255,.06)}

/* floating pins with bob & glow */
.tc-pins{position:absolute; inset:0; pointer-events:none}
.pin{position:absolute; font-size:18px; color:#d9f3ff; filter:drop-shadow(0 6px 16px rgba(120,200,255,.4)); animation: bob 3.6s ease-in-out infinite}
.pin.p1{left:14%; top:18%}
.pin.p2{right:18%; top:26%; animation-duration:4.2s}
.pin.p3{left:50%; top:32%; animation-duration:3.2s}
@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}

/* sections */
.tc-section{position:relative; padding: 26px 16px 12px}
.tc-section h2{text-align:center; font-size:clamp(1.6rem, 2.8vw, 2.2rem); margin-bottom:.4rem}
.tc-section-sub{text-align:center; color:var(--muted); max-width:860px; margin:0 auto 1.3rem}

/* grid cards */
.tc-grid{max-width:1100px; margin:0 auto; display:grid; gap:14px; grid-template-columns: repeat( auto-fit, minmax(240px, 1fr) )}
.tc-card{position:relative; border:1px solid var(--stroke); border-radius:18px; padding:16px; background:linear-gradient(180deg, rgba(255,255,255,.07), rgba(255,255,255,.025)); overflow:hidden; isolation:isolate; transition: transform .2s ease, box-shadow .25s ease, border-color .25s ease, filter .2s ease}
.tc-card:hover{box-shadow:0 30px 80px rgba(0,0,0,.55), inset 0 0 0 1px rgba(255,255,255,.06); border-color: rgba(255,255,255,.25); filter: saturate(1.05)}
.tc-ico{font-size:1.35rem; color:#e9ecff}
.tc-card h3{margin:.35rem 0 .15rem; font-size:1.06rem}
.tc-card p{color:#dfe7ff}
.tc-sheen{content:""; position:absolute; inset:-40% -20%; transform: translateX(-60%); background: linear-gradient(110deg, transparent 20%, rgba(255,255,255,.16) 46%, transparent 56%); filter: blur(6px); transition: transform .85s ease; z-index:0}
.tc-card:hover .tc-sheen{ transform: translateX(24%) }

/* steps */
.tc-steps{max-width:1050px; margin:0 auto; display:grid; gap:12px; grid-template-columns: repeat( auto-fit, minmax(230px, 1fr) )}
.tc-step{border:1px solid var(--stroke); border-radius:16px; padding:16px; background:linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02)); box-shadow: 0 10px 30px rgba(5,10,20,.3)}
.tc-step-num{font-weight:800; color:#9fb1ff; opacity:.9; font-size:.95rem}
.tc-step h4{margin:.2rem 0 .15rem; font-size:1.02rem}
.tc-step p{color:var(--muted)}

/* footer */
.tc-foot{max-width:1100px; margin: 10px auto 80px; padding: 0 16px; display:flex; justify-content:space-between; align-items:center; color:#cfe1ff; flex-wrap:wrap; gap:10px}
.tc-back{color:#dff2ff; text-decoration:none; border-bottom:1px dashed rgba(255,255,255,.2)}
.tc-rights{opacity:.85}

@media (max-width: 780px){ .tc-hero{padding-top:120px} }
`;
