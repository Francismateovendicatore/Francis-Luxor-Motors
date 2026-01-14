/* ======================================================
   SECCIÓN: GALERÍA EXCLUSIVA DE VEHÍCULOS
   ======================================================

   RESPONSABILIDAD:
   - Renderizar una colección curada de vehículos
   - Consumir datos centralizados
   - Mostrar tarjetas visuales reutilizables

   TIPO DE COMPONENTE:
   - PRESENTACIONAL
   - NO usa estado
   - NO maneja lógica de negocio
   - SOLO renderiza UI
*/

/* ======================================================
   IMPORTACIONES
   ====================================================== */

// Importamos el dataset central de vehículos
// Contiene SOLO datos (array de objetos)
// No contiene JSX ni lógica
import { CORE_COLLECTION } from "../../data";

// Importamos el componente visual de tarjeta
// Representa UN solo vehículo
// Es reutilizable y desacoplado
import CoreConcept from "../CoreConcept/CoreConcept";

// Importamos el componente Section
// Sirve como molde base de secciones
// Evita repetir estructura HTML
import Section from "../Section/Section";

/* ======================================================
   COMPONENTE: ExclusiveFleet
   ====================================================== */

export default function ExclusiveFleet() {
  return (
    /* --------------------------------------------------
       CONTENEDOR PRINCIPAL DE SECCIÓN
       --------------------------------------------------

       Section:
       - Componente reutilizable
       - Recibe props para personalizar:
         • id → navegación / scroll
         • title → título visible
         • className → estilos específicos
    */
    <Section
      id="core-concepts"
      title="Exclusive Fleet"
      className="section-showcase"
    >
      {/* --------------------------------------------------
         ETIQUETA DECORATIVA SUPERIOR
         --------------------------------------------------
         - Elemento puramente visual
         - No contiene lógica
         - Refuerza estética premium
      */}
      <span className="luxury-label">Curated Selection</span>

      {/* --------------------------------------------------
         CONTENEDOR DE TARJETAS
         --------------------------------------------------
         - Agrupa todas las tarjetas
         - Controla el layout con CSS
      */}
      <div className="cards-container">
        {/* --------------------------------------------------
           RENDER DINÁMICO DE TARJETAS
           --------------------------------------------------

           map():
           - Recorre el array CORE_COLLECTION
           - Por cada vehículo:
             → Renderiza un CoreConcept
        */}
        {CORE_COLLECTION.map((car) => (
          <CoreConcept
            /* ----------------------------------------------
               key:
               - Identificador ÚNICO y ESTABLE
               - Requerido por React para listas
               - Usamos car.id (mejor práctica)
            */
            key={car.id}
            /* ----------------------------------------------
               PROPS PASADAS AL COMPONENTE HIJO
               ----------------------------------------------
               Cada prop es un dato específico del vehículo
               El componente hijo NO accede al dataset completo
            */
            image={car.src} // Imagen del vehículo
            model={car.model} // Nombre / modelo
            price={car.valuation} // Precio / valoración
            availability={car.stock} // Disponibilidad
            description={car.description} // Descripción técnica
          />
        ))}
      </div>
    </Section>
  );
}
