import { useState } from "react"; // Necesario para la interactividad
import Header from "./components/Header/Header";
import ExclusiveFleet from "./components/Sections/ExclusiveFleet";
import ModelConfigurator from "./components/Sections/ModelConfigurator";
import ValuationAssessment from "./components/Sections/ValuationAssessment";
import InventorySpecs from "./components/Sections/InventorySpecs";
import CarDetailView from "./components/Sections/CarDetailView"; // Importamos la vista del motor
import { CARS_DETAILS } from "./data";
import "./index.css";

/* ======================================================
   COMPONENTE PRINCIPAL: App
   ====================================================== */
export default function App() {
  // ESTADO: Almacena el nombre del coche seleccionado (null = menú principal)
  const [selectedCar, setSelectedCar] = useState(null);

  // Función para cerrar la vista de detalles
  const handleCloseDetail = () => setSelectedCar(null);

  return (
    <div className="app-container">
      <Header />

      <main>
        {/* RENDERIZADO CONDICIONAL: 
            Si hay un coche seleccionado, mostramos sus detalles técnicos.
            Si no, mostramos la galería normal. */}
        {selectedCar ?
          <CarDetailView
            data={CARS_DETAILS[selectedCar]}
            name={selectedCar}
            onClose={handleCloseDetail}
          />
        : <>
            {/* Pasamos la función de selección a la galería */}
            <ExclusiveFleet onSelectCar={setSelectedCar} />

            <div className="interaction-suite">
              <ModelConfigurator />
              <ValuationAssessment />
              <InventorySpecs />
            </div>
          </>
        }
      </main>
    </div>
  );
}
