import { useState } from "react";
import "./AdminPanel.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "luxor2024";

function slugify(str) {
  return str.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

const FUEL_OPTIONS   = ["Gasoline", "Hybrid", "Electric", "Diesel", "Hydrogen"];
const TRANS_OPTIONS  = ["Automatic", "Manual", "Semi-Automatic", "Dual-Clutch", "CVT"];
const CAT_OPTIONS    = ["Hypercar", "Supercar", "Grand Tourer", "Luxury Sedan", "SUV", "Roadster", "Coupe"];
const STATUS_OPTIONS = ["Available", "Reserved", "Sold"];

const EMPTY = {
  model: "", slug: "", valuation: "", stock: "3 Units Available",
  description: "", category: "Hypercar", hp: "", top: "", accent: "#D4AF37",
  engine_desc: "", fuel: "Gasoline", transmission: "Automatic",
  year: new Date().getFullYear(), km: "0", color: "", status: "Available",
  image_url: "",
};

export default function AdminPanel({ vehicles = [], onRefresh, notify }) {
  const [authed, setAuthed]  = useState(false);
  const [pw, setPw]          = useState("");
  const [pwErr, setPwErr]    = useState(false);
  const [form, setForm]      = useState(EMPTY);
  const [tab, setTab]        = useState("add");
  const [submitting, setSub] = useState(false);
  const [editSlug, setEdit]  = useState(null);
  const [deleteConf, setDel] = useState(null);

  function handleLogin(e) {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) { setAuthed(true); setPwErr(false); }
    else { setPwErr(true); setPw(""); }
  }

  function set(k, v) {
    setForm(f => {
      const next = { ...f, [k]: v };
      if (k === "model") next.slug = slugify(v);
      return next;
    });
  }

  function loadForEdit(v) {
    setForm({
      model: v.model || "", slug: v.slug || "", valuation: v.valuation || "",
      stock: v.stock || "", description: v.description || "",
      category: v.category || "Hypercar", hp: v.hp || "", top: v.top || "",
      accent: v.accent || "#D4AF37", engine_desc: v.engine_desc || "",
      fuel: v.fuel || "Gasoline", transmission: v.transmission || "Automatic",
      year: v.year || new Date().getFullYear(), km: v.km || "0",
      color: v.color || "", status: v.status || "Available",
      image_url: v.image_url || "",
    });
    setEdit(v.slug);
    setTab("add");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.model || !form.slug || !form.valuation) {
      notify?.("Fill in model, slug, and valuation.", "error"); return;
    }
    setSub(true);
    const payload = {
      slug: form.slug, model: form.model, valuation: form.valuation,
      stock: form.stock, description: form.description, category: form.category,
      hp: form.hp, top: form.top, accent: form.accent, engine_desc: form.engine_desc,
      image_url: form.image_url,
    };
    try {
      const url    = editSlug ? `${API}/api/vehicles/${editSlug}` : `${API}/api/vehicles`;
      const method = editSlug ? "PUT" : "POST";
      const res    = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || "Server error"); }
      notify?.(editSlug ? "Vehicle updated successfully." : "Vehicle added to the fleet.", "success");
      setForm(EMPTY); setEdit(null); onRefresh?.();
    } catch (err) { notify?.(err.message, "error"); }
    finally { setSub(false); }
  }

  async function handleDelete(slug) {
    try {
      const res = await fetch(`${API}/api/vehicles/${slug}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      notify?.("Vehicle removed from fleet.", "success");
      onRefresh?.(); setDel(null);
    } catch (err) { notify?.(err.message, "error"); }
  }

  /* ── CINEMATIC LOGIN GATE ── */
  if (!authed) return (
    <section className="adm-gate">
      {/* Video background */}
      <video
        className="adm-gate__video"
        autoPlay muted loop playsInline
        src="/admin-bg.mp4"
      />

      {/* Scanlines */}
      <div className="adm-gate__scanlines" />

      {/* Corner marks */}
      <div className="adm-gate__corners" />

      {/* Panel */}
      <div className="adm-gate__inner">
        <div className="adm-gate__sigil-wrap">
          <span className="adm-gate__sigil-line" />
          <span className="adm-gate__sigil">✦</span>
          <span className="adm-gate__sigil-line" />
        </div>

        <p className="adm-gate__eyebrow">Francis Luxuria Motors</p>
        <h2 className="adm-gate__title">Restricted Access</h2>
        <p className="adm-gate__sub">Authorized Personnel Only</p>
        <div className="adm-gate__rule" />

        <form className="adm-gate__form" onSubmit={handleLogin}>
          <div className={`adm-gate__field ${pwErr ? "adm-gate__field--error" : ""}`}>
            <label className="adm-gate__field-label">Access Code</label>
            <input
              type="password"
              value={pw}
              onChange={e => { setPw(e.target.value); setPwErr(false); }}
              placeholder="• • • • • • • • • •"
              className="adm-gate__input"
              autoComplete="current-password"
            />
            {pwErr && <p className="adm-gate__err">✕ Invalid credentials. Access denied.</p>}
          </div>
          <button type="submit" className="adm-gate__btn">
            <span>Authenticate</span>
          </button>
        </form>

        <p className="adm-gate__stamp">Francis Luxuria · Private Fleet Management System</p>
      </div>
    </section>
  );

  /* ── MAIN PANEL ── */
  return (
    <section className="adm">
      <div className="adm__header">
        <div className="adm__header-left">
          <span className="adm__badge">Admin Portal</span>
          <h2 className="adm__title">Fleet Acquisition Console</h2>
          <p className="adm__sub">Manage the exclusive Francis Luxuria inventory</p>
        </div>
        <div className="adm__tabs">
          <button className={`adm__tab ${tab==="add" ? "adm__tab--active" : ""}`}
            onClick={() => { setTab("add"); setEdit(null); setForm(EMPTY); }}>
            {editSlug ? "✎ Edit Vehicle" : "+ Add Vehicle"}
          </button>
          <button className={`adm__tab ${tab==="manage" ? "adm__tab--active" : ""}`}
            onClick={() => setTab("manage")}>
            ≡ Manage Fleet ({vehicles.length})
          </button>
        </div>
      </div>

      {tab === "add" && (
        <form className="adm__form" onSubmit={handleSubmit}>
          <div className="adm__section-label">Identity</div>
          <div className="adm__grid adm__grid--3">
            <Field label="Brand & Model *" value={form.model} onChange={v => set("model", v)} placeholder="e.g. Bugatti Chiron Super Sport" />
            <Field label="URL Slug *" value={form.slug} onChange={v => set("slug", v)} placeholder="auto-generated" />
            <Field label="Category" type="select" value={form.category} onChange={v => set("category", v)} options={CAT_OPTIONS} />
          </div>

          <div className="adm__section-label">Valuation & Stock</div>
          <div className="adm__grid adm__grid--3">
            <Field label="Price / Valuation *" value={form.valuation} onChange={v => set("valuation", v)} placeholder="$3,200,000" />
            <Field label="Stock Label" value={form.stock} onChange={v => set("stock", v)} placeholder="3 Units Available" />
            <Field label="Status" type="select" value={form.status} onChange={v => set("status", v)} options={STATUS_OPTIONS} />
          </div>

          <div className="adm__section-label">Performance</div>
          <div className="adm__grid adm__grid--4">
            <Field label="Horsepower" value={form.hp} onChange={v => set("hp", v)} placeholder="1,500 HP" />
            <Field label="Top Speed" value={form.top} onChange={v => set("top", v)} placeholder="304 mph" />
            <Field label="Fuel Type" type="select" value={form.fuel} onChange={v => set("fuel", v)} options={FUEL_OPTIONS} />
            <Field label="Transmission" type="select" value={form.transmission} onChange={v => set("transmission", v)} options={TRANS_OPTIONS} />
          </div>

          <div className="adm__grid adm__grid--3">
            <Field label="Year" type="number" value={form.year} onChange={v => set("year", v)} placeholder="2024" />
            <Field label="Kilometers" value={form.km} onChange={v => set("km", v)} placeholder="0" />
            <Field label="Accent Color (hex)" value={form.accent} onChange={v => set("accent", v)} placeholder="#D4AF37"
              extra={<span className="adm__color-dot" style={{ background: form.accent }} />} />
          </div>

          <div className="adm__section-label">Image</div>
          <div className="adm__grid adm__grid--1">
            <Field label="Image URL — direct link from Google Images, Unsplash, etc."
              value={form.image_url} onChange={v => set("image_url", v)}
              placeholder="https://images.unsplash.com/photo-..." />
          </div>

          <div className="adm__section-label">Description</div>
          <div className="adm__grid adm__grid--1">
            <Field label="Vehicle Description" type="textarea" value={form.description} onChange={v => set("description", v)}
              placeholder="An engineering tour de force that redefines the boundaries of automotive excellence..." rows={3} />
            <Field label="Engine Description" type="textarea" value={form.engine_desc} onChange={v => set("engine_desc", v)}
              placeholder="8.0-litre quad-turbocharged W16 producing..." rows={3} />
          </div>

          <div className="adm__actions">
            {editSlug && (
              <button type="button" className="adm__btn adm__btn--ghost"
                onClick={() => { setEdit(null); setForm(EMPTY); }}>Cancel Edit</button>
            )}
            <button type="submit" className="adm__btn adm__btn--primary" disabled={submitting}>
              {submitting ? "Processing..." : editSlug ? "Update Vehicle" : "Add to Fleet"}
            </button>
          </div>
        </form>
      )}

      {tab === "manage" && (
        <div className="adm__manage">
          {vehicles.length === 0 ? (
            <div className="adm__empty">No vehicles in inventory.</div>
          ) : (
            <div className="adm__table-wrap">
              <table className="adm__table">
                <thead>
                  <tr>
                    <th>Model</th><th>Category</th><th>Valuation</th>
                    <th>Stock</th><th>HP</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicles.map(v => (
                    <tr key={v.slug} className="adm__row">
                      <td className="adm__model">{v.model}</td>
                      <td><span className="adm__cat">{v.category}</span></td>
                      <td className="adm__price">{v.valuation}</td>
                      <td>{v.stock}</td>
                      <td>{v.hp || "—"}</td>
                      <td className="adm__row-actions">
                        <button className="adm__act adm__act--edit" onClick={() => loadForEdit(v)}>Edit</button>
                        {deleteConf === v.slug ? (
                          <>
                            <button className="adm__act adm__act--confirm" onClick={() => handleDelete(v.slug)}>Confirm</button>
                            <button className="adm__act adm__act--cancel" onClick={() => setDel(null)}>Cancel</button>
                          </>
                        ) : (
                          <button className="adm__act adm__act--del" onClick={() => setDel(v.slug)}>Delete</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function Field({ label, value, onChange, type = "text", placeholder, options, rows = 4, extra }) {
  return (
    <div className="adm__field">
      <label className="adm__label">{label}</label>
      <div className="adm__input-wrap">
        {type === "select" ? (
          <select className="adm__input" value={value} onChange={e => onChange(e.target.value)}>
            {options.map(o => <option key={o}>{o}</option>)}
          </select>
        ) : type === "textarea" ? (
          <textarea className="adm__input" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows} />
        ) : (
          <input className="adm__input" type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
        )}
        {extra}
      </div>
    </div>
  );
}
