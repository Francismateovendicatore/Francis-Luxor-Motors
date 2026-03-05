import { useState } from "react";
import Header from "./components/Header/Header";
import ExclusiveFleet from "./components/Sections/ExclusiveFleet";
import ValuationAssessment from "./components/Sections/ValuationAssessment";
import InventorySpecs from "./components/Sections/InventorySpecs";
import CarDetailView from "./components/Sections/CarDetailView";
import { useVehicles } from "./hooks/useVehicles";
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
const DETAIL_IMAGES = { "bugatti-chiron": { engineImg: BugattiMotor, interiorImg: InteriorBugatti }, "ferrari-roma": { engineImg: MotorFerrari, interiorImg: InteriorFerrari }, "pagani-huayra": { engineImg: MotorPagani, interiorImg: InteriorPagani }, "rolls-royce-phantom": { engineImg: RollsRoyceMotor, interiorImg: InteriorRollsRoyce }, "toyota-supra-mk5": { engineImg: ToyotaMotor, interiorImg: ToyotaInterior }, "koenigsegg-regera": { engineImg: KoenigseggMotor, interiorImg: InteriorKoenigsegg }, "lamborghini-veneno": { engineImg: LamborghiniMotor, interiorImg: InteriorLamborghini }, "aston-martin-valkyrie": { engineImg: AstonMartinMotor, interiorImg: InteriorAstonMartin }, "hennessey-venom-f5": { engineImg: HennesseyMotor, interiorImg: InteriorHennessey } };
function modelToSlug(model) { return model.toLowerCase().replace(/\s+/g, "-"); }
export default function App() {
  const [selectedCar, setSelectedCar] = useState(null);
  const { vehicles } = useVehicles();
  const handleCloseDetail = () => setSelectedCar(null);
  const getCarDetailData = () => {
    if (!selectedCar) return null;
    const slug = modelToSlug(selectedCar);
    const carData = vehicles.find((v) => v.slug === slug);
    const images = DETAIL_IMAGES[slug];
    if (!carData || !images) return null;
    return { engineImg: images.engineImg, interiorImg: images.interiorImg, engineDesc: carData.engine_desc, hp: carData.hp, top: carData.top, accent: carData.accent };
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
              <InventorySpecs />
            </div>
          </>
        )}
      </main>
    </div>
  );
}




