import { useState, useEffect, useCallback, useRef } from "react";

const API = "http://localhost:3000/api";
const GOLD = "#d4af37";

const F = {
  serif: "'Cormorant Garamond', serif",
  sans: "'Montserrat', sans-serif",
  tenor: "'Tenor Sans', sans-serif",
};

const fmt = (n) => "€" + Number(n).toLocaleString("de-DE");

const BASE_PRICES = {
  "bugatti-chiron": 4000000, "ferrari-roma": 300000, "pagani-huayra": 3000000,
  "rolls-royce-phantom": 450000, "toyota-supra-mk5": 400000, "koenigsegg-regera": 4000000,
  "lamborghini-veneno": 9000000, "aston-martin-valkyrie": 2500000, "hennessey-venom-f5": 1850000,
};

const CONFIG = {
  colors: [
    { n: "Noir Obsidian", p: 0 }, { n: "Arctic White", p: 12000 },
    { n: "Racing Red", p: 8000 }, { n: "Midnight Blue", p: 8000 },
    { n: "Gold Edition", p: 25000 }, { n: "Matte Carbon", p: 18000 },
  ],
  interiors: [
    { n: "Black Leather", p: 0 }, { n: "Cream Nappa", p: 15000 },
    { n: "Red Alcantara", p: 22000 }, { n: "Carbon Fiber", p: 35000 },
  ],
  performance: [
    { n: "Standard", p: 0 }, { n: "Sport Package", p: 45000 },
    { n: "Track Edition", p: 85000 }, { n: "Ultimate", p: 140000 },
  ],
  wheels: [
    { n: "Standard Alloy", p: 0 }, { n: "Forged Carbon", p: 18000 },
    { n: "Titanium Sport", p: 28000 }, { n: "Signature Edition", p: 42000 },
  ],
};

const TABS = [
  { key: "fleet", label: "Fleet", icon: "◈" },
  { key: "orders", label: "My Orders", icon: "◉" },
  { key: "admin", label: "Inventory", icon: "◆" },
];

// ─── TOAST ───────────────────────────────────────────────────────────────────
function Toast({ msg, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div style={{
      position: "fixed", top: "2rem", right: "2rem", zIndex: 9999,
      background: type === "success" ? "rgba(0,0,0,0.95)" : "rgba(0,0,0,0.95)",
      border: `1px solid ${type === "success" ? "rgba(212,175,55,0.6)" : "rgba(200,60,60,0.5)"}`,
      padding: "1.2rem 1.8rem", maxWidth: "360px",
      boxShadow: `0 20px 60px rgba(0,0,0,0.8), 0 0 0 1px ${type === "success" ? "rgba(212,175,55,0.1)" : "rgba(200,60,60,0.1)"}`,
      animation: "pmToastIn 0.5s cubic-bezier(0.23,1,0.32,1)",
    }}>
      <div style={{
        fontFamily: F.sans, fontSize: "0.52rem", letterSpacing: "0.25em",
        color: type === "success" ? GOLD : "#e88", textTransform: "uppercase",
      }}>{msg}</div>
    </div>
  );
}

// ─── PURCHASE MODAL ───────────────────────────────────────────────────────────
function PurchaseModal({ vehicle, onConfirm, onClose }) {
  const [color, setColor] = useState(0);
  const [inter, setInter] = useState(0);
  const [perf, setPerf] = useState(0);
  const [wheel, setWheel] = useState(0);
  const [loading, setLoading] = useState(false);

  const base = BASE_PRICES[vehicle.slug] || 0;
  const total = base + CONFIG.colors[color].p + CONFIG.interiors[inter].p + CONFIG.performance[perf].p + CONFIG.wheels[wheel].p;

  const handleBuy = async () => {
    setLoading(true);
    await onConfirm({
      vehicle_slug: vehicle.slug, vehicle_model: vehicle.model,
      price: vehicle.valuation, color: CONFIG.colors[color].n,
      interior: CONFIG.interiors[inter].n, performance: CONFIG.performance[perf].n,
      wheels: CONFIG.wheels[wheel].n, total_price: total,
    });
    setLoading(false);
  };

  const Section = ({ label, items, active, setActive }) => (
    <div style={{ marginBottom: "2rem" }}>
      <div style={{ fontFamily: F.sans, fontSize: "0.45rem", letterSpacing: "0.45em", color: "rgba(212,175,55,0.5)", textTransform: "uppercase", marginBottom: "0.9rem" }}>{label}</div>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {items.map((o, i) => (
          <button key={i} onClick={() => setActive(i)} style={{
            background: active === i ? "rgba(212,175,55,0.1)" : "transparent",
            border: active === i ? "1px solid rgba(212,175,55,0.7)" : "1px solid rgba(255,255,255,0.07)",
            color: active === i ? GOLD : "rgba(255,255,255,0.35)",
            padding: "0.55rem 1rem", fontFamily: F.sans, fontSize: "0.52rem",
            letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
            transition: "all 0.25s ease",
          }}>
            {o.n}{o.p > 0 ? `  +${fmt(o.p)}` : ""}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", backdropFilter: "blur(8px)" }}>
      <div style={{ background: "#060606", border: "1px solid rgba(212,175,55,0.2)", width: "100%", maxWidth: "720px", maxHeight: "90vh", overflowY: "auto", animation: "pmModalIn 0.5s cubic-bezier(0.23,1,0.32,1)" }}>
        {/* Header */}
        <div style={{ padding: "2.5rem 3rem", borderBottom: "1px solid rgba(212,175,55,0.1)", display: "flex", justifyContent: "space-between", alignItems: "flex-start", background: "radial-gradient(ellipse at top left, rgba(212,175,55,0.04), transparent)" }}>
          <div>
            <div style={{ fontFamily: F.sans, fontSize: "0.42rem", letterSpacing: "0.5em", color: "rgba(212,175,55,0.5)", marginBottom: "0.6rem", textTransform: "uppercase" }}>Configure & Acquire</div>
            <div style={{ fontFamily: F.serif, fontSize: "2rem", color: "#fff", fontWeight: 300, letterSpacing: "0.05em" }}>{vehicle.model}</div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)", width: "36px", height: "36px", cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>×</button>
        </div>

        {/* Config */}
        <div style={{ padding: "2.5rem 3rem" }}>
          <Section label="Exterior Color" items={CONFIG.colors} active={color} setActive={setColor} />
          <Section label="Interior" items={CONFIG.interiors} active={inter} setActive={setInter} />
          <Section label="Performance" items={CONFIG.performance} active={perf} setActive={setPerf} />
          <Section label="Wheels & Kit" items={CONFIG.wheels} active={wheel} setActive={setWheel} />
        </div>

        {/* Footer */}
        <div style={{ padding: "2rem 3rem", borderTop: "1px solid rgba(212,175,55,0.1)", background: "rgba(212,175,55,0.02)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontFamily: F.sans, fontSize: "0.42rem", letterSpacing: "0.4em", color: "rgba(255,255,255,0.25)", marginBottom: "0.4rem", textTransform: "uppercase" }}>Total Configuration</div>
            <div style={{ fontFamily: F.serif, fontSize: "2.2rem", color: GOLD, fontWeight: 300 }}>{fmt(total)}</div>
          </div>
          <div style={{ display: "flex", gap: "0.8rem" }}>
            <button onClick={onClose} style={{ padding: "0.9rem 1.8rem", background: "none", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.3)", fontFamily: F.sans, fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}>Cancel</button>
            <button onClick={handleBuy} disabled={loading} style={{ padding: "0.9rem 2.4rem", background: loading ? "rgba(212,175,55,0.3)" : "rgba(212,175,55,0.15)", border: `1px solid ${loading ? "rgba(212,175,55,0.3)" : "rgba(212,175,55,0.7)"}`, color: loading ? "rgba(212,175,55,0.5)" : GOLD, fontFamily: F.sans, fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer" }}>
              {loading ? "Processing…" : "Confirm Acquisition →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── FLEET TAB ────────────────────────────────────────────────────────────────
function FleetTab({ vehicles, onBuy }) {
  return (
    <div>
      <p style={{ fontFamily: F.sans, fontSize: "0.48rem", letterSpacing: "0.4em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase", marginBottom: "2.5rem", textAlign: "center" }}>
        Select a vehicle to configure and acquire
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1px", background: "rgba(212,175,55,0.06)" }}>
        {vehicles.map((v, i) => {
          const stockNum = parseInt(v.stock) || 0;
          const soldOut = stockNum === 0;
          return (
            <div key={v.slug}
              style={{ background: "#060606", padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem", opacity: soldOut ? 0.4 : 1, cursor: soldOut ? "default" : "pointer", position: "relative", overflow: "hidden", transition: "background 0.3s ease" }}
              onMouseEnter={e => !soldOut && (e.currentTarget.style.background = "#0a0a0a")}
              onMouseLeave={e => (e.currentTarget.style.background = "#060606")}
            >
              {/* Lot number watermark */}
              <div style={{ position: "absolute", top: "1rem", right: "1.2rem", fontFamily: F.serif, fontSize: "3.5rem", color: "rgba(212,175,55,0.04)", lineHeight: 1, pointerEvents: "none" }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <div style={{ fontFamily: F.sans, fontSize: "0.42rem", letterSpacing: "0.35em", color: "rgba(212,175,55,0.5)", textTransform: "uppercase" }}>
                Lot {String(i + 1).padStart(2, "0")}
              </div>
              <div style={{ fontFamily: F.serif, fontSize: "1.5rem", color: "#e8e8e8", fontWeight: 300, lineHeight: 1.2 }}>{v.model}</div>
              <div style={{ width: "30px", height: "1px", background: "linear-gradient(to right, rgba(212,175,55,0.5), transparent)" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: F.tenor, fontSize: "1rem", color: GOLD }}>{v.valuation}</span>
                <span style={{ fontFamily: F.sans, fontSize: "0.45rem", letterSpacing: "0.2em", color: soldOut ? "rgba(255,255,255,0.2)" : "rgba(212,175,55,0.7)", border: `1px solid ${soldOut ? "rgba(255,255,255,0.08)" : "rgba(212,175,55,0.2)"}`, padding: "0.3rem 0.8rem" }}>
                  {soldOut ? "SOLD OUT" : v.stock}
                </span>
              </div>
              <button
                onClick={() => !soldOut && onBuy(v)}
                disabled={soldOut}
                style={{ marginTop: "0.5rem", padding: "0.85rem", background: "transparent", border: `1px solid ${soldOut ? "rgba(255,255,255,0.05)" : "rgba(212,175,55,0.25)"}`, color: soldOut ? "rgba(255,255,255,0.15)" : "rgba(212,175,55,0.8)", fontFamily: F.sans, fontSize: "0.48rem", letterSpacing: "0.25em", textTransform: "uppercase", cursor: soldOut ? "not-allowed" : "pointer", transition: "all 0.3s ease", position: "relative", overflow: "hidden" }}
                onMouseEnter={e => !soldOut && (e.currentTarget.style.background = "rgba(212,175,55,0.08)")}
                onMouseLeave={e => !soldOut && (e.currentTarget.style.background = "transparent")}
              >
                {soldOut ? "Unavailable" : "Configure & Acquire →"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── ORDERS TAB ───────────────────────────────────────────────────────────────
function OrdersTab({ orders, onCancel, loading }) {
  if (loading) return <div style={{ textAlign: "center", padding: "4rem", fontFamily: F.sans, fontSize: "0.5rem", letterSpacing: "0.4em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>Loading…</div>;
  if (orders.length === 0) return (
    <div style={{ textAlign: "center", padding: "5rem 2rem" }}>
      <div style={{ fontFamily: F.serif, fontSize: "4rem", color: "rgba(212,175,55,0.08)", marginBottom: "1.5rem" }}>◇</div>
      <div style={{ fontFamily: F.sans, fontSize: "0.5rem", letterSpacing: "0.4em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>No acquisitions on record</div>
    </div>
  );
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(212,175,55,0.06)" }}>
      {orders.map(o => (
        <div key={o.id} style={{ background: "#060606", padding: "2rem 2.5rem", display: "grid", gridTemplateColumns: "1fr auto", gap: "2rem", alignItems: "start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
              <span style={{ fontFamily: F.serif, fontSize: "1.4rem", color: "#e8e8e8", fontWeight: 300 }}>{o.vehicle_model}</span>
              <span style={{ fontFamily: F.sans, fontSize: "0.42rem", letterSpacing: "0.25em", color: "rgba(80,200,80,0.8)", border: "1px solid rgba(80,200,80,0.2)", padding: "0.2rem 0.7rem" }}>CONFIRMED</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "1rem", marginBottom: "1rem" }}>
              {[{ l: "Color", v: o.color }, { l: "Interior", v: o.interior }, { l: "Performance", v: o.performance }, { l: "Wheels", v: o.wheels }].map(({ l, v }) => v && (
                <div key={l}>
                  <div style={{ fontFamily: F.sans, fontSize: "0.4rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase", marginBottom: "4px" }}>{l}</div>
                  <div style={{ fontFamily: F.sans, fontSize: "0.62rem", color: "rgba(255,255,255,0.6)" }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ fontFamily: F.sans, fontSize: "0.45rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.15)" }}>
              {new Date(o.created_at).toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" })} · Order #{String(o.id).padStart(4, "0")}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: F.serif, fontSize: "1.8rem", color: GOLD, fontWeight: 300, marginBottom: "1rem" }}>{fmt(o.total_price)}</div>
            <button onClick={() => onCancel(o.id)} style={{ padding: "0.6rem 1.2rem", background: "transparent", border: "1px solid rgba(200,60,60,0.3)", color: "rgba(200,100,100,0.8)", fontFamily: F.sans, fontSize: "0.45rem", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s ease" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(200,60,60,0.08)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >Cancel Order</button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── ADMIN TAB ────────────────────────────────────────────────────────────────
function AdminTab({ vehicles, onStockChange }) {
  const [changes, setChanges] = useState({});
  const [saving, setSaving] = useState(false);
  const handleChange = (slug, val) => {
    const n = parseInt(val);
    if (!isNaN(n) && n >= 0) setChanges(prev => ({ ...prev, [slug]: n }));
  };
  const handleSave = async (slug) => {
    if (changes[slug] === undefined) return;
    setSaving(true);
    await onStockChange(slug, changes[slug]);
    setChanges(prev => { const c = { ...prev }; delete c[slug]; return c; });
    setSaving(false);
  };
  return (
    <div>
      <p style={{ fontFamily: F.sans, fontSize: "0.45rem", letterSpacing: "0.4em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase", marginBottom: "2rem" }}>Manage inventory stock levels</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(212,175,55,0.06)" }}>
        {vehicles.map(v => {
          const stockNum = parseInt(v.stock) || 0;
          const hasPending = changes[v.slug] !== undefined;
          return (
            <div key={v.slug} style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: "1.5rem", alignItems: "center", padding: "1.2rem 1.8rem", background: "#060606" }}>
              <div>
                <div style={{ fontFamily: F.serif, fontSize: "1.1rem", color: "#ccc", fontWeight: 300 }}>{v.model}</div>
                <div style={{ fontFamily: F.sans, fontSize: "0.45rem", color: stockNum === 0 ? "rgba(200,80,80,0.7)" : "rgba(80,200,80,0.7)", marginTop: "4px", letterSpacing: "0.2em" }}>
                  {stockNum === 0 ? "SOLD OUT" : `${stockNum} in stock`}
                </div>
              </div>
              <input type="number" min="0" max="99" defaultValue={stockNum}
                onChange={e => handleChange(v.slug, e.target.value)}
                style={{ width: "72px", padding: "0.6rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", color: "#ddd", fontFamily: F.sans, fontSize: "0.75rem", textAlign: "center", outline: "none" }} />
              <button onClick={() => handleSave(v.slug)} disabled={!hasPending || saving}
                style={{ padding: "0.6rem 1.4rem", background: hasPending ? "rgba(212,175,55,0.1)" : "transparent", border: `1px solid ${hasPending ? "rgba(212,175,55,0.5)" : "rgba(255,255,255,0.05)"}`, color: hasPending ? GOLD : "rgba(255,255,255,0.15)", fontFamily: F.sans, fontSize: "0.45rem", letterSpacing: "0.2em", textTransform: "uppercase", cursor: hasPending ? "pointer" : "not-allowed" }}>
                Save
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function PurchaseMenu() {
  const [tab, setTab] = useState("fleet");
  const [vehicles, setVehicles] = useState([]);
  const [orders, setOrders] = useState([]);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);
  const [loadOrders, setLoadOrders] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const notify = (msg, type = "success") => setToast({ msg, type });

  const fetchVehicles = useCallback(() => {
    fetch(`${API}/vehicles`).then(r => r.json()).then(setVehicles).catch(() => notify("Error loading vehicles", "error"));
  }, []);

  const fetchOrders = useCallback(() => {
    setLoadOrders(true);
    fetch(`${API}/orders`).then(r => r.json()).then(data => { setOrders(data); setLoadOrders(false); }).catch(() => { notify("Error loading orders", "error"); setLoadOrders(false); });
  }, []);

  useEffect(() => { fetchVehicles(); }, [fetchVehicles]);
  useEffect(() => { if (tab === "orders" || tab === "admin") fetchOrders(); }, [tab, fetchOrders]);

  const handlePurchase = async (orderData) => {
    try {
      const res = await fetch(`${API}/orders`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(orderData) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Purchase failed");
      notify(`Acquisition confirmed — ${orderData.vehicle_model}`);
      setModal(null); fetchVehicles(); if (tab === "orders") fetchOrders();
    } catch (err) { notify(err.message, "error"); }
  };

  const handleCancel = async (orderId) => {
    try {
      const res = await fetch(`${API}/orders/${orderId}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Cancel failed");
      notify("Order cancelled · Stock restored"); fetchOrders(); fetchVehicles();
    } catch (err) { notify(err.message, "error"); }
  };

  const handleStockChange = async (slug, newQty) => {
    const newStr = newQty === 1 ? "1 Unit Available" : `${newQty} Units Available`;
    try {
      const res = await fetch(`${API}/vehicles/${slug}/stock`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ stock: newStr }) });
      if (!res.ok) throw new Error("Stock update failed");
      notify("Stock updated"); fetchVehicles();
    } catch (err) { notify(err.message, "error"); }
  };

  return (
    <section ref={sectionRef} style={{ background: "#000", padding: "0 0 160px", fontFamily: F.sans, overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Tenor+Sans&family=Montserrat:wght@200;300;400;500&display=swap');
        @keyframes pmToastIn { from { opacity:0; transform:translateX(24px); } to { opacity:1; transform:none; } }
        @keyframes pmModalIn { from { opacity:0; transform:translateY(32px) scale(0.97); } to { opacity:1; transform:none; } }
        @keyframes pmHeroIn { from { opacity:0; transform:translateY(40px); } to { opacity:1; transform:none; } }
        @keyframes pmLineIn { from { width:0; } to { width:80px; } }

        .pm-hero {
          padding: 120px 80px 80px;
          text-align: center;
          background: radial-gradient(ellipse at top, rgba(212,175,55,0.04) 0%, transparent 60%);
          position: relative;
          overflow: hidden;
        }
        .pm-hero::before {
          content: '';
          position: absolute; top: 0; left: 50%; transform: translateX(-50%);
          width: 1px; height: 80px;
          background: linear-gradient(to bottom, transparent, rgba(212,175,55,0.4));
        }
        .pm-hero-eyebrow {
          fontFamily: Montserrat sans-serif;
          font-size: 0.45rem; letter-spacing: 0.6em;
          color: rgba(212,175,55,0.5); text-transform: uppercase;
          margin-bottom: 1.5rem;
          opacity: 0; animation: pmHeroIn 1s ease 0.2s forwards;
        }
        .pm-hero-title {
          font-size: clamp(3rem, 6vw, 5.5rem);
          font-weight: 300; letter-spacing: 0.1em; color: #fff;
          line-height: 1; margin-bottom: 1.5rem;
          opacity: 0; animation: pmHeroIn 1.2s ease 0.4s forwards;
        }
        .pm-hero-rule {
          height: 1px; width: 0;
          background: linear-gradient(to right, transparent, ${GOLD}, transparent);
          margin: 0 auto;
          animation: pmLineIn 1.4s cubic-bezier(0.23,1,0.32,1) 0.8s forwards;
        }

        /* TABS */
        .pm-tabs {
          display: flex; justify-content: center;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          margin-bottom: 4rem;
          position: relative;
        }
        .pm-tab {
          position: relative; padding: 1.2rem 3rem;
          background: none; border: none; border-bottom: 2px solid transparent;
          font-family: Montserrat sans-serif;
          font-size: 0.5rem; letter-spacing: 0.3em; text-transform: uppercase;
          cursor: pointer; display: flex; align-items: center; gap: 0.6rem;
          transition: color 0.3s ease, border-color 0.3s ease;
        }
        .pm-tab.active {
          color: ${GOLD} !important;
          border-bottom-color: ${GOLD} !important;
          background: rgba(212,175,55,0.03) !important;
        }
        .pm-tab:not(.active) { color: rgba(255,255,255,0.25) !important; }
        .pm-tab:hover:not(.active) { color: rgba(255,255,255,0.45) !important; }

        .pm-badge {
          background: ${GOLD}; color: #000;
          border-radius: 50%; width: 16px; height: 16px;
          font-size: 0.45rem; display: flex; align-items: center;
          justify-content: center; font-weight: 600;
        }

        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { opacity: 1; }
      `}</style>

      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      {modal && <PurchaseModal vehicle={modal} onConfirm={handlePurchase} onClose={() => setModal(null)} />}

      {/* HERO */}
      <div className="pm-hero" style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s ease" }}>
        <div className="pm-hero-eyebrow" style={{ fontFamily: F.sans }}>Francis Luxor Motors</div>
        <h2 className="pm-hero-title" style={{ fontFamily: F.serif }}>Acquisition Portal</h2>
        <div className="pm-hero-rule" />
      </div>

      {/* TABS */}
      <div className="pm-tabs">
        {TABS.map(t => {
          const active = tab === t.key;
          return (
            <button key={t.key} className={`pm-tab ${active ? "active" : ""}`} onClick={() => setTab(t.key)}>
              <span style={{ fontSize: "0.7rem" }}>{t.icon}</span>
              <span style={{ fontFamily: F.sans }}>{t.label}</span>
              {t.key === "orders" && orders.length > 0 && <span className="pm-badge">{orders.length}</span>}
            </button>
          );
        })}
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "0 60px" }}>
        {tab === "fleet" && <FleetTab vehicles={vehicles} onBuy={setModal} />}
        {tab === "orders" && <OrdersTab orders={orders} onCancel={handleCancel} loading={loadOrders} />}
        {tab === "admin" && <AdminTab vehicles={vehicles} onStockChange={handleStockChange} />}
      </div>
    </section>
  );
}
