// File: src/pages/CryptoBank.jsx
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
    FaCoins,
    FaExchangeAlt,
    FaLock,
    FaShieldAlt,
    FaWallet,
    FaUsers,
    FaChartLine,
    FaGlobe,
    FaArrowRight,
    FaChartPie,
    FaRocket,
    FaCreditCard,
} from "react-icons/fa";

/**
 * FinTech / CryptoBank page
 * - Animated network background (nodes + links)
 * - Flowing gradient ribbons
 * - 3D-tilt cards
 * - Parallax scene (cursor)
 *
 * No external libs: only react, react-router-dom, react-icons
 */
export default function CryptoBank() {
    const netRef = useRef(null);
    const flowRef = useRef(null);
    const sceneRef = useRef(null);

    /* ===== 1) Animated network (blockchain vibe) ===== */
    useEffect(() => {
        const c = netRef.current; if (!c) return;
        const ctx = c.getContext("2d");
        let raf; const DPR = Math.min(2, window.devicePixelRatio || 1);
        const fit = () => { c.width = Math.floor(c.clientWidth * DPR); c.height = Math.floor(c.clientHeight * DPR); };
        fit();

        const N = 110; // nodes
        const nodes = Array.from({ length: N }).map(() => ({
            x: Math.random() * c.width,
            y: Math.random() * c.height,
            vx: (Math.random() - 0.5) * 0.45 * DPR,
            vy: (Math.random() - 0.5) * 0.45 * DPR,
            r: (Math.random() * 1.2 + 0.6) * DPR,
        }));

        const draw = () => {
            // bg grid-ish gradient
            const g = ctx.createLinearGradient(0, 0, c.width, c.height);
            g.addColorStop(0, "#070a0f"); g.addColorStop(1, "#0d111a");
            ctx.fillStyle = g; ctx.fillRect(0, 0, c.width, c.height);

            // links
            for (let i = 0; i < nodes.length; i++) {
                const a = nodes[i]; a.x += a.vx; a.y += a.vy;
                if (a.x < 0 || a.x > c.width) a.vx *= -1;
                if (a.y < 0 || a.y > c.height) a.vy *= -1;
                for (let j = i + 1; j < nodes.length; j++) {
                    const b = nodes[j];
                    const dx = a.x - b.x, dy = a.y - b.y;
                    const d2 = dx * dx + dy * dy;
                    if (d2 < 16000 * DPR) {
                        const alpha = 0.22 - (d2 / (16000 * DPR)) * 0.22;
                        ctx.strokeStyle = `rgba(120, 200, 255, ${alpha})`;
                        ctx.lineWidth = 1 * DPR;
                        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
                    }
                }
            }

            // nodes
            nodes.forEach(n => {
                ctx.beginPath();
                ctx.fillStyle = "#e8f2ff";
                ctx.globalAlpha = 0.9;
                ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1;

            raf = requestAnimationFrame(draw);
        };
        draw();

        const onResize = () => fit();
        window.addEventListener("resize", onResize);
        return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
    }, []);

    /* ===== 2) Flowing gradient ribbons (brand energy) ===== */
    useEffect(() => {
        const c = flowRef.current; if (!c) return;
        const ctx = c.getContext("2d");
        let raf; let t = 0; const DPR = Math.min(2, window.devicePixelRatio || 1);
        const fit = () => { c.width = Math.floor(c.clientWidth * DPR); c.height = Math.floor(c.clientHeight * DPR); };
        fit();

        const draw = () => {
            t += 0.004;
            const w = c.width, h = c.height; ctx.clearRect(0, 0, w, h);
            const waves = [
                { hue: 195, amp: 36, y: h * 0.18, alpha: 0.15 },
                { hue: 250, amp: 28, y: h * 0.28, alpha: 0.12 },
                { hue: 160, amp: 24, y: h * 0.4, alpha: 0.10 },
            ];
            waves.forEach((W, i) => {
                ctx.beginPath();
                for (let x = 0; x <= w; x += 8 * DPR) {
                    const y = W.y + Math.sin(x * 0.004 + t * (1 + i * 0.5)) * (W.amp * DPR);
                    if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
                }
                ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath();
                ctx.fillStyle = `hsla(${W.hue},90%,60%,${W.alpha})`;
                ctx.fill();
            });
            raf = requestAnimationFrame(draw);
        };
        draw();

        const onResize = () => fit();
        window.addEventListener("resize", onResize);
        return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
    }, []);

    /* ===== 3) Parallax (cursor) ===== */
    useEffect(() => {
        const scene = sceneRef.current; if (!scene) return;
        const onMove = (e) => {
            const r = scene.getBoundingClientRect();
            const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
            const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
            scene.style.setProperty("--tiltX", `${(-dy * 6).toFixed(2)}deg`);
            scene.style.setProperty("--tiltY", `${(dx * 8).toFixed(2)}deg`);
            scene.style.setProperty("--parX", `${(dx * 20).toFixed(2)}px`);
            scene.style.setProperty("--parY", `${(dy * 20).toFixed(2)}px`);
        };
        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
    }, []);

    /* ===== 4) Card tilt ===== */
    useEffect(() => {
        const els = Array.from(document.querySelectorAll(".cb-card, .cb-step, .cb-benefit"));
        const maxT = 8;
        const onMove = (el, e) => {
            const r = el.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width;
            const py = (e.clientY - r.top) / r.height;
            const rx = (py - 0.5) * -maxT; const ry = (px - 0.5) * maxT;
            el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
        };
        const cleanups = els.map(el => {
            const enter = () => el.classList.add("tilting");
            const leave = () => { el.classList.remove("tilting"); el.style.transform = ""; };
            const move = (e) => onMove(el, e);
            el.addEventListener("pointerenter", enter);
            el.addEventListener("pointerleave", leave);
            el.addEventListener("pointermove", move);
            return () => { el.removeEventListener("pointerenter", enter); el.removeEventListener("pointerleave", leave); el.removeEventListener("pointermove", move); };
        });
        return () => cleanups.forEach(fn => fn());
    }, []);

    return (
        <div className="cryptobank" ref={sceneRef}>
            <style>{styles}</style>

            {/* Background layers */}
            <canvas ref={netRef} className="cb-bg" />
            <canvas ref={flowRef} className="cb-bg cb-flow" />

            {/* Breadcrumbs */}
            <nav className="cb-crumbs">
                <Link to="/internal" className="cb-crumb">Внутренние проекты</Link>
                <span className="cb-sep">/</span>
                <span className="cb-crumb active">FinTech • CryptoBank</span>
            </nav>

            {/* Hero */}
            <header className="cb-hero">
                <div className="cb-hero-inner">
                    <div className="cb-badge">
                        <FaWallet /> Платёжная экосистема • Кастодиальные и некастодиальные кошельки
                    </div>
                    <h1>
                        CryptoBank — полный крипто‑банк
                        <span> токен, P2P, обмен, on/off‑ramp, карты</span>
                    </h1>
                    <p className="cb-sub">
                        Мы строим инфраструктуру для крипто‑платежей: кошельки, обмен, P2P-переводы,
                        мерчант‑эквайринг, мультисетевые переводы и SDK для интеграции. Приватность,
                        безопасность и комплаенс — с первого дня.
                    </p>
                    <div className="cb-cta">
                        <Link to="/contact" className="btn btn-primary">Инвестировать <FaArrowRight /></Link>
                        <a href="#features" className="btn btn-ghost">Что внутри?</a>
                        <a href="#token" className="btn btn-ghost">Tokenomics</a>
                        <a href="#roadmap" className="btn btn-ghost">Roadmap</a>
                    </div>

                    {/* Floating chips */}
                    <div className="cb-floaters">
                        <span className="chip">Own Token</span>
                        <span className="chip">P2P</span>
                        <span className="chip">DEX/CEX</span>
                        <span className="chip">KYC/AML</span>
                        <span className="chip">Cards</span>
                    </div>
                </div>
            </header>

            {/* Features */}
            <section id="features" className="cb-section">
                <h2>Ключевые возможности</h2>
                <p className="cb-section-sub">Всё, что нужно крипто‑банку: от кошельков до карт и мерчант‑эквайринга.</p>
                <div className="cb-grid">
                    <Card icon={<FaWallet />} title="Кошельки (custodial/non‑custodial)"
                        desc="Мультичейн, MPC/мультисиг, адрес‑буки, восстановление ключей, лимиты и политика." />
                    <Card icon={<FaExchangeAlt />} title="Обмен и ликвидность"
                        desc="Интеграция с DEX/CEX, агрегатор курсов, лимит/маркет ордера, быстрая конвертация." />
                    <Card icon={<FaUsers />} title="P2P и мерчант‑платежи"
                        desc="Юзер‑to‑юзер переводы, инвойсы, Link‑платежи, магазины и плагины CMS/CRM." />
                    <Card icon={<FaCreditCard />} title="Карты и on/off‑ramp"
                        desc="Виртуальные и физические карты, выпуски через партнёров, SEPA/SWIFT/UZ." />
                    <Card icon={<FaLock />} title="Безопасность"
                        desc="Аппаратные HSM, мониторинг аномалий, анти‑фрод, багбаунти, бэкапы и SSO." />
                    <Card icon={<FaShieldAlt />} title="KYC/AML & комплаенс"
                        desc="KYC, KYB, санкционные списки, travel rule, отчётность и регулируемые правила." />
                </div>
            </section>

            {/* How it works */}
            <section className="cb-section">
                <h2>Как это работает</h2>
                <p className="cb-section-sub">Мобильные приложения + веб‑панель, API/SDK для интеграций и аналитика в реальном времени.</p>
                <div className="cb-steps">
                    <Step n="01" title="Онбординг и верификация">KYC/KYB, санк‑скрининг, настройка лимитов, создание кошелька.</Step>
                    <Step n="02" title="Операции">Пополнение, конвертация, P2P, приём платежей, переводы между сетями.</Step>
                    <Step n="03" title="Токен и стейкинг">Собственный токен, пул ликвидности, стейкинг/фарминг, кэшбэк‑механики.</Step>
                    <Step n="04" title="Отчётность и аналитика">Дэшборды: DAU/WAU/MAU, GTV, LTV, фрод‑алерты, экспорт для аудита.</Step>
                </div>
            </section>

            {/* Tokenomics */}
            <section id="token" className="cb-section">
                <h2>Tokenomics</h2>
                <p className="cb-section-sub">Черновая разбивка — значения плейсхолдеры, поменяем под финмодель.</p>
                <div className="cb-token">
                    <div className="cb-token-left cb-card">
                        <ul className="token-list">
                            <li><b>Total Supply:</b> 1,000,000,000 CBK</li>
                            <li><b>Liquidity & MM:</b> 25%</li>
                            <li><b>Treasury:</b> 20%</li>
                            <li><b>Team & Advisors (4y vest):</b> 18%</li>
                            <li><b>Ecosystem Rewards:</b> 20%</li>
                            <li><b>Private/Seed:</b> 12%</li>
                            <li><b>Public:</b> 5%</li>
                        </ul>
                        <div className="token-note">Utility: комиссии, скидки, кэшбэк по картам, приоритет в очереди, стейкинг.</div>
                    </div>
                    <div className="cb-token-right cb-card">
                        <div className="donut">
                            <div className="slice s1" /><div className="slice s2" /><div className="slice s3" />
                            <div className="slice s4" /><div className="slice s5" /><div className="slice s6" />
                            <div className="inner"><FaChartPie /></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why for business */}
            <section className="cb-section">
                <h2>Для партнёров и бизнеса</h2>
                <p className="cb-section-sub">Белая метка, API/SDK, SLA‑поддержка, отчётность и гибкая тарифная политика.</p>
                <div className="cb-benefits">
                    <Benefit icon={<FaGlobe />} title="White‑label & SDK">Быстрый запуск под вашим брендом: мобильные приложения, веб‑панель, виджеты, плагины.</Benefit>
                    <Benefit icon={<FaChartLine />} title="Экономика">Комиссии, кросс‑маржинальность, партнёрские программы и реферальные вознаграждения.</Benefit>
                    <Benefit icon={<FaShieldAlt />} title="Контроль рисков">Лимиты, скоринг, AML‑мониторинг, алерты, ручные проверки и экспорт в AML‑провайдеров.</Benefit>
                </div>
                <div className="cb-cta center">
                    <Link to="/contact" className="btn btn-primary">Обсудить интеграцию <FaArrowRight /></Link>
                </div>
            </section>

            {/* Roadmap */}
            <section id="roadmap" className="cb-section">
                <h2>Roadmap</h2>
                <div className="cb-road">
                    <Milestone title="Q3–Q4 • MVP" icon={<FaRocket />}>
                        Кошелёк, P2P, обмен, онбординг KYC, базовая аналитика, пилот по картам через партнёров.
                    </Milestone>
                    <Milestone title="Q1 • Beta (multi‑region)">
                        On/Off‑ramp, мерчант‑платежи, white‑label SDK, расширенная AML/риски.
                    </Milestone>
                    <Milestone title="Q2 • Scale">
                        Ликвидность, стейкинг, токен‑экономика, карты на нескольких рынках, партнёрские банки.
                    </Milestone>
                </div>
            </section>

            {/* Footer */}
            <footer className="cb-foot">
                <Link to="/internal" className="cb-back">← Ко всем внутренним проектам</Link>
                <div className="cb-rights">© {new Date().getFullYear()} CryptoBank (внутренний проект)</div>
            </footer>
        </div>
    );
}

/* UI bits */
function Card({ icon, title, desc }) {
    return (
        <div className="cb-card">
            <div className="cb-ico">{icon}</div>
            <h3>{title}</h3>
            <p>{desc}</p>
            <span className="cb-sheen" />
        </div>
    );
}
function Step({ n, title, children }) {
    return (
        <div className="cb-step">
            <div className="cb-step-num">{n}</div>
            <h4>{title}</h4>
            <p>{children}</p>
        </div>
    );
}
function Benefit({ icon, title, children }) {
    return (
        <div className="cb-benefit">
            <div className="cb-bico">{icon}</div>
            <div>
                <h4>{title}</h4>
                <p>{children}</p>
            </div>
        </div>
    );
}
function Milestone({ title, children, icon }) {
    return (
        <div className="cb-ms cb-card">
            <div className="cb-ms-head">
                <div className="cb-ms-ico">{icon || <FaRocket />}</div>
                <h4>{title}</h4>
            </div>
            <p>{children}</p>
        </div>
    );
}

const styles = `
:root{
  --blue:#60a5fa; --cyan:#22d3ee; --mint:#34d399; --violet:#8b5cf6; --pink:#ec4899;
  --text:#e9f0ff; --muted:#b6c6ff; --stroke:rgba(255,255,255,.12);
}
.cryptobank{position:relative; min-height:100vh; color:var(--text); background:#0a0f17; overflow:hidden;
  perspective: 1000px; transform-style: preserve-3d; --tiltX:0deg; --tiltY:0deg; --parX:0px; --parY:0px;
}
.cb-bg{position:fixed; inset:0; width:100%; height:100%; z-index:-3; display:block; pointer-events:none}
.cb-flow{z-index:-2; mix-blend-mode:screen; transform: translate3d(var(--parX),var(--parY),0)}

/* crumbs */
.cb-crumbs{max-width:1100px; margin:86px auto 10px; padding:0 16px; display:flex; align-items:center; gap:8px; color:#d9e6ff}
.cb-crumb{color:#d9e6ff; text-decoration:none}
.cb-crumb.active{color:#fff}
.cb-sep{opacity:.6}

/* hero */
.cb-hero{
  padding:10px 16px 8px;
  transform: none;              
  transform-style: flat;       
}
.cb-hero-inner{max-width:1100px; margin:0 auto; text-align:center; position:relative}
.cb-hero-inner::after{
  content:""; position:absolute; inset:-60px -30px auto -30px; height:220px; z-index:-1;
  background: radial-gradient(60% 120% at 50% 0%, rgba(96,165,250,.35), rgba(34,211,238,.1) 60%, transparent 70%);
  filter: blur(18px); transform: translateZ(-60px);
}
.cb-badge{display:inline-flex; align-items:center; gap:.55rem; padding:.45rem .8rem; border:1px solid var(--stroke); border-radius:999px; background:rgba(255,255,255,.06); color:#dfe7ff; backdrop-filter: blur(6px)}
.cb-hero h1{margin:.8rem 0 .5rem; font-size:clamp(2.1rem, 4vw, 3.3rem); line-height:1.12; background: linear-gradient(90deg,#fff,#cfe0ff,#8de7ff); -webkit-background-clip:text; color:transparent}
.cb-hero h1 span{filter: drop-shadow(0 12px 40px rgba(96,165,250,.28))}
.cb-sub{max-width:860px; margin:0 auto; color:var(--muted)}
.cb-cta{display:flex; justify-content:center; gap:.7rem; flex-wrap:wrap; margin-top:1.1rem}
.btn{display:inline-flex; align-items:center; gap:.6rem; padding:.8rem 1.1rem; border-radius:999px; text-decoration:none; font-weight:800; transition:transform .2s ease, box-shadow .2s ease, filter .2s ease}
.btn-primary{color:#0b0f16; background:linear-gradient(135deg,#fff,var(--cyan)); border:1px solid rgba(255,255,255,.18); box-shadow:0 16px 44px rgba(34,211,238,.35)}
.btn-ghost{color:#dfe7ff; border:1px solid var(--stroke); background:rgba(255,255,255,.06)}
.btn:hover{transform: translateY(-2px); filter:saturate(1.05)}

/* floaters */
.cb-floaters{position:relative; display:flex; gap:10px; justify-content:center; margin-top:16px; transform-style:preserve-3d}
.cb-floaters .chip{font-weight:700; font-size:.8rem; color:#071019; padding:.45rem .7rem; border-radius:999px;
  background: linear-gradient(135deg, #9bd2ff, #67e8f9); box-shadow: 0 14px 40px rgba(103,232,249,.28); transform: translateZ(60px)}
.cb-floaters .chip:nth-child(2){ transform: translateZ(85px) translateX(6px)}
.cb-floaters .chip:nth-child(3){ transform: translateZ(105px) translateX(-4px)}

/* sections */
.cb-section{position:relative; padding: 24px 16px 10px}
.cb-section h2{text-align:center; font-size:clamp(1.6rem, 2.8vw, 2.2rem); margin-bottom:.4rem}
.cb-section-sub{text-align:center; color:var(--muted); max-width:860px; margin:0 auto 1.3rem}

/* grid cards */
.cb-grid{max-width:1100px; margin:0 auto; display:grid; gap:14px; grid-template-columns: repeat( auto-fit, minmax(240px, 1fr) )}
.cb-card{position:relative; border:1px solid var(--stroke); border-radius:18px; padding:16px; background:linear-gradient(180deg, rgba(255,255,255,.07), rgba(255,255,255,.025)); overflow:hidden; isolation:isolate; transition: transform .2s ease, box-shadow .25s ease, border-color .25s ease, filter .2s ease; transform-style: preserve-3d; will-change: transform;}
.cb-card:hover{box-shadow:0 30px 80px rgba(0,0,0,.55), inset 0 0 0 1px rgba(255,255,255,.06); border-color: rgba(255,255,255,.25); filter: saturate(1.05)}
.cb-ico{font-size:1.35rem; color:#e9ecff; transform: translateZ(22px)}
.cb-card h3{margin:.35rem 0 .15rem; font-size:1.06rem; transform: translateZ(18px)}
.cb-card p{color:#dfe7ff; transform: translateZ(14px)}
.cb-sheen{content:""; position:absolute; inset:-40% -20%; transform: translateX(-60%); background: linear-gradient(110deg, transparent 20%, rgba(255,255,255,.16) 46%, transparent 56%); filter: blur(6px); transition: transform .85s ease; z-index:0}
.cb-card:hover .cb-sheen{ transform: translateX(24%) }

/* steps */
.cb-steps{max-width:1050px; margin:0 auto; display:grid; gap:12px; grid-template-columns: repeat( auto-fit, minmax(230px, 1fr) )}
.cb-step{border:1px solid var(--stroke); border-radius:16px; padding:16px; background:linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02)); box-shadow: 0 10px 30px rgba(5,10,20,.3); transform-style: preserve-3d}
.cb-step-num{font-weight:800; color:#9fb1ff; opacity:.9; font-size:.95rem}
.cb-step h4{margin:.2rem 0 .15rem; font-size:1.02rem}
.cb-step p{color:var(--muted)}

/* benefits */
.cb-benefits{max-width:1000px; margin:0 auto; display:grid; gap:12px; grid-template-columns: repeat( auto-fit, minmax(260px, 1fr) )}
.cb-benefit{display:flex; gap:.7rem; align-items:flex-start; border:1px solid var(--stroke); border-radius:16px; padding:16px; background:linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02)); transform-style: preserve-3d; box-shadow: 0 10px 30px rgba(5,10,20,.28)}
.cb-bico{width:36px; height:36px; display:grid; place-items:center; border-radius:10px; background:linear-gradient(135deg, var(--blue), var(--cyan)); color:#0b0f16; transform: translateZ(18px)}

/* tokenomics */
.cb-token{max-width:1100px; margin:0 auto; display:grid; gap:14px; grid-template-columns: repeat( auto-fit, minmax(260px, 1fr) )}
.token-list{list-style:none; padding:0; margin:0; display:grid; gap:8px}
.token-list li{background:rgba(255,255,255,.04); border:1px solid var(--stroke); padding:10px; border-radius:12px}
.token-note{margin-top:10px; color:var(--muted)}
.donut{position:relative; width:240px; height:240px; margin:0 auto}
.donut .slice{position:absolute; inset:0; border-radius:50%; mask:radial-gradient(circle at center, transparent 52%, #000 52%)}
.donut .s1{background:conic-gradient(var(--cyan) 0 90deg, transparent 90deg 360deg)}
.donut .s2{background:conic-gradient(var(--mint) 0 72deg, transparent 72deg 360deg); transform: rotate(90deg)}
.donut .s3{background:conic-gradient(var(--violet) 0 65deg, transparent 65deg 360deg); transform: rotate(162deg)}
.donut .s4{background:conic-gradient(#7dd3fc 0 50deg, transparent 50deg 360deg); transform: rotate(227deg)}
.donut .s5{background:conic-gradient(#f9a8d4 0 43deg, transparent 43deg 360deg); transform: rotate(277deg)}
.donut .s6{background:conic-gradient(#93c5fd 0 40deg, transparent 40deg 360deg); transform: rotate(320deg)}
.donut .inner{position:absolute; inset:26% 26%; border-radius:50%; display:grid; place-items:center; background:rgba(10,15,23,.7); border:1px solid var(--stroke); color:#cfe6ff}

/* roadmap */
.cb-road{max-width:1100px; margin:0 auto; display:grid; gap:14px; grid-template-columns: repeat( auto-fit, minmax(280px, 1fr) )}
.cb-ms-head{display:flex; align-items:center; gap:.6rem; margin-bottom:.3rem}
.cb-ms-ico{width:32px; height:32px; display:grid; place-items:center; border-radius:10px; background:linear-gradient(135deg,var(--blue),var(--violet)); color:#0b0f16}

/* footer */
.cb-foot{max-width:1100px; margin: 8px auto 80px; padding: 0 16px; display:flex; justify-content:space-between; align-items:center; color:#cfe1ff; flex-wrap:wrap; gap:10px}
.cb-back{color:#dff2ff; text-decoration:none; border-bottom:1px dashed rgba(255,255,255,.2)}
.cb-rights{opacity:.85}

@media (max-width: 780px){ .cb-crumbs{margin-top:96px} }
`;
