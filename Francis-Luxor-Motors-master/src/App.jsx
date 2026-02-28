// App.jsx
import { useState } from "react";
import Header from "./components/Header/Header";
import ExclusiveFleet from "./components/Sections/ExclusiveFleet";
import ValuationAssessment from "./components/Sections/ValuationAssessment";
import InventorySpecs from "./components/Sections/InventorySpecs";
import CarDetailView from "./components/Sections/CarDetailView";

import MotorBugatti from "./assets/MotorBugatti.png";
import InteriorBugatti from "./assets/InteriorBugatti.png";
import MotorFerrari from "./assets/MotorFerrari.png";
import InteriorFerrari from "./assets/InteriorFerrari.png";
import MotorPagani from "./assets/PiezasPagany.png";
import InteriorPagani from "./assets/InteriorPgany.png";
import MotorRolls from "./assets/MotorRollRoyce.png";
import InteriorRolls from "./assets/InterirorRollRoyce.png";
import MotorSupra from "./assets/supra-engine.jpg";
import InteriorSupra from "./assets/supra-interior.jpg";
import MotorKoenigsegg from "./assets/Koenigsegg Regera Engine.jpg";
import InteriorKoenigsegg from "./assets/KOENIGSEGG REGERA.jpg";
import MotorLambo from "./assets/MotorLambo.png";
import InteriorLambo from "./assets/lamborghini.jpg";
import MotorAston from "./assets/regera.jpg";
import InteriorAston from "./assets/Astonmartin.jpg";
import MotorHennessey from "./assets/venom-f5-engine.jpg";
import InteriorHennessey from "./assets/venom-f5.jpg";

const CAR_DETAIL_EXTRAS = {
  "bugatti-chiron": {
    engineImg: MotorBugatti,
    interiorImg: InteriorBugatti,
    engineDesc: "Corazón W16 de 8.0L con 4 turbocompresores. La perfecta sincronía entre 16 cilindros genera una sinfonía mecánica inigualable.",
    hp: "1,500",
    top: "420",
  },
  "ferrari-roma": {
    engineImg: MotorFerrari,
    interiorImg: InteriorFerrari,
    engineDesc: "V8 Turbo de 3.9L con respuesta de aceleración instantánea. El rugido del Cavallino Rampante en su máxima expresión contemporánea.",
    hp: "620",
    top: "320",
  },
  "pagani-huayra": {
    engineImg: MotorPagani,
    interiorImg: InteriorPagani,
    engineDesc: "V12 Biturbo de Mercedes-AMG. Arte italiano fusionado con ingeniería alemana de precisión absoluta.",
    hp: "800",
    top: "380",
  },
  "rolls-royce-phantom": {
    engineImg: MotorRolls,
    interiorImg: InteriorRolls,
    engineDesc: "V12 de 6.75L: El epítome del refinamiento británico. Un motor que susurra poder garantizando el legendario 'Magic Carpet Ride'.",
    hp: "571",
    top: "250",
  },
  "toyota-supra-mk5": {
    engineImg: MotorSupra,
    interiorImg: InteriorSupra,
    engineDesc: "Motor B58 de 3.0L Twin-Scroll Turbo desarrollado por BMW y optimizado por Toyota. Equilibrio perfecto entre potencia y fiabilidad.",
    hp: "382",
    top: "250",
  },
  "koenigsegg-regera-001": {
    engineImg: MotorKoenigsegg,
    interiorImg: InteriorKoenigsegg,
    engineDesc: "V8 Twin-Turbo Híbrido con sistema Direct Drive. Sin caja de cambios tradicional, 2,200 HP para una aceleración dimensional.",
    hp: "2,200",
    top: "410",
  },
  "lamborghini-veneno-007": {
    engineImg: MotorLambo,
    interiorImg: InteriorLambo,
    engineDesc: "V12 Aspirado de 6.5L. Pura brutalidad italiana sin asistencia artificial. Cada revolución es un grito de guerra.",
    hp: "750",
    top: "355",
  },
  "aston-martin-valkyrie": {
    engineImg: MotorAston,
    interiorImg: InteriorAston,
    engineDesc: "V12 Híbrido Cosworth de 6.5L desarrollado con Red Bull Racing. Tecnología F1 adaptada para carretera hasta 11,100 RPM.",
    hp: "1,160",
    top: "400",
  },
  "hennessey-venom-f5-003": {
    engineImg: MotorHennessey,
    interiorImg: InteriorHennessey,
    engineDesc: "V8 Twin-Turbo 'Fury' de 6.6L diseñado para romper el récord de 500 km/h. Potencia americana pura en chasis de carbono ultraligero.",
    hp: "1,817",
    top: "500",
  },
};

export default function App() {
  const [selectedCar, setSelectedCar] = useState(null);

  const handleSelectCar = (car) => setSelectedCar(car);
  const handleCloseDetail = () => setSelectedCar(null);

  const getCarDetailData = () => {
    if (!selectedCar) return null;
    return CAR_DETAIL_EXTRAS[selectedCar.id] || null;
  };

  return (
    <div className="app-container">
      <Header cartCount={0} />
      <main>
        {selectedCar && getCarDetailData() ? (
          <CarDetailView
            data={getCarDetailData()}
            name={selectedCar.model}
            onClose={handleCloseDetail}
          />
        ) : (
          <>
            <ExclusiveFleet onSelectCar={handleSelectCar} />
            <div className="interaction-suite">
              <ValuationAssessment />
              <InventorySpecs />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
