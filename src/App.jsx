/* ======================================================
   IMPORTACIONES PRINCIPALES
   Aquí traemos todo lo que este archivo necesita
   ====================================================== */

// Hook de React para manejar estados (datos que cambian en pantalla)
import { useState } from "react";

// Datos principales de la colección de vehículos
import { CORE_COLLECTION } from "./data";

// Componentes reutilizables de la aplicación
import Header from "./components/Header/Header";
import CoreConcept from "./components/CoreConcept/CoreConcept";
import TaButton from "./components/TabButton/TabButton";
import TabButtonPrice from "./components/TabButton/TabButtonPrice";
import TabButtonStockDefinition from "./components/TabButton/TabButtonStockDefinition";

// Estilos globales
import "./index.css";

/* ======================================================
   COMPONENTE PRINCIPAL DE LA APLICACIÓN
   App es el corazón de toda la interfaz
   ====================================================== */

export default function App() {
  /* --------------------------------------------------
     ESTADOS (useState)
     Guardan información que cambia con eventos
     -------------------------------------------------- */

  // Guarda el modelo seleccionado
  const [selectedModel, setSelectedModel] = useState(null);

  // Guarda el precio del vehículo seleccionado
  const [selectedPrice, setSelectedPrice] = useState(null);

  // Guarda el stock y especificaciones del vehículo
  const [selectedSpecs, setSelectedSpecs] = useState(null);

  /* --------------------------------------------------
     FUNCIONES MANEJADORAS DE EVENTOS
     Se ejecutan cuando el usuario hace clic
     -------------------------------------------------- */

  // Actualiza el modelo seleccionado
  function handleFrancisCustom(carName) {
    setSelectedModel(carName);
  }

  // Actualiza el precio seleccionado
  function handleSelectPrice(carPrice) {
    setSelectedPrice(carPrice);
  }

  // Actualiza stock y especificaciones
  function handleSelectSpecs(carSpecs) {
    setSelectedSpecs(carSpecs);
  }

  /* ======================================================
     RENDERIZADO (JSX)
     Todo lo que se muestra en pantalla
     ====================================================== */

  return (
    <div className="app-container">
      {/* ---------- HEADER PRINCIPAL ---------- */}
      <Header />

      <main>
        {/* ==================================================
           SECCIÓN 1: CATÁLOGO DE VEHÍCULOS
           Se generan tarjetas dinámicamente desde data.js
           ================================================== */}
        <section id="CoreConcepts" className="section-showcase">
          <h2 className="section-title">Exclusive Fleet</h2>

          <div className="cards-container">
            {CORE_COLLECTION.map((car, index) => (
              <CoreConcept
                key={index} // Identificador único
                image={car.src} // Imagen del vehículo
                model={car.model} // Nombre del modelo
                price={car.valuation} // Precio
                availability={car.stock} // Stock disponible
                description={car.description} // Descripción
              />
            ))}
          </div>
        </section>

        {/* ==================================================
           SUITE DE INTERACCIONES
           Eventos controlados por botones
           ================================================== */}
        <div className="interaction-suite">
          {/* ----------------------------------------------
             INTERACCIÓN 1: SELECCIÓN DE MODELO
             ---------------------------------------------- */}
          <section id="reactExamples" className="interaction-panel">
            <h2 className="panel-title">Model Configuration</h2>

            <menu className="tab-bar">
              <TaButton
                onSelect={() =>
                  handleFrancisCustom(
                    "BUGATTI: Active aerodynamics, ECU performance optimization, bespoke luxury interior."
                  )
                }
              >
                Bugatti
              </TaButton>
              <TaButton
                onSelect={() =>
                  handleFrancisCustom(
                    "FERRARI ROMA: Valved performance exhaust, adaptive lowered suspension, carbon driver package."
                  )
                }
              >
                Ferrari Roma
              </TaButton>
              <TaButton
                onSelect={() =>
                  handleFrancisCustom(
                    "PAGANI HUAYRA: Track-focused active aero, titanium exhaust system, bespoke atelier interior."
                  )
                }
              >
                Pagani Huayra
              </TaButton>
              <TaButton
                onSelect={() =>
                  handleFrancisCustom(
                    "ROLLS-ROYCE: Custom starlight headliner, Black Badge performance tuning, full bespoke leather."
                  )
                }
              >
                Rolls Royce
              </TaButton>
              <TaButton
                onSelect={() =>
                  handleFrancisCustom(
                    "TOYOTA SUPRA MK5: Stage 2 turbo upgrade, adjustable coilovers, widebody aerodynamic kit."
                  )
                }
              >
                Toyota Supra MK5
              </TaButton>
              <TaButton
                onSelect={() =>
                  handleFrancisCustom(
                    "KOENIGSEGG REGERA: Hybrid power optimization, advanced weight reduction, high-speed aero package."
                  )
                }
              >
                Koenigsegg Regera
              </TaButton>
              <TaButton
                onSelect={() =>
                  handleFrancisCustom(
                    "LAMBORGHINI VENENO: Track-optimized aero, Inconel F1 exhaust, race-focused Alcantara interior."
                  )
                }
              >
                Lamborghini Veneno
              </TaButton>
              <TaButton
                onSelect={() =>
                  handleFrancisCustom(
                    "ASTON MARTIN VALKYRIE: Motorsport suspension tuning, hybrid performance boost, minimalist carbon interior."
                  )
                }
              >
                Aston Martin Valkyrie
              </TaButton>
            </menu>

            {/* Renderizado condicional */}
            <div className="display-surface">
              {selectedModel ? (
                <div className="fade-in">
                  <span className="label">Selected Hypercar</span>
                  <span className="value">{selectedModel}</span>
                </div>
              ) : (
                <span className="placeholder">Select a model to begin</span>
              )}
            </div>
          </section>

          {/* ----------------------------------------------
             INTERACCIÓN 2: PRECIO DEL VEHÍCULO
             ---------------------------------------------- */}
          <section id="reactExamples2" className="interaction-panel">
            <h2 className="panel-title">Valuation Assessment</h2>

            <menu className="tab-bar">
              <TabButtonPrice
                onSelect={() =>
                  handleSelectPrice(
                    "Bugatti valued at €4M, enhanced with active aerodynamics, ECU performance tuning, and a fully bespoke luxury interior."
                  )
                }
              >
                Bugatti
              </TabButtonPrice>

              <TabButtonPrice
                onSelect={() =>
                  handleSelectPrice(
                    "Ferrari Roma valued at €300K, upgraded with a valved sport exhaust, adaptive suspension, and carbon fiber driver package."
                  )
                }
              >
                Ferrari Roma
              </TabButtonPrice>

              <TabButtonPrice
                onSelect={() =>
                  handleSelectPrice(
                    "Pagani Huayra valued at €3M, refined with track-focused active aerodynamics, titanium exhaust, and handcrafted bespoke interior."
                  )
                }
              >
                Pagani Huayra
              </TabButtonPrice>

              <TabButtonPrice
                onSelect={() =>
                  handleSelectPrice(
                    "Rolls-Royce valued at €400K, customized with a starlight headliner, Black Badge tuning, and full bespoke leather interior."
                  )
                }
              >
                Rolls Royce
              </TabButtonPrice>

              <TabButtonPrice
                onSelect={() =>
                  handleSelectPrice(
                    "Toyota Supra MK5 valued at €400K, modified with a Stage 2 turbo upgrade, adjustable coilovers, and widebody aerodynamic kit."
                  )
                }
              >
                Toyota Supra MK5
              </TabButtonPrice>

              <TabButtonPrice
                onSelect={() =>
                  handleSelectPrice(
                    "Koenigsegg Regera valued at €4M, optimized with hybrid power enhancement, advanced weight reduction, and high-speed aero package."
                  )
                }
              >
                Koenigsegg Regera
              </TabButtonPrice>

              <TabButtonPrice
                onSelect={() =>
                  handleSelectPrice(
                    "Lamborghini Veneno valued at €9M, configured with track-optimized aerodynamics, Inconel F1 exhaust, and Alcantara race interior."
                  )
                }
              >
                Lamborghini Veneno
              </TabButtonPrice>

              <TabButtonPrice
                onSelect={() =>
                  handleSelectPrice(
                    "Aston Martin Valkyrie valued at €2.5M, upgraded with motorsport suspension tuning, hybrid performance boost, and carbon minimalist cockpit."
                  )
                }
              >
                Aston Martin Valkyrie
              </TabButtonPrice>
            </menu>

            <div className="display-surface">
              {selectedPrice ? (
                <div className="fade-in">
                  <span className="label">Investment Value</span>
                  <span className="value">{selectedPrice}</span>
                </div>
              ) : (
                <span className="placeholder">
                  Select a model to view pricing
                </span>
              )}
            </div>
          </section>

          {/* ----------------------------------------------
             INTERACCIÓN 3: STOCK Y ESPECIFICACIONES
             ---------------------------------------------- */}
          <section
            id="ReactExamplesStockDefinition"
            className="interaction-panel"
          >
            <h2 className="panel-title">Inventory & Specifications</h2>

            <menu className="tab-bar">
              <TabButtonStockDefinition
                onSelect={() =>
                  handleSelectSpecs(
                    "5 Units Available~The pinnacle of automotive engineering featuring a quad-turbocharged W16 powerplant and unparalleled luxury."
                  )
                }
              >
                Bugatti Chiron
              </TabButtonStockDefinition>

              <TabButtonStockDefinition
                onSelect={() =>
                  handleSelectSpecs(
                    "15 Units Available~A contemporary representation of the 'La Nuova Dolce Vita', combining timeless elegance with a high-performance V8."
                  )
                }
              >
                Ferrari Roma
              </TabButtonStockDefinition>

              <TabButtonStockDefinition
                onSelect={() =>
                  handleSelectSpecs(
                    "3 Units Available~A masterful fusion of art and science, handcrafted with an AMG-sourced V12 and active aerodynamics."
                  )
                }
              >
                Pagani Huayara
              </TabButtonStockDefinition>

              <TabButtonStockDefinition
                onSelect={() =>
                  handleSelectSpecs(
                    "5 Units Available~The definitive symbol of opulence and bespoke craftsmanship, offering an effortless 'Magic Carpet Ride"
                  )
                }
              >
                Rolls-Royce Phantom
              </TabButtonStockDefinition>

              <TabButtonStockDefinition
                onSelect={() =>
                  handleSelectSpecs(
                    "9 Units Available~Precision-engineered sports performance featuring a signature straight-six turbocharged engine and track-focused agility."
                  )
                }
              >
                Toyota Supra MK5
              </TabButtonStockDefinition>

              <TabButtonStockDefinition
                onSelect={() =>
                  handleSelectSpecs(
                    "1 Unit Available~An innovative plug-in hybrid megacar utilizing the Direct Drive system to redefine hypercar acceleration."
                  )
                }
              >
                Koenigsegg Regera
              </TabButtonStockDefinition>

              <TabButtonStockDefinition
                onSelect={() =>
                  handleSelectSpecs(
                    "2 Units Available~An ultra-exclusive tribute to aeronautical design, pushing the boundaries of the naturally aspirated V12."
                  )
                }
              >
                Lamborghini Veneno
              </TabButtonStockDefinition>

              <TabButtonStockDefinition
                onSelect={() =>
                  handleSelectSpecs(
                    "8 Units Available~Born from a collaboration with Red Bull Racing, this F1-inspired masterpiece delivers raw, track-oriented performance."
                  )
                }
              >
                Aston Martin Valkyrie
              </TabButtonStockDefinition>

              <TabButtonStockDefinition
                onSelect={() =>
                  handleSelectSpecs(
                    "2 Units Available~The Hennessey Venom F5 is an ultra-high-performance hypercar built for extreme speed. It uses a carbon-fiber chassis and a twin-turbo V8 engine producing over 1,800 horsepower, with rear-wheel drive and advanced aerodynamics."
                  )
                }
              >
                Hennessey Venom F5
              </TabButtonStockDefinition>
            </menu>

            <div className="display-surface">
              {selectedSpecs ? (
                <div className="fade-in">
                  <span className="label">Technical Brief</span>
                  <p className="value-text">{selectedSpecs}</p>
                </div>
              ) : (
                <span className="placeholder">
                  Select a model to view availability
                </span>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
