import { useState } from "react";
import TabButton from "../TabButton/TabButton";
import TabsMenu from "../TabsMenu/TabsMenu";
import Section from "../Section/Section";

const INVENTORY_DATA = {
  chiron: {
    title: "5 Units Available",
    description:
      "The pinnacle of automotive engineering featuring a quad-turbocharged W16.",
  },
  roma: {
    title: "15 Units Available",
    description:
      "A contemporary representation of 'La Nuova Dolce Vita' with a high-performance V8.",
  },
  huayra: {
    title: "3 Units Available",
    description:
      "A masterful fusion of art and science, handcrafted with an AMG-sourced V12.",
  },
  phantom: {
    title: "5 Units Available",
    description:
      "The definitive symbol of opulence, offering an effortless 'Magic Carpet Ride'.",
  },
  supra: {
    title: "9 Units Available",
    description:
      "Precision-engineered sports performance featuring a signature straight-six turbo.",
  },
  regera: {
    title: "1 Unit Available",
    description:
      "An innovative plug-in hybrid megacar utilizing the Direct Drive system.",
  },
  veneno: {
    title: "2 Units Available",
    description:
      "An ultra-exclusive tribute to aeronautical design with a naturally aspirated V12.",
  },
  valkyrie: {
    title: "8 Units Available",
    description:
      "Born from Red Bull Racing, this F1-inspired masterpiece delivers raw performance.",
  },
  venom: {
    title: "2 Units Available",
    description: "Built for extreme speed with over 1,800 horsepower.",
  },
};

export default function InventorySpecs() {
  const [selectedId, setSelectedId] = useState(null);
  const selectedItem = selectedId ? INVENTORY_DATA[selectedId] : null;

  return (
    <Section
      title="Inventory & Specifications"
      id="inventory-specs"
      className="interaction-panel"
    >
      <div
        className="purple-theme"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TabsMenu
          buttons={
            <>
              <TabButton
                isSelected={selectedId === "chiron"}
                onSelect={() => setSelectedId("chiron")}
              >
                Bugatti Chiron
              </TabButton>
              <TabButton
                isSelected={selectedId === "roma"}
                onSelect={() => setSelectedId("roma")}
              >
                Ferrari Roma
              </TabButton>
              <TabButton
                isSelected={selectedId === "huayra"}
                onSelect={() => setSelectedId("huayra")}
              >
                Pagani Huayra
              </TabButton>
              <TabButton
                isSelected={selectedId === "phantom"}
                onSelect={() => setSelectedId("phantom")}
              >
                Rolls-Royce Phantom
              </TabButton>
              <TabButton
                isSelected={selectedId === "supra"}
                onSelect={() => setSelectedId("supra")}
              >
                Toyota Supra MK5
              </TabButton>
              <TabButton
                isSelected={selectedId === "regera"}
                onSelect={() => setSelectedId("regera")}
              >
                Koenigsegg Regera
              </TabButton>
              <TabButton
                isSelected={selectedId === "veneno"}
                onSelect={() => setSelectedId("veneno")}
              >
                Lamborghini Veneno
              </TabButton>
              <TabButton
                isSelected={selectedId === "valkyrie"}
                onSelect={() => setSelectedId("valkyrie")}
              >
                Aston Martin Valkyrie
              </TabButton>
              <TabButton
                isSelected={selectedId === "venom"}
                onSelect={() => setSelectedId("venom")}
              >
                Hennessey Venom F5
              </TabButton>
            </>
          }
        >
          <div className="display-surface">
            {selectedItem ? (
              <div className="fade-in">
                <span className="label">Inventory Status</span>
                <h3 className="inventory-title" style={{ color: "#a855f7" }}>
                  {selectedItem.title}
                </h3>
                <p className="value-text">{selectedItem.description}</p>
              </div>
            ) : (
              <span className="placeholder">Awaiting Selection...</span>
            )}
          </div>
        </TabsMenu>
      </div>
    </Section>
  );
}
