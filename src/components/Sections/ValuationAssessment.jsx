import { useState, useEffect, useRef } from "react";
import Section from "../Section/Section";
import { VEHICLES } from "../../data.js";

// ─── Exterior images ───────────────────────────────────────────────────────────
import BugattiExt from "../../assets/Bugatti Chiron black side view.jpg";
import FerrariExt from "../../assets/Ferrari Roma front view dark.jpg";
import PaganiExt from "../../assets/Pagani Huayra carbon fiber.jpg";
import RollsExt from "../../assets/Rolls Royce Phantom black luxury.jpg";
import SupraExt from "../../assets/Toyota Supra MK5.png";
import KoenigExt from "../../assets/Koenigsegg Regera hypercar.jpg";
import LamboExt from "../../assets/Lamborghini Veneno side.jpg";
import AstonExt from "../../assets/Aston Martin Valkyrie F1.jpg";
import HennExt from "../../assets/Hennessey Venom F5 front.jpg";

// ─── Interior images ───────────────────────────────────────────────────────────
import BugattiInt from "../../assets/Bugatti Chiron interior cockpit.jpg";
import FerrariInt from "../../assets/Ferrari Roma interior red.jpg";
import PaganiInt from "../../assets/Pagani Huayra interior gold.jpg";
import RollsInt from "../../assets/Rolls Royce Phantom interior starlight.jpg";
import SupraInt from "../../assets/Toyota Supra A90 interior.jpg";
import KoenigInt from "../../assets/Koenigsegg Regera interior.jpg";
import LamboInt from "../../assets/Lamborghini Veneno interior.jpg";
import AstonInt from "../../assets/Aston Martin Valkyrie interior.jpg";
import HennInt from "../../assets/Hennessey Venom F5 interior.jpg";

// ─── Engine images ─────────────────────────────────────────────────────────────
import BugattiEng from "../../assets/Bugatti Chiron engine W16.jpg";
import PaganiEng from "../../assets/Pagani Huayra engine AMG.jpg";
import RollsEng from "../../assets/Rolls Royce Phantom front grille.jpg";
import SupraEng from "../../assets/Toyota Supra MK5 2JZ engine.jpg";
import KoenigEng from "../../assets/Koenigsegg Regera engine hybrid.jpg";
import LamboKit from "../../assets/Lamborghini Veneno carbon.jpg";
import AstonEng from "../../assets/Aston Martin Valkyrie engine Cosworth.jpg";
import HennEng from "../../assets/Hennessey Venom F5 engine.jpg";
import SupraKit from "../../assets/Toyota Supra widebody kit.jpg";

// ─── Image map ────────────────────────────────────────────────────────────────
const CAR_IMAGES = {
  "bugatti-chiron": {
    exterior: { src: BugattiExt, pos: "center 40%" },
    interior: { src: BugattiInt, pos: "center center" },
    engine: { src: BugattiEng, pos: "center center" },
    body: { src: BugattiExt, pos: "center 40%" },
  },
  "ferrari-roma": {
    exterior: { src: FerrariExt, pos: "center 60%" },
    interior: { src: FerrariInt, pos: "center center" },
    engine: { src: FerrariExt, pos: "center 60%" },
    body: { src: FerrariExt, pos: "center 70%" },
  },
  "pagani-huayra": {
    exterior: { src: PaganiExt, pos: "center 50%" },
    interior: { src: PaganiInt, pos: "center center" },
    engine: { src: PaganiEng, pos: "center center" },
    body: { src: PaganiExt, pos: "center 50%" },
  },
  "rolls-royce-phantom": {
    exterior: { src: RollsExt, pos: "center 60%" },
    interior: { src: RollsInt, pos: "center center" },
    engine: { src: RollsEng, pos: "center 40%" },
    body: { src: RollsExt, pos: "center 60%" },
  },
  "toyota-supra-mk5": {
    exterior: { src: SupraExt, pos: "center 55%" },
    interior: { src: SupraInt, pos: "center center" },
    engine: { src: SupraEng, pos: "center center" },
    body: { src: SupraKit, pos: "center 50%" },
  },
  "koenigsegg-regera": {
    exterior: { src: KoenigExt, pos: "center 50%" },
    interior: { src: KoenigInt, pos: "center center" },
    engine: { src: KoenigEng, pos: "center center" },
    body: { src: KoenigExt, pos: "center 50%" },
  },
  "lamborghini-veneno": {
    exterior: { src: LamboExt, pos: "center 45%" },
    interior: { src: LamboInt, pos: "center center" },
    engine: { src: LamboKit, pos: "center center" },
    body: { src: LamboKit, pos: "center center" },
  },
  "aston-martin-valkyrie": {
    exterior: { src: AstonExt, pos: "center 50%" },
    interior: { src: AstonInt, pos: "center center" },
    engine: { src: AstonEng, pos: "center center" },
    body: { src: AstonExt, pos: "center 50%" },
  },
  "hennessey-venom-f5": {
    exterior: { src: HennExt, pos: "center 45%" },
    interior: { src: HennInt, pos: "center center" },
    engine: { src: HennEng, pos: "center center" },
    body: { src: HennExt, pos: "center 45%" },
  },
};

// ─── Prices & meta ────────────────────────────────────────────────────────────
const BASE_PRICES = {
  "bugatti-chiron": 4000000,
  "ferrari-roma": 300000,
  "pagani-huayra": 3000000,
  "rolls-royce-phantom": 450000,
  "toyota-supra-mk5": 400000,
  "koenigsegg-regera": 4000000,
  "lamborghini-veneno": 9000000,
  "aston-martin-valkyrie": 2500000,
  "hennessey-venom-f5": 1850000,
};
const META = {
  "bugatti-chiron": { category: "Hypercar", lot: "01" },
  "ferrari-roma": { category: "GT Coupé", lot: "02" },
  "pagani-huayra": { category: "Atelier", lot: "03" },
  "rolls-royce-phantom": { category: "Ultra Luxury", lot: "04" },
  "toyota-supra-mk5": { category: "Sports Car", lot: "05" },
  "koenigsegg-regera": { category: "Megacar", lot: "06" },
  "lamborghini-veneno": { category: "Collector", lot: "07" },
  "aston-martin-valkyrie": { category: "Track Weapon", lot: "08" },
  "hennessey-venom-f5": { category: "Speed Record", lot: "09" },
};

// ─── Configuration options ────────────────────────────────────────────────────
const CONFIG = {
  colors: [
    { name: "Noir Obsidian", price: 0, hex: "#0a0a0a", view: "exterior" },
    { name: "Arctic White", price: 12000, hex: "#f0ece4", view: "exterior" },
    { name: "Racing Red", price: 8000, hex: "#8b0000", view: "exterior" },
    { name: "Midnight Blue", price: 8000, hex: "#0a1628", view: "exterior" },
    { name: "Gold Edition", price: 25000, hex: "#c9a84c", view: "exterior" },
    { name: "Matte Carbon", price: 18000, hex: "#1e1e1e", view: "exterior" },
  ],
  interiors: [
    { name: "Black Nappa Leather", price: 0, view: "interior" },
    { name: "Cream Alcantara", price: 15000, view: "interior" },
    { name: "Red Suede", price: 22000, view: "interior" },
    { name: "Carbon Fibre", price: 35000, view: "interior" },
    { name: "Cognac Full Grain", price: 28000, view: "interior" },
  ],
  performance: [
    { name: "Standard", price: 0, sub: "Base configuration", view: "exterior" },
    { name: "Sport Package", price: 45000, sub: "+180 hp", view: "engine" },
    { name: "Track Edition", price: 85000, sub: "+310 hp", view: "engine" },
    {
      name: "Ultimate Performance",
      price: 140000,
      sub: "Maximum output",
      view: "engine",
    },
  ],
  wheels: [
    { name: "Standard Alloy", price: 0, view: "exterior" },
    { name: "Forged Carbon", price: 18000, view: "body" },
    { name: "Titanium Sport", price: 28000, view: "body" },
    { name: "Signature Edition", price: 42000, view: "body" },
  ],
};

// ─── Utility ──────────────────────────────────────────────────────────────────
const fmt = (n) => "€" + Number(n).toLocaleString("de-DE");

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ValuationAssessment() {
  const [sel, setSel] = useState(null);
  const [activeView, setView] = useState("exterior");
  const [colorIdx, setColor] = useState(0);
  const [interiorIdx, setInter] = useState(0);
  const [perfIdx, setPerf] = useState(0);
  const [wheelsIdx, setWheels] = useState(0);
  const [cfgTab, setCfgTab] = useState("color");
  const [imgLoaded, setImgLoaded] = useState(false);
  const [entered, setEntered] = useState(false);
  const [toast, setToast] = useState(null);
  const imgRef = useRef(null);

  const car = VEHICLES.find((v) => v.slug === sel);
  const meta = sel ? META[sel] : null;
  const imgs = sel ? CAR_IMAGES[sel] : null;
  const base = sel ? BASE_PRICES[sel] : 0;
  const total =
    base +
    CONFIG.colors[colorIdx].price +
    CONFIG.interiors[interiorIdx].price +
    CONFIG.performance[perfIdx].price +
    CONFIG.wheels[wheelsIdx].price;
  const extras = total - base;
  const currentImg = imgs ? imgs[activeView] : null;

  useEffect(() => {
    if (sel) {
      setImgLoaded(false);
      const t = setTimeout(() => setEntered(true), 60);
      return () => clearTimeout(t);
    }
    setEntered(false);
  }, [sel]);

  function selectVehicle(slug) {
    setSel(slug);
    setView("exterior");
    setColor(0);
    setInter(0);
    setPerf(0);
    setWheels(0);
    setCfgTab("color");
  }

  function triggerToast() {
    setToast("Acquisition request submitted");
    setTimeout(() => setToast(null), 3000);
  }

  const CFG_TABS = [
    { key: "color", label: "Exterior Colour", icon: "◈" },
    { key: "interior", label: "Interior Trim", icon: "◇" },
    { key: "performance", label: "Performance", icon: "◆" },
    { key: "wheels", label: "Wheel Design", icon: "○" },
  ];

  return (
    <Section
      title="Vehicle Configuration Studio"
      id="reactExamples2"
      className="interaction-panel"
    >
      <div className="acs-root">
        {/* ── VEHICLE SELECTION GRID ─────────────────────────── */}
        {!sel && (
          <div className="acs-selection">
            <div className="acs-sel-header">
              <div className="acs-eyebrow-row">
                <span className="acs-eyebrow-line" />
                <span className="acs-eyebrow-text">Select Your Vehicle</span>
                <span className="acs-eyebrow-line" />
              </div>
              <p className="acs-sel-sub">
                Choose from our curated collection to begin configuration
              </p>
            </div>

            <div className="acs-grid">
              {VEHICLES.map((v, i) => {
                const m = META[v.slug];
                const imgD = CAR_IMAGES[v.slug]?.exterior;
                return (
                  <button
                    key={v.slug}
                    className="acs-vehicle-card"
                    onClick={() => selectVehicle(v.slug)}
                    style={{ animationDelay: `${i * 0.07}s` }}
                  >
                    {/* Background image */}
                    <div
                      className="acs-card-bg"
                      style={{
                        backgroundImage: `url(${imgD?.src})`,
                        backgroundPosition: imgD?.pos,
                      }}
                    />
                    {/* Gradient overlay */}
                    <div className="acs-card-overlay" />

                    {/* Corner brackets */}
                    <div className="acs-corner acs-corner--tl" />
                    <div className="acs-corner acs-corner--tr" />
                    <div className="acs-corner acs-corner--bl" />
                    <div className="acs-corner acs-corner--br" />

                    {/* Lot number watermark */}
                    <div className="acs-card-lot">
                      {String(i + 1).padStart(2, "0")}
                    </div>

                    {/* Card content */}
                    <div className="acs-card-body">
                      <div className="acs-card-category">{m.category}</div>
                      <h3 className="acs-card-name">{v.model}</h3>
                      <div className="acs-card-divider" />
                      <div className="acs-card-price">
                        {fmt(BASE_PRICES[v.slug])}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="acs-card-cta">Configure →</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── CONFIGURATOR ──────────────────────────────────── */}
        {sel && car && (
          <div
            className={`acs-configurator ${entered ? "acs-configurator--in" : ""}`}
          >
            {/* Back button */}
            <button className="acs-back" onClick={() => setSel(null)}>
              <span className="acs-back-arrow">←</span>
              <span className="acs-back-text">Back to Collection</span>
            </button>

            {/* Main layout: Left (image) + Right (config panel) */}
            <div className="acs-layout">
              {/* ── LEFT: IMAGE STAGE ───────────────────── */}
              <div className="acs-image-stage">
                {/* Main image */}
                <div className="acs-image-frame">
                  {/* Color tint overlay */}
                  <div
                    className="acs-color-tint"
                    style={{
                      background: `radial-gradient(ellipse at 40% 60%, ${CONFIG.colors[colorIdx].hex}28 0%, transparent 60%)`,
                    }}
                  />

                  <img
                    key={activeView + sel}
                    ref={imgRef}
                    src={currentImg?.src}
                    alt={car.model}
                    className={`acs-main-img ${imgLoaded ? "acs-main-img--loaded" : ""}`}
                    style={{ objectPosition: currentImg?.pos }}
                    onLoad={() => setImgLoaded(true)}
                  />

                  {/* Top accent line */}
                  <div className="acs-img-top-line" />

                  {/* View label badge */}
                  <div className="acs-view-badge">
                    <span className="acs-view-badge-dot" />
                    {CFG_TABS.find((t) => {
                      if (cfgTab === "color") return t.key === "color";
                      if (cfgTab === "interior") return t.key === "interior";
                      if (cfgTab === "performance")
                        return t.key === "performance";
                      return t.key === "wheels";
                    })?.label ??
                      activeView.charAt(0).toUpperCase() +
                        activeView.slice(1)}{" "}
                    View
                  </div>

                  {/* Lot badge */}
                  <div className="acs-lot-badge">{meta.lot}</div>

                  {/* Bottom vehicle info */}
                  <div className="acs-img-info">
                    <div className="acs-img-category">{meta.category}</div>
                    <h2 className="acs-img-model">{car.model}</h2>

                    {/* Active config chips */}
                    <div className="acs-config-chips">
                      {[
                        CONFIG.colors[colorIdx].name,
                        CONFIG.interiors[interiorIdx].name,
                        CONFIG.performance[perfIdx].name,
                        CONFIG.wheels[wheelsIdx].name,
                      ].map((label, i) => (
                        <span key={i} className="acs-chip">
                          {label}
                        </span>
                      ))}
                    </div>

                    {/* Quick specs */}
                    <div className="acs-quick-specs">
                      {car.hp && (
                        <div className="acs-spec">
                          <span className="acs-spec-val">{car.hp}</span>
                          <span className="acs-spec-unit">HP</span>
                        </div>
                      )}
                      {car.top && (
                        <div className="acs-spec">
                          <span className="acs-spec-val">{car.top}</span>
                          <span className="acs-spec-unit">KM/H</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* View thumbnails */}
                <div className="acs-thumbs">
                  {[
                    { key: "exterior", label: "Ext." },
                    { key: "interior", label: "Int." },
                    { key: "engine", label: "Eng." },
                    { key: "body", label: "Body" },
                  ].map(({ key, label }) => (
                    <button
                      key={key}
                      className={`acs-thumb ${activeView === key ? "acs-thumb--active" : ""}`}
                      onClick={() => setView(key)}
                    >
                      <div
                        className="acs-thumb-img"
                        style={{
                          backgroundImage: `url(${imgs[key]?.src})`,
                          backgroundPosition: imgs[key]?.pos,
                        }}
                      />
                      <span className="acs-thumb-label">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* ── RIGHT: CONFIGURATION PANEL ─────────── */}
              <div className="acs-config-panel">
                {/* Top accent */}
                <div
                  className="acs-panel-accent"
                  style={{
                    background: `linear-gradient(to right, ${car.accent || "#d4af37"}, transparent)`,
                  }}
                />

                {/* Config section tabs */}
                <div className="acs-cfg-tabs">
                  {CFG_TABS.map((t) => (
                    <button
                      key={t.key}
                      className={`acs-cfg-tab ${cfgTab === t.key ? "acs-cfg-tab--active" : ""}`}
                      onClick={() => setCfgTab(t.key)}
                    >
                      <span className="acs-cfg-tab-icon">{t.icon}</span>
                      <span className="acs-cfg-tab-label">{t.label}</span>
                    </button>
                  ))}
                </div>

                {/* Config content */}
                <div className="acs-cfg-content" key={cfgTab}>
                  {/* ── COLOUR ── */}
                  {cfgTab === "color" && (
                    <div className="acs-section">
                      <div className="acs-section-hdr">
                        <span className="acs-section-eyebrow">
                          Exterior Colour
                        </span>
                        <span className="acs-section-selection">
                          {CONFIG.colors[colorIdx].name}
                        </span>
                      </div>

                      {/* Swatches */}
                      <div className="acs-swatches">
                        {CONFIG.colors.map((c, i) => (
                          <button
                            key={i}
                            title={c.name}
                            className={`acs-swatch ${colorIdx === i ? "acs-swatch--active" : ""}`}
                            style={{ background: c.hex }}
                            onClick={() => {
                              setColor(i);
                              setView("exterior");
                            }}
                          />
                        ))}
                      </div>

                      {/* Option list */}
                      {CONFIG.colors.map((c, i) => (
                        <button
                          key={i}
                          className={`acs-option-row ${colorIdx === i ? "acs-option-row--active" : ""}`}
                          onClick={() => {
                            setColor(i);
                            setView("exterior");
                          }}
                        >
                          <div className="acs-option-left">
                            <div
                              className="acs-option-dot"
                              style={{
                                background: c.hex,
                                border:
                                  c.hex === "#f0ece4" ?
                                    "1px solid rgba(255,255,255,0.2)"
                                  : "none",
                              }}
                            />
                            <span className="acs-option-name">{c.name}</span>
                          </div>
                          <span className="acs-option-price">
                            {c.price > 0 ? `+${fmt(c.price)}` : "Included"}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* ── INTERIOR ── */}
                  {cfgTab === "interior" && (
                    <div className="acs-section">
                      <div className="acs-section-hdr">
                        <span className="acs-section-eyebrow">
                          Interior Trim
                        </span>
                        <span className="acs-section-selection">
                          {CONFIG.interiors[interiorIdx].name}
                        </span>
                      </div>
                      {CONFIG.interiors.map((c, i) => (
                        <button
                          key={i}
                          className={`acs-option-row ${interiorIdx === i ? "acs-option-row--active" : ""}`}
                          onClick={() => {
                            setInter(i);
                            setView("interior");
                          }}
                        >
                          <span className="acs-option-name">{c.name}</span>
                          <span className="acs-option-price">
                            {c.price > 0 ? `+${fmt(c.price)}` : "Included"}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* ── PERFORMANCE ── */}
                  {cfgTab === "performance" && (
                    <div className="acs-section">
                      <div className="acs-section-hdr">
                        <span className="acs-section-eyebrow">
                          Performance Package
                        </span>
                        <span className="acs-section-selection">
                          {CONFIG.performance[perfIdx].name}
                        </span>
                      </div>
                      {CONFIG.performance.map((c, i) => (
                        <button
                          key={i}
                          className={`acs-option-row acs-option-row--tall ${perfIdx === i ? "acs-option-row--active" : ""}`}
                          onClick={() => {
                            setPerf(i);
                            setView(c.view);
                          }}
                        >
                          <div className="acs-option-left acs-option-left--col">
                            <span className="acs-option-name">{c.name}</span>
                            <span className="acs-option-sub">{c.sub}</span>
                          </div>
                          <span className="acs-option-price">
                            {c.price > 0 ? `+${fmt(c.price)}` : "Included"}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* ── WHEELS ── */}
                  {cfgTab === "wheels" && (
                    <div className="acs-section">
                      <div className="acs-section-hdr">
                        <span className="acs-section-eyebrow">
                          Wheel Design
                        </span>
                        <span className="acs-section-selection">
                          {CONFIG.wheels[wheelsIdx].name}
                        </span>
                      </div>
                      {CONFIG.wheels.map((c, i) => (
                        <button
                          key={i}
                          className={`acs-option-row ${wheelsIdx === i ? "acs-option-row--active" : ""}`}
                          onClick={() => {
                            setWheels(i);
                            setView(c.view);
                          }}
                        >
                          <span className="acs-option-name">{c.name}</span>
                          <span className="acs-option-price">
                            {c.price > 0 ? `+${fmt(c.price)}` : "Included"}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* ── SUMMARY + CTA ── */}
                <div className="acs-summary">
                  {/* Price breakdown */}
                  <div className="acs-breakdown">
                    <div className="acs-breakdown-row">
                      <span className="acs-breakdown-label">Base Price</span>
                      <span className="acs-breakdown-val">{fmt(base)}</span>
                    </div>
                    {CONFIG.colors[colorIdx].price > 0 && (
                      <div className="acs-breakdown-row">
                        <span className="acs-breakdown-label">
                          {CONFIG.colors[colorIdx].name}
                        </span>
                        <span className="acs-breakdown-val">
                          +{fmt(CONFIG.colors[colorIdx].price)}
                        </span>
                      </div>
                    )}
                    {CONFIG.interiors[interiorIdx].price > 0 && (
                      <div className="acs-breakdown-row">
                        <span className="acs-breakdown-label">
                          {CONFIG.interiors[interiorIdx].name}
                        </span>
                        <span className="acs-breakdown-val">
                          +{fmt(CONFIG.interiors[interiorIdx].price)}
                        </span>
                      </div>
                    )}
                    {CONFIG.performance[perfIdx].price > 0 && (
                      <div className="acs-breakdown-row">
                        <span className="acs-breakdown-label">
                          {CONFIG.performance[perfIdx].name}
                        </span>
                        <span className="acs-breakdown-val">
                          +{fmt(CONFIG.performance[perfIdx].price)}
                        </span>
                      </div>
                    )}
                    {CONFIG.wheels[wheelsIdx].price > 0 && (
                      <div className="acs-breakdown-row">
                        <span className="acs-breakdown-label">
                          {CONFIG.wheels[wheelsIdx].name}
                        </span>
                        <span className="acs-breakdown-val">
                          +{fmt(CONFIG.wheels[wheelsIdx].price)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Total */}
                  <div className="acs-total">
                    <div className="acs-total-label">Total Configuration</div>
                    <div className="acs-total-price" key={total}>
                      {fmt(total)}
                    </div>
                    <div className="acs-total-notes">
                      <span>VAT Exclusive</span>
                      <span>·</span>
                      <span>White-Glove Delivery</span>
                      <span>·</span>
                      <span>24h Contact</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button className="acs-acquire-btn" onClick={triggerToast}>
                    <span className="acs-acquire-shine" />
                    <span className="acs-acquire-text">Begin Acquisition</span>
                    <span className="acs-acquire-arrow">→</span>
                  </button>

                  {/* Secondary action */}
                  <button className="acs-secondary-btn">
                    Save Configuration
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TOAST ─────────────────────────────────────────── */}
        {toast && (
          <div className="acs-toast">
            <span className="acs-toast-icon">◆</span>
            <span className="acs-toast-text">{toast}</span>
          </div>
        )}
      </div>

      {/* ════════════════════════════════════════════════════
          STYLES
      ════════════════════════════════════════════════════ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Montserrat:wght@200;300;400;500;600&family=Cinzel:wght@400;500&display=swap');

        /* ── CSS Variables ── */
        .acs-root {
          --gold:        #d4af37;
          --gold-light:  #f0cc5a;
          --gold-dim:    rgba(212,175,55,0.12);
          --gold-border: rgba(212,175,55,0.3);
          --black:       #000000;
          --surface:     #090909;
          --surface-2:   #0f0f0f;
          --text:        #f0ece4;
          --text-muted:  rgba(240,236,228,0.45);
          --serif:       'Cormorant Garamond', Georgia, serif;
          --sans:        'Montserrat', sans-serif;
          --display:     'Cinzel', serif;
          --ease:        cubic-bezier(0.23, 1, 0.32, 1);
        }

        /* ── Root ── */
        .acs-root {
          width: 100%;
          max-width: 1340px;
          margin: 0 auto;
          color: var(--text);
          font-family: var(--sans);
        }

        /* ─────────────────────────────────────────────────
           SELECTION GRID
        ───────────────────────────────────────────────── */
        .acs-selection {
          padding: 0 0 4rem;
        }

        .acs-sel-header {
          text-align: center;
          margin-bottom: 3.5rem;
        }

        .acs-eyebrow-row {
          display: inline-flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 1rem;
        }

        .acs-eyebrow-line {
          display: block;
          width: 48px;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--gold-border));
        }
        .acs-eyebrow-row span:last-child {
          background: linear-gradient(to left, transparent, var(--gold-border));
        }

        .acs-eyebrow-text {
          font-size: 0.65rem;
          letter-spacing: 0.5em;
          color: var(--gold);
          text-transform: uppercase;
          font-weight: 500;
        }

        .acs-sel-sub {
          font-family: var(--serif);
          font-style: italic;
          font-size: 1.05rem;
          color: var(--text-muted);
          letter-spacing: 0.04em;
        }

        .acs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3px;
          background: rgba(212,175,55,0.04);
        }

        /* ── Vehicle card ── */
        .acs-vehicle-card {
          position: relative;
          height: 280px;
          overflow: hidden;
          cursor: pointer;
          border: 1px solid rgba(212,175,55,0.12);
          background: var(--surface);
          text-align: left;
          padding: 0;
          opacity: 0;
          animation: acsCardIn 0.6s var(--ease) forwards;
          transition: border-color 0.4s ease, transform 0.5s var(--ease), box-shadow 0.5s ease;
        }

        @keyframes acsCardIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .acs-vehicle-card:hover {
          border-color: rgba(212,175,55,0.55);
          transform: translateY(-5px);
          box-shadow: 0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.12);
        }

        .acs-card-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          transition: transform 0.8s var(--ease);
        }

        .acs-vehicle-card:hover .acs-card-bg {
          transform: scale(1.07);
        }

        .acs-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.05) 0%,
            rgba(0,0,0,0.35) 40%,
            rgba(0,0,0,0.88) 100%
          );
          transition: background 0.4s ease;
        }

        .acs-vehicle-card:hover .acs-card-overlay {
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.0) 0%,
            rgba(0,0,0,0.25) 40%,
            rgba(0,0,0,0.82) 100%
          );
        }

        /* Golden corner brackets */
        .acs-corner {
          position: absolute;
          width: 20px;
          height: 20px;
          border-color: var(--gold);
          border-style: solid;
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 3;
        }
        .acs-vehicle-card:hover .acs-corner { opacity: 1; }
        .acs-corner--tl { top: 12px;  left: 12px;  border-width: 1px 0 0 1px; }
        .acs-corner--tr { top: 12px;  right: 12px; border-width: 1px 1px 0 0; }
        .acs-corner--bl { bottom: 12px; left: 12px;  border-width: 0 0 1px 1px; }
        .acs-corner--br { bottom: 12px; right: 12px; border-width: 0 1px 1px 0; }

        .acs-card-lot {
          position: absolute;
          top: 10px;
          right: 14px;
          font-family: var(--serif);
          font-size: 2.8rem;
          font-weight: 300;
          color: rgba(212,175,55,0.15);
          line-height: 1;
          z-index: 2;
          transition: color 0.4s ease;
        }
        .acs-vehicle-card:hover .acs-card-lot { color: rgba(212,175,55,0.35); }

        .acs-card-body {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 0 20px 18px;
          z-index: 3;
        }

        .acs-card-category {
          font-size: 0.6rem;
          letter-spacing: 0.35em;
          color: var(--gold);
          text-transform: uppercase;
          font-weight: 600;
          margin-bottom: 6px;
        }

        .acs-card-name {
          font-family: var(--serif);
          font-size: 1.5rem;
          font-weight: 400;
          color: #fff;
          line-height: 1.15;
          margin: 0 0 8px;
          text-shadow: 0 2px 16px rgba(0,0,0,0.9);
        }

        .acs-card-divider {
          width: 30px;
          height: 1px;
          background: linear-gradient(to right, var(--gold), transparent);
          margin-bottom: 8px;
        }

        .acs-card-price {
          font-family: var(--display);
          font-size: 0.82rem;
          color: var(--gold);
          letter-spacing: 0.08em;
        }

        .acs-card-cta {
          position: absolute;
          bottom: 18px;
          right: 18px;
          z-index: 4;
          font-size: 0.6rem;
          letter-spacing: 0.28em;
          color: var(--gold);
          border: 1px solid rgba(212,175,55,0.4);
          padding: 0.4rem 0.9rem;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(8px);
          opacity: 0;
          transform: translateX(8px);
          transition: opacity 0.35s ease, transform 0.35s var(--ease);
          text-transform: uppercase;
        }
        .acs-vehicle-card:hover .acs-card-cta {
          opacity: 1;
          transform: translateX(0);
        }

        /* ─────────────────────────────────────────────────
           CONFIGURATOR LAYOUT
        ───────────────────────────────────────────────── */
        .acs-configurator {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.7s var(--ease), transform 0.7s var(--ease);
        }
        .acs-configurator--in {
          opacity: 1;
          transform: translateY(0);
        }

        .acs-back {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: none;
          border: none;
          color: var(--text-muted);
          font-family: var(--sans);
          font-size: 0.65rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          cursor: pointer;
          padding: 0;
          margin-bottom: 2.5rem;
          transition: color 0.3s ease;
        }
        .acs-back:hover { color: var(--gold); }
        .acs-back-arrow { font-size: 0.9rem; }
        .acs-back-text  { font-weight: 300; }

        /* Two-column layout */
        .acs-layout {
          display: grid;
          grid-template-columns: 1fr 420px;
          gap: 0;
          border: 1px solid rgba(212,175,55,0.1);
          min-height: 720px;
        }

        /* ─────────────────────────────────────────────────
           LEFT: IMAGE STAGE
        ───────────────────────────────────────────────── */
        .acs-image-stage {
          display: flex;
          flex-direction: column;
          background: var(--surface);
          border-right: 1px solid rgba(212,175,55,0.08);
        }

        .acs-image-frame {
          position: relative;
          flex: 1;
          overflow: hidden;
          background: #040404;
        }

        .acs-color-tint {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 3;
          mix-blend-mode: screen;
          transition: background 1s var(--ease);
        }

        .acs-main-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transform: scale(1.04);
          filter: brightness(0.78) contrast(1.05) saturate(0.9);
          transition: opacity 0.9s var(--ease), transform 1.2s var(--ease), filter 0.8s ease;
          display: block;
        }
        .acs-main-img--loaded {
          opacity: 1;
          transform: scale(1);
          filter: brightness(0.85) contrast(1.04) saturate(0.92);
        }

        .acs-img-top-line {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent 0%, rgba(212,175,55,0.55) 50%, transparent 100%);
          z-index: 5;
        }

        .acs-view-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          z-index: 5;
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(0,0,0,0.62);
          border: 1px solid rgba(212,175,55,0.38);
          padding: 0.32rem 0.85rem;
          font-size: 0.6rem;
          letter-spacing: 0.28em;
          color: var(--gold);
          text-transform: uppercase;
          backdrop-filter: blur(10px);
        }

        .acs-view-badge-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--gold);
          flex-shrink: 0;
          animation: acsDotPulse 2s ease-in-out infinite;
        }

        @keyframes acsDotPulse {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.4; }
        }

        .acs-lot-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 5;
          width: 44px;
          height: 44px;
          border: 1px solid rgba(212,175,55,0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(8px);
          font-family: var(--serif);
          font-size: 0.75rem;
          color: rgba(212,175,55,0.75);
        }

        /* Bottom info overlay */
        .acs-img-info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 0 2rem 2rem;
          background: linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.7) 50%, transparent 100%);
          z-index: 4;
        }

        .acs-img-category {
          font-size: 0.6rem;
          letter-spacing: 0.45em;
          color: rgba(212,175,55,0.65);
          text-transform: uppercase;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .acs-img-model {
          font-family: var(--serif);
          font-size: clamp(1.8rem, 3vw, 2.8rem);
          font-weight: 300;
          color: #fff;
          line-height: 1;
          letter-spacing: 0.04em;
          margin: 0 0 0.8rem;
        }

        .acs-config-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1rem;
        }

        .acs-chip {
          font-size: 0.55rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 0.22rem 0.6rem;
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.32);
          background: rgba(255,255,255,0.03);
        }

        .acs-quick-specs {
          display: flex;
          gap: 2rem;
        }

        .acs-spec {
          display: flex;
          align-items: baseline;
          gap: 5px;
        }

        .acs-spec-val {
          font-family: var(--serif);
          font-size: 1.6rem;
          font-weight: 300;
          color: rgba(255,255,255,0.55);
          line-height: 1;
        }

        .acs-spec-unit {
          font-size: 0.58rem;
          letter-spacing: 0.26em;
          color: rgba(212,175,55,0.5);
          text-transform: uppercase;
        }

        /* ── Thumbnail strip ── */
        .acs-thumbs {
          display: flex;
          gap: 3px;
          padding: 3px;
          background: rgba(0,0,0,0.8);
          border-top: 1px solid rgba(212,175,55,0.08);
        }

        .acs-thumb {
          flex: 1;
          height: 72px;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          border: 1px solid rgba(255,255,255,0.04);
          background: var(--surface);
          padding: 0;
          transition: border-color 0.3s ease;
        }
        .acs-thumb:hover     { border-color: rgba(212,175,55,0.3); }
        .acs-thumb--active   { border-color: rgba(212,175,55,0.7) !important; }

        .acs-thumb-img {
          position: absolute;
          inset: 0;
          background-size: cover;
          filter: brightness(0.55) saturate(0.7);
          transition: filter 0.4s ease, transform 0.6s var(--ease);
        }
        .acs-thumb:hover .acs-thumb-img,
        .acs-thumb--active .acs-thumb-img {
          filter: brightness(0.75) saturate(0.9);
          transform: scale(1.05);
        }

        .acs-thumb-label {
          position: absolute;
          bottom: 5px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.56rem;
          letter-spacing: 0.25em;
          color: rgba(255,255,255,0.55);
          text-transform: uppercase;
          z-index: 2;
          white-space: nowrap;
        }
        .acs-thumb--active .acs-thumb-label { color: var(--gold); }

        /* ─────────────────────────────────────────────────
           RIGHT: CONFIGURATION PANEL
        ───────────────────────────────────────────────── */
        .acs-config-panel {
          display: flex;
          flex-direction: column;
          background: rgba(7,7,7,0.98);
          position: relative;
          overflow: hidden;
        }

        .acs-config-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at top right, rgba(212,175,55,0.04), transparent 65%);
          pointer-events: none;
        }

        .acs-panel-accent {
          height: 1px;
          flex-shrink: 0;
        }

        /* Section tabs */
        .acs-cfg-tabs {
          display: flex;
          flex-shrink: 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }

        .acs-cfg-tab {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          padding: 1rem 0.3rem;
          background: transparent;
          border: none;
          border-bottom: 1px solid transparent;
          cursor: pointer;
          font-family: var(--sans);
          font-size: 0.55rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
          transition: color 0.3s ease, border-color 0.3s ease;
          position: relative;
          margin-bottom: -1px;
        }
        .acs-cfg-tab:hover { color: rgba(255,255,255,0.5); }
        .acs-cfg-tab--active {
          color: var(--gold);
          border-bottom-color: var(--gold);
        }

        .acs-cfg-tab-icon {
          font-size: 0.85rem;
          opacity: 0.6;
          transition: opacity 0.3s ease;
        }
        .acs-cfg-tab--active .acs-cfg-tab-icon { opacity: 1; }

        .acs-cfg-tab-label {
          font-size: 0.54rem;
          letter-spacing: 0.2em;
        }

        /* Scrollable config content */
        .acs-cfg-content {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem 1.6rem;
          animation: acsFadeSlide 0.25s var(--ease);
        }

        @keyframes acsFadeSlide {
          from { opacity: 0; transform: translateX(12px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .acs-section { display: flex; flex-direction: column; gap: 2px; }

        .acs-section-hdr {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .acs-section-eyebrow {
          font-size: 0.56rem;
          letter-spacing: 0.42em;
          color: rgba(212,175,55,0.38);
          text-transform: uppercase;
        }

        .acs-section-selection {
          font-family: var(--serif);
          font-size: 1rem;
          font-weight: 300;
          color: #ddd;
        }

        /* Color swatches */
        .acs-swatches {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.2rem;
          flex-wrap: wrap;
        }

        .acs-swatch {
          width: 32px;
          height: 32px;
          cursor: pointer;
          border: 2px solid transparent;
          padding: 0;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          position: relative;
        }
        .acs-swatch::after {
          content: '';
          position: absolute;
          inset: -4px;
          border: 1px solid transparent;
          transition: border-color 0.25s ease;
        }
        .acs-swatch--active::after { border-color: var(--gold); }
        .acs-swatch:hover { transform: scale(1.18); }
        .acs-swatch--active {
          box-shadow: 0 0 0 1px var(--gold), 0 6px 18px rgba(212,175,55,0.25);
        }

        /* Option rows */
        .acs-option-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.85rem 1rem;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.04);
          cursor: pointer;
          text-align: left;
          width: 100%;
          position: relative;
          transition: background 0.3s ease, border-color 0.3s ease;
          overflow: hidden;
        }

        .acs-option-row::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: var(--gold);
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.3s var(--ease);
        }

        .acs-option-row--active {
          background: rgba(212,175,55,0.04);
          border-color: rgba(212,175,55,0.22);
        }
        .acs-option-row--active::before { transform: scaleY(1); }
        .acs-option-row:hover:not(.acs-option-row--active) {
          background: rgba(255,255,255,0.02);
          border-color: rgba(255,255,255,0.1);
        }

        .acs-option-row--tall { padding: 1rem 1rem; align-items: flex-start; }

        .acs-option-left {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }
        .acs-option-left--col {
          flex-direction: column;
          align-items: flex-start;
          gap: 0.25rem;
        }

        .acs-option-dot {
          width: 10px;
          height: 10px;
          flex-shrink: 0;
        }

        .acs-option-name {
          font-family: var(--sans);
          font-size: 0.62rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          transition: color 0.3s ease;
        }
        .acs-option-row--active .acs-option-name { color: rgba(255,255,255,0.85); }

        .acs-option-sub {
          font-size: 0.57rem;
          letter-spacing: 0.08em;
          color: rgba(212,175,55,0.38);
          transition: color 0.3s ease;
        }
        .acs-option-row--active .acs-option-sub { color: rgba(212,175,55,0.6); }

        .acs-option-price {
          font-family: var(--serif);
          font-size: 0.85rem;
          font-weight: 300;
          color: rgba(255,255,255,0.18);
          flex-shrink: 0;
          transition: color 0.3s ease;
        }
        .acs-option-row--active .acs-option-price { color: var(--gold); }

        /* ─────────────────────────────────────────────────
           SUMMARY + CTA
        ───────────────────────────────────────────────── */
        .acs-summary {
          flex-shrink: 0;
          padding: 1.4rem 1.6rem;
          border-top: 1px solid rgba(255,255,255,0.05);
          background: rgba(212,175,55,0.01);
        }

        .acs-breakdown {
          display: flex;
          flex-direction: column;
          gap: 0;
          margin-bottom: 1rem;
        }

        .acs-breakdown-row {
          display: flex;
          justify-content: space-between;
          padding: 0.28rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.03);
        }

        .acs-breakdown-label {
          font-size: 0.56rem;
          letter-spacing: 0.16em;
          color: rgba(255,255,255,0.2);
          text-transform: uppercase;
        }

        .acs-breakdown-val {
          font-family: var(--serif);
          font-size: 0.85rem;
          color: rgba(255,255,255,0.28);
        }

        /* Total */
        .acs-total {
          padding: 1rem 0 1.2rem;
          border-top: 1px solid rgba(212,175,55,0.15);
        }

        .acs-total-label {
          font-size: 0.55rem;
          letter-spacing: 0.45em;
          color: rgba(255,255,255,0.15);
          text-transform: uppercase;
          margin-bottom: 0.4rem;
        }

        .acs-total-price {
          font-family: var(--serif);
          font-size: 2.2rem;
          font-weight: 300;
          line-height: 1;
          background: linear-gradient(90deg, #d4af37 0%, #f0cc5a 35%, #d4af37 60%, #a07820 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: acsShimmer 4s linear infinite;
          margin-bottom: 0.6rem;
        }

        @keyframes acsShimmer {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        .acs-total-notes {
          display: flex;
          gap: 0.5rem;
          font-size: 0.55rem;
          color: rgba(255,255,255,0.18);
          letter-spacing: 0.1em;
        }

        /* Acquire button */
        .acs-acquire-btn {
          position: relative;
          overflow: hidden;
          width: 100%;
          padding: 1rem 1.5rem;
          background: transparent;
          border: 1px solid rgba(212,175,55,0.45);
          color: var(--gold);
          font-family: var(--sans);
          font-size: 0.65rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
          margin-bottom: 0.6rem;
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
        }

        .acs-acquire-shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(212,175,55,0.12) 0%, rgba(212,175,55,0.04) 100%);
          transform: translateX(-100%);
          transition: transform 0.5s var(--ease);
        }
        .acs-acquire-btn:hover .acs-acquire-shine { transform: translateX(0); }
        .acs-acquire-btn:hover {
          border-color: rgba(212,175,55,0.85);
          box-shadow: 0 0 30px rgba(212,175,55,0.1);
        }

        .acs-acquire-text,
        .acs-acquire-arrow { position: relative; z-index: 1; }

        .acs-acquire-arrow {
          transition: transform 0.35s ease;
          font-size: 0.9rem;
        }
        .acs-acquire-btn:hover .acs-acquire-arrow { transform: translateX(4px); }

        /* Secondary button */
        .acs-secondary-btn {
          width: 100%;
          padding: 0.7rem;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.2);
          font-family: var(--sans);
          font-size: 0.58rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .acs-secondary-btn:hover {
          color: rgba(255,255,255,0.45);
          border-color: rgba(255,255,255,0.14);
        }

        /* ─────────────────────────────────────────────────
           TOAST
        ───────────────────────────────────────────────── */
        .acs-toast {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 9999;
          background: rgba(4,4,4,0.97);
          border: 1px solid rgba(212,175,55,0.45);
          padding: 1rem 1.8rem;
          display: flex;
          align-items: center;
          gap: 0.85rem;
          animation: acsToastIn 0.4s var(--ease);
          box-shadow: 0 20px 60px rgba(0,0,0,0.7);
          backdrop-filter: blur(12px);
        }

        @keyframes acsToastIn {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .acs-toast-icon {
          color: var(--gold);
          font-size: 0.5rem;
        }

        .acs-toast-text {
          font-family: var(--sans);
          font-size: 0.5rem;
          letter-spacing: 0.22em;
          color: var(--gold);
          text-transform: uppercase;
        }

        /* ─────────────────────────────────────────────────
           RESPONSIVE
        ───────────────────────────────────────────────── */
        @media (max-width: 1100px) {
          .acs-layout {
            grid-template-columns: 1fr;
          }
          .acs-image-stage {
            border-right: none;
            border-bottom: 1px solid rgba(212,175,55,0.08);
          }
          .acs-image-frame {
            height: 420px;
          }
          .acs-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 680px) {
          .acs-grid {
            grid-template-columns: 1fr;
          }
          .acs-image-frame { height: 320px; }
          .acs-cfg-tabs { flex-wrap: wrap; }
          .acs-cfg-tab { flex: 0 0 50%; border-bottom: none; border-right: 1px solid rgba(255,255,255,0.04); }
        }
      `}</style>
    </Section>
  );
}
