import { useState, useEffect, useCallback, useRef } from "react";

// ─── Images ───────────────────────────────────────────────────────────────────
import BugattiImg    from "../../assets/Bugatti Chiron black side view.jpg";
import FerrariImg    from "../../assets/Ferrari Roma front view dark.jpg";
import PaganiImg     from "../../assets/Pagani Huayra carbon fiber.jpg";
import RollsImg      from "../../assets/Rolls Royce Phantom black luxury.jpg";
import SupraImg      from "../../assets/Toyota Supra widebody kit.jpg";
import KoenigImg     from "../../assets/Koenigsegg Regera hypercar.jpg";
import LamboImg      from "../../assets/Lamborghini Veneno side.jpg";
import AstonImg      from "../../assets/Aston Martin Valkyrie F1.jpg";
import HennesseyImg  from "../../assets/Hennessey Venom F5 front.jpg";
import BugattiInt    from "../../assets/Bugatti Chiron interior cockpit.jpg";
import FerrariInt    from "../../assets/Ferrari Roma interior red.jpg";
import PaganiInt     from "../../assets/Pagani Huayra interior gold.jpg";
import RollsInt      from "../../assets/Rolls Royce Phantom interior starlight.jpg";
import SupraInt      from "../../assets/Toyota Supra A90 interior.jpg";
import KoenigInt     from "../../assets/Koenigsegg Regera interior.jpg";
import LamboInt      from "../../assets/Lamborghini Veneno interior.jpg";
import AstonInt      from "../../assets/Aston Martin Valkyrie interior.jpg";
import HennesseyInt  from "../../assets/Hennessey Venom F5 interior.jpg";

const HERO_IMAGES = {
  "bugatti-chiron":BugattiImg,"ferrari-roma":FerrariImg,"pagani-huayra":PaganiImg,
  "rolls-royce-phantom":RollsImg,"toyota-supra-mk5":SupraImg,"koenigsegg-regera":KoenigImg,
  "lamborghini-veneno":LamboImg,"aston-martin-valkyrie":AstonImg,"hennessey-venom-f5":HennesseyImg,
};
const INT_IMAGES = {
  "bugatti-chiron":BugattiInt,"ferrari-roma":FerrariInt,"pagani-huayra":PaganiInt,
  "rolls-royce-phantom":RollsInt,"toyota-supra-mk5":SupraInt,"koenigsegg-regera":KoenigInt,
  "lamborghini-veneno":LamboInt,"aston-martin-valkyrie":AstonInt,"hennessey-venom-f5":HennesseyInt,
};

// ─── Constants ────────────────────────────────────────────────────────────────
const API  = "https://francis-luxor-motors.onrender.com/api";
const GOLD = "#d4af37";
const F    = { serif:"'Cormorant Garamond',serif", sans:"'Montserrat',sans-serif", tenor:"'Tenor Sans',sans-serif" };
const fmt  = (n) => "\u20ac" + Number(n).toLocaleString("de-DE");

const BASE_PRICES = {
  "bugatti-chiron":4000000,"ferrari-roma":300000,"pagani-huayra":3000000,
  "rolls-royce-phantom":450000,"toyota-supra-mk5":400000,"koenigsegg-regera":4000000,
  "lamborghini-veneno":9000000,"aston-martin-valkyrie":2500000,"hennessey-venom-f5":1850000,
};

const CONFIG = {
  colors:[
    {n:"Noir Obsidian",p:0,hex:"#0a0a0a"},{n:"Arctic White",p:12000,hex:"#f0ece4"},
    {n:"Racing Red",p:8000,hex:"#8b0000"},{n:"Midnight Blue",p:8000,hex:"#0a1628"},
    {n:"Gold Edition",p:25000,hex:"#b8962e"},{n:"Matte Carbon",p:18000,hex:"#1a1a1a"},
  ],
  interiors:[
    {n:"Black Leather",p:0},{n:"Cream Nappa",p:15000},
    {n:"Red Alcantara",p:22000},{n:"Carbon Fiber",p:35000},
  ],
  performance:[
    {n:"Standard",p:0,sub:"Base configuration"},{n:"Sport Package",p:45000,sub:"+180 hp"},
    {n:"Track Edition",p:85000,sub:"+310 hp"},{n:"Ultimate",p:140000,sub:"Maximum output"},
  ],
  wheels:[
    {n:"Standard Alloy",p:0},{n:"Forged Carbon",p:18000},
    {n:"Titanium Sport",p:28000},{n:"Signature Edition",p:42000},
  ],
};

const TABS = [
  {key:"fleet",label:"Fleet",icon:"\u25c8"},
  {key:"orders",label:"My Orders",icon:"\u25c9"},
  {key:"inventory",label:"Inventory",icon:"\u25c6"},
  {key:"admin",label:"Admin Panel",icon:"\u2b21"},
];

const PROCESS_STEPS = [
  {num:"01",title:"Select Your Vehicle",desc:"Browse our curated collection of the world's most exclusive hypercars and grand tourers."},
  {num:"02",title:"Configure Specifications",desc:"Personalise every detail — colour, interior, performance package and bespoke wheel set."},
  {num:"03",title:"Submit Request",desc:"Submit your acquisition request securely through our encrypted platform."},
  {num:"04",title:"Specialist Contact",desc:"A dedicated Luxor Motors specialist will reach you within 24 hours to discuss your order."},
  {num:"05",title:"Finalise Purchase",desc:"Complete your acquisition with full concierge support and white-glove delivery worldwide."},
];

// ─── Styles ───────────────────────────────────────────────────────────────────
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,200;0,300;0,400;1,200;1,300&family=Montserrat:wght@200;300;400;500&family=Tenor+Sans&display=swap');
@keyframes pmFadeUp  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }
@keyframes pmFadeIn  { from{opacity:0} to{opacity:1} }
@keyframes pmLineIn  { from{width:0} to{width:120px} }
@keyframes pmToastIn { from{opacity:0;transform:translateX(18px)} to{opacity:1;transform:none} }
@keyframes pmModalIn { from{opacity:0;transform:scale(0.97)} to{opacity:1;transform:none} }

.lx-card { position:relative; overflow:hidden; cursor:pointer; background:#050505; border:1px solid rgba(255,255,255,0.05); transition:border-color 0.4s ease,transform 0.4s ease; }
.lx-card:hover { border-color:rgba(212,175,55,0.35); transform:translateY(-3px); }
.lx-card-img { width:100%; height:260px; object-fit:cover; display:block; filter:brightness(0.68) saturate(0.85); transition:filter 0.7s ease,transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94); }
.lx-card:hover .lx-card-img { filter:brightness(0.88) saturate(1); transform:scale(1.05); }
.lx-card-shine { position:absolute;top:0;left:-100%;width:60%;height:100%;background:linear-gradient(105deg,transparent 40%,rgba(212,175,55,0.07) 50%,transparent 60%);transition:left 0.8s ease;pointer-events:none;z-index:2; }
.lx-card:hover .lx-card-shine { left:150%; }
.lx-card-bar { position:absolute;bottom:0;left:0;height:2px;width:0;background:linear-gradient(to right,#d4af37,rgba(212,175,55,0.2));transition:width 0.5s cubic-bezier(0.23,1,0.32,1); }
.lx-card:hover .lx-card-bar { width:100%; }

.pm-tab { padding:1.1rem 2.5rem;background:none;border:none;border-bottom:2px solid transparent;font-family:'Montserrat',sans-serif;font-size:0.47rem;letter-spacing:0.3em;text-transform:uppercase;cursor:pointer;display:flex;align-items:center;gap:0.6rem;transition:color 0.3s,border-color 0.3s;color:rgba(255,255,255,0.25); }
.pm-tab.active { color:#d4af37!important;border-bottom-color:#d4af37!important;background:rgba(212,175,55,0.03)!important; }
.pm-tab:hover:not(.active) { color:rgba(255,255,255,0.5)!important; }
.pm-badge { background:#d4af37;color:#000;border-radius:50%;width:16px;height:16px;font-size:0.42rem;display:flex;align-items:center;justify-content:center;font-weight:600; }

.cfg-btn { background:transparent;border:1px solid rgba(255,255,255,0.07);color:rgba(255,255,255,0.35);padding:0.55rem 1rem;font-family:'Montserrat',sans-serif;font-size:0.47rem;letter-spacing:0.1em;text-transform:uppercase;cursor:pointer;transition:all 0.25s; }
.cfg-btn.active { background:rgba(212,175,55,0.08);border-color:rgba(212,175,55,0.6);color:#d4af37; }
.cfg-btn:hover:not(.active) { border-color:rgba(255,255,255,0.2);color:rgba(255,255,255,0.6); }

.color-swatch { width:38px;height:38px;cursor:pointer;transition:all 0.25s;border:2px solid transparent; }
.color-swatch.active { border-color:#d4af37;box-shadow:0 0 0 1px #d4af37; }
.color-swatch:hover:not(.active) { transform:scale(1.12); }

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button { opacity:1; }
`;

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ msg, type, onClose }) {
  useEffect(()=>{ const t=setTimeout(onClose,3500); return()=>clearTimeout(t); },[onClose]);
  return (
    <div style={{position:"fixed",top:"2rem",right:"2rem",zIndex:9999,background:"rgba(4,4,4,0.97)",border:`1px solid ${type==="success"?"rgba(212,175,55,0.5)":"rgba(200,50,50,0.5)"}`,padding:"1.1rem 1.8rem",maxWidth:"360px",animation:"pmToastIn 0.4s cubic-bezier(0.23,1,0.32,1)",boxShadow:"0 20px 60px rgba(0,0,0,0.8)"}}>
      <div style={{fontFamily:F.sans,fontSize:"0.5rem",letterSpacing:"0.2em",color:type==="success"?GOLD:"#e88",textTransform:"uppercase"}}>{msg}</div>
    </div>
  );
}

// ─── Configurator Modal ───────────────────────────────────────────────────────
function ConfiguratorModal({ vehicle, onConfirm, onClose }) {
  const [colorIdx,setColorIdx] = useState(0);
  const [interIdx,setInterIdx] = useState(0);
  const [perfIdx,setPerfIdx]   = useState(0);
  const [wheelIdx,setWheelIdx] = useState(0);
  const [cfgTab,setCfgTab]     = useState("color");
  const [loading,setLoading]   = useState(false);

  const base  = BASE_PRICES[vehicle.slug]||0;
  const total = base+CONFIG.colors[colorIdx].p+CONFIG.interiors[interIdx].p+CONFIG.performance[perfIdx].p+CONFIG.wheels[wheelIdx].p;
  const previewImg = cfgTab==="interior" ? INT_IMAGES[vehicle.slug] : HERO_IMAGES[vehicle.slug];

  const handleBuy = async()=>{
    setLoading(true);
    await onConfirm({vehicle_slug:vehicle.slug,vehicle_model:vehicle.model,price:vehicle.valuation,color:CONFIG.colors[colorIdx].n,interior:CONFIG.interiors[interIdx].n,performance:CONFIG.performance[perfIdx].n,wheels:CONFIG.wheels[wheelIdx].n,total_price:total});
    setLoading(false);
  };

  const cfgTabs=[{key:"color",label:"Colour"},{key:"interior",label:"Interior"},{key:"performance",label:"Performance"},{key:"wheels",label:"Wheels"}];

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.96)",zIndex:2000,display:"flex",animation:"pmFadeIn 0.3s ease"}}>
      {/* LEFT preview */}
      <div style={{flex:"0 0 55%",position:"relative",overflow:"hidden",background:"#020202"}}>
        {previewImg && <img key={previewImg} src={previewImg} alt={vehicle.model} style={{width:"100%",height:"100%",objectFit:"cover",filter:"brightness(0.6)",animation:"pmFadeIn 0.45s ease"}}/>}
        <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at center,${CONFIG.colors[colorIdx].hex}1a 0%,transparent 65%)`,transition:"background 0.6s ease",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"3rem",background:"linear-gradient(to top,rgba(0,0,0,0.95) 0%,transparent 100%)"}}>
          <div style={{fontFamily:F.sans,fontSize:"0.38rem",letterSpacing:"0.55em",color:"rgba(212,175,55,0.45)",textTransform:"uppercase",marginBottom:"0.6rem"}}>Configure & Acquire</div>
          <div style={{fontFamily:F.serif,fontSize:"2.8rem",fontWeight:200,color:"#fff",lineHeight:1,marginBottom:"0.5rem"}}>{vehicle.model}</div>
          <div style={{fontFamily:F.tenor,fontSize:"1.15rem",color:GOLD}}>{vehicle.valuation}</div>
        </div>
        <button onClick={onClose} style={{position:"absolute",top:"1.8rem",left:"1.8rem",background:"rgba(0,0,0,0.7)",border:"1px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.45)",width:"40px",height:"40px",cursor:"pointer",fontSize:"1.1rem",display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(8px)"}}>
          ×
        </button>
      </div>

      {/* RIGHT config */}
      <div style={{flex:"0 0 45%",overflowY:"auto",background:"#050505",display:"flex",flexDirection:"column"}}>
        {/* cfg sub-tabs */}
        <div style={{display:"flex",borderBottom:"1px solid rgba(255,255,255,0.05)",flexShrink:0}}>
          {cfgTabs.map(t=>(
            <button key={t.key} onClick={()=>setCfgTab(t.key)} style={{flex:1,padding:"1.15rem 0.3rem",background:cfgTab===t.key?"rgba(212,175,55,0.05)":"transparent",border:"none",borderBottom:cfgTab===t.key?`2px solid ${GOLD}`:"2px solid transparent",color:cfgTab===t.key?GOLD:"rgba(255,255,255,0.22)",fontFamily:F.sans,fontSize:"0.4rem",letterSpacing:"0.22em",textTransform:"uppercase",cursor:"pointer",transition:"all 0.25s"}}>
              {t.label}
            </button>
          ))}
        </div>

        <div style={{padding:"2.5rem",flex:1}}>

          {/* COLOUR */}
          {cfgTab==="color"&&(
            <div style={{animation:"pmFadeUp 0.3s ease"}}>
              <div style={{fontFamily:F.sans,fontSize:"0.36rem",letterSpacing:"0.5em",color:"rgba(212,175,55,0.38)",textTransform:"uppercase",marginBottom:"0.4rem"}}>Selected</div>
              <div style={{fontFamily:F.serif,fontSize:"1.5rem",color:"#fff",fontWeight:300,marginBottom:"1.8rem"}}>
                {CONFIG.colors[colorIdx].n}
                {CONFIG.colors[colorIdx].p>0&&<span style={{fontFamily:F.sans,fontSize:"0.52rem",color:GOLD,marginLeft:"1rem"}}>+{fmt(CONFIG.colors[colorIdx].p)}</span>}
              </div>
              <div style={{display:"flex",gap:"0.7rem",flexWrap:"wrap",marginBottom:"2rem"}}>
                {CONFIG.colors.map((c,i)=>(
                  <div key={i} onClick={()=>setColorIdx(i)} className={`color-swatch ${colorIdx===i?"active":""}`} style={{background:c.hex,border:colorIdx===i?`2px solid ${GOLD}`:"2px solid rgba(255,255,255,0.08)"}} title={c.n}/>
                ))}
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:"0.5rem"}}>
                {CONFIG.colors.map((c,i)=>(
                  <button key={i} onClick={()=>setColorIdx(i)} className={`cfg-btn ${colorIdx===i?"active":""}`} style={{textAlign:"left",display:"flex",justifyContent:"space-between"}}>
                    <span>{c.n}</span><span style={{opacity:0.45}}>{c.p>0?`+${fmt(c.p)}`:"Included"}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* INTERIOR */}
          {cfgTab==="interior"&&(
            <div style={{animation:"pmFadeUp 0.3s ease"}}>
              <div style={{fontFamily:F.sans,fontSize:"0.36rem",letterSpacing:"0.5em",color:"rgba(212,175,55,0.38)",textTransform:"uppercase",marginBottom:"0.4rem"}}>Selected</div>
              <div style={{fontFamily:F.serif,fontSize:"1.5rem",color:"#fff",fontWeight:300,marginBottom:"1.8rem"}}>{CONFIG.interiors[interIdx].n}</div>
              <div style={{display:"flex",flexDirection:"column",gap:"0.5rem"}}>
                {CONFIG.interiors.map((c,i)=>(
                  <button key={i} onClick={()=>setInterIdx(i)} className={`cfg-btn ${interIdx===i?"active":""}`} style={{textAlign:"left",display:"flex",justifyContent:"space-between"}}>
                    <span>{c.n}</span><span style={{opacity:0.45}}>{c.p>0?`+${fmt(c.p)}`:"Included"}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* PERFORMANCE */}
          {cfgTab==="performance"&&(
            <div style={{animation:"pmFadeUp 0.3s ease"}}>
              <div style={{fontFamily:F.sans,fontSize:"0.36rem",letterSpacing:"0.5em",color:"rgba(212,175,55,0.38)",textTransform:"uppercase",marginBottom:"0.4rem"}}>Selected Package</div>
              <div style={{fontFamily:F.serif,fontSize:"1.5rem",color:"#fff",fontWeight:300,marginBottom:"1.8rem"}}>{CONFIG.performance[perfIdx].n}</div>
              <div style={{display:"flex",flexDirection:"column",gap:"0.7rem"}}>
                {CONFIG.performance.map((c,i)=>(
                  <button key={i} onClick={()=>setPerfIdx(i)} style={{background:perfIdx===i?"rgba(212,175,55,0.06)":"transparent",border:`1px solid ${perfIdx===i?"rgba(212,175,55,0.45)":"rgba(255,255,255,0.06)"}`,padding:"1rem 1.1rem",cursor:"pointer",transition:"all 0.25s",textAlign:"left"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.25rem"}}>
                      <span style={{fontFamily:F.sans,fontSize:"0.47rem",letterSpacing:"0.14em",textTransform:"uppercase",color:perfIdx===i?GOLD:"rgba(255,255,255,0.45)"}}>{c.n}</span>
                      <span style={{fontFamily:F.tenor,fontSize:"0.78rem",color:perfIdx===i?GOLD:"rgba(255,255,255,0.2)"}}>{c.p>0?`+${fmt(c.p)}`:"Included"}</span>
                    </div>
                    <div style={{fontFamily:F.sans,fontSize:"0.4rem",color:"rgba(255,255,255,0.22)",letterSpacing:"0.08em"}}>{c.sub}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* WHEELS */}
          {cfgTab==="wheels"&&(
            <div style={{animation:"pmFadeUp 0.3s ease"}}>
              <div style={{fontFamily:F.sans,fontSize:"0.36rem",letterSpacing:"0.5em",color:"rgba(212,175,55,0.38)",textTransform:"uppercase",marginBottom:"0.4rem"}}>Selected</div>
              <div style={{fontFamily:F.serif,fontSize:"1.5rem",color:"#fff",fontWeight:300,marginBottom:"1.8rem"}}>{CONFIG.wheels[wheelIdx].n}</div>
              <div style={{display:"flex",flexDirection:"column",gap:"0.5rem"}}>
                {CONFIG.wheels.map((c,i)=>(
                  <button key={i} onClick={()=>setWheelIdx(i)} className={`cfg-btn ${wheelIdx===i?"active":""}`} style={{textAlign:"left",display:"flex",justifyContent:"space-between"}}>
                    <span>{c.n}</span><span style={{opacity:0.45}}>{c.p>0?`+${fmt(c.p)}`:"Included"}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer summary */}
        <div style={{borderTop:"1px solid rgba(212,175,55,0.1)",padding:"2rem 2.5rem",background:"rgba(212,175,55,0.015)",flexShrink:0}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:"1.4rem"}}>
            <div>
              <div style={{fontFamily:F.sans,fontSize:"0.36rem",letterSpacing:"0.45em",color:"rgba(255,255,255,0.18)",textTransform:"uppercase",marginBottom:"0.4rem"}}>Total Configuration</div>
              <div style={{fontFamily:F.serif,fontSize:"2.3rem",fontWeight:200,color:GOLD,lineHeight:1}}>{fmt(total)}</div>
            </div>
            <div style={{fontFamily:F.sans,fontSize:"0.37rem",color:"rgba(255,255,255,0.18)",letterSpacing:"0.08em",textAlign:"right",lineHeight:1.8}}>
              <div>{CONFIG.colors[colorIdx].n}</div>
              <div>{CONFIG.interiors[interIdx].n}</div>
              <div>{CONFIG.performance[perfIdx].n}</div>
              <div>{CONFIG.wheels[wheelIdx].n}</div>
            </div>
          </div>
          <div style={{display:"flex",gap:"0.7rem"}}>
            <button onClick={onClose} style={{flex:1,padding:"1rem",background:"transparent",border:"1px solid rgba(255,255,255,0.07)",color:"rgba(255,255,255,0.22)",fontFamily:F.sans,fontSize:"0.44rem",letterSpacing:"0.2em",textTransform:"uppercase",cursor:"pointer"}}>Cancel</button>
            <button onClick={handleBuy} disabled={loading} style={{flex:2,padding:"1rem",background:loading?"rgba(212,175,55,0.15)":"rgba(212,175,55,0.1)",border:`1px solid ${loading?"rgba(212,175,55,0.25)":"rgba(212,175,55,0.6)"}`,color:loading?"rgba(212,175,55,0.35)":GOLD,fontFamily:F.sans,fontSize:"0.44rem",letterSpacing:"0.2em",textTransform:"uppercase",cursor:loading?"not-allowed":"pointer",transition:"all 0.3s"}}>
              {loading?"Processing\u2026":"Confirm Acquisition \u2192"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Vehicle Card ─────────────────────────────────────────────────────────────
function VehicleCard({ vehicle, index, onConfigure }) {
  const stockNum = parseInt(vehicle.stock)||0;
  const soldOut  = stockNum===0;
  const img      = HERO_IMAGES[vehicle.slug];
  return (
    <div className="lx-card" style={{opacity:soldOut?0.38:1,cursor:soldOut?"default":"pointer",animation:`pmFadeUp 0.5s ease ${index*0.06}s both`}}>
      <div className="lx-card-shine"/>
      <div style={{overflow:"hidden"}}>
        {img
          ? <img src={img} alt={vehicle.model} className="lx-card-img"/>
          : <div style={{height:"260px",background:"#0a0a0a",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:"rgba(212,175,55,0.12)",fontFamily:F.serif,fontSize:"1.2rem"}}>{vehicle.model}</span></div>
        }
      </div>
      <div style={{padding:"1.7rem 1.7rem 1.5rem"}}>
        <div style={{fontFamily:F.sans,fontSize:"0.37rem",letterSpacing:"0.42em",color:"rgba(212,175,55,0.42)",textTransform:"uppercase",marginBottom:"0.45rem"}}>Lot {String(index+1).padStart(2,"0")}</div>
        <div style={{fontFamily:F.serif,fontSize:"1.5rem",fontWeight:300,color:"#e8e8e8",lineHeight:1.1,marginBottom:"0.55rem"}}>{vehicle.model}</div>
        <div style={{width:"26px",height:"1px",background:`linear-gradient(to right,${GOLD},transparent)`,marginBottom:"1rem"}}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1.2rem"}}>
          <span style={{fontFamily:F.tenor,fontSize:"1.2rem",color:GOLD}}>{vehicle.valuation}</span>
          <span style={{fontFamily:F.sans,fontSize:"0.37rem",letterSpacing:"0.2em",color:soldOut?"rgba(255,255,255,0.18)":"rgba(212,175,55,0.58)",border:`1px solid ${soldOut?"rgba(255,255,255,0.06)":"rgba(212,175,55,0.16)"}`,padding:"0.26rem 0.7rem"}}>
            {soldOut?"SOLD OUT":vehicle.stock}
          </span>
        </div>
        <button onClick={()=>!soldOut&&onConfigure(vehicle)} disabled={soldOut}
          style={{width:"100%",padding:"0.85rem",background:"transparent",border:`1px solid ${soldOut?"rgba(255,255,255,0.04)":"rgba(212,175,55,0.2)"}`,color:soldOut?"rgba(255,255,255,0.1)":"rgba(212,175,55,0.72)",fontFamily:F.sans,fontSize:"0.44rem",letterSpacing:"0.25em",textTransform:"uppercase",cursor:soldOut?"not-allowed":"pointer",transition:"all 0.3s"}}
          onMouseEnter={e=>!soldOut&&(e.currentTarget.style.background="rgba(212,175,55,0.07)")}
          onMouseLeave={e=>!soldOut&&(e.currentTarget.style.background="transparent")}
        >
          {soldOut?"Unavailable":"Configure Vehicle \u2192"}
        </button>
      </div>
      <div className="lx-card-bar"/>
    </div>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────
function HowItWorks() {
  return (
    <div style={{margin:"80px 0",borderTop:"1px solid rgba(212,175,55,0.08)",borderBottom:"1px solid rgba(212,175,55,0.08)",padding:"80px 0"}}>
      <div style={{textAlign:"center",marginBottom:"4rem"}}>
        <div style={{fontFamily:F.sans,fontSize:"0.38rem",letterSpacing:"0.6em",color:"rgba(212,175,55,0.42)",textTransform:"uppercase",marginBottom:"1rem"}}>The Process</div>
        <h3 style={{fontFamily:F.serif,fontSize:"clamp(2rem,4vw,3.5rem)",fontWeight:200,color:"#fff",letterSpacing:"0.05em",margin:0}}>How Acquisition Works</h3>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:"2px",background:"rgba(212,175,55,0.05)"}}>
        {PROCESS_STEPS.map((step,i)=>(
          <div key={i} style={{background:"#050505",padding:"2.5rem 1.6rem",display:"flex",flexDirection:"column",gap:"0.9rem",animation:`pmFadeUp 0.5s ease ${i*0.08}s both`}}>
            <div style={{fontFamily:F.serif,fontSize:"3.8rem",fontWeight:200,color:"rgba(212,175,55,0.1)",lineHeight:1}}>{step.num}</div>
            <div style={{width:"18px",height:"1px",background:`linear-gradient(to right,${GOLD},transparent)`}}/>
            <div style={{fontFamily:F.sans,fontSize:"0.47rem",letterSpacing:"0.18em",color:"rgba(255,255,255,0.65)",textTransform:"uppercase",lineHeight:1.5}}>{step.title}</div>
            <div style={{fontFamily:F.sans,fontSize:"0.53rem",color:"rgba(255,255,255,0.27)",lineHeight:1.85,fontWeight:300}}>{step.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Orders Tab ───────────────────────────────────────────────────────────────
function OrdersTab({ orders, onCancel, loading }) {
  if (loading) return <div style={{textAlign:"center",padding:"5rem",fontFamily:F.sans,fontSize:"0.44rem",letterSpacing:"0.42em",color:"rgba(255,255,255,0.14)",textTransform:"uppercase"}}>Loading\u2026</div>;
  if (orders.length===0) return (
    <div style={{textAlign:"center",padding:"6rem 2rem"}}>
      <div style={{fontFamily:F.serif,fontSize:"5rem",color:"rgba(212,175,55,0.06)",marginBottom:"1.5rem"}}>\u25c7</div>
      <div style={{fontFamily:F.sans,fontSize:"0.44rem",letterSpacing:"0.44em",color:"rgba(255,255,255,0.14)",textTransform:"uppercase"}}>No acquisitions on record</div>
    </div>
  );
  return (
    <div style={{display:"flex",flexDirection:"column",gap:"2px",background:"rgba(212,175,55,0.05)"}}>
      {orders.map(o=>(
        <div key={o.id} style={{background:"#060606",padding:"2rem 2.5rem",display:"grid",gridTemplateColumns:"1fr auto",gap:"2rem",alignItems:"start"}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:"1rem",marginBottom:"1rem"}}>
              <span style={{fontFamily:F.serif,fontSize:"1.4rem",color:"#e8e8e8",fontWeight:300}}>{o.vehicle_model}</span>
              <span style={{fontFamily:F.sans,fontSize:"0.37rem",letterSpacing:"0.3em",color:"rgba(80,210,80,0.68)",border:"1px solid rgba(80,210,80,0.16)",padding:"0.2rem 0.7rem"}}>CONFIRMED</span>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:"1rem",marginBottom:"1rem"}}>
              {[{l:"Colour",v:o.color},{l:"Interior",v:o.interior},{l:"Performance",v:o.performance},{l:"Wheels",v:o.wheels}].map(({l,v})=>v&&(
                <div key={l}>
                  <div style={{fontFamily:F.sans,fontSize:"0.37rem",letterSpacing:"0.35em",color:"rgba(255,255,255,0.16)",textTransform:"uppercase",marginBottom:"4px"}}>{l}</div>
                  <div style={{fontFamily:F.sans,fontSize:"0.57rem",color:"rgba(255,255,255,0.52)"}}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{fontFamily:F.sans,fontSize:"0.4rem",letterSpacing:"0.18em",color:"rgba(255,255,255,0.12)"}}>{new Date(o.created_at).toLocaleDateString("es-ES",{day:"2-digit",month:"long",year:"numeric"})} \u00b7 Order #{String(o.id).padStart(4,"0")}</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontFamily:F.serif,fontSize:"1.85rem",color:GOLD,fontWeight:200,marginBottom:"1rem"}}>{fmt(o.total_price)}</div>
            <button onClick={()=>onCancel(o.id)} style={{padding:"0.55rem 1.1rem",background:"transparent",border:"1px solid rgba(200,60,60,0.22)",color:"rgba(210,90,90,0.65)",fontFamily:F.sans,fontSize:"0.4rem",letterSpacing:"0.18em",textTransform:"uppercase",cursor:"pointer",transition:"all 0.3s"}} onMouseEnter={e=>(e.currentTarget.style.background="rgba(200,60,60,0.07)")} onMouseLeave={e=>(e.currentTarget.style.background="transparent")}>Cancel Order</button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Inventory Tab ────────────────────────────────────────────────────────────
function InventoryTab({ vehicles, onStockChange }) {
  const [changes,setChanges]=useState({});const [saving,setSaving]=useState(false);
  const save=async(slug)=>{const n=changes[slug];if(n===undefined)return;setSaving(true);await onStockChange(slug,n);setChanges(p=>{const c={...p};delete c[slug];return c;});setSaving(false);};
  return (
    <div>
      <p style={{fontFamily:F.sans,fontSize:"0.41rem",letterSpacing:"0.44em",color:"rgba(255,255,255,0.16)",textTransform:"uppercase",marginBottom:"2rem"}}>Manage inventory stock levels</p>
      <div style={{display:"flex",flexDirection:"column",gap:"2px"}}>
        {vehicles.map(v=>{
          const n=parseInt(v.stock)||0;const hp=changes[v.slug]!==undefined;
          return(
            <div key={v.slug} style={{display:"grid",gridTemplateColumns:"1fr auto auto",gap:"1.5rem",alignItems:"center",padding:"1.1rem 1.5rem",background:"#060606",border:"1px solid rgba(255,255,255,0.04)"}}>
              <div>
                <div style={{fontFamily:F.serif,fontSize:"1.05rem",color:"#ccc",fontWeight:300}}>{v.model}</div>
                <div style={{fontFamily:F.sans,fontSize:"0.39rem",color:n===0?"rgba(210,80,80,0.58)":"rgba(80,210,80,0.58)",marginTop:"4px",letterSpacing:"0.2em"}}>{n===0?"SOLD OUT":`${n} in stock`}</div>
              </div>
              <input type="number" min="0" max="99" defaultValue={n} onChange={e=>{const x=parseInt(e.target.value);if(!isNaN(x)&&x>=0)setChanges(p=>({...p,[v.slug]:x}));}} style={{width:"68px",padding:"0.5rem",background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.07)",color:"#ddd",fontFamily:F.sans,fontSize:"0.7rem",textAlign:"center",outline:"none"}}/>
              <button onClick={()=>save(v.slug)} disabled={!hp||saving} style={{padding:"0.5rem 1.1rem",background:hp?"rgba(212,175,55,0.08)":"transparent",border:`1px solid ${hp?"rgba(212,175,55,0.42)":"rgba(255,255,255,0.05)"}`,color:hp?GOLD:"rgba(255,255,255,0.1)",fontFamily:F.sans,fontSize:"0.41rem",letterSpacing:"0.2em",textTransform:"uppercase",cursor:hp?"pointer":"not-allowed"}}>Save</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Admin Panel ──────────────────────────────────────────────────────────────
function AdminPanel({ vehicles, onRefresh, notify }) {
  const [view,setView]=useState("list");const [editSlug,setEditSlug]=useState(null);
  const [allOrders,setAllOrders]=useState([]);const [loadingOrders,setLoadingOrders]=useState(false);const [saving,setSaving]=useState(false);
  const empty={slug:"",model:"",valuation:"",stock:"",description:"",hp:"",top:"",accent:"",engine_desc:"",category:""};
  const [form,setForm]=useState(empty);

  const loadOrders=async()=>{setLoadingOrders(true);try{const r=await fetch(`${API}/orders`);setAllOrders(await r.json());}catch{notify("Error loading orders","error");}setLoadingOrders(false);};
  const startEdit=v=>{setEditSlug(v.slug);setForm({slug:v.slug,model:v.model||"",valuation:v.valuation||"",stock:v.stock||"",description:v.description||"",hp:v.hp||"",top:v.top||"",accent:v.accent||"",engine_desc:v.engine_desc||"",category:v.category||""});setView("edit");};
  const handleDelete=async(slug,model)=>{if(!window.confirm(`Delete ${model}?`))return;try{const r=await fetch(`${API}/vehicles/${slug}`,{method:"DELETE"});if(!r.ok)throw new Error("Delete failed");notify(`${model} deleted`);onRefresh();}catch(e){notify(e.message,"error");}};
  const handleSubmit=async()=>{if(!form.slug||!form.model)return notify("Slug and model required","error");setSaving(true);try{const ie=view==="edit";const r=await fetch(ie?`${API}/vehicles/${editSlug}`:`${API}/vehicles`,{method:ie?"PUT":"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});const d=await r.json();if(!r.ok)throw new Error(d.error||"Save failed");notify(ie?`${form.model} updated`:`${form.model} added`);onRefresh();setForm(empty);setView("list");}catch(e){notify(e.message,"error");}setSaving(false);};

  const inp={background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.07)",color:"#ddd",fontFamily:F.sans,fontSize:"0.62rem",padding:"0.52rem 0.8rem",outline:"none",width:"100%",boxSizing:"border-box"};
  const lbl={fontFamily:F.sans,fontSize:"0.37rem",letterSpacing:"0.42em",color:"rgba(212,175,55,0.38)",textTransform:"uppercase",display:"block",marginBottom:"0.38rem"};
  const Field=({label,field,placeholder,area})=><div><label style={lbl}>{label}</label>{area?<textarea value={form[field]} onChange={e=>setForm(p=>({...p,[field]:e.target.value}))} placeholder={placeholder||""} rows={3} style={{...inp,resize:"vertical"}}/>:<input value={form[field]} onChange={e=>setForm(p=>({...p,[field]:e.target.value}))} placeholder={placeholder||""} style={inp}/>}</div>;
  const subBtn=(key,label,onClick)=>{const a=view===key||(view==="edit"&&key==="list");return <button onClick={onClick||(()=>setView(key))} style={{padding:"0.7rem 1.5rem",background:a?"rgba(212,175,55,0.05)":"transparent",border:"none",borderBottom:a?`1px solid ${GOLD}`:"1px solid transparent",color:a?GOLD:"rgba(255,255,255,0.28)",fontFamily:F.sans,fontSize:"0.44rem",letterSpacing:"0.25em",textTransform:"uppercase",cursor:"pointer"}}>{label}</button>;};
  const FormFields=()=>(
    <>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:"1rem",marginBottom:"1rem"}}>
        {view==="add"&&<Field label="Slug" field="slug" placeholder="ferrari-roma"/>}
        <Field label="Model" field="model" placeholder="Ferrari Roma"/>
        <Field label="Valuation" field="valuation" placeholder="\u20ac300,000"/>
        <Field label="Stock" field="stock" placeholder="5 Units Available"/>
        <Field label="HP" field="hp" placeholder="620 hp"/>
        <Field label="Top Speed" field="top" placeholder="320 km/h"/>
        <Field label="Accent" field="accent" placeholder="#c6a84b"/>
        <Field label="Category" field="category" placeholder="Gran Turismo"/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"1.2rem"}}>
        <Field label="Description" field="description" area/>
        <Field label="Engine Description" field="engine_desc" area/>
      </div>
      <div style={{display:"flex",gap:"0.8rem"}}>
        <button onClick={()=>{setView("list");setForm(empty);}} style={{padding:"0.7rem 1.5rem",background:"transparent",border:"1px solid rgba(255,255,255,0.07)",color:"rgba(255,255,255,0.22)",fontFamily:F.sans,fontSize:"0.44rem",letterSpacing:"0.2em",textTransform:"uppercase",cursor:"pointer"}}>Cancel</button>
        <button onClick={handleSubmit} disabled={saving} style={{padding:"0.7rem 2rem",background:"rgba(212,175,55,0.08)",border:"1px solid rgba(212,175,55,0.48)",color:GOLD,fontFamily:F.sans,fontSize:"0.44rem",letterSpacing:"0.2em",textTransform:"uppercase",cursor:saving?"not-allowed":"pointer",opacity:saving?0.6:1}}>{saving?"Saving...":(view==="add"?"Add Vehicle \u2192":"Save Changes \u2192")}</button>
      </div>
    </>
  );

  return (
    <div>
      <div style={{display:"flex",borderBottom:"1px solid rgba(255,255,255,0.05)",marginBottom:"2rem"}}>
        {subBtn("list","Vehicles")}
        {subBtn("add","+ Add Vehicle",()=>{setForm(empty);setView("add");})}
        {subBtn("orders","All Orders",()=>{setView("orders");loadOrders();})}
      </div>
      {(view==="list"||view==="edit")&&(
        <div style={{display:"flex",flexDirection:"column",gap:"2px"}}>
          {vehicles.map(v=>{
            const ie=view==="edit"&&editSlug===v.slug;const n=parseInt(v.stock)||0;
            return(
              <div key={v.slug}>
                <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:"1rem",alignItems:"center",padding:"1rem 1.4rem",background:ie?"rgba(212,175,55,0.025)":"#060606",border:`1px solid ${ie?"rgba(212,175,55,0.22)":"rgba(255,255,255,0.04)"}`,transition:"all 0.3s"}}>
                  <div>
                    <div style={{fontFamily:F.serif,fontSize:"1.1rem",color:"#ccc",fontWeight:300}}>{v.model}</div>
                    <div style={{display:"flex",gap:"1rem",marginTop:"0.25rem"}}>
                      <span style={{fontFamily:F.sans,fontSize:"0.44rem",color:GOLD}}>{v.valuation}</span>
                      <span style={{fontFamily:F.sans,fontSize:"0.44rem",color:n===0?"rgba(210,80,80,0.58)":"rgba(80,210,80,0.58)"}}>{n===0?"Sold Out":`${n} in stock`}</span>
                    </div>
                  </div>
                  <div style={{display:"flex",gap:"0.5rem"}}>
                    <button onClick={()=>startEdit(v)} style={{padding:"0.42rem 0.9rem",background:"transparent",border:"1px solid rgba(212,175,55,0.26)",color:GOLD,fontFamily:F.sans,fontSize:"0.41rem",letterSpacing:"0.14em",textTransform:"uppercase",cursor:"pointer"}} onMouseEnter={e=>(e.currentTarget.style.background="rgba(212,175,55,0.07)")} onMouseLeave={e=>(e.currentTarget.style.background="transparent")}>Edit</button>
                    <button onClick={()=>handleDelete(v.slug,v.model)} style={{padding:"0.42rem 0.9rem",background:"transparent",border:"1px solid rgba(200,50,50,0.22)",color:"rgba(210,90,90,0.62)",fontFamily:F.sans,fontSize:"0.41rem",letterSpacing:"0.14em",textTransform:"uppercase",cursor:"pointer"}} onMouseEnter={e=>(e.currentTarget.style.background="rgba(200,50,50,0.07)")} onMouseLeave={e=>(e.currentTarget.style.background="transparent")}>Delete</button>
                  </div>
                </div>
                {ie&&<div style={{background:"#050505",border:"1px solid rgba(212,175,55,0.1)",borderTop:"none",padding:"1.5rem"}}><FormFields/></div>}
              </div>
            );
          })}
        </div>
      )}
      {view==="add"&&<div style={{background:"#060606",border:"1px solid rgba(255,255,255,0.04)",padding:"1.5rem"}}><p style={{fontFamily:F.sans,fontSize:"0.4rem",letterSpacing:"0.44em",color:"rgba(212,175,55,0.38)",textTransform:"uppercase",marginBottom:"1.4rem"}}>New Vehicle</p><FormFields/></div>}
      {view==="orders"&&(
        loadingOrders?<p style={{fontFamily:F.sans,fontSize:"0.44rem",letterSpacing:"0.35em",color:"rgba(255,255,255,0.14)",textTransform:"uppercase",textAlign:"center",padding:"3rem"}}>Loading...</p>
        :allOrders.length===0?<div style={{textAlign:"center",padding:"3rem"}}><div style={{fontFamily:F.serif,fontSize:"3rem",color:"rgba(212,175,55,0.07)",marginBottom:"1rem"}}>\u25c7</div><p style={{fontFamily:F.sans,fontSize:"0.44rem",letterSpacing:"0.24em",textTransform:"uppercase",color:"rgba(255,255,255,0.14)"}}>No orders found</p></div>
        :<div style={{display:"flex",flexDirection:"column",gap:"2px"}}>
          <p style={{fontFamily:F.sans,fontSize:"0.4rem",letterSpacing:"0.3em",color:"rgba(255,255,255,0.16)",textTransform:"uppercase",marginBottom:"0.5rem"}}>{allOrders.length} total order{allOrders.length!==1?"s":""}</p>
          {allOrders.map(o=>(
            <div key={o.id} style={{display:"grid",gridTemplateColumns:"auto 1fr auto auto",gap:"1.2rem",alignItems:"center",padding:"1rem 1.4rem",background:"#060606",border:"1px solid rgba(255,255,255,0.04)"}}>
              <div style={{fontFamily:F.serif,fontSize:"1.8rem",color:"rgba(212,175,55,0.1)",lineHeight:1}}>#{String(o.id).padStart(4,"0")}</div>
              <div><div style={{fontFamily:F.serif,fontSize:"1.05rem",color:"#ccc",fontWeight:300,marginBottom:"0.25rem"}}>{o.vehicle_model}</div><div style={{fontFamily:F.sans,fontSize:"0.41rem",color:"rgba(255,255,255,0.2)",letterSpacing:"0.08em"}}>{o.color} \u00b7 {o.interior}</div></div>
              <div style={{fontFamily:F.serif,fontSize:"1.1rem",color:GOLD,fontWeight:200}}>{fmt(o.total_price)}</div>
              <div style={{textAlign:"right"}}><span style={{fontFamily:F.sans,fontSize:"0.37rem",letterSpacing:"0.2em",color:"rgba(80,210,80,0.62)",border:"1px solid rgba(80,210,80,0.14)",padding:"0.2rem 0.6rem"}}>CONFIRMED</span><div style={{fontFamily:F.sans,fontSize:"0.37rem",color:"rgba(255,255,255,0.16)",marginTop:"0.35rem"}}>{new Date(o.created_at).toLocaleDateString("es-ES")}</div></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function PurchaseMenu() {
  const [tab,setTab]           = useState("fleet");
  const [vehicles,setVehicles] = useState([]);
  const [orders,setOrders]     = useState([]);
  const [modal,setModal]       = useState(null);
  const [toast,setToast]       = useState(null);
  const [loadOrders,setLoad]   = useState(false);
  const sectionRef = useRef(null);

  const notify=(msg,type="success")=>setToast({msg,type});
  const fetchVehicles=useCallback(()=>{ fetch(`${API}/vehicles`).then(r=>r.json()).then(setVehicles).catch(()=>notify("Error loading vehicles","error")); },[]);
  const fetchOrders=useCallback(()=>{ setLoad(true);fetch(`${API}/orders`).then(r=>r.json()).then(d=>{setOrders(d);setLoad(false);}).catch(()=>{notify("Error loading orders","error");setLoad(false);}); },[]);
  useEffect(()=>{fetchVehicles();},[fetchVehicles]);
  useEffect(()=>{if(tab==="orders"||tab==="inventory")fetchOrders();},[tab,fetchOrders]);

  const handlePurchase=async(data)=>{
    try{const r=await fetch(`${API}/orders`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});const d=await r.json();if(!r.ok)throw new Error(d.error||"Purchase failed");notify(`Acquisition confirmed \u2014 ${data.vehicle_model}`);setModal(null);fetchVehicles();if(tab==="orders")fetchOrders();}catch(e){notify(e.message,"error");}
  };
  const handleCancel=async(id)=>{
    try{const r=await fetch(`${API}/orders/${id}`,{method:"DELETE"});const d=await r.json();if(!r.ok)throw new Error(d.error||"Cancel failed");notify("Order cancelled \u00b7 Stock restored");fetchOrders();fetchVehicles();}catch(e){notify(e.message,"error");}
  };
  const handleStock=async(slug,qty)=>{
    const s=qty===1?"1 Unit Available":`${qty} Units Available`;
    try{const r=await fetch(`${API}/vehicles/${slug}/stock`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({stock:s})});if(!r.ok)throw new Error("Stock update failed");notify("Stock updated");fetchVehicles();}catch(e){notify(e.message,"error");}
  };

  return (
    <section ref={sectionRef} style={{background:"#000",padding:"0 0 160px",fontFamily:F.sans,overflow:"hidden"}}>
      <style>{STYLES}</style>
      {toast&&<Toast msg={toast.msg} type={toast.type} onClose={()=>setToast(null)}/>}
      {modal&&<ConfiguratorModal vehicle={modal} onConfirm={handlePurchase} onClose={()=>setModal(null)}/>}

      {/* HERO */}
      <div style={{padding:"110px 80px 70px",textAlign:"center",background:"radial-gradient(ellipse at top,rgba(212,175,55,0.05) 0%,transparent 55%)",position:"relative"}}>
        <div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:"1px",height:"70px",background:"linear-gradient(to bottom,transparent,rgba(212,175,55,0.3))"}}/>
        <div style={{fontFamily:F.sans,fontSize:"0.41rem",letterSpacing:"0.65em",color:"rgba(212,175,55,0.42)",textTransform:"uppercase",marginBottom:"1.3rem",animation:"pmFadeUp 0.8s ease 0.1s both"}}>Francis Luxor Motors</div>
        <h2 style={{fontFamily:F.serif,fontSize:"clamp(3rem,7vw,6rem)",fontWeight:200,letterSpacing:"0.06em",color:"#fff",lineHeight:1,marginBottom:"1.5rem",animation:"pmFadeUp 0.9s ease 0.22s both"}}>Acquisition Portal</h2>
        <div style={{height:"1px",background:`linear-gradient(to right,transparent,${GOLD},transparent)`,margin:"0 auto",width:"0",animation:"pmLineIn 1.2s cubic-bezier(0.23,1,0.32,1) 0.45s forwards",maxWidth:"120px"}}/>
        <p style={{fontFamily:F.sans,fontSize:"0.5rem",color:"rgba(255,255,255,0.18)",letterSpacing:"0.18em",marginTop:"1.8rem",animation:"pmFadeUp 0.8s ease 0.5s both",fontWeight:300}}>Configure, personalise and acquire the world's finest automobiles</p>
      </div>

      {/* TABS */}
      <div style={{display:"flex",justifyContent:"center",borderBottom:"1px solid rgba(255,255,255,0.04)",marginBottom:"4rem"}}>
        {TABS.map(t=>{const active=tab===t.key;return(
          <button key={t.key} className={`pm-tab ${active?"active":""}`} onClick={()=>setTab(t.key)}>
            <span style={{fontSize:"0.68rem"}}>{t.icon}</span>
            <span style={{fontFamily:F.sans}}>{t.label}</span>
            {t.key==="orders"&&orders.length>0&&<span className="pm-badge">{orders.length}</span>}
          </button>
        );})}
      </div>

      {/* CONTENT */}
      <div style={{maxWidth:"1340px",margin:"0 auto",padding:"0 60px"}}>
        {tab==="fleet"&&(
          <div>
            <p style={{fontFamily:F.sans,fontSize:"0.41rem",letterSpacing:"0.5em",color:"rgba(255,255,255,0.14)",textTransform:"uppercase",marginBottom:"3rem",textAlign:"center"}}>Select a vehicle to begin your configuration</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:"2px",background:"rgba(212,175,55,0.05)"}}>
              {vehicles.map((v,i)=><VehicleCard key={v.slug} vehicle={v} index={i} onConfigure={setModal}/>)}
            </div>
            <HowItWorks/>
          </div>
        )}
        {tab==="orders"&&<OrdersTab orders={orders} onCancel={handleCancel} loading={loadOrders}/>}
        {tab==="inventory"&&<InventoryTab vehicles={vehicles} onStockChange={handleStock}/>}
        {tab==="admin"&&<AdminPanel vehicles={vehicles} onRefresh={fetchVehicles} notify={notify}/>}
      </div>
    </section>
  );
}


