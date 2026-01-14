/* ======================================================
   IMPORTACIONES
   ====================================================== */

// Importamos el hook useState desde React.
// useState permite que un componente funcional:
// - tenga memoria (estado)
// - reaccione a cambios
// - se vuelva a renderizar automáticamente cuando el estado cambia
import { useState } from "react";

// Importamos el componente TabButton.
// Este componente es REUTILIZABLE y representa:
// - un botón tipo pestaña
// - con estilos propios
// - con control visual de activo / inactivo
// - y con un evento de selección (onSelect)
import TabButton from "../TabButton/TabButton";

/* ======================================================
   COMPONENTE: ValuationAssessment
   ======================================================

   RESPONSABILIDAD DEL COMPONENTE:
   - Permitir seleccionar un vehículo
   - Mostrar su valoración de mercado
   - Gestionar la selección usando estado LOCAL

   IMPORTANTE:
   - No usa estado global
   - No depende de otros componentes
   - Sigue el patrón React clásico:
     INTERACCIÓN → ESTADO → RENDER
*/

export default function ValuationAssessment() {
  /* --------------------------------------------------
     ESTADO LOCAL DEL COMPONENTE
     --------------------------------------------------

     selectedPrice:
     - Guarda un TEXTO COMPLETO con la valoración
     - Inicialmente es null (no hay selección)
     - Cuando cambia:
         React vuelve a ejecutar el render()
         y actualiza la interfaz automáticamente
  */
  const [selectedPrice, setSelectedPrice] = useState(null);

  return (
    /* ==================================================
       SECCIÓN PRINCIPAL
       ==================================================

       section:
       - Elemento semántico HTML
       - id se puede usar para navegación, scroll o testing
       - className define el estilo del panel
    */
    <section id="reactExamples2" className="interaction-panel">
      {/* Título principal del panel */}
      <h2 className="panel-title">Asset Valuation</h2>

      {/* ==================================================
         CONTENEDOR VISUAL DE BOTONES
         ==================================================

         gold-theme:
         - Solo afecta a la estética (CSS)
         - No tiene lógica de React
         - Separación clara entre diseño y funcionalidad
      */}
      <div className="gold-theme">
        {/* menu:
            - Contenedor semántico
            - Agrupa opciones relacionadas
        */}
        <menu className="tab-bar">
          {/* ==================================================
             TAB BUTTONS (BOTONES DE SELECCIÓN)
             ==================================================

             Cada TabButton:
             - No guarda estado propio
             - Recibe información desde el componente padre
             - Notifica al padre cuando se hace click
          */}

          <TabButton
            // isSelected:
            // Evalúa si el texto actual contiene "€4M"
            // Si es true → el botón se muestra activo
            isSelected={selectedPrice?.includes("€4M")}
            // onSelect:
            // Cuando el usuario hace click:
            // - Se actualiza el estado selectedPrice
            // - React re-renderiza el componente
            onSelect={() =>
              setSelectedPrice(
                "Bugatti valued at €4M, enhanced with active aerodynamics and bespoke luxury."
              )
            }
          >
            Bugatti
          </TabButton>

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

          {/* --------------------------------------------------
             CASO ESPECIAL
             --------------------------------------------------
             Aquí usamos DOS condiciones para evitar
             que Rolls Royce y Toyota se confundan,
             ya que ambos tienen el mismo valor (€400K)
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
        </menu>
      </div>

      {/* ==================================================
         ZONA DE RESULTADO / VISUALIZACIÓN
         ==================================================

         Renderizado condicional:
         - Si selectedPrice tiene valor → mostramos la info
         - Si es null → mostramos mensaje de espera
      */}
      <div className="display-surface">
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
          <span className="placeholder">Select Asset for Valuation</span>
        )}
      </div>
    </section>
  );
}
