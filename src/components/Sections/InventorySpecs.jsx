/* ======================================================
   IMPORTACIONES
   ====================================================== */

// useState es un Hook de React
// Sirve para guardar datos que pueden cambiar
// y hacer que el componente se vuelva a dibujar
import { useState } from "react";

// TabButton es un componente reutilizable
// Representa cada botón del menú (tab)
import TabButton from "../TabButton/TabButton";

/* ======================================================
   DATOS DEL INVENTARIO (DATA-DRIVEN)
   ====================================================== */

// Aquí guardamos TODA la información de los vehículos
// ❌ No es lógica
// ❌ No es diseño
// ✅ Solo datos
//
// Cada clave es un ID único
// Esto hace el código más ordenado y profesional
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

/* ======================================================
   COMPONENTE PRINCIPAL
   ====================================================== */

export default function InventorySpecs() {
  /* --------------------------------------------------
     ESTADO
     --------------------------------------------------

     selectedId:
     - Guarda el ID del vehículo seleccionado
     - Empieza en null (no hay selección)
     - Cuando cambia, React vuelve a renderizar
  */
  const [selectedId, setSelectedId] = useState(null);

  /* --------------------------------------------------
     DATO DERIVADO
     --------------------------------------------------

     selectedItem:
     - Si hay un ID seleccionado
       buscamos ese vehículo en INVENTORY_DATA
     - Si no hay selección, vale null
     - Esto evita escribir lógica dentro del JSX
  */
  const selectedItem = selectedId ? INVENTORY_DATA[selectedId] : null;

  return (
    /* ==================================================
       CONTENEDOR PRINCIPAL
       ================================================== */
    <section id="inventory-specs" className="interaction-panel">
      {/* Título del bloque */}
      <h2 className="panel-title">Inventory & Specifications</h2>

      {/* ==================================================
         MENÚ DE BOTONES
         ================================================== */}
      <div className="purple-theme">
        {/* menu agrupa opciones relacionadas */}
        <menu className="tab-bar">
          {/* Cada TabButton:
              - Comprueba si está activo
              - Cambia el estado al hacer clic
          */}

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
        </menu>
      </div>

      {/* ==================================================
         ZONA DE CONTENIDO
         ================================================== */}
      <div className="display-surface">
        {/* Si hay selección mostramos info
            Si no, mostramos mensaje */}
        {selectedItem ? (
          <div className="fade-in">
            <span className="label">Inventory Status</span>
            <h3 className="inventory-title">{selectedItem.title}</h3>
            <p className="value-text">{selectedItem.description}</p>
          </div>
        ) : (
          <span className="placeholder">Awaiting Selection...</span>
        )}
      </div>
    </section>
  );
}
