/* ======================================================
   IMPORTACIONES
   ====================================================== */

// Importamos el hook useState desde React.
// useState permite que el componente:
// - tenga memoria (estado)
// - reaccione a eventos del usuario
// - se vuelva a renderizar automáticamente
import { useState } from "react";

// Importamos el componente TabButton.
// Representa un botón tipo pestaña reutilizable.
// NO guarda estado propio, solo:
// - recibe props
// - notifica eventos al padre
import TabButton from "../TabButton/TabButton";

// Importamos TabsMenu.
// Este componente se encarga de:
// - la estructura del menú de pestañas
// - renderizar los botones
// - renderizar el contenido (children)
import TabsMenu from "../TabsMenu/TabsMenu";

/* ======================================================
   COMPONENTE: ValuationAssessment
   ======================================================

   RESPONSABILIDAD:
   - Permitir seleccionar un vehículo
   - Mostrar su valoración de mercado
   - Gestionar la selección con estado LOCAL

   ARQUITECTURA:
   Usuario hace click →
   Cambia el estado →
   React re-renderiza →
   La UI se actualiza sola
*/

export default function ValuationAssessment() {
  /* --------------------------------------------------
     ESTADO LOCAL
     --------------------------------------------------

     selectedPrice:
     - Guarda un TEXTO descriptivo de la valoración
     - Inicia en null (no hay selección)
     - Cuando cambia:
         React vuelve a ejecutar el render()
  */
  const [selectedPrice, setSelectedPrice] = useState(null);

  return (
    /* ==================================================
       SECCIÓN PRINCIPAL DEL PANEL
       ==================================================

       section:
       - Elemento semántico HTML
       - id puede usarse para navegación o testing
       - className controla el diseño visual
    */
    <section id="reactExamples2" className="interaction-panel">
      {/* Título principal del panel */}
      <h2 className="panel-title">Asset Valuation</h2>

      {/* Contenedor visual (solo estética, no lógica) */}
      <div className="gold-theme">
        {/* ==================================================
           TABS MENU
           ==================================================

           TabsMenu NO sabe:
           - qué botones renderiza
           - qué lógica usan
           - qué contenido muestran

           Solo:
           - estructura
           - composición
        */}
        <TabsMenu
          /* ----------------------------------------------
             ButtonsContainer
             ----------------------------------------------
             Indicamos que los botones se rendericen
             dentro de un <menu> semántico
          */
          ButtonsContainer="menu"
          /* ----------------------------------------------
             buttons
             ----------------------------------------------
             Aquí enviamos TODOS los botones
             como JSX dinámico
          */
          buttons={
            <>
              {/* ===== BOTÓN BUGATTI ===== */}
              <TabButton
                // isSelected:
                // true si el estado contiene "€4M"
                // activa visualmente el botón
                isSelected={selectedPrice?.includes("€4M")}
                // onSelect:
                // cuando el usuario hace click
                // actualizamos el estado
                onSelect={() =>
                  setSelectedPrice(
                    "Bugatti valued at €4M, enhanced with active aerodynamics and bespoke luxury."
                  )
                }
              >
                Bugatti
              </TabButton>

              {/* ===== BOTÓN FERRARI ===== */}
              <TabButton
                isSelected={selectedPrice?.includes("€300K")}
                onSelect={() =>
                  setSelectedPrice(
                    "Ferrari Roma valued at €300K, upgraded with valved sport exhaust and carbon package."
                  )
                }
              >
                Ferrari Roma
              </TabButton>

              {/* ===== BOTÓN PAGANI ===== */}
              <TabButton
                isSelected={selectedPrice?.includes("€3M")}
                onSelect={() =>
                  setSelectedPrice(
                    "Pagani Huayra valued at €3M, refined with titanium exhaust and handcrafted interior."
                  )
                }
              >
                Pagani Huayra
              </TabButton>

              {/* ===== BOTÓN ROLLS ROYCE =====
                  Caso especial:
                  Comparte el mismo precio que Toyota (€400K),
                  por eso validamos también el nombre
              */}
              <TabButton
                isSelected={
                  selectedPrice?.includes("€400K") &&
                  selectedPrice?.includes("Rolls")
                }
                onSelect={() =>
                  setSelectedPrice(
                    "Rolls-Royce valued at €400K, customized with starlight headliner and Black Badge tuning."
                  )
                }
              >
                Rolls Royce
              </TabButton>

              {/* ===== BOTÓN TOYOTA ===== */}
              <TabButton
                isSelected={
                  selectedPrice?.includes("€400K") &&
                  selectedPrice?.includes("Toyota")
                }
                onSelect={() =>
                  setSelectedPrice(
                    "Toyota Supra MK5 valued at €400K, modified with Stage 2 turbo and widebody kit."
                  )
                }
              >
                Toyota Supra MK5
              </TabButton>

              {/* ===== BOTÓN KOENIGSEGG ===== */}
              <TabButton
                isSelected={selectedPrice?.includes("Regera")}
                onSelect={() =>
                  setSelectedPrice(
                    "Koenigsegg Regera valued at €4M, optimized with hybrid power and weight reduction."
                  )
                }
              >
                Koenigsegg Regera
              </TabButton>

              {/* ===== BOTÓN LAMBORGHINI ===== */}
              <TabButton
                isSelected={selectedPrice?.includes("€9M")}
                onSelect={() =>
                  setSelectedPrice(
                    "Lamborghini Veneno valued at €9M, configured with F1 exhaust and race interior."
                  )
                }
              >
                Lamborghini Veneno
              </TabButton>

              {/* ===== BOTÓN ASTON MARTIN ===== */}
              <TabButton
                isSelected={selectedPrice?.includes("€2.5M")}
                onSelect={() =>
                  setSelectedPrice(
                    "Aston Martin Valkyrie valued at €2.5M, upgraded with motorsport suspension."
                  )
                }
              >
                Aston Martin Valkyrie
              </TabButton>
            </>
          }
        >
          {/* ==================================================
             CHILDREN (ZONA DE VISUALIZACIÓN)
             ==================================================

             children es el contenido que TabsMenu
             renderiza DEBAJO de los botones
          */}
          <div className="display-surface">
            {/* Renderizado condicional */}
            {selectedPrice ? (
              <div className="fade-in">
                {/* Etiqueta descriptiva */}
                <span className="label">Current Market Valuation</span>

                {/* Texto dinámico basado en el estado */}
                <span className="value" style={{ color: "#d4af37" }}>
                  {selectedPrice}
                </span>
              </div>
            ) : (
              // Mensaje cuando no hay selección
              <span className="placeholder">Select Asset for Valuation</span>
            )}
          </div>
        </TabsMenu>
      </div>
    </section>
  );
}
