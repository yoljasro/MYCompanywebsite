import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * RatesWidget — Fiat + Crypto kurslari (gradient, glass, animated background)
 *  - Fiat API (primary):  https://api.frankfurter.app/latest?from=USD&to=EUR,RUB
 *  - Fiat API (fallback): https://open.er-api.com/v6/latest/USD
 *  - Crypto API:         https://api.coingecko.com/api/v3/simple/price
 *
 * Props (ixtiyoriy):
 *  baseFiat="USD"
 *  fiats=["EUR","RUB"]
 *  cryptos=["bitcoin","ethereum","tether","solana"]
 *  vs=["usd","eur","rub"]
 *  refreshSec={60}
 *  compact={false}
 */

const D_FIATS   = ["EUR", "RUB"];
const D_CRYPTOS = ["bitcoin", "ethereum", "tether", "solana"];
const D_VS      = ["usd", "eur", "rub"];

export default function RatesWidget({
  baseFiat   = "USD",
  fiats      = D_FIATS,
  cryptos    = D_CRYPTOS,
  vs         = D_VS,
  refreshSec = 60,
  compact    = false,
}) {
  // inject styles once
  useEffect(() => {
    const id = "rates-widget-styles";
    if (!document.getElementById(id)) {
      const el = document.createElement("style");
      el.id = id;
      el.innerHTML = css;
      document.head.appendChild(el);
    }
  }, []);

  // animated bg
  const bgRef = useRef(null);
  useEffect(() => {
    const c = bgRef.current; if (!c) return;
    const ctx = c.getContext("2d");
    let raf;
    const DPR = Math.min(2, window.devicePixelRatio || 1);
    const fit = () => { c.width = c.clientWidth * DPR; c.height = c.clientHeight * DPR; };
    fit();

    const colors = [
      ["rgba(139,92,246,0.28)","rgba(34,211,238,0.22)"],
      ["rgba(236,72,153,0.22)","rgba(99,102,241,0.22)"],
      ["rgba(34,197,94,0.18)","rgba(59,130,246,0.18)"],
    ];
    const orbs = Array.from({length:10}).map((_,i)=>({
      x: Math.random()*c.width, y: Math.random()*c.height,
      r: (120+Math.random()*200)*DPR,
      dx: (Math.random()-0.5)*0.35*DPR, dy:(Math.random()-0.5)*0.35*DPR,
      c: colors[i%colors.length],
    }));

    const draw = () => {
      ctx.clearRect(0,0,c.width,c.height);
      ctx.fillStyle="#090a0f"; ctx.fillRect(0,0,c.width,c.height);
      orbs.forEach(o=>{
        o.x+=o.dx; o.y+=o.dy;
        if(o.x<-o.r) o.x=c.width+o.r; if(o.x>c.width+o.r) o.x=-o.r;
        if(o.y<-o.r) o.y=c.height+o.r; if(o.y>c.height+o.r) o.y=-o.r;
        const g=ctx.createRadialGradient(o.x,o.y,0,o.x,o.y,o.r);
        g.addColorStop(0,o.c[0]); g.addColorStop(1,"transparent");
        ctx.fillStyle=g; ctx.beginPath(); ctx.arc(o.x,o.y,o.r,0,Math.PI*2); ctx.fill();
      });
      raf=requestAnimationFrame(draw);
    };
    draw();
    const onResize=()=>fit();
    window.addEventListener("resize",onResize);
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener("resize",onResize); };
  }, []);

  // data
  const [tab,setTab]=useState("fiat");
  const [fiat,setFiat]=useState(null);
  const [crypto,setCrypto]=useState(null);
  const [lf,setLf]=useState(false), [lc,setLc]=useState(false);
  const [ef,setEf]=useState(""), [ec,setEc]=useState("");
  const [at,setAt]=useState(null);
  const [fiatProvider, setFiatProvider] = useState("frankfurter");

  const nf2 = useMemo(()=>new Intl.NumberFormat(undefined,{maximumFractionDigits:2}),[]);
  const nf4 = useMemo(()=>new Intl.NumberFormat(undefined,{maximumFractionDigits:4}),[]);

  useEffect(()=>{
    let alive=true;
    const load=async()=>{
      await Promise.all([getFiat(), getCrypto()]);
      if(alive) setAt(new Date());
    };
    load();
    const t=setInterval(load, Math.max(15,refreshSec)*1000);
    return ()=>{ alive=false; clearInterval(t); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseFiat, fiats.join(","), cryptos.join(","), vs.join(","), refreshSec]);

  /** Fiat rates: Frankfurter -> (fallback) open.er-api */
 async function getFiat() {
  // 1) Frankfurter (asosiy)
  try {
    setEf(""); setLf(true);
    const url1 = `https://api.frankfurter.app/latest?from=${encodeURIComponent(baseFiat)}&to=${fiats.map(encodeURIComponent).join(",")}&v=${Date.now()}`;
    const r1 = await fetch(url1, { cache: "no-store" });
    if (!r1.ok) throw new Error(`Frankfurter: ${r1.status}`);
    const j1 = await r1.json();                       // { base, date, rates: {...} }
    if (!j1?.rates) throw new Error("Frankfurter: empty rates");

    // Frankfurter natijalari
    const rates = { ...j1.rates };

    // ❗ Yetishmayotgan valyutalarni aniqlaymiz (masalan, RUB)
    const missing = fiats.filter(sym => rates[sym] == null);

    // Agar kam bo‘lsa — open.er-api dan olib, merge qilamiz
    if (missing.length) {
      const url2 = `https://open.er-api.com/v6/latest/${encodeURIComponent(baseFiat)}?v=${Date.now()}`;
      const r2 = await fetch(url2, { cache: "no-store" });
      if (r2.ok) {
        const j2 = await r2.json();                   // { base_code, rates: {...} }
        missing.forEach(sym => {
          const v = j2?.rates?.[sym];
          if (typeof v === "number") rates[sym] = v;
        });
        setFiatProvider("frankfurter+er-api");
      } else {
        setFiatProvider("frankfurter");               // fallback bo‘lmadi, lekin borini ko‘rsatamiz
      }
    } else {
      setFiatProvider("frankfurter");
    }

    setFiat({ base: j1.base, rates });
    return; // muvaffaqiyatli tugadi
  } catch (e) {
    console.warn("Frankfurter failed -> fallback open.er-api", e);
  } finally {
    setLf(false);
  }

    // 2) open.er-api (fallback)
    try {
    setEf(""); setLf(true);
    const url2 = `https://open.er-api.com/v6/latest/${encodeURIComponent(baseFiat)}?v=${Date.now()}`;
    const r2 = await fetch(url2, { cache: "no-store" });
    if (!r2.ok) throw new Error(`ER-API: ${r2.status}`);
    const j2 = await r2.json();
    const out = { base: j2.base_code, rates: {} };
    fiats.forEach(sym => { out.rates[sym] = j2?.rates?.[sym]; });
    setFiat(out);
    setFiatProvider("open.er-api");
  } catch (e) {
    setEf(e.message || "Fiat yuklashda xatolik");
    setFiat(null);
  } finally {
    setLf(false);
  }
}
  // 🔁 Crypto: CoinGecko -> (fallback) Binance + fiat konversiya
// 🔁 Crypto kurslari (CoinGecko -> Binance fallback)
async function getCrypto() {
  try {
    setEc(""); setLc(true);

    // === 1) CoinGecko urunib ko‘ramiz ===
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${cryptos.join(",")}&vs_currencies=${vs.join(",")}&include_24hr_change=true&v=${Date.now()}`;
    const r = await fetch(url, { cache: "no-store" });
    if (!r.ok) throw new Error(`CoinGecko: ${r.status}`);
    const j = await r.json();
    setCrypto(j);
    return; // ✅ CoinGecko ishlasa shu yerda to‘xtaydi
  } catch (e) {
    console.warn("CoinGecko ishlamadi, Binance fallback:", e.message);
  }

  // === 2) Binance fallback ===
  try {
    const map = {
      bitcoin: "BTCUSDT",
      ethereum: "ETHUSDT",
      tether: "USDTUSDT", // deyarli 1
      solana: "SOLUSDT",
    };
    const symbols = cryptos.map(c => map[c]).filter(Boolean);
    const urlB = `https://api.binance.com/api/v3/ticker/price?symbols=${encodeURIComponent(JSON.stringify(symbols))}`;
    const rb = await fetch(urlB, { cache: "no-store" });
    if (!rb.ok) throw new Error(`Binance: ${rb.status}`);
    const arr = await rb.json(); // [{symbol:"BTCUSDT",price:"..."}]

    // Fiat kurslari (USD -> EUR/RUB)
    const usdTo = {
      EUR: fiat?.rates?.EUR ?? 0,
      RUB: fiat?.rates?.RUB ?? 0,
    };

    // Binance USD narxlaridan chiqadigan obyekt
    const out = {};
    for (const c of cryptos) {
      const sym = map[c];
      const row = arr.find(x => x.symbol === sym);
      if (!row) continue;
      const usd = parseFloat(row.price) || 0;

      const entry = {};
      vs.forEach(v => {
        const V = v.toUpperCase();
        if (V === "USD") entry.usd = usd;
        else if (V === "EUR" && usdTo.EUR) entry.eur = usd * usdTo.EUR;
        else if (V === "RUB" && usdTo.RUB) entry.rub = usd * usdTo.RUB;
      });

      out[c] = entry;
    }

    setCrypto(out);
  } catch (e) {
    setEc(e.message || "Crypto yuklashda xatolik");
    setCrypto(null);
  } finally {
    setLc(false);
  }
}


  // tilt
  const cardRef=useRef(null);
  useEffect(()=>{
    const el=cardRef.current; if(!el) return;
    const move=(e)=>{
      const r=el.getBoundingClientRect();
      const px=(e.clientX-r.left)/r.width-0.5;
      const py=(e.clientY-r.top)/r.height-0.5;
      el.style.setProperty("--rx", `${(-py*6).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${(px*8).toFixed(2)}deg`);
      el.style.setProperty("--gx", `${50+px*30}%`);
      el.style.setProperty("--gy", `${50+py*30}%`);
    };
    const reset=()=>{ el.style.setProperty("--rx","0deg"); el.style.setProperty("--ry","0deg"); el.style.setProperty("--gx","50%"); el.style.setProperty("--gy","50%"); };
    el.addEventListener("mousemove",move); el.addEventListener("mouseleave",reset);
    return ()=>{ el.removeEventListener("mousemove",move); el.removeEventListener("mouseleave",reset); };
  },[]);

  const wrapCls=`rw ${compact?"rw--compact":""}`;

  return (
    <section className={wrapCls}>
      <canvas ref={bgRef} className="rw-bg" />
      <div className="rw-grain" />
      <div ref={cardRef} className="rw-card">
        <div className="rw-border" />
        <div className="rw-head">
          <div>
            <div className="rw-badge">Live</div>
            <h3>Курсы валют и криптовалют</h3>
            <p className="rw-sub">
              База: <strong>{baseFiat}</strong>{at && <> · Обновлено: {at.toLocaleTimeString()}</>}
            </p>
          </div>
          <div className="rw-tabs">
            <button className={`rw-tab ${tab==="fiat"?"is-active":""}`} onClick={()=>setTab("fiat")}>Fiat</button>
            <button className={`rw-tab ${tab==="crypto"?"is-active":""}`} onClick={()=>setTab("crypto")}>Crypto</button>
          </div>
        </div>

        {tab==="fiat"
          ? <FiatTable data={fiat} nf2={nf2} base={baseFiat} fiats={fiats} loading={lf} error={ef}/>
          : <CryptoGrid data={crypto} nf2={nf2} nf4={nf4} vs={vs} cryptos={cryptos} loading={lc} error={ec}/>
        }

        <div className="rw-foot">
          <span>{fiatProvider === "frankfurter" ? "frankfurter.app" : "open.er-api.com"}</span>
          <span>CoinGecko</span>
          <span>Auto: {Math.max(15,refreshSec)}s</span>
        </div>
      </div>
    </section>
  );
}

/* ---------- subviews ---------- */
function FiatTable({ data, nf2, base, fiats, loading, error }){
  if (loading && !data) return <Skeleton rows={3}/>;
  if (error) return <ErrorBox text={error}/>;
  if (!data?.rates) return <EmptyBox text="Нет данных по валютам."/>;

  return (
    <div className="rw-table-wrap">
      <table className="rw-table">
        <thead>
          <tr><th>Пара</th><th className="t-right">Курс</th></tr>
        </thead>
        <tbody>
          {fiats.map(sym=>(
            <tr key={sym}>
              <td>{base} / {sym}</td>
              <td className="t-right">{data.rates[sym] ? nf2.format(data.rates[sym]) : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CryptoGrid({ data, nf2, nf4, vs, cryptos, loading, error }){
  if (loading && !data) return <Skeleton rows={cryptos.length}/>;
  if (error) return <ErrorBox text={error} retryHint="CoinGecko rate limit bo‘lishi mumkin"/>;
  if (!data) return <EmptyBox text="Нет данных по крипто." />;

  return (
    <div className="rw-grid">
      {cryptos.map(id=>{
        const row=data[id]||{};
        const ch=row.usd_24h_change;
        const pos=typeof ch==="number" && ch>=0;
        return (
          <div key={id} className="rw-coin">
            <div className="rw-coin-top">
              <h4 className="cap">{id.replace(/-/g," ")}</h4>
              {typeof ch==="number" && (
                <span className={`chg ${pos?"up":"dn"}`}>{pos?"▲":"▼"} {nf2.format(ch)}%</span>
              )}
            </div>
            <div className="rw-coin-grid">
              {vs.map(v=>{
                const key=v.toLowerCase();
                const price=row[key];
                const val=price!==undefined ? (price<1 ? nf4.format(price) : nf2.format(price)) : "—";
                return (
                  <div key={v} className="rw-coin-row">
                    <span className="vs">{v.toUpperCase()}</span>
                    <span className="val">{val}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- helpers ---------- */
function Skeleton({ rows = 3 }) {
  return (
    <div className="rw-skel">
      {Array.from({ length: rows }).map((_, i) => <div key={i} className="rw-skel-row" />)}
    </div>
  );
}
function ErrorBox({ text = "Ошибка", retryHint }) {
  return (
    <div className="rw-err">
      <div className="rw-err-title">Ошибка</div>
      <div>{text}</div>
      {retryHint && <div className="rw-err-hint">{retryHint}</div>}
    </div>
  );
}
function EmptyBox({ text = "Пусто" }) {
  return <div className="rw-empty">{text}</div>;
}

/* ---------- CSS (scoped) ---------- */
const css = `
.rw{position:relative;min-height:260px;border-radius:24px;overflow:hidden}
.rw--compact{max-width:980px;margin:0 auto}
.rw-bg{position:absolute;inset:0;width:100%;height:100%;z-index:-2;display:block}
.rw-grain{position:absolute;inset:0;z-index:-1;pointer-events:none;background-image:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="140" height="140" viewBox="0 0 140 140"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="1" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23n)" opacity="0.035"/></svg>');mix-blend-mode:soft-light;opacity:.6}

/* card */
.rw-card{position:relative;margin:0 auto;padding:16px;border-radius:22px;backdrop-filter:blur(14px);
  background:linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.025));
  border:1px solid rgba(255,255,255,.09);
  transform:perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));
  transition:transform .15s ease;will-change:transform;
}
.rw-border{pointer-events:none;position:absolute;inset:-1px;border-radius:24px;z-index:-1;filter:blur(12px);opacity:.65;
  background: radial-gradient(360px 220px at var(--gx,50%) var(--gy,50%), rgba(139,92,246,.45), rgba(34,211,238,.4), transparent 70%);
}

/* head */
.rw-head{display:flex;align-items:flex-end;justify-content:space-between;gap:12px;margin-bottom:8px}
.rw-badge{display:inline-flex;align-items:center;gap:.4rem;padding:.25rem .55rem;border-radius:999px;
  background:linear-gradient(135deg,#ef4444,#f59e0b);color:#111;font-weight:700;font-size:.75rem}
.rw h3{margin:.2rem 0;font-size:clamp(1.1rem,2.2vw,1.4rem);color:#fff}
.rw-sub{color:#b8c0e0;font-size:.85rem}

/* tabs */
.rw-tabs{display:inline-flex;gap:6px;padding:4px;border-radius:12px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.05)}
.rw-tab{border:none;background:transparent;color:#dfe7ff;padding:.45rem .8rem;border-radius:10px;cursor:pointer}
.rw-tab.is-active{color:#111;background:linear-gradient(135deg,#60a5fa,#818cf8,#7dd3fc);box-shadow:0 10px 24px rgba(129,140,248,.35)}
.rw-tab:hover{color:#fff}

/* table */
.rw-table-wrap{overflow-x:auto;margin-top:6px}
.rw-table{min-width:520px;width:100%;border-collapse:collapse;color:#eaf1ff}
.rw-table th,.rw-table td{padding:10px 10px;border-bottom:1px solid rgba(255,255,255,.08)}
.rw-table th{color:#b8c0e0;font-weight:600}
.t-right{text-align:right}

/* crypto grid */
.rw-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:10px;margin-top:6px}
.rw-coin{border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:12px;background:rgba(255,255,255,.05)}
.rw-coin-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}
.rw-coin h4{margin:0;color:#fff;font-size:1rem}
.cap{text-transform:capitalize}
.chg{font-size:.78rem;padding:.15rem .45rem;border-radius:999px;border:1px solid rgba(255,255,255,.2)}
.chg.up{background:rgba(34,197,94,.16);color:#bbf7d0;border-color:rgba(34,197,94,.35)}
.chg.dn{background:rgba(244,63,94,.16);color:#fecdd3;border-color:rgba(244,63,94,.35)}
.rw-coin-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px}
.rw-coin-row{display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px dashed rgba(255,255,255,.08)}
.rw-coin-row:last-child{border-bottom:none}
.vs{color:#cfe1ff;font-size:.85rem}
.val{color:#fff}

/* foot */
.rw-foot{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;color:#9fb0d0;font-size:.75rem}

/* states */
.rw-skel{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:8px;margin-top:8px}
.rw-skel-row{height:56px;border-radius:14px;background:linear-gradient(90deg,rgba(255,255,255,.06),rgba(255,255,255,.12),rgba(255,255,255,.06));background-size:200% 100%;animation:rw-shine 1.3s linear infinite}
@keyframes rw-shine{to{background-position:-200% 0}}
.rw-err{margin-top:8px;border:1px solid rgba(244,63,94,.35);background:rgba(244,63,94,.12);color:#fecdd3;border-radius:14px;padding:10px;font-size:.9rem}
.rw-err-title{font-weight:700;margin-bottom:4px}
.rw-err-hint{opacity:.8;font-size:.8rem}
.rw-empty{margin-top:8px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.05);color:#dfe7ff;border-radius:14px;padding:10px}
`;
