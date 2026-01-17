import { useState } from "react";
import TabButton from "../TabButton/TabButton";
import TabsMenu from "../TabsMenu/TabsMenu";
import Section from "../Section/Section";

export default function ModelConfigurator() {
  /* ESTADO LOCAL: Guarda la descripción técnica del modelo seleccionado */
  const [selectedModel, setSelectedModel] = useState(null);

  const handleSelect = (description) => {
    setSelectedModel(description);
  };

  return (
    <Section
      title="Bespoke Configurator"
      id="reactExamples"
      className="interaction-panel"
    >
      {/* Contenedor de tema con Flexbox para centrar todo el contenido */}
      <div
        className="gold-theme"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TabsMenu
          ButtonsContainer="menu"
          buttons={
            <>
              <TabButton
                isSelected={selectedModel?.includes("BUGATTI")}
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
          {/* Zona de visualización centrada */}
          <div className="display-surface">
            {selectedModel ? (
              <div className="fade-in">
                <span className="label">Configuration Blueprint</span>
                <span className="value">{selectedModel}</span>
              </div>
            ) : (
              <span className="placeholder">Initiate Model Selection</span>
            )}
          </div>
        </TabsMenu>
      </div>
    </Section>
  );
}
