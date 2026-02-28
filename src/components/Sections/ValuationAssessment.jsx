/* ======================================================
   IMPORTACIONES
   ====================================================== */

// useState es un HOOK de React.
// Sirve para guardar un dato que puede cambiar
// y provocar que el componente se vuelva a renderizar.
import { useState } from "react";

// TabButton es un componente reutilizable.
// Representa UNA pestaña (botón).
// ❌ No guarda estado
// ✅ Solo recibe props y ejecuta acciones
import TabButton from "../TabButton/TabButton";

// TabsMenu es un componente de COMPOSICIÓN.
// Se encarga de:
// - organizar los botones
// - renderizar el contenido (children)
import TabsMenu from "../TabsMenu/TabsMenu";

// Section es un componente base de layout.
// Evita repetir <section>, títulos y estructura.
import Section from "../Section/Section";

/* ======================================================
   COMPONENTE: ValuationAssessment
   ======================================================

   RESPONSABILIDAD:
   - Permitir seleccionar un vehículo
   - Mostrar su valoración de mercado
   - Controlar la interacción con estado LOCAL

   IMPORTANTE:
   - Este componente PIENSA
   - Los hijos solo RENDERIZAN
*/

export default function ValuationAssessment() {
  /* --------------------------------------------------
     ESTADO LOCAL
     --------------------------------------------------

     selectedPrice:
     - Guarda un TEXTO (string)
     - Representa la valoración seleccionada
     - null = no hay selección todavía
  */
  const [selectedPrice, setSelectedPrice] = useState(null);

  return (
    /* ==================================================
       SECCIÓN PRINCIPAL
       ==================================================

       Section:
       - Componente reutilizable
       - title → título visible
       - id → navegación / testing
       - className → estilos
    */
    <Section
      title="Asset Valuation"
      id="reactExamples2"
      className="interaction-panel"
    >
      {/* Contenedor visual (solo CSS, sin lógica) */}
      <div
        className="gold-theme"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* ==================================================
           TABS MENU
           ==================================================

           TabsMenu:
           - NO sabe qué botones hay
           - NO sabe qué hacen
           - SOLO organiza estructura
        */}
        <TabsMenu
          /* ----------------------------------------------
             BOTONES (PROPS)
             ----------------------------------------------

             Enviamos TODOS los botones como JSX.
             Esto es composición, no lógica.
          */
          buttons={
            <>
              {/* ========= BUGATTI ========= */}
              <TabButton
                // El botón está activo si:
                // - el texto contiene "€4M"
                // - y contiene "Bugatti"
                isSelected={
                  selectedPrice?.includes("€4M") &&
                  selectedPrice?.includes("Bugatti")
                }
                // Al hacer click:
                // actualizamos el estado
                onSelect={() =>
                  setSelectedPrice(
                    "Bugatti valued at €4M, enhanced with active aerodynamics and bespoke luxury."
                  )
                }
              >
                Bugatti
              </TabButton>

              {/* ========= FERRARI ========= */}
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

              {/* ========= PAGANI ========= */}
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

              {/* ========= ROLLS ROYCE ========= */}
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

              {/* ========= TOYOTA ========= */}
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

              {/* ========= KOENIGSEGG ========= */}
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

              {/* ========= LAMBORGHINI ========= */}
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

              {/* ========= ASTON MARTIN ========= */}
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
             ZONA DE CONTENIDO (children)
             ==================================================

             Aquí mostramos la información
             basada en el ESTADO
          */}
          <div className="display-surface">
            {selectedPrice ? (
              // Si hay selección
              <div className="fade-in">
                <span className="label">Current Market Valuation</span>

                <span className="value" style={{ color: "#d4af37" }}>
                  {selectedPrice}
                </span>
              </div>
            ) : (
              // Si NO hay selección
              <span className="placeholder">Select Asset for Valuation</span>
            )}
          </div>
        </TabsMenu>
      </div>
    </Section>
  );
}
