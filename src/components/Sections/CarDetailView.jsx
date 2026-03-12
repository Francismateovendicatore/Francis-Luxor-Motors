import { useState, useEffect, useRef } from "react";

export default function CarDetailView({ data, name, onClose }) {
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("performance");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [interiorLoaded, setInteriorLoaded] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => setVisible(true), 50);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 700);
  };

  if (!data) return null;

  const tabs = [
    { id: "performance", label: "Performance" },
    { id: "interior", label: "Interior" },
    { id: "provenance", label: "Provenance" },
  ];

  const tabContent = {
    performance: {
      image: data.engineImg,
      title: "Mechanical Mastery",
      subtitle: "POWERPLANT ENGINEERING",
      body: data.engineDesc,
      stats: [
        { label: "Power Output", value: data.hp, unit: "HP" },
        { label: "Top Speed", value: data.top, unit: "KM/H" },
      ],
    },
    interior: {
      image: data.interiorImg,
      title: "The Bespoke Cabin",
      subtitle: "ARTISAN CRAFTSMANSHIP",
      body: "Every surface within is an act of intention. Hand-stitched leather, carbon fibre accents, and precision-machined controls converge into a cockpit that transcends the ordinary.",
      features: [
        "Hand-Stitched Leather",
        "Carbon Fibre Trim",
        "Precision Craftsmanship",
        "Bespoke Upholstery",
      ],
    },
    provenance: {
      title: "A Legacy of Excellence",
      subtitle: "HERITAGE & DISTINCTION",
      body: "Born from decades of obsessive refinement, each vehicle carries the signature of those who refused to compromise. This is not transportation — it is an inheritance.",
      pillars: [
        "Uncompromising Quality",
        "Exclusive Ownership",
        "Lifetime Concierge",
        "Certified Provenance",
      ],
    },
  };

  const current = tabContent[activeTab];

  return (
    <div className={`vx-root ${visible ? "vx-root--in" : ""}`}>
      {/* ── AMBIENT GLOW ─────────────────────────────── */}
      <div className="vx-ambient" aria-hidden="true">
        <div className="vx-ambient__orb vx-ambient__orb--1" />
        <div className="vx-ambient__orb vx-ambient__orb--2" />
        <div className="vx-ambient__grid" />
      </div>

      {/* ── TOP BAR ──────────────────────────────────── */}
      <header className="vx-topbar">
        <div className="vx-topbar__brand">
          <span className="vx-topbar__diamond">◆</span>
          <span className="vx-topbar__wordmark">LUXOR MOTORS</span>
        </div>

        <div className="vx-topbar__vehicle">
          <span className="vx-topbar__label">VEHICLE STUDIO</span>
          <span className="vx-topbar__sep">·</span>
          <span className="vx-topbar__name">{name.toUpperCase()}</span>
        </div>

        <button className="vx-close" onClick={handleClose} aria-label="Close">
          <span className="vx-close__ring" />
          <svg
            className="vx-close__icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          <span className="vx-close__label">CLOSE</span>
        </button>
      </header>

      {/* ── HERO TITLE ───────────────────────────────── */}
      <section className="vx-hero" ref={heroRef}>
        <div className="vx-hero__eyebrow">
          <span className="vx-line" />
          <span className="vx-eyebrow-text">EXCLUSIVE COLLECTION</span>
          <span className="vx-line" />
        </div>
        <h1 className="vx-hero__title">{name.toUpperCase()}</h1>
        <div className="vx-hero__tagline">
          Masterpiece of Automotive Engineering
        </div>

        {/* Floating spec chips */}
        <div className="vx-chips">
          <div className="vx-chip">
            <span className="vx-chip__value">{data.hp}</span>
            <span className="vx-chip__unit">HP</span>
          </div>
          <div className="vx-chip__divider" />
          <div className="vx-chip">
            <span className="vx-chip__value">{data.top}</span>
            <span className="vx-chip__unit">KM/H</span>
          </div>
        </div>
      </section>

      {/* ── MAIN STAGE ───────────────────────────────── */}
      <main className="vx-stage">
        {/* TAB RAIL */}
        <nav className="vx-tabs">
          {tabs.map((t) => (
            <button
              key={t.id}
              className={`vx-tab ${activeTab === t.id ? "vx-tab--active" : ""}`}
              onClick={() => setActiveTab(t.id)}
            >
              <span className="vx-tab__text">{t.label}</span>
              <span className="vx-tab__bar" />
            </button>
          ))}
        </nav>

        {/* CONTENT PANEL */}
        <div className="vx-panel" key={activeTab}>
          {/* IMAGE SIDE */}
          {current.image && (
            <div className="vx-panel__visual">
              <div className="vx-frame">
                <div className="vx-frame__corner vx-frame__corner--tl" />
                <div className="vx-frame__corner vx-frame__corner--tr" />
                <div className="vx-frame__corner vx-frame__corner--bl" />
                <div className="vx-frame__corner vx-frame__corner--br" />
                <img
                  src={current.image}
                  alt={current.title}
                  className={`vx-frame__img ${
                    (
                      activeTab === "performance" ? imageLoaded : interiorLoaded
                    ) ?
                      "vx-frame__img--loaded"
                    : ""
                  }`}
                  onLoad={() =>
                    activeTab === "performance" ?
                      setImageLoaded(true)
                    : setInteriorLoaded(true)
                  }
                />
                <div className="vx-frame__sheen" />
              </div>
            </div>
          )}

          {/* TEXT SIDE */}
          <div
            className={`vx-panel__info ${!current.image ? "vx-panel__info--full" : ""}`}
          >
            <p className="vx-panel__subtitle">{current.subtitle}</p>
            <h2 className="vx-panel__title">{current.title}</h2>
            <div className="vx-panel__rule" />
            <p className="vx-panel__body">{current.body}</p>

            {/* Stats (performance tab) */}
            {current.stats && (
              <div className="vx-stats">
                {current.stats.map((s) => (
                  <div className="vx-stat" key={s.label}>
                    <span className="vx-stat__value">{s.value}</span>
                    <span className="vx-stat__unit">{s.unit}</span>
                    <span className="vx-stat__label">{s.label}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Features (interior tab) */}
            {current.features && (
              <ul className="vx-features">
                {current.features.map((f) => (
                  <li className="vx-feature" key={f}>
                    <span className="vx-feature__diamond">◆</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Pillars (provenance tab) */}
            {current.pillars && (
              <ul className="vx-features">
                {current.pillars.map((p) => (
                  <li className="vx-feature" key={p}>
                    <span className="vx-feature__diamond">◆</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>

      {/* ── FOOTER SIG ───────────────────────────────── */}
      <footer className="vx-footer">
        <span className="vx-line" />
        <span className="vx-footer__mark">◆</span>
        <span className="vx-footer__copy">An Automotive Masterpiece</span>
        <span className="vx-footer__mark">◆</span>
        <span className="vx-line" />
      </footer>

      {/* ══════════════════════════════════════════════
          STYLES
      ══════════════════════════════════════════════ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Cinzel:wght@400;500;600;700&family=Montserrat:wght@200;300;400;500;600;700&display=swap');

        /* ── VARIABLES ── */
        :root {
          --gold: #d4af37;
          --gold-light: #f4d03f;
          --gold-dim: rgba(212,175,55,0.15);
          --gold-border: rgba(212,175,55,0.35);
          --black: #000000;
          --surface: #0a0a0a;
          --text: #ffffff;
          --text-muted: rgba(255,255,255,0.55);
          --font-serif: 'Cormorant Garamond', Georgia, serif;
          --font-display: 'Cinzel', serif;
          --font-sans: 'Montserrat', sans-serif;
          --ease-luxury: cubic-bezier(0.23, 1, 0.32, 1);
          --dur: 0.7s;
        }

        /* ── RESET & ROOT ── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .vx-root {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: var(--black);
          color: var(--text);
          font-family: var(--font-sans);
          overflow-y: auto;
          overflow-x: hidden;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity var(--dur) var(--ease-luxury),
                      transform var(--dur) var(--ease-luxury);
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        .vx-root--in {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── AMBIENT ── */
        .vx-ambient {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }
        .vx-ambient__orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          animation: orbPulse 12s ease-in-out infinite;
        }
        .vx-ambient__orb--1 {
          width: 600px; height: 600px;
          top: -200px; left: -100px;
          background: radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%);
        }
        .vx-ambient__orb--2 {
          width: 500px; height: 500px;
          bottom: -150px; right: -100px;
          background: radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%);
          animation-delay: -6s;
        }
        @keyframes orbPulse {
          0%,100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.1); }
        }
        .vx-ambient__grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(212,175,55,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,175,55,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        /* ── TOP BAR ── */
        .vx-topbar {
          position: sticky;
          top: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 48px;
          height: 72px;
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--gold-border);
          flex-shrink: 0;
        }
        .vx-topbar__brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .vx-topbar__diamond {
          color: var(--gold);
          font-size: 0.6rem;
          animation: spin 20s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .vx-topbar__wordmark {
          font-family: var(--font-display);
          font-size: 0.7rem;
          letter-spacing: 5px;
          color: var(--gold);
        }
        .vx-topbar__vehicle {
          display: flex;
          align-items: center;
          gap: 14px;
          font-size: 0.6rem;
          letter-spacing: 3px;
          color: var(--text-muted);
        }
        .vx-topbar__label { text-transform: uppercase; }
        .vx-topbar__sep { color: var(--gold); opacity: 0.5; }
        .vx-topbar__name {
          color: var(--gold);
          font-family: var(--font-display);
          font-size: 0.65rem;
        }

        /* ── CLOSE BUTTON ── */
        .vx-close {
          display: flex;
          align-items: center;
          gap: 10px;
          background: none;
          border: 1px solid var(--gold-border);
          color: var(--text-muted);
          font-family: var(--font-sans);
          font-size: 0.55rem;
          letter-spacing: 3px;
          padding: 10px 20px;
          cursor: pointer;
          position: relative;
          transition: all 0.5s var(--ease-luxury);
          overflow: hidden;
        }
        .vx-close::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--gold-dim);
          transform: translateX(-100%);
          transition: transform 0.5s var(--ease-luxury);
        }
        .vx-close:hover::before { transform: translateX(0); }
        .vx-close:hover {
          color: var(--gold);
          border-color: var(--gold);
        }
        .vx-close__ring {
          display: inline-block;
          width: 18px; height: 18px;
          border: 1px solid currentColor;
          border-radius: 50%;
          flex-shrink: 0;
          position: relative;
          transition: transform 0.5s var(--ease-luxury);
        }
        .vx-close:hover .vx-close__ring { transform: rotate(90deg); }
        .vx-close__icon {
          width: 10px; height: 10px;
          position: absolute;
          left: 50%; top: 50%;
          transform: translate(-50%, -50%);
          stroke: currentColor;
        }
        .vx-close__label { text-transform: uppercase; position: relative; }

        /* ── HERO ── */
        .vx-hero {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 48px 60px;
          text-align: center;
        }
        .vx-hero__eyebrow {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 32px;
          animation: fadeUp 0.8s var(--ease-luxury) 0.1s both;
        }
        .vx-eyebrow-text {
          font-size: 0.58rem;
          letter-spacing: 6px;
          color: var(--gold);
          text-transform: uppercase;
          font-weight: 600;
        }
        .vx-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold-border), transparent);
          min-width: 60px;
        }
        .vx-hero__title {
          font-family: var(--font-serif);
          font-size: clamp(3rem, 8vw, 7rem);
          font-weight: 300;
          letter-spacing: 14px;
          line-height: 1;
          background: linear-gradient(135deg, #fff 0%, var(--gold) 40%, var(--gold-light) 55%, var(--gold) 70%, #fff 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 8s ease infinite, fadeUp 1s var(--ease-luxury) 0.2s both;
        }
        @keyframes gradientShift {
          0%,100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .vx-hero__tagline {
          margin-top: 20px;
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 1.1rem;
          color: var(--text-muted);
          letter-spacing: 2px;
          animation: fadeUp 0.8s var(--ease-luxury) 0.35s both;
        }

        /* ── SPEC CHIPS ── */
        .vx-chips {
          display: flex;
          align-items: center;
          gap: 0;
          margin-top: 40px;
          background: rgba(10,10,10,0.9);
          border: 1px solid var(--gold-border);
          backdrop-filter: blur(20px);
          animation: fadeUp 0.8s var(--ease-luxury) 0.5s both;
          box-shadow: 0 0 40px rgba(212,175,55,0.1);
        }
        .vx-chip {
          padding: 20px 48px;
          display: flex;
          align-items: baseline;
          gap: 6px;
        }
        .vx-chip__value {
          font-family: var(--font-serif);
          font-size: 2.8rem;
          font-weight: 300;
          background: linear-gradient(135deg, #fff, var(--gold));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
        }
        .vx-chip__unit {
          font-size: 0.65rem;
          letter-spacing: 3px;
          color: var(--gold);
          font-weight: 500;
          align-self: flex-end;
          padding-bottom: 6px;
        }
        .vx-chip__divider {
          width: 1px;
          height: 60px;
          background: var(--gold-border);
        }

        /* ── STAGE ── */
        .vx-stage {
          position: relative;
          z-index: 1;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 48px 80px;
          width: 100%;
          flex: 1;
        }

        /* ── TABS ── */
        .vx-tabs {
          display: flex;
          gap: 0;
          border-bottom: 1px solid var(--gold-border);
          margin-bottom: 60px;
          animation: fadeUp 0.8s var(--ease-luxury) 0.6s both;
        }
        .vx-tab {
          position: relative;
          background: none;
          border: none;
          padding: 20px 40px;
          cursor: pointer;
          font-family: var(--font-sans);
          font-size: 0.6rem;
          font-weight: 500;
          letter-spacing: 4px;
          color: var(--text-muted);
          text-transform: uppercase;
          transition: color 0.4s ease;
          overflow: hidden;
        }
        .vx-tab:hover { color: rgba(212,175,55,0.8); }
        .vx-tab--active { color: var(--gold); }
        .vx-tab__bar {
          position: absolute;
          bottom: -1px;
          left: 0; right: 0;
          height: 2px;
          background: var(--gold);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s var(--ease-luxury);
        }
        .vx-tab--active .vx-tab__bar { transform: scaleX(1); }

        /* ── PANEL ── */
        .vx-panel {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: start;
          animation: fadeUp 0.6s var(--ease-luxury) both;
        }
        .vx-panel__info--full {
          grid-column: 1 / -1;
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── IMAGE FRAME ── */
        .vx-panel__visual { position: relative; }
        .vx-frame {
          position: relative;
          background: #050505;
          border: 1px solid var(--gold-border);
          padding: 8px;
          overflow: hidden;
        }
        .vx-frame__corner {
          position: absolute;
          width: 28px; height: 28px;
          border-color: var(--gold);
          border-style: solid;
          z-index: 10;
          transition: width 0.4s ease, height 0.4s ease;
        }
        .vx-frame:hover .vx-frame__corner { width: 40px; height: 40px; }
        .vx-frame__corner--tl { top: 0; left: 0; border-width: 2px 0 0 2px; }
        .vx-frame__corner--tr { top: 0; right: 0; border-width: 2px 2px 0 0; }
        .vx-frame__corner--bl { bottom: 0; left: 0; border-width: 0 0 2px 2px; }
        .vx-frame__corner--br { bottom: 0; right: 0; border-width: 0 2px 2px 0; }
        .vx-frame__img {
          display: block;
          width: 100%;
          height: 420px;
          object-fit: cover;
          opacity: 0;
          transform: scale(1.04);
          transition: opacity 1s ease, transform 1.2s var(--ease-luxury);
        }
        .vx-frame__img--loaded {
          opacity: 1;
          transform: scale(1);
        }
        .vx-frame__sheen {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(212,175,55,0.04) 0%, transparent 60%);
          pointer-events: none;
        }

        /* ── INFO PANEL ── */
        .vx-panel__info {
          padding: 20px 0;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .vx-panel__subtitle {
          font-size: 0.58rem;
          letter-spacing: 5px;
          color: var(--gold);
          text-transform: uppercase;
          font-weight: 600;
        }
        .vx-panel__title {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 3.5vw, 3rem);
          font-weight: 300;
          line-height: 1.15;
          color: var(--text);
          letter-spacing: 2px;
        }
        .vx-panel__rule {
          width: 60px;
          height: 1px;
          background: linear-gradient(90deg, var(--gold), transparent);
        }
        .vx-panel__info--full .vx-panel__rule {
          margin: 0 auto;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
          width: 120px;
        }
        .vx-panel__body {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          line-height: 1.85;
          color: rgba(255,255,255,0.7);
          font-weight: 300;
        }

        /* ── STATS ── */
        .vx-stats {
          display: flex;
          gap: 40px;
          margin-top: 10px;
          padding-top: 30px;
          border-top: 1px solid var(--gold-border);
        }
        .vx-stat {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .vx-stat__value {
          font-family: var(--font-serif);
          font-size: 2.5rem;
          font-weight: 300;
          background: linear-gradient(135deg, #fff, var(--gold));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
        }
        .vx-stat__unit {
          font-size: 0.6rem;
          letter-spacing: 3px;
          color: var(--gold);
          font-weight: 600;
        }
        .vx-stat__label {
          font-size: 0.58rem;
          letter-spacing: 2px;
          color: var(--text-muted);
          text-transform: uppercase;
          margin-top: 4px;
        }

        /* ── FEATURES ── */
        .vx-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-top: 10px;
          padding-top: 24px;
          border-top: 1px solid var(--gold-border);
        }
        .vx-feature {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 0.75rem;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.7);
          transition: color 0.3s ease;
        }
        .vx-feature:hover { color: var(--gold); }
        .vx-feature__diamond {
          color: var(--gold);
          font-size: 0.45rem;
          flex-shrink: 0;
          transition: transform 0.4s ease;
        }
        .vx-feature:hover .vx-feature__diamond { transform: rotate(45deg) scale(1.3); }

        /* ── FOOTER ── */
        .vx-footer {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          padding: 32px 48px;
          border-top: 1px solid var(--gold-border);
          flex-shrink: 0;
        }
        .vx-footer__mark {
          color: var(--gold);
          font-size: 0.5rem;
          opacity: 0.6;
        }
        .vx-footer__copy {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 0.85rem;
          color: var(--text-muted);
          letter-spacing: 3px;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .vx-topbar { padding: 0 24px; }
          .vx-topbar__vehicle { display: none; }
          .vx-hero { padding: 60px 24px 40px; }
          .vx-hero__title { letter-spacing: 6px; }
          .vx-stage { padding: 0 24px 60px; }
          .vx-panel { grid-template-columns: 1fr; gap: 40px; }
          .vx-frame__img { height: 280px; }
          .vx-tab { padding: 16px 20px; letter-spacing: 2px; }
          .vx-chip { padding: 16px 28px; }
          .vx-chip__value { font-size: 2rem; }
        }
      `}</style>
    </div>
  );
}
