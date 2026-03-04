import { useState } from "react";

import BugattiImg  from "../../assets/Bugatti Chiron black side view.jpg";
import FerrariImg  from "../../assets/Ferrari Roma front view dark.jpg";
import PaganiImg   from "../../assets/Pagani Huayra carbon fiber.jpg";
import RollsImg    from "../../assets/Rolls Royce Phantom black luxury.jpg";
import SupraImg    from "../../assets/Toyota Supra MK5.png";
import KoenigImg   from "../../assets/Koenigsegg Regera hypercar.jpg";
import LamboImg    from "../../assets/Lamborghini Veneno side.jpg";
import AstonImg    from "../../assets/Aston Martin Valkyrie F1.jpg";
import HennImg     from "../../assets/Hennessey Venom F5 front.jpg";

const CAR_PHOTOS = {
  chiron:   { img: BugattiImg,  pos: "center 40%" },
  roma:     { img: FerrariImg,  pos: "center 60%" },
  huayra:   { img: PaganiImg,   pos: "center 50%" },
  phantom:  { img: RollsImg,    pos: "center 55%" },
  supra:    { img: SupraImg,    pos: "center 55%" },
  regera:   { img: KoenigImg,   pos: "center 50%" },
  veneno:   { img: LamboImg,    pos: "center 45%" },
  valkyrie: { img: AstonImg,    pos: "center 50%" },
  venom:    { img: HennImg,     pos: "center 45%" },
};

const INVENTORY_DATA = {
  chiron:   { title: "5 Units Available",  description: "The pinnacle of automotive engineering featuring a quad-turbocharged W16.", badge: "HYPERCAR",         origin: "Molsheim, France",     rarity: "Ultra Rare"       },
  roma:     { title: "15 Units Available", description: "A contemporary representation of 'La Nuova Dolce Vita' with a high-performance V8.", badge: "GT COUPÉ",  origin: "Maranello, Italy",     rarity: "Limited"          },
  huayra:   { title: "3 Units Available",  description: "A masterful fusion of art and science, handcrafted with an AMG-sourced V12.", badge: "MASTERPIECE",    origin: "San Cesario, Italy",   rarity: "Extremely Rare"   },
  phantom:  { title: "5 Units Available",  description: "The definitive symbol of opulence, offering an effortless 'Magic Carpet Ride'.", badge: "ULTRA LUXURY", origin: "Goodwood, England",    rarity: "Exclusive"        },
  supra:    { title: "9 Units Available",  description: "Precision-engineered sports performance featuring a signature straight-six turbo.", badge: "SPORTS CAR",  origin: "Toyota City, Japan",   rarity: "Available"        },
  regera:   { title: "1 Unit Available",   description: "An innovative plug-in hybrid megacar utilizing the Direct Drive system.", badge: "MEGACAR",             origin: "Ängelholm, Sweden",    rarity: "One of One"       },
  veneno:   { title: "2 Units Available",  description: "An ultra-exclusive tribute to aeronautical design with a naturally aspirated V12.", badge: "COLLECTOR'S PIECE", origin: "Sant'Agata, Italy", rarity: "Museum Grade"   },
  valkyrie: { title: "8 Units Available",  description: "Born from Red Bull Racing, this F1-inspired masterpiece delivers raw performance.", badge: "TRACK WEAPON", origin: "Gaydon, England",     rarity: "Limited Production" },
  venom:    { title: "2 Units Available",  description: "Built for extreme speed with over 1,800 horsepower.", badge: "SPEED RECORD",                             origin: "Texas, USA",           rarity: "Ultra Exclusive"  },
};

const CAR_NAMES = {
  chiron: "Bugatti Chiron", roma: "Ferrari Roma", huayra: "Pagani Huayra",
  phantom: "Rolls-Royce Phantom", supra: "Toyota Supra MK5", regera: "Koenigsegg Regera",
  veneno: "Lamborghini Veneno", valkyrie: "Aston Martin Valkyrie", venom: "Hennessey Venom F5",
};

export default function InventorySpecs() {
  const [selectedId, setSelectedId] = useState(null);
  const selectedItem = selectedId ? INVENTORY_DATA[selectedId] : null;
  const selectedPhoto = selectedId ? CAR_PHOTOS[selectedId] : null;
  const keys = Object.keys(INVENTORY_DATA);

  return (
    <div className="inv-root">

      {/* ── HERO ── */}
      <div className="inv-hero">
        <div className="inv-hero-deco tl" /><div className="inv-hero-deco tr" />
        <div className="inv-hero-inner">
          <div className="inv-badge-row">
            <span className="inv-badge-line" />
            <span className="inv-badge-txt">CURATED COLLECTION</span>
            <span className="inv-badge-line" />
          </div>
          <h1 className="inv-title">Private Reserve</h1>
          <p className="inv-sub">Exclusive Automotive Masterpieces</p>
        </div>
      </div>

      {/* ── GALLERY ── */}
      <div className="inv-gallery">
        <div className="inv-gallery-hdr">
          <span className="inv-gal-label">Available Inventory</span>
          <span className="inv-gal-count">{keys.length} Exceptional Vehicles</span>
        </div>

        <div className="inv-grid">
          {keys.map((key, idx) => {
            const photo = CAR_PHOTOS[key];
            const isSelected = selectedId === key;
            return (
              <button
                key={key}
                className={`inv-card${isSelected ? " inv-card--sel" : ""}`}
                onClick={() => setSelectedId(isSelected ? null : key)}
                style={{ animationDelay: `${idx * 0.07}s` }}
              >
                {/* Foto de fondo */}
                <div className="inv-card-bg"
                  style={{ backgroundImage: `url(${photo.img})`, backgroundPosition: photo.pos }} />
                {/* Gradiente oscuro */}
                <div className="inv-card-overlay" />

                {/* Esquinas doradas */}
                <div className="inv-corner tl" /><div className="inv-corner tr" />
                <div className="inv-corner bl" /><div className="inv-corner br" />

                {/* Número */}
                <div className="inv-card-num">{String(idx + 1).padStart(2, "0")}</div>

                {/* Texto */}
                <div className="inv-card-body">
                  <div className="inv-card-badge">{INVENTORY_DATA[key].badge}</div>
                  <h3 className="inv-card-name">{CAR_NAMES[key]}</h3>
                  <div className="inv-card-div" />
                  <div className="inv-card-origin">{INVENTORY_DATA[key].origin}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── SHOWCASE ── */}
      <div className="inv-showcase">
        {selectedItem ? (
          <div className="inv-showcase-inner" key={selectedId}>

            {/* Panel izquierdo — foto grande */}
            <div className="inv-photo-panel">
              <img
                src={selectedPhoto.img}
                alt={CAR_NAMES[selectedId]}
                style={{ objectPosition: selectedPhoto.pos }}
                className="inv-photo-img"
              />
              <div className="inv-photo-overlay" />
              <div className="inv-photo-badge">{INVENTORY_DATA[selectedId].badge}</div>
              <div className="inv-photo-footer">
                <div className="inv-photo-cat">{INVENTORY_DATA[selectedId].badge}</div>
                <div className="inv-photo-name">{CAR_NAMES[selectedId]}</div>
              </div>
            </div>

            {/* Panel derecho — info */}
            <div className="inv-info-panel">
              <div className="inv-info-hdr">
                <span className="inv-info-label">SELECTED VEHICLE</span>
                <div className="inv-info-orn" />
              </div>

              <h2 className="inv-info-title">{CAR_NAMES[selectedId]}</h2>

              <div className="inv-status-row">
                <div className="inv-status-item">
                  <span className="inv-sl">Availability</span>
                  <span className="inv-sv">{selectedItem.title}</span>
                </div>
                <div className="inv-status-div" />
                <div className="inv-status-item">
                  <span className="inv-sl">Rarity</span>
                  <span className="inv-sv inv-sv--gold">{selectedItem.rarity}</span>
                </div>
              </div>

              <div className="inv-desc-box">
                <div className="inv-quote">"</div>
                <p className="inv-desc-txt">{selectedItem.description}</p>
              </div>

              <div className="inv-meta">
                {[
                  { label: "Classification", value: selectedItem.badge },
                  { label: "Heritage",       value: selectedItem.origin },
                ].map(m => (
                  <div className="inv-meta-row" key={m.label}>
                    <span className="inv-meta-icon">◆</span>
                    <div>
                      <div className="inv-meta-label">{m.label}</div>
                      <div className="inv-meta-val">{m.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="inv-cta">
                <span className="inv-cta-shine" />
                <span className="inv-cta-txt">REQUEST PRIVATE VIEWING</span>
                <span className="inv-cta-arrow">→</span>
              </button>

              {/* Número de lote */}
              <div className="inv-lot">
                <div className="inv-lot-num">
                  {String(keys.indexOf(selectedId) + 1).padStart(2, "0")}
                </div>
                <div className="inv-lot-label">LOT NUMBER</div>
              </div>
            </div>

          </div>
        ) : (
          <div className="inv-placeholder">
            <div className="inv-ph-icon">◇</div>
            <p className="inv-ph-txt">Select a vehicle to view complete details</p>
            <div className="inv-ph-sub">Exclusive inventory awaiting your consideration</div>
          </div>
        )}
      </div>

      {/* ── FOOTER ── */}
      <div className="inv-footer">
        <div className="inv-footer-line" />
        <div className="inv-footer-txt">Curated Excellence</div>
        <div className="inv-footer-line" />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Montserrat:wght@300;400;500;600&display=swap');

        .inv-root {
          background: #000;
          min-height: 100vh;
          color: #fff;
          font-family: 'Montserrat', sans-serif;
          padding-bottom: 120px;
        }

        /* HERO */
        .inv-hero {
          position: relative;
          padding: 130px 40px 110px;
          text-align: center;
          background: radial-gradient(ellipse at top, rgba(218,165,32,0.06) 0%, transparent 65%);
          overflow: hidden;
        }
        .inv-hero-deco {
          position: absolute;
          width: 220px; height: 220px;
          border: 1px solid rgba(218,165,32,0.12);
          transform: rotate(45deg);
        }
        .inv-hero-deco.tl { top: -110px; left: -110px; }
        .inv-hero-deco.tr { top: -110px; right: -110px; }
        .inv-hero-inner { position: relative; z-index: 2; }

        .inv-badge-row {
          display: inline-flex; align-items: center; gap: 18px;
          margin-bottom: 28px; animation: invFadeDown 0.9s ease both;
        }
        .inv-badge-line {
          width: 50px; height: 1px;
          background: linear-gradient(to right, transparent, #DAA520, transparent);
        }
        .inv-badge-txt {
          font-size: 0.68rem; letter-spacing: 5px; color: #DAA520; font-weight: 600;
        }

        .inv-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3.5rem, 8vw, 6.5rem);
          font-weight: 300; letter-spacing: 10px; margin-bottom: 18px;
          background: linear-gradient(135deg, #fff 30%, #DAA520 75%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          animation: invTitleIn 1.4s ease 0.2s both;
        }
        .inv-sub {
          font-size: 1rem; letter-spacing: 4px; color: #777; font-weight: 300;
          animation: invFadeIn 1.8s ease 0.5s both;
        }

        /* GALLERY */
        .inv-gallery {
          max-width: 1500px; margin: 0 auto; padding: 60px 40px 0;
        }
        .inv-gallery-hdr {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 50px; padding-bottom: 18px;
          border-bottom: 1px solid rgba(218,165,32,0.2);
        }
        .inv-gal-label { font-size: 0.75rem; letter-spacing: 3px; color: #DAA520; font-weight: 600; }
        .inv-gal-count { font-size: 0.85rem; color: #555; letter-spacing: 2px; }

        /* GRID */
        .inv-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        /* CARD */
        .inv-card {
          position: relative;
          height: 260px;
          overflow: hidden;
          cursor: pointer;
          border: 1px solid rgba(218,165,32,0.18);
          text-align: left;
          background: #0a0a0a;
          opacity: 0;
          animation: invCardIn 0.6s ease forwards;
          transition: border-color 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease;
        }
        .inv-card:hover {
          border-color: rgba(218,165,32,0.5);
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(218,165,32,0.12);
        }
        .inv-card--sel {
          border-color: #DAA520 !important;
          box-shadow: 0 0 0 1px rgba(218,165,32,0.3), 0 20px 50px rgba(218,165,32,0.15) !important;
        }

        /* Foto fondo */
        .inv-card-bg {
          position: absolute; inset: 0;
          background-size: cover;
          transition: transform 0.7s ease;
        }
        .inv-card:hover .inv-card-bg,
        .inv-card--sel .inv-card-bg {
          transform: scale(1.06);
        }

        /* Overlay gradiente */
        .inv-card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.15) 0%,
            rgba(0,0,0,0.5) 50%,
            rgba(0,0,0,0.88) 100%
          );
          transition: background 0.4s ease;
        }
        .inv-card:hover .inv-card-overlay {
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.05) 0%,
            rgba(0,0,0,0.35) 50%,
            rgba(0,0,0,0.82) 100%
          );
        }

        /* Esquinas */
        .inv-corner {
          position: absolute; width: 18px; height: 18px;
          border-color: #DAA520; border-style: solid;
          opacity: 0; transition: opacity 0.4s ease; z-index: 3;
        }
        .inv-card:hover .inv-corner,
        .inv-card--sel .inv-corner { opacity: 1; }
        .inv-corner.tl { top:10px; left:10px;  border-width: 1px 0 0 1px; }
        .inv-corner.tr { top:10px; right:10px; border-width: 1px 1px 0 0; }
        .inv-corner.bl { bottom:10px; left:10px;  border-width: 0 0 1px 1px; }
        .inv-corner.br { bottom:10px; right:10px; border-width: 0 1px 1px 0; }

        .inv-card-num {
          position: absolute; top: 12px; right: 16px; z-index: 3;
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.8rem; font-weight: 100;
          color: rgba(218,165,32,0.22); line-height: 1;
        }
        .inv-card--sel .inv-card-num { color: rgba(218,165,32,0.45); }

        .inv-card-body {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 20px 22px; z-index: 3;
        }
        .inv-card-badge {
          font-size: 0.55rem; letter-spacing: 2.5px; color: #DAA520;
          font-weight: 600; margin-bottom: 8px;
        }
        .inv-card-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem; font-weight: 400; color: #fff;
          letter-spacing: 1px; line-height: 1.2; margin-bottom: 0;
          text-shadow: 0 2px 12px rgba(0,0,0,0.9);
        }
        .inv-card-div {
          width: 40px; height: 1px;
          background: linear-gradient(to right, #DAA520, transparent);
          margin: 10px 0;
        }
        .inv-card-origin {
          font-size: 0.72rem; color: rgba(255,255,255,0.55); letter-spacing: 1px;
        }

        /* SHOWCASE */
        .inv-showcase {
          max-width: 1500px; margin: 80px auto 0; padding: 0 40px;
          min-height: 550px;
        }
        .inv-showcase-inner {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 0;
          border: 1px solid rgba(218,165,32,0.18);
          animation: invShowIn 0.7s ease;
        }

        /* FOTO PANEL */
        .inv-photo-panel {
          position: relative;
          height: 600px;
          overflow: hidden;
          background: #050505;
        }
        .inv-photo-img {
          width: 100%; height: 100%;
          object-fit: cover;
          filter: brightness(0.88) contrast(1.06) saturate(1.04);
          animation: invFadeIn 0.5s ease;
        }
        .inv-photo-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            105deg,
            rgba(0,0,0,0.0) 40%,
            rgba(0,0,0,0.6) 100%
          );
        }
        .inv-photo-badge {
          position: absolute; top: 22px; left: 22px;
          background: rgba(0,0,0,0.65);
          border: 1px solid rgba(218,165,32,0.4);
          padding: 0.3rem 0.9rem;
          font-size: 0.5rem; letter-spacing: 3px; color: #DAA520; font-weight: 600;
        }
        .inv-photo-footer {
          position: absolute; bottom: 28px; left: 28px;
        }
        .inv-photo-cat {
          font-size: 0.5rem; letter-spacing: 4px; color: #DAA520; margin-bottom: 6px;
        }
        .inv-photo-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.4rem; color: #fff; font-weight: 300; line-height: 1;
          text-shadow: 0 2px 20px rgba(0,0,0,0.8);
        }

        /* INFO PANEL */
        .inv-info-panel {
          padding: 50px 48px;
          background: rgba(8,8,8,0.98);
          border-left: 1px solid rgba(218,165,32,0.12);
          display: flex; flex-direction: column;
          position: relative; overflow: hidden;
        }
        .inv-info-panel::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(ellipse at top right, rgba(218,165,32,0.04), transparent 70%);
          pointer-events: none;
        }

        .inv-info-hdr {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 28px;
        }
        .inv-info-label {
          font-size: 0.62rem; letter-spacing: 3px; color: #DAA520; font-weight: 600;
        }
        .inv-info-orn {
          width: 50px; height: 1px;
          background: linear-gradient(to right, transparent, #DAA520);
        }

        .inv-info-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.8rem; font-weight: 300; letter-spacing: 2px;
          margin-bottom: 30px; line-height: 1.15; color: #fff;
        }

        .inv-status-row {
          display: flex; gap: 24px; margin-bottom: 30px;
          padding: 22px 0;
          border-top: 1px solid rgba(218,165,32,0.15);
          border-bottom: 1px solid rgba(218,165,32,0.15);
        }
        .inv-status-item { flex: 1; display: flex; flex-direction: column; gap: 8px; }
        .inv-sl { font-size: 0.6rem; letter-spacing: 2px; color: #666; text-transform: uppercase; }
        .inv-sv { font-size: 1.1rem; color: #ddd; font-weight: 300; letter-spacing: 0.5px; }
        .inv-sv--gold { color: #DAA520; }
        .inv-status-div {
          width: 1px;
          background: linear-gradient(to bottom, transparent, rgba(218,165,32,0.25), transparent);
        }

        .inv-desc-box {
          position: relative;
          padding: 20px 0 20px 28px;
          border-left: 2px solid rgba(218,165,32,0.6);
          margin-bottom: 28px;
        }
        .inv-quote {
          position: absolute; top: 0; left: -12px;
          font-size: 3.5rem; color: rgba(218,165,32,0.25);
          font-family: 'Cormorant Garamond', serif; line-height: 1;
        }
        .inv-desc-txt {
          font-size: 0.92rem; line-height: 1.85; color: #aaa; font-weight: 300; letter-spacing: 0.3px;
        }

        .inv-meta { display: flex; flex-direction: column; gap: 16px; margin-bottom: 32px; }
        .inv-meta-row { display: flex; align-items: flex-start; gap: 14px; }
        .inv-meta-icon { color: #DAA520; font-size: 0.7rem; margin-top: 4px; }
        .inv-meta-label { font-size: 0.6rem; letter-spacing: 2px; color: #555; text-transform: uppercase; margin-bottom: 3px; }
        .inv-meta-val { font-size: 0.95rem; color: #ddd; letter-spacing: 0.5px; }

        .inv-cta {
          width: 100%; padding: 16px 32px;
          background: transparent;
          border: 1px solid rgba(218,165,32,0.5);
          color: #DAA520; font-family: 'Montserrat', sans-serif;
          font-weight: 600; font-size: 0.65rem; letter-spacing: 3px;
          cursor: pointer; position: relative; overflow: hidden;
          transition: all 0.4s ease;
          display: flex; align-items: center; justify-content: center; gap: 12px;
          margin-bottom: 28px;
        }
        .inv-cta-shine {
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(218,165,32,0.25), transparent);
          transform: translateX(-100%); transition: transform 0.55s ease;
        }
        .inv-cta:hover .inv-cta-shine { transform: translateX(100%); }
        .inv-cta:hover { background: #DAA520; color: #000; box-shadow: 0 8px 25px rgba(218,165,32,0.25); }
        .inv-cta-txt, .inv-cta-arrow { position: relative; z-index: 1; }
        .inv-cta:hover .inv-cta-arrow { transform: translateX(4px); }
        .inv-cta-arrow { transition: transform 0.3s ease; }

        .inv-lot {
          text-align: center; margin-top: auto; padding-top: 20px;
          border-top: 1px solid rgba(218,165,32,0.08);
        }
        .inv-lot-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 4rem; font-weight: 300; color: rgba(218,165,32,0.2);
          line-height: 1;
        }
        .inv-lot-label {
          font-size: 0.55rem; letter-spacing: 3px; color: #444; margin-top: 4px;
        }

        /* PLACEHOLDER */
        .inv-placeholder {
          text-align: center; padding: 120px 40px; animation: invFadeIn 0.8s ease;
        }
        .inv-ph-icon { font-size: 3.5rem; color: rgba(218,165,32,0.15); margin-bottom: 24px; }
        .inv-ph-txt { font-size: 1.2rem; color: #666; margin-bottom: 12px; letter-spacing: 2px; font-weight: 300; }
        .inv-ph-sub { font-size: 0.85rem; color: #3a3a3a; letter-spacing: 1px; }

        /* FOOTER */
        .inv-footer {
          display: flex; align-items: center; justify-content: center;
          gap: 36px; margin-top: 120px; padding: 0 40px;
        }
        .inv-footer-line {
          flex: 1; max-width: 200px; height: 1px;
          background: linear-gradient(to right, transparent, #DAA520, transparent);
        }
        .inv-footer-txt {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem; font-style: italic; color: #DAA520; letter-spacing: 2px;
        }

        /* ANIMATIONS */
        @keyframes invFadeIn  { from { opacity:0 }             to { opacity:1 } }
        @keyframes invFadeDown { from { opacity:0; transform:translateY(-16px) } to { opacity:1; transform:none } }
        @keyframes invTitleIn { from { opacity:0; letter-spacing:20px } to { opacity:1; letter-spacing:10px } }
        @keyframes invCardIn  { to   { opacity:1 } }
        @keyframes invShowIn  {
          from { opacity:0; transform:translateY(24px) }
          to   { opacity:1; transform:none }
        }

        /* RESPONSIVE */
        @media (max-width: 1100px) {
          .inv-grid { grid-template-columns: repeat(2,1fr); }
          .inv-showcase-inner { grid-template-columns: 1fr; }
          .inv-photo-panel { height: 420px; }
        }
        @media (max-width: 680px) {
          .inv-grid { grid-template-columns: 1fr; }
          .inv-info-panel { padding: 36px 24px; }
          .inv-info-title { font-size: 2.2rem; }
          .inv-status-row { flex-direction: column; }
          .inv-status-div { width:100%; height:1px; }
        }
      `}</style>
    </div>
  );
}
