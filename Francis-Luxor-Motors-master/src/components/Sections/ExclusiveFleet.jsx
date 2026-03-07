import { useState, useEffect, useRef } from "react";
import { useVehicles } from "../../hooks/useVehicles";

/* ═══════════════════════════════════════════════════
   VEHICLE CATALOGUE DATA
═══════════════════════════════════════════════════ */
const G = "#D4AF37";

const CATALOGUE = {
  "bugatti-chiron": {
    price: "€3,200,000",
    units: 2,
    origin: "Molsheim, France",
    blurb:
      "A masterpiece of engineering uniting 1,500 horsepower with the serenity of a grand tourer. The Chiron redefines what is possible.",
    exterior:
      "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=1600&q=90&auto=format&fit=crop",
  },
  "ferrari-roma": {
    price: "€245,000",
    units: 4,
    origin: "Maranello, Italy",
    blurb:
      "La Dolce Vita reinterpreted for a new generation. The Roma distils decades of Ferrari mastery into an icon of effortless elegance.",
    exterior:
      "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=1600&q=90&auto=format&fit=crop",
  },
  "pagani-huayra": {
    price: "€2,600,000",
    units: 1,
    origin: "San Cesario sul Panaro, Italy",
    blurb:
      "A work of art in motion. Horacio Pagani's obsessive pursuit of perfection is manifest in every bespoke component of the Huayra.",
    exterior:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=90&auto=format&fit=crop",
  },
  "rolls-royce-phantom": {
    price: "€560,000",
    units: 3,
    origin: "Goodwood, England",
    blurb:
      "The pinnacle of automotive luxury. The Phantom delivers absolute silence, supreme refinement and an unmatched sense of occasion.",
    exterior:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1600&q=90&auto=format&fit=crop",
  },
  "toyota-supra-mk5": {
    price: "€82,000",
    units: 6,
    origin: "Graz, Austria",
    blurb:
      "A lineage forged in legend. The MK5 Supra carries decades of motorsport heritage into the modern era with poised, precise intent.",
    exterior:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1600&q=90&auto=format&fit=crop",
  },
  "koenigsegg-regera": {
    price: "€1,900,000",
    units: 1,
    origin: "Ängelholm, Sweden",
    blurb:
      "1,500 combined horsepower with zero transmission. The Regera's direct-drive system delivers an otherworldly surge unlike any hypercar.",
    exterior:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1600&q=90&auto=format&fit=crop",
  },
  "lamborghini-veneno": {
    price: "€4,500,000",
    units: 1,
    origin: "Sant'Agata Bolognese, Italy",
    blurb:
      "Born for the track, delivered to the road. The Veneno is among the rarest Lamborghinis ever created — a rolling work of radical design.",
    exterior:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1600&q=90&auto=format&fit=crop",
  },
  "aston-martin-valkyrie": {
    price: "€3,000,000",
    units: 1,
    origin: "Gaydon, England",
    blurb:
      "Adrian Newey's vision translated into production. The Valkyrie delivers Formula One-derived aerodynamics to the privileged few.",
    exterior:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=90&auto=format&fit=crop",
  },
  "hennessey-venom-f5": {
    price: "€1,600,000",
    units: 2,
    origin: "Sealy, Texas, USA",
    blurb:
      "Purpose-built to pursue 300 mph. The Venom F5's twin-turbo 6.6-litre V8 produces 1,817 horsepower — raw American power, refined.",
    exterior:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=90&auto=format&fit=crop",
  },
};

/* ═══════════════════════════════════════════════════
   GALLERY MODAL
═══════════════════════════════════════════════════ */
function GalleryModal({ type, vehicle, images, onClose }) {
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const h = (e) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", h);
    return () => {
      window.removeEventListener("keydown", h);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const typeLabel = {
    exterior: "Exterior Gallery",
    interior: "Interior Gallery",
    engine: "Engine Bay",
  };
  const typeIcon = { exterior: "◯", interior: "◈", engine: "◉" };

  const change = (dir) => {
    setFade(false);
    setTimeout(() => {
      setIdx((i) => Math.max(0, Math.min(images.length - 1, i + dir)));
      setFade(true);
    }, 250);
  };

  return (
    <div className="gm-back" onClick={onClose}>
      <div className="gm-box" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="gm-hdr">
          <div>
            <div className="gm-vehicle-name">{vehicle}</div>
            <div className="gm-type-label">
              <span className="gm-type-icon">{typeIcon[type]}</span>
              <span>{typeLabel[type]}</span>
            </div>
          </div>
          <button className="gm-close" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Main image */}
        <div className="gm-stage">
          <img
            src={images[idx]}
            alt={`${vehicle} ${type}`}
            className="gm-img"
            style={{ opacity: fade ? 1 : 0 }}
          />
          <div className="gm-stage-scrim" />

          {/* Counter */}
          <div className="gm-counter">
            {String(idx + 1).padStart(2, "0")} /{" "}
            {String(images.length).padStart(2, "0")}
          </div>

          {/* Navigation */}
          {images.length > 1 && (
            <>
              <button
                className="gm-nav gm-nav-l"
                onClick={() => change(-1)}
                disabled={idx === 0}
              >
                ‹
              </button>
              <button
                className="gm-nav gm-nav-r"
                onClick={() => change(1)}
                disabled={idx === images.length - 1}
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="gm-thumbs">
            {images.map((img, i) => (
              <button
                key={i}
                className={`gm-thumb ${i === idx ? "act" : ""}`}
                onClick={() => {
                  setFade(false);
                  setTimeout(() => {
                    setIdx(i);
                    setFade(true);
                  }, 250);
                }}
                style={{ backgroundImage: `url(${img})` }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VEHICLE CARD
═══════════════════════════════════════════════════ */
function VehicleCard({ vehicle, index, vehicleImages, onOpenGallery }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVis(true);
      },
      { threshold: 0.06 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const slug = vehicle.slug;
  const cat = CATALOGUE[slug] || {};
  const imgs = vehicleImages?.[slug] || {};
  // Use local assets — interiorImg as card cover, engineImg for engine gallery
  const cardSrc = imgs.interiorImg || imgs.engineImg || null;
  const engineSrc = imgs.engineImg || null;
  const interiorSrc = imgs.interiorImg || null;
  const exteriorSrc = cardSrc;

  const displayName =
    vehicle.model ||
    slug
      .split("-")
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(" ");

  return (
    <article
      ref={ref}
      className={`vc${vis ? " vc-in" : ""}`}
      style={{ transitionDelay: `${(index % 3) * 0.08}s` }}
    >
      {/* Cinematic image */}
      <div className="vc-img-zone">
        {exteriorSrc ?
          <img src={exteriorSrc} alt={displayName} className="vc-img" />
        : <div className="vc-img-placeholder" />}
        <div className="vc-img-scrim" />
        <div className="vc-img-scrim-bot" />

        {/* Units badge */}
        <div className="vc-badge">
          <span className="vc-badge-dot" />
          <span>
            {cat.units ?? "—"} {(cat.units ?? 0) === 1 ? "Unit" : "Units"}{" "}
            Available
          </span>
        </div>

        {/* Origin */}
        {cat.origin && <div className="vc-origin">{cat.origin}</div>}
      </div>

      {/* Card body */}
      <div className="vc-body">
        <div className="vc-num">{String(index + 1).padStart(2, "0")}</div>

        <div className="vc-info">
          <h3 className="vc-name">{displayName}</h3>
          <div className="vc-price">{cat.price ?? "Price on request"}</div>
          <div className="vc-rule" />
          <p className="vc-desc">
            {cat.blurb ?? "A pinnacle of automotive engineering."}
          </p>
        </div>

        {/* Gallery buttons */}
        <div className="vc-btns">
          {[
            {
              key: "exterior",
              label: "View Exterior",
              icon: "◯",
              src: interiorSrc,
            },
            {
              key: "interior",
              label: "View Interior",
              icon: "◈",
              src: interiorSrc,
            },
            { key: "engine", label: "View Engine", icon: "◉", src: engineSrc },
          ].map((b) => (
            <button
              key={b.key}
              className="vc-btn"
              onClick={() =>
                b.src && onOpenGallery(b.key, displayName, [b.src])
              }
              disabled={!b.src}
            >
              <span className="vc-btn-icon">{b.icon}</span>
              <span className="vc-btn-label">{b.label}</span>
              <span className="vc-btn-arr">→</span>
            </button>
          ))}
        </div>
      </div>
    </article>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════ */
export default function ExclusiveFleet({ vehicleImages }) {
  const { vehicles, loading } = useVehicles();
  const [gallery, setGallery] = useState(null); // { type, vehicle, images }
  const heroRef = useRef(null);
  const [heroVis, setHeroVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setHeroVis(true);
      },
      { threshold: 0.05 },
    );
    if (heroRef.current) obs.observe(heroRef.current);
    return () => obs.disconnect();
  }, []);

  const openGallery = (type, vehicleName, images) => {
    setGallery({ type, vehicle: vehicleName, images });
  };

  return (
    <section className="ef-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,200;0,300;0,400;1,200;1,300;1,400&family=Montserrat:wght@200;300;400;500;600&display=swap');

        /* ── ROOT ── */
        .ef-root{background:#060606;color:#fff;font-family:'Montserrat',sans-serif;overflow-x:hidden;position:relative;}
        .ef-root::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 150% 55% at 50% 0%,rgba(212,175,55,0.055) 0%,transparent 55%);pointer-events:none;z-index:0;}

        /* ── HERO ── */
        .ef-hero{position:relative;z-index:1;padding:160px 80px 100px;display:flex;flex-direction:column;align-items:center;text-align:center;}
        .ef-hero::after{content:'';position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:1px;height:80px;background:linear-gradient(to bottom,rgba(212,175,55,.4),transparent);}

        .ef-ey-row{display:flex;align-items:center;gap:1.2rem;margin-bottom:2rem;
          opacity:0;transform:translateY(14px);transition:opacity .8s ease,transform .8s ease;}
        .ef-ey-row.on{opacity:1;transform:none;}
        .ef-rl{display:block;width:50px;height:1px;background:linear-gradient(to right,transparent,rgba(212,175,55,.6));}
        .ef-rl-r{background:linear-gradient(to left,transparent,rgba(212,175,55,.6));}
        .ef-ey-txt{font-size:.5rem;letter-spacing:.6em;color:rgba(212,175,55,.55);text-transform:uppercase;}

        .ef-h1{font-family:'Cormorant Garamond',serif;font-size:clamp(4.5rem,10vw,11rem);font-weight:200;line-height:.88;letter-spacing:.08em;color:#f5f0e8;margin:0 0 1.8rem;
          opacity:0;transform:translateY(28px);transition:opacity 1.1s ease .12s,transform 1.1s ease .12s;}
        .ef-h1.on{opacity:1;transform:none;}
        .ef-h1 em{font-style:italic;color:${G};}

        .ef-tag{font-family:'Cormorant Garamond',serif;font-size:clamp(1.1rem,1.8vw,1.45rem);font-style:italic;font-weight:300;color:rgba(255,255,255,.25);max-width:600px;line-height:1.8;
          opacity:0;transform:translateY(14px);transition:opacity .9s ease .25s,transform .9s ease .25s;}
        .ef-tag.on{opacity:1;transform:none;}

        /* ── GRID ── */
        .ef-grid{position:relative;z-index:1;display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(212,175,55,.06);margin-top:80px;}

        /* ── VEHICLE CARD ── */
        .vc{background:#070707;overflow:hidden;display:flex;flex-direction:column;
          opacity:0;transform:translateY(32px);transition:opacity .7s ease,transform .7s ease,background .35s ease;}
        .vc-in{opacity:1;transform:none;}
        .vc:hover{background:#0b0b0b;z-index:2;}

        /* Image zone */
        .vc-img-zone{position:relative;height:380px;overflow:hidden;}
        .vc-img{width:100%;height:100%;object-fit:cover;filter:brightness(.62) saturate(.85);transform:scale(1.05);
          transition:transform 1.4s cubic-bezier(.25,.46,.45,.94),filter 1s ease;}
        .vc:hover .vc-img{transform:scale(1.1);filter:brightness(.82) saturate(1);}
        .vc-img-placeholder{width:100%;height:100%;background:rgba(255,255,255,.03);}
        .vc-img-scrim{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.25) 0%,transparent 35%);}
        .vc-img-scrim-bot{position:absolute;bottom:0;left:0;right:0;height:60%;background:linear-gradient(to top,rgba(7,7,7,1) 0%,transparent 100%);}

        .vc-badge{position:absolute;top:1.2rem;left:1.2rem;z-index:4;display:flex;align-items:center;gap:.5rem;
          background:rgba(0,0,0,.7);border:1px solid rgba(212,175,55,.3);padding:.3rem .85rem;
          font-size:.42rem;letter-spacing:.22em;color:rgba(212,175,55,.8);text-transform:uppercase;}
        .vc-badge-dot{width:6px;height:6px;border-radius:50%;background:${G};animation:vcpulse 2s ease-in-out infinite;}
        @keyframes vcpulse{0%,100%{opacity:1}50%{opacity:.3}}

        .vc-origin{position:absolute;bottom:1.4rem;right:1.4rem;z-index:4;
          font-size:.4rem;letter-spacing:.25em;color:rgba(255,255,255,.3);text-transform:uppercase;}

        /* Body */
        .vc-body{position:relative;z-index:3;padding:1.8rem 2rem 2.4rem;display:flex;flex-direction:column;gap:1rem;flex:1;}

        .vc-num{font-family:'Cormorant Garamond',serif;font-size:4.5rem;font-weight:200;
          color:rgba(212,175,55,.06);line-height:1;position:absolute;top:-2.5rem;right:1.6rem;
          pointer-events:none;transition:color .5s ease;}
        .vc:hover .vc-num{color:rgba(212,175,55,.1);}

        .vc-info{flex:1;}
        .vc-name{font-family:'Cormorant Garamond',serif;font-size:1.75rem;font-weight:300;
          color:#f0ece4;letter-spacing:.04em;line-height:1.08;margin:0 0 .5rem;
          transition:color .4s ease;}
        .vc:hover .vc-name{color:#fff;}
        .vc-price{font-family:'Cormorant Garamond',serif;font-size:1.05rem;font-weight:300;
          color:${G};letter-spacing:.08em;margin-bottom:.9rem;}
        .vc-rule{width:36px;height:1px;background:linear-gradient(to right,${G},transparent);margin-bottom:.9rem;
          transition:width .55s cubic-bezier(.23,1,.32,1);}
        .vc:hover .vc-rule{width:60px;}
        .vc-desc{font-size:.6rem;line-height:1.9;font-weight:300;color:rgba(255,255,255,.38);letter-spacing:.02em;}

        /* Gallery Buttons */
        .vc-btns{display:flex;flex-direction:column;gap:.45rem;margin-top:.2rem;}

        .vc-btn{display:flex;align-items:center;gap:.65rem;padding:.65rem 1rem;
          background:transparent;border:1px solid rgba(212,175,55,.15);
          color:rgba(255,255,255,.45);font-family:'Montserrat',sans-serif;
          font-size:.44rem;letter-spacing:.18em;text-transform:uppercase;
          cursor:pointer;text-align:left;position:relative;overflow:hidden;
          transition:border-color .35s ease,color .35s ease,background .35s ease;}
        .vc-btn::before{content:'';position:absolute;inset:0;
          background:rgba(212,175,55,.07);transform:scaleX(0);transform-origin:left;
          transition:transform .4s cubic-bezier(.23,1,.32,1);}
        .vc-btn:hover::before{transform:scaleX(1);}
        .vc-btn:hover{border-color:rgba(212,175,55,.5);color:${G};}
        .vc-btn:disabled{opacity:.25;cursor:not-allowed;}
        .vc-btn:disabled:hover::before{transform:none;}
        .vc-btn:disabled:hover{border-color:rgba(212,175,55,.15);color:rgba(255,255,255,.45);}

        .vc-btn-icon{font-size:.85rem;color:rgba(212,175,55,.55);flex-shrink:0;transition:color .35s ease;}
        .vc-btn:hover .vc-btn-icon{color:${G};}
        .vc-btn-label{flex:1;}
        .vc-btn-arr{font-size:.75rem;transition:transform .35s ease;}
        .vc-btn:hover .vc-btn-arr{transform:translateX(4px);}

        /* Corner accents on card hover */
        .vc{position:relative;}
        .vc::before,.vc::after{content:'';position:absolute;width:18px;height:18px;
          border-color:${G};border-style:solid;opacity:0;transition:opacity .4s ease;z-index:5;pointer-events:none;}
        .vc::before{top:10px;left:10px;border-width:1px 0 0 1px;}
        .vc::after{bottom:10px;right:10px;border-width:0 1px 1px 0;}
        .vc:hover::before,.vc:hover::after{opacity:1;}

        /* ── GALLERY MODAL ── */
        .gm-back{position:fixed;inset:0;z-index:9000;background:rgba(0,0,0,.94);
          display:flex;align-items:center;justify-content:center;padding:1.5rem;
          animation:gmbd .3s ease;backdrop-filter:blur(10px);}
        @keyframes gmbd{from{opacity:0}to{opacity:1}}
        .gm-box{background:#070707;border:1px solid rgba(212,175,55,.18);width:100%;max-width:960px;
          max-height:92vh;display:flex;flex-direction:column;overflow:hidden;
          animation:gmbx .4s cubic-bezier(.23,1,.32,1);}
        @keyframes gmbx{from{opacity:0;transform:translateY(18px) scale(.97)}to{opacity:1;transform:none}}

        .gm-hdr{display:flex;justify-content:space-between;align-items:flex-start;
          padding:1.6rem 2rem;border-bottom:1px solid rgba(212,175,55,.1);flex-shrink:0;
          background:radial-gradient(ellipse at top left,rgba(212,175,55,.03),transparent);}
        .gm-vehicle-name{font-family:'Cormorant Garamond',serif;font-size:1.7rem;font-weight:300;
          color:#f0ece4;letter-spacing:.04em;margin-bottom:.3rem;}
        .gm-type-label{display:flex;align-items:center;gap:.5rem;font-size:.42rem;
          letter-spacing:.4em;color:rgba(212,175,55,.55);text-transform:uppercase;}
        .gm-type-icon{font-size:.7rem;color:rgba(212,175,55,.65);}
        .gm-close{background:none;border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.4);
          width:34px;height:34px;font-size:1.2rem;cursor:pointer;display:flex;
          align-items:center;justify-content:center;flex-shrink:0;transition:all .3s ease;}
        .gm-close:hover{border-color:rgba(212,175,55,.5);color:${G};}

        .gm-stage{position:relative;flex:1;overflow:hidden;min-height:480px;}
        .gm-img{width:100%;height:100%;object-fit:cover;transition:opacity .25s ease;}
        .gm-stage-scrim{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.4) 0%,transparent 40%);}
        .gm-counter{position:absolute;bottom:1.2rem;left:1.8rem;z-index:3;
          font-size:.48rem;letter-spacing:.3em;color:rgba(212,175,55,.6);font-family:'Cormorant Garamond',serif;}

        .gm-nav{position:absolute;top:50%;transform:translateY(-50%);z-index:4;
          background:rgba(0,0,0,.6);border:1px solid rgba(212,175,55,.3);color:rgba(212,175,55,.7);
          width:44px;height:56px;font-size:1.8rem;cursor:pointer;display:flex;
          align-items:center;justify-content:center;transition:all .3s ease;}
        .gm-nav:hover{border-color:rgba(212,175,55,.7);color:${G};}
        .gm-nav:disabled{opacity:.2;cursor:not-allowed;}
        .gm-nav-l{left:1.2rem;}
        .gm-nav-r{right:1.2rem;}

        .gm-thumbs{display:flex;gap:.5rem;padding:1rem 2rem;background:rgba(0,0,0,.6);
          border-top:1px solid rgba(212,175,55,.08);overflow-x:auto;}
        .gm-thumb{width:72px;height:50px;flex-shrink:0;border:1px solid rgba(255,255,255,.12);
          background-size:cover;background-position:center;cursor:pointer;
          opacity:.5;transition:all .3s ease;}
        .gm-thumb.act,.gm-thumb:hover{opacity:1;border-color:rgba(212,175,55,.65);}

        /* ── LOADING ── */
        .ef-loading{position:relative;z-index:1;text-align:center;padding:8rem 2rem;
          font-family:'Cormorant Garamond',serif;font-size:1.4rem;font-weight:300;
          color:rgba(212,175,55,.4);letter-spacing:.2em;}

        /* ── DIVIDER ── */
        .ef-divider{position:relative;z-index:1;display:flex;align-items:center;
          padding:0 80px;margin:80px 0 0;}
        .ef-div-line{flex:1;height:1px;background:linear-gradient(to right,transparent,rgba(212,175,55,.2),transparent);}
        .ef-div-diamond{font-size:.7rem;color:rgba(212,175,55,.4);padding:0 1.2rem;flex-shrink:0;}

        /* ── RESPONSIVE ── */
        @media(max-width:1100px){.ef-grid{grid-template-columns:repeat(2,1fr);}.ef-hero{padding-left:40px;padding-right:40px;}}
        @media(max-width:680px){.ef-grid{grid-template-columns:1fr;}.ef-hero{padding:80px 24px 60px;}.ef-ey-row,.ef-ey-txt{flex-wrap:wrap;}}
      `}</style>

      {/* GALLERY MODAL */}
      {gallery && (
        <GalleryModal
          type={gallery.type}
          vehicle={gallery.vehicle}
          images={gallery.images}
          onClose={() => setGallery(null)}
        />
      )}

      {/* HERO */}
      <div ref={heroRef} className="ef-hero">
        <div className={`ef-ey-row${heroVis ? " on" : ""}`}>
          <span className="ef-rl" />
          <span className="ef-ey-txt">Francis Luxor Motors</span>
          <span className="ef-rl ef-rl-r" />
        </div>
        <h1 className={`ef-h1${heroVis ? " on" : ""}`}>
          The <em>Exclusive</em>
          <br />
          <span
            style={{
              display: "block",
              fontSize: "clamp(3rem,7vw,7.5rem)",
              letterSpacing: ".14em",
              textTransform: "uppercase",
              fontWeight: 200,
              marginTop: ".1em",
              fontStyle: "normal",
              color: "rgba(245,240,232,0.72)",
            }}
          >
            Collection
          </span>
        </h1>
        <p className={`ef-tag${heroVis ? " on" : ""}`}>
          "Each vehicle is personally inspected, authenticated and prepared
          <br />
          to the highest standard before presentation."
        </p>
      </div>

      {/* DIVIDER */}
      <div className="ef-divider">
        <span className="ef-div-line" />
        <span className="ef-div-diamond">◆</span>
        <span className="ef-div-line" />
      </div>

      {/* GRID */}
      {loading ?
        <div className="ef-loading">Curating the Collection…</div>
      : <div className="ef-grid">
          {vehicles.map((v, i) => (
            <VehicleCard
              key={v.slug}
              vehicle={v}
              index={i}
              vehicleImages={vehicleImages}
              onOpenGallery={openGallery}
            />
          ))}
        </div>
      }
    </section>
  );
}
