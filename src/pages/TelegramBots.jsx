import React, { useEffect, useRef, useState } from "react";
import {
  FaPaperPlane, FaBolt, FaCartPlus, FaBell, FaIdBadge,
  FaUsers, FaCopy, FaExternalLinkAlt, FaCheck
} from "react-icons/fa";

const BOTS = [
  {
    handle: "unicorn_go_bot",
    title: "Unicorn GO",
    desc: "EdTech ассистент: курсы, оплаты, уведомления, CRM-аналитика.",
    tags: ["Mini App", "Payments", "Auth", "Notifications"],
    theme: "violet",
  },
  {
    handle: "UzAvtoSavdo_bot",
    title: "UzAvtoSavdo",
    desc: "Авто-маркетплейс: поиск, подбор, объявления, алёрты по цене.",
    tags: ["Catalog", "Search", "Alerts", "Leads"],
    theme: "cyan",
  },
  {
    handle: "CenterKrep_bot",
    title: "CenterKrep",
    desc: "B2B заказ: каталог, прайс, быстрый заказ и статус доставки.",
    tags: ["B2B", "Orders", "CRM", "Invoice"],
    theme: "pink",
  },
  {
    handle: "trydarkside_bot",
    title: "DarkSide",
    desc: "Комьюнити/промо: промокоды, розыгрыши, рассылки и анкеты.",
    tags: ["Promo", "Giveaways", "Broadcast", "Forms"],
    theme: "lime",
  },
];

export default function TelegramBots() {
  const canvasRef = useRef(null);
  const [toast, setToast] = useState("");

  // ===== Infinite animated background (stars + soft orbs) =====
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    let raf;

    const DPR = Math.min(2, window.devicePixelRatio || 1);
    const resize = () => {
      c.width = Math.floor(c.clientWidth * DPR);
      c.height = Math.floor(c.clientHeight * DPR);
    };
    resize();

    // stars
    const N = 180;
    const stars = Array.from({ length: N }).map(() => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      r: (Math.random() * 1.4 + 0.4) * DPR,
      vx: (Math.random() - 0.5) * 0.25 * DPR,
      vy: (Math.random() - 0.5) * 0.25 * DPR,
      a: Math.random() * Math.PI * 2,
    }));

    // soft orbs
    const orbs = Array.from({ length: 3 }).map((_, i) => ({
      x: (0.2 + 0.32 * i) * c.width,
      y: (0.25 + 0.28 * i) * c.height,
      r: (220 + 90 * i) * DPR,
      t: Math.random() * 1000,
      hue: 220 + i * 60,
    }));

    const draw = () => {
      const g = ctx.createLinearGradient(0, 0, c.width, c.height);
      g.addColorStop(0, "#0a0b12");
      g.addColorStop(1, "#0b0f1c");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, c.width, c.height);

      orbs.forEach((o, i) => {
        o.t += 0.003;
        const ox = o.x + Math.cos(o.t + i) * 40 * DPR;
        const oy = o.y + Math.sin(o.t * 0.8 + i) * 36 * DPR;
        const rg = ctx.createRadialGradient(ox, oy, 0, ox, oy, o.r);
        rg.addColorStop(0, `hsla(${o.hue},90%,60%,.18)`);
        rg.addColorStop(1, "transparent");
        ctx.fillStyle = rg;
        ctx.beginPath(); ctx.arc(ox, oy, o.r, 0, Math.PI * 2); ctx.fill();
      });

      ctx.fillStyle = "rgba(255,255,255,.9)";
      stars.forEach((s) => {
        s.x += s.vx; s.y += s.vy; s.a += 0.03;
        if (s.x < 0) s.x = c.width; if (s.x > c.width) s.x = 0;
        if (s.y < 0) s.y = c.height; if (s.y > c.height) s.y = 0;
        ctx.globalAlpha = 0.55 + Math.sin(s.a) * 0.45;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
      });
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  // ===== Tilt + glow follow mouse =====
  useEffect(() => {
    const cards = document.querySelectorAll(".tb-card");
    function handleMove(e, el) {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const px = (x / r.width) * 2 - 1;
      const py = (y / r.height) * 2 - 1;
      el.style.setProperty("--rx", `${(-py * 6).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${(px * 8).toFixed(2)}deg`);
      el.style.setProperty("--gx", `${50 + px * 30}%`);
      el.style.setProperty("--gy", `${50 + py * 30}%`);
    }
    cards.forEach((el) => {
      const move = (e) => handleMove(e, el);
      const leave = () => {
        el.style.setProperty("--rx", `0deg`);
        el.style.setProperty("--ry", `0deg`);
        el.style.setProperty("--gx", `50%`);
        el.style.setProperty("--gy", `50%`);
      };
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
    });
    return () => {
      cards.forEach((el) => el.replaceWith(el.cloneNode(true)));
    };
  }, []);

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setToast("Скопировано: " + text);
      setTimeout(() => setToast(""), 1500);
    } catch {}
  };

  return (
    <div className="tb-page">
      <style>{styles}</style>
      <canvas ref={canvasRef} className="tb-bg" />

      <header className="tb-hero">
        <div className="tb-badge">
          <FaPaperPlane /> Telegram-боты
        </div>
        <h1>Наши Telegram-боты</h1>
        <p>Mini App’lar, оплатa, CRM, рассылка — bir ekotizimda.</p>
      </header>

      <section className="tb-grid">
        {BOTS.map((b) => (
          <article key={b.handle} className={`tb-card theme-${b.theme}`}>
            <div className="tb-ring" />
            <div className="tb-left">
              <div className="tb-ico"><FaPaperPlane /></div>
              <div className="tb-pulse" />
            </div>

            <div className="tb-body">
              <div className="tb-top">
                <h3>{b.title}</h3>
                <span className="tb-dot" />
              </div>

              <button
                className="tb-handle"
                onClick={() => copy("@" + b.handle)}
                title="Скопировать @username"
              >
                @{b.handle} <FaCopy />
              </button>

              <p className="tb-desc">{b.desc}</p>

              <div className="tb-tags">
                <span><FaBolt /> {b.tags[0]}</span>
                <span><FaCartPlus /> {b.tags[1]}</span>
                <span><FaBell /> {b.tags[2]}</span>
                <span><FaIdBadge /> {b.tags[3]}</span>
              </div>
            </div>

            <div className="tb-cta">
              <a
                className="btn"
                href={`https://t.me/${b.handle}`}
                target="_blank"
                rel="noreferrer"
                title="Открыть бота"
              >
                Открыть <FaExternalLinkAlt />
              </a>
              <a
                className="btn ghost"
                href={`https://t.me/${b.handle}?startgroup=true`}
                target="_blank"
                rel="noreferrer"
                title="Добавить в группу"
              >
                В группу <FaUsers />
              </a>
            </div>
          </article>
        ))}
      </section>

      {toast && (
        <div className="tb-toast"><FaCheck /> {toast}</div>
      )}
    </div>
  );
}

/* ---------- Styles ---------- */
const styles = `
:root{
  --text:#e8ecff;
  --muted:#aeb8df;
  --stroke: rgba(255,255,255,.14);
}
.tb-page{ position:relative; min-height:100vh; color:var(--text); overflow:hidden; }
.tb-bg{ position:fixed; inset:0; width:100%; height:100%; z-index:-1; display:block; }

/* HERO */
.tb-hero{ text-align:center; padding: 128px 16px 14px; }
.tb-badge{
  display:inline-flex; gap:.5rem; align-items:center; font-weight:700; color:#dfe7ff;
  padding:.45rem .8rem; border-radius:999px; border:1px solid rgba(255,255,255,.12);
  background: radial-gradient(100% 100% at 50% 50%, rgba(139,92,246,.22), rgba(34,211,238,.18));
}
.tb-hero h1{
  margin:.6rem 0 .35rem; font-size:clamp(2.2rem,4.6vw,3.4rem);
  background: linear-gradient(90deg,#fff,#cfe0ff,#8de9ff);
  -webkit-background-clip:text; background-clip:text; color:transparent;
  filter: drop-shadow(0 12px 36px rgba(139,92,246,.26));
}
.tb-hero p{ color:var(--muted) }

/* GRID */
.tb-grid{
  max-width: 1160px; margin: 10px auto 96px; padding: 0 16px;
  display:grid; gap:16px; grid-template-columns: repeat(2, minmax(320px,1fr));
}
@media (max-width: 820px){ .tb-grid{ grid-template-columns: 1fr; } }

/* CARD */
.tb-card{
  position:relative; display:grid; grid-template-columns: 84px 1fr auto; align-items:center; gap:16px;
  min-height: 132px; border-radius:18px; padding:18px;
  background: linear-gradient(180deg, rgba(255,255,255,.07), rgba(255,255,255,.03));
  border:1px solid var(--stroke); overflow:hidden; isolation:isolate;
  transform-style: preserve-3d; --rx:0deg; --ry:0deg;
  box-shadow: 0 22px 60px rgba(0,0,0,.48);
  transition: transform .25s cubic-bezier(.2,.7,.2,1), box-shadow .25s, border-color .25s;
}
.tb-card:hover{ transform: translateY(-6px) rotateX(var(--rx)) rotateY(var(--ry)); box-shadow: 0 30px 90px rgba(0,0,0,.58); border-color: rgba(255,255,255,.22); }
.tb-ring{
  content:""; position:absolute; inset:-1px; border-radius:20px; z-index:-1; filter:blur(14px); opacity:.6;
  background:
    radial-gradient(380px 220px at var(--gx,50%) var(--gy,50%), var(--glow1), transparent 70%),
    radial-gradient(420px 260px at 120% 140%, var(--glow2), transparent 70%);
}

/* LEFT icon */
.tb-left{ position:relative; width:84px; height:84px; }
.tb-ico{
  width:84px; height:84px; display:grid; place-items:center; border-radius:18px; font-size:28px; color:#0b0d14;
  background: var(--grad); border:1px solid rgba(255,255,255,.22); box-shadow:0 18px 46px var(--shadow);
}
.tb-pulse{
  position:absolute; inset:-4px; border-radius:22px; border:1px dashed rgba(255,255,255,.35);
  animation:spin 8s linear infinite; opacity:.7;
}
@keyframes spin{ to{ transform: rotate(360deg) } }

/* BODY */
.tb-top{ display:flex; align-items:center; justify-content:space-between; }
.tb-top h3{ margin:0 0 4px; font-size:1.18rem; }
.tb-dot{ width:10px; height:10px; border-radius:999px; background: var(--dot); box-shadow:0 0 16px var(--dot); }
.tb-handle{
  display:inline-flex; gap:.35rem; align-items:center; border:none; background:transparent; color:#dfe7ff;
  padding:0; font-weight:700; cursor:pointer; opacity:.95;
}
.tb-handle svg{ font-size:.9rem; opacity:.85 }
.tb-handle:hover{ text-decoration:underline; }
.tb-desc{ margin:.25rem 0; color:#d8e6ff; opacity:.96 }
.tb-tags{ display:flex; flex-wrap:wrap; gap:.35rem; }
.tb-tags span{
  display:inline-flex; align-items:center; gap:.35rem; font-size:.88rem; color:#eaf3ff;
  padding:.28rem .55rem; border-radius:999px; border:1px solid rgba(255,255,255,.16); background: rgba(255,255,255,.07);
}

/* CTA */
.tb-cta{ display:flex; flex-direction:column; gap:.45rem; }
.btn{
  display:inline-flex; align-items:center; gap:.5rem; white-space:nowrap;
  padding:.65rem .9rem; border-radius:999px; font-weight:800; color:#0b0d14;
  background: var(--grad); border:1px solid rgba(255,255,255,.22); box-shadow: 0 14px 40px var(--shadow);
  transition: transform .2s ease, filter .2s ease;
}
.btn:hover{ transform: translateX(2px); }
.btn.ghost{
  background: rgba(255,255,255,.07); color:#e8ecff; box-shadow: none; border:1px solid rgba(255,255,255,.18);
}

/* THEMES */
.theme-violet{ --grad: linear-gradient(135deg,#a78bfa,#22d3ee); --shadow: rgba(139,92,246,.38); --dot:#b9a5ff; --glow1: rgba(167,139,250,.35); --glow2: rgba(34,211,238,.28); }
.theme-cyan  { --grad: linear-gradient(135deg,#22d3ee,#60a5fa); --shadow: rgba(34,211,238,.38);  --dot:#9be8ff; --glow1: rgba(34,211,238,.32);  --glow2: rgba(96,165,250,.28); }
.theme-pink  { --grad: linear-gradient(135deg,#f472b6,#a78bfa); --shadow: rgba(244,114,182,.38); --dot:#ffb3da; --glow1: rgba(244,114,182,.34); --glow2: rgba(167,139,250,.26); }
.theme-lime  { --grad: linear-gradient(135deg,#34d399,#a7f3d0); --shadow: rgba(52,211,153,.38);  --dot:#b7ffd9; --glow1: rgba(52,211,153,.34);  --glow2: rgba(167,243,208,.26); }

/* TOAST */
.tb-toast{
  position: fixed; left: 50%; bottom: 28px; transform: translateX(-50%);
  display:inline-flex; gap:.6rem; align-items:center; padding:.6rem .9rem; border-radius:12px;
  background: rgba(0,0,0,.55); border:1px solid rgba(255,255,255,.14); color:#e8ecff;
  box-shadow: 0 20px 60px rgba(0,0,0,.5);
}
`;
