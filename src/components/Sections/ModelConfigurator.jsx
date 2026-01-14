/* ======================================================
   IMPORTACIONES
   ====================================================== */

// Importamos el hook useState desde React
// useState permite que un componente funcional
// mantenga y controle su propio estado interno
import { useState } from "react";

// Importamos el componente TabButton
// Este componente representa cada botón de selección
// y encapsula:
// - estilos
// - eventos
// - estado visual (activo / inactivo)
import TabButton from "../TabButton/TabButton";

/* ======================================================
   COMPONENTE: ModelConfigurator
   ======================================================

   RESPONSABILIDAD DEL COMPONENTE:
   - Permitir seleccionar un modelo de vehículo
   - Mostrar una configuración técnica asociada
   - Controlar todo mediante estado local

   PATRÓN UTILIZADO:
   Botón → Evento → Cambio de estado → Render condicional

   Este es un patrón fundamental en React
   y muy usado en aplicaciones reales
*/

export default function ModelConfigurator() {
  /* --------------------------------------------------
     ESTADO LOCAL DEL COMPONENTE
     --------------------------------------------------

     selectedModel:
     - Guarda un STRING con la descripción del modelo
     - Inicialmente es null (no hay selección)
     - Cuando cambia, React vuelve a renderizar
       el componente automáticamente
  */
  const [selectedModel, setSelectedModel] = useState(null);

  /* --------------------------------------------------
     FUNCIÓN MANEJADORA DE SELECCIÓN
     --------------------------------------------------

     handleSelect:
     - Recibe una descripción (string)
     - Actualiza el estado selectedModel
     - Centraliza la lógica de actualización
     - Evita repetir setSelectedModel en el JSX
     - Hace el código más limpio y profesional
  */
  const handleSelect = (description) => {
    setSelectedModel(description);
  };

  return (
    /* ==================================================
       SECCIÓN PRINCIPAL DEL CONFIGURADOR
       ==================================================

       section:
       - Elemento semántico HTML
       - id permite navegación, scroll o anclajes
       - className controla el estilo visual
    */
    <section id="reactExamples" className="interaction-panel">
      {/* Título principal de la sección */}
      <h2 className="panel-title">Bespoke Configurator</h2>

      {/* ==================================================
         CONTENEDOR DE BOTONES
         ==================================================

         gold-theme:
         - Solo controla la estética (CSS)
         - No tiene lógica de negocio
      */}
      <div className="gold-theme">
        {/* menu:
            - Contenedor semántico para opciones
            - Agrupa botones relacionados
        */}
        <menu className="tab-bar">
          {/* ==================================================
             TAB BUTTONS
             ==================================================

             Cada TabButton:
             - Evalúa si está activo con isSelected
             - Ejecuta una acción al hacer click
             - No guarda estado propio
             - Solo notifica al componente padre
          */}

          <TabButton
            // Determina si este botón está seleccionado
            // Se basa en si el texto actual contiene "BUGATTI"
            isSelected={selectedModel?.includes("BUGATTI")}
            // Al hacer clic:
            // - Se llama a handleSelect
            // - Se actualiza el estado con la configuración
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
        </menu>
      </div>

      {/* ==================================================
         ÁREA DE RESULTADO / VISUALIZACIÓN
         ==================================================

         Renderizado condicional:
         - Si hay un modelo seleccionado → mostrar datos
         - Si no → mostrar mensaje de espera
      */}
      <div className="display-surface">
        {selectedModel ? (
          <div className="fade-in">
            {/* Etiqueta descriptiva */}
            <span className="label">Configuration Blueprint</span>

            {/* Texto dinámico basado en el estado */}
            <span className="value">{selectedModel}</span>
          </div>
        ) : (
          <span className="placeholder">Initiate Model Selection</span>
        )}
      </div>
    </section>
  );
}
