import { useState, useEffect } from "react";

export default function CarDetailView({ data, name, onClose }) {
  const [scrollY, setScrollY] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [interiorLoaded, setInteriorLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!data) return null;

  return (
    <div className="luxury-container">
      {/* HERO HEADER CON PARALLAX PREMIUM */}
      <div
        className="hero-header"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <div className="header-overlay" />
        <div className="particles-bg" />

        <div className="header-content">
          <div className="badge-container">
            <div className="luxury-badge">
              <span className="badge-line" />
              <span className="badge-text">EXCLUSIVE COLLECTION</span>
              <span className="badge-line" />
            </div>
          </div>

          <h1 className="title-main">
            {name.split("").map((char, i) => (
              <span
                key={i}
                className="title-char"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>

          <div className="subtitle-container">
            <div className="subtitle-line" />
            <p className="subtitle">Masterpiece of Automotive Engineering</p>
            <div className="subtitle-line" />
          </div>

          <button onClick={onClose} className="close-btn">
            <span className="close-icon">✕</span>
            <span className="close-text">EXIT PRESENTATION</span>
          </button>
        </div>
      </div>

      {/* SPECS PREMIUM BAR - STICKY */}
      <div className="specs-floating-bar">
        <div className="specs-glow" />
        <div className="spec-item">
          <span className="spec-label">POWER OUTPUT</span>
          <span className="spec-value">{data.hp}</span>
          <span className="spec-unit">HP</span>
        </div>
        <div className="spec-divider" />
        <div className="spec-item">
          <span className="spec-label">MAXIMUM VELOCITY</span>
          <span className="spec-value">{data.top}</span>
          <span className="spec-unit">KM/H</span>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="content-wrapper">
        {/* POWERPLANT SECTION */}
        <section className="detail-section">
          <div className="section-number">01</div>
          <div className="section-ornament top-left">◆</div>

          <div className="section-header">
            <h2 className="section-title">The Heart of Performance</h2>
            <p className="section-subtitle">POWERPLANT ENGINEERING</p>
            <div className="title-underline" />
          </div>

          <div className="image-showcase">
            <div className="image-frame">
              <div className="frame-corner tl" />
              <div className="frame-corner tr" />
              <div className="frame-corner bl" />
              <div className="frame-corner br" />

              <img
                src={data.engineImg}
                alt="Engine Detail"
                className={`showcase-image ${imageLoaded ? "loaded" : ""}`}
                onLoad={() => setImageLoaded(true)}
              />

              <div className="image-overlay">
                <div className="overlay-pattern" />
              </div>

              <div className="image-vignette" />
            </div>
          </div>

          <div className="description-box">
            <div className="quote-mark">"</div>
            <p className="description-text">{data.engineDesc}</p>
            <div className="description-accent" />
          </div>
        </section>

        {/* INTERIOR SECTION */}
        <section className="detail-section section-alt">
          <div className="section-number">02</div>
          <div className="section-ornament top-right">◆</div>

          <div className="section-header">
            <h2 className="section-title">Crafted Luxury Interior</h2>
            <p className="section-subtitle">BESPOKE CABIN EXPERIENCE</p>
            <div className="title-underline" />
          </div>

          <div className="image-showcase">
            <div className="image-frame">
              <div className="frame-corner tl" />
              <div className="frame-corner tr" />
              <div className="frame-corner bl" />
              <div className="frame-corner br" />

              <img
                src={data.interiorImg}
                alt="Interior Detail"
                className={`showcase-image ${interiorLoaded ? "loaded" : ""}`}
                onLoad={() => setInteriorLoaded(true)}
              />

              <div className="image-overlay">
                <div className="overlay-pattern" />
              </div>

              <div className="image-vignette" />
            </div>
          </div>

          <div className="luxury-features">
            <div className="feature-item">
              <div className="feature-icon">◆</div>
              <span>Hand-Stitched Leather</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">◆</div>
              <span>Carbon Fiber Accents</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">◆</div>
              <span>Precision Craftsmanship</span>
            </div>
          </div>
        </section>

        {/* FOOTER SIGNATURE */}
        <div className="signature-footer">
          <div className="signature-line" />
          <div className="signature-ornament">◆</div>
          <p className="signature-text">An Automotive Masterpiece</p>
          <div className="signature-ornament">◆</div>
          <div className="signature-line" />
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Cinzel:wght@400;500;600;700&family=Montserrat:wght@100;200;300;400;500;600;700;800&display=swap');

        .luxury-container {
          background: 
            radial-gradient(ellipse at top, rgba(212, 175, 55, 0.03) 0%, transparent 50%),
            radial-gradient(ellipse at bottom, rgba(212, 175, 55, 0.02) 0%, transparent 50%),
            linear-gradient(to bottom, #000000, #0a0a0a, #000000);
          min-height: 100vh;
          color: #ffffff;
          font-family: 'Montserrat', sans-serif;
          overflow-x: hidden;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 9999;
        }

        .hero-header {
          position: relative;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(ellipse at center, #1a1a1a 0%, #000000 100%);
          overflow: hidden;
        }

        .header-overlay {
          position: absolute;
          inset: 0;
          background: 
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(212, 175, 55, 0.04) 2px,
              rgba(212, 175, 55, 0.04) 4px
            );
          pointer-events: none;
          animation: scanline 12s linear infinite;
          opacity: 0.6;
        }

        @keyframes scanline {
          0% { transform: translateY(0); }
          100% { transform: translateY(100%); }
        }

        .particles-bg {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(2px 2px at 20% 30%, rgba(212, 175, 55, 0.15), transparent),
            radial-gradient(2px 2px at 60% 70%, rgba(212, 175, 55, 0.1), transparent),
            radial-gradient(1px 1px at 50% 50%, rgba(255, 255, 255, 0.1), transparent),
            radial-gradient(1px 1px at 80% 10%, rgba(212, 175, 55, 0.12), transparent);
          background-size: 300% 300%;
          animation: particleFloat 20s ease-in-out infinite;
          pointer-events: none;
          opacity: 0.4;
        }

        @keyframes particleFloat {
          0%, 100% { background-position: 0% 0%, 100% 100%, 50% 50%, 80% 10%; opacity: 0.3; }
          50% { background-position: 100% 100%, 0% 0%, 60% 40%, 20% 90%; opacity: 0.6; }
        }

        .header-content {
          text-align: center;
          z-index: 10;
          max-width: 1400px;
          padding: 60px;
        }

        .badge-container { margin-bottom: 50px; }
        .luxury-badge {
          display: inline-flex;
          align-items: center;
          gap: 25px;
          padding: 18px 50px;
          background: linear-gradient(180deg, rgba(212, 175, 55, 0.08) 0%, rgba(212, 175, 55, 0.03) 100%);
          border: 1px solid rgba(212, 175, 55, 0.4);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          animation: fadeInDown 1.2s cubic-bezier(0.23, 1, 0.32, 1);
          box-shadow: 0 0 30px rgba(212, 175, 55, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1);
          position: relative;
        }

        .badge-text {
          font-size: 0.65rem;
          letter-spacing: 5px;
          color: #d4af37;
          font-weight: 600;
          text-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
        }

        .title-main {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3.5rem, 10vw, 8rem);
          font-weight: 700;
          margin: 40px 0;
          letter-spacing: 12px;
          text-transform: uppercase;
          background: linear-gradient(135deg, #ffffff 0%, #d4af37 30%, #f4d03f 50%, #d4af37 70%, #ffffff 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 8s ease infinite;
          filter: drop-shadow(0 0 40px rgba(212, 175, 55, 0.3));
        }

        @keyframes titleFloat {
          0% { opacity: 0; transform: translateY(50px) rotateX(90deg) scale(0.8); filter: blur(10px); }
          100% { opacity: 1; transform: translateY(0) rotateX(0) scale(1); filter: blur(0); }
        }

        .close-btn {
          margin-top: 70px;
          padding: 20px 60px;
          background: transparent;
          border: 2px solid #d4af37;
          color: #d4af37;
          font-family: 'Montserrat', sans-serif;
          font-weight: 600;
          font-size: 0.75rem;
          letter-spacing: 4px;
          cursor: pointer;
          transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          animation: fadeIn 2.2s ease-out 1.2s both;
        }

        .close-btn:hover {
          background: #d4af37;
          color: #000;
          transform: translateY(-3px);
          box-shadow: 0 0 40px rgba(212, 175, 55, 0.4);
        }

        .specs-floating-bar {
          position: sticky;
          top: 30px;
          z-index: 100;
          max-width: 900px;
          margin: -100px auto 0 auto;
          display: flex;
          background: linear-gradient(180deg, rgba(10, 10, 10, 0.98) 0%, rgba(0, 0, 0, 0.95) 100%);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          border: 1px solid rgba(212, 175, 55, 0.4);
          padding: 40px;
          animation: slideUp 1.2s cubic-bezier(0.23, 1, 0.32, 1) 1s both;
          box-shadow: 0 0 60px rgba(212, 175, 55, 0.2), 0 20px 60px rgba(0, 0, 0, 0.6);
        }

        .spec-value {
          font-size: 3rem;
          font-family: 'Cormorant Garamond', serif;
          background: linear-gradient(135deg, #ffffff, #d4af37, #f4d03f);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .content-wrapper {
          max-width: 1600px;
          margin: 120px auto;
          padding: 0 60px;
        }

        .detail-section { margin: 180px 0; position: relative; }

        /* ═══════════════════════════════════════════
           AJUSTE DE MARCO E IMAGEN (SOLUCIÓN)
           ═══════════════════════════════════════════ */
        .image-frame {
          position: relative;
          width: 100%;
          height: auto;
          min-height: auto; /* Quitamos los 500px fijos */
          background: #000;
          border: 1px solid rgba(212, 175, 55, 0.3);
          padding: 10px; /* Reducimos el padding para que la imagen sea más grande */
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .showcase-image {
          width: 100%;
          height: auto;
          max-width: 100%;
          max-height: 85vh; /* Permitimos que ocupe más pantalla */
          object-fit: contain; /* Asegura que se vea completa */
          opacity: 0;
          transform: scale(1.02);
          transition: all 1.2s ease-out;
          display: block;
          z-index: 5;
        }

        .showcase-image.loaded {
          opacity: 1;
          transform: scale(1);
        }

        .frame-corner {
          position: absolute;
          width: 40px;
          height: 40px;
          border-color: #d4af37;
          border-style: solid;
          z-index: 10;
        }
        .frame-corner.tl { top: 0; left: 0; border-width: 2px 0 0 2px; }
        .frame-corner.tr { top: 0; right: 0; border-width: 2px 2px 0 0; }
        .frame-corner.bl { bottom: 0; left: 0; border-width: 0 0 2px 2px; }
        .frame-corner.br { bottom: 0; right: 0; border-width: 0 2px 2px 0; }

        .description-box {
          max-width: 1000px;
          margin: 60px auto;
          padding: 40px 60px;
          background: rgba(212, 175, 55, 0.03);
          border-left: 4px solid #d4af37;
        }

        .description-text {
          font-size: 1.4rem;
          line-height: 1.8;
          color: #d4af37;
          font-family: 'Cormorant Garamond', serif;
        }

        /* ═══════════════════════════════════════════
           RESPONSIVE
           ═══════════════════════════════════════════ */
        @media (max-width: 768px) {
          .specs-floating-bar { flex-direction: column; margin-top: -60px; padding: 20px; }
          .title-main { font-size: 3rem; }
          .image-frame { padding: 5px; }
          .showcase-image { max-height: 60vh; }
          .content-wrapper { padding: 0 20px; }
        }
      `}</style>
    </div>
  );
}
