import { useState, useEffect, useRef, useCallback } from "react";

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• CONSTANTS â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
const G = "#D4AF37";

const CITIES = [
  { name: "Monaco",     x: 51.8, y: 29,  hub: "European Flagship Hub",  vehicles: 12 },
  { name: "London",    x: 48.5, y: 25,  hub: "North Atlantic Gateway", vehicles: 18 },
  { name: "Dubai",     x: 61.5, y: 37,  hub: "Middle East & Asia Hub", vehicles: 24 },
  { name: "Miami",     x: 22,   y: 42,  hub: "Americas HQ",            vehicles: 15 },
  { name: "Tokyo",     x: 83,   y: 29,  hub: "Asia Pacific Centre",    vehicles: 9  },
  { name: "Singapore", x: 77.5, y: 51,  hub: "Southeast Asia Hub",     vehicles: 7  },
];
const ROUTES = [[0,1],[0,2],[1,3],[1,4],[2,5],[3,4],[4,5],[0,5],[2,4]];

const EXT_COLORS = [
  { name: "Noir Obsidian",  hex: "#0d0d0d" }, { name: "Arctic White",   hex: "#f0f0ee" },
  { name: "Racing Crimson", hex: "#8b0000" }, { name: "Midnight Navy",  hex: "#0a1628" },
  { name: "Gold Edition",   hex: "#c8a415" }, { name: "Matte Carbon",   hex: "#2a2a2a" },
];
const INTERIORS = [
  { name: "Black Nappa",    price: "+â‚¬0",      img: new URL("../../assets/wg-custom-config.jpg", import.meta.url).href },
  { name: "Cream Alcantara",price: "+â‚¬15,000", img: new URL("../../assets/wg-insurance.jpg", import.meta.url).href },
  { name: "Red Suede",      price: "+â‚¬22,000", img: new URL("../../assets/wg-insurance.jpg", import.meta.url).href   },
  { name: "Carbon Panel",   price: "+â‚¬35,000", img: new URL("../../assets/wg-global-delivery.jpg", import.meta.url).href },
];
const WHEELS = [
  { name: "Standard Alloy", price: "+â‚¬0",      img: new URL("../../assets/wg-private-concierge.jpg", import.meta.url).href },
  { name: "Forged Carbon",  price: "+â‚¬18,000", img: new URL("../../assets/wg-secure-transport.jpg", import.meta.url).href },
  { name: "Titanium Sport", price: "+â‚¬28,000", img: new URL("../../assets/wg-custom-config.jpg", import.meta.url).href  },
  { name: "Signature Ed.",  price: "+â‚¬42,000", img: new URL("../../assets/wg-insurance.jpg", import.meta.url).href },
];
const SEC_FEATURES = [
  { icon: "ðŸ“¡", title: "GPS Tracking",      desc: "24/7 satellite tracking with 30-second refresh intervals. Dedicated monitoring team alerts you at every checkpoint." },
  { icon: "ðŸ›¡",  title: "Armoured Carriers", desc: "Climate-controlled reinforced carriers. Unmarked vehicles with rotating routes â€” invisible to external observation." },
  { icon: "ðŸ‘®", title: "Security Escort",   desc: "Armed escort vehicles on request for ultra-high-value deliveries, coordinated with local law enforcement agencies." },
  { icon: "ðŸ”’", title: "Biometric Access",  desc: "Carrier access restricted to verified biometric credentials. Full chain-of-custody documentation from door to door." },
];
const MAINT_TIERS = [
  { tier: "Silver",   price: "â‚¬8,500 / yr",   c: "#a0a0a0", features: ["Annual inspection","Oil & fluids service","Basic diagnostics","48-hr response"] },
  { tier: "Gold",     price: "â‚¬18,000 / yr",  c: G,          features: ["Bi-annual service","Priority booking","Loaner vehicle","24-hr hotline","OEM parts"] },
  { tier: "Platinum", price: "â‚¬38,000 / yr",  c: "#e5e0d0",  features: ["Unlimited service","Dedicated technician","Factory inspection","Concierge pickup","All parts","Valet service"] },
];
const INS_PLANS = [
  { name: "Standard",  cov: "â‚¬2M",    price: "â‚¬4,200 / yr", feats: ["Theft & fire","Accident damage","Roadside assistance"] },
  { name: "Prestige",  cov: "â‚¬8M",    price: "â‚¬9,800 / yr", feats: ["All Standard+","Track day cover","Agreed value","Global cover"] },
  { name: "Sovereign", cov: "Agreed", price: "Bespoke",      feats: ["All Prestige+","No depreciation","Private valuation","24/7 claims"] },
];

const SERVICES = [
  {
    id: "delivery",    n: "01",
    title: "Global Delivery",           sub: "Worldwide Logistics",
    cta: "View Delivery Routes",
    blurb: "Your vehicle, anywhere on earth. Air freight, enclosed luxury transport and full customs clearance â€” managed with complete discretion from our six global hubs.",
    img: new URL("../../assets/wg-global-delivery.jpg", import.meta.url).href,
    accent: "47+ Countries",
  },
  {
    id: "concierge",   n: "02",
    title: "Private Concierge",         sub: "Dedicated Advisor",
    cta: "Request Private Advisor",
    blurb: "One advisor. Every detail. From first enquiry to final handover, your dedicated specialist handles sourcing, configuration and scheduling â€” so you simply decide.",
    img: new URL("../../assets/wg-private-concierge.jpg", import.meta.url).href,
    accent: "24 / 7 Access",
  },
  {
    id: "config",      n: "03",
    title: "Custom Configuration",      sub: "Bespoke Specification",
    cta: "Explore Configurations",
    blurb: "Manufacturer-level options unavailable elsewhere. Every surface, stitch and finish is curated to your exact specification â€” creating a vehicle that exists nowhere else.",
    img: new URL("../../assets/wg-custom-config.jpg", import.meta.url).href,
    accent: "Unlimited Options",
  },
  {
    id: "transport",   n: "04",
    title: "Secure Transport",          sub: "White-Glove Logistics",
    cta: "View Security Protocols",
    blurb: "Enclosed armoured carriers. Real-time GPS. Security escorts on request. Every kilometre of your vehicle's journey is tracked, insured and documented.",
    img: new URL("../../assets/wg-secure-transport.jpg", import.meta.url).href,
    accent: "Fully Insured",
  },
  {
    id: "maintenance", n: "05",
    title: "VIP Maintenance",           sub: "Priority Service",
    cta: "View Maintenance Program",
    blurb: "Factory-certified technicians. Priority scheduling. Original manufacturer parts, always. The atelier service experience â€” anywhere in the world.",
    img: new URL("../../assets/wg-vip-maintenance.jpg", import.meta.url).href,
    accent: "OEM Parts Only",
  },
  {
    id: "insurance",   n: "06",
    title: "Insurance & Registration",  sub: "Complete Ownership",
    cta: "View Coverage Details",
    blurb: "Global insurance, registration and import/export documentation across every jurisdiction. Ownership begins the moment you decide â€” we handle the rest.",
    img: new URL("../../assets/wg-insurance.jpg", import.meta.url).href,
    accent: "Global Coverage",
  },
];

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• UTIL â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function useInView(t = 0.08) {
  const r = useRef(null), [v, sv] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) sv(true); }, { threshold: t });
    if (r.current) o.observe(r.current);
    return () => o.disconnect();
  }, []);
  return [r, v];
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• MODAL SHELL â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function Modal({ title, sub, wide, onClose, children }) {
  useEffect(() => {
    const h = e => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", h);
    return () => { window.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [onClose]);
  return (
    <div className="ml-back" onClick={onClose}>
      <div className={`ml-box${wide ? " ml-wide" : ""}`} onClick={e => e.stopPropagation()}>
        <div className="ml-hdr">
          <div><div className="ml-sub">{sub}</div><div className="ml-ttl">{title}</div></div>
          <button className="ml-x" onClick={onClose}>Ã—</button>
        </div>
        <div className="ml-body">{children}</div>
      </div>
    </div>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• MODAL: DELIVERY â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function DeliveryModal({ onClose }) {
  const [ac, setAc] = useState(null);
  const [at, setAt] = useState(0);
  const city = ac !== null ? CITIES[ac] : null;
  const transports = [
    { icon: "âœˆ", label: "Air Freight",    desc: "Private cargo â€” under 48h" },
    { icon: "ðŸš›", label: "Enclosed Truck", desc: "Climate-controlled, GPS-tracked" },
    { icon: "ðŸš¢", label: "Secure Sea",     desc: "Crated, insured ocean freight" },
  ];
  return (
    <Modal title="Global Delivery Routes" sub="Worldwide Logistics Network" wide onClose={onClose}>
      <div className="dm-grid">
        <div className="dm-map">
          <div className="dm-grid-bg" />
          <svg viewBox="0 0 100 65" className="dm-svg" preserveAspectRatio="xMidYMid meet">
            {/* continents */}
            {[
              "M7,16 Q12,10 20,12 Q28,14 30,20 Q32,28 28,36 Q24,44 20,48 Q15,52 11,46 Q6,40 5,30 Q4,22 7,16Z",
              "M20,50 Q26,47 29,52 Q31,57 28,62 Q24,65 20,62 Q16,58 18,54Z",
              "M44,20 Q50,17 55,19 Q58,22 57,28 Q54,32 50,32 Q45,31 43,27 Q42,23 44,20Z",
              "M46,33 Q52,30 57,32 Q62,35 62,44 Q62,54 56,57 Q50,59 46,54 Q42,48 42,42 Q42,36 46,33Z",
              "M57,30 Q63,28 68,31 Q70,35 66,38 Q62,40 57,38 Q54,35 57,30Z",
              "M58,14 Q68,10 80,12 Q88,14 90,20 Q90,28 85,32 Q80,36 74,34 Q68,32 62,28 Q58,24 58,18Z",
              "M74,40 Q80,38 84,42 Q84,48 80,50 Q76,52 74,48 Q72,44 74,40Z",
              "M78,50 Q86,47 90,52 Q91,58 86,60 Q80,62 77,58 Q74,54 78,50Z",
            ].map((d, i) => <path key={i} d={d} fill="rgba(212,175,55,0.05)" stroke="rgba(212,175,55,0.18)" strokeWidth="0.25" />)}
            {/* routes */}
            {ROUTES.map(([a, b], i) => {
              const c1 = CITIES[a], c2 = CITIES[b];
              const hl = ac !== null && (a === ac || b === ac);
              return <path key={i} d={`M${c1.x} ${c1.y} Q${(c1.x+c2.x)/2} ${Math.min(c1.y,c2.y)-10} ${c2.x} ${c2.y}`}
                fill="none" stroke={hl ? "rgba(212,175,55,0.9)" : "rgba(212,175,55,0.18)"}
                strokeWidth={hl ? "0.6" : "0.25"} strokeDasharray="1.8 1.4"
                className="dm-r" style={{ animationDelay: `${i * 0.25}s` }} />;
            })}
            {/* cities */}
            {CITIES.map((c, i) => {
              const isA = ac === i;
              return (
                <g key={i} style={{ cursor: "pointer" }} onClick={() => setAc(isA ? null : i)}>
                  <circle cx={c.x} cy={c.y} r={isA ? "3" : "2.2"} fill="none" stroke={G} strokeWidth="0.3"
                    opacity={isA ? "0.65" : "0.3"} className="dm-ring" style={{ animationDelay: `${i * 0.35}s` }} />
                  <circle cx={c.x} cy={c.y} r={isA ? "1.1" : "0.85"} fill={isA ? G : "rgba(212,175,55,0.88)"} />
                  <text x={c.x + 1.5} y={c.y - 1.4} fontSize="2.4" fill={isA ? G : "rgba(212,175,55,0.65)"}
                    fontFamily="Montserrat,sans-serif" fontWeight={isA ? "600" : "300"}>{c.name}</text>
                </g>
              );
            })}
          </svg>
          {city && (
            <div className="dm-tip">
              <div className="dm-tip-name">{city.name}</div>
              <div className="dm-tip-hub">{city.hub}</div>
              <div className="dm-tip-v">{city.vehicles} vehicles available</div>
            </div>
          )}
        </div>
        <div className="dm-side">
          <div className="dm-side-lbl">Transport Methods</div>
          {transports.map((t, i) => (
            <button key={i} className={`dm-tt${at === i ? " a" : ""}`} onClick={() => setAt(i)}>
              <span className="dm-tt-ic">{t.icon}</span>
              <div><div className="dm-tt-nm">{t.label}</div><div className="dm-tt-ds">{t.desc}</div></div>
            </button>
          ))}
          <div className="dm-side-lbl" style={{ marginTop: "1.4rem" }}>Delivery Hubs</div>
          {CITIES.map((c, i) => (
            <button key={i} className={`dm-hub${ac === i ? " a" : ""}`} onClick={() => setAc(ac === i ? null : i)}>
              <span className="dm-hub-d" /><div><div className="dm-hub-n">{c.name}</div><div className="dm-hub-v">{c.vehicles} vehicles</div></div>
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• MODAL: CONCIERGE â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function ConciergeModal({ onClose }) {
  const [f, sf] = useState({ name: "", email: "", vehicle: "", msg: "" });
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const submit = async () => {
    if (!f.name || !f.email) return;
    setBusy(true); await new Promise(r => setTimeout(r, 1400)); setBusy(false); setSent(true);
  };
  if (sent) return (
    <Modal title="Request Received" sub="Private Concierge" onClose={onClose}>
      <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
        <div style={{ fontSize: "2.5rem", color: G, marginBottom: "1.2rem" }}>â—†</div>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.8rem", color: "#f0ece4", marginBottom: ".8rem" }}>Request confirmed.</div>
        <div style={{ fontSize: ".62rem", color: "rgba(255,255,255,.4)", lineHeight: 1.8, marginBottom: "2rem" }}>A dedicated advisor will contact you within 2 hours during business hours.</div>
        <button className="wgbtn" onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
  return (
    <Modal title="Request Private Advisor" sub="Private Concierge" onClose={onClose}>
      <div className="cf">
        {[
          { label: "Full Name *", key: "name", type: "text", ph: "Your name" },
          { label: "Email Address *", key: "email", type: "email", ph: "your@email.com" },
        ].map(({ label, key, type, ph }) => (
          <div key={key} className="cf-row"><label className="cf-lbl">{label}</label>
            <input className="cf-in" type={type} placeholder={ph} value={f[key]} onChange={e => sf({ ...f, [key]: e.target.value })} /></div>
        ))}
        <div className="cf-row"><label className="cf-lbl">Vehicle of Interest</label>
          <select className="cf-in cf-sel" value={f.vehicle} onChange={e => sf({ ...f, vehicle: e.target.value })}>
            <option value="">Select a vehicleâ€¦</option>
            {["Bugatti Chiron", "Ferrari Roma", "Pagani Huayra", "Rolls-Royce Phantom", "Koenigsegg Regera", "Lamborghini Veneno", "Aston Martin Valkyrie", "Hennessey Venom F5", "Toyota Supra MK5"].map(v => <option key={v}>{v}</option>)}
          </select></div>
        <div className="cf-row"><label className="cf-lbl">Message</label>
          <textarea className="cf-in cf-ta" placeholder="Tell us about your acquisitionâ€¦" value={f.msg} onChange={e => sf({ ...f, msg: e.target.value })} /></div>
        <button className="wgbtn wgbtn-full" onClick={submit} disabled={busy}>{busy ? "Sendingâ€¦" : "Submit Request â†’"}</button>
        <div style={{ fontSize: ".44rem", color: "rgba(255,255,255,.2)", textAlign: "center", marginTop: ".8rem" }}>Your information is kept strictly confidential.</div>
      </div>
    </Modal>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• MODAL: CONFIG â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function ConfigModal({ onClose }) {
  const [tab, setTab] = useState("color");
  const [sc, setSc] = useState(0);
  const [si, setSi] = useState(0);
  const [sw, setSw] = useState(0);
  const [fade, setFade] = useState(true);
  const changeTab = t => { setFade(false); setTimeout(() => { setTab(t); setFade(true); }, 250); };
  const preview = tab === "interior" ? INTERIORS[si].img : tab === "wheels" ? WHEELS[sw].img : "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=85&auto=format&fit=crop";
  return (
    <Modal title="Vehicle Configuration" sub="Bespoke Specification" wide onClose={onClose}>
      <div className="cfg-wrap">
        <div className="cfg-left">
          <img src={preview} alt="" className="cfg-img" style={{ opacity: fade ? 1 : 0 }} />
          {tab === "color" && <div className="cfg-overlay" style={{ background: `radial-gradient(ellipse,${EXT_COLORS[sc].hex}33,transparent 70%)` }} />}
          <div className="cfg-badge">{tab === "color" ? EXT_COLORS[sc].name : tab === "interior" ? INTERIORS[si].name : WHEELS[sw].name}</div>
        </div>
        <div className="cfg-right">
          <div className="cfg-tabs">
            {[["color", "â—¯ Exterior"], ["interior", "â—ˆ Interior"], ["wheels", "â—‰ Wheels"]].map(([k, l]) => (
              <button key={k} className={`cfg-tab${tab === k ? " a" : ""}`} onClick={() => changeTab(k)}>{l}</button>
            ))}
          </div>
          {tab === "color" && (
            <div>
              <div className="cfg-lbl">Exterior Colour</div>
              {EXT_COLORS.map((c, i) => (
                <button key={i} className={`cfg-sw${sc === i ? " a" : ""}`} onClick={() => setSc(i)}>
                  <span className="cfg-sw-dot" style={{ background: c.hex, border: c.hex === "#f0f0ee" ? "1px solid rgba(255,255,255,0.3)" : "none" }} />
                  <span style={{ flex: 1, fontSize: ".52rem", color: "rgba(255,255,255,.65)" }}>{c.name}</span>
                </button>
              ))}
            </div>
          )}
          {tab === "interior" && (
            <div>
              <div className="cfg-lbl">Interior Material</div>
              <div className="cfg-grid2">
                {INTERIORS.map((it, i) => (
                  <button key={i} className={`cfg-opt${si === i ? " a" : ""}`} onClick={() => { setFade(false); setTimeout(() => { setSi(i); setFade(true); }, 250); }}>
                    <div className="cfg-opt-img" style={{ backgroundImage: `url(${it.img})` }} />
                    <div className="cfg-opt-n">{it.name}</div><div className="cfg-opt-p">{it.price}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
          {tab === "wheels" && (
            <div>
              <div className="cfg-lbl">Wheel Package</div>
              <div className="cfg-grid2">
                {WHEELS.map((w, i) => (
                  <button key={i} className={`cfg-opt${sw === i ? " a" : ""}`} onClick={() => { setFade(false); setTimeout(() => { setSw(i); setFade(true); }, 250); }}>
                    <div className="cfg-opt-img" style={{ backgroundImage: `url(${w.img})` }} />
                    <div className="cfg-opt-n">{w.name}</div><div className="cfg-opt-p">{w.price}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
          <button className="wgbtn wgbtn-full" style={{ marginTop: "1.4rem" }}>Save Configuration â†’</button>
        </div>
      </div>
    </Modal>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• MODAL: SECURITY â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function SecurityModal({ onClose }) {
  const [a, sA] = useState(0);
  return (
    <Modal title="Security Protocols" sub="Secure Transport" onClose={onClose}>
      <div className="sec-wrap">
        <div className="sec-tabs">
          {SEC_FEATURES.map((f, i) => (
            <button key={i} className={`sec-tab${a === i ? " a" : ""}`} onClick={() => sA(i)}>
              <span>{f.icon}</span><span>{f.title}</span>
            </button>
          ))}
        </div>
        <div className="sec-cnt">
          <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{SEC_FEATURES[a].icon}</div>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.8rem", fontWeight: 300, color: "#f0ece4", marginBottom: ".8rem" }}>{SEC_FEATURES[a].title}</div>
          <div style={{ width: 40, height: 1, background: `linear-gradient(to right,${G},transparent)`, marginBottom: "1.2rem" }} />
          <div style={{ fontSize: ".65rem", lineHeight: 1.9, color: "rgba(255,255,255,.5)", marginBottom: "1.5rem" }}>{SEC_FEATURES[a].desc}</div>
          <div className="sec-badge"><span className="sec-dot" />Protocol Active â€” All deliveries</div>
          <div className="sec-tracker">
            <div style={{ fontSize: ".42rem", letterSpacing: ".35em", color: "rgba(212,175,55,.45)", textTransform: "uppercase", marginBottom: ".8rem" }}>Live route simulation</div>
            <div style={{ height: 3, background: "rgba(255,255,255,.06)", marginBottom: "1rem", overflow: "hidden" }}>
              <div className="sec-fill" />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {["Origin", "Customs", "Transit", "Delivery"].map((n, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: ".35rem" }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: i <= 2 ? G : "transparent", border: `1px solid ${i <= 2 ? G : "rgba(212,175,55,.35)"}` }} />
                  <div style={{ fontSize: ".38rem", color: "rgba(255,255,255,.3)", letterSpacing: ".15em", textTransform: "uppercase" }}>{n}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• MODAL: MAINTENANCE â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function MaintenanceModal({ onClose }) {
  const [sel, setSel] = useState(1);
  return (
    <Modal title="Maintenance Program" sub="VIP Priority Service" wide onClose={onClose}>
      <div className="mnt-wrap">
        <div className="mnt-tiers">
          {MAINT_TIERS.map((t, i) => (
            <button key={i} className={`mnt-tier${sel === i ? " a" : ""}`} style={{ "--tc": t.c }} onClick={() => setSel(i)}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.4rem", color: t.c, marginBottom: ".3rem" }}>{t.tier}</div>
              <div style={{ fontSize: ".55rem", color: "rgba(255,255,255,.4)", marginBottom: ".8rem" }}>{t.price}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {t.features.map((f, j) => <li key={j} style={{ fontSize: ".48rem", color: "rgba(255,255,255,.35)", padding: ".18rem 0" }}>â—†  {f}</li>)}
              </ul>
              {sel === i && <div style={{ position: "absolute", top: ".7rem", right: ".7rem", fontSize: ".38rem", color: G, border: `1px solid rgba(212,175,55,.3)`, padding: ".2rem .5rem", letterSpacing: ".2em", textTransform: "uppercase" }}>Selected</div>}
            </button>
          ))}
        </div>
        <div>
          <div style={{ fontSize: ".42rem", letterSpacing: ".4em", color: "rgba(212,175,55,.5)", textTransform: "uppercase", marginBottom: "1.2rem", paddingBottom: ".7rem", borderBottom: "1px solid rgba(212,175,55,.1)" }}>Service Schedule â€” {MAINT_TIERS[sel].tier}</div>
          {[["Month 1","Delivery inspection & handover",true],["Month 3","Initial 3-month check",true],["Month 6","Mid-year fluid & systems service",false],["Month 12","Annual factory inspection",false],["Month 18","Mid-cycle performance optimisation",false],["Month 24","Full 2-year comprehensive service",false]].map(([m, t, done], i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: ".8rem", padding: ".65rem 0", position: "relative" }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: done ? G : "transparent", border: `1px solid ${done ? G : "rgba(212,175,55,.3)"}`, flexShrink: 0, marginTop: ".25rem" }} />
              <div>
                <div style={{ fontSize: ".42rem", letterSpacing: ".3em", color: "rgba(212,175,55,.5)", textTransform: "uppercase", marginBottom: ".25rem" }}>{m}</div>
                <div style={{ fontSize: ".55rem", color: "rgba(255,255,255,.55)" }}>{t}</div>
                {done && <span style={{ display: "inline-block", fontSize: ".38rem", color: "rgba(80,200,80,.7)", border: "1px solid rgba(80,200,80,.2)", padding: ".15rem .5rem", marginTop: ".3rem", letterSpacing: ".2em", textTransform: "uppercase" }}>Completed</span>}
              </div>
            </div>
          ))}
          <button className="wgbtn" style={{ marginTop: "1.2rem" }}>Book Priority Service â†’</button>
        </div>
      </div>
    </Modal>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• MODAL: INSURANCE â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function InsuranceModal({ onClose }) {
  const [sel, setSel] = useState(1);
  return (
    <Modal title="Coverage Details" sub="Insurance & Registration" wide onClose={onClose}>
      <div className="ins-wrap">
        <div>
          {INS_PLANS.map((p, i) => (
            <button key={i} className={`ins-plan${sel === i ? " a" : ""}`} onClick={() => setSel(i)}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", color: "#f0ece4", marginBottom: ".25rem" }}>{p.name}</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1rem", color: G, marginBottom: ".25rem" }}>{p.cov}</div>
              <div style={{ fontSize: ".5rem", color: "rgba(255,255,255,.35)", marginBottom: ".7rem" }}>{p.price}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {p.feats.map((f, j) => <li key={j} style={{ fontSize: ".46rem", color: "rgba(255,255,255,.35)", padding: ".2rem 0" }}>âœ“ {f}</li>)}
              </ul>
            </button>
          ))}
        </div>
        <div>
          <div style={{ fontSize: ".42rem", letterSpacing: ".4em", color: "rgba(212,175,55,.5)", textTransform: "uppercase", marginBottom: "1rem" }}>{INS_PLANS[sel].name} Coverage</div>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "3.5rem", fontWeight: 200, color: G, lineHeight: 1, marginBottom: ".4rem" }}>{INS_PLANS[sel].cov}</div>
          <div style={{ fontSize: ".44rem", color: "rgba(255,255,255,.25)", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "1.4rem" }}>Maximum Coverage Value</div>
          <div style={{ width: 50, height: 1, background: `linear-gradient(to right,${G},transparent)`, marginBottom: "1.4rem" }} />
          <div style={{ fontSize: ".42rem", letterSpacing: ".35em", color: "rgba(212,175,55,.5)", textTransform: "uppercase", marginBottom: ".9rem" }}>Registration Included</div>
          {["Document preparation & filing","Import / export clearance","Customs duty management","Legal ownership transfer","International re-registration"].map((s, i) => (
            <div key={i} style={{ display: "flex", gap: ".7rem", padding: ".5rem 0", borderBottom: "1px solid rgba(212,175,55,.06)", fontSize: ".55rem", color: "rgba(255,255,255,.5)", alignItems: "center" }}>
              <span style={{ color: "rgba(212,175,55,.5)", fontSize: ".45rem" }}>â—†</span>{s}
            </div>
          ))}
          <button className="wgbtn" style={{ marginTop: "2rem" }}>Get a Quote â†’</button>
        </div>
      </div>
    </Modal>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• SERVICE ROW â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function ServiceRow({ s, idx, onCta }) {
  const [ref, vis] = useInView(0.06);
  const even = idx % 2 === 0;
  return (
    <div ref={ref} className={`sr${vis ? " sr-in" : ""}`} style={{ transitionDelay: `${idx * 0.04}s` }}>
      {/* Image side */}
      <div className={`sr-img-side${even ? "" : " sr-flip"}`}>
        <div className="sr-img-frame">
          <img src={s.img} alt={s.title} className="sr-img" />
          <div className="sr-img-scrim" />
          <div className="sr-num">{s.n}</div>
          <div className="sr-accent-tag">{s.accent}</div>
        </div>
      </div>
      {/* Content side */}
      <div className="sr-content">
        <div className="sr-eyebrow">{s.sub}</div>
        <h3 className="sr-title">{s.title}</h3>
        <div className="sr-divider"><span className="sr-div-line" /><span className="sr-div-dot">â—†</span><span className="sr-div-line" /></div>
        <p className="sr-blurb">{s.blurb}</p>
        <button className="sr-cta" onClick={() => onCta(s.id)}>
          <span className="sr-cta-inner">
            <span>{s.cta}</span>
            <span className="sr-arr">â†’</span>
          </span>
        </button>
      </div>
    </div>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• MAIN â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
export default function WhiteGloveServices() {
  const [hRef, hVis] = useInView(0.05);
  const [sRef, sVis] = useInView(0.1);
  const [cRef, cVis] = useInView(0.1);
  const [modal, setModal] = useState(null);
  const onCta = useCallback(id => setModal(id), []);

  return (
    <section className="wg">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,200;0,300;0,400;1,200;1,300;1,400&family=Montserrat:wght@200;300;400;500;600&display=swap');

        /* ROOT */
        .wg{background:#070707;color:#fff;font-family:'Montserrat',sans-serif;overflow-x:hidden;position:relative;}
        .wg::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 130% 60% at 50% -8%,rgba(212,175,55,0.06) 0%,transparent 55%);pointer-events:none;z-index:0;}

        /* HERO */
        .wg-hero{position:relative;z-index:1;padding:140px 80px 80px;text-align:center;display:flex;flex-direction:column;align-items:center;}
        .wg-hero::after{content:'';position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:1px;height:80px;background:linear-gradient(to bottom,rgba(212,175,55,.4),transparent);}
        .wg-ey{display:flex;align-items:center;gap:1.2rem;margin-bottom:2rem;opacity:0;transform:translateY(12px);transition:opacity .8s ease,transform .8s ease;}
        .wg-ey.on{opacity:1;transform:none;}
        .wg-rl{width:48px;height:1px;background:linear-gradient(to right,transparent,rgba(212,175,55,.6));}
        .wg-rl-r{background:linear-gradient(to left,transparent,rgba(212,175,55,.6));}
        .wg-ey-txt{font-size:.5rem;letter-spacing:.6em;color:rgba(212,175,55,.55);text-transform:uppercase;}
        .wg-h1{font-family:'Cormorant Garamond',serif;font-size:clamp(3.2rem,7vw,7rem);font-weight:200;line-height:.94;letter-spacing:.04em;color:#f5f0e8;margin:0 0 1.5rem;opacity:0;transform:translateY(26px);transition:opacity 1.1s ease .1s,transform 1.1s ease .1s;}
        .wg-h1.on{opacity:1;transform:none;}
        .wg-h1 em{font-style:italic;color:${G};}
        .wg-tag{font-family:'Cormorant Garamond',serif;font-size:clamp(.95rem,1.5vw,1.15rem);font-style:italic;font-weight:300;color:rgba(255,255,255,.26);max-width:440px;line-height:1.8;opacity:0;transform:translateY(12px);transition:opacity .9s ease .25s,transform .9s ease .25s;}
        .wg-tag.on{opacity:1;transform:none;}

        /* SERVICE ROWS */
        .wg-rows{position:relative;z-index:1;padding:80px 0 40px;}

        .sr{display:grid;grid-template-columns:1fr 1fr;min-height:480px;border-bottom:1px solid rgba(212,175,55,.07);opacity:0;transform:translateY(32px);transition:opacity .7s ease,transform .7s ease;}
        .sr-in{opacity:1;transform:none;}

        /* Image side */
        .sr-img-side{position:relative;overflow:hidden;}
        .sr-flip{order:1;}
        .sr-img-frame{position:absolute;inset:0;}
        .sr-img{width:100%;height:100%;object-fit:cover;filter:brightness(.35) saturate(.6);transform:scale(1.04);transition:transform 1.4s cubic-bezier(.25,.46,.45,.94),filter 1s ease;}
        .sr:hover .sr-img{transform:scale(1.1);filter:brightness(.5) saturate(.8);}
        .sr-img-scrim{position:absolute;inset:0;background:linear-gradient(135deg,rgba(0,0,0,.6) 0%,rgba(0,0,0,.2) 60%,transparent 100%);}
        .sr-flip .sr-img-scrim{background:linear-gradient(225deg,rgba(0,0,0,.6) 0%,rgba(0,0,0,.2) 60%,transparent 100%);}

        .sr-num{position:absolute;bottom:1.5rem;left:1.8rem;font-family:'Cormorant Garamond',serif;font-size:7rem;font-weight:200;color:rgba(212,175,55,.08);line-height:1;pointer-events:none;transition:color .5s ease;}
        .sr:hover .sr-num{color:rgba(212,175,55,.14);}
        .sr-flip .sr-num{left:auto;right:1.8rem;}

        .sr-accent-tag{position:absolute;top:1.5rem;right:1.5rem;background:rgba(0,0,0,.65);border:1px solid rgba(212,175,55,.35);padding:.35rem .9rem;font-size:.42rem;letter-spacing:.32em;color:${G};text-transform:uppercase;}
        .sr-flip .sr-accent-tag{right:auto;left:1.5rem;}

        /* Content side */
        .sr-content{display:flex;flex-direction:column;justify-content:center;padding:4rem 5rem;background:rgba(6,6,6,.98);position:relative;}
        .sr-content::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 80% 60% at 30% 50%,rgba(212,175,55,.025),transparent 70%);pointer-events:none;}
        .sr-flip+.sr-content,.sr-content:has(+.sr-img-side .sr-flip){background:rgba(8,8,8,.98);}

        .sr-eyebrow{font-size:.42rem;letter-spacing:.5em;color:rgba(212,175,55,.5);text-transform:uppercase;margin-bottom:.8rem;transition:color .4s ease;}
        .sr:hover .sr-eyebrow{color:rgba(212,175,55,.85);}

        .sr-title{font-family:'Cormorant Garamond',serif;font-size:clamp(1.8rem,2.8vw,2.8rem);font-weight:300;color:#f0ece4;line-height:1.05;margin:0 0 1.2rem;letter-spacing:.03em;transition:color .4s ease;}
        .sr:hover .sr-title{color:#fff;}

        .sr-divider{display:flex;align-items:center;gap:.8rem;margin-bottom:1.4rem;}
        .sr-div-line{flex:1;max-width:50px;height:1px;background:linear-gradient(to right,${G},transparent);transition:max-width .6s cubic-bezier(.23,1,.32,1);}
        .sr:hover .sr-div-line{max-width:80px;}
        .sr-div-dot{color:rgba(212,175,55,.5);font-size:.5rem;}

        .sr-blurb{font-size:.68rem;line-height:1.95;font-weight:300;color:rgba(255,255,255,.42);margin:0 0 2.2rem;max-width:420px;}

        /* CTA â€” ALWAYS VISIBLE */
        .sr-cta{display:inline-flex;align-items:stretch;cursor:pointer;background:transparent;border:none;padding:0;text-align:left;}
        .sr-cta-inner{display:flex;align-items:center;gap:.9rem;padding:.9rem 2rem;border:1px solid rgba(212,175,55,.35);color:rgba(212,175,55,.8);font-family:'Montserrat',sans-serif;font-size:.48rem;letter-spacing:.28em;text-transform:uppercase;position:relative;overflow:hidden;transition:border-color .4s ease,color .4s ease,letter-spacing .4s ease;}
        .sr-cta-inner::before{content:'';position:absolute;inset:0;background:rgba(212,175,55,.08);transform:scaleX(0);transform-origin:left;transition:transform .45s cubic-bezier(.23,1,.32,1);}
        .sr-cta:hover .sr-cta-inner{border-color:rgba(212,175,55,.75);color:${G};letter-spacing:.34em;}
        .sr-cta:hover .sr-cta-inner::before{transform:scaleX(1);}
        .sr-arr{transition:transform .35s ease;font-size:.8rem;}
        .sr-cta:hover .sr-arr{transform:translateX(6px);}

        /* STATS */
        .wg-stats{position:relative;z-index:1;display:flex;justify-content:center;border-top:1px solid rgba(255,255,255,.04);border-bottom:1px solid rgba(255,255,255,.04);background:rgba(3,3,3,.7);opacity:0;transform:translateY(16px);transition:opacity .9s ease,transform .9s ease;}
        .wg-stats.on{opacity:1;transform:none;}
        .wg-stat{flex:1;max-width:250px;padding:3rem 2rem;text-align:center;border-right:1px solid rgba(255,255,255,.04);}
        .wg-stat:last-child{border-right:none;}
        .wg-sn{font-family:'Cormorant Garamond',serif;font-size:3.6rem;font-weight:200;color:${G};line-height:1;margin-bottom:.5rem;}
        .wg-sl{font-size:.42rem;letter-spacing:.4em;color:rgba(255,255,255,.18);text-transform:uppercase;}

        /* CTA SECTION */
        .wg-cta{position:relative;z-index:1;text-align:center;padding:140px 80px 160px;}
        .wg-cta::before{content:'';position:absolute;top:0;left:50%;transform:translateX(-50%);width:1px;height:80px;background:linear-gradient(to bottom,transparent,rgba(212,175,55,.4));}
        .wg-cta-in{max-width:680px;margin:0 auto;opacity:0;transform:translateY(22px);transition:opacity 1s ease,transform 1s ease;}
        .wg-cta-in.on{opacity:1;transform:none;}
        .wg-clbl{font-size:.46rem;letter-spacing:.6em;color:rgba(212,175,55,.45);text-transform:uppercase;margin-bottom:1.4rem;}
        .wg-ctit{font-family:'Cormorant Garamond',serif;font-size:clamp(2.4rem,4.5vw,4.2rem);font-weight:200;color:#f0ece4;letter-spacing:.06em;line-height:1.05;margin-bottom:.9rem;}
        .wg-ctit em{font-style:italic;color:${G};}
        .wg-csub{font-family:'Cormorant Garamond',serif;font-size:1.05rem;font-style:italic;color:rgba(255,255,255,.2);margin-bottom:3rem;}

        /* SHARED BUTTON */
        .wgbtn{display:inline-flex;align-items:center;gap:.8rem;padding:1rem 2.4rem;background:transparent;border:1px solid rgba(212,175,55,.45);color:${G};font-family:'Montserrat',sans-serif;font-size:.5rem;letter-spacing:.3em;text-transform:uppercase;cursor:pointer;position:relative;overflow:hidden;transition:border-color .4s ease,letter-spacing .4s ease;}
        .wgbtn::before{content:'';position:absolute;inset:0;background:rgba(212,175,55,.08);transform:scaleX(0);transform-origin:left;transition:transform .45s cubic-bezier(.23,1,.32,1);}
        .wgbtn:hover::before{transform:scaleX(1);}
        .wgbtn:hover{border-color:rgba(212,175,55,.8);letter-spacing:.36em;}
        .wgbtn-full{width:100%;justify-content:center;}
        .wgbtn:disabled{opacity:.5;cursor:not-allowed;}

        /* MODAL */
        .ml-back{position:fixed;inset:0;z-index:9000;background:rgba(0,0,0,.92);display:flex;align-items:center;justify-content:center;padding:1.5rem;animation:mbd .3s ease;backdrop-filter:blur(8px);}
        @keyframes mbd{from{opacity:0}to{opacity:1}}
        .ml-box{background:#080808;border:1px solid rgba(212,175,55,.18);width:100%;max-width:660px;max-height:90vh;display:flex;flex-direction:column;overflow:hidden;animation:mbx .4s cubic-bezier(.23,1,.32,1);position:relative;}
        .ml-wide{max-width:1020px;}
        @keyframes mbx{from{opacity:0;transform:translateY(20px) scale(.97)}to{opacity:1;transform:none}}
        .ml-hdr{display:flex;justify-content:space-between;align-items:flex-start;padding:1.8rem 2.2rem;border-bottom:1px solid rgba(212,175,55,.1);flex-shrink:0;background:radial-gradient(ellipse at top left,rgba(212,175,55,.03),transparent);}
        .ml-sub{font-size:.4rem;letter-spacing:.45em;color:rgba(212,175,55,.5);text-transform:uppercase;margin-bottom:.45rem;}
        .ml-ttl{font-family:'Cormorant Garamond',serif;font-size:1.9rem;font-weight:300;color:#f0ece4;letter-spacing:.04em;}
        .ml-x{background:none;border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.4);width:34px;height:34px;font-size:1.2rem;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .3s ease;}
        .ml-x:hover{border-color:rgba(212,175,55,.5);color:${G};}
        .ml-body{overflow-y:auto;flex:1;padding:1.8rem 2.2rem;}

        /* DELIVERY MAP */
        .dm-grid{display:grid;grid-template-columns:1fr 260px;gap:1.2rem;height:480px;}
        .dm-map{position:relative;background:rgba(0,0,0,.55);border:1px solid rgba(212,175,55,.1);overflow:hidden;}
        .dm-grid-bg{position:absolute;inset:0;background-image:linear-gradient(rgba(212,175,55,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,.03) 1px,transparent 1px);background-size:52px 52px;}
        .dm-svg{width:100%;height:100%;position:relative;z-index:3;padding:1rem 1.5rem;}
        @keyframes dmd{from{stroke-dashoffset:6}to{stroke-dashoffset:0}}
        .dm-r{animation:dmd 2.2s linear infinite;}
        @keyframes dmr{0%,100%{opacity:.28}50%{opacity:.08}}
        .dm-ring{animation:dmr 2.2s ease-in-out infinite;}
        .dm-tip{position:absolute;top:1rem;left:1rem;z-index:5;background:rgba(0,0,0,.88);border:1px solid rgba(212,175,55,.3);padding:.7rem 1.1rem;}
        .dm-tip-name{font-family:'Cormorant Garamond',serif;font-size:1.2rem;color:${G};margin-bottom:.2rem;}
        .dm-tip-hub{font-size:.48rem;color:rgba(255,255,255,.45);letter-spacing:.1em;margin-bottom:.2rem;}
        .dm-tip-v{font-size:.46rem;color:rgba(212,175,55,.55);}
        .dm-side{display:flex;flex-direction:column;gap:.5rem;overflow-y:auto;}
        .dm-side-lbl{font-size:.38rem;letter-spacing:.45em;color:rgba(212,175,55,.4);text-transform:uppercase;padding:.4rem 0;border-bottom:1px solid rgba(212,175,55,.1);}
        .dm-tt{display:flex;align-items:flex-start;gap:.65rem;padding:.7rem;background:transparent;border:1px solid rgba(255,255,255,.05);text-align:left;cursor:pointer;transition:all .3s ease;}
        .dm-tt.a{border-color:rgba(212,175,55,.4);background:rgba(212,175,55,.05);}
        .dm-tt:hover:not(.a){border-color:rgba(212,175,55,.2);}
        .dm-tt-ic{font-size:1rem;flex-shrink:0;}
        .dm-tt-nm{font-size:.5rem;color:rgba(255,255,255,.65);margin-bottom:.15rem;}
        .dm-tt-ds{font-size:.42rem;color:rgba(255,255,255,.3);line-height:1.4;}
        .dm-hub{display:flex;align-items:center;gap:.65rem;padding:.55rem .7rem;background:transparent;border:1px solid rgba(255,255,255,.04);text-align:left;cursor:pointer;transition:all .3s ease;}
        .dm-hub.a{border-color:rgba(212,175,55,.4);background:rgba(212,175,55,.05);}
        .dm-hub:hover:not(.a){border-color:rgba(212,175,55,.18);}
        .dm-hub-d{width:7px;height:7px;border-radius:50%;background:${G};opacity:.65;flex-shrink:0;}
        .dm-hub.a .dm-hub-d{opacity:1;}
        .dm-hub-n{font-size:.5rem;color:rgba(255,255,255,.55);margin-bottom:.12rem;}
        .dm-hub-v{font-size:.4rem;color:rgba(212,175,55,.4);}

        /* CONCIERGE FORM */
        .cf{display:flex;flex-direction:column;gap:1.3rem;}
        .cf-row{display:flex;flex-direction:column;gap:.45rem;}
        .cf-lbl{font-size:.4rem;letter-spacing:.3em;color:rgba(212,175,55,.5);text-transform:uppercase;}
        .cf-in{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);color:#ddd;padding:.8rem 1rem;font-family:'Montserrat',sans-serif;font-size:.63rem;outline:none;transition:border-color .3s ease;}
        .cf-in:focus{border-color:rgba(212,175,55,.45);}
        .cf-sel{appearance:none;cursor:pointer;}
        .cf-sel option{background:#111;color:#ddd;}
        .cf-ta{resize:vertical;min-height:85px;}

        /* CONFIG */
        .cfg-wrap{display:grid;grid-template-columns:1.1fr 1fr;gap:0;height:540px;}
        .cfg-left{position:relative;overflow:hidden;}
        .cfg-img{width:100%;height:100%;object-fit:cover;transition:opacity .3s ease;}
        .cfg-overlay{position:absolute;inset:0;pointer-events:none;z-index:2;}
        .cfg-badge{position:absolute;bottom:1.4rem;left:1.4rem;z-index:3;background:rgba(0,0,0,.78);border:1px solid rgba(212,175,55,.35);padding:.38rem .9rem;font-size:.48rem;letter-spacing:.22em;color:${G};}
        .cfg-right{padding:1.4rem;overflow-y:auto;background:rgba(5,5,5,.98);border-left:1px solid rgba(212,175,55,.08);}
        .cfg-tabs{display:flex;gap:1px;margin-bottom:1.4rem;}
        .cfg-tab{flex:1;padding:.6rem;background:transparent;border:1px solid rgba(255,255,255,.06);color:rgba(255,255,255,.3);font-family:'Montserrat',sans-serif;font-size:.44rem;letter-spacing:.18em;text-transform:uppercase;cursor:pointer;transition:all .3s ease;}
        .cfg-tab.a{border-color:rgba(212,175,55,.5);color:${G};background:rgba(212,175,55,.06);}
        .cfg-tab:hover:not(.a){border-color:rgba(255,255,255,.12);color:rgba(255,255,255,.5);}
        .cfg-lbl{font-size:.38rem;letter-spacing:.42em;color:rgba(212,175,55,.42);text-transform:uppercase;margin-bottom:.9rem;}
        .cfg-sw{display:flex;align-items:center;gap:.7rem;padding:.55rem .75rem;background:transparent;border:1px solid rgba(255,255,255,.05);cursor:pointer;text-align:left;transition:all .3s ease;width:100%;margin-bottom:.4rem;}
        .cfg-sw.a{border-color:rgba(212,175,55,.5);background:rgba(212,175,55,.05);}
        .cfg-sw:hover:not(.a){border-color:rgba(255,255,255,.12);}
        .cfg-sw-dot{width:20px;height:20px;border-radius:50%;flex-shrink:0;}
        .cfg-grid2{display:grid;grid-template-columns:1fr 1fr;gap:.45rem;}
        .cfg-opt{background:transparent;border:1px solid rgba(255,255,255,.06);cursor:pointer;text-align:left;overflow:hidden;transition:all .3s ease;}
        .cfg-opt.a{border-color:rgba(212,175,55,.55);}
        .cfg-opt:hover:not(.a){border-color:rgba(255,255,255,.14);}
        .cfg-opt-img{height:58px;background-size:cover;background-position:center;filter:brightness(.65);}
        .cfg-opt.a .cfg-opt-img{filter:brightness(.82);}
        .cfg-opt-n{font-size:.44rem;color:rgba(255,255,255,.6);padding:.45rem .55rem .18rem;}
        .cfg-opt-p{font-size:.4rem;color:rgba(212,175,55,.5);padding:0 .55rem .45rem;}

        /* SECURITY */
        .sec-wrap{display:grid;grid-template-columns:190px 1fr;gap:1.5rem;min-height:380px;}
        .sec-tabs{display:flex;flex-direction:column;gap:.45rem;}
        .sec-tab{display:flex;align-items:center;gap:.65rem;padding:.7rem .9rem;background:transparent;border:1px solid rgba(255,255,255,.05);color:rgba(255,255,255,.32);font-family:'Montserrat',sans-serif;font-size:.48rem;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;transition:all .3s ease;text-align:left;}
        .sec-tab.a{border-color:rgba(212,175,55,.45);color:${G};background:rgba(212,175,55,.05);}
        .sec-tab:hover:not(.a){border-color:rgba(255,255,255,.1);color:rgba(255,255,255,.55);}
        .sec-cnt{padding:.4rem .8rem;}
        .sec-badge{display:inline-flex;align-items:center;gap:.55rem;padding:.35rem .9rem;border:1px solid rgba(80,200,80,.22);color:rgba(80,200,80,.72);font-size:.43rem;letter-spacing:.2em;text-transform:uppercase;margin-bottom:1.8rem;}
        .sec-dot{width:6px;height:6px;border-radius:50%;background:rgba(80,200,80,.8);animation:sp 1.5s ease-in-out infinite;}
        @keyframes sp{0%,100%{opacity:1}50%{opacity:.35}}
        .sec-tracker{border:1px solid rgba(212,175,55,.1);padding:1.1rem;}
        .sec-fill{height:100%;background:linear-gradient(to right,${G},rgba(212,175,55,.35));animation:sf 3s ease-in-out infinite alternate;}
        @keyframes sf{from{width:28%}to{width:82%}}

        /* MAINTENANCE */
        .mnt-wrap{display:grid;grid-template-columns:1fr 1.1fr;gap:1.5rem;}
        .mnt-tiers{display:flex;flex-direction:column;gap:.75rem;}
        .mnt-tier{background:transparent;border:1px solid rgba(255,255,255,.07);padding:1.1rem 1.3rem;text-align:left;cursor:pointer;transition:all .3s ease;position:relative;}
        .mnt-tier.a{border-color:var(--tc,${G});background:rgba(212,175,55,.04);}
        .mnt-tier:hover:not(.a){border-color:rgba(255,255,255,.13);}

        /* INSURANCE */
        .ins-wrap{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;}
        .ins-plan{background:transparent;border:1px solid rgba(255,255,255,.07);padding:1.1rem 1.3rem;text-align:left;cursor:pointer;transition:all .3s ease;margin-bottom:.65rem;width:100%;}
        .ins-plan.a{border-color:rgba(212,175,55,.5);background:rgba(212,175,55,.04);}
        .ins-plan:hover:not(.a){border-color:rgba(255,255,255,.13);}

        /* REVEAL */
        .wgr{opacity:0;transform:translateY(24px);transition:opacity .85s ease,transform .85s ease;}
        .wgr-on{opacity:1;transform:none;}

        /* RESPONSIVE */
        @media(max-width:1100px){
          .sr{grid-template-columns:1fr;}
          .sr-img-side{min-height:300px;}
          .sr-flip{order:0;}
          .sr-content{padding:3rem 3rem;}
          .wg-hero,.wg-cta{padding-left:40px;padding-right:40px;}
          .dm-grid,.cfg-wrap,.mnt-wrap,.ins-wrap{grid-template-columns:1fr;}
          .dm-map,.cfg-left{max-height:260px;}
          .sec-wrap{grid-template-columns:1fr;}
        }
        @media(max-width:680px){
          .sr-content{padding:2.5rem 1.8rem;}
          .wg-hero,.wg-cta{padding-left:20px;padding-right:20px;padding-top:70px;padding-bottom:70px;}
          .wg-stats{flex-wrap:wrap;}
          .wg-stat{max-width:50%;}
          .ml-body{padding:1.2rem 1.3rem;}
          .ml-hdr{padding:1.3rem 1.4rem;}
          .cfg-grid2{grid-template-columns:1fr;}
        }
      `}</style>

      {/* MODALS */}
      {modal === "delivery"    && <DeliveryModal    onClose={() => setModal(null)} />}
      {modal === "concierge"   && <ConciergeModal   onClose={() => setModal(null)} />}
      {modal === "config"      && <ConfigModal      onClose={() => setModal(null)} />}
      {modal === "transport"   && <SecurityModal    onClose={() => setModal(null)} />}
      {modal === "maintenance" && <MaintenanceModal onClose={() => setModal(null)} />}
      {modal === "insurance"   && <InsuranceModal   onClose={() => setModal(null)} />}

      {/* HERO */}
      <div ref={hRef} className="wg-hero">
        <div className={`wg-ey${hVis ? " on" : ""}`}>
          <span className="wg-rl" />
          <span className="wg-ey-txt">Francis Luxor Motors</span>
          <span className="wg-rl wg-rl-r" />
        </div>
        <h2 className={`wg-h1${hVis ? " on" : ""}`}>White&#8209;Glove <em>Services</em></h2>
        <p className={`wg-tag${hVis ? " on" : ""}`}>"An acquisition experience designed for the world's most discerning clients."</p>
      </div>

      {/* SERVICE ROWS */}
      <div className="wg-rows">
        {SERVICES.map((s, i) => (
          <ServiceRow key={s.id} s={s} idx={i} onCta={onCta} />
        ))}
      </div>

      {/* STATS */}
      <div ref={sRef} className={`wg-stats${sVis ? " on" : ""}`}>
        {[["47+","Countries Served"],["340+","Vehicles Delivered"],["12","Years of Excellence"],["100%","Client Satisfaction"]].map(([n, l], i) => (
          <div key={i} className="wg-stat"><div className="wg-sn">{n}</div><div className="wg-sl">{l}</div></div>
        ))}
      </div>

      {/* CTA */}
      <div ref={cRef} className="wg-cta">
        <div className={`wg-cta-in${cVis ? " on" : ""}`}>
          <div className="wg-clbl">Private Acquisition</div>
          <h3 className="wg-ctit">Begin Your <em>Acquisition</em></h3>
          <p className="wg-csub">Reserved exclusively for those who expect nothing less than extraordinary.</p>
          <button className="wgbtn" onClick={() => setModal("concierge")}>Request Private Concierge â†’</button>
        </div>
      </div>
    </section>
  );
}


