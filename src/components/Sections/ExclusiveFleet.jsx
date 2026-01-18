import { CORE_COLLECTION } from "../../data";
import CoreConcept from "../CoreConcept/CoreConcept";
import Section from "../Section/Section";

/* =====================================================
   COMPONENTE: ExclusiveFleet
   Ahora recibe onSelectCar para permitir la entrada al detalle
   ===================================================== */
export default function ExclusiveFleet({ onSelectCar }) {
  return (
    <Section
      id="core-concepts"
      title="Exclusive Fleet"
      className="section-showcase"
    >
      <div className="cards-container">
        {CORE_COLLECTION.map((car) => (
          <CoreConcept
            key={car.id}
            image={car.src}
            model={car.model}
            price={car.valuation}
            availability={car.stock}
            description={car.description}
            // NUEVO: Cuando se haga click en la tarjeta o su botón,
            // el estado de App cambiará al modelo de este coche.
            onSelect={() => onSelectCar(car.model)}
          />
        ))}
      </div>
    </Section>
  );
}
