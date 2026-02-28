import CoreConcept from "../CoreConcept/CoreConcept";
import Section from "../Section/Section";
import { VEHICLES } from "../../data.js";
import Bugatti from "../../assets/Screenshot 2025-12-19 210503.png";
import FerrariRoma from "../../assets/Screenshot 2025-12-19 232440.png";
import PaganiHuayra from "../../assets/Screenshot 2025-12-19 233008.png";
import RollsRoyce from "../../assets/Screenshot 2025-12-19 233340.png";
import ToyotaSupra from "../../assets/Screenshot 2025-12-20 153558.png";
import KoenigseggRegera from "../../assets/Screenshot 2025-12-21 184431.png";
import LamborghiniVeneno from "../../assets/Screenshot 2025-12-21 184653.png";
import AstonMartinValkyrie from "../../assets/Screenshot 2025-12-21 185355.png";
import HennesseyVenomF5 from "../../assets/Screenshot 2025-12-31 134042.png";
const CAR_IMAGES = { "bugatti-chiron": Bugatti, "ferrari-roma": FerrariRoma, "pagani-huayra": PaganiHuayra, "rolls-royce-phantom": RollsRoyce, "toyota-supra-mk5": ToyotaSupra, "koenigsegg-regera": KoenigseggRegera, "lamborghini-veneno": LamborghiniVeneno, "aston-martin-valkyrie": AstonMartinValkyrie, "hennessey-venom-f5": HennesseyVenomF5 };
export default function ExclusiveFleet({ onSelectCar }) {
  return (
    <Section id="core-concepts" title="Exclusive Fleet" className="section-showcase">
      <div className="cards-container">
        {VEHICLES.map((car) => (
          <CoreConcept key={car.id} image={CAR_IMAGES[car.slug]} model={car.model} price={car.valuation} availability={car.stock} description={car.description} onSelect={() => onSelectCar(car.model)} />
        ))}
      </div>
    </Section>
  );
}
