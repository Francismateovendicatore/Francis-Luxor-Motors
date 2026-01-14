/* ======================================================
   IMPORTACIONES
   ====================================================== */

// Importamos el Hook useState desde React
// useState nos permite manejar estado interno dentro
// de un componente funcional
import { useState } from "react";

// Importamos el componente TabButton
// Este componente representa cada botón del menú
// y encapsula su propio diseño y comportamiento visual
import TabButton from "../TabButton/TabButton";

/* ======================================================
   FUENTE DE DATOS (DATA-DRIVEN DESIGN)
   ====================================================== */

// Objeto que contiene toda la información del inventario
// Cada clave representa un vehículo (ID único)
// Esto separa los DATOS de la LÓGICA y la VISTA
// Buena práctica profesional
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
     ESTADO LOCAL DEL COMPONENTE
     --------------------------------------------------

     selectedId:
     - Guarda el ID del vehículo seleccionado
     - null significa que aún no hay selección
     - Usamos IDs en lugar de texto para evitar errores
       y mejorar escalabilidad
  */
  const [selectedId, setSelectedId] = useState(null);

  /* --------------------------------------------------
     DATOS DERIVADOS DEL ESTADO
     --------------------------------------------------

     selectedItem:
     - Si hay un ID seleccionado, buscamos el objeto
       correspondiente dentro de INVENTORY_DATA
     - Si no hay selección, el valor es null
     - Esto evita lógica compleja dentro del JSX
  */
  const selectedItem = selectedId ? INVENTORY_DATA[selectedId] : null;

  return (
    /* ==================================================
       SECCIÓN PRINCIPAL
       ================================================== */

    <section id="inventory-specs" className="interaction-panel">
      {/* Título principal de la sección */}
      <h2 className="panel-title">Inventory & Specifications</h2>

      {/* ==================================================
         CONTENEDOR DE BOTONES (TABS)
         ================================================== */}

      <div className="purple-theme">
        {/* menu se usa como contenedor semántico
            para un grupo de opciones */}
        <menu className="tab-bar">
          {/* Cada TabButton:
              - Marca si está seleccionado
              - Cambia el estado al hacer clic
              - No maneja datos, solo interacción
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
         ÁREA DE VISUALIZACIÓN DE CONTENIDO
         ================================================== */}

      <div className="display-surface">
        {/* Renderizado condicional:
            - Si hay selección → mostramos datos
            - Si no → mensaje de espera
        */}
        {selectedItem ? (
          <div className="fade-in">
            {/* Etiqueta informativa */}
            <span className="label">Inventory Status</span>

            {/* Título dinámico */}
            <h3 className="inventory-title">{selectedItem.title}</h3>

            {/* Descripción dinámica */}
            <p className="value-text">{selectedItem.description}</p>
          </div>
        ) : (
          <span className="placeholder">Awaiting Selection...</span>
        )}
      </div>
    </section>
  );
}
