import { useState, useEffect, useRef } from "react";
import { useVehicles } from "../../hooks/useVehicles";

// ── Tus imágenes locales (igual que PurchaseMenu) ─────────────────────────────
import BugattiImg from "../../assets/Bugatti Chiron black side view.jpg";
import FerrariImg from "../../assets/Ferrari Roma front view dark.jpg";
import PaganiImg from "../../assets/Pagani Huayra carbon fiber.jpg";
import RollsImg from "../../assets/Rolls Royce Phantom black luxury.jpg";
import SupraImg from "../../assets/Toyota Supra widebody kit.jpg";
import KoenigImg from "../../assets/Koenigsegg Regera hypercar.jpg";
import LamboImg from "../../assets/Lamborghini Veneno side.jpg";
import AstonImg from "../../assets/Aston Martin Valkyrie F1.jpg";
import HennesseyImg from "../../assets/Hennessey Venom F5 front.jpg";

const HERO_IMAGES = {
  "bugatti-chiron": BugattiImg,
  "ferrari-roma": FerrariImg,
  "pagani-huayra": PaganiImg,
  "rolls-royce-phantom": RollsImg,
  "toyota-supra-mk5": SupraImg,
  "koenigsegg-regera": KoenigImg,
  "lamborghini-veneno": LamboImg,
  "aston-martin-valkyrie": AstonImg,
  "hennessey-venom-f5": HennesseyImg,
};

// Estos slugs ocupan slot ancho (wide) en el bento grid
const FEATURED = new Set([
  "bugatti-chiron",
  "koenigsegg-regera",
  "lamborghini-veneno",
]);

// ── Styles ────────────────────────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Bebas+Neue&family=Montserrat:wght@200;300;400;500&display=swap');

  .cfg-root {
    --gold: #C9A84C;
    --gold-dim: rgba(201,168,76,0.14);
    --bg: #080806;
    --surface: #0e0e0c;
    --text: #F0EDE8;
    --muted: rgba(240,237,232,0.40);
    font-family: 'Montserrat', sans-serif;
    background: var(--bg);
    width: 100%;
  }

  /* ── Header ── */
  .cfg-header {
    text-align: center;
    padding: 88px 40px 52px;
  }
  .cfg-eyebrow {
    font-size: 9px; font-weight: 200; letter-spacing: 0.58em;
    color: var(--gold); text-transform: uppercase;
    margin-bottom: 22px; opacity: 0.65;
  }
  .cfg-title {
    font-family: 'Cormorant Garamond', serif; font-weight: 300;
    font-size: clamp(40px, 5.5vw, 78px);
    letter-spacing: 0.13em; color: var(--text);
    margin: 0; line-height: 1;
  }
  .cfg-title em { font-style: italic; color: var(--gold); }
  .cfg-rule {
    width: 58px; height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    margin: 24px auto;
  }
  .cfg-subtitle {
    font-size: 9px; letter-spacing: 0.5em;
    color: var(--muted); text-transform: uppercase;
  }

  /* ── Filter pills ── */
  .cfg-filters {
    display: flex; justify-content: center;
    gap: 8px; padding: 0 40px 44px; flex-wrap: wrap;
  }
  .cfg-pill {
    background: transparent;
    border: 1px solid rgba(201,168,76,0.18);
    color: var(--muted);
    font-family: 'Montserrat', sans-serif;
    font-size: 9px; font-weight: 300; letter-spacing: 0.4em;
    text-transform: uppercase; padding: 9px 20px;
    cursor: pointer; position: relative; overflow: hidden;
    transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
  }
  .cfg-pill::before {
    content: ''; position: absolute; inset: 0;
    background: var(--gold-dim);
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.35s cubic-bezier(0.22,1,0.36,1);
  }
  .cfg-pill:hover::before, .cfg-pill.active::before { transform: scaleX(1); }
  .cfg-pill:hover, .cfg-pill.active { border-color: var(--gold); color: var(--gold); }

  /* ── Bento Grid ── */
  .cfg-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 3px;
    padding: 0 3px 72px;
  }

  /* ── Cards ── */
  .cfg-card {
    position: relative; overflow: hidden; cursor: pointer;
    background: var(--surface);
    opacity: 0; transform: translateY(30px);
    animation: cfgUp 0.65s cubic-bezier(0.22,1,0.36,1) forwards;
  }
  @keyframes cfgUp { to { opacity: 1; transform: translateY(0); } }
  .cfg-card:nth-child(1){animation-delay:0.04s}
  .cfg-card:nth-child(2){animation-delay:0.10s}
  .cfg-card:nth-child(3){animation-delay:0.16s}
  .cfg-card:nth-child(4){animation-delay:0.22s}
  .cfg-card:nth-child(5){animation-delay:0.28s}
  .cfg-card:nth-child(6){animation-delay:0.34s}
  .cfg-card:nth-child(7){animation-delay:0.40s}
  .cfg-card:nth-child(8){animation-delay:0.46s}
  .cfg-card:nth-child(9){animation-delay:0.52s}

  .cfg-card.wide { grid-column: span 6; aspect-ratio: 16/9; }
  .cfg-card.slim { grid-column: span 4; aspect-ratio: 3/4;  }
  .cfg-card.sold { cursor: default; opacity: 0.3 !important; }

  /* ── Image ── */
  .cfg-img {
    width: 100%; height: 100%; object-fit: cover; display: block;
    filter: brightness(0.70) saturate(0.88);
    transition: transform 1.1s cubic-bezier(0.22,1,0.36,1), filter 0.55s ease;
  }
  .cfg-card:not(.sold):hover .cfg-img {
    transform: scale(1.07);
    filter: brightness(0.48) saturate(1.12);
  }

  /* ── Gradient ── */
  .cfg-grad {
    position: absolute; inset: 0; pointer-events: none;
    background: linear-gradient(to top, rgba(0,0,0,0.93) 0%, rgba(0,0,0,0.3) 44%, transparent 68%);
  }

  /* ── Corner brackets ── */
  .cfg-tl, .cfg-br {
    position: absolute; width: 22px; height: 22px;
    opacity: 0; transform: scale(0.5);
    transition: all 0.44s cubic-bezier(0.22,1,0.36,1);
  }
  .cfg-tl { top:16px; left:16px; border-top:1px solid var(--gold); border-left:1px solid var(--gold); }
  .cfg-br { bottom:16px; right:16px; border-bottom:1px solid var(--gold); border-right:1px solid var(--gold); }
  .cfg-card:not(.sold):hover .cfg-tl,
  .cfg-card:not(.sold):hover .cfg-br { opacity:1; transform:scale(1); }

  /* ── Category tag ── */
  .cfg-tag {
    position: absolute; top:18px; right:18px;
    font-size: 8px; font-weight: 300; letter-spacing: 0.35em;
    text-transform: uppercase; color: var(--gold);
    background: rgba(0,0,0,0.55); backdrop-filter: blur(8px);
    border: 1px solid rgba(201,168,76,0.28); padding: 5px 12px;
    opacity: 0; transform: translateY(-6px);
    transition: all 0.38s 0.05s cubic-bezier(0.22,1,0.36,1);
  }
  .cfg-card:not(.sold):hover .cfg-tag { opacity:1; transform:translateY(0); }

  /* ── Stock badge ── */
  .cfg-stock {
    position: absolute; top:18px; left:18px;
    font-size: 8px; font-weight: 300; letter-spacing: 0.3em;
    text-transform: uppercase; padding: 4px 10px;
    border: 1px solid rgba(80,210,80,0.28); color: rgba(80,210,80,0.75);
    background: rgba(0,0,0,0.5); backdrop-filter: blur(6px);
  }
  .cfg-stock.out { border-color:rgba(210,80,80,0.28); color:rgba(210,80,80,0.65); }

  /* ── Bottom info ── */
  .cfg-info {
    position: absolute; bottom:0; left:0; right:0;
    padding: 26px 22px 20px;
    display: flex; flex-direction: column; gap: 5px;
  }
  .cfg-brand {
    font-size: 8px; font-weight: 300; letter-spacing: 0.46em;
    color: var(--gold); text-transform: uppercase; opacity: 0.72;
  }
  .cfg-name {
    font-family: 'Cormorant Garamond', serif; font-weight: 300;
    font-size: clamp(20px, 2.5vw, 36px);
    color: var(--text); line-height: 1.05; letter-spacing: 0.03em; margin: 0;
  }
  .cfg-price {
    font-size: 11px; font-weight: 200;
    letter-spacing: 0.22em; color: var(--muted); margin-top: 2px;
  }

  /* ── Specs reveal ── */
  .cfg-specs {
    display: flex; gap: 18px; overflow: hidden;
    max-height: 0; opacity: 0; margin-top: 0;
    transition: max-height 0.4s cubic-bezier(0.22,1,0.36,1),
                opacity 0.32s ease, margin 0.32s ease;
  }
  .cfg-card:not(.sold):hover .cfg-specs { max-height:55px; opacity:1; margin-top:8px; }
  .cfg-spec { display:flex; flex-direction:column; gap:2px; }
  .cfg-spec-val {
    font-family: 'Bebas Neue', sans-serif; font-size: 16px;
    color: var(--text); letter-spacing: 0.08em;
  }
  .cfg-spec-lbl {
    font-size: 7px; letter-spacing: 0.38em;
    color: var(--muted); text-transform: uppercase;
  }

  /* ── CTA button ── */
  .cfg-cta {
    position: absolute; bottom:20px; right:20px;
    background: transparent; border: 1px solid var(--gold); color: var(--gold);
    font-family: 'Montserrat', sans-serif; font-size: 8px; font-weight: 300;
    letter-spacing: 0.4em; text-transform: uppercase; padding: 8px 16px;
    cursor: pointer; opacity: 0; transform: translateX(12px); pointer-events: none;
    overflow: hidden;
    transition: all 0.38s 0.08s cubic-bezier(0.22,1,0.36,1);
  }
  .cfg-cta::before {
    content: ''; position: absolute; inset: 0;
    background: var(--gold); transform: scaleX(0); transform-origin: left;
    transition: transform 0.28s cubic-bezier(0.22,1,0.36,1);
  }
  .cfg-cta:hover::before { transform: scaleX(1); }
  .cfg-cta:hover { color: #080806; }
  .cfg-cta span { position: relative; z-index: 1; }
  .cfg-card:not(.sold):hover .cfg-cta { opacity:1; transform:translateX(0); pointer-events:all; }

  /* ── Loading / Error ── */
  .cfg-loading {
    text-align: center; padding: 80px 40px;
    color: var(--muted); font-size: 10px; letter-spacing: 0.45em; text-transform: uppercase;
  }
  .cfg-spinner {
    width: 30px; height: 30px;
    border: 1px solid rgba(201,168,76,0.15); border-top-color: var(--gold);
    border-radius: 50%; animation: spin 0.9s linear infinite; margin: 0 auto 18px;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── Count ── */
  .cfg-count {
    text-align: center; font-size: 9px; letter-spacing: 0.42em;
    color: var(--muted); padding-bottom: 24px;
  }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .cfg-card.wide, .cfg-card.slim { grid-column: span 12; aspect-ratio: 16/9; }
  }
  @media (max-width: 600px) {
    .cfg-header { padding: 60px 20px 36px; }
    .cfg-filters { padding: 0 16px 32px; }
  }
`;

export default function ModelConfigurator({ onSelectVehicle }) {
  const { vehicles, loading, error } = useVehicles();
  const [activeFilter, setActiveFilter] = useState("ALL");
  const stylesRef = useRef(false);

  // Inject styles once
  useEffect(() => {
    if (stylesRef.current) return;
    stylesRef.current = true;
    const el = document.createElement("style");
    el.id = "model-cfg-styles";
    el.textContent = STYLES;
    document.head.appendChild(el);
  }, []);

  // Build category list from API data
  const categories = [
    "ALL",
    ...new Set(vehicles.map((v) => v.category).filter(Boolean)),
  ];

  const filtered =
    activeFilter === "ALL" ? vehicles : (
      vehicles.filter((v) => v.category === activeFilter)
    );

  return (
    <div className="cfg-root">
      {/* Header */}
      <header className="cfg-header">
        <p className="cfg-eyebrow">Francis Luxor Motors · Est. 2024</p>
        <h1 className="cfg-title">
          Asset <em>Configurator</em>
        </h1>
        <div className="cfg-rule" />
        <p className="cfg-subtitle">Select a vehicle to begin configuration</p>
      </header>

      {/* Category filters */}
      {categories.length > 1 && (
        <div className="cfg-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`cfg-pill${activeFilter === cat ? " active" : ""}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="cfg-loading">
          <div className="cfg-spinner" />
          Loading fleet
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="cfg-loading" style={{ color: "#c0392b" }}>
          ⚠ {error}
        </div>
      )}

      {/* Bento Grid */}
      {!loading && !error && (
        <>
          <div className="cfg-grid">
            {filtered.map((vehicle, i) => {
              const img = HERO_IMAGES[vehicle.slug];
              const wide = FEATURED.has(vehicle.slug);
              const stock = parseInt(vehicle.stock) || 0;
              const soldOut = stock === 0;

              return (
                <div
                  key={vehicle.slug || i}
                  className={`cfg-card ${wide ? "wide" : "slim"}${soldOut ? " sold" : ""}`}
                  onClick={() => !soldOut && onSelectVehicle?.(vehicle.model)}
                >
                  {/* Image */}
                  {img ?
                    <img src={img} alt={vehicle.model} className="cfg-img" />
                  : <div
                      style={{
                        width: "100%",
                        height: "100%",
                        background: "#0e0e0c",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Cormorant Garamond',serif",
                          color: "rgba(201,168,76,0.1)",
                          fontSize: "1.4rem",
                        }}
                      >
                        {vehicle.model}
                      </span>
                    </div>
                  }

                  <div className="cfg-grad" />
                  <div className="cfg-tl" />
                  <div className="cfg-br" />

                  {/* Stock badge */}
                  <span className={`cfg-stock${soldOut ? " out" : ""}`}>
                    {soldOut ? "Sold Out" : vehicle.stock}
                  </span>

                  {/* Category */}
                  {vehicle.category && (
                    <span className="cfg-tag">{vehicle.category}</span>
                  )}

                  {/* Info */}
                  <div className="cfg-info">
                    <span className="cfg-brand">
                      {vehicle.model?.split(" ")[0]?.toUpperCase()}
                    </span>
                    <h2 className="cfg-name">{vehicle.model}</h2>
                    <div className="cfg-specs">
                      {vehicle.hp && (
                        <div className="cfg-spec">
                          <span className="cfg-spec-val">{vehicle.hp} HP</span>
                          <span className="cfg-spec-lbl">Power</span>
                        </div>
                      )}
                      {vehicle.top && (
                        <div className="cfg-spec">
                          <span className="cfg-spec-val">
                            {vehicle.top} KM/H
                          </span>
                          <span className="cfg-spec-lbl">Top Speed</span>
                        </div>
                      )}
                    </div>
                    {vehicle.valuation && (
                      <span className="cfg-price">€{vehicle.valuation}</span>
                    )}
                  </div>

                  {!soldOut && (
                    <button className="cfg-cta">
                      <span>Configure →</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          <p className="cfg-count">
            {filtered.length} / {vehicles.length} MODELS AVAILABLE
          </p>
        </>
      )}
    </div>
  );
}
