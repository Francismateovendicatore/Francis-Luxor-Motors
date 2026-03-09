import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import ExclusiveFleet from "./components/Sections/ExclusiveFleet";
import ValuationAssessment from "./components/Sections/ValuationAssessment";
import CarDetailView from "./components/Sections/CarDetailView";
import WhiteGloveServices from "./components/Sections/WhiteGloveServices";
import PurchaseMenu from "./components/Sections/PurchaseMenu";
import AdminPanel from "./components/Admin/AdminPanel";
import { useVehicles } from "./hooks/useVehicles";

// ── Static detail images (existing) ─────────────────────────
import BugattiMotor from "./assets/Screenshot 2026-01-17 201837.png";
import InteriorBugatti from "./assets/Screenshot 2026-01-17 200851.png";
import MotorFerrari from "./assets/Screenshot 2026-01-17 202433.png";
import InteriorFerrari from "./assets/Screenshot 2026-01-17 202537.png";
import MotorPagani from "./assets/Screenshot 2026-01-17 202705.png";
import InteriorPagani from "./assets/Screenshot 2026-01-17 202821.png";
import RollsRoyceMotor from "./assets/Screenshot 2026-01-19 204446.png";
import InteriorRollsRoyce from "./assets/Screenshot 2026-01-19 204610.png";
import ToyotaMotor from "./assets/2JZ GTE Turbo - 1200 HP Street_Strip Turnkey Engine Toyota Supra 3_0 _ eBay.jpg";
import ToyotaInterior from "./assets/Toyota Supra Interior.jpg";
import KoenigseggMotor from "./assets/Koenigsegg Regera Engine.jpg";
import InteriorKoenigsegg from "./assets/KOENIGSEGG REGERA.jpg";
import LamborghiniMotor from "./assets/Screenshot 2026-01-20 204812.png";
import InteriorLamborghini from "./assets/download (5).jpg";
import AstonMartinMotor from "./assets/Screenshot 2026-01-20 204957.png";
import InteriorAstonMartin from "./assets/Astonmartin.jpg";
import HennesseyMotor from "./assets/Venom F5 Revolution _ Hennessey Special Vehicles.jpg";
import InteriorHennessey from "./assets/Hennessey's Venom F5 Is Named After Tornados, and It Goes Like One Too.jpg";

const DETAIL_IMAGES = {
  "bugatti-chiron":       { engineImg: BugattiMotor,      interiorImg: InteriorBugatti },
  "ferrari-roma":         { engineImg: MotorFerrari,       interiorImg: InteriorFerrari },
  "pagani-huayra":        { engineImg: MotorPagani,        interiorImg: InteriorPagani },
  "rolls-royce-phantom":  { engineImg: RollsRoyceMotor,    interiorImg: InteriorRollsRoyce },
  "toyota-supra-mk5":     { engineImg: ToyotaMotor,        interiorImg: ToyotaInterior },
  "koenigsegg-regera":    { engineImg: KoenigseggMotor,    interiorImg: InteriorKoenigsegg },
  "lamborghini-veneno":   { engineImg: LamborghiniMotor,   interiorImg: InteriorLamborghini },
  "aston-martin-valkyrie":{ engineImg: AstonMartinMotor,   interiorImg: InteriorAstonMartin },
  "hennessey-venom-f5":   { engineImg: HennesseyMotor,     interiorImg: InteriorHennessey },
};

function modelToSlug(model) {
  return model.toLowerCase().replace(/\s+/g, "-");
}

// ── Toast notification system ────────────────────────────────
function Toast({ message, type, visible }) {
  if (!visible) return null;
  return (
    <div style={{
      position: "fixed", bottom: "2rem", right: "2rem", zIndex: 9999,
      background: type === "success" ? "#0f1a0f" : "#1a0f0f",
      border: `1px solid ${type === "success" ? "#27ae60" : "#c0392b"}`,
      color: type === "success" ? "#7ecf7e" : "#e07070",
      fontFamily: "'Montserrat', sans-serif", fontSize: "0.75rem",
      letterSpacing: "0.1em", padding: "1rem 1.5rem",
      maxWidth: "360px", lineHeight: 1.5,
      boxShadow: "0 4px 24px rgba(0,0,0,0.6)",
      animation: "toastIn 0.3s ease",
    }}>
      <style>{`@keyframes toastIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }`}</style>
      {type === "success" ? "✓ " : "✕ "}{message}
    </div>
  );
}

export default function App() {
  const [selectedCar, setSelectedCar] = useState(null);
  const [toast, setToast]             = useState({ msg: "", type: "success", vis: false });
  const { vehicles, fetchVehicles }   = useVehicles();

  // Show toast notification
  function notify(msg, type = "success") {
    setToast({ msg, type, vis: true });
    setTimeout(() => setToast(t => ({ ...t, vis: false })), 4000);
  }

  const handleCloseDetail = () => setSelectedCar(null);

  const getCarDetailData = () => {
    if (!selectedCar) return null;
    const slug    = modelToSlug(selectedCar);
    const carData = vehicles.find((v) => v.slug === slug);
    const images  = DETAIL_IMAGES[slug];
    if (!carData || !images) return null;
    return {
      engineImg:   images.engineImg,
      interiorImg: images.interiorImg,
      engineDesc:  carData.engine_desc,
      hp:          carData.hp,
      top:         carData.top,
      accent:      carData.accent,
    };
  };

  const carDetail = getCarDetailData();

  return (
    <div className="app-container">
      <Header cartCount={0} />
      <main>
        {selectedCar && carDetail ? (
          <CarDetailView data={carDetail} name={selectedCar} onClose={handleCloseDetail} />
        ) : (
          <>
            <ExclusiveFleet onSelectCar={setSelectedCar} />
            <div className="interaction-suite">
              <ValuationAssessment />
              <WhiteGloveServices />
              <PurchaseMenu />
            </div>

            {/* ── Admin Panel — hidden at bottom, accessible via scroll ── */}
            <section id="admin-portal" style={{ padding: "4rem 2rem", background: "#080808" }}>
              <AdminPanel
                vehicles={vehicles}
                onRefresh={fetchVehicles}
                notify={notify}
              />
            </section>
          </>
        )}
      </main>
      <Toast message={toast.msg} type={toast.type} visible={toast.vis} />
    </div>
  );
}
