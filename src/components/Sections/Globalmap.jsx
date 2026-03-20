/**
 * GlobalMap.jsx — Francis Luxor Motors
 * 
 * SETUP (ya hecho):
 *   npm install @react-google-maps/api
 *
 * API KEY — abre .env y añade esta línea:
 *   VITE_GOOGLE_MAPS_API_KEY=TU_KEY_AQUI
 *
 * Obtén tu key gratis en: console.cloud.google.com
 *   → APIs & Services → Enable: "Maps JavaScript API"
 *   → Credentials → Create API Key
 */

import { useState, useCallback, useRef, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Polyline,
  OverlayView,
} from "@react-google-maps/api";

/* ══════════════════════════════════════
   DARK LUXURY MAP STYLE — Obsidian Theme
   ══════════════════════════════════════ */
const DARK_STYLE = [
  { elementType: "geometry",                stylers: [{ color: "#080808" }] },
  { elementType: "labels",                  stylers: [{ visibility: "off" }] },
  { featureType: "administrative.country",  elementType: "geometry.stroke", stylers: [{ color: "#1e1e1e" }, { weight: 0.8 }] },
  { featureType: "administrative.province", elementType: "geometry.stroke", stylers: [{ visibility: "off" }] },
  { featureType: "water",                   elementType: "geometry",        stylers: [{ color: "#030303" }] },
  { featureType: "landscape",               elementType: "geometry",        stylers: [{ color: "#0a0a0a" }] },
  { featureType: "poi",                     stylers: [{ visibility: "off" }] },
  { featureType: "road",                    stylers: [{ visibility: "off" }] },
  { featureType: "transit",                 stylers: [{ visibility: "off" }] },
  { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#2a2416" }] },
];

/* ══════════════════════════════════════
   HUB DATA — 7 global hubs
   ══════════════════════════════════════ */
const HUBS = [
  { id: "monaco",      name: "Monaco",      sub: "European Flagship",    lat: 43.7384, lng: 7.4246,    v: 12 },
  { id: "london",      name: "London",      sub: "North Atlantic Gate",  lat: 51.5074, lng: -0.1278,   v: 18 },
  { id: "dubai",       name: "Dubai",       sub: "Middle East & Asia",   lat: 25.2048, lng: 55.2708,   v: 24 },
  { id: "miami",       name: "Miami",       sub: "Americas HQ",          lat: 25.7617, lng: -80.1918,  v: 15 },
  { id: "tokyo",       name: "Tokyo",       sub: "Asia Pacific Centre",  lat: 35.6762, lng: 139.6503,  v: 9  },
  { id: "singapore",   name: "Singapore",   sub: "Southeast Asia Hub",   lat: 1.3521,  lng: 103.8198,  v: 7  },
  { id: "los-angeles", name: "Los Angeles", sub: "West Coast Americas",  lat: 34.0522, lng: -118.2437, v: 11 },
];

/* Route pairs — which hubs connect */
const ROUTES = [
  ["monaco",    "london"],
  ["monaco",    "dubai"],
  ["london",    "miami"],
  ["london",    "los-angeles"],
  ["dubai",     "singapore"],
  ["dubai",     "tokyo"],
  ["miami",     "los-angeles"],
  ["singapore", "tokyo"],
  ["monaco",    "singapore"],
  ["los-angeles","tokyo"],
];

const G = "#D4AF37";
const MAP_CENTER = { lat: 22, lng: 18 };

/* ══════════════════════════════════════
   ANIMATED ARC ROUTE
   Draws a great-circle arc progressively
   ══════════════════════════════════════ */
function ArcRoute({ from, to, highlighted, delay }) {
  const [progress, setProgress] = useState(0);
  const raf = useRef(null);
  const t0  = useRef(null);
  const DUR = 2800 + delay;

  useEffect(() => {
    const tick = (ts) => {
      if (!t0.current) t0.current = ts;
      const p = Math.min((ts - t0.current) / DUR, 1);
      setProgress(p);
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    const id = setTimeout(() => { raf.current = requestAnimationFrame(tick); }, delay);
    return () => { clearTimeout(id); if (raf.current) cancelAnimationFrame(raf.current); };
  }, [DUR, delay]);

  const path = [];
  const steps = 64;
  const drawn = Math.floor(steps * progress);
  for (let i = 0; i <= drawn; i++) {
    const t   = i / steps;
    const lat = from.lat + (to.lat - from.lat) * t;
    const lng = from.lng + (to.lng - from.lng) * t;
    const arc = Math.sin(Math.PI * t) * 9;
    path.push({ lat: lat + arc * 0.28, lng });
  }

  return (
    <Polyline
      path={path}
      options={{
        strokeColor:   highlighted ? `rgba(212,175,55,0.9)` : `rgba(212,175,55,0.22)`,
        strokeWeight:  highlighted ? 1.6 : 0.8,
        strokeOpacity: 1,
        geodesic:      false,
        icons: [{
          icon: { path: "M 0,-1 0,1", strokeOpacity: 1, scale: highlighted ? 3 : 2 },
          offset: "0",
          repeat: highlighted ? "12px" : "18px",
        }],
      }}
    />
  );
}

/* ══════════════════════════════════════
   HUB MARKER — custom overlay with pulse
   ══════════════════════════════════════ */
function HubMarker({ hub, selected, onSelect }) {
  const [beat, setBeat] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setBeat(b => !b), 1800 + Math.random() * 600);
    return () => clearInterval(id);
  }, []);

  const active = selected === hub.id;

  return (
    <OverlayView
      position={{ lat: hub.lat, lng: hub.lng }}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <div
        onClick={() => onSelect(active ? null : hub.id)}
        style={{ position: "relative", transform: "translate(-50%,-50%)", cursor: "pointer", userSelect: "none" }}
      >
        {/* Outer pulse */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: active ? 48 : (beat ? 36 : 28),
          height: active ? 48 : (beat ? 36 : 28),
          borderRadius: "50%",
          border: `1px solid rgba(212,175,55,${active ? 0.7 : beat ? 0.45 : 0.18})`,
          transition: "all 1.4s ease",
          pointerEvents: "none",
        }} />
        {/* Mid ring */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: active ? 28 : 18,
          height: active ? 28 : 18,
          borderRadius: "50%",
          border: `1px solid rgba(212,175,55,${active ? 0.5 : 0.3})`,
          transition: "all 0.5s ease",
          pointerEvents: "none",
        }} />
        {/* Core */}
        <div style={{
          width:        active ? 10 : 6,
          height:       active ? 10 : 6,
          borderRadius: "50%",
          background:   active ? G : "rgba(212,175,55,0.85)",
          boxShadow:    active
            ? `0 0 14px ${G}, 0 0 28px rgba(212,175,55,0.4)`
            : `0 0 5px rgba(212,175,55,0.4)`,
          transition: "all 0.4s ease",
        }} />
        {/* Label */}
        <div style={{
          position:   "absolute",
          top:        "calc(50% + 13px)",
          left:       "50%",
          transform:  "translateX(-50%)",
          whiteSpace: "nowrap",
          fontFamily: "'Montserrat', sans-serif",
          fontSize:   "7.5px",
          fontWeight: active ? 500 : 300,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color:      active ? G : "rgba(212,175,55,0.6)",
          textShadow: "0 1px 6px rgba(0,0,0,1)",
          transition: "all 0.3s ease",
          pointerEvents: "none",
        }}>
          {hub.name}
        </div>
      </div>
    </OverlayView>
  );
}

/* ══════════════════════════════════════
   INFO PANEL — appears on hub click
   ══════════════════════════════════════ */
function InfoPanel({ hub, onClose }) {
  if (!hub) return null;
  return (
    <div style={{
      position:       "absolute",
      bottom:         "1.4rem",
      left:           "1.4rem",
      zIndex:         20,
      background:     "rgba(4,4,4,0.97)",
      border:         "1px solid rgba(212,175,55,0.35)",
      padding:        "1.3rem 1.6rem",
      minWidth:       "210px",
      backdropFilter: "blur(12px)",
      animation:      "ipIn 0.35s cubic-bezier(0.22,1,0.36,1)",
    }}>
      <style>{`@keyframes ipIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`}</style>

      {/* Close */}
      <button onClick={onClose} style={{
        position: "absolute", top: "0.5rem", right: "0.6rem",
        background: "none", border: "none",
        color: "rgba(255,255,255,0.28)", fontSize: "1rem",
        cursor: "pointer", lineHeight: 1, padding: "0.2rem",
      }}>×</button>

      {/* Region */}
      <div style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.38rem",
        letterSpacing:"0.42em", color:"rgba(212,175,55,0.45)",
        textTransform:"uppercase", marginBottom:"0.35rem" }}>
        Active Hub
      </div>

      {/* City name */}
      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.6rem",
        fontWeight:300, color:"#f0ece4", letterSpacing:"0.04em",
        marginBottom:"0.2rem" }}>
        {hub.name}
      </div>

      {/* Sub */}
      <div style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.42rem",
        letterSpacing:"0.18em", color:"rgba(255,255,255,0.28)",
        marginBottom:"0.9rem" }}>
        {hub.sub}
      </div>

      {/* Gold rule */}
      <div style={{ width:36, height:1,
        background:"linear-gradient(to right,#D4AF37,transparent)",
        marginBottom:"0.9rem" }} />

      {/* Vehicles */}
      <div style={{ display:"flex", alignItems:"baseline", gap:"0.5rem" }}>
        <span style={{ fontFamily:"'Cormorant Garamond',serif",
          fontSize:"2.2rem", fontWeight:200, color:G, lineHeight:1 }}>
          {hub.v}
        </span>
        <span style={{ fontFamily:"'Montserrat',sans-serif",
          fontSize:"0.38rem", letterSpacing:"0.32em",
          color:"rgba(255,255,255,0.22)", textTransform:"uppercase" }}>
          Available
        </span>
      </div>

      {/* Status */}
      <div style={{ display:"flex", alignItems:"center", gap:"0.45rem",
        marginTop:"0.75rem", fontFamily:"'Montserrat',sans-serif",
        fontSize:"0.38rem", letterSpacing:"0.22em",
        color:"rgba(80,200,80,0.65)", textTransform:"uppercase" }}>
        <span style={{
          display:"inline-block", width:5, height:5,
          borderRadius:"50%", background:"rgba(80,200,80,0.8)",
          boxShadow:"0 0 5px rgba(80,200,80,0.5)",
          animation:"hubPulse 1.5s ease-in-out infinite",
        }} />
        Operational
        <style>{`@keyframes hubPulse{0%,100%{opacity:1}50%{opacity:.3}}`}</style>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN EXPORT
   ══════════════════════════════════════ */
export default function GlobalMap({ height = "520px" }) {
  const [sel, setSel]         = useState(null);
  const [ready, setReady]     = useState(false);

  const apiKey = (typeof import.meta !== "undefined")
    ? (import.meta.env?.VITE_GOOGLE_MAPS_API_KEY || "")
    : "";

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey:           apiKey,
    preventGoogleFontsLoading:  true,
  });

  const onLoad = useCallback(() => setReady(true), []);
  const selHub = HUBS.find(h => h.id === sel) || null;

  const mapOpts = {
    zoom:             2.3,
    center:           MAP_CENTER,
    styles:           DARK_STYLE,
    disableDefaultUI: true,
    scrollwheel:      false,
    draggable:        true,
    gestureHandling:  "cooperative",
    minZoom:          1.5,
    maxZoom:          8,
    backgroundColor:  "#080808",
  };

  /* ── WRAPPER ── */
  const wrap = {
    position:   "relative",
    width:      "100%",
    height,
    background: "#080808",
    overflow:   "hidden",
  };

  /* ── FALLBACK ── */
  if (loadError) return (
    <div style={wrap}>
      <div style={centerStyle}>
        <div style={labelStyle}>Mapa no disponible — verifica tu API Key en .env</div>
      </div>
    </div>
  );

  if (!isLoaded) return (
    <div style={wrap}>
      <div style={centerStyle}>
        <div style={{ width:60, height:1, background:"rgba(212,175,55,0.15)", overflow:"hidden", position:"relative" }}>
          <div style={{ position:"absolute", inset:0,
            background:"linear-gradient(90deg,transparent,#D4AF37,transparent)",
            animation:"sweep 1.3s ease-in-out infinite" }} />
        </div>
        <div style={labelStyle}>Connecting global network…</div>
        <style>{`@keyframes sweep{from{transform:translateX(-100%)}to{transform:translateX(100%)}}`}</style>
      </div>
    </div>
  );

  return (
    <div style={wrap}>
      {/* Top-left header */}
      <div style={{
        position:"absolute", top:"1.3rem", left:"1.5rem",
        zIndex:10, pointerEvents:"none",
        display:"flex", flexDirection:"column", gap:"0.25rem",
      }}>
        <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.38rem",
          letterSpacing:"0.48em", color:"rgba(212,175,55,0.5)",
          textTransform:"uppercase" }}>
          Global Logistics Network
        </span>
        <span style={{ fontFamily:"'Cormorant Garamond',serif",
          fontSize:"0.78rem", fontWeight:300, letterSpacing:"0.06em",
          color:"rgba(255,255,255,0.22)" }}>
          {HUBS.length} Active Hubs · {ROUTES.length} Live Routes
        </span>
      </div>

      {/* Map */}
      <GoogleMap
        mapContainerStyle={{ width:"100%", height:"100%" }}
        options={mapOpts}
        onLoad={onLoad}
      >
        {ready && (
          <>
            {ROUTES.map(([aId, bId], i) => {
              const a = HUBS.find(h => h.id === aId);
              const b = HUBS.find(h => h.id === bId);
              if (!a || !b) return null;
              const hl = sel && (aId === sel || bId === sel);
              return (
                <ArcRoute
                  key={`${aId}-${bId}`}
                  from={{ lat: a.lat, lng: a.lng }}
                  to={{ lat: b.lat, lng: b.lng }}
                  highlighted={hl}
                  delay={i * 200}
                />
              );
            })}
            {HUBS.map(hub => (
              <HubMarker
                key={hub.id}
                hub={hub}
                selected={sel}
                onSelect={setSel}
              />
            ))}
          </>
        )}
      </GoogleMap>

      {/* Info panel */}
      <InfoPanel hub={selHub} onClose={() => setSel(null)} />

      {/* Bottom legend */}
      <div style={{
        position:"absolute", bottom:"1rem", right:"1rem",
        zIndex:10, display:"flex", flexWrap:"wrap",
        gap:"0.35rem", justifyContent:"flex-end", maxWidth:"360px",
      }}>
        {HUBS.map(hub => (
          <button
            key={hub.id}
            onClick={() => setSel(sel === hub.id ? null : hub.id)}
            style={{
              display:"flex", alignItems:"center", gap:"0.4rem",
              padding:"0.25rem 0.65rem",
              background: sel === hub.id ? "rgba(212,175,55,0.07)" : "rgba(0,0,0,0.65)",
              border: `1px solid ${sel === hub.id ? "rgba(212,175,55,0.5)" : "rgba(212,175,55,0.12)"}`,
              cursor:"pointer",
              transition:"all 0.3s ease",
              backdropFilter:"blur(4px)",
            }}
          >
            <span style={{ width:4, height:4, borderRadius:"50%",
              background:G, opacity:0.75, flexShrink:0 }} />
            <span style={{ fontFamily:"'Montserrat',sans-serif",
              fontSize:"0.4rem", letterSpacing:"0.2em",
              color: sel === hub.id ? G : "rgba(212,175,55,0.55)",
              textTransform:"uppercase" }}>
              {hub.name}
            </span>
            <span style={{ fontFamily:"'Montserrat',sans-serif",
              fontSize:"0.38rem", color:"rgba(255,255,255,0.22)",
              letterSpacing:"0.1em" }}>
              {hub.v}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

const centerStyle = {
  position:"absolute", inset:0,
  display:"flex", flexDirection:"column",
  alignItems:"center", justifyContent:"center",
  gap:"1rem",
};
const labelStyle = {
  fontFamily:"'Montserrat',sans-serif",
  fontSize:"0.45rem", letterSpacing:"0.42em",
  color:"rgba(212,175,55,0.4)", textTransform:"uppercase",
};
