/**
 * WhiteGloveServices.jsx — Francis Luxor Motors
 * Mapa tipo Google Earth — Leaflet + CartoDB Dark (sin API key)
 * Todos los modales funcionales
 */

import { useState, useEffect, useRef, useCallback } from "react";

const G = "#D4AF37";

/* ══════════════════════════════════════
   DATA
   ══════════════════════════════════════ */
const EXT_COLORS = [
  { name: "Noir Obsidian", hex: "#0d0d0d" },
  { name: "Arctic White", hex: "#f0f0ee" },
  { name: "Racing Crimson", hex: "#8b0000" },
  { name: "Midnight Navy", hex: "#0a1628" },
  { name: "Gold Edition", hex: "#c8a415" },
  { name: "Matte Carbon", hex: "#2a2a2a" },
];
const INTERIORS = [
  { name: "Black Nappa", price: "+€0" },
  { name: "Cream Alcantara", price: "+€15,000" },
  { name: "Red Suede", price: "+€22,000" },
  { name: "Carbon Panel", price: "+€35,000" },
];
const WHEELS = [
  { name: "Standard Alloy", price: "+€0" },
  { name: "Forged Carbon", price: "+€18,000" },
  { name: "Titanium Sport", price: "+€28,000" },
  { name: "Signature Ed.", price: "+€42,000" },
];
const EXTRAS = [
  { name: "Panoramic Roof", price: "+€8,500" },
  { name: "Night Vision", price: "+€12,000" },
  { name: "Massage Seats", price: "+€6,800" },
  { name: "Armoured Package", price: "+€95,000" },
];
const SEC_FEATURES = [
  {
    id: "gps",
    icon: "◉",
    title: "GPS Tracking",
    desc: "24/7 satellite tracking with 30-second refresh intervals. Dedicated monitoring team alerts you at every checkpoint.",
    stat: "99.98% uptime",
    statLabel: "System Reliability",
  },
  {
    id: "armoured",
    icon: "◈",
    title: "Armoured Carriers",
    desc: "Climate-controlled reinforced carriers with B6-rated armour panels. Unmarked vehicles with rotating routes.",
    stat: "B6 Rated",
    statLabel: "Armour Classification",
  },
  {
    id: "escort",
    icon: "◆",
    title: "Security Escort",
    desc: "Armed escort vehicles on request for ultra-high-value deliveries. Coordinated with local law enforcement across 47 nations.",
    stat: "47 Nations",
    statLabel: "Active Coverage",
  },
  {
    id: "bio",
    icon: "◇",
    title: "Biometric Access",
    desc: "Carrier access restricted to verified biometric credentials. Full chain-of-custody documentation from door to door.",
    stat: "Zero Breaches",
    statLabel: "Security Record",
  },
];
const MAINT_TIERS = [
  {
    tier: "Silver",
    price: "€8,500 / yr",
    c: "#a0a0a0",
    features: [
      "Annual inspection",
      "Oil & fluids service",
      "Basic diagnostics",
      "48-hr response",
    ],
  },
  {
    tier: "Gold",
    price: "€18,000 / yr",
    c: G,
    features: [
      "Bi-annual service",
      "Priority booking",
      "Loaner vehicle",
      "24-hr hotline",
      "OEM parts",
    ],
  },
  {
    tier: "Platinum",
    price: "€38,000 / yr",
    c: "#e5e0d0",
    features: [
      "Unlimited service",
      "Dedicated technician",
      "Factory inspection",
      "Concierge pickup",
      "All parts",
      "Valet service",
    ],
  },
];
const INS_PLANS = [
  {
    name: "Standard",
    cov: "€2M",
    price: "€4,200 / yr",
    feats: ["Theft & fire", "Accident damage", "Roadside assistance"],
  },
  {
    name: "Prestige",
    cov: "€8M",
    price: "€9,800 / yr",
    feats: ["All Standard+", "Track day cover", "Agreed value", "Global cover"],
  },
  {
    name: "Sovereign",
    cov: "Agreed",
    price: "Bespoke",
    feats: [
      "All Prestige+",
      "No depreciation",
      "Private valuation",
      "24/7 claims",
    ],
  },
];

const HUBS = [
  {
    id: "monaco",
    name: "Monaco",
    lat: 43.7384,
    lng: 7.4246,
    v: 12,
    region: "Europe",
  },
  {
    id: "london",
    name: "London",
    lat: 51.5074,
    lng: -0.1278,
    v: 18,
    region: "Europe",
  },
  {
    id: "dubai",
    name: "Dubai",
    lat: 25.2048,
    lng: 55.2708,
    v: 24,
    region: "Middle East",
  },
  {
    id: "miami",
    name: "Miami",
    lat: 25.7617,
    lng: -80.1918,
    v: 15,
    region: "Americas",
  },
  {
    id: "tokyo",
    name: "Tokyo",
    lat: 35.6762,
    lng: 139.6503,
    v: 9,
    region: "Asia Pacific",
  },
  {
    id: "singapore",
    name: "Singapore",
    lat: 1.3521,
    lng: 103.8198,
    v: 7,
    region: "Asia Pacific",
  },
  {
    id: "la",
    name: "Los Angeles",
    lat: 34.0522,
    lng: -118.2437,
    v: 11,
    region: "Americas",
  },
];

const ROUTES = [
  ["monaco", "london"],
  ["monaco", "dubai"],
  ["london", "miami"],
  ["london", "la"],
  ["dubai", "singapore"],
  ["dubai", "tokyo"],
  ["miami", "la"],
  ["singapore", "tokyo"],
  ["monaco", "singapore"],
  ["la", "tokyo"],
];

const SERVICES = [
  {
    id: "delivery",
    n: "01",
    title: "Borderless Delivery",
    sub: "Worldwide Logistics",
    cta: "Explore Delivery Routes",
    accent: "47+ Nations",
    blurb:
      "Six sovereign hubs. Forty-seven nations. One standard — absolute discretion. Air freight, enclosed transport and full customs clearance orchestrated so your acquisition arrives exactly as it left.",
    img: new URL("../../assets/wg-global-delivery.jpg", import.meta.url).href,
  },
  {
    id: "concierge",
    n: "02",
    title: "Private Concierge",
    sub: "Dedicated Advisor",
    cta: "Request Your Advisor",
    accent: "24 / 7 Access",
    blurb:
      "One advisor. Every detail. From first enquiry to final handover, your dedicated specialist handles sourcing, configuration and scheduling — so you simply decide.",
    img: new URL("../../assets/wg-private-concierge.jpg", import.meta.url).href,
  },
  {
    id: "config",
    n: "03",
    title: "Bespoke Atelier",
    sub: "Signature Configuration",
    cta: "Begin Configuration",
    accent: "Unlimited Options",
    blurb:
      "Manufacturer-level options unavailable anywhere else. Every surface, stitch and finish curated to your exact specification — creating a vehicle that exists nowhere else on earth.",
    img: new URL("../../assets/wg-custom-config.jpg", import.meta.url).href,
  },
  {
    id: "transport",
    n: "04",
    title: "Sovereign Transport",
    sub: "Secured Logistics",
    cta: "View Security Protocols",
    accent: "Fully Insured",
    blurb:
      "Enclosed armoured carriers. Real-time satellite tracking. Security escorts on request. Every kilometre of your vehicle's journey tracked, insured and documented.",
    img: new URL("../../assets/wg-secure-transport.jpg", import.meta.url).href,
  },
  {
    id: "maintenance",
    n: "05",
    title: "Atelier Service",
    sub: "VIP Maintenance",
    cta: "View Service Program",
    accent: "OEM Parts Only",
    blurb:
      "Factory-certified technicians. Priority scheduling. Original manufacturer parts, always. The atelier service experience — anywhere in the world.",
    img: new URL("../../assets/wg-vip-maintenance.jpg", import.meta.url).href,
  },
  {
    id: "insurance",
    n: "06",
    title: "Total Ownership",
    sub: "Insurance & Registration",
    cta: "View Coverage",
    accent: "Global Coverage",
    blurb:
      "Global insurance, registration and import documentation across every jurisdiction. Ownership begins the moment you decide — we handle everything else.",
    img: new URL("../../assets/wg-insurance.jpg", import.meta.url).href,
  },
];

/* ══════════════════════════════════════
   HOOKS
   ══════════════════════════════════════ */
function useInView(t = 0.08) {
  const r = useRef(null);
  const [v, sv] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) sv(true);
      },
      { threshold: t },
    );
    if (r.current) o.observe(r.current);
    return () => o.disconnect();
  }, []);
  return [r, v];
}

/* ══════════════════════════════════════
   LEAFLET MAP COMPONENT
   CartoDB Dark Matter — sin API key
   ══════════════════════════════════════ */
function LeafletMap({ height = "520px", inModal = false }) {
  const mapRef = useRef(null);
  const leafRef = useRef(null);
  const linesRef = useRef([]);
  const markRef = useRef([]);
  const selectHubRef = useRef(null); // callable from JSX: selectHubRef.current(hubId)
  const resetIconsRef = useRef(null); // callable from JSX: resetIconsRef.current()
  const [selHub, setSelHub] = useState(null);
  const [loaded, setLoaded] = useState(false);

  /* Load Leaflet CSS + JS once */
  useEffect(() => {
    if (window.L) {
      setLoaded(true);
      return;
    }
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href =
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
    document.head.appendChild(css);
    const js = document.createElement("script");
    js.src =
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
    js.onload = () => setLoaded(true);
    document.head.appendChild(js);
  }, []);

  /* Init map */
  useEffect(() => {
    if (!loaded || !mapRef.current || leafRef.current) return;
    const L = window.L;

    const map = L.map(mapRef.current, {
      center: [25, 18],
      zoom: inModal ? 2 : 2,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      dragging: true,
    });
    leafRef.current = map;

    /* CartoDB Dark Matter tile — free, no key */
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      { subdomains: "abcd", maxZoom: 19 },
    ).addTo(map);

    /* Gold overlay filter on tiles */
    const style = document.createElement("style");
    style.textContent = `
      .leaflet-tile { filter: sepia(0.3) hue-rotate(10deg) brightness(0.75) contrast(1.1) !important; }
      .leaflet-container { background: #050505 !important; }
    `;
    document.head.appendChild(style);

    /* Draw curved routes as SVG overlay */
    const svgNS = "http://www.w3.org/2000/svg";
    const svgEl = document.createElementNS(svgNS, "svg");
    svgEl.style.cssText =
      "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:400;overflow:visible;";
    mapRef.current.appendChild(svgEl);

    /* Animate routes */
    let frame;
    let tick = 0;
    const drawRoutes = (highlighted) => {
      while (svgEl.firstChild) svgEl.removeChild(svgEl.firstChild);
      ROUTES.forEach(([aId, bId]) => {
        const a = HUBS.find((h) => h.id === aId);
        const b = HUBS.find((h) => h.id === bId);
        const pa = map.latLngToContainerPoint([a.lat, a.lng]);
        const pb = map.latLngToContainerPoint([b.lat, b.lng]);
        const isHl =
          highlighted && (highlighted === aId || highlighted === bId);
        const mx = (pa.x + pb.x) / 2;
        const my = (pa.y + pb.y) / 2 - Math.abs(pa.x - pb.x) * 0.22;
        const path = document.createElementNS(svgNS, "path");
        path.setAttribute("d", `M${pa.x},${pa.y} Q${mx},${my} ${pb.x},${pb.y}`);
        path.setAttribute("fill", "none");
        path.setAttribute(
          "stroke",
          isHl ? "rgba(212,175,55,0.9)" : "rgba(212,175,55,0.25)",
        );
        path.setAttribute("stroke-width", isHl ? "1.8" : "0.9");
        path.setAttribute("stroke-dasharray", "6 5");
        path.setAttribute(
          "stroke-dashoffset",
          String(-(tick * (isHl ? 0.9 : 0.4))),
        );
        svgEl.appendChild(path);
      });
    };

    const animate = () => {
      tick = (tick + 1) % 400;
      drawRoutes(selHub);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    map.on("move zoom", () => drawRoutes(selHub));

    /* Custom marker icon factory */
    /* Wire selectHubRef so JSX legend buttons can trigger map interactions */
    selectHubRef.current = (hubId) => {
      const next = hubId === selHub ? null : hubId;
      setSelHub(next);
      const hub = HUBS.find((h) => h.id === hubId);
      if (hub) map.flyTo([hub.lat, hub.lng], 4, { duration: 1.2 });
      markRef.current.forEach((m, j) => {
        m.setIcon(makeIcon(HUBS[j].id === next));
      });
    };

    /* Wire resetIconsRef so close button can reset all icons */
    resetIconsRef.current = () => {
      markRef.current.forEach((m) => m.setIcon(makeIcon(false)));
    };

    const makeIcon = (isSelected) =>
      L.divIcon({
        className: "",
        iconSize: [isSelected ? 24 : 16, isSelected ? 24 : 16],
        iconAnchor: [isSelected ? 12 : 8, isSelected ? 12 : 8],
        html: `
        <div style="
          position:relative;width:${isSelected ? 24 : 16}px;height:${isSelected ? 24 : 16}px;
          display:flex;align-items:center;justify-content:center;">
          <div style="
            position:absolute;
            width:${isSelected ? 24 : 16}px;height:${isSelected ? 24 : 16}px;
            border-radius:50%;border:1px solid rgba(212,175,55,${isSelected ? 0.7 : 0.3});
            animation:hubRing 2s ease-in-out infinite;"></div>
          <div style="
            position:absolute;
            width:${isSelected ? 14 : 9}px;height:${isSelected ? 14 : 9}px;
            border-radius:50%;border:1px solid rgba(212,175,55,${isSelected ? 0.55 : 0.4});"></div>
          <div style="
            width:${isSelected ? 7 : 4}px;height:${isSelected ? 7 : 4}px;
            border-radius:50%;
            background:${isSelected ? "#D4AF37" : "rgba(212,175,55,0.85)"};
            box-shadow:0 0 ${isSelected ? 10 : 4}px rgba(212,175,55,${isSelected ? 0.9 : 0.5});
            position:relative;z-index:2;"></div>
        </div>
        <style>@keyframes hubRing{0%,100%{opacity:0.3;transform:scale(1)}50%{opacity:0.7;transform:scale(1.15)}}</style>
      `,
      });

    /* Add markers */
    HUBS.forEach((hub, i) => {
      const marker = L.marker([hub.lat, hub.lng], { icon: makeIcon(false) })
        .addTo(map)
        .on("click", () => {
          setSelHub((prev) => {
            const next = prev === hub.id ? null : hub.id;
            /* Update icon */
            markRef.current.forEach((m, j) => {
              m.setIcon(makeIcon(HUBS[j].id === next));
            });
            return next;
          });
        });
      markRef.current[i] = marker;
    });

    return () => {
      cancelAnimationFrame(frame);
      map.remove();
      leafRef.current = null;
    };
  }, [loaded, inModal]);

  /* Redraw routes when selHub changes */
  useEffect(() => {
    if (!leafRef.current) return;
    /* Icon update handled in click handler */
  }, [selHub]);

  const hub = HUBS.find((h) => h.id === selHub);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height,
        overflow: "hidden",
        background: "#050505",
      }}
    >
      {/* Leaflet container */}
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />

      {/* Top-left label */}
      <div
        style={{
          position: "absolute",
          top: "1.2rem",
          left: "1.4rem",
          zIndex: 500,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontFamily: "'Montserrat',sans-serif",
            fontSize: "0.38rem",
            letterSpacing: "0.48em",
            color: "rgba(212,175,55,0.5)",
            textTransform: "uppercase",
          }}
        >
          Global Logistics Network
        </div>
        <div
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "0.82rem",
            color: "rgba(255,255,255,0.22)",
            letterSpacing: "0.05em",
          }}
        >
          {HUBS.length} Active Hubs · {ROUTES.length} Live Routes
        </div>
      </div>

      {/* Hub info panel */}
      {hub && (
        <div
          style={{
            position: "absolute",
            bottom: "1.4rem",
            left: "1.4rem",
            zIndex: 500,
            background: "rgba(4,4,4,0.97)",
            border: "1px solid rgba(212,175,55,0.38)",
            padding: "1.2rem 1.6rem",
            minWidth: "200px",
            animation: "mlIn .3s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <button
            onClick={() => {
              setSelHub(null);
              resetIconsRef.current && resetIconsRef.current();
            }}
            style={{
              position: "absolute",
              top: "0.5rem",
              right: "0.6rem",
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.3)",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            ×
          </button>
          <div
            style={{
              fontFamily: "'Montserrat',sans-serif",
              fontSize: "0.37rem",
              letterSpacing: "0.42em",
              color: "rgba(212,175,55,0.45)",
              textTransform: "uppercase",
              marginBottom: "0.3rem",
            }}
          >
            {hub.region}
          </div>
          <div
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "1.5rem",
              fontWeight: 300,
              color: "#f0ece4",
            }}
          >
            {hub.name}
          </div>
          <div
            style={{
              width: 32,
              height: 1,
              background: `linear-gradient(to right,${G},transparent)`,
              margin: "0.55rem 0",
            }}
          />
          <div
            style={{ display: "flex", alignItems: "baseline", gap: "0.4rem" }}
          >
            <span
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "2rem",
                fontWeight: 200,
                color: G,
                lineHeight: 1,
              }}
            >
              {hub.v}
            </span>
            <span
              style={{
                fontFamily: "'Montserrat',sans-serif",
                fontSize: "0.37rem",
                letterSpacing: "0.28em",
                color: "rgba(255,255,255,0.22)",
                textTransform: "uppercase",
              }}
            >
              Available
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              marginTop: "0.6rem",
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "rgba(80,200,80,0.8)",
                display: "inline-block",
                animation: "sp 1.5s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontFamily: "'Montserrat',sans-serif",
                fontSize: "0.37rem",
                letterSpacing: "0.2em",
                color: "rgba(80,200,80,0.65)",
                textTransform: "uppercase",
              }}
            >
              Operational
            </span>
          </div>
        </div>
      )}

      {/* Hub legend bottom right */}
      <div
        style={{
          position: "absolute",
          bottom: "1rem",
          right: "1rem",
          zIndex: 500,
          display: "flex",
          flexWrap: "wrap",
          gap: "0.3rem",
          justifyContent: "flex-end",
          maxWidth: "380px",
        }}
      >
        {HUBS.map((h) => (
          <button
            key={h.id}
            onClick={() => selectHubRef.current && selectHubRef.current(h.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
              padding: "0.2rem 0.6rem",
              background:
                selHub === h.id ? "rgba(212,175,55,0.08)" : "rgba(0,0,0,0.72)",
              border:
                "1px solid " +
                (selHub === h.id ?
                  "rgba(212,175,55,0.55)"
                : "rgba(212,175,55,0.14)"),
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            <span
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: G,
                opacity: 0.75,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "'Montserrat',sans-serif",
                fontSize: "0.37rem",
                letterSpacing: "0.18em",
                color: selHub === h.id ? G : "rgba(212,175,55,0.55)",
                textTransform: "uppercase",
              }}
            >
              {h.name}
            </span>
          </button>
        ))}
      </div>

      {/* Vignette overlay for luxury feel */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 450,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Gold border top + bottom */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          zIndex: 500,
          background: `linear-gradient(to right,transparent,${G},transparent)`,
          opacity: 0.3,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          zIndex: 500,
          background: `linear-gradient(to right,transparent,${G},transparent)`,
          opacity: 0.3,
        }}
      />

      <style>{`
        @keyframes sp{0%,100%{opacity:1}50%{opacity:.35}}
        @keyframes mlIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
        .leaflet-control-attribution{display:none!important;}
        .leaflet-control-zoom{display:none!important;}
      `}</style>
    </div>
  );
}

/* ══════════════════════════════════════
   MODAL SHELL
   ══════════════════════════════════════ */
function Modal({ title, sub, wide, xwide, onClose, children }) {
  useEffect(() => {
    const h = (e) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", h);
    return () => {
      window.removeEventListener("keydown", h);
      document.body.style.overflow = "";
    };
  }, [onClose]);
  const maxW =
    xwide ? "1100px"
    : wide ? "960px"
    : "640px";
  return (
    <div className="ml-back" onClick={onClose}>
      <div
        className="ml-box"
        style={{ maxWidth: maxW }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="ml-hdr">
          <div>
            <div className="ml-sub">{sub}</div>
            <div className="ml-ttl">{title}</div>
          </div>
          <button className="ml-x" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="ml-body">{children}</div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MODAL: DELIVERY — Leaflet map real
   ══════════════════════════════════════ */
function DeliveryModal({ onClose }) {
  const [at, setAt] = useState(0);
  const transports = [
    { icon: "✈", label: "Air Freight", desc: "Private cargo — under 48h" },
    {
      icon: "🚛",
      label: "Enclosed Truck",
      desc: "Climate-controlled, GPS-tracked",
    },
    { icon: "🚢", label: "Secure Sea", desc: "Crated, insured ocean freight" },
  ];
  return (
    <Modal
      title="Global Delivery Routes"
      sub="Worldwide Logistics Network"
      xwide
      onClose={onClose}
    >
      <div style={{ marginBottom: "1rem" }}>
        <LeafletMap height="420px" inModal />
      </div>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
        {transports.map((t, i) => (
          <button
            key={i}
            className={`dm-tt${at === i ? " a" : ""}`}
            onClick={() => setAt(i)}
            style={{ flex: 1 }}
          >
            <span style={{ fontSize: "1rem", flexShrink: 0 }}>{t.icon}</span>
            <div>
              <div className="dm-tt-nm">{t.label}</div>
              <div className="dm-tt-ds">{t.desc}</div>
            </div>
          </button>
        ))}
      </div>
      <div
        style={{
          fontFamily: "'Montserrat',sans-serif",
          fontSize: "0.4rem",
          letterSpacing: "0.28em",
          color: "rgba(212,175,55,0.3)",
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        Click any hub · {transports[at].label} active
      </div>
    </Modal>
  );
}

/* ══════════════════════════════════════
   MODAL: CONCIERGE
   ══════════════════════════════════════ */
function ConciergeModal({ onClose }) {
  const [f, sf] = useState({
    name: "",
    email: "",
    phone: "",
    vehicle: "",
    msg: "",
  });
  const [phase, setPhase] = useState("idle"); // idle | busy | sent | closing | error
  const [errors, setE] = useState({});
  const [serverErr, setServerErr] = useState("");
  const refNum = useRef("");

  /* Client-side validation */
  const validate = () => {
    const e = {};
    if (!f.name.trim()) e.name = "This field is required";
    if (!f.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
      e.email = "A valid address is required";
    return e;
  };

  /* Real fetch to backend */
  const submit = async () => {
    const e = validate();
    if (Object.keys(e).length) {
      setE(e);
      return;
    }
    setPhase("busy");
    setServerErr("");

    try {
      const API = import.meta.env?.VITE_API_URL || "http://localhost:3000";

      const res = await fetch(API + "/api/advisor-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: f.name,
          email: f.email,
          phone: f.phone || undefined,
          vehicleInterest: f.vehicle || undefined,
          message: f.msg || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        /* Backend validation errors */
        if (data.errors) {
          const mapped = {};
          if (data.errors.fullName) mapped.name = data.errors.fullName;
          if (data.errors.email) mapped.email = data.errors.email;
          setE(mapped);
          setPhase("idle");
          return;
        }
        throw new Error(data.error || "Server error");
      }

      /* Success — store reference from server */
      refNum.current = data.reference;
      setPhase("sent");
    } catch (err) {
      console.error("[advisor-request] fetch error:", err.message);
      setServerErr(
        "We were unable to submit your request. Please try again or contact us directly.",
      );
      setPhase("error");
    }
  };

  const handleClose = () => {
    setPhase("closing");
    setTimeout(onClose, 500);
  };

  /* ── CONFIRMATION SCREEN ── */
  if (phase === "sent")
    return (
      <div className="cc-backdrop" onClick={handleClose}>
        <div
          className="cc-panel cc-panel--confirm"
          onClick={(e) => e.stopPropagation()}
        >
          <style>{`
          @keyframes ccIn  { from { opacity:0; transform:translateY(28px) scale(0.96); filter:blur(6px); } to { opacity:1; transform:none; filter:blur(0); } }
          @keyframes ccOut { from { opacity:1; transform:none; }  to { opacity:0; transform:translateY(-16px) scale(0.97); } }
          @keyframes lineDraw { from { width:0; } to { width:100%; } }
          @keyframes diamondSpin { from { transform:rotate(0deg) scale(0); opacity:0; } 60% { transform:rotate(180deg) scale(1.2); opacity:1; } to { transform:rotate(360deg) scale(1); opacity:1; } }
          @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:none; } }
        `}</style>
          <div className="cc-confirm-inner">
            <div className="cc-diamond">◆</div>
            <div className="cc-confirm-rule" />
            <h2 className="cc-confirm-title">Consultation Initiated</h2>
            <p className="cc-confirm-sub">
              Your dedicated advisor has been notified and will contact you
              within two hours.
            </p>
            <div className="cc-ref">
              Reference: <span className="cc-ref-code">{refNum.current}</span>
            </div>
            <p className="cc-confirm-disc">
              All subsequent communications are handled with absolute
              discretion.
            </p>
            <button className="cc-close-btn" onClick={handleClose}>
              Close Session →
            </button>
          </div>
        </div>
      </div>
    );

  /* ── MAIN FORM ── */
  return (
    <div
      className={"cc-backdrop" + (phase === "closing" ? " cc-closing" : "")}
      onClick={handleClose}
    >
      <style>{`
        /* ── BACKDROP ── */
        .cc-backdrop {
          position:fixed; inset:0; z-index:9000;
          background:rgba(0,0,0,0.88);
          backdrop-filter:blur(12px) saturate(0.6);
          display:flex; align-items:center; justify-content:center;
          padding:1.5rem;
          animation:ccIn 0.55s cubic-bezier(0.22,1,0.36,1) both;
        }
        .cc-backdrop.cc-closing { animation:ccOut 0.45s ease forwards; }
        @keyframes ccIn  { from { opacity:0; } to { opacity:1; } }
        @keyframes ccOut { from { opacity:1; } to { opacity:0; } }

        /* ── PANEL ── */
        .cc-panel {
          position:relative;
          width:100%; max-width:720px; max-height:92vh;
          background:linear-gradient(160deg, #0c0c0c 0%, #080808 60%, #0a0a08 100%);
          border:1px solid rgba(212,175,55,0.22);
          box-shadow:
            0 0 0 1px rgba(0,0,0,0.8),
            0 40px 120px rgba(0,0,0,0.9),
            0 0 60px rgba(212,175,55,0.04),
            inset 0 1px 0 rgba(212,175,55,0.08);
          overflow:hidden;
          display:flex; flex-direction:column;
          animation:panelIn 0.6s cubic-bezier(0.22,1,0.36,1) both;
        }
        @keyframes panelIn {
          from { opacity:0; transform:translateY(32px) scale(0.96); filter:blur(8px); }
          to   { opacity:1; transform:none; filter:blur(0); }
        }

        /* Top gold accent line */
        .cc-panel::before {
          content:'';
          position:absolute; top:0; left:0; right:0; height:1px;
          background:linear-gradient(90deg,
            transparent 0%,
            rgba(212,175,55,0.15) 20%,
            rgba(212,175,55,0.6) 50%,
            rgba(212,175,55,0.15) 80%,
            transparent 100%);
        }

        /* Radial glow top-center */
        .cc-panel::after {
          content:'';
          position:absolute; top:-40px; left:50%; transform:translateX(-50%);
          width:400px; height:200px;
          background:radial-gradient(ellipse, rgba(212,175,55,0.06) 0%, transparent 70%);
          pointer-events:none;
        }

        /* ── HEADER ── */
        .cc-header {
          position:relative; z-index:2;
          padding:2.8rem 3rem 0;
          border-bottom:1px solid rgba(212,175,55,0.07);
          padding-bottom:2rem;
        }
        .cc-access-tag {
          display:inline-flex; align-items:center; gap:0.7rem;
          margin-bottom:1.4rem;
          opacity:0; animation:fadeUp 0.6s 0.2s ease forwards;
        }
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:none; } }
        .cc-tag-line {
          width:28px; height:1px;
          background:linear-gradient(to right, rgba(212,175,55,0.6), transparent);
        }
        .cc-tag-text {
          font-family:'Montserrat',sans-serif;
          font-size:0.42rem; letter-spacing:0.55em;
          color:rgba(212,175,55,0.55); text-transform:uppercase;
        }
        .cc-tag-line-r {
          background:linear-gradient(to left, rgba(212,175,55,0.6), transparent);
        }
        .cc-title {
          font-family:'Playfair Display',serif;
          font-size:clamp(1.8rem,3.5vw,2.8rem);
          font-weight:400; letter-spacing:0.02em; line-height:1.05;
          color:#f5f0e8;
          margin:0 0 0.6rem;
          opacity:0; animation:fadeUp 0.7s 0.3s ease forwards;
        }
        .cc-title em { font-style:italic; color:#D4AF37; }
        .cc-subtitle {
          font-family:'Cormorant Garamond',serif;
          font-size:0.95rem; font-style:italic; font-weight:300;
          color:rgba(255,255,255,0.25); letter-spacing:0.04em;
          margin:0;
          opacity:0; animation:fadeUp 0.7s 0.4s ease forwards;
        }
        .cc-x {
          position:absolute; top:1.6rem; right:1.8rem;
          width:32px; height:32px;
          background:transparent;
          border:1px solid rgba(255,255,255,0.08);
          color:rgba(255,255,255,0.3);
          font-size:1.1rem; cursor:pointer;
          display:flex; align-items:center; justify-content:center;
          transition:all 0.35s ease;
        }
        .cc-x:hover {
          border-color:rgba(212,175,55,0.45);
          color:#D4AF37;
          box-shadow:0 0 12px rgba(212,175,55,0.15);
        }

        /* ── BODY ── */
        .cc-body {
          flex:1; overflow-y:auto;
          padding:2.4rem 3rem 0;
          scrollbar-width:thin;
          scrollbar-color:rgba(212,175,55,0.2) transparent;
        }

        /* ── FIELD GROUP ── */
        .cc-grid { display:grid; grid-template-columns:1fr 1fr; gap:1.4rem; margin-bottom:1.4rem; }
        .cc-field { display:flex; flex-direction:column; gap:0.55rem; }
        .cc-label {
          font-family:'Montserrat',sans-serif;
          font-size:0.38rem; letter-spacing:0.45em;
          color:rgba(212,175,55,0.4); text-transform:uppercase;
          display:flex; align-items:center; gap:0.4rem;
        }
        .cc-req { color:rgba(212,175,55,0.65); font-size:0.55rem; }
        .cc-input, .cc-select, .cc-textarea {
          background:rgba(255,255,255,0.025);
          border:1px solid rgba(255,255,255,0.07);
          border-bottom:1px solid rgba(212,175,55,0.15);
          color:#e8e0d0;
          padding:0.9rem 1.1rem;
          font-family:'Cormorant Garamond',serif;
          font-size:1rem; font-weight:300;
          outline:none;
          width:100%; box-sizing:border-box;
          transition:
            border-color 0.4s ease,
            background 0.4s ease,
            box-shadow 0.4s ease;
          letter-spacing:0.02em;
        }
        .cc-input::placeholder,
        .cc-textarea::placeholder { color:rgba(255,255,255,0.15); font-style:italic; }
        .cc-input:focus, .cc-select:focus, .cc-textarea:focus {
          border-color:rgba(212,175,55,0.45);
          border-bottom-color:rgba(212,175,55,0.8);
          background:rgba(212,175,55,0.03);
          box-shadow:
            0 4px 24px rgba(212,175,55,0.06),
            inset 0 -1px 0 rgba(212,175,55,0.3);
        }
        .cc-input.cc-err, .cc-select.cc-err { border-color:rgba(200,60,60,0.4); border-bottom-color:rgba(200,60,60,0.7); }
        .cc-error {
          font-family:'Montserrat',sans-serif;
          font-size:0.36rem; letter-spacing:0.15em;
          color:rgba(200,80,80,0.65);
          animation:fadeUp 0.3s ease;
        }
        .cc-select { appearance:none; cursor:pointer; }
        .cc-select option { background:#0c0c0c; color:#e8e0d0; }
        .cc-textarea { resize:vertical; min-height:110px; line-height:1.75; }

        /* ── FOOTER ── */
        .cc-footer {
          padding:1.8rem 3rem 2.4rem;
          position:relative; z-index:2;
        }
        .cc-submit {
          width:100%;
          padding:1.15rem 2rem;
          background:transparent;
          border:1px solid rgba(212,175,55,0.38);
          color:#D4AF37;
          font-family:'Montserrat',sans-serif;
          font-size:0.48rem; letter-spacing:0.42em; text-transform:uppercase;
          cursor:pointer;
          position:relative; overflow:hidden;
          transition:letter-spacing 0.4s ease, border-color 0.4s ease, color 0.4s ease;
          display:flex; align-items:center; justify-content:center; gap:0.8rem;
        }
        .cc-submit::before {
          content:'';
          position:absolute; inset:0;
          background:linear-gradient(90deg, transparent, rgba(212,175,55,0.08), transparent);
          transform:translateX(-100%);
          transition:transform 0.7s cubic-bezier(0.23,1,0.32,1);
        }
        .cc-submit:hover { letter-spacing:0.5em; border-color:rgba(212,175,55,0.75); }
        .cc-submit:hover::before { transform:translateX(100%); }
        .cc-submit:disabled { opacity:0.5; cursor:not-allowed; letter-spacing:0.42em; }
        .cc-submit:disabled::before { transform:none; }

        /* spinner */
        .cc-spin {
          width:13px; height:13px;
          border:1px solid rgba(212,175,55,0.25);
          border-top-color:#D4AF37;
          border-radius:50%;
          animation:spin 0.9s linear infinite;
          flex-shrink:0;
        }
        @keyframes spin { to { transform:rotate(360deg); } }

        .cc-disc {
          text-align:center; margin-top:1.2rem;
          font-family:'Cormorant Garamond',serif;
          font-size:0.78rem; font-style:italic; font-weight:300;
          color:rgba(255,255,255,0.14); letter-spacing:0.04em; line-height:1.6;
        }

        /* ── CONFIRMATION ── */
        .cc-panel--confirm {
          max-width:560px;
          animation:panelIn 0.65s cubic-bezier(0.22,1,0.36,1) both;
        }
        .cc-confirm-inner {
          padding:4rem 3.5rem;
          display:flex; flex-direction:column; align-items:center; text-align:center;
        }
        .cc-diamond {
          font-size:2.2rem; color:#D4AF37;
          animation:diamondSpin 0.9s 0.1s cubic-bezier(0.22,1,0.36,1) both;
          margin-bottom:1.8rem;
          filter:drop-shadow(0 0 16px rgba(212,175,55,0.4));
        }
        @keyframes diamondSpin {
          from { opacity:0; transform:rotate(-90deg) scale(0.5); }
          to   { opacity:1; transform:rotate(0deg) scale(1); }
        }
        .cc-confirm-rule {
          width:0; height:1px;
          background:linear-gradient(to right,transparent,rgba(212,175,55,0.5),transparent);
          margin:0 auto 1.8rem;
          animation:lineDraw 0.8s 0.5s ease forwards;
        }
        @keyframes lineDraw { to { width:120px; } }
        .cc-confirm-title {
          font-family:'Playfair Display',serif;
          font-size:2.1rem; font-weight:400; letter-spacing:0.03em;
          color:#f0ece4; margin:0 0 1rem;
          opacity:0; animation:fadeUp 0.7s 0.6s ease forwards;
        }
        .cc-confirm-sub {
          font-family:'Cormorant Garamond',serif;
          font-size:1.05rem; font-weight:300; font-style:italic;
          color:rgba(255,255,255,0.38); line-height:1.75; max-width:360px;
          margin:0 0 1.5rem;
          opacity:0; animation:fadeUp 0.7s 0.75s ease forwards;
        }
        .cc-ref {
          font-family:'Montserrat',sans-serif;
          font-size:0.4rem; letter-spacing:0.38em; text-transform:uppercase;
          color:rgba(255,255,255,0.2); margin-bottom:2.2rem;
          opacity:0; animation:fadeUp 0.7s 0.9s ease forwards;
        }
        .cc-ref-code { color:#D4AF37; }
        .cc-confirm-disc {
          font-family:'Cormorant Garamond',serif;
          font-size:0.82rem; font-style:italic; color:rgba(255,255,255,0.18);
          line-height:1.7; max-width:320px; margin:0 0 2.5rem;
          opacity:0; animation:fadeUp 0.7s 1s ease forwards;
        }
        .cc-close-btn {
          background:transparent;
          border:1px solid rgba(212,175,55,0.3);
          color:rgba(212,175,55,0.65);
          font-family:'Montserrat',sans-serif;
          font-size:0.44rem; letter-spacing:0.35em; text-transform:uppercase;
          padding:0.85rem 2.2rem; cursor:pointer;
          transition:all 0.4s ease;
          opacity:0; animation:fadeUp 0.7s 1.1s ease forwards;
        }
        .cc-close-btn:hover {
          border-color:rgba(212,175,55,0.65);
          color:#D4AF37;
          letter-spacing:0.42em;
          box-shadow:0 0 20px rgba(212,175,55,0.1);
        }

        /* Responsive */
        @media(max-width:640px){
          .cc-header,.cc-body,.cc-footer { padding-left:1.8rem; padding-right:1.8rem; }
          .cc-grid { grid-template-columns:1fr; }
          .cc-confirm-inner { padding:3rem 2rem; }
        }
      `}</style>

      <div className="cc-panel" onClick={(e) => e.stopPropagation()}>
        {/* ── HEADER ── */}
        <div className="cc-header">
          <button className="cc-x" onClick={handleClose}>
            ×
          </button>
          <div className="cc-access-tag">
            <span className="cc-tag-line" />
            <span className="cc-tag-text">Private Concierge Access</span>
            <span className="cc-tag-line cc-tag-line-r" />
          </div>
          <h2 className="cc-title">
            Initiate <em>Private</em> Consultation
          </h2>
          <p className="cc-subtitle">
            Reserved for clients with exceptional standards.
          </p>
        </div>

        {/* ── BODY ── */}
        <div className="cc-body">
          <div className="cc-grid">
            <div className="cc-field">
              <label className="cc-label">
                Full Name <span className="cc-req">*</span>
              </label>
              <input
                className={"cc-input" + (errors.name ? " cc-err" : "")}
                type="text"
                placeholder="As it appears on documentation"
                value={f.name}
                onChange={(e) => {
                  sf({ ...f, name: e.target.value });
                  setE({ ...errors, name: "" });
                }}
              />
              {errors.name && <span className="cc-error">{errors.name}</span>}
            </div>
            <div className="cc-field">
              <label className="cc-label">
                Private Email <span className="cc-req">*</span>
              </label>
              <input
                className={"cc-input" + (errors.email ? " cc-err" : "")}
                type="email"
                placeholder="Confidential address"
                value={f.email}
                onChange={(e) => {
                  sf({ ...f, email: e.target.value });
                  setE({ ...errors, email: "" });
                }}
              />
              {errors.email && <span className="cc-error">{errors.email}</span>}
            </div>
          </div>
          <div className="cc-grid">
            <div className="cc-field">
              <label className="cc-label">Preferred Contact</label>
              <input
                className="cc-input"
                type="tel"
                placeholder="+1 (000) 000-0000"
                value={f.phone}
                onChange={(e) => sf({ ...f, phone: e.target.value })}
              />
            </div>
            <div className="cc-field">
              <label className="cc-label">Vehicle of Interest</label>
              <select
                className="cc-select"
                value={f.vehicle}
                onChange={(e) => sf({ ...f, vehicle: e.target.value })}
              >
                <option value="">Select an acquisition…</option>
                {[
                  "Bugatti Chiron",
                  "Ferrari Roma",
                  "Pagani Huayra",
                  "Rolls-Royce Phantom",
                  "Koenigsegg Regera",
                  "Lamborghini Veneno",
                  "Aston Martin Valkyrie",
                  "Hennessey Venom F5",
                  "Toyota Supra MK5",
                ].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="cc-field" style={{ marginBottom: "0.4rem" }}>
            <label className="cc-label">Acquisition Brief</label>
            <textarea
              className="cc-textarea"
              placeholder="Describe your requirements — vehicle specifications, timeline, delivery location, bespoke preferences…"
              value={f.msg}
              onChange={(e) => sf({ ...f, msg: e.target.value })}
            />
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div className="cc-footer">
          {/* Server error banner */}
          {(phase === "error" || serverErr) && (
            <div
              style={{
                marginBottom: "1.2rem",
                padding: "0.9rem 1.2rem",
                border: "1px solid rgba(200,60,60,0.3)",
                background: "rgba(200,60,60,0.05)",
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "0.88rem",
                fontStyle: "italic",
                color: "rgba(220,100,100,0.75)",
                lineHeight: 1.6,
                display: "flex",
                alignItems: "flex-start",
                gap: "0.7rem",
              }}
            >
              <span
                style={{
                  color: "rgba(200,60,60,0.6)",
                  flexShrink: 0,
                  marginTop: "0.05rem",
                }}
              >
                ◈
              </span>
              <span>
                {serverErr || "An unexpected error occurred. Please try again."}
              </span>
            </div>
          )}
          <button
            className="cc-submit"
            onClick={
              phase === "error" ?
                () => {
                  setPhase("idle");
                  setServerErr("");
                }
              : submit
            }
            disabled={phase === "busy"}
          >
            {phase === "busy" ?
              <>
                <span className="cc-spin" />
                Securing your request…
              </>
            : phase === "error" ?
              "Retry →"
            : "Begin Confidential Process →"}
          </button>
          <p className="cc-disc">
            All communications are handled with absolute discretion. No
            information is shared with third parties.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MODAL: CONFIG
   ══════════════════════════════════════ */
function ConfigModal({ onClose }) {
  const [tab, setTab] = useState("color");
  const [sc, setSc] = useState(0);
  const [si, setSi] = useState(0);
  const [sw, setSw] = useState(0);
  const [sx, setSx] = useState([]);
  const [saved, setSaved] = useState(false);
  const toggleX = (i) =>
    setSx((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));
  const total = sx.reduce(
    (a, i) => a + (parseInt(EXTRAS[i].price.replace(/[^0-9]/g, "")) || 0),
    0,
  );
  return (
    <Modal
      title="Vehicle Configuration"
      sub="Bespoke Specification"
      xwide
      onClose={onClose}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 340px",
          gap: 0,
          height: "560px",
        }}
      >
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            background: "#060606",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1000&q=85&auto=format&fit=crop"
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(0.45) saturate(0.6)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(ellipse at 60% 40%, ${EXT_COLORS[sc].hex}28, transparent 65%)`,
              transition: "background 0.5s ease",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "2rem",
              background: "linear-gradient(to top,rgba(0,0,0,0.9),transparent)",
            }}
          >
            <div
              style={{
                fontFamily: "'Montserrat',sans-serif",
                fontSize: "0.38rem",
                letterSpacing: "0.4em",
                color: "rgba(212,175,55,0.5)",
                textTransform: "uppercase",
                marginBottom: "0.4rem",
              }}
            >
              Current Selection
            </div>
            <div
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "1.5rem",
                fontWeight: 400,
                color: "#f0ece4",
              }}
            >
              {EXT_COLORS[sc].name}
            </div>
            <div
              style={{
                fontFamily: "'Montserrat',sans-serif",
                fontSize: "0.42rem",
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.15em",
                marginTop: "0.2rem",
              }}
            >
              {INTERIORS[si].name} · {WHEELS[sw].name}
            </div>
            {sx.length > 0 && (
              <div
                style={{
                  marginTop: "0.5rem",
                  fontFamily: "'Montserrat',sans-serif",
                  fontSize: "0.38rem",
                  color: G,
                }}
              >
                +{sx.length} extra{sx.length > 1 ? "s" : ""} · +€
                {total.toLocaleString()}
              </div>
            )}
          </div>
        </div>
        <div
          style={{
            background: "rgba(5,5,5,0.99)",
            borderLeft: "1px solid rgba(212,175,55,0.08)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "1px",
              borderBottom: "1px solid rgba(212,175,55,0.08)",
              flexShrink: 0,
            }}
          >
            {[
              ["color", "Exterior"],
              ["interior", "Interior"],
              ["wheels", "Wheels"],
              ["extras", "Extras"],
            ].map(([k, l]) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                style={{
                  flex: 1,
                  padding: "0.85rem 0.3rem",
                  background:
                    tab === k ? "rgba(212,175,55,0.06)" : "transparent",
                  border: "none",
                  borderBottom:
                    tab === k ? `2px solid ${G}` : "2px solid transparent",
                  color: tab === k ? G : "rgba(255,255,255,0.28)",
                  fontFamily: "'Montserrat',sans-serif",
                  fontSize: "0.42rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                {l}
              </button>
            ))}
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "1.2rem" }}>
            {tab === "color" && (
              <div>
                <div className="cfg-lbl">Exterior Colour</div>
                {EXT_COLORS.map((c, i) => (
                  <button
                    key={i}
                    className={`cfg-sw${sc === i ? " a" : ""}`}
                    onClick={() => setSc(i)}
                  >
                    <span
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        background: c.hex,
                        border:
                          c.hex === "#f0f0ee" ?
                            "1px solid rgba(255,255,255,0.25)"
                          : "none",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        flex: 1,
                        fontFamily: "'Montserrat',sans-serif",
                        fontSize: "0.48rem",
                        color: "rgba(255,255,255,0.6)",
                      }}
                    >
                      {c.name}
                    </span>
                    {sc === i && <span style={{ color: G }}>✓</span>}
                  </button>
                ))}
              </div>
            )}
            {tab === "interior" && (
              <div>
                <div className="cfg-lbl">Interior Material</div>
                {INTERIORS.map((it, i) => (
                  <button
                    key={i}
                    className={`cfg-sw${si === i ? " a" : ""}`}
                    onClick={() => setSi(i)}
                  >
                    <span
                      style={{
                        width: 20,
                        height: 20,
                        background: `rgba(212,175,55,${0.1 + i * 0.2})`,
                        border: "1px solid rgba(212,175,55,0.2)",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        flex: 1,
                        fontFamily: "'Montserrat',sans-serif",
                        fontSize: "0.48rem",
                        color: "rgba(255,255,255,0.6)",
                      }}
                    >
                      {it.name}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Montserrat',sans-serif",
                        fontSize: "0.4rem",
                        color: "rgba(212,175,55,0.5)",
                      }}
                    >
                      {it.price}
                    </span>
                  </button>
                ))}
              </div>
            )}
            {tab === "wheels" && (
              <div>
                <div className="cfg-lbl">Wheel Package</div>
                {WHEELS.map((w, i) => (
                  <button
                    key={i}
                    className={`cfg-sw${sw === i ? " a" : ""}`}
                    onClick={() => setSw(i)}
                  >
                    <span
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        background: "transparent",
                        border: "2px solid rgba(212,175,55,0.4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: "rgba(212,175,55,0.6)",
                        }}
                      />
                    </span>
                    <span
                      style={{
                        flex: 1,
                        fontFamily: "'Montserrat',sans-serif",
                        fontSize: "0.48rem",
                        color: "rgba(255,255,255,0.6)",
                      }}
                    >
                      {w.name}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Montserrat',sans-serif",
                        fontSize: "0.4rem",
                        color: "rgba(212,175,55,0.5)",
                      }}
                    >
                      {w.price}
                    </span>
                  </button>
                ))}
              </div>
            )}
            {tab === "extras" && (
              <div>
                <div className="cfg-lbl">Optional Extras</div>
                {EXTRAS.map((x, i) => (
                  <button
                    key={i}
                    className={`cfg-sw${sx.includes(i) ? " a" : ""}`}
                    onClick={() => toggleX(i)}
                  >
                    <span
                      style={{
                        width: 18,
                        height: 18,
                        border: `1px solid ${sx.includes(i) ? G : "rgba(255,255,255,0.2)"}`,
                        background:
                          sx.includes(i) ?
                            "rgba(212,175,55,0.15)"
                          : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        fontSize: "0.55rem",
                        color: G,
                      }}
                    >
                      {sx.includes(i) ? "✓" : ""}
                    </span>
                    <span
                      style={{
                        flex: 1,
                        fontFamily: "'Montserrat',sans-serif",
                        fontSize: "0.48rem",
                        color: "rgba(255,255,255,0.6)",
                      }}
                    >
                      {x.name}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Montserrat',sans-serif",
                        fontSize: "0.4rem",
                        color: "rgba(212,175,55,0.5)",
                      }}
                    >
                      {x.price}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div
            style={{
              padding: "1rem 1.2rem",
              borderTop: "1px solid rgba(212,175,55,0.08)",
              flexShrink: 0,
            }}
          >
            <button
              className="wgbtn wgbtn-full"
              onClick={() => {
                setSaved(true);
                setTimeout(() => setSaved(false), 2000);
              }}
            >
              {saved ? "✓ Configuration Saved" : "Save Configuration →"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

/* ══════════════════════════════════════
   MODAL: SECURITY
   ══════════════════════════════════════ */
function SecurityModal({ onClose }) {
  const [active, setActive] = useState(0);
  const [pos, setPos] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setPos((p) => (p >= 100 ? 0 : p + 0.4)), 40);
    return () => clearInterval(id);
  }, []);
  const feat = SEC_FEATURES[active];
  return (
    <Modal
      title="Security Protocols"
      sub="Secure Transport"
      wide
      onClose={onClose}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "200px 1fr",
          gap: "1.2rem",
          minHeight: "400px",
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}
        >
          {SEC_FEATURES.map((f, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.7rem",
                padding: "0.85rem 1rem",
                background:
                  active === i ? "rgba(212,175,55,0.06)" : "transparent",
                border: `1px solid ${active === i ? "rgba(212,175,55,0.45)" : "rgba(255,255,255,0.05)"}`,
                color: active === i ? G : "rgba(255,255,255,0.32)",
                fontFamily: "'Montserrat',sans-serif",
                fontSize: "0.46rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.3s ease",
                textAlign: "left",
              }}
            >
              <span style={{ fontSize: "0.9rem" }}>{f.icon}</span>
              <span>{f.title}</span>
            </button>
          ))}
          <div
            style={{
              marginTop: "auto",
              padding: "0.8rem",
              border: "1px solid rgba(80,200,80,0.18)",
              background: "rgba(80,200,80,0.03)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                marginBottom: "0.4rem",
              }}
            >
              <span className="sec-dot" />
              <span
                style={{
                  fontFamily: "'Montserrat',sans-serif",
                  fontSize: "0.38rem",
                  letterSpacing: "0.22em",
                  color: "rgba(80,200,80,0.65)",
                  textTransform: "uppercase",
                }}
              >
                All Systems Active
              </span>
            </div>
            <div
              style={{
                fontFamily: "'Montserrat',sans-serif",
                fontSize: "0.36rem",
                color: "rgba(255,255,255,0.2)",
                letterSpacing: "0.15em",
              }}
            >
              Last verified 30s ago
            </div>
          </div>
        </div>
        <div style={{ padding: "0.2rem 0.8rem" }}>
          <div style={{ fontSize: "2.8rem", marginBottom: "0.8rem" }}>
            {feat.icon}
          </div>
          <div
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "1.9rem",
              fontWeight: 400,
              color: "#f0ece4",
              marginBottom: "0.4rem",
            }}
          >
            {feat.title}
          </div>
          <div
            style={{
              width: 40,
              height: 1,
              background: `linear-gradient(to right,${G},transparent)`,
              marginBottom: "1.2rem",
            }}
          />
          <p
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "0.95rem",
              lineHeight: 1.9,
              color: "rgba(255,255,255,0.45)",
              marginBottom: "1.8rem",
              fontWeight: 300,
            }}
          >
            {feat.desc}
          </p>
          <div
            style={{
              display: "inline-flex",
              flexDirection: "column",
              padding: "0.8rem 1.4rem",
              border: "1px solid rgba(212,175,55,0.2)",
              background: "rgba(212,175,55,0.04)",
              marginBottom: "1.8rem",
            }}
          >
            <div
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "1.6rem",
                color: G,
                lineHeight: 1,
              }}
            >
              {feat.stat}
            </div>
            <div
              style={{
                fontFamily: "'Montserrat',sans-serif",
                fontSize: "0.38rem",
                letterSpacing: "0.38em",
                color: "rgba(255,255,255,0.25)",
                textTransform: "uppercase",
                marginTop: "0.3rem",
              }}
            >
              {feat.statLabel}
            </div>
          </div>
          <div
            style={{
              border: "1px solid rgba(212,175,55,0.1)",
              padding: "1.1rem",
            }}
          >
            <div
              style={{
                fontFamily: "'Montserrat',sans-serif",
                fontSize: "0.38rem",
                letterSpacing: "0.38em",
                color: "rgba(212,175,55,0.4)",
                textTransform: "uppercase",
                marginBottom: "0.8rem",
              }}
            >
              Live Route Simulation
            </div>
            <div
              style={{
                height: 2,
                background: "rgba(255,255,255,0.05)",
                marginBottom: "1rem",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: `${pos}%`,
                  background: `linear-gradient(to right,${G},rgba(212,175,55,0.3))`,
                  transition: "width 0.04s linear",
                  boxShadow: `0 0 8px rgba(212,175,55,0.5)`,
                }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {["Origin", "Customs", "Transit", "Delivery"].map((n, i) => {
                const p = pos >= i * 33;
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.35rem",
                    }}
                  >
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: p ? G : "transparent",
                        border: `1px solid ${p ? G : "rgba(212,175,55,0.3)"}`,
                        boxShadow: p ? `0 0 6px rgba(212,175,55,0.5)` : "none",
                        transition: "all 0.3s ease",
                      }}
                    />
                    <div
                      style={{
                        fontFamily: "'Montserrat',sans-serif",
                        fontSize: "0.36rem",
                        color:
                          p ? "rgba(212,175,55,0.6)" : "rgba(255,255,255,0.2)",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                      }}
                    >
                      {n}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

/* ══════════════════════════════════════
   MODAL: MAINTENANCE
   ══════════════════════════════════════ */
function MaintenanceModal({ onClose }) {
  const [sel, setSel] = useState(1);
  return (
    <Modal
      title="Maintenance Program"
      sub="VIP Priority Service"
      wide
      onClose={onClose}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.1fr",
          gap: "1.5rem",
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          {MAINT_TIERS.map((t, i) => (
            <button
              key={i}
              className={`mnt-tier${sel === i ? " a" : ""}`}
              style={{ "--tc": t.c }}
              onClick={() => setSel(i)}
            >
              <div
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "1.4rem",
                  color: t.c,
                  marginBottom: ".3rem",
                }}
              >
                {t.tier}
              </div>
              <div
                style={{
                  fontFamily: "'Montserrat',sans-serif",
                  fontSize: ".5rem",
                  color: "rgba(255,255,255,.4)",
                  marginBottom: ".8rem",
                  letterSpacing: "0.1em",
                }}
              >
                {t.price}
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {t.features.map((f, j) => (
                  <li
                    key={j}
                    style={{
                      fontFamily: "'Montserrat',sans-serif",
                      fontSize: ".44rem",
                      color: "rgba(255,255,255,.32)",
                      padding: ".18rem 0",
                      letterSpacing: "0.05em",
                    }}
                  >
                    ◆ {f}
                  </li>
                ))}
              </ul>
              {sel === i && (
                <div
                  style={{
                    position: "absolute",
                    top: ".7rem",
                    right: ".7rem",
                    fontSize: ".38rem",
                    color: G,
                    border: `1px solid rgba(212,175,55,.3)`,
                    padding: ".2rem .5rem",
                    letterSpacing: ".2em",
                    textTransform: "uppercase",
                    fontFamily: "'Montserrat',sans-serif",
                  }}
                >
                  Selected
                </div>
              )}
            </button>
          ))}
        </div>
        <div>
          <div
            style={{
              fontFamily: "'Montserrat',sans-serif",
              fontSize: ".42rem",
              letterSpacing: ".4em",
              color: "rgba(212,175,55,.5)",
              textTransform: "uppercase",
              marginBottom: "1.2rem",
              paddingBottom: ".7rem",
              borderBottom: "1px solid rgba(212,175,55,.1)",
            }}
          >
            Service Schedule — {MAINT_TIERS[sel].tier}
          </div>
          {[
            ["Month 1", "Delivery inspection & handover", true],
            ["Month 3", "Initial 3-month check", true],
            ["Month 6", "Mid-year fluid & systems service", false],
            ["Month 12", "Annual factory inspection", false],
            ["Month 18", "Mid-cycle performance optimisation", false],
            ["Month 24", "Full 2-year comprehensive service", false],
          ].map(([m, t, done], i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: ".8rem",
                padding: ".65rem 0",
                borderBottom: "1px solid rgba(255,255,255,0.03)",
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: done ? G : "transparent",
                  border: `1px solid ${done ? G : "rgba(212,175,55,.3)"}`,
                  flexShrink: 0,
                  marginTop: ".25rem",
                  boxShadow: done ? `0 0 6px rgba(212,175,55,0.4)` : "none",
                }}
              />
              <div>
                <div
                  style={{
                    fontFamily: "'Montserrat',sans-serif",
                    fontSize: ".4rem",
                    letterSpacing: ".3em",
                    color: "rgba(212,175,55,.45)",
                    textTransform: "uppercase",
                    marginBottom: ".25rem",
                  }}
                >
                  {m}
                </div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: ".85rem",
                    color: "rgba(255,255,255,.5)",
                    fontWeight: 300,
                  }}
                >
                  {t}
                </div>
                {done && (
                  <span
                    style={{
                      display: "inline-block",
                      fontFamily: "'Montserrat',sans-serif",
                      fontSize: ".36rem",
                      color: "rgba(80,200,80,.7)",
                      border: "1px solid rgba(80,200,80,.2)",
                      padding: ".15rem .5rem",
                      marginTop: ".3rem",
                      letterSpacing: ".2em",
                      textTransform: "uppercase",
                    }}
                  >
                    Completed
                  </span>
                )}
              </div>
            </div>
          ))}
          <button className="wgbtn" style={{ marginTop: "1.2rem" }}>
            Book Priority Service →
          </button>
        </div>
      </div>
    </Modal>
  );
}

/* ══════════════════════════════════════
   MODAL: INSURANCE
   ══════════════════════════════════════ */
function InsuranceModal({ onClose }) {
  const [sel, setSel] = useState(1);
  return (
    <Modal
      title="Coverage Details"
      sub="Insurance & Registration"
      wide
      onClose={onClose}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.5rem",
        }}
      >
        <div>
          {INS_PLANS.map((p, i) => (
            <button
              key={i}
              className={`ins-plan${sel === i ? " a" : ""}`}
              onClick={() => setSel(i)}
            >
              <div
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "1.3rem",
                  color: "#f0ece4",
                  marginBottom: ".25rem",
                }}
              >
                {p.name}
              </div>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "1rem",
                  color: G,
                  marginBottom: ".25rem",
                }}
              >
                {p.cov}
              </div>
              <div
                style={{
                  fontFamily: "'Montserrat',sans-serif",
                  fontSize: ".48rem",
                  color: "rgba(255,255,255,.35)",
                  marginBottom: ".7rem",
                  letterSpacing: "0.08em",
                }}
              >
                {p.price}
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {p.feats.map((f, j) => (
                  <li
                    key={j}
                    style={{
                      fontFamily: "'Montserrat',sans-serif",
                      fontSize: ".44rem",
                      color: "rgba(255,255,255,.3)",
                      padding: ".2rem 0",
                      letterSpacing: "0.05em",
                    }}
                  >
                    ✓ {f}
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>
        <div>
          <div
            style={{
              fontFamily: "'Montserrat',sans-serif",
              fontSize: ".42rem",
              letterSpacing: ".4em",
              color: "rgba(212,175,55,.5)",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            {INS_PLANS[sel].name} Coverage
          </div>
          <div
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "3.5rem",
              fontWeight: 400,
              color: G,
              lineHeight: 1,
              marginBottom: ".4rem",
            }}
          >
            {INS_PLANS[sel].cov}
          </div>
          <div
            style={{
              fontFamily: "'Montserrat',sans-serif",
              fontSize: ".42rem",
              color: "rgba(255,255,255,.22)",
              letterSpacing: ".22em",
              textTransform: "uppercase",
              marginBottom: "1.4rem",
            }}
          >
            Maximum Coverage Value
          </div>
          <div
            style={{
              width: 50,
              height: 1,
              background: `linear-gradient(to right,${G},transparent)`,
              marginBottom: "1.4rem",
            }}
          />
          <div
            style={{
              fontFamily: "'Montserrat',sans-serif",
              fontSize: ".4rem",
              letterSpacing: ".35em",
              color: "rgba(212,175,55,.5)",
              textTransform: "uppercase",
              marginBottom: ".9rem",
            }}
          >
            Registration Included
          </div>
          {[
            "Document preparation & filing",
            "Import / export clearance",
            "Customs duty management",
            "Legal ownership transfer",
            "International re-registration",
          ].map((s, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: ".7rem",
                padding: ".5rem 0",
                borderBottom: "1px solid rgba(212,175,55,.06)",
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: ".85rem",
                color: "rgba(255,255,255,.45)",
                alignItems: "center",
                fontWeight: 300,
              }}
            >
              <span
                style={{ color: "rgba(212,175,55,.5)", fontSize: ".45rem" }}
              >
                ◆
              </span>
              {s}
            </div>
          ))}
          <button className="wgbtn" style={{ marginTop: "2rem" }}>
            Get a Quote →
          </button>
        </div>
      </div>
    </Modal>
  );
}

/* ══════════════════════════════════════
   SERVICE ROW
   ══════════════════════════════════════ */
function ServiceRow({ s, idx, onCta }) {
  const [ref, vis] = useInView(0.06);
  const even = idx % 2 === 0;
  return (
    <div
      ref={ref}
      className={`sr${vis ? " sr-in" : ""}`}
      style={{ transitionDelay: `${idx * 0.04}s` }}
    >
      <div className={`sr-img-side${even ? "" : " sr-flip"}`}>
        <div className="sr-img-frame">
          <img src={s.img} alt={s.title} className="sr-img" />
          <div className="sr-img-scrim" />
          <div className="sr-num">{s.n}</div>
          <div className="sr-accent-tag">{s.accent}</div>
        </div>
      </div>
      <div className="sr-content">
        <div className="sr-eyebrow">{s.sub}</div>
        <h3 className="sr-title">{s.title}</h3>
        <div className="sr-divider">
          <span className="sr-div-line" />
          <span className="sr-div-dot">◆</span>
          <span className="sr-div-line" />
        </div>
        <p className="sr-blurb">{s.blurb}</p>
        <button className="sr-cta" onClick={() => onCta(s.id)}>
          <span className="sr-cta-inner">
            <span>{s.cta}</span>
            <span className="sr-arr">→</span>
          </span>
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MAP SECTION — Leaflet inline
   ══════════════════════════════════════ */
function MapSection() {
  const [ref, vis] = useInView(0.05);
  return (
    <div ref={ref} className={`wg-map${vis ? " on" : ""}`}>
      <div className="wg-map-hdr">
        <div>
          <div className="wg-map-label">Worldwide Logistics Network</div>
          <h3 className="wg-map-title">
            Global <em>Reach</em>
          </h3>
        </div>
        <p className="wg-map-sub">
          Seven sovereign hubs. Every acquisition tracked from origin to
          handover.
        </p>
      </div>
      <LeafletMap height="500px" />
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN EXPORT
   ══════════════════════════════════════ */
export default function WhiteGloveServices() {
  const [hRef, hVis] = useInView(0.05);
  const [sRef, sVis] = useInView(0.1);
  const [cRef, cVis] = useInView(0.1);
  const [modal, setModal] = useState(null);
  const onCta = useCallback((id) => setModal(id), []);

  return (
    <section className="wg">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,200;0,300;0,400;1,200;1,300;1,400&family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=Montserrat:wght@200;300;400;500;600&display=swap');
        .wg{background:#070707;color:#fff;font-family:'Montserrat',sans-serif;overflow-x:hidden;position:relative;}
        .wg::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 130% 60% at 50% -8%,rgba(212,175,55,.06) 0%,transparent 55%);pointer-events:none;z-index:0;}
        .wg-hero{position:relative;z-index:1;padding:140px 80px 80px;text-align:center;display:flex;flex-direction:column;align-items:center;}
        .wg-hero::after{content:'';position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:1px;height:80px;background:linear-gradient(to bottom,rgba(212,175,55,.4),transparent);}
        .wg-ey{display:flex;align-items:center;gap:1.2rem;margin-bottom:2rem;opacity:0;transform:translateY(12px);transition:opacity .8s ease,transform .8s ease;}
        .wg-ey.on{opacity:1;transform:none;}
        .wg-rl{width:48px;height:1px;background:linear-gradient(to right,transparent,rgba(212,175,55,.6));}
        .wg-rl-r{background:linear-gradient(to left,transparent,rgba(212,175,55,.6));}
        .wg-ey-txt{font-size:.5rem;letter-spacing:.6em;color:rgba(212,175,55,.55);text-transform:uppercase;}
        .wg-h1{font-family:'Playfair Display',serif;font-size:clamp(3.2rem,7vw,7rem);font-weight:400;line-height:.94;letter-spacing:.02em;color:#f5f0e8;margin:0 0 1.5rem;opacity:0;transform:translateY(26px);transition:opacity 1.1s ease .1s,transform 1.1s ease .1s;}
        .wg-h1.on{opacity:1;transform:none;}
        .wg-h1 em{font-style:italic;color:${G};}
        .wg-tag{font-family:'Cormorant Garamond',serif;font-size:clamp(.95rem,1.5vw,1.15rem);font-style:italic;font-weight:300;color:rgba(255,255,255,.26);max-width:480px;line-height:1.8;opacity:0;transform:translateY(12px);transition:opacity .9s ease .25s,transform .9s ease .25s;}
        .wg-tag.on{opacity:1;transform:none;}
        .wg-rows{position:relative;z-index:1;padding:80px 0 0;}
        .sr{display:grid;grid-template-columns:1fr 1fr;min-height:520px;border-bottom:1px solid rgba(212,175,55,.06);opacity:0;transform:translateY(32px);transition:opacity .7s ease,transform .7s ease;}
        .sr-in{opacity:1;transform:none;}
        .sr-img-side{position:relative;overflow:hidden;}
        .sr-flip{order:1;}
        .sr-img-frame{position:absolute;inset:0;}
        .sr-img{width:100%;height:100%;object-fit:cover;filter:brightness(.32) saturate(.55);transform:scale(1.04);transition:transform 1.4s cubic-bezier(.25,.46,.45,.94),filter 1s ease;}
        .sr:hover .sr-img{transform:scale(1.1);filter:brightness(.46) saturate(.75);}
        .sr-img-scrim{position:absolute;inset:0;background:linear-gradient(135deg,rgba(0,0,0,.55) 0%,rgba(0,0,0,.15) 60%,transparent 100%);}
        .sr-flip .sr-img-scrim{background:linear-gradient(225deg,rgba(0,0,0,.55) 0%,rgba(0,0,0,.15) 60%,transparent 100%);}
        .sr-num{position:absolute;bottom:1.5rem;left:1.8rem;font-family:'Playfair Display',serif;font-size:7rem;font-weight:400;color:rgba(212,175,55,.07);line-height:1;pointer-events:none;transition:color .5s ease;}
        .sr:hover .sr-num{color:rgba(212,175,55,.13);}
        .sr-flip .sr-num{left:auto;right:1.8rem;}
        .sr-accent-tag{position:absolute;top:1.5rem;right:1.5rem;background:rgba(0,0,0,.65);border:1px solid rgba(212,175,55,.3);padding:.35rem .9rem;font-size:.42rem;letter-spacing:.32em;color:${G};text-transform:uppercase;font-family:'Montserrat',sans-serif;}
        .sr-flip .sr-accent-tag{right:auto;left:1.5rem;}
        .sr-content{display:flex;flex-direction:column;justify-content:center;padding:5rem 6rem;background:rgba(5,5,5,.98);position:relative;}
        .sr-content::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 80% 60% at 30% 50%,rgba(212,175,55,.022),transparent 70%);pointer-events:none;}
        .sr-eyebrow{font-family:'Montserrat',sans-serif;font-size:.52rem;letter-spacing:.5em;color:rgba(212,175,55,.45);text-transform:uppercase;margin-bottom:.9rem;}
        .sr-title{font-family:'Playfair Display',serif;font-size:clamp(2.4rem,3.5vw,3.8rem);font-weight:400;color:#f0ece4;line-height:1.02;margin:0 0 1.4rem;letter-spacing:.01em;transition:color .4s ease;}
        .sr:hover .sr-title{color:#fff;}
        .sr-divider{display:flex;align-items:center;gap:.8rem;margin-bottom:1.6rem;}
        .sr-div-line{flex:1;max-width:50px;height:1px;background:linear-gradient(to right,${G},transparent);transition:max-width .6s cubic-bezier(.23,1,.32,1);}
        .sr:hover .sr-div-line{max-width:80px;}
        .sr-div-dot{color:rgba(212,175,55,.45);font-size:.5rem;}
        .sr-blurb{font-family:'Cormorant Garamond',serif;font-size:1.05rem;line-height:1.95;font-weight:300;color:rgba(255,255,255,.45);margin:0 0 2.5rem;max-width:440px;letter-spacing:.015em;}
        .sr-cta{display:inline-flex;align-items:stretch;cursor:pointer;background:transparent;border:none;padding:0;}
        .sr-cta-inner{display:flex;align-items:center;gap:.9rem;padding:.9rem 2.2rem;border:1px solid rgba(212,175,55,.3);color:rgba(212,175,55,.75);font-family:'Montserrat',sans-serif;font-size:.48rem;letter-spacing:.28em;text-transform:uppercase;position:relative;overflow:hidden;transition:border-color .4s ease,color .4s ease,letter-spacing .4s ease;}
        .sr-cta-inner::before{content:'';position:absolute;inset:0;background:rgba(212,175,55,.07);transform:scaleX(0);transform-origin:left;transition:transform .45s cubic-bezier(.23,1,.32,1);}
        .sr-cta:hover .sr-cta-inner{border-color:rgba(212,175,55,.7);color:${G};letter-spacing:.34em;}
        .sr-cta:hover .sr-cta-inner::before{transform:scaleX(1);}
        .sr-arr{transition:transform .35s ease;font-size:.8rem;}
        .sr-cta:hover .sr-arr{transform:translateX(6px);}
        .wg-map{position:relative;z-index:1;border-top:1px solid rgba(212,175,55,.07);opacity:0;transform:translateY(20px);transition:opacity .9s ease,transform .9s ease;}
        .wg-map.on{opacity:1;transform:none;}
        .wg-map-hdr{padding:5rem 80px 2.5rem;display:flex;justify-content:space-between;align-items:flex-end;}
        .wg-map-label{font-family:'Montserrat',sans-serif;font-size:.46rem;letter-spacing:.52em;color:rgba(212,175,55,.45);text-transform:uppercase;margin-bottom:.7rem;}
        .wg-map-title{font-family:'Playfair Display',serif;font-size:clamp(2rem,3.5vw,3.2rem);font-weight:400;color:#f0ece4;margin:0;line-height:1.05;}
        .wg-map-title em{font-style:italic;color:${G};}
        .wg-map-sub{font-family:'Cormorant Garamond',serif;font-size:1.05rem;font-style:italic;font-weight:300;color:rgba(255,255,255,.2);text-align:right;max-width:300px;line-height:1.7;}
        .wg-stats{position:relative;z-index:1;display:flex;justify-content:center;border-top:1px solid rgba(255,255,255,.04);border-bottom:1px solid rgba(255,255,255,.04);background:rgba(3,3,3,.7);opacity:0;transform:translateY(16px);transition:opacity .9s ease,transform .9s ease;}
        .wg-stats.on{opacity:1;transform:none;}
        .wg-stat{flex:1;max-width:250px;padding:3.5rem 2rem;text-align:center;border-right:1px solid rgba(255,255,255,.04);}
        .wg-stat:last-child{border-right:none;}
        .wg-sn{font-family:'Playfair Display',serif;font-size:3.6rem;font-weight:400;color:${G};line-height:1;margin-bottom:.5rem;}
        .wg-sl{font-family:'Montserrat',sans-serif;font-size:.42rem;letter-spacing:.4em;color:rgba(255,255,255,.18);text-transform:uppercase;}
        .wg-cta{position:relative;z-index:1;text-align:center;padding:140px 80px 160px;}
        .wg-cta::before{content:'';position:absolute;top:0;left:50%;transform:translateX(-50%);width:1px;height:80px;background:linear-gradient(to bottom,transparent,rgba(212,175,55,.4));}
        .wg-cta-in{max-width:680px;margin:0 auto;opacity:0;transform:translateY(22px);transition:opacity 1s ease,transform 1s ease;}
        .wg-cta-in.on{opacity:1;transform:none;}
        .wg-clbl{font-family:'Montserrat',sans-serif;font-size:.46rem;letter-spacing:.6em;color:rgba(212,175,55,.4);text-transform:uppercase;margin-bottom:1.6rem;}
        .wg-ctit{font-family:'Playfair Display',serif;font-size:clamp(2.4rem,4.5vw,4.5rem);font-weight:400;color:#f0ece4;letter-spacing:.02em;line-height:1.05;margin-bottom:.9rem;}
        .wg-ctit em{font-style:italic;color:${G};}
        .wg-csub{font-family:'Cormorant Garamond',serif;font-size:1.05rem;font-style:italic;color:rgba(255,255,255,.2);margin-bottom:3rem;letter-spacing:.03em;}
        .wgbtn{display:inline-flex;align-items:center;gap:.8rem;padding:1rem 2.4rem;background:transparent;border:1px solid rgba(212,175,55,.4);color:${G};font-family:'Montserrat',sans-serif;font-size:.5rem;letter-spacing:.3em;text-transform:uppercase;cursor:pointer;position:relative;overflow:hidden;transition:border-color .4s ease,letter-spacing .4s ease;}
        .wgbtn::before{content:'';position:absolute;inset:0;background:rgba(212,175,55,.08);transform:scaleX(0);transform-origin:left;transition:transform .45s cubic-bezier(.23,1,.32,1);}
        .wgbtn:hover::before{transform:scaleX(1);}
        .wgbtn:hover{border-color:rgba(212,175,55,.8);letter-spacing:.36em;}
        .wgbtn-full{width:100%;justify-content:center;}
        .wgbtn:disabled{opacity:.5;cursor:not-allowed;}
        .ml-back{position:fixed;inset:0;z-index:9000;background:rgba(0,0,0,.92);display:flex;align-items:center;justify-content:center;padding:1.5rem;animation:mbd .3s ease;backdrop-filter:blur(8px);}
        @keyframes mbd{from{opacity:0}to{opacity:1}}
        .ml-box{background:#080808;border:1px solid rgba(212,175,55,.18);width:100%;max-height:90vh;display:flex;flex-direction:column;overflow:hidden;animation:mlIn .4s cubic-bezier(.23,1,.32,1);}
        @keyframes mlIn{from{opacity:0;transform:translateY(20px) scale(.97)}to{opacity:1;transform:none}}
        .ml-hdr{display:flex;justify-content:space-between;align-items:flex-start;padding:1.8rem 2.2rem;border-bottom:1px solid rgba(212,175,55,.1);flex-shrink:0;background:radial-gradient(ellipse at top left,rgba(212,175,55,.03),transparent);}
        .ml-sub{font-family:'Montserrat',sans-serif;font-size:.4rem;letter-spacing:.45em;color:rgba(212,175,55,.5);text-transform:uppercase;margin-bottom:.45rem;}
        .ml-ttl{font-family:'Cormorant Garamond',serif;font-size:1.9rem;font-weight:300;color:#f0ece4;letter-spacing:.04em;}
        .ml-x{background:none;border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.4);width:34px;height:34px;font-size:1.2rem;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .3s ease;}
        .ml-x:hover{border-color:rgba(212,175,55,.5);color:${G};}
        .ml-body{overflow-y:auto;flex:1;padding:1.8rem 2.2rem;}
        .dm-tt{display:flex;align-items:flex-start;gap:.65rem;padding:.7rem;background:transparent;border:1px solid rgba(255,255,255,.05);text-align:left;cursor:pointer;transition:all .3s ease;width:100%;}
        .dm-tt.a{border-color:rgba(212,175,55,.4);background:rgba(212,175,55,.05);}
        .dm-tt:hover:not(.a){border-color:rgba(212,175,55,.2);}
        .dm-tt-nm{font-family:'Montserrat',sans-serif;font-size:.48rem;color:rgba(255,255,255,.65);margin-bottom:.15rem;letter-spacing:.08em;}
        .dm-tt-ds{font-family:'Montserrat',sans-serif;font-size:.4rem;color:rgba(255,255,255,.3);line-height:1.4;letter-spacing:.05em;}
        .cf{display:flex;flex-direction:column;gap:1.2rem;}
        .cf-row{display:flex;flex-direction:column;gap:.45rem;}
        .cf-lbl{font-family:'Montserrat',sans-serif;font-size:.4rem;letter-spacing:.3em;color:rgba(212,175,55,.5);text-transform:uppercase;}
        .cf-in{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);color:#ddd;padding:.8rem 1rem;font-family:'Montserrat',sans-serif;font-size:.6rem;outline:none;transition:border-color .3s ease;width:100%;box-sizing:border-box;}
        .cf-in:focus{border-color:rgba(212,175,55,.45);}
        .cf-err{border-color:rgba(200,60,60,.5)!important;}
        .cf-error-msg{font-family:'Montserrat',sans-serif;font-size:.38rem;color:rgba(220,80,80,.7);letter-spacing:.1em;margin-top:.2rem;}
        .cf-sel{appearance:none;cursor:pointer;}
        .cf-sel option{background:#111;color:#ddd;}
        .cf-ta{resize:vertical;min-height:90px;}
        .cf-spinner{width:12px;height:12px;border:1px solid rgba(212,175,55,.3);border-top-color:${G};border-radius:50%;animation:spin .8s linear infinite;display:inline-block;}
        @keyframes spin{to{transform:rotate(360deg)}}
        .cfg-lbl{font-family:'Montserrat',sans-serif;font-size:.38rem;letter-spacing:.42em;color:rgba(212,175,55,.42);text-transform:uppercase;margin-bottom:.9rem;}
        .cfg-sw{display:flex;align-items:center;gap:.7rem;padding:.6rem .8rem;background:transparent;border:1px solid rgba(255,255,255,.06);cursor:pointer;text-align:left;transition:all .3s ease;width:100%;margin-bottom:.4rem;box-sizing:border-box;}
        .cfg-sw.a{border-color:rgba(212,175,55,.5);background:rgba(212,175,55,.06);}
        .cfg-sw:hover:not(.a){border-color:rgba(255,255,255,.14);}
        .sec-dot{width:6px;height:6px;border-radius:50%;background:rgba(80,200,80,.8);animation:sp 1.5s ease-in-out infinite;display:inline-block;}
        @keyframes sp{0%,100%{opacity:1}50%{opacity:.35}}
        .mnt-tier{background:transparent;border:1px solid rgba(255,255,255,.07);padding:1.1rem 1.3rem;text-align:left;cursor:pointer;transition:all .3s ease;position:relative;width:100%;}
        .mnt-tier.a{border-color:var(--tc,${G});background:rgba(212,175,55,.04);}
        .mnt-tier:hover:not(.a){border-color:rgba(255,255,255,.13);}
        .ins-plan{background:transparent;border:1px solid rgba(255,255,255,.07);padding:1.1rem 1.3rem;text-align:left;cursor:pointer;transition:all .3s ease;margin-bottom:.65rem;width:100%;box-sizing:border-box;}
        .ins-plan.a{border-color:rgba(212,175,55,.5);background:rgba(212,175,55,.04);}
        .ins-plan:hover:not(.a){border-color:rgba(255,255,255,.13);}
        @media(max-width:1100px){
          .sr{grid-template-columns:1fr;}.sr-img-side{min-height:320px;}.sr-flip{order:0;}
          .sr-content{padding:3.5rem 3.5rem;}.wg-hero,.wg-cta{padding-left:40px;padding-right:40px;}
          .wg-map-hdr{padding:4rem 40px 2rem;}
        }
        @media(max-width:680px){
          .sr-content{padding:2.5rem 1.8rem;}.wg-hero,.wg-cta{padding-left:20px;padding-right:20px;padding-top:70px;padding-bottom:70px;}
          .wg-map-hdr{padding:2.5rem 20px 1.5rem;flex-direction:column;align-items:flex-start;gap:1rem;}.wg-map-sub{text-align:left;}
          .wg-stats{flex-wrap:wrap;}.wg-stat{max-width:50%;}.ml-body{padding:1.2rem 1.3rem;}.ml-hdr{padding:1.3rem 1.4rem;}
        }
      `}</style>

      {modal === "delivery" && <DeliveryModal onClose={() => setModal(null)} />}
      {modal === "concierge" && (
        <ConciergeModal onClose={() => setModal(null)} />
      )}
      {modal === "config" && <ConfigModal onClose={() => setModal(null)} />}
      {modal === "transport" && (
        <SecurityModal onClose={() => setModal(null)} />
      )}
      {modal === "maintenance" && (
        <MaintenanceModal onClose={() => setModal(null)} />
      )}
      {modal === "insurance" && (
        <InsuranceModal onClose={() => setModal(null)} />
      )}

      <div ref={hRef} className="wg-hero">
        <div className={`wg-ey${hVis ? " on" : ""}`}>
          <span className="wg-rl" />
          <span className="wg-ey-txt">Francis Luxor Motors</span>
          <span className="wg-rl wg-rl-r" />
        </div>
        <h2 className={`wg-h1${hVis ? " on" : ""}`}>
          White&#8209;Glove <em>Services</em>
        </h2>
        <p className={`wg-tag${hVis ? " on" : ""}`}>
          "An acquisition experience designed for the world's most discerning
          clients."
        </p>
      </div>

      <div className="wg-rows">
        {SERVICES.map((s, i) => (
          <ServiceRow key={s.id} s={s} idx={i} onCta={onCta} />
        ))}
      </div>

      <MapSection />

      <div ref={sRef} className={`wg-stats${sVis ? " on" : ""}`}>
        {[
          ["47+", "Nations Served"],
          ["340+", "Vehicles Delivered"],
          ["12", "Years of Excellence"],
          ["100%", "Client Satisfaction"],
        ].map(([n, l], i) => (
          <div key={i} className="wg-stat">
            <div className="wg-sn">{n}</div>
            <div className="wg-sl">{l}</div>
          </div>
        ))}
      </div>

      <div ref={cRef} className="wg-cta">
        <div className={`wg-cta-in${cVis ? " on" : ""}`}>
          <div className="wg-clbl">Private Acquisition</div>
          <h3 className="wg-ctit">
            Begin Your <em>Acquisition</em>
          </h3>
          <p className="wg-csub">
            Reserved exclusively for those who expect nothing less than
            extraordinary.
          </p>
          <button className="wgbtn" onClick={() => setModal("concierge")}>
            Request Private Concierge →
          </button>
        </div>
      </div>
    </section>
  );
}
