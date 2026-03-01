import { useState } from "react";
import Section from "../Section/Section";
import { VEHICLES } from "../../data.js";

// ── EXTERIOR
import BugattiExt from "../../assets/Bugatti Chiron black side view.jpg";
import FerrariExt from "../../assets/Ferrari Roma front view dark.jpg";
import PaganiExt from "../../assets/Pagani Huayra carbon fiber.jpg";
import RollsExt from "../../assets/Rolls Royce Phantom black luxury.jpg";
import SupraExt from "../../assets/Toyota Supra MK5.png";
import KoenigExt from "../../assets/Koenigsegg Regera hypercar.jpg";
import LamboExt from "../../assets/Lamborghini Veneno side.jpg";
import AstonExt from "../../assets/Aston Martin Valkyrie F1.jpg";
import HennExt from "../../assets/Hennessey Venom F5 front.jpg";

// ── INTERIOR
import BugattiInt from "../../assets/Bugatti Chiron interior cockpit.jpg";
import FerrariInt from "../../assets/Ferrari Roma interior red.jpg";
import PaganiInt from "../../assets/Pagani Huayra interior gold.jpg";
import RollsInt from "../../assets/Rolls Royce Phantom interior starlight.jpg";
import SupraInt from "../../assets/Toyota Supra A90 interior.jpg";
import KoenigInt from "../../assets/Koenigsegg Regera interior.jpg";
import LamboInt from "../../assets/Lamborghini Veneno interior.jpg";
import AstonInt from "../../assets/Aston Martin Valkyrie interior.jpg";
import HennInt from "../../assets/Hennessey Venom F5 interior.jpg";

// ── ENGINE
import BugattiEng from "../../assets/Bugatti Chiron engine W16.jpg";
import FerrariEng from "../../assets/Ferrari Roma rear night.jpg";
import PaganiEng from "../../assets/Pagani Huayra engine AMG.jpg";
import RollsEng from "../../assets/Rolls Royce Phantom front grille.jpg";
import SupraEng from "../../assets/Toyota Supra MK5 2JZ engine.jpg";
import KoenigEng from "../../assets/Koenigsegg Regera engine hybrid.jpg";
import LamboEng from "../../assets/Lamborghini Veneno carbon.jpg";
import AstonEng from "../../assets/Aston Martin Valkyrie engine Cosworth.jpg";
import HennEng from "../../assets/Hennessey Venom F5 engine.jpg";

// ── BODY KIT
import SupraKit from "../../assets/Toyota Supra widebody kit.jpg";

const CAR_IMAGES = {
  "bugatti-chiron":        { exterior: BugattiExt, interior: BugattiInt, engine: BugattiEng, kit: BugattiExt },
  "ferrari-roma":          { exterior: FerrariExt, interior: FerrariInt, engine: FerrariEng, kit: FerrariExt },
  "pagani-huayra":         { exterior: PaganiExt,  interior: PaganiInt,  engine: PaganiEng,  kit: PaganiExt  },
  "rolls-royce-phantom":   { exterior: RollsExt,   interior: RollsInt,   engine: RollsEng,   kit: RollsExt   },
  "toyota-supra-mk5":      { exterior: SupraExt,   interior: SupraInt,   engine: SupraEng,   kit: SupraKit   },
  "koenigsegg-regera":     { exterior: KoenigExt,  interior: KoenigInt,  engine: KoenigEng,  kit: KoenigExt  },
  "lamborghini-veneno":    { exterior: LamboExt,   interior: LamboInt,   engine: LamboEng,   kit: LamboExt   },
  "aston-martin-valkyrie": { exterior: AstonExt,   interior: AstonInt,   engine: AstonEng,   kit: AstonExt   },
  "hennessey-venom-f5":    { exterior: HennExt,    interior: HennInt,    engine: HennEng,    kit: HennExt    },
};

const BASE_PRICES = {
  "bugatti-chiron": 4000000, "ferrari-roma": 300000, "pagani-huayra": 3000000,
  "rolls-royce-phantom": 450000, "toyota-supra-mk5": 400000, "koenigsegg-regera": 4000000,
  "lamborghini-veneno": 9000000, "aston-martin-valkyrie": 2500000, "hennessey-venom-f5": 1850000,
};

const META = {
  "bugatti-chiron":        { category: "Hypercar",     lot: "01" },
  "ferrari-roma":          { category: "GT Coupé",     lot: "02" },
  "pagani-huayra":         { category: "Atelier",      lot: "03" },
  "rolls-royce-phantom":   { category: "Ultra Luxury", lot: "04" },
  "toyota-supra-mk5":      { category: "Sports Car",   lot: "05" },
  "koenigsegg-regera":     { category: "Megacar",      lot: "06" },
  "lamborghini-veneno":    { category: "Collector",    lot: "07" },
  "aston-martin-valkyrie": { category: "Track Weapon", lot: "08" },
  "hennessey-venom-f5":    { category: "Speed Record", lot: "09" },
};

const VIEW_TABS = [
  { key: "exterior", label: "Exterior" },
  { key: "interior", label: "Interior" },
  { key: "engine",   label: "Engine"   },
  { key: "kit",      label: "Body Kit" },
];

const CONFIG_OPTIONS = {
  colors: [
    { name: "Noir Obsidian", price: 0,     hex: "#1a1a1a" },
    { name: "Arctic White",  price: 12000, hex: "#f0f0f0" },
    { name: "Racing Red",    price: 8000,  hex: "#8b0000" },
    { name: "Midnight Blue", price: 8000,  hex: "#0a1628" },
    { name: "Gold Edition",  price: 25000, hex: "#d4af37" },
    { name: "Matte Carbon",  price: 18000, hex: "#2d2d2d" },
  ],
  interiors: [
    { name: "Black Leather",     price: 0,     view: "interior" },
    { name: "Cream Nappa",       price: 15000, view: "interior" },
    { name: "Red Alcantara",     price: 22000, view: "interior" },
    { name: "Carbon Fiber",      price: 35000, view: "interior" },
    { name: "Cognac Full Grain", price: 28000, view: "interior" },
  ],
  performance: [
    { name: "Standard",             price: 0,      view: "exterior" },
    { name: "Sport Package",        price: 45000,  view: "engine"   },
    { name: "Track Edition",        price: 85000,  view: "engine"   },
    { name: "Ultimate Performance", price: 140000, view: "engine"   },
  ],
  wheels: [
    { name: "Standard Alloy",    price: 0,     view: "exterior" },
    { name: "Forged Carbon",     price: 18000, view: "kit"      },
    { name: "Titanium Sport",    price: 28000, view: "kit"      },
    { name: "Signature Edition", price: 42000, view: "kit"      },
  ],
};

const fmt = n => "€" + n.toLocaleString("de-DE");
const F = { sans: "Montserrat,sans-serif", serif: "'Cormorant Garamond',serif" };

export default function ValuationAssessment() {
  const [sel, setSel]           = useState(null);
  const [activeView, setActiveView] = useState("exterior");
  const [color, setColor]       = useState(0);
  const [interior, setInterior] = useState(0);
  const [perf, setPerf]         = useState(0);
  const [wheels, setWheels]     = useState(0);

  const car    = VEHICLES.find(v => v.slug === sel);
  const meta   = sel ? META[sel] : null;
  const imgs   = sel ? CAR_IMAGES[sel] : null;
  const base   = sel ? BASE_PRICES[sel] : 0;
  const total  = base
    + CONFIG_OPTIONS.colors[color].price
    + CONFIG_OPTIONS.interiors[interior].price
    + CONFIG_OPTIONS.performance[perf].price
    + CONFIG_OPTIONS.wheels[wheels].price;
  const extras = total - base;
  const currentImg = imgs ? imgs[activeView] : null;

  const S = {
    label: { fontSize:"0.5rem", letterSpacing:"0.45em", color:"#555", textTransform:"uppercase", fontFamily:F.sans, marginBottom:"0.6rem", display:"block" },
    optBtn: active => ({
      background: active ? "linear-gradient(135deg,rgba(212,175,55,0.15),rgba(212,175,55,0.05))" : "rgba(255,255,255,0.02)",
      border: active ? "1px solid rgba(212,175,55,0.6)" : "1px solid rgba(255,255,255,0.07)",
      color: active ? "#d4af37" : "#666",
      padding:"0.6rem 1rem", fontFamily:F.sans, fontSize:"0.58rem",
      letterSpacing:"0.15em", textTransform:"uppercase", cursor:"pointer",
      transition:"all 0.3s ease", fontWeight: active ? "500" : "300",
    }),
    viewTab: active => ({
      background: active ? "rgba(212,175,55,0.12)" : "rgba(255,255,255,0.02)",
      border: active ? "1px solid rgba(212,175,55,0.5)" : "1px solid rgba(255,255,255,0.06)",
      color: active ? "#d4af37" : "#555",
      padding:"0.5rem 1.2rem", fontFamily:F.sans, fontSize:"0.52rem",
      letterSpacing:"0.25em", textTransform:"uppercase", cursor:"pointer",
      transition:"all 0.3s ease", fontWeight: active ? "500" : "300",
    }),
  };

  return (
    <Section title="Asset Configurator" id="reactExamples2" className="interaction-panel">
      <div style={{ width:"100%", maxWidth:"1300px", margin:"0 auto" }}>

        {!sel ? (
          <>
            <p style={{ textAlign:"center", fontFamily:F.sans, fontSize:"0.65rem", color:"#444", letterSpacing:"0.3em", textTransform:"uppercase", marginBottom:"3rem" }}>
              Select a vehicle to begin configuration
            </p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1.2rem" }}>
              {VEHICLES.map((v, i) => {
                const m = META[v.slug];
                const bg = CAR_IMAGES[v.slug].exterior;
                return (
                  <div key={v.slug}
                    onClick={() => { setSel(v.slug); setActiveView("exterior"); setColor(0); setInterior(0); setPerf(0); setWheels(0); }}
                    style={{ position:"relative", overflow:"hidden", cursor:"pointer", border:"1px solid rgba(255,255,255,0.06)", minHeight:"190px", transition:"border-color 0.4s ease" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(212,175,55,0.5)"; e.currentTarget.querySelector(".cbg").style.transform="scale(1.07)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.06)"; e.currentTarget.querySelector(".cbg").style.transform="scale(1)"; }}
                  >
                    <div className="cbg" style={{ position:"absolute", inset:0, backgroundImage:`url(${bg})`, backgroundSize:"cover", backgroundPosition:"center", transition:"transform 0.6s ease" }} />
                    <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom,rgba(0,0,0,0.1) 0%,rgba(0,0,0,0.88) 100%)" }} />
                    <div style={{ position:"relative", zIndex:1, padding:"1.8rem 1.5rem" }}>
                      <div style={{ position:"absolute", top:"1rem", right:"1rem", fontFamily:F.serif, fontSize:"2.5rem", color:"rgba(212,175,55,0.15)", lineHeight:1 }}>{String(i+1).padStart(2,"0")}</div>
                      <div style={{ fontSize:"0.45rem", letterSpacing:"0.4em", color:"#d4af37", marginBottom:"0.5rem", textTransform:"uppercase", fontFamily:F.sans }}>{m.category}</div>
                      <div style={{ fontFamily:F.serif, fontSize:"1.3rem", color:"#fff", fontWeight:"400", marginBottom:"0.8rem", lineHeight:1.3, textShadow:"0 1px 8px rgba(0,0,0,0.9)" }}>{v.model}</div>
                      <div style={{ width:"25px", height:"1px", background:"linear-gradient(to right,rgba(212,175,55,0.6),transparent)", marginBottom:"0.8rem" }} />
                      <div style={{ fontSize:"0.6rem", color:"#d4af37", fontFamily:F.sans, letterSpacing:"0.1em" }}>{fmt(BASE_PRICES[v.slug])}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>

        ) : (

          <div key={sel} style={{ animation:"luxuryFadeIn 0.6s ease forwards" }}>
            <button onClick={() => setSel(null)} style={{ background:"none", border:"none", color:"#555", fontFamily:F.sans, fontSize:"0.58rem", letterSpacing:"0.3em", textTransform:"uppercase", cursor:"pointer", marginBottom:"2.5rem", padding:"0", display:"flex", alignItems:"center", gap:"0.7rem" }}>
              <span>←</span> Back to Collection
            </button>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 380px", gap:"2rem", alignItems:"start" }}>

              {/* ── LEFT ── */}
              <div>

                {/* Imagen principal dinámica */}
                <div style={{ position:"relative", height:"360px", overflow:"hidden", marginBottom:"1rem", border:"1px solid rgba(212,175,55,0.1)" }}>
                  <img
                    key={activeView + sel}
                    src={currentImg}
                    alt={car.model}
                    style={{ width:"100%", height:"100%", objectFit:"cover", filter:"brightness(0.82) contrast(1.05)", animation:"luxuryFadeIn 0.45s ease forwards" }}
                  />
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 55%)" }} />
                  <div style={{ position:"absolute", bottom:"1.5rem", left:"1.5rem" }}>
                    <div style={{ fontSize:"0.5rem", letterSpacing:"0.5em", color:"#d4af37", fontFamily:F.sans, marginBottom:"0.3rem" }}>{meta.category}</div>
                    <div style={{ fontFamily:F.serif, fontSize:"2rem", color:"#fff", fontWeight:"400", lineHeight:1 }}>{car.model}</div>
                  </div>
                  {/* Badge vista activa */}
                  <div style={{ position:"absolute", top:"1.2rem", left:"1.5rem", background:"rgba(0,0,0,0.55)", border:"1px solid rgba(212,175,55,0.3)", padding:"0.3rem 0.9rem" }}>
                    <span style={{ fontSize:"0.48rem", letterSpacing:"0.3em", color:"#d4af37", fontFamily:F.sans, textTransform:"uppercase" }}>
                      {VIEW_TABS.find(t => t.key === activeView)?.label} View
                    </span>
                  </div>
                  <div style={{ position:"absolute", top:"1.2rem", right:"1.5rem", width:"44px", height:"44px", border:"1px solid rgba(212,175,55,0.25)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <span style={{ fontFamily:F.serif, fontSize:"0.75rem", color:"rgba(212,175,55,0.6)" }}>{meta.lot}</span>
                  </div>
                </div>

                {/* Tabs manuales de vista */}
                <div style={{ display:"flex", gap:"0.5rem", marginBottom:"2rem", flexWrap:"wrap" }}>
                  {VIEW_TABS.map(tab => (
                    <button key={tab.key} onClick={() => setActiveView(tab.key)} style={S.viewTab(activeView === tab.key)}>
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Opciones */}
                <div style={{ display:"flex", flexDirection:"column", gap:"2rem" }}>

                  {/* COLOR → muestra exterior */}
                  <div>
                    <span style={S.label}>Exterior Color</span>
                    <div style={{ display:"flex", gap:"0.6rem", flexWrap:"wrap", alignItems:"center" }}>
                      {CONFIG_OPTIONS.colors.map((c, i) => (
                        <div key={i}
                          onClick={() => { setColor(i); setActiveView("exterior"); }}
                          title={c.name}
                          style={{ width:"32px", height:"32px", borderRadius:"50%", background:c.hex, border:color===i?"2px solid #d4af37":"2px solid rgba(255,255,255,0.1)", cursor:"pointer", transition:"all 0.3s ease", boxShadow:color===i?"0 0 14px rgba(212,175,55,0.5)":"none", outline:color===i?"1px solid rgba(212,175,55,0.3)":"none", outlineOffset:"3px" }}
                        />
                      ))}
                      <span style={{ fontSize:"0.6rem", color:"#d4af37", fontFamily:F.sans, letterSpacing:"0.1em", marginLeft:"0.5rem" }}>
                        {CONFIG_OPTIONS.colors[color].name}{CONFIG_OPTIONS.colors[color].price > 0 ? "  +" + fmt(CONFIG_OPTIONS.colors[color].price) : ""}
                      </span>
                    </div>
                  </div>

                  {/* INTERIOR → muestra interior */}
                  <div>
                    <span style={S.label}>Interior & Upholstery</span>
                    <div style={{ display:"flex", gap:"0.5rem", flexWrap:"wrap" }}>
                      {CONFIG_OPTIONS.interiors.map((o, i) => (
                        <button key={i} onClick={() => { setInterior(i); setActiveView("interior"); }} style={S.optBtn(interior === i)}>
                          {o.name}{o.price > 0 ? " +" + fmt(o.price) : ""}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* PERFORMANCE → muestra engine */}
                  <div>
                    <span style={S.label}>Performance Package</span>
                    <div style={{ display:"flex", gap:"0.5rem", flexWrap:"wrap" }}>
                      {CONFIG_OPTIONS.performance.map((o, i) => (
                        <button key={i} onClick={() => { setPerf(i); setActiveView(o.view); }} style={S.optBtn(perf === i)}>
                          {o.name}{o.price > 0 ? " +" + fmt(o.price) : ""}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* WHEELS → muestra body kit */}
                  <div>
                    <span style={S.label}>Wheels & Body Kit</span>
                    <div style={{ display:"flex", gap:"0.5rem", flexWrap:"wrap" }}>
                      {CONFIG_OPTIONS.wheels.map((o, i) => (
                        <button key={i} onClick={() => { setWheels(i); setActiveView(o.view); }} style={S.optBtn(wheels === i)}>
                          {o.name}{o.price > 0 ? " +" + fmt(o.price) : ""}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* ── RIGHT — Summary ── */}
              <div style={{ position:"sticky", top:"2rem", border:"1px solid rgba(212,175,55,0.15)", background:"rgba(255,255,255,0.02)" }}>
                <div style={{ padding:"2rem", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ fontSize:"0.5rem", letterSpacing:"0.5em", color:"#555", fontFamily:F.sans, marginBottom:"0.5rem", textTransform:"uppercase" }}>Configuration Summary</div>
                  <div style={{ fontFamily:F.serif, fontSize:"1.1rem", color:"#ccc", fontWeight:"400" }}>{car.model}</div>
                </div>

                <div style={{ padding:"1.5rem 2rem", display:"flex", flexDirection:"column", gap:"1rem" }}>
                  {[
                    { label:"Base Price", val:fmt(base) },
                    { label:"Color: "+CONFIG_OPTIONS.colors[color].name, val:CONFIG_OPTIONS.colors[color].price>0?"+"+fmt(CONFIG_OPTIONS.colors[color].price):"Included" },
                    { label:"Interior: "+CONFIG_OPTIONS.interiors[interior].name, val:CONFIG_OPTIONS.interiors[interior].price>0?"+"+fmt(CONFIG_OPTIONS.interiors[interior].price):"Included" },
                    { label:"Performance: "+CONFIG_OPTIONS.performance[perf].name, val:CONFIG_OPTIONS.performance[perf].price>0?"+"+fmt(CONFIG_OPTIONS.performance[perf].price):"Included" },
                    { label:"Wheels: "+CONFIG_OPTIONS.wheels[wheels].name, val:CONFIG_OPTIONS.wheels[wheels].price>0?"+"+fmt(CONFIG_OPTIONS.wheels[wheels].price):"Included" },
                  ].map((row, i) => (
                    <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", gap:"1rem" }}>
                      <span style={{ fontSize:"0.55rem", color:"#444", fontFamily:F.sans, letterSpacing:"0.05em" }}>{row.label}</span>
                      <span style={{ fontSize:"0.6rem", color:"#666", fontFamily:F.sans, whiteSpace:"nowrap" }}>{row.val}</span>
                    </div>
                  ))}
                </div>

                {extras > 0 && (
                  <div style={{ padding:"1rem 2rem", borderTop:"1px solid rgba(255,255,255,0.04)", display:"flex", justifyContent:"space-between" }}>
                    <span style={{ fontSize:"0.55rem", color:"#555", fontFamily:F.sans }}>Options Total</span>
                    <span style={{ fontSize:"0.6rem", color:"#888", fontFamily:F.sans }}>+{fmt(extras)}</span>
                  </div>
                )}

                <div style={{ padding:"1.5rem 2rem", borderTop:"1px solid rgba(212,175,55,0.15)", background:"rgba(212,175,55,0.03)" }}>
                  <div style={{ fontSize:"0.5rem", letterSpacing:"0.4em", color:"#555", fontFamily:F.sans, marginBottom:"0.5rem", textTransform:"uppercase" }}>Total Configuration</div>
                  <div style={{ fontFamily:F.serif, fontSize:"2.2rem", color:"#d4af37", fontWeight:"600", textShadow:"0 0 30px rgba(212,175,55,0.25)" }}>{fmt(total)}</div>
                </div>

                <div style={{ padding:"1.5rem 2rem", borderTop:"1px solid rgba(255,255,255,0.04)" }}>
                  <div style={{ border:"1px solid rgba(212,175,55,0.3)", padding:"1rem", textAlign:"center", cursor:"pointer", transition:"all 0.4s ease" }}
                    onMouseEnter={e => e.currentTarget.style.background="rgba(212,175,55,0.08)"}
                    onMouseLeave={e => e.currentTarget.style.background="transparent"}>
                    <span style={{ fontSize:"0.6rem", letterSpacing:"0.3em", color:"#d4af37", textTransform:"uppercase", fontFamily:F.sans }}>Request Quotation →</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </Section>
  );
}