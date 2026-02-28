import { useState } from "react";

const INVENTORY_DATA = {
  chiron: {
    title: "5 Units Available",
    description:
      "The pinnacle of automotive engineering featuring a quad-turbocharged W16.",
    badge: "HYPERCAR",
    origin: "Molsheim, France",
    rarity: "Ultra Rare",
  },
  roma: {
    title: "15 Units Available",
    description:
      "A contemporary representation of 'La Nuova Dolce Vita' with a high-performance V8.",
    badge: "GT COUPÉ",
    origin: "Maranello, Italy",
    rarity: "Limited",
  },
  huayra: {
    title: "3 Units Available",
    description:
      "A masterful fusion of art and science, handcrafted with an AMG-sourced V12.",
    badge: "MASTERPIECE",
    origin: "San Cesario, Italy",
    rarity: "Extremely Rare",
  },
  phantom: {
    title: "5 Units Available",
    description:
      "The definitive symbol of opulence, offering an effortless 'Magic Carpet Ride'.",
    badge: "ULTRA LUXURY",
    origin: "Goodwood, England",
    rarity: "Exclusive",
  },
  supra: {
    title: "9 Units Available",
    description:
      "Precision-engineered sports performance featuring a signature straight-six turbo.",
    badge: "SPORTS CAR",
    origin: "Toyota City, Japan",
    rarity: "Available",
  },
  regera: {
    title: "1 Unit Available",
    description:
      "An innovative plug-in hybrid megacar utilizing the Direct Drive system.",
    badge: "MEGACAR",
    origin: "Ängelholm, Sweden",
    rarity: "One of One",
  },
  veneno: {
    title: "2 Units Available",
    description:
      "An ultra-exclusive tribute to aeronautical design with a naturally aspirated V12.",
    badge: "COLLECTOR'S PIECE",
    origin: "Sant'Agata, Italy",
    rarity: "Museum Grade",
  },
  valkyrie: {
    title: "8 Units Available",
    description:
      "Born from Red Bull Racing, this F1-inspired masterpiece delivers raw performance.",
    badge: "TRACK WEAPON",
    origin: "Gaydon, England",
    rarity: "Limited Production",
  },
  venom: {
    title: "2 Units Available",
    description: "Built for extreme speed with over 1,800 horsepower.",
    badge: "SPEED RECORD",
    origin: "Texas, USA",
    rarity: "Ultra Exclusive",
  },
};

const CAR_NAMES = {
  chiron: "Bugatti Chiron",
  roma: "Ferrari Roma",
  huayra: "Pagani Huayra",
  phantom: "Rolls-Royce Phantom",
  supra: "Toyota Supra MK5",
  regera: "Koenigsegg Regera",
  veneno: "Lamborghini Veneno",
  valkyrie: "Aston Martin Valkyrie",
  venom: "Hennessey Venom F5",
};

export default function InventorySpecs() {
  const [selectedId, setSelectedId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const selectedItem = selectedId ? INVENTORY_DATA[selectedId] : null;

  return (
    <div className="luxury-inventory-container">
      {/* HERO HEADER */}
      <div className="hero-section">
        <div className="hero-ornament top-left" />
        <div className="hero-ornament top-right" />
        <div className="hero-content">
          <div className="collection-badge">
            <span className="badge-line" />
            <span className="badge-text">CURATED COLLECTION</span>
            <span className="badge-line" />
          </div>
          <h1 className="main-title">Private Reserve</h1>
          <p className="main-subtitle">Exclusive Automotive Masterpieces</p>
        </div>
      </div>

      {/* SELECTION GALLERY */}
      <div className="gallery-wrapper">
        <div className="gallery-header">
          <div className="gallery-label">Available Inventory</div>
          <div className="gallery-count">
            {Object.keys(INVENTORY_DATA).length} Exceptional Vehicles
          </div>
        </div>

        <div className="vehicles-grid">
          {Object.keys(INVENTORY_DATA).map((key, index) => {
            const isSelected = selectedId === key;
            const isHovered = hoveredId === key;

            return (
              <button
                key={key}
                className={`vehicle-card ${isSelected ? "selected" : ""} ${isHovered ? "hovered" : ""}`}
                onClick={() => setSelectedId(key)}
                onMouseEnter={() => setHoveredId(key)}
                onMouseLeave={() => setHoveredId(null)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="card-corner tl" />
                <div className="card-corner tr" />
                <div className="card-corner bl" />
                <div className="card-corner br" />

                <div className="card-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="card-content">
                  <div className="card-badge">{INVENTORY_DATA[key].badge}</div>
                  <h3 className="card-title">{CAR_NAMES[key]}</h3>
                  <div className="card-divider" />
                  <div className="card-origin">
                    {INVENTORY_DATA[key].origin}
                  </div>
                </div>

                <div className="card-hover-overlay" />
              </button>
            );
          })}
        </div>
      </div>

      {/* DETAILED SHOWCASE */}
      <div className="showcase-section">
        {selectedItem ?
          <div className="showcase-content">
            {/* Left Panel - Information */}
            <div className="info-panel">
              <div className="panel-header">
                <span className="panel-label">SELECTED VEHICLE</span>
                <div className="panel-ornament" />
              </div>

              <h2 className="showcase-title">{CAR_NAMES[selectedId]}</h2>

              <div className="status-grid">
                <div className="status-item">
                  <span className="status-label">Availability</span>
                  <span className="status-value">{selectedItem.title}</span>
                </div>
                <div className="status-divider" />
                <div className="status-item">
                  <span className="status-label">Rarity</span>
                  <span className="status-value rarity">
                    {selectedItem.rarity}
                  </span>
                </div>
              </div>

              <div className="description-box">
                <div className="quote-accent">"</div>
                <p className="description-text">{selectedItem.description}</p>
              </div>

              <div className="metadata-grid">
                <div className="metadata-item">
                  <div className="metadata-icon">◆</div>
                  <div>
                    <div className="metadata-label">Classification</div>
                    <div className="metadata-value">{selectedItem.badge}</div>
                  </div>
                </div>
                <div className="metadata-item">
                  <div className="metadata-icon">◆</div>
                  <div>
                    <div className="metadata-label">Heritage</div>
                    <div className="metadata-value">{selectedItem.origin}</div>
                  </div>
                </div>
              </div>

              <button className="inquiry-button">
                <span className="button-shine" />
                <span className="button-text">REQUEST PRIVATE VIEWING</span>
                <span className="button-arrow">→</span>
              </button>
            </div>

            {/* Right Panel - Visual Accent */}
            <div className="visual-panel">
              <div className="visual-frame">
                <div className="frame-line top" />
                <div className="frame-line right" />
                <div className="frame-line bottom" />
                <div className="frame-line left" />

                <div className="visual-content">
                  <div className="visual-number">
                    {String(
                      Object.keys(INVENTORY_DATA).indexOf(selectedId) + 1,
                    ).padStart(2, "0")}
                  </div>
                  <div className="visual-label">Lot Number</div>

                  <div className="seal-container">
                    <div className="seal-outer">
                      <div className="seal-inner">
                        <div className="seal-text">CERTIFIED</div>
                      </div>
                    </div>
                  </div>

                  <div className="provenance-box">
                    <div className="provenance-label">PROVENANCE</div>
                    <div className="provenance-value">
                      Authenticated Collection
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        : <div className="placeholder-state">
            <div className="placeholder-icon">◇</div>
            <p className="placeholder-text">
              Select a vehicle to view complete details
            </p>
            <div className="placeholder-subtitle">
              Exclusive inventory awaiting your consideration
            </div>
          </div>
        }
      </div>

      {/* SIGNATURE FOOTER */}
      <div className="signature-section">
        <div className="signature-line" />
        <div className="signature-text">Curated Excellence</div>
        <div className="signature-line" />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=Raleway:wght@300;400;500;700;900&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .luxury-inventory-container {
          background: linear-gradient(180deg, #000000 0%, #0d0d0d 50%, #000000 100%);
          min-height: 100vh;
          color: #ffffff;
          font-family: 'Raleway', sans-serif;
          padding-bottom: 100px;
        }

        /* HERO SECTION */
        .hero-section {
          position: relative;
          padding: 120px 40px;
          text-align: center;
          background: radial-gradient(ellipse at top, rgba(218, 165, 32, 0.05) 0%, transparent 70%);
          overflow: hidden;
        }

        .hero-ornament {
          position: absolute;
          width: 200px;
          height: 200px;
          border: 1px solid rgba(218, 165, 32, 0.15);
          transform: rotate(45deg);
        }

        .hero-ornament.top-left {
          top: -100px;
          left: -100px;
        }

        .hero-ornament.top-right {
          top: -100px;
          right: -100px;
        }

        .hero-content {
          position: relative;
          z-index: 10;
        }

        .collection-badge {
          display: inline-flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 30px;
          animation: fadeInDown 1s ease-out;
        }

        .badge-line {
          width: 50px;
          height: 1px;
          background: linear-gradient(to right, transparent, #DAA520, transparent);
        }

        .badge-text {
          font-size: 0.7rem;
          letter-spacing: 5px;
          color: #DAA520;
          font-weight: 600;
        }

        .main-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3.5rem, 8vw, 6rem);
          font-weight: 300;
          letter-spacing: 10px;
          margin-bottom: 20px;
          background: linear-gradient(135deg, #ffffff 30%, #DAA520 70%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: titleReveal 1.5s ease-out 0.3s both;
        }

        .main-subtitle {
          font-size: 1.1rem;
          letter-spacing: 4px;
          color: #888;
          font-weight: 300;
          animation: fadeIn 2s ease-out 0.6s both;
        }

        /* GALLERY SECTION */
        .gallery-wrapper {
          max-width: 1600px;
          margin: 80px auto;
          padding: 0 40px;
        }

        .gallery-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 60px;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(218, 165, 32, 0.2);
        }

        .gallery-label {
          font-size: 0.8rem;
          letter-spacing: 3px;
          color: #DAA520;
          font-weight: 600;
        }

        .gallery-count {
          font-size: 0.9rem;
          color: #666;
          letter-spacing: 2px;
        }

        .vehicles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
        }

        .vehicle-card {
          position: relative;
          background: rgba(218, 165, 32, 0.02);
          border: 1px solid rgba(218, 165, 32, 0.15);
          padding: 40px 30px;
          cursor: pointer;
          transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
          text-align: left;
          overflow: hidden;
          opacity: 0;
          animation: cardFadeIn 0.6s ease-out forwards;
        }

        @keyframes cardFadeIn {
          to {
            opacity: 1;
          }
        }

        .vehicle-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(218, 165, 32, 0.05), transparent);
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .vehicle-card:hover::before,
        .vehicle-card.selected::before {
          opacity: 1;
        }

        .vehicle-card:hover {
          transform: translateY(-8px);
          border-color: rgba(218, 165, 32, 0.4);
          box-shadow: 0 20px 40px rgba(218, 165, 32, 0.1);
        }

        .vehicle-card.selected {
          background: rgba(218, 165, 32, 0.08);
          border-color: #DAA520;
          transform: scale(1.02);
        }

        .card-corner {
          position: absolute;
          width: 20px;
          height: 20px;
          border-color: #DAA520;
          border-style: solid;
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .vehicle-card:hover .card-corner,
        .vehicle-card.selected .card-corner {
          opacity: 1;
        }

        .card-corner.tl {
          top: 10px;
          left: 10px;
          border-width: 1px 0 0 1px;
        }

        .card-corner.tr {
          top: 10px;
          right: 10px;
          border-width: 1px 1px 0 0;
        }

        .card-corner.bl {
          bottom: 10px;
          left: 10px;
          border-width: 0 0 1px 1px;
        }

        .card-corner.br {
          bottom: 10px;
          right: 10px;
          border-width: 0 1px 1px 0;
        }

        .card-number {
          position: absolute;
          top: 15px;
          right: 20px;
          font-size: 3rem;
          font-weight: 100;
          color: rgba(218, 165, 32, 0.1);
          font-family: 'Cormorant Garamond', serif;
        }

        .card-content {
          position: relative;
          z-index: 1;
        }

        .card-badge {
          font-size: 0.65rem;
          letter-spacing: 2px;
          color: #DAA520;
          margin-bottom: 15px;
          font-weight: 600;
        }

        .card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem;
          font-weight: 400;
          margin-bottom: 15px;
          letter-spacing: 1px;
        }

        .card-divider {
          width: 60px;
          height: 1px;
          background: linear-gradient(to right, #DAA520, transparent);
          margin: 20px 0;
        }

        .card-origin {
          font-size: 0.85rem;
          color: #888;
          letter-spacing: 1px;
        }

        .card-hover-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(218, 165, 32, 0.15), transparent);
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .vehicle-card:hover .card-hover-overlay {
          opacity: 1;
        }

        /* SHOWCASE SECTION */
        .showcase-section {
          max-width: 1400px;
          margin: 100px auto;
          padding: 0 40px;
          min-height: 600px;
        }

        .showcase-content {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 60px;
          animation: showcaseFadeIn 0.8s ease-out;
        }

        @keyframes showcaseFadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .info-panel {
          padding: 60px;
          background: rgba(218, 165, 32, 0.02);
          border: 1px solid rgba(218, 165, 32, 0.2);
          position: relative;
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }

        .panel-label {
          font-size: 0.7rem;
          letter-spacing: 3px;
          color: #DAA520;
          font-weight: 600;
        }

        .panel-ornament {
          width: 60px;
          height: 1px;
          background: linear-gradient(to right, transparent, #DAA520);
        }

        .showcase-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3.5rem;
          font-weight: 300;
          margin-bottom: 40px;
          letter-spacing: 3px;
          line-height: 1.2;
        }

        .status-grid {
          display: flex;
          gap: 30px;
          margin-bottom: 50px;
          padding: 30px 0;
          border-top: 1px solid rgba(218, 165, 32, 0.2);
          border-bottom: 1px solid rgba(218, 165, 32, 0.2);
        }

        .status-item {
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
        }

        .status-label {
          font-size: 0.7rem;
          letter-spacing: 2px;
          color: #888;
          text-transform: uppercase;
        }

        .status-value {
          font-size: 1.3rem;
          color: #fff;
          font-weight: 300;
          letter-spacing: 1px;
        }

        .status-value.rarity {
          color: #DAA520;
        }

        .status-divider {
          width: 1px;
          background: linear-gradient(to bottom, transparent, rgba(218, 165, 32, 0.3), transparent);
        }

        .description-box {
          position: relative;
          padding: 40px 0 40px 40px;
          border-left: 2px solid #DAA520;
          margin-bottom: 50px;
        }

        .quote-accent {
          position: absolute;
          top: 10px;
          left: -15px;
          font-size: 4rem;
          color: rgba(218, 165, 32, 0.3);
          font-family: 'Cormorant Garamond', serif;
          line-height: 1;
        }

        .description-text {
          font-size: 1.15rem;
          line-height: 1.9;
          color: #ccc;
          font-weight: 300;
          letter-spacing: 0.5px;
        }

        .metadata-grid {
          display: flex;
          flex-direction: column;
          gap: 25px;
          margin-bottom: 50px;
        }

        .metadata-item {
          display: flex;
          align-items: flex-start;
          gap: 20px;
        }

        .metadata-icon {
          color: #DAA520;
          font-size: 1.2rem;
          margin-top: 3px;
        }

        .metadata-label {
          font-size: 0.75rem;
          letter-spacing: 2px;
          color: #888;
          text-transform: uppercase;
          margin-bottom: 5px;
        }

        .metadata-value {
          font-size: 1.1rem;
          color: #fff;
          letter-spacing: 1px;
        }

        .inquiry-button {
          width: 100%;
          padding: 20px 40px;
          background: transparent;
          border: 2px solid #DAA520;
          color: #DAA520;
          font-family: 'Raleway', sans-serif;
          font-weight: 600;
          letter-spacing: 3px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.4s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
        }

        .button-shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(218, 165, 32, 0.3), transparent);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }

        .inquiry-button:hover .button-shine {
          transform: translateX(100%);
        }

        .inquiry-button:hover {
          background: #DAA520;
          color: #000;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(218, 165, 32, 0.3);
        }

        .button-text {
          position: relative;
          z-index: 1;
        }

        .button-arrow {
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease;
        }

        .inquiry-button:hover .button-arrow {
          transform: translateX(5px);
        }

        /* VISUAL PANEL */
        .visual-panel {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .visual-frame {
          position: relative;
          width: 100%;
          height: 100%;
          padding: 60px;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(218, 165, 32, 0.2);
        }

        .frame-line {
          position: absolute;
          background: #DAA520;
        }

        .frame-line.top {
          top: 20px;
          left: 20px;
          right: 20px;
          height: 1px;
        }

        .frame-line.right {
          top: 20px;
          right: 20px;
          bottom: 20px;
          width: 1px;
        }

        .frame-line.bottom {
          bottom: 20px;
          left: 20px;
          right: 20px;
          height: 1px;
        }

        .frame-line.left {
          top: 20px;
          left: 20px;
          bottom: 20px;
          width: 1px;
        }

        .visual-content {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
        }

        .visual-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 6rem;
          font-weight: 300;
          color: #DAA520;
          line-height: 1;
        }

        .visual-label {
          font-size: 0.7rem;
          letter-spacing: 3px;
          color: #888;
          text-transform: uppercase;
        }

        .seal-container {
          margin: 40px 0;
        }

        .seal-outer {
          width: 150px;
          height: 150px;
          border: 2px solid rgba(218, 165, 32, 0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: sealRotate 20s linear infinite;
        }

        @keyframes sealRotate {
          to {
            transform: rotate(360deg);
          }
        }

        .seal-inner {
          width: 120px;
          height: 120px;
          border: 1px solid #DAA520;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle, rgba(218, 165, 32, 0.1), transparent);
        }

        .seal-text {
          font-size: 0.8rem;
          letter-spacing: 4px;
          color: #DAA520;
          font-weight: 600;
        }

        .provenance-box {
          text-align: center;
        }

        .provenance-label {
          font-size: 0.65rem;
          letter-spacing: 3px;
          color: #DAA520;
          margin-bottom: 10px;
        }

        .provenance-value {
          font-size: 1rem;
          color: #ccc;
          letter-spacing: 1px;
        }

        /* PLACEHOLDER STATE */
        .placeholder-state {
          text-align: center;
          padding: 150px 40px;
          animation: fadeIn 0.8s ease-out;
        }

        .placeholder-icon {
          font-size: 4rem;
          color: rgba(218, 165, 32, 0.2);
          margin-bottom: 30px;
        }

        .placeholder-text {
          font-size: 1.5rem;
          color: #888;
          margin-bottom: 15px;
          letter-spacing: 2px;
        }

        .placeholder-subtitle {
          font-size: 1rem;
          color: #555;
          letter-spacing: 1px;
        }

        /* SIGNATURE SECTION */
        .signature-section {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 40px;
          margin-top: 150px;
          padding: 0 40px;
        }

        .signature-line {
          width: 200px;
          height: 1px;
          background: linear-gradient(to right, transparent, #DAA520, transparent);
        }

        .signature-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem;
          font-style: italic;
          color: #DAA520;
          letter-spacing: 2px;
        }

        /* ANIMATIONS */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes titleReveal {
          from {
            opacity: 0;
            letter-spacing: 20px;
          }
          to {
            opacity: 1;
            letter-spacing: 10px;
          }
        }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .showcase-content {
            grid-template-columns: 1fr;
          }

          .visual-panel {
            display: none;
          }

          .vehicles-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 80px 20px;
          }

          .main-title {
            font-size: 2.5rem;
          }

          .info-panel {
            padding: 40px 30px;
          }

          .showcase-title {
            font-size: 2.5rem;
          }

          .vehicles-grid {
            grid-template-columns: 1fr;
          }

          .status-grid {
            flex-direction: column;
            gap: 20px;
          }

          .status-divider {
            width: 100%;
            height: 1px;
          }
        }
      `}</style>
    </div>
  );
}
