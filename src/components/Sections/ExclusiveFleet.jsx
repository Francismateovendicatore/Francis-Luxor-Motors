/* ======================================================
   SECCIÓN: GALERÍA EXCLUSIVA DE VEHÍCULOS
   - Renderiza una colección curada de vehículos
   - Basada en datos centralizados
   - Arquitectura limpia y escalable
   ====================================================== */

// Dataset central (datos puros, sin lógica)
import { CORE_COLLECTION } from "../../data";

// Componente visual reutilizable
import CoreConcept from "../CoreConcept/CoreConcept";

// Molde base de sección
import Section from "../Section/Section";

/* ======================================================
   COMPONENTE ExclusiveFleet
   - Componente PRESENTACIONAL
   - No maneja estado
   - No contiene lógica de negocio
   ====================================================== */

export default function ExclusiveFleet() {
  return (
    <Section
      id="core-concepts"
      title="Exclusive Fleet"
      className="section-showcase"
    >
      {/* Etiqueta decorativa superior */}
      <span className="luxury-label">Curated Selection</span>

      {/* Contenedor de tarjetas */}
      <div className="cards-container">
        {CORE_COLLECTION.map((car) => (
          <CoreConcept
            key={car.id} // clave estable y correcta
            image={car.src}
            model={car.model}
            price={car.valuation}
            availability={car.stock}
            description={car.description}
          />
        ))}
      </div>
    </Section>
  );
}
