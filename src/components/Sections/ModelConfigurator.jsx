/* ======================================================
   IMPORTACIONES
   ====================================================== */

// Importamos el hook useState desde React.
// useState permite que el componente:
// - tenga estado propio
// - reaccione a interacciones del usuario
// - se re-renderice automáticamente
import { useState } from "react";

// Importamos el componente TabButton.
// Representa una pestaña individual:
// - NO guarda estado
// - recibe props
// - ejecuta eventos
import TabButton from "../TabButton/TabButton";

// Importamos TabsMenu.
// TabsMenu es un componente de COMPOSICIÓN:
// - Renderiza los botones
// - Renderiza el contenido (children)
// - NO tiene lógica de negocio
import TabsMenu from "../TabsMenu/TabsMenu";

/* ======================================================
   COMPONENTE: ModelConfigurator
   ======================================================

   RESPONSABILIDAD:
   - Permitir seleccionar un modelo
   - Mostrar su configuración técnica
   - Controlar todo con estado LOCAL

   PATRÓN REACT:
   Evento → Estado → Render

   NOTA IMPORTANTE:
   - TabsMenu solo organiza
   - ModelConfigurator piensa
*/

export default function ModelConfigurator() {
  /* --------------------------------------------------
     ESTADO LOCAL
     --------------------------------------------------

     selectedModel:
     - Guarda un STRING con la descripción
     - Inicia en null (sin selección)
     - Al cambiar:
         React vuelve a ejecutar el render
  */
  const [selectedModel, setSelectedModel] = useState(null);

  /* --------------------------------------------------
     FUNCIÓN MANEJADORA
     --------------------------------------------------

     handleSelect:
     - Centraliza la actualización del estado
     - Evita repetir setSelectedModel en el JSX
     - Hace el código más limpio y mantenible
  */
  const handleSelect = (description) => {
    setSelectedModel(description);
  };

  return (
    /* ==================================================
       SECCIÓN PRINCIPAL
       ================================================== */
    <section id="reactExamples" className="interaction-panel">
      {/* Título principal */}
      <h2 className="panel-title">Bespoke Configurator</h2>

      {/* Contenedor visual (solo CSS, cero lógica) */}
      <div className="gold-theme">
        {/* ==================================================
           TABS MENU
           ==================================================

           TabsMenu:
           - NO sabe qué botones hay
           - NO sabe qué muestran
           - SOLO renderiza estructura
        */}
        <TabsMenu
          /* ----------------------------------------------
             CONTENEDOR DE BOTONES
             ----------------------------------------------
             Usamos <menu> por semántica
          */
          ButtonsContainer="menu"
          /* ----------------------------------------------
             BOTONES (PROPS)
             ----------------------------------------------
             Enviamos todos los TabButton como JSX
          */
          buttons={
            <>
              <TabButton
                // Activo si el texto contiene "BUGATTI"
                isSelected={selectedModel?.includes("BUGATTI")}
                // Al hacer click:
                // → actualizamos el estado
                onSelect={() =>
                  handleSelect(
                    "BUGATTI CHIRON: Active aerodynamics, ECU performance optimization, bespoke luxury interior."
                  )
                }
              >
                Bugatti Chiron
              </TabButton>

              <TabButton
                isSelected={selectedModel?.includes("FERRARI")}
                onSelect={() =>
                  handleSelect(
                    "FERRARI ROMA: Valved performance exhaust, adaptive lowered suspension, carbon driver package."
                  )
                }
              >
                Ferrari Roma
              </TabButton>

              <TabButton
                isSelected={selectedModel?.includes("PAGANI")}
                onSelect={() =>
                  handleSelect(
                    "PAGANI HUAYRA: Track-focused active aero, titanium exhaust system, bespoke atelier interior."
                  )
                }
              >
                Pagani Huayra
              </TabButton>

              <TabButton
                isSelected={selectedModel?.includes("ROLLS")}
                onSelect={() =>
                  handleSelect(
                    "ROLLS-ROYCE: Custom starlight headliner, Black Badge performance tuning, full bespoke leather."
                  )
                }
              >
                Rolls Royce
              </TabButton>

              <TabButton
                isSelected={selectedModel?.includes("TOYOTA")}
                onSelect={() =>
                  handleSelect(
                    "TOYOTA SUPRA MK5: Stage 2 turbo upgrade, adjustable coilovers, widebody aerodynamic kit."
                  )
                }
              >
                Toyota Supra MK5
              </TabButton>

              <TabButton
                isSelected={selectedModel?.includes("KOENIGSEGG")}
                onSelect={() =>
                  handleSelect(
                    "KOENIGSEGG REGERA: Hybrid power optimization, advanced weight reduction, high-speed aero package."
                  )
                }
              >
                Koenigsegg Regera
              </TabButton>

              <TabButton
                isSelected={selectedModel?.includes("LAMBORGHINI")}
                onSelect={() =>
                  handleSelect(
                    "LAMBORGHINI VENENO: Track-optimized aero, Inconel F1 exhaust, race-focused Alcantara interior."
                  )
                }
              >
                Lamborghini Veneno
              </TabButton>

              <TabButton
                isSelected={selectedModel?.includes("ASTON")}
                onSelect={() =>
                  handleSelect(
                    "ASTON MARTIN VALKYRIE: Motorsport suspension tuning, hybrid performance boost, minimalist carbon interior."
                  )
                }
              >
                Aston Martin Valkyrie
              </TabButton>
            </>
          }
        >
          {/* ==================================================
             CHILDREN (CONTENIDO)
             ==================================================

             children es el área que TabsMenu
             renderiza debajo de los botones
          */}
          <div className="display-surface">
            {selectedModel ? (
              <div className="fade-in">
                {/* Etiqueta descriptiva */}
                <span className="label">Configuration Blueprint</span>

                {/* Texto dinámico */}
                <span className="value">{selectedModel}</span>
              </div>
            ) : (
              // Mensaje por defecto
              <span className="placeholder">Initiate Model Selection</span>
            )}
          </div>
        </TabsMenu>
      </div>
    </section>
  );
}
